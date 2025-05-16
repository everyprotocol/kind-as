import {
  Parser,
  NodeKind,
  Node,
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
import * as _ from "lodash-es";
import { KindMeta } from "./metadata.js";

export class KindTransform extends Transform {
  language: string;
  compiler: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kind?: any;
  source?: string;
  options: string;

  constructor(language: string, compiler: string, options: string) {
    super();
    this.language = language;
    this.compiler = compiler;
    this.options = options;
  }

  async afterParse(parser: Parser) {
    const userEntries = _.filter(parser.sources, this.isUserEntrySource);
    if (userEntries.length != 1) {
      throw new Error("more than 1 user entry");
    }
    const source = userEntries[0]!;

    const kinds = _.map(source!.statements, (node: Node) => node.kind);
    const groups = _.groupBy(kinds);
    // const numExps = _.get(groups, NodeKind.Expression)?.length || 0;
    // const numVars = _.get(groups, NodeKind.Variable)?.length || 0;
    // const numInterfaceDecls = _.get(groups, NodeKind.InterfaceDeclaration)?.length || 0;
    // const numFuncDecls = _.get(groups, NodeKind.FunctionDeclaration)?.length || 0;
    const numClassDecls = _.get(groups, NodeKind.ClassDeclaration)?.length || 0;
    // console.log({ kinds, groups });

    if (numClassDecls != 1) {
      throw new Error("more than 1 user entry");
    }

    source.statements.forEach((node: Node) => {
      if (node.kind == NodeKind.ClassDeclaration) {
        const c = this.extractClass(node as ClassDeclaration);
        this.kind = c;
        const stmts = this.makeKindEntry(
          c.name,
          c.methods.map((m) => m.name),
          parser
        );
        source.statements.push(...stmts);
        // console.log(c);
      }
    });
    const buffer = keccak256(source.text);
    this.source = buffer.toString("hex");
  }

  // async afterInitialize(program: Program) { }

  async afterCompile(module: binaryen.Module) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elements = _.map(_.get(this, "kind.fields") || [], (f: any) => this.toElement(f["type"]));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectors = _.map(_.get(this, "kind.methods") || [], (f: any) => this.selectorUint32(f["name"]));
    // console.log({ elements, selectors });
    const meta = new KindMeta(this.language, this.compiler, this.source!, this.options!, elements, selectors);
    const { kindComp, kindElms, kindFcts } = meta.encode2();
    module.addCustomSection("kindcomp", kindComp);
    module.addCustomSection("kindelms", kindElms);
    module.addCustomSection("kindfcts", kindFcts);
  }

  // private
  isUserEntrySource(node: Source) {
    return node.sourceKind == SourceKind.UserEntry && !node.normalizedPath.startsWith("~lib");
  }

  extractClass(node: ClassDeclaration) {
    const name = (node.name as IdentifierExpression).text;
    const decorators = node.decorators?.map((d) => this.extractDecorator(d)) || [];
    const fields = [];
    const methods = [];
    const unexpected = [];
    for (const member of node.members) {
      switch (member.kind) {
        case NodeKind.FieldDeclaration:
          fields.push(this.extractField(member as FieldDeclaration));
          break;
        case NodeKind.MethodDeclaration:
          methods.push(this.extractMethod(member as MethodDeclaration));
          break;
        default:
          unexpected.push(member);
      }
    }
    return { name, decorators, fields, methods };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toElement(_s: string): number {
    return 1;
  }

  extractDecorator(node: DecoratorNode) {
    const name = (node.name as IdentifierExpression).text;
    return { name };
  }

  extractMethod(node: MethodDeclaration) {
    const name = (node.name as IdentifierExpression).text;
    const ret = (node.signature.returnType as unknown as NamedTypeNode).name.identifier.text;
    const params = node.signature.parameters.map((p) => {
      const name = (p.name as unknown as IdentifierExpression).text;
      const type = (p.type as unknown as NamedTypeNode).name.identifier.text;
      return { name, type };
    });
    return { name, params, ret };
  }

  extractField(node: FieldDeclaration) {
    const name = (node.name as IdentifierExpression).text;
    const type = (node.type as unknown as NamedTypeNode).name.identifier.text;
    return { name, type };
  }

  traverseNode(node: Node) {
    // Output kind and name properties
    const name = _.get(node, "name") || _.get(node, "text") || "unknown";
    console.log(`Kind: ${node.kind}, name: ${name.toString()}`);
    // Check other properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _.forEach(_.omit(node, ["kind", "name"]), (value: any) => {
      // Check if the property is an array
      if (_.isArray(value)) {
        // Iterate through each element in the array
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _.forEach(value, (element: any) => {
          // Check if the element is a Node object
          if (_.isObject(element) && "kind" in element) {
            this.traverseNode(element as Node); // Recursively traverse the Node object
          }
        });
      } else if (_.isObject(value) && value instanceof Node) {
        // If the property is an object and a subclass of Node, recursively traverse it
        this.traverseNode(value as Node);
      } else {
        // Handle other types of properties
        // console.log(`Property '${key}' value: ${value}`);
      }
    });
  }

  makeKindEntry(clazz: string, methods: string[], parser: Parser): Statement[] {
    const arms: string[] = [];
    methods.forEach((method) => {
      const sel = this.selectorUint32(method);
      arms.push(`case ${sel}: return obj.${method}(); break;`);
    });
    const stmt = `
    export function entry(obj: ${clazz}, sel: u32): externref {
        switch (sel) {
            ${arms.join("            \n")}
            default: return null;
        }
    }
    `;
    // console.log(methods);
    // console.log(stmt);
    const newParser = new Parser();
    newParser.parseFile(stmt, parser.currentSource!.normalizedPath, true);
    return newParser.sources[0]!.statements;
  }

  selectorBytes4(method: string): Buffer {
    return keccak256(Buffer.from(method)).subarray(0, 4);
  }

  selectorUint32(method: string): number {
    return this.selectorBytes4(method).readUInt32BE(0);
  }

  bytes4ToUint32(bytes4: Buffer): number {
    return bytes4.readUInt32BE(0);
  }
}
