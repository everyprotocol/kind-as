import {
  Parser,
  NodeKind,
  ClassDeclaration,
  SourceKind,
  IdentifierExpression,
  FieldDeclaration,
  MethodDeclaration,
  DecoratorNode,
  NamedTypeNode,
  Statement,
  Source,
} from "assemblyscript";
import binaryen from "assemblyscript/binaryen";
import { Transform } from "assemblyscript/transform";
import keccak256 from "keccak256";
import { CompilationInfo, KindSections } from "./sections";
import { resolveElementType } from "./elements";

type DecoratorModel = { name: string };
type FieldModel = { name: string; type: string };
type ParamModel = { name: string; type: string };
type MethodModel = { name: string; params: ParamModel[]; ret: string };

class KindContract {
  readonly decorators: DecoratorModel[];
  readonly clazz: string;
  readonly fields: FieldModel[];
  readonly methods: MethodModel[];

  constructor(source: Source) {
    const cls = KindContract.singleTopClass(source);
    const { decorators, name, fields, methods } = KindContract.extractClass(cls);
    this.decorators = decorators;
    this.clazz = name;
    this.fields = fields;
    this.methods = methods;
  }

  validate() {
    const d = this.decorators.find((d) => d.name == "kind");
    if (d == undefined) {
      throw new Error("kind contracts should be decorated with @kind");
    }
    const f = this.fields.find((f) => resolveElementType(f.type) == 0);
    if (f) {
      throw new Error(`'${f.type}' can not be used as element types`);
    }
  }

  genEntryFunction(parser: Parser): Statement[] {
    const arms = this.methods
      .map((m) => `case ${KindContract.computeFacetSelector(m.name)}: return obj.${m.name}();`)
      .join("\n        ");
    const code = `
    export function facet(obj: ${this.clazz}, sel: u32): externref {
      switch (sel) {
        ${arms}
        default: return null;
      }
    }`;
    const p = new Parser();
    p.parseFile(code, parser.currentSource!.normalizedPath, true);
    return p.sources[p.sources.length - 1]!.statements;
  }

  getElementTypes(): number[] {
    return this.fields.map((f) => resolveElementType(f.type));
  }

  getFacetSelectors(): number[] {
    return this.methods.map((m) => KindContract.computeFacetSelector(m.name));
  }

  static singleTopClass(src: Source): ClassDeclaration {
    const classes = src.statements.filter((s) => s.kind === NodeKind.ClassDeclaration) as ClassDeclaration[];
    if (classes.length !== 1) throw new Error(`expected exactly 1 top-level class, got ${classes.length}`);
    return classes[0]!;
  }

  static extractClass(node: ClassDeclaration) {
    const name = (node.name as IdentifierExpression).text;
    const decorators = node.decorators?.map((d) => this.extractDecorator(d)) || [];
    const fields: FieldModel[] = [];
    const methods: MethodModel[] = [];
    for (const member of node.members) {
      switch (member.kind) {
        case NodeKind.FieldDeclaration:
          fields.push(this.extractField(member as FieldDeclaration));
          break;
        case NodeKind.MethodDeclaration:
          methods.push(this.extractMethod(member as MethodDeclaration));
          break;
        default:
          break;
      }
    }
    return { decorators, name, fields, methods };
  }

  static extractDecorator(node: DecoratorNode) {
    const name = (node.name as IdentifierExpression).text;
    return { name };
  }

  static extractMethod(node: MethodDeclaration): MethodModel {
    const name = (node.name as IdentifierExpression).text;
    const ret = (node.signature.returnType as unknown as NamedTypeNode).name.identifier.text;
    const params = node.signature.parameters.map((p) => {
      const pname = (p.name as unknown as IdentifierExpression).text;
      const ptype = (p.type as unknown as NamedTypeNode).name.identifier.text;
      return { name: pname, type: ptype };
    });
    return { name, params, ret };
  }

  static extractField(node: FieldDeclaration): FieldModel {
    const name = (node.name as IdentifierExpression).text;
    const type = (node.type as unknown as NamedTypeNode).name.identifier.text;
    return { name, type };
  }

  static computeFacetSelector(method: string): number {
    const b4 = keccak256(Buffer.from(method, "utf8")).subarray(0, 4);
    return b4.readUInt32BE(0);
  }
}

export class KindTransform extends Transform {
  info: CompilationInfo;
  contract?: KindContract;

  constructor(ci: CompilationInfo) {
    super();
    this.info = ci;
  }

  async afterParse(parser: Parser) {
    const user = parser.sources.filter(
      (s) => s.sourceKind === SourceKind.UserEntry && !s.normalizedPath.startsWith("~lib")
    );
    if (user.length !== 1) throw new Error("expected exactly 1 user entry");
    const source = user[0]!;
    const contract = new KindContract(source);
    contract.validate();

    const sourceHash = keccak256(source.text).toString("hex");
    source.statements.push(...contract.genEntryFunction(parser));
    this.contract = contract;
    this.info.fill(sourceHash);
  }

  async afterCompile(module: binaryen.Module) {
    if (this.contract === undefined) throw new Error("kind contract not found");
    const contract = this.contract;
    const elements = contract.getElementTypes();
    const facets = contract.getFacetSelectors();
    const sections = new KindSections(this.info, elements, facets);
    const { kindComp, kindElms, kindFcts } = sections.encodeAll();
    module.addCustomSection("kindcomp", kindComp);
    module.addCustomSection("kindelms", kindElms);
    module.addCustomSection("kindfcts", kindFcts);
  }
}
