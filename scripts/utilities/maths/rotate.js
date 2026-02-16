import { EPSILON } from "./../../constants/index.js";
import roundTo from "./../round-to.js";

const rotate = (out, a, rad, axis) => {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s = void 0,
      c = void 0,
      t = void 0;
  var a00 = void 0,
      a01 = void 0,
      a02 = void 0,
      a03 = void 0;
  var a10 = void 0,
      a11 = void 0,
      a12 = void 0,
      a13 = void 0;
  var a20 = void 0,
      a21 = void 0,
      a22 = void 0,
      a23 = void 0;
  var b00 = void 0,
      b01 = void 0,
      b02 = void 0;
  var b10 = void 0,
      b11 = void 0,
      b12 = void 0;
  var b20 = void 0,
      b21 = void 0,
      b22 = void 0;

  if (Math.abs(len) < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
  a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
  a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0]  = roundTo( a00 * b00 + a10 * b01 + a20 * b02 );
  out[1]  = roundTo( a01 * b00 + a11 * b01 + a21 * b02 );
  out[2]  = roundTo( a02 * b00 + a12 * b01 + a22 * b02 );
  out[3]  = roundTo( a03 * b00 + a13 * b01 + a23 * b02 );
  out[4]  = roundTo( a00 * b10 + a10 * b11 + a20 * b12 );
  out[5]  = roundTo( a01 * b10 + a11 * b11 + a21 * b12 );
  out[6]  = roundTo( a02 * b10 + a12 * b11 + a22 * b12 );
  out[7]  = roundTo( a03 * b10 + a13 * b11 + a23 * b12 );
  out[8]  = roundTo( a00 * b20 + a10 * b21 + a20 * b22 );
  out[9]  = roundTo( a01 * b20 + a11 * b21 + a21 * b22 );
  out[10] = roundTo( a02 * b20 + a12 * b21 + a22 * b22 );
  out[11] = roundTo( a03 * b20 + a13 * b21 + a23 * b22 );

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = roundTo( a[12] );
    out[13] = roundTo( a[13] );
    out[14] = roundTo( a[14] );
    out[15] = roundTo( a[15] );
  }
  return out;
};

export default rotate;
