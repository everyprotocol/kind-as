/// <reference types="assemblyscript/std/assembly/index.d.ts"/>

declare enum ColorType {
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

declare enum FilterType {
  Nearest,
  Triangle,
  CatmullRom,
  Gaussian,
  Lanczos3,
}

declare enum Interpolation {
  Nearest,
  Bilinear,
  Bicubic,
}

declare type Json = externref;
declare type Image = externref;
declare type Enumeration = externref;
declare type Permutation = externref;
declare type Value = externref;
declare type Unique = externref;
declare type Arcs = externref;
declare type Projection = externref;

declare abstract class Element {
  protected constructor();
  hex(): String;
}

declare class JsonHash extends Element {
  private constructor();
  load(): Json;
}

declare class ImageHash extends Element {
  private constructor();
  load(): Image;
}

declare class WasmHash extends Element {
  private constructor();
}

declare class EnumHash extends Element {
  private constructor();
  load(): Enumeration;
}

declare class PermHash extends Element {
  private constructor();
  load(): Permutation;
}

declare class ValueRef extends Element {
  private constructor();
  load(): Value;
}

declare class UniqueRef extends Element {
  private constructor();
  load(): Unique;
}

declare class Info extends Element {
  private constructor();
  u8(offset: u8): u8;
  u16(offset: u8): u16;
  u32(offset: u8): u32;
  u64(offset: u8): u64;
  i8(offset: u8): i8;
  i16(offset: u8): i16;
  i32(offset: u8): i32;
  i64(offset: u8): i64;
  f32(offset: u8): f32;
  f64(offset: u8): f64;
}

declare abstract class Pixel {
  readonly c: ColorType;
  protected constructor(c: ColorType);
}

declare class PixelL8 extends Pixel {
  y: u8;
  constructor(y: u8);
}

declare class PixelLa8 extends Pixel {
  y: u8;
  a: u8;
  constructor(y: u8, a: u8);
}

declare class PixelRgb8 extends Pixel {
  r: u8;
  g: u8;
  b: u8;
  constructor(r: u8, g: u8, b: u8);
}

declare class PixelRgba8 extends Pixel {
  r: u8;
  g: u8;
  b: u8;
  a: u8;
  constructor(r: u8, g: u8, b: u8, a: u8);
}

declare class PixelL16 extends Pixel {
  y: u16;
  constructor(y: u16);
}

declare class PixelLa16 extends Pixel {
  y: u16;
  a: u16;
  constructor(y: u16, a: u16);
}

declare class PixelRgb16 extends Pixel {
  r: u16;
  g: u16;
  b: u16;
  constructor(r: u16, g: u16, b: u16);
}

declare class PixelRgba16 extends Pixel {
  r: u16;
  g: u16;
  b: u16;
  a: u16;
  constructor(r: u16, g: u16, b: u16, a: u16);
}

declare class PixelRgbF32 extends Pixel {
  r: f32;
  g: f32;
  b: f32;
  constructor(r: f32, g: f32, b: f32);
}

declare class PixelRgbaF32 extends Pixel {
  r: f32;
  g: f32;
  b: f32;
  a: f32;
  constructor(r: f32, g: f32, b: f32, a: f32);
}

declare namespace Pixel {
  function L8(y: u8): PixelL8;
  function La8(y: u8, a: u8): PixelLa8;
  function Rgb8(r: u8, g: u8, b: u8): PixelRgb8;
  function Rgba8(r: u8, g: u8, b: u8, a: u8): PixelRgba8;
  function Rgb16(r: u16, g: u16, b: u16): PixelRgb16;
  function Rgba16(r: u16, g: u16, b: u16, a: u16): PixelRgba16;
  function RgbF32(r: f32, g: f32, b: f32): PixelRgbF32;
  function RgbaF32(r: f32, g: f32, b: f32, a: f32): PixelRgbaF32;
}

declare class Rect {
  left: i32;
  top: i32;
  width: u32;
  height: u32;
  constructor(left: i32, top: i32, width: u32, height: u32);
}

declare class Mat3 {
  e0: f32;
  e1: f32;
  e2: f32;
  e3: f32;
  e4: f32;
  e5: f32;
  e6: f32;
  e7: f32;
  e8: f32;
  constructor(e0: f32, e1: f32, e2: f32, e3: f32, e4: f32, e5: f32, e6: f32, e7: f32, e8: f32);
}

type PointF32 = u64;
type PointU32 = u64;
type PointI32 = u64;

declare namespace Point {
  function F32(x: f32, y: f32): PointF32;
  function U32(x: u32, y: u32): PointU32;
  function I32(x: i32, y: i32): PointI32;
}

declare class ControlPoints {
  p0: PointF32;
  p1: PointF32;
  p2: PointF32;
  p3: PointF32;
  constructor(p0: PointF32, p1: PointF32, p2: PointF32, p3: PointF32);
  static fromScalars(x0: f32, y0: f32, x1: f32, y1: f32, x2: f32, y2: f32, x3: f32, y3: f32): ControlPoints;
  static fromPoints(p0: PointF32, p1: PointF32, p2: PointF32, p3: PointF32): ControlPoints;
}

declare function kind(constructor: Constructor): void;

declare function revert(): void;


declare namespace object {
  function universe(): u64;
  function set(): u64;
  function id(): u64;
  function kind(): u64;
  function rev(): u32;
  function kindRev(): u32;
  function setRev(): u32;
  function setDataJson(): Json;
  function setDataEnum(): Enumeration;
  function kindDataJson(): Json;
  function kindDataEnum(): Enumeration;
  function inbound(): Arcs;
  function inboundWith(kind: u64, rel: u64, set: u64): Arcs;
}

declare namespace json {
  function load(hash: JsonHash): Json;
  function create(): Json;
  function from(json: string): Json;
  function clone(json: Json): Json;
  function remove(json: Json, ptr: string): void;
  function set(json: Json, ptr: string, val: Json): void;
  function setU64(json: Json, ptr: string, val: u64): void;
  function setBool(json: Json, ptr: string, val: bool): void;
  function setString(json: Json, ptr: string, val: string): void;
  function get(json: Json, ptr: string): Json;
  function getU64(json: Json, ptr: string): u64;
  function getBool(json: Json, ptr: string): bool;
  function getString(json: Json, ptr: string): string;
}

declare namespace image {
  function create(w: u32, h: u32, color: ColorType): Image;
  function fromPixel(w: u32, h: u32, pixel: Pixel): Image;
  function load(hash: ImageHash): Image;
  function crop(im: Image, x: u32, y: u32, width: u32, height: u32): Image;
  function color(im: Image): ColorType;
  function width(im: Image): u32;
  function height(im: Image): u32;
  function grayscale(im: Image): Image;
  function invertMut(im: Image): void;
  function resize(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;
  function resizeExact(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;
  function thumbnail(im: Image, nwidth: u32, nheight: u32): Image;
  function thumbnailExact(im: Image, nwidth: u32, nheight: u32): Image;
  function resizeToFill(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;
  function blur(im: Image, sigma: f32): Image;
  function unsharpen(im: Image, sigma: f32, threshold: i32): Image;
  function adjustContrast(im: Image, c: f32): Image;
  function brighten(im: Image, value: i32): Image;
  function huerotate(im: Image, value: i32): Image;
  function flipv(im: Image): Image;
  function fliph(im: Image): Image;
  function rotate90(im: Image): Image;
  function rotate180(im: Image): Image;
  function rotate270(im: Image): Image;
  function rotate(im: Image, center: PointF32, theta: f32, interpolation: Interpolation, def: Pixel): Image;
  function rotateAboutCenter(im: Image, theta: f32, interpolation: Interpolation, def: Pixel): Image;
  function translate(im: Image, t: PointI32): Image;
  function warp(im: Image, projection: Projection, interpolation: Interpolation, def: Pixel): Image;
  function warpInto(im: Image, projection: Projection, interpolation: Interpolation, def: Pixel, out: Image): void;
  function overlay(bottom: Image, top: Image, x: i64, y: i64): void;
  function drawCross(im: Image, color: Pixel, x: i32, y: i32): Image;
  function drawCrossMut(im: Image, color: Pixel, x: i32, y: i32): void;
  function drawCubicBezierCurve(im: Image, start: PointF32, end: PointF32, controlA: PointF32, controlB: PointF32, color: Pixel): Image;
  function drawCubicBezierCurveMut(im: Image, start: PointF32, end: PointF32, controlA: PointF32, controlB: PointF32, color: Pixel): void;
  function drawFilledCircle(im: Image, center: PointI32, radius: i32, color: Pixel): Image;
  function drawFilledCircleMut(im: Image, center: PointI32, radius: i32, color: Pixel): void;
  function drawFilledEllipse(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): Image;
  function drawFilledEllipseMut(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): void;
  function drawFilledRect(im: Image, rect: Rect, color: Pixel): Image;
  function drawFilledRectMut(im: Image, rect: Rect, color: Pixel): void;
  function drawHollowCircle(im: Image, center: PointI32, radius: i32, color: Pixel): Image;
  function drawHollowCircleMut(im: Image, center: PointI32, radius: i32, color: Pixel): void;
  function drawHollowEllipse(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): Image;
  function drawHollowEllipseMut(im: Image, center: PointI32, widthRadius: i32, heightRadius: i32, color: Pixel): void;
  function drawHollowRect(im: Image, rect: Rect, color: Pixel): Image;
  function drawHollowRectMut(im: Image, rect: Rect, color: Pixel): void;
  function drawLineSegment(im: Image, start: PointF32, end: PointF32, color: Pixel): Image;
  function drawLineSegmentMut(im: Image, start: PointF32, end: PointF32, color: Pixel): void;
}

declare namespace enumeration {
  function load(hash: EnumHash): Enumeration;
  function rows(enum_: Enumeration): u32;
  function cols(enum_: Enumeration): u32;
  function aux(enum_: Enumeration): u32;
  function auxInfo(enum_: Enumeration, index: u32): Info;
  function auxJson(enum_: Enumeration, index: u32): Json;
  function auxImage(enum_: Enumeration, index: u32): Image;
  function cellInfo(enum_: Enumeration, row: u32, col: u32): Info;
  function cellJson(enum_: Enumeration, row: u32, col: u32): Json;
  function cellImage(enum_: Enumeration, row: u32, col: u32): Image;
}

declare namespace value {
  function load(ref: ValueRef): Value;
  function index(value: Value): u64;
  function std(value: Value): u8;
  function decimals(value: Value): u8;
  function symbol(value: Value): string;
  function meta(value: Value): Json;
  function figure(value: Value): Image;
}

declare namespace unique {
  function load(ref: UniqueRef): Unique;
  function index(unique: Unique): u64;
  function id(unique: Unique): u64;
  function std(unique: Unique): u8;
  function decimals(unique: Unique): u8;
  function symbol(unique: Unique): string;
  function meta(unique: Unique): Json;
  function figure(unique: Unique): Image;
}

declare namespace arcs {
  function count(arcs: Arcs): u32;
  function relationId(arcs: Arcs, index: u32): u64;
  function relationData(arcs: Arcs, index: u32): u64;
  function objectKind(arcs: Arcs, index: u32): u64;
  function objectSet(arcs: Arcs, index: u32): u64;
  function objectId(arcs: Arcs, index: u32): u64;
  function objectFacetJson(arcs: Arcs, index: u32, sel: u32): Json;
  function objectFacetImage(arcs: Arcs, index: u32, sel: u32): Image;
}

declare namespace projection {
  function fromControlPoints(from: ControlPoints, to: ControlPoints): Projection;
  function fromMatrix(transform: Mat3): Projection;
  function translate(tx: f32, ty: f32): Projection;
  function rotate(theta: f32): Projection;
  function scale(sx: f32, sy: f32): Projection;
  function invert(me: Projection): Projection;
  function andThen(me: Projection, other: Projection): Projection;
}