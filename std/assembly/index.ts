/// <reference types="assemblyscript/std/assembly/index.d.ts"/>

// @ts-ignore: decorator
@unmanaged
export class Hash256 {
  private a: u64;
  private b: u64;
  private c: u64;
  private d: u64;
  private constructor() {}
};

// @ts-ignore: decorator
@unmanaged
export class Bytes32 {
    private a: u64;
    private b: u64;
    private c: u64;
    private d: u64;

    private constructor() {}

    /**
     * Extracts an 8-bit unsigned integer (u8) at the given offset.
     * @param offset The byte offset (0 to 31).
     * @returns The extracted unsigned 8-bit integer.
     */
    extractU8(offset: u8): u8 {
      const index = offset >> 3; // Determine which u64 contains the byte.
      const shift = (offset % 8) * 8; // Calculate the bit shift for the byte.
      const word = this.getWord(index);
      return <u8>((word >> shift) & 0xff); // Extract the 8-bit value.
    }

    /**
     * Extracts a 16-bit unsigned integer (u16) at the given offset.
     * @param offset The byte offset (0 to 30).
     * @returns The extracted unsigned 16-bit integer.
     */
    extractU16(offset: u8): u16 {
      const index = offset >> 3;
      const shift = (offset % 8) * 8;
      const word = this.getWord(index);
      return <u16>((word >> shift) & 0xffff); // Extract the 16-bit value.
    }

    /**
     * Extracts a 32-bit unsigned integer (u32) at the given offset.
     * @param offset The byte offset (0 to 28).
     * @returns The extracted unsigned 32-bit integer.
     */
    extractU32(offset: u8): u32 {
      const index = offset >> 3;
      const shift = (offset % 8) * 8;
      const word = this.getWord(index);
      return <u32>((word >> shift) & 0xffffffff); // Extract the 32-bit value.
    }

    /**
     * Extracts a 64-bit unsigned integer (u64) at the given offset.
     * @param offset The byte offset (0 to 24).
     * @returns The extracted unsigned 64-bit integer.
     */
    extractU64(offset: u8): u64 {
      const index = offset >> 3;
      const shift = (offset % 8) * 8;
      const word = this.getWord(index);
      return (word >> shift) & 0xffffffffffffffff; // Extract the 64-bit value.
    }

    /**
     * Extracts a 128-bit unsigned integer (u128) at the given offset.
     * @param offset The byte offset (0 to 16).
     * @returns The extracted unsigned 128-bit integer.
     */
    // extractU128(offset: u8): u128 {
    //   assert(offset <= 16, "Offset out of bounds for u128 extraction");

    //   // Calculate the two u64 values involved.
    //   const lowIndex = offset >> 3;
    //   const highIndex = lowIndex + 1;

    //   const lowWord = this.getWord(lowIndex);
    //   const highWord = this.getWord(highIndex);

    //   const shift = (offset % 8) * 8;

    //   const lowPart = (lowWord >> shift);
    //   const highPart = (highWord << (64 - shift));

    //   return <u128>(lowPart | highPart);
    // }

    /**
     * Helper method to retrieve the appropriate u64 word based on index.
     * @param index The index of the u64 word (0, 1, 2, or 3).
     * @returns The u64 word at the specified index.
     */
    private getWord(index: u8): u64 {
      if (index == 0) return this.a;
      if (index == 1) return this.b;
      if (index == 2) return this.c;
      if (index == 3) return this.d;
      return unreachable();
    }
}

// @ts-ignore: decorator
@unmanaged
export class Value {
  private a: u64;
  private b: u64;
  private c: u64;
  private d: u64;
  private constructor() {}
}

// @ts-ignore: decorator
@unmanaged
export class Artifact {
  private a: u64;
  private b: u64;
  private c: u64;
  private d: u64;
  private constructor() {}
}

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
};

export enum FilterType {
	Nearest,
	Triangle,
	CatmullRom,
	Gaussian,
	Lanczos3,
};

export enum Interpolation {
	Nearest,
	Bilinear,
	Bicubic,
}

export type Json = externref;

export type Image = externref;

export type Projection = externref;

export type Connections = externref;


// @ts-ignore: decorator
@unmanaged
export abstract class Pixel {
  type: u8;
}

// @ts-ignore: decorator
@unmanaged
export class PixelL8 extends Pixel {
  y: u8;

  constructor(y: u8) {
    super();
    this.type = 0;
    this.y = y;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelLa8 extends Pixel {
  y: u8;
  a: u8;

  constructor(y: u8, a: u8) {
    super();
    this.type = 1;
    this.y = y;
    this.a = a;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelRgb8 extends Pixel {
  r: u8;
  g: u8;
  b: u8;

  constructor(r: u8, g: u8, b: u8) {
    super();
    this.type = 2;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelRgba8 extends Pixel {
  r: u8;
  g: u8;
  b: u8;
  a: u8;

  constructor(r: u8, g: u8, b: u8, a: u8) {
    super();
    this.type = 3;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelL16 extends Pixel {
  y: u16;

  constructor(y: u16) {
    super();
    this.type = 4;
    this.y = y;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelLa16 extends Pixel {
  y: u16;
  a: u16;

  constructor(y: u16, a: u16) {
    super();
    this.type = 5;
    this.y = y;
    this.a = a;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelRgb16 extends Pixel {
  r: u16;
  g: u16;
  b: u16;

  constructor(r: u16, g: u16, b: u16) {
    super();
    this.type = 6;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelRgba16 extends Pixel {
  r: u16;
  g: u16;
  b: u16;
  a: u16;

  constructor(r: u16, g: u16, b: u16, a: u16) {
    super();
    this.type = 7;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelRgbF32 extends Pixel {
  r: f32;
  g: f32;
  b: f32;

  constructor(r: f32, g: f32, b: f32) {
    super();
    this.type = 8;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PixelRgbaF32 extends Pixel {
  r: f32;
  g: f32;
  b: f32;
  a: f32;

  constructor(r: f32, g: f32, b: f32, a: f32) {
    super();
    this.type = 9;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PointU32 {
  x: u32;
  y: u32;

  constructor(x: u32, y: u32) {
    this.x = x;
    this.y = y;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PointI32 {
  x: i32;
  y: i32;

  constructor(x: i32, y: i32) {
    this.x = x;
    this.y = y;
  }
}

// @ts-ignore: decorator
@unmanaged
export class PointF32 {
  x: f32;
  y: f32;

  constructor(x: f32, y: f32) {
    this.x = x;
    this.y = y;
  }
}

// @ts-ignore: decorator
@unmanaged
export class Matrix3x3F32 {
  e0: f32;
  e1: f32;
  e2: f32;
  e3: f32;
  e4: f32;
  e5: f32;
  e6: f32;
  e7: f32;
  e8: f32;

  constructor(e0: f32, e1: f32, e2: f32, e3: f32, e4: f32, e5: f32, e6: f32, e7: f32, e8: f32) {
    this.e0 = e0;
    this.e1 = e1;
    this.e2 = e2;
    this.e3 = e3;
    this.e4 = e4;
    this.e5 = e5;
    this.e6 = e6;
    this.e7 = e7;
    this.e8 = e8;
  }
};

// @ts-ignore: decorator
@unmanaged
export class Rect {
  left: i32;
  top: i32;
  width: u32;
  height: u32;

  constructor(left: i32, top: i32, width: u32, height: u32) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }
}

// @ts-ignore: decorator
@unmanaged
export class ControlPointsF32 {
  x0: f32;
  y0: f32;
  x1: f32;
  y1: f32;
  x2: f32;
  y2: f32;
  x3: f32;
  y3: f32;

  constructor(
      x0: f32, y0: f32,
      x1: f32, y1: f32,
      x2: f32, y2: f32,
      x3: f32, y3: f32
    ) {
      this.x0 = x0;
      this.y0 = y0;
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.x3 = x3;
      this.y3 = y3;
    }
}

// @ts-ignore: decorator
@inline
export function kind(constructor: Constructor): void { }

// @ts-ignore: decorator
@inline
export function revert(): void { unreachable(); }


export namespace object {
  // @ts-ignore: decorator
  @external("object", "universe")
  declare function universe(): u64;

  // @ts-ignore: decorator
  @external("object", "set")
  declare function set(): u64;

  // @ts-ignore: decorator
  @external("object", "kind")
  declare function kind(): u64;

  // @ts-ignore: decorator
  @external("object", "id")
  declare function id(): u64;

  // @ts-ignore: decorator
  @external("object", "rev")
  declare function rev(): u32;

  // @ts-ignore: decorator
  @external("object", "asset")
  declare function asset(sel: u32): Hash256;

  // @ts-ignore: decorator
  @external("object", "asset_uri")
  declare function assetUri(sel: u32): String;

  // @ts-ignore: decorator
  @external("object", "asset_uri2")
  declare function assetUri2(name: String): String;

  // @ts-ignore: decorator
  @external("object", "set_rev")
  declare function setRev(): u32;

  // @ts-ignore: decorator
  @external("object", "set_data")
  declare function setData(): Json;

  // @ts-ignore: decorator
  @external("object", "kind_rev")
  declare function kindRev(): u32;

  // @ts-ignore: decorator
  @external("object", "kind_data")
  declare function kindData(): Json;

}

export namespace connection {
  // @ts-ignore: decorator
  @external("connection", "all")
  declare function all(): Connections;

  // @ts-ignore: decorator
  @external("connection", "filter")
  declare function filter(kind: u64, rel: u64, set: u64): Connections;

  // @ts-ignore: decorator
  @external("connection", "count")
  declare function count(conns: Connections): u32;

  // @ts-ignore: decorator
  @external("connection", "relation_id_at")
  declare function relationIdAt(conns: Connections, index: u32): u64;

  // @ts-ignore: decorator
  @external("connection", "relation_data_at")
  declare function relationDataAt(conns: Connections, index: u32): u64;

  // @ts-ignore: decorator
  @external("connection", "object_kind_at")
  declare function objectKindAt(conns: Connections, index: u32): u64;

  // @ts-ignore: decorator
  @external("connection", "object_set_at")
  declare function objectSetAt(conns: Connections, index: u32): u64;

  // @ts-ignore: decorator
  @external("connection", "object_id_at")
  declare function objectIdAt(conns: Connections, index: u32): u64;

  // @ts-ignore: decorator
  @external("connection", "object_asset_at")
  declare function objectAssetAt(conns: Connections, index: u32, sel: u32): Hash256;

}

export namespace image {
  /**
   * Creates a new image.
   *
   * @param w - Width of the image in pixels
   * @param h - Height of the image in pixels
   * @param color - Color type for the image buffer
   *
   * @returns A new DynamicImage instance
   */
  // @ts-ignore: decorator
  @external("image", "new")
  declare function create(w: u32, h: u32, color: ColorType): Image;

  /**
   * Constructs a new image by copying a pixel
   */
  // @ts-ignore: decorator
  @external("image", "from_pixel")
  declare function fromPixel(w: u32, h: u32, pixel: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "load")
  declare function load(ma: Bytes32): Image;

  /**
   * Return a cut-out of this image delimited by the bounding rectangle.
   */
  // @ts-ignore: decorator
  @external("image", "crop")
  declare function crop(im: Image, x: u32, y: u32, width: u32, height: u32): Image;

  /**
   * Return this image's color type.
   */
  // @ts-ignore: decorator
  @external("image", "color")
  declare function color(im: Image): ColorType;

  /**
   * Returns the width of the underlying image
   */
  // @ts-ignore: decorator
  @external("image", "width")
  declare function width(im: Image): u32;

  /**
   * Returns the height of the underlying image
   */
  // @ts-ignore: decorator
  @external("image", "height")
  declare function height(im: Image): u32;

  /**
   * Return a grayscale version of this image.
   * Returns `Luma` images in most cases. However, for `f32` images,
   * this will return a grayscale `Rgb/Rgba` image instead.
   */
  // @ts-ignore: decorator
  @external("image", "grayscale")
  declare function grayscale(im: Image): Image;

  /**
   * Invert the colors of this image.
   * This method operates inplace.
   */
  // @ts-ignore: decorator
  @external("image", "invert_mut")
  declare function invertMut(im: Image): void;

  /**
   * Resize this image using the specified filter algorithm.
   * Returns a new image. The image's aspect ratio is preserved.
   * The image is scaled to the maximum possible size that fits
   * within the bounds specified by `nwidth` and `nheight`.
   */
  // @ts-ignore: decorator
  @external("image", "resize")
  declare function resize(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  /**
   * Resize this image using the specified filter algorithm.
   * Returns a new image. Does not preserve aspect ratio.
   * `nwidth` and `nheight` are the new image's dimensions
   */
  // @ts-ignore: decorator
  @external("image", "resize_exact")
  declare function resizeExact(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  /**
   * Scale this image down to fit within a specific size.
   * Returns a new image. The image's aspect ratio is preserved.
   * The image is scaled to the maximum possible size that fits
   * within the bounds specified by `nwidth` and `nheight`.
   * This method uses a fast integer algorithm where each source
   * pixel contributes to exactly one target pixel.
   * May give aliasing artifacts if new size is close to old size.
   */
  // @ts-ignore: decorator
  @external("image", "thumbnail")
  declare function thumbnail(im: Image, nwidth: u32, nheight: u32): Image;

  /**
   * Scale this image down to a specific size.
   * Returns a new image. Does not preserve aspect ratio.
   * `nwidth` and `nheight` are the new image's dimensions.
   * This method uses a fast integer algorithm where each source
   * pixel contributes to exactly one target pixel.
   * May give aliasing artifacts if new size is close to old size.
   */
  // @ts-ignore: decorator
  @external("image", "thumbnail_exact")
  declare function thumbnailExact(im: Image, nwidth: u32, nheight: u32): Image;

  /**
   * Resize this image using the specified filter algorithm.
   * Returns a new image. The image's aspect ratio is preserved.
   * The image is scaled to the maximum possible size that fits
   * within the larger (relative to aspect ratio) of the bounds
   * specified by `nwidth` and `nheight`, then cropped to
   * fit within the other bound.
   */
  // @ts-ignore: decorator
  @external("image", "resize_to_fill")
  declare function resizeToFill(im: Image, nwidth: u32, nheight: u32, filter: FilterType): Image;

  /**
   * Performs a Gaussian blur on this image.
   * `sigma` is a measure of how much to blur by.
   */
  // @ts-ignore: decorator
  @external("image", "blur")
  declare function blur(im: Image, sigma: f32): Image;

  /**
   * Performs an unsharpen mask on this image.
   * `sigma` is the amount to blur the image by.
   * `threshold` is a control of how much to sharpen.
   * See <https://en.wikipedia.org/wiki/Unsharp_masking#Digital_unsharp_masking>
   */
  // @ts-ignore: decorator
  @external("image", "unsharpen")
  declare function unsharpen(im: Image, sigma: f32, threshold: i32): Image;

  /**
   * Filters this image with the specified 3x3 kernel.
   * Adjust the contrast of this image.
   * `contrast` is the amount to adjust the contrast by.
   * Negative values decrease the contrast and positive values increase the contrast.
   */
  // @ts-ignore: decorator
  @external("image", "adjust_contrast")
  declare function adjustContrast(im: Image, c: f32): Image;

  /**
   * Brighten the pixels of this image.
   * `value` is the amount to brighten each pixel by.
   * Negative values decrease the brightness and positive values increase it.
   */
  // @ts-ignore: decorator
  @external("image", "brighten")
  declare function brighten(im: Image, value: i32): Image;

  /**
   * Hue rotate the supplied image.
   * `value` is the degrees to rotate each pixel by.
   * 0 and 360 do nothing, the rest rotates by the given degree value.
   * just like the css webkit filter hue-rotate(180)
   */
  // @ts-ignore: decorator
  @external("image", "huerotate")
  declare function huerotate(im: Image, value: i32): Image;

  /**
   * Flip this image vertically
   */
  // @ts-ignore: decorator
  @external("image", "flipv")
  declare function flipv(im: Image): Image;

  /**
   * Flip this image horizontally
   */
  // @ts-ignore: decorator
  @external("image", "fliph")
  declare function fliph(im: Image): Image;

  /**
   * Rotate this image 90 degrees clockwise.
   */
  // @ts-ignore: decorator
  @external("image", "rotate90")
  declare function rotate90(im: Image): Image;

  /**
   * Rotate this image 180 degrees clockwise.
   */
  // @ts-ignore: decorator
  @external("image", "rotate180")
  declare function rotate180(im: Image): Image;

  /**
   * Rotate this image 270 degrees clockwise.
   */
  // @ts-ignore: decorator
  @external("image", "rotate270")
  declare function rotate270(im: Image): Image;

  // @ts-ignore: decorator
  @external("image", "rotate")
  declare function rotate(im: Image, center: PointF32, theta: f32, interpolation: Interpolation, _default: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "rotate_about_center")
  declare function rotateAboutCenter(im: Image, theta: f32, interpolation: Interpolation, _default: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "translate")
  declare function translate(im: Image, t: PointI32): Image;

  // @ts-ignore: decorator
  @external("image", "warp")
  declare function warp(im: Image, projection: Projection, interpolation: Interpolation, _default: Pixel): Image;

  // @ts-ignore: decorator
  @external("image", "warp_into")
  declare function warpInto(im: Image, projection: Projection, interpolation: Interpolation, _default: Pixel, out: Image): void;

  /**
   * Overlay an image at a given coordinate (x, y)
   */
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

export namespace projection {
  // @ts-ignore: decorator
  @external("projection", "from_control_points")
  declare function fromControlPoints(from: ControlPointsF32, to: ControlPointsF32): Projection;

  // @ts-ignore: decorator
  @external("projection", "from_matrix")
  declare function fromMatrix(transform: Matrix3x3F32): Projection;

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

export namespace json {
  // @ts-ignore: decorator
  @external("json", "new")
  declare function create(value: String): Json;

  // @ts-ignore: decorator
  @external("json", "load")
  declare function load(ma: Bytes32): Json;

  // @ts-ignore: decorator
  @external("json", "clone")
  declare function clone(json: Json): Json;

  // @ts-ignore: decorator
  @external("json", "delete")
  declare function remove(json: Json, ptr: String): void;

  // @ts-ignore: decorator
  @external("json", "set")
  declare function set(json: Json, ptr: String, val: Json): void;

  // @ts-ignore: decorator
  @external("json", "set_u64")
  declare function setU64(json: Json, ptr: String, val: u64): void;

  // @ts-ignore: decorator
  @external("json", "set_bool")
  declare function setBool(json: Json, ptr: String, val: boolean): void;

  // @ts-ignore: decorator
  @external("json", "set_string")
  declare function setString(json: Json, ptr: String, val: String): void;

  // @ts-ignore: decorator
  @external("json", "get")
  declare function get(json: Json, ptr: String): Json;

  // @ts-ignore: decorator
  @external("json", "get_u64")
  declare function getU64(json: Json, ptr: String): u64;

  // @ts-ignore: decorator
  @external("json", "get_bool")
  declare function getBool(json: Json, ptr: String): boolean;

  // @ts-ignore: decorator
  @external("json", "get_string")
  declare function getString(json: Json, ptr: String): String;

}