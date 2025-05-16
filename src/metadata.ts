import * as _ from "lodash-es";

export class KindMeta {
  language: string;
  compiler: string;
  source: string;
  options: string;
  elements: number[];
  facets: number[];

  static ALL_FIELDS: string[] = "language,compiler,source,options,elements,facets".split(",");
  static STR_FIELDS: string[] = "language,compiler,source,options".split(",");

  constructor(
    language: string,
    compiler: string,
    source: string,
    options: string,
    elements: number[],
    facets: number[]
  ) {
    this.language = language;
    this.compiler = compiler;
    this.source = source;
    this.options = options;
    this.elements = elements;
    this.facets = facets;
  }

  encodeCompilationInfo(): Buffer {
    const b = Buffer.alloc(KindMeta.STR_FIELDS.length * 128);
    let offset = 0;
    offset = b.writeUint8(KindMeta.STR_FIELDS.length, offset);
    for (const f of KindMeta.STR_FIELDS) {
      offset = b.writeUint8(f.length, offset);
      offset += b.write(f, offset, "utf-8");
      const v = _.get(this, f);
      offset = b.writeUint8(v.length, offset);
      offset += b.write(v, offset, "utf-8");
    }
    return b.subarray(0, offset);
  }

  encode2(): { kindComp: Buffer; kindElms: Buffer; kindFcts: Buffer } {
    const kindComp = this.encodeCompilationInfo();
    const kindElms = this.encodeElements();
    const kindFcts = this.encodeFacets();
    return { kindComp, kindElms, kindFcts };
  }

  encodeElements(): Buffer {
    const b = Buffer.alloc(this.elements.length);
    this.elements.forEach((v, i) => b.writeUInt8(v, i));
    return b;
  }

  encodeFacets(): Buffer {
    const b = Buffer.alloc(this.facets.length * 4);
    this.facets.forEach((v, i) => b.writeUint32BE(v, i * 4));
    return b;
  }

  encode(): Buffer {
    const size =
      1 +
      _.sum(KindMeta.STR_FIELDS.map((f) => f.length + 2 + _.get(this, f).length)) +
      "elements".length +
      2 +
      this.elements.length * 1 +
      "facets".length +
      2 +
      this.facets.length * 4;

    const b = Buffer.alloc(size);
    let offset = 0;
    offset = b.writeUint8(6, offset);
    for (const f of KindMeta.STR_FIELDS) {
      offset = b.writeUint8(f.length, offset);
      offset += b.write(f, offset, "utf-8");
      const v = _.get(this, f);
      offset = b.writeUint8(v.length, offset);
      offset += b.write(v, offset, "utf-8");
    }
    {
      const f = "elements";
      offset = b.writeUint8(f.length, offset);
      offset += b.write(f, offset, "utf-8");
      offset = b.writeUint8(this.elements.length, offset);
      for (const e of this.elements) {
        offset = b.writeUint8(e, offset);
      }
    }
    {
      const f = "facets";
      offset = b.writeUint8(f.length, offset);
      offset += b.write(f, offset, "utf-8");
      offset = b.writeUint8(this.facets.length * 4, offset);
      for (const e of this.facets) {
        offset = b.writeUint32BE(e, offset);
      }
    }
    return b;
  }

  static decode(data: Buffer): KindMeta | undefined {
    const fields = {};
    let offset = 0;
    const count = data.readUint8(offset);
    offset += 1;
    for (let i = 0; i < count; i++) {
      const nameLen = data.readUint8(offset);
      offset += 1;
      const name = this.decodeString(data.subarray(offset, offset + nameLen));
      offset += nameLen;
      const valueLen = data.readUint8(offset);
      offset += 1;
      const value = data.subarray(offset, offset + valueLen);
      offset += valueLen;
      if (_.includes(this.STR_FIELDS, name)) {
        _.set(fields, name, this.decodeString(value));
      } else if (name == "elements") {
        _.set(fields, name, this.decodeUint8Array(value));
      } else if (name == "facets") {
        _.set(fields, name, this.decodeUint32Array(value));
      } else {
        throw new Error("unknown field name");
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pos = _.findIndex(this.ALL_FIELDS, (f: any) => !_.get(fields, f));
    if (pos >= 0) {
      throw new Error("field missing");
    }
    return new KindMeta(
      _.get(fields, "language")!,
      _.get(fields, "compiler")!,
      _.get(fields, "source")!,
      _.get(fields, "options")!,
      _.get(fields, "elements")!,
      _.get(fields, "facets")!
    );
  }

  private static decodeUint32Array(buffer: Buffer): number[] {
    const ret = [];
    for (let offset = 0; offset < buffer.length; offset += 4) {
      ret.push(buffer.readUInt32LE(offset));
    }
    return ret;
  }

  private static decodeUint8Array(buffer: Buffer): number[] {
    const ret = [];
    for (let offset = 0; offset < buffer.length; offset++) {
      ret.push(buffer.readUInt8(offset));
    }
    return ret;
  }

  private static decodeString(buffer: Buffer): string {
    return new TextDecoder().decode(buffer);
  }
}
