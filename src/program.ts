import { program as _program } from "commander";
import { KindCompiler } from "./compiler.js";

export const program = _program
  .name("kasc")
  .description("Compile kind contracts to Wasm")
  .argument("<file>", "AssemblyScript source file")
  .requiredOption("-o, --out <wasm>", "Path to output .wasm file")
  .option("-t, --text <wat>", "Also emit .wat file to this path")
  .option("-l, --lib <lib>", "Use custom std lib instead of bundled one")
  .option("-d, --debug", "Enable debug mode", false)
  .option("-s, --shrinkLevel <level>", "Set shrink level (0-2, default: 0)", "0")
  .option("-O, --optimizeLevel <level>", "Set optimization level (0-3, default: 3)", "3")
  .action(async (file, options) => {
    const kasc = new KindCompiler();
    await kasc.compile(
      file, 
      options.out, 
      options.text, 
      options.lib, 
      options.debug, 
      parseInt(options.shrinkLevel), 
      parseInt(options.optimizeLevel)
    );
  })
  .showHelpAfterError(true);
