/// <reference types="assemblyscript/std/assembly/index.d.ts"/>

export enum ColorType {
  L8,
  La8,
  Rgb8,
  Rgba8,
  L16,
  La16,
  Rgb16,
  Rgba16,
  Rgb32F,
  Rgba32F,
}

export enum FilterType {
  Nearest,
  Triangle,
  CatmullRom,
  Gaussian,
  Lanczos3,
}

export enum Interpolation {
  Nearest,
  Bilinear,
  Bicubic,
}

export type Json = externref;
export type Image = externref;
export type Enumeration = externref;
export type Permutation = externref;
export type Value = externref;
export type Unique = externref;
export type Arcs = externref;
export type Projection = externref;

// @ts-ignore: decorator
@unmanaged
export abstract class Element {
  private a: u64;
  private b: u64;
  private c: u64;
  private d: u64;

  protected constructor() {}

  hex(): String {
    return __internal.bytesToHex(changetype<usize>(this), 32);
  }
}

// @ts-ignore: decorator
@unmanaged
export class JsonHash extends Element {
  private constructor() { super(); }
  load(): Json {
    return json.load(this);
  }
}

// @ts-ignore: decorator
@unmanaged
export class ImageHash extends Element {
  private constructor() { super(); }
  load(): Image {
    return image.load(this);
  }
}

// @ts-ignore: decorator
@unmanaged
export class WasmHash extends Element {
  private constructor() { super(); }
}

// @ts-ignore: decorator
@unmanaged
export class EnumHash extends Element {
  private constructor() { super(); }
  load(): Enumeration {
    return enumeration.load(this);
  }
}

// @ts-ignore: decorator
@unmanaged
export class PermHash extends Element {
  private constructor() { super(); }
  load(): Permutation {
    return permuation.load(this);
  }
}

// @ts-ignore: decorator
@unmanaged
export class ValueRef extends Element {
  private constructor() { super(); }
  load(): Value {
    return value.load(this);
  }
}

// @ts-ignore: decorator
@unmanaged
export class UniqueRef extends Element {
  private constructor() { super(); }
  load(): Unique {
    return unique.load(this);
  }
}

// @ts-ignore: decorator
@unmanaged
export class Info extends Element {
  private constructor() { super(); }

  u8(offset: u8): u8   { return load<u8>( changetype<usize>(this) + <usize>offset ); }
  u16(offset: u8): u16 { return load<u16>(changetype<usize>(this) + <usize>offset ); }
  u32(offset: u8): u32 { return load<u32>(changetype<usize>(this) + <usize>offset ); }
  u64(offset: u8): u64 { return load<u64>(changetype<usize>(this) + <usize>offset ); }

  i8(offset: u8): i8   { return load<i8>( changetype<usize>(this) + <usize>offset ); }
  i16(offset: u8): i16 { return load<i16>(changetype<usize>(this) + <usize>offset ); }
  i32(offset: u8): i32 { return load<i32>(changetype<usize>(this) + <usize>offset ); }
  i64(offset: u8): i64 { return load<i64>(changetype<usize>(this) + <usize>offset ); }

  f32(offset: u8): i32 { return load<f32>(changetype<usize>(this) + <usize>offset ); }
  f64(offset: u8): i64 { return load<f64>(changetype<usize>(this) + <usize>offset ); }
}


// @ts-ignore: decorator
@unmanaged
export abstract class Pixel {
  readonly c: ColorType;

  protected constructor(c: ColorType) {
    this.c = c;
  }

  static l8(y: u8): Pixel.L8 { return new Pixel.L8(y); }
  static la8(y: u8, a: u8): Pixel.La8 { return new Pixel.La8(y, a); }

  static rgb8(r: u8, g: u8, b: u8): Pixel.Rgb8 { return new Pixel.Rgb8(r, g, b); }
  static rgba8(r: u8, g: u8, b: u8, a: u8): Pixel.Rgba8 { return new Pixel.Rgba8(r, g, b, a); }

  static rgb16(r: u16, g: u16, b: u16): Pixel.Rgb16 { return new Pixel.Rgb16(r, g, b); }
  static rgba16(r: u16, g: u16, b: u16, a: u16): Pixel.Rgba16 { return new Pixel.Rgba16(r, g, b, a); }

  static rgbF32(r: f32, g: f32, b: f32): Pixel.RgbF32 { return new Pixel.RgbF32(r, g, b); }
  static rgbaF32(r: f32, g: f32, b: f32, a: f32): Pixel.RgbaF32 { return new Pixel.RgbaF32(r, g, b, a); }
}

export namespace Pixel {
  // 8-bit
  // @ts-ignore: decorator
  @unmanaged
  export class L8 extends Pixel {
    y: u8;
    constructor(y: u8) {
      // @ts-ignore
      super(ColorType.L8);
      this.y = y;
    }
  }

  // @ts-ignore: decorator
  @unmanaged
  export class La8 extends Pixel {
    y: u8;
    a: u8;
    constructor(y: u8, a: u8) {
      // @ts-ignore
      super(ColorType.La8);
      this.y = y;
      this.a = a;
    }
  }

  // @ts-ignore: decorator
  @unmanaged
  export class Rgb8 extends Pixel {
    r: u8;
    g: u8;
    b: u8;
    constructor(r: u8, g: u8, b: u8) {
      // @ts-ignore
      super(ColorType.Rgb8);
      this.r = r;
      this.g = g;
      this.b = b;
    }
  }

  // @ts-ignore: decorator
  @unmanaged
  export class Rgba8 extends Pixel {
    r: u8;
    g: u8;
    b: u8;
    a: u8;
    constructor(r: u8, g: u8, b: u8, a: u8) {
      // @ts-ignore
      super(ColorType.Rgba8);
      this.r = r; this.g = g; this.b = b; this.a = a;
    }
  }

  // 16-bit
  // @ts-ignore: decorator
  @unmanaged
  export class L16 extends Pixel {
    y: u16;
    constructor(y: u16) {
      // @ts-ignore
      super(ColorType.L16);
      this.y = y;
    }
  }

  // @ts-ignore: decorator
  @unmanaged
  export class La16 extends Pixel {
    y: u16;
    a: u16;
    constructor(y: u16, a: u16) {
      // @ts-ignore
      super(ColorType.La16);
      this.y = y; this.a = a;
    }
  }

  // @ts-ignore: decorator
  @unmanaged
  export class Rgb16 extends Pixel {
    r: u16; g: u16; b: u16;
    constructor(r: u16, g: u16, b: u16) {
      // @ts-ignore
      super(ColorType.Rgb16);
      this.r = r; this.g = g; this.b = b;
    }
  }

  // @ts-ignore: decorator
  @unmanaged
  export class Rgba16 extends Pixel {
    r: u16; g: u16; b: u16; a: u16;
    constructor(r: u16, g: u16, b: u16, a: u16) {
      // @ts-ignore
      super(ColorType.Rgba16);
      this.r = r; this.g = g; this.b = b; this.a = a;
    }
  }

  // f32
  // @ts-ignore: decorator
  @unmanaged
  export class RgbF32 extends Pixel {
    r: f32; g: f32; b: f32;
    constructor(r: f32, g: f32, b: f32) {
      // @ts-ignore
      super(ColorType.Rgb32F);
      this.r = r; this.g = g; this.b = b;
    }
  }

  // @ts-ignore: decorator
  @unmanaged
  export class RgbaF32 extends Pixel {
    r: f32; g: f32; b: f32; a: f32;
    constructor(r: f32, g: f32, b: f32, a: f32) {
      // @ts-ignore
      super(ColorType.Rgba32F);
      this.r = r; this.g = g; this.b = b; this.a = a;
    }
  }


}

export class Rect {
  left: i32;
  top: i32;
  width: u32;
  height: u32;

  constructor(left: i32, top: i32, width: u32, height: u32) {
    this.left = left; this.top = top; this.width = width; this.height = height;
  }
}

export class Mat3 {
  e0: f32; e1: f32; e2: f32;
  e3: f32; e4: f32; e5: f32;
  e6: f32; e7: f32; e8: f32;

  constructor(e0: f32, e1: f32, e2: f32, e3: f32, e4: f32, e5: f32, e6: f32, e7: f32, e8: f32) {
    this.e0 = e0; this.e1 = e1; this.e2 = e2;
    this.e3 = e3; this.e4 = e4; this.e5 = e5;
    this.e6 = e6; this.e7 = e7; this.e8 = e8;
  }
}

export type PointF32 = u64;
export type PointU32 = u64;
export type PointI32 = u64;

export namespace Point {
  export function f32(x: f32, y: f32): PointF32 {
    return __internal.packToU64(reinterpret<u32>(x), reinterpret<u32>(y));
  }

  export function u32(x: u32, y: u32): PointU32{
    return __internal.packToU64(x, y);
  }

  export function i32(x: i32, y: i32): PointI32{
    return __internal.packToU64(reinterpret<u32>(x), reinterpret<u32>(y));
  }
}

export class ControlPoints {
  p0: PointF32;
  p1: PointF32;
  p2: PointF32;
  p3: PointF32;

  constructor(p0: PointF32, p1: PointF32, p2: PointF32, p3: PointF32) {
    this.p0 = p0; this.p1 = p1; this.p2 = p2; this.p3 = p3;
  }

  fromScalars(
    x0: f32, y0: f32,
    x1: f32, y1: f32,
    x2: f32, y2: f32,
    x3: f32, y3: f32,
  ): ControlPoints {
    return new ControlPoints(
      Point.f32(x0, y0),
      Point.f32(x1, y1),
      Point.f32(x2, y2),
      Point.f32(x3, y3),
    );
  }

  fromPoints(p0: PointF32, p1: PointF32, p2: PointF32, p3: PointF32): ControlPoints {
    return new ControlPoints(p0, p1, p2, p3);
  }
}

// @ts-ignore: decorator
@inline
export function kind(_constructor: Constructor): void {}

// @ts-ignore: decorator
@inline
export function revert(): void { unreachable(); }


namespace __internal {
  // @ts-ignore: decorator
  @inline
  export function packToU64(lo: u32, hi: u32): u64 {
    return (<u64>lo) | ((<u64>hi) << 32);
  }

  export function bytesToHex(ptr: usize, len: usize): String {
    const chars = new Array<u16>(len << 1);
    let j: usize = 0;

    for (let i: usize = 0; i < len; i++) {
      const b: u8 = load<u8>(ptr + i);
      chars[j++] = nibble((b >> 4) & 0x0f);
      chars[j++] = nibble(b & 0x0f);
    }

    // Construct string directly from UTF-16 code units.
    return String.fromCharCodes(chars);
  }

  // @ts-ignore: decorator
  @inline
  function nibble(n: u32): i32 {
    return n < 10
      ? 0x30 + <i32>n        // '0'..'9'
      : 0x61 + <i32>(n - 10) // 'a'..'f'
  }
}


export namespace object {

  // @ts-ignore: decorator
  @external("object", "universe")
  declare function universe(): u64;

  // @ts-ignore: decorator
  @external("object", "set")
  declare function set(): u64;

  // @ts-ignore: decorator
  @external("object", "id")
  declare function id(): u64;

  // @ts-ignore: decorator
  @external("object", "kind")
  declare function kind(): u64;

  // @ts-ignore: decorator
  @external("object", "rev")
  declare function rev(): u32;

  // @ts-ignore: decorator
  @external("object", "kind_rev")
  declare function kindRev(): u32;

  // @ts-ignore: decorator
  @external("object", "set_rev")
  declare function setRev(): u32;

  // @ts-ignore: decorator
  @external("object", "set_data_json")
  declare function setDataJson(): Json;

  // @ts-ignore: decorator
  @external("object", "set_data_enum")
  declare function setDataEnum(): Enumeration;

  // @ts-ignore: decorator
  @external("object", "kind_data_json")
  declare function kindDataJson(): Json;

  // @ts-ignore: decorator
  @external("object", "kind_data_enum")
  declare function kindDataEnum(): Enumeration;

  // @ts-ignore: decorator
  @external("object", "inbound")
  declare function inbound(): Arcs;

  // @ts-ignore: decorator
  @external("object", "inbound_with")
  declare function inboundWith(kind: u64, rel: u64, set: u64): Arcs;

}

export namespace json {

  // @ts-ignore: decorator
  @external("json", "load")
  declare function load(hash: JsonHash): Json;

  // @ts-ignore: decorator
  @external("json", "new")
  declare function create(): Json;

  // @ts-ignore: decorator
  @external("json", "from")
  declare function from(json: string): Json;

  // @ts-ignore: decorator
  @external("json", "clone")
  declare function clone(json: Json): Json;

  // @ts-ignore: decorator
  @external("json", "delete")
  declare function remove(json: Json, ptr: string): void;

  // @ts-ignore: decorator
  @external("json", "set")
  declare function set(json: Json, ptr: string, val: Json): void;

  // @ts-ignore: decorator
  @external("json", "set_u64")
  declare function setU64(json: Json, ptr: string, val: u64): void;

  // @ts-ignore: decorator
  @external("json", "set_bool")
  declare function setBool(json: Json, ptr: string, val: bool): void;

  // @ts-ignore: decorator
  @external("json", "set_string")
  declare function setString(json: Json, ptr: string, val: string): void;

  // @ts-ignore: decorator
  @external("json", "get")
  declare function get(json: Json, ptr: string): Json;

  // @ts-ignore: decorator
  @external("json", "get_u64")
  declare function getU64(json: Json, ptr: string): u64;

  // @ts-ignore: decorator
  @external("json", "get_bool")
  declare function getBool(json: Json, ptr: string): bool;

  // @ts-ignore: decorator
  @external("json", "get_string")
  declare function getString(json: Json, ptr: string): string;

}

export namespace image {

  // @ts-ignore: decorator
  @external("image", "new")
  declare function create(w: u32, h: u32, color: ColorType): Image;

  // @ts-ignore: decorator
  @external("image", "from_pixel")
  declare function fromPixel(w: u32, h: u32, pixel: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "load")
  declare function load(hash: ImageHash): Image;

  // @ts-ignore: decorator
  @external("image", "crop")
  declare function crop(im: Image, x: u32, y: u32, width: u32, height: u32): Image;

  // @ts-ignore: decorator
  @external("image", "color")
  declare function color(im: Image): ColorType;

  // @ts-ignore: decorator
  @external("image", "width")
  declare function width(im: Image): u32;

  // @ts-ignore: decorator
  @external("image", "height")
  declare function height(im: Image): u32;

  // @ts-ignore: decorator
  @external("image", "grayscale")
  declare function grayscale(im: Image): Image;

  // @ts-ignore: decorator
  @external("image", "invert_mut")
  declare function invertMut(im: Image): void;

  // @ts-ignore: decorator
  @external("image", "resize")
  declare function resize(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  // @ts-ignore: decorator
  @external("image", "resize_exact")
  declare function resizeExact(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  // @ts-ignore: decorator
  @external("image", "thumbnail")
  declare function thumbnail(im: Image, nwidth: u32, nheight: u32): Image;

  // @ts-ignore: decorator
  @external("image", "thumbnail_exact")
  declare function thumbnailExact(im: Image, nwidth: u32, nheight: u32): Image;

  // @ts-ignore: decorator
  @external("image", "resize_to_fill")
  declare function resizeToFill(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  // @ts-ignore: decorator
  @external("image", "blur")
  declare function blur(im: Image, sigma: f32): Image;

  // @ts-ignore: decorator
  @external("image", "unsharpen")
  declare function unsharpen(im: Image, sigma: f32, threshold: i32): Image;

  // @ts-ignore: decorator
  @external("image", "adjust_contrast")
  declare function adjustContrast(im: Image, c: f32): Image;

  // @ts-ignore: decorator
  @external("image", "brighten")
  declare function brighten(im: Image, value: i32): Image;

  // @ts-ignore: decorator
  @external("image", "huerotate")
  declare function huerotate(im: Image, value: i32): Image;

  // @ts-ignore: decorator
  @external("image", "flipv")
  declare function flipv(im: Image): Image;

  // @ts-ignore: decorator
  @external("image", "fliph")
  declare function fliph(im: Image): Image;

  // @ts-ignore: decorator
  @external("image", "rotate90")
  declare function rotate90(im: Image): Image;

  // @ts-ignore: decorator
  @external("image", "rotate180")
  declare function rotate180(im: Image): Image;

  // @ts-ignore: decorator
  @external("image", "rotate270")
  declare function rotate270(im: Image): Image;

  // @ts-ignore: decorator
  @external("image", "rotate")
  declare function rotate(im: Image, center: PointF32, theta: f32, interpolation: Interpolation, def: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "rotate_about_center")
  declare function rotateAboutCenter(im: Image, theta: f32, interpolation: Interpolation, def: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "translate")
  declare function translate(im: Image, t: PointI32): Image;

  // @ts-ignore: decorator
  @external("image", "warp")
  declare function warp(im: Image, projection: Projection, interpolation: Interpolation, def: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "warp_into")
  declare function warpInto(im: Image, projection: Projection, interpolation: Interpolation, def: Pixel, out: Image): void;

  // @ts-ignore: decorator
  @external("image", "overlay")
  declare function overlay(bottom: Image, top: Image, x: i64, y: i64): void;

  // @ts-ignore: decorator
  @external("image", "draw_cross")
  declare function drawCross(im: Image, color: Pixel, x: i32, y: i32): Image;

  // @ts-ignore: decorator
  @external("image", "draw_cross_mut")
  declare function drawCrossMut(im: Image, color: Pixel, x: i32, y: i32): void;

  // @ts-ignore: decorator
  @external("image", "draw_cubic_bezier_curve")
  declare function drawCubicBezierCurve(im: Image, start: PointF32, end: PointF32, controlA: PointF32, controlB: PointF32, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_cubic_bezier_curve_mut")
  declare function drawCubicBezierCurveMut(im: Image, start: PointF32, end: PointF32, controlA: PointF32, controlB: PointF32, color: Pixel): void;

  // @ts-ignore: decorator
  @external("image", "draw_filled_circle")
  declare function drawFilledCircle(im: Image, center: PointI32, radius: i32, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_filled_circle_mut")
  declare function drawFilledCircleMut(im: Image, center: PointI32, radius: i32, color: Pixel): void;

  // @ts-ignore: decorator
  @external("image", "draw_filled_ellipse")
  declare function drawFilledEllipse(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_filled_ellipse_mut")
  declare function drawFilledEllipseMut(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): void;

  // @ts-ignore: decorator
  @external("image", "draw_filled_rect")
  declare function drawFilledRect(im: Image, rect: Rect, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_filled_rect_mut")
  declare function drawFilledRectMut(im: Image, rect: Rect, color: Pixel): void;

  // @ts-ignore: decorator
  @external("image", "draw_hollow_circle")
  declare function drawHollowCircle(im: Image, center: PointI32, radius: i32, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_hollow_circle_mut")
  declare function drawHollowCircleMut(im: Image, center: PointI32, radius: i32, color: Pixel): void;

  // @ts-ignore: decorator
  @external("image", "draw_hollow_ellipse")
  declare function drawHollowEllipse(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_hollow_ellipse_mut")
  declare function drawHollowEllipseMut(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): void;

  // @ts-ignore: decorator
  @external("image", "draw_hollow_rect")
  declare function drawHollowRect(im: Image, rect: Rect, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_hollow_rect_mut")
  declare function drawHollowRectMut(im: Image, rect: Rect, color: Pixel): void;

  // @ts-ignore: decorator
  @external("image", "draw_line_segment")
  declare function drawLineSegment(im: Image, start: PointF32, end: PointF32, color: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "draw_line_segment_mut")
  declare function drawLineSegmentMut(im: Image, start: PointF32, end: PointF32, color: Pixel): void;

}

export namespace enumeration {

  // @ts-ignore: decorator
  @external("enumeration", "load")
  declare function load(hash: EnumHash): Enumeration;

  // @ts-ignore: decorator
  @external("enumeration", "rows")
  declare function rows(enum_: Enumeration): u32;

  // @ts-ignore: decorator
  @external("enumeration", "cols")
  declare function cols(enum_: Enumeration): u32;

  // @ts-ignore: decorator
  @external("enumeration", "aux")
  declare function aux(enum_: Enumeration): u32;

  // @ts-ignore: decorator
  @external("enumeration", "aux_info")
  declare function auxInfo(enum_: Enumeration, index: u32): Info;

  // @ts-ignore: decorator
  @external("enumeration", "aux_json")
  declare function auxJson(enum_: Enumeration, index: u32): Json;

  // @ts-ignore: decorator
  @external("enumeration", "aux_image")
  declare function auxImage(enum_: Enumeration, index: u32): Image;

  // @ts-ignore: decorator
  @external("enumeration", "cell_info")
  declare function cellInfo(enum_: Enumeration, row: u32, col: u32): Info;

  // @ts-ignore: decorator
  @external("enumeration", "cell_json")
  declare function cellJson(enum_: Enumeration, row: u32, col: u32): Json;

  // @ts-ignore: decorator
  @external("enumeration", "cell_image")
  declare function cellImage(enum_: Enumeration, row: u32, col: u32): Image;

}

export namespace value {

  // @ts-ignore: decorator
  @external("value", "load")
  declare function load(ref: ValueRef): Value;

  // @ts-ignore: decorator
  @external("value", "index")
  declare function index(value: Value): u64;

  // @ts-ignore: decorator
  @external("value", "std")
  declare function std(value: Value): u8;

  // @ts-ignore: decorator
  @external("value", "decimals")
  declare function decimals(value: Value): u8;

  // @ts-ignore: decorator
  @external("value", "symbol")
  declare function symbol(value: Value): string;

  // @ts-ignore: decorator
  @external("value", "picture")
  declare function picture(value: Value): Image;

}

export namespace unique {

  // @ts-ignore: decorator
  @external("unique", "load")
  declare function load(ref: UniqueRef): Unique;

  // @ts-ignore: decorator
  @external("unique", "index")
  declare function index(unique: Unique): u64;

  // @ts-ignore: decorator
  @external("unique", "id")
  declare function id(unique: Unique): u64;

  // @ts-ignore: decorator
  @external("unique", "std")
  declare function std(unique: Unique): u8;

  // @ts-ignore: decorator
  @external("unique", "decimals")
  declare function decimals(unique: Unique): u8;

  // @ts-ignore: decorator
  @external("unique", "symbol")
  declare function symbol(unique: Unique): string;

  // @ts-ignore: decorator
  @external("unique", "picture")
  declare function picture(unique: Unique): Image;

}

export namespace arcs {

  // @ts-ignore: decorator
  @external("arcs", "count")
  declare function count(arcs: Arcs): u32;

  // @ts-ignore: decorator
  @external("arcs", "relation_id")
  declare function relationId(arcs: Arcs, index: u32): u64;

  // @ts-ignore: decorator
  @external("arcs", "relation_data")
  declare function relationData(arcs: Arcs, index: u32): u64;

  // @ts-ignore: decorator
  @external("arcs", "object_kind")
  declare function objectKind(arcs: Arcs, index: u32): u64;

  // @ts-ignore: decorator
  @external("arcs", "object_set")
  declare function objectSet(arcs: Arcs, index: u32): u64;

  // @ts-ignore: decorator
  @external("arcs", "object_id")
  declare function objectId(arcs: Arcs, index: u32): u64;

  // @ts-ignore: decorator
  @external("arcs", "object_facet_json")
  declare function objectFacetJson(arcs: Arcs, index: u32, sel: u32): Json;

  // @ts-ignore: decorator
  @external("arcs", "object_facet_image")
  declare function objectFacetImage(arcs: Arcs, index: u32, sel: u32): Image;

}

export namespace projection {

  // @ts-ignore: decorator
  @external("projection", "from_control_points")
  declare function fromControlPoints(from: ControlPoints, to: ControlPoints): Projection;

  // @ts-ignore: decorator
  @external("projection", "from_matrix")
  declare function fromMatrix(transform: Mat3): Projection;

  // @ts-ignore: decorator
  @external("projection", "translate")
  declare function translate(tx: f32, ty: f32): Projection;

  // @ts-ignore: decorator
  @external("projection", "rotate")
  declare function rotate(theta: f32): Projection;

  // @ts-ignore: decorator
  @external("projection", "scale")
  declare function scale(sx: f32, sy: f32): Projection;

  // @ts-ignore: decorator
  @external("projection", "invert")
  declare function invert(me: Projection): Projection;

  // @ts-ignore: decorator
  @external("projection", "and_then")
  declare function andThen(me: Projection, other: Projection): Projection;

}