import { KindTransform } from "./transform.js";
import { version as ascVersion, OutputStream, main as ascMain } from "assemblyscript/asc";
import path from "path";
import url from "url";
import { version } from "../package.json";

export class KindCompiler {
  language: string;
  compiler: string;
  version: string;

  constructor() {
    this.version = version;
    this.language = `kindas/${version}`;
    this.compiler = `kasc-${version}(asc-${ascVersion})`;
  }

  async compile(file: string, out: string, text?: string, lib?: string) {
    const { libPath, language } = this.resovleLib(lib);
    const options = this.fixedOptions();
    const userOptions = [file, "--lib", libPath, "--outFile", out, ...(text ? ["--textFile", text] : [])];
    const tr = new KindTransform(language, this.compiler, options.join(" "));
    const result = await ascMain([...options, ...userOptions], {
      transforms: [tr],
      stderr: process.stderr as OutputStream,
      stdout: process.stdout as OutputStream,
    });

    if (result.error) {
      throw result.error;
    }
  }

  resovleLib(lib?: string): { libPath: string; language: string } {
    if (lib) {
      const libPath = path.normalize(lib);
      const language = `kindas!${libPath}`;
      return { libPath, language };
    } else {
      const dir = path.dirname(url.fileURLToPath(import.meta.url));
      const libPath = path.normalize(`${dir}/../std/assembly/index.ts`);
      const language = `kindas/${this.version}`;
      return { libPath, language };
    }
  }

  fixedOptions() {
    return [
      "--runtime",
      "stub",
      "--optimizeLevel",
      "3",
      "--shrinkLevel",
      "0",
      "--converge",
      "--noAssert",
      "--enable",
      "reference-types",
      "--use",
      "abort=",
      "--memoryBase",
      "2048",
    ];
  }
}
