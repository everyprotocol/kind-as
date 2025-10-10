import { program as _program } from "commander";
import { KindCompiler } from "./compiler.js";
import { version } from "../package.json";
import { version as ascVersion } from "assemblyscript/asc";

export const program = _program
  .name("kasc")
  .description("Compile a kind contract to WebAssembly")
  .argument("<file>", "Input AssemblyScript source file (.ts)")
  .requiredOption("-o, --out <path>", "Output .wasm file")
  .option("-t, --text <path>", "Also emit a text-format .wat file")
  .option("--shrink <level>", "Shrink level (0–2)", "0")
  .option("--optimize <level>", "Optimization level (0–3)", "3")
  .option("--debug", "Build with debug info", false)
  .option("--lib <lib>", "Use a custom library")
  .action(async (file, options) => {
    const kasc = new KindCompiler();
    const result = await kasc.compile(
      file,
      options.out,
      options.text,
      options.lib,
      options.debug,
      parseInt(options.shrink),
      parseInt(options.optimize)
    );
    if (result.error) process.exitCode = 1;
  })
  .version(`kasc ${version} (asc ${ascVersion})`)
  .showHelpAfterError(true);
