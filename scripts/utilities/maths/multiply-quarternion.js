/**
 * Multiplies two quaternions
 *
 * @param {Float32Array<ArrayBuffer>} out the receiving quaternion
 * @param {Float32Array<ArrayBuffer>} a the first operand
 * @param {Float32Array<ArrayBuffer>} b the second operand
 * 
 * @returns {Float32Array<ArrayBuffer>} out
 */
const multiplyQuaternion = (out, a, b) => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const aw = a[3];
  
  const bx = b[0];
  const by = b[1];
  const bz = b[2];
  const bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;

  return out;
};

export default multiplyQuaternion;
