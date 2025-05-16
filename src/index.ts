#!/usr/bin/env node

import { program } from "./program.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

await program.parseAsync();
