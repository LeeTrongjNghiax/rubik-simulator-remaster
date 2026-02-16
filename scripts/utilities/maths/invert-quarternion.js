/**
 * Inverts a quaternion
 * 
 * @param {Float32Array<ArrayBuffer>} out the receiving quaternion
 * @param {Float32Array<ArrayBuffer>} a the quaternion to invert
 * 
 * @returns {Float32Array<ArrayBuffer>} out
 * 
 * @see {@link https://en.wikipedia.org/wiki/Quaternion}
 */
const invertQuaternion = (out, a) => {
  const a0 = a[0];
  const a1 = a[1];
  const a2 = a[2];
  const a3 = a[3];

  const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  const invDot = dot ? 1.0 / dot : 0;

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;

  return out;
};

export default invertQuaternion;