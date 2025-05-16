import { program as _program } from "commander";
import { KindCompiler } from "./compiler.js";

export const program = _program
  .name("kasc")
  .description("Compile kind contracts to Wasm")
  .argument("<file>", "AssemblyScript source file")
  .requiredOption("-o, --out <wasm>", "Path to output .wasm file")
  .option("-t, --text <wat>", "Also emit .wat file to this path")
  .option("-l, --lib <lib>", "Use custom std lib instead of bundled one")
  .action(async (file, options) => {
    const kasc = new KindCompiler();
    await kasc.compile(file, options.out, options.text, options.lib);
  })
  .showHelpAfterError(true);
