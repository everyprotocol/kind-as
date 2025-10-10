export class KindSections {
  constructor(
    public compileInfo: CompilationInfo,
    public elements: number[] | undefined, // u8[]
    public facets: number[] | undefined // u32 (BE)
  ) {}

  fill(source: string, elements?: number[], facets?: number[]) {
    this.compileInfo.fill(source);
    if (elements) {
      this.elements = elements;
    }
    if (facets) {
      this.facets = facets;
    }
  }

  encodeCompilationInfo(): Buffer {
    if (!this.compileInfo) throw new Error("KindSections: compileInfo is missing");
    return this.compileInfo.encode();
  }

  encodeElements(): Buffer {
    if (!this.elements) throw new Error("KindSections: elements not set");
    const b = Buffer.alloc(this.elements.length);
    this.elements.forEach((e, i) => b.writeUint8(e & 0xff, i));
    return b;
  }

  encodeFacets(): Buffer {
    if (!this.facets) throw new Error("KindSections: facets not set");
    const b = Buffer.alloc(this.facets.length * 4);
    this.facets.forEach((facet, i) => b.writeUint32BE(facet >>> 0, i * 4));
    return b;
  }

  encodeAll(): { kindComp: Buffer; kindElms: Buffer; kindFcts: Buffer } {
    return {
      kindComp: this.encodeCompilationInfo(),
      kindElms: this.encodeElements(),
      kindFcts: this.encodeFacets(),
    };
  }

  static decodeCompilationInfo(buf: Buffer): CompilationInfo {
    return CompilationInfo.decode(buf);
  }

  static decodeElements(buf: Buffer): number[] {
    const out: number[] = new Array(buf.length);
    for (let i = 0; i < buf.length; i++) out[i] = buf.readUint8(i);
    return out;
  }

  static decodeFacets(buf: Buffer): number[] {
    if (buf.length % 4 !== 0) throw new Error("KindSections: buffer length not multiple of 4");
    const out: number[] = new Array(buf.length / 4);
    for (let i = 0; i < out.length; i++) out[i] = buf.readUInt32BE(i * 4);
    return out;
  }

  static fromSections(kindComp: Buffer, kindElms: Buffer, kindFcts: Buffer): KindSections {
    const compileInfo = KindSections.decodeCompilationInfo(kindComp);
    const elements = KindSections.decodeElements(kindElms);
    const facets = KindSections.decodeFacets(kindFcts);
    return new KindSections(compileInfo, elements, facets);
  }
}

export class CompilationInfo {
  constructor(
    public language: string,
    public compiler: string,
    public options: string,
    public source?: string
  ) {}

  fill(source: string) {
    const hex = source.startsWith("0x") ? source.slice(2) : source;
    if (!/^[0-9a-fA-F]{64}$/.test(hex)) {
      throw new Error(`CompileInfo: Invalid source hash`);
    }
    this.source = hex.toLowerCase();
  }

  /** Binary layout (tagged KV):
   *   count:u8
   *   repeat count:
   *     nameLen:u8, nameUtf8, valueLen:u8, valueUtf8
   * Fields: language, compiler, sourceHash, options
   */
  encode(): Buffer {
    if (this.source === undefined) throw new Error(`CompileInfo: source field not set`);

    const entries: Array<[name: string, value: string]> = [
      ["source", this.source],
      ["language", this.language],
      ["compiler", this.compiler],
      ["options", this.options],
    ];

    const size =
      1 + // count
      entries.reduce((acc, [k, v]) => {
        const vl = Buffer.byteLength(v, "utf-8");
        return acc + 1 + k.length + 1 + vl;
      }, 0);

    const b = Buffer.alloc(size);
    let off = 0;
    off = b.writeUint8(entries.length, off);
    for (const [k, v] of entries) {
      off = b.writeUint8(k.length, off);
      off += b.write(k, off, "utf-8");

      const vlen = Buffer.byteLength(v, "utf-8");
      off = b.writeUint8(vlen, off);
      off += b.write(v, off, "utf-8");
    }
    return b;
  }

  static decode(buf: Buffer): CompilationInfo {
    let off = 0;
    const count = buf.readUint8(off);
    off += 1;

    const map = new Map<string, string>();
    for (let i = 0; i < count; i++) {
      const nl = buf.readUint8(off);
      off += 1;
      const name = buf.toString("utf-8", off, off + nl);
      off += nl;

      const vl = buf.readUint8(off);
      off += 1;
      const val = buf.toString("utf-8", off, off + vl);
      off += vl;

      map.set(name, val);
    }

    const req = (k: string) => {
      const v = map.get(k);
      if (v === undefined) throw new Error(`CompileInfo: missing '${k}'`);
      return v;
    };

    return new CompilationInfo(req("language"), req("compiler"), req("source"), req("options"));
  }
}
