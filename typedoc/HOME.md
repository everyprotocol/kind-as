`kind-as` is the reference toolchain for writing **Kind contracts** in [AssemblyScript](https://www.assemblyscript.org/) for [Every Protocol](https://docs.every.fun).

## Quickstart

The fastest way to start is with a template:

```bash
bun create everytemplate/kind my-kind
cd my-kind
bun run build
```

This sets up a ready-to-build Kind contract project.

After building, you can inspect the generated WebAssembly code:

```bash
wasm-objdump --headers build/index.wasm
```

## From Scratch

If you prefer to set things up manually:

```bash
bun init my-kind
cd my-kind
bun add @everyprotocol/kind-as
```

Create an `assembly/index.ts` file and implement your Kind contract logic.
When you’re ready, compile the contract using the **kasc** CLI:

```bash
bun run kasc assembly/index.ts -o build/index.wasm
```

## Resources

- **kasc**: [https://docs.every.fun/reference/kasc](https://docs.every.fun/reference/kasc)
- **bun**: [https://bun.sh](https://bun.sh)
- **wasm-objdump**: [https://github.com/WebAssembly/wabt](https://github.com/WebAssembly/wabt)
