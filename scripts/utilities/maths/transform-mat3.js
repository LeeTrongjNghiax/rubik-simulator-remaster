/**
 * Transforms the vec3 with a mat3.
 *
 * @param {Float32Array<ArrayBuffer>} out the receiving vector
 * @param {Float32Array<ArrayBuffer>} a the vector to transform
 * @param {Float32Array<ArrayBuffer>} m the 3x3 matrix to transform with
 * 
 * @returns {Float32Array<ArrayBuffer>} out
 */
const transformMat3 = (out, a, m) => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];

  return out;
};

export default transformMat3;
