/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {Float32Array<ArrayBuffer>} out the receiving vector
 * @param {Float32Array<ArrayBuffer>} a the vector to transform
 * @param {Float32Array<ArrayBuffer>} m matrix to transform with
 * 
 * @returns {Float32Array<ArrayBuffer>} out
 */
const transformMat4 = (out, a, m) => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const w = a[3];

  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;

  return out;
};

export default transformMat4;
