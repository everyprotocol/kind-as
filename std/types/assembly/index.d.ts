/// <reference types="assemblyscript/std/assembly/index.d.ts"/>

declare class Hash256 {
  private constructor();
}

declare class Bytes32 {
  /**
   * Private constructor to prevent direct instantiation.
   */
  private constructor();

  /**
   * Extracts an 8-bit unsigned integer (u8) at the given offset.
   * @param offset - The byte offset (0 to 31).
   * @returns The extracted unsigned 8-bit integer.
   */
  extractU8(offset: u8): u8;

  /**
   * Extracts a 16-bit unsigned integer (u16) at the given offset.
   * @param offset - The byte offset (0 to 30).
   * @returns The extracted unsigned 16-bit integer.
   */
  extractU16(offset: u8): u16;

  /**
   * Extracts a 32-bit unsigned integer (u32) at the given offset.
   * @param offset - The byte offset (0 to 28).
   * @returns The extracted unsigned 32-bit integer.
   */
  extractU32(offset: u8): u32;

  /**
   * Extracts a 64-bit unsigned integer (u64) at the given offset.
   * @param offset - The byte offset (0 to 24).
   * @returns The extracted unsigned 64-bit integer.
   */
  extractU64(offset: u8): u64;

  /**
   * Extracts a 128-bit unsigned integer (u128) at the given offset.
   * @param offset - The byte offset (0 to 16).
   * @returns The extracted unsigned 128-bit integer.
   */
  // extractU128(offset: u8): u128;
}

declare class Value {
  private constructor();
}

declare class Artifact {
  private constructor();
}

declare class Json {
  private constructor();
}

declare class Image {
  private constructor();
}

declare class Projection {
  private constructor();
}

declare class Connections {
  private constructor();
}

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

declare abstract class Pixel {
  type: u8;
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

declare class PointU32 {
  x: u32;
  y: u32;
  constructor(x: u32, y: u32);
}

declare class PointI32 {
  x: i32;
  y: i32;
  constructor(x: i32, y: i32);
}

declare class PointF32 {
  x: f32;
  y: f32;
  constructor(x: f32, y: f32);
}

declare class Rect {
  left: i32;
  top: i32;
  width: u32;
  height: u32;
  constructor(left: i32, top: i32, width: u32, height: u32);
}

declare class Matrix3x3F32 {
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

declare class ControlPointsF32 {
  x0: f32;
  y0: f32;
  x1: f32;
  y1: f32;
  x2: f32;
  y2: f32;
  x3: f32;
  y3: f32;
  constructor(x0: f32, y0: f32, x1: f32, y1: f32, x2: f32, y2: f32, x3: f32, y3: f32);
}

declare function kind(constructor: Constructor): void;

declare function revert(): void;

declare namespace object {
  export function universe(): u64;

  export function set(): u64;

  export function kind(): u64;

  export function id(): u64;

  export function rev(): u32;

  export function asset(sel: u32): Hash256;

  export function assetUri(sel: u32): String;

  export function assetUri2(name: String): String;

  export function setRev(): u32;

  export function setData(): Json;

  export function kindRev(): u32;

  export function kindData(): Json;
}

declare namespace connection {
  export function all(): Connections;

  export function filter(kind: u64, rel: u64, set: u64): Connections;

  export function count(conns: Connections): u32;

  export function relationIdAt(conns: Connections, index: u32): u64;

  export function relationDataAt(conns: Connections, index: u32): u64;

  export function objectKindAt(conns: Connections, index: u32): u64;

  export function objectSetAt(conns: Connections, index: u32): u64;

  export function objectIdAt(conns: Connections, index: u32): u64;

  export function objectAssetAt(conns: Connections, index: u32, sel: u32): Hash256;
}

declare namespace image {
  /**
   * Creates a new image.
   *
   * @param w - Width of the image in pixels
   * @param h - Height of the image in pixels
   * @param color - Color type for the image buffer
   *
   * @returns A new DynamicImage instance
   */
  export function create(w: u32, h: u32, color: ColorType): Image;

  /**
   * Constructs a new image by copying a pixel
   */
  export function fromPixel(w: u32, h: u32, pixel: Pixel): Image;

  export function load(ma: Bytes32): Image;

  /**
   * Return a cut-out of this image delimited by the bounding rectangle.
   */
  export function crop(im: Image, x: u32, y: u32, width: u32, height: u32): Image;

  /**
   * Return this image's color type.
   */
  export function color(im: Image): ColorType;

  /**
   * Returns the width of the underlying image
   */
  export function width(im: Image): u32;

  /**
   * Returns the height of the underlying image
   */
  export function height(im: Image): u32;

  /**
   * Return a grayscale version of this image.
   * Returns `Luma` images in most cases. However, for `f32` images,
   * this will return a grayscale `Rgb/Rgba` image instead.
   */
  export function grayscale(im: Image): Image;

  /**
   * Invert the colors of this image.
   * This method operates inplace.
   */
  export function invertMut(im: Image): void;

  /**
   * Resize this image using the specified filter algorithm.
   * Returns a new image. The image's aspect ratio is preserved.
   * The image is scaled to the maximum possible size that fits
   * within the bounds specified by `nwidth` and `nheight`.
   */
  export function resize(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  /**
   * Resize this image using the specified filter algorithm.
   * Returns a new image. Does not preserve aspect ratio.
   * `nwidth` and `nheight` are the new image's dimensions
   */
  export function resizeExact(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  /**
   * Scale this image down to fit within a specific size.
   * Returns a new image. The image's aspect ratio is preserved.
   * The image is scaled to the maximum possible size that fits
   * within the bounds specified by `nwidth` and `nheight`.
   * This method uses a fast integer algorithm where each source
   * pixel contributes to exactly one target pixel.
   * May give aliasing artifacts if new size is close to old size.
   */
  export function thumbnail(im: Image, nwidth: u32, nheight: u32): Image;

  /**
   * Scale this image down to a specific size.
   * Returns a new image. Does not preserve aspect ratio.
   * `nwidth` and `nheight` are the new image's dimensions.
   * This method uses a fast integer algorithm where each source
   * pixel contributes to exactly one target pixel.
   * May give aliasing artifacts if new size is close to old size.
   */
  export function thumbnailExact(im: Image, nwidth: u32, nheight: u32): Image;

  /**
   * Resize this image using the specified filter algorithm.
   * Returns a new image. The image's aspect ratio is preserved.
   * The image is scaled to the maximum possible size that fits
   * within the larger (relative to aspect ratio) of the bounds
   * specified by `nwidth` and `nheight`, then cropped to
   * fit within the other bound.
   */
  export function resizeToFill(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  /**
   * Performs a Gaussian blur on this image.
   * `sigma` is a measure of how much to blur by.
   */
  export function blur(im: Image, sigma: f32): Image;

  /**
   * Performs an unsharpen mask on this image.
   * `sigma` is the amount to blur the image by.
   * `threshold` is a control of how much to sharpen.
   */
  export function unsharpen(im: Image, sigma: f32, threshold: i32): Image;

  /**
   * Filters this image with the specified 3x3 kernel.
   * Adjust the contrast of this image.
   * `contrast` is the amount to adjust the contrast by.
   * Negative values decrease the contrast and positive values increase the contrast.
   */
  export function adjustContrast(im: Image, c: f32): Image;

  /**
   * Brighten the pixels of this image.
   * `value` is the amount to brighten each pixel by.
   * Negative values decrease the brightness and positive values increase it.
   */
  export function brighten(im: Image, value: i32): Image;

  /**
   * Hue rotate the supplied image.
   * `value` is the degrees to rotate each pixel by.
   * 0 and 360 do nothing, the rest rotates by the given degree value.
   * just like the css webkit filter hue-rotate(180)
   */
  export function huerotate(im: Image, value: i32): Image;

  /**
   * Flip this image vertically
   */
  export function flipv(im: Image): Image;

  /**
   * Flip this image horizontally
   */
  export function fliph(im: Image): Image;

  /**
   * Rotate this image 90 degrees clockwise.
   */
  export function rotate90(im: Image): Image;

  /**
   * Rotate this image 180 degrees clockwise.
   */
  export function rotate180(im: Image): Image;

  /**
   * Rotate this image 270 degrees clockwise.
   */
  export function rotate270(im: Image): Image;

  export function rotate(im: Image, center: PointF32, theta: f32, interpolation: Interpolation, _default: Pixel): Image;

  export function rotateAboutCenter(im: Image, theta: f32, interpolation: Interpolation, _default: Pixel): Image;

  export function translate(im: Image, t: PointI32): Image;

  export function warp(im: Image, projection: Projection, interpolation: Interpolation, _default: Pixel): Image;

  export function warpInto(
    im: Image,
    projection: Projection,
    interpolation: Interpolation,
    _default: Pixel,
    out: Image
  ): void;

  /**
   * Overlay an image at a given coordinate (x, y)
   */
  export function overlay(bottom: Image, top: Image, x: i64, y: i64): void;

  export function drawCross(im: Image, color: Pixel, x: i32, y: i32): Image;

  export function drawCrossMut(im: Image, color: Pixel, x: i32, y: i32): void;

  export function drawCubicBezierCurve(
    im: Image,
    start: PointF32,
    end: PointF32,
    controlA: PointF32,
    controlB: PointF32,
    color: Pixel
  ): Image;

  export function drawCubicBezierCurveMut(
    im: Image,
    start: PointF32,
    end: PointF32,
    controlA: PointF32,
    controlB: PointF32,
    color: Pixel
  ): void;

  export function drawFilledCircle(im: Image, center: PointI32, radius: i32, color: Pixel): Image;

  export function drawFilledCircleMut(im: Image, center: PointI32, radius: i32, color: Pixel): void;

  export function drawFilledEllipse(
    im: Image,
    center: PointI32,
    widthRadius: i32,
    heightRadius: i32,
    color: Pixel
  ): Image;

  export function drawFilledEllipseMut(
    im: Image,
    center: PointI32,
    widthRadius: i32,
    heightRadius: i32,
    color: Pixel
  ): void;

  export function drawFilledRect(im: Image, rect: Rect, color: Pixel): Image;

  export function drawFilledRectMut(im: Image, rect: Rect, color: Pixel): void;

  export function drawHollowCircle(im: Image, center: PointI32, radius: i32, color: Pixel): Image;

  export function drawHollowCircleMut(im: Image, center: PointI32, radius: i32, color: Pixel): void;

  export function drawHollowEllipse(
    im: Image,
    center: PointI32,
    widthRadius: i32,
    heightRadius: i32,
    color: Pixel
  ): Image;

  export function drawHollowEllipseMut(
    im: Image,
    center: PointI32,
    widthRadius: i32,
    heightRadius: i32,
    color: Pixel
  ): void;

  export function drawHollowRect(im: Image, rect: Rect, color: Pixel): Image;

  export function drawHollowRectMut(im: Image, rect: Rect, color: Pixel): void;

  export function drawLineSegment(im: Image, start: PointF32, end: PointF32, color: Pixel): Image;

  export function drawLineSegmentMut(im: Image, start: PointF32, end: PointF32, color: Pixel): void;
}

declare namespace projection {
  export function fromControlPoints(from: ControlPointsF32, to: ControlPointsF32): Projection;

  export function fromMatrix(transform: Matrix3x3F32): Projection;

  export function translate(tx: f32, ty: f32): Projection;

  export function rotate(theta: f32): Projection;

  export function scale(sx: f32, sy: f32): Projection;

  export function invert(me: Projection): Projection;

  export function andThen(me: Projection, other: Projection): Projection;
}

declare namespace json {
  export function create(value: String): Json;

  export function load(ma: Bytes32): Json;

  export function clone(json: Json): Json;

  export function remove(json: Json, ptr: String): void;

  export function set(json: Json, ptr: String, val: Json): void;

  export function setU64(json: Json, ptr: String, val: u64): void;

  export function setBool(json: Json, ptr: String, val: boolean): void;

  export function setString(json: Json, ptr: String, val: String): void;

  export function get(json: Json, ptr: String): Json;

  export function getU64(json: Json, ptr: String): u64;

  export function getBool(json: Json, ptr: String): boolean;

  export function getString(json: Json, ptr: String): String;
}
