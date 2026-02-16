/**
 * Computes the cross product of two vec3's
 *
 * @param {Float32Array<ArrayBuffer>} out the receiving vector
 * @param {Float32Array<ArrayBuffer>} a the first operand
 * @param {Float32Array<ArrayBuffer>} b the second operand
 * 
 * @returns {Float32Array<ArrayBuffer>} out
 * 
 * @see {@link https://en.wikipedia.org/wiki/Cross_product}
 */
const cross = (out, a, b) => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];

  const bx = b[0];
  const by = b[1];
  const bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;

  return out;
}

export default cross;
