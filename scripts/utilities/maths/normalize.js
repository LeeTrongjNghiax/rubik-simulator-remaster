/**
 * Normalize a vec3
 *
 * @param {Float32Array<ArrayBuffer>} out the receiving vector
 * @param {Float32Array<ArrayBuffer>} a vector to normalize
 * 
 * @returns {Float32Array<ArrayBuffer>} out
 */
const normalize = (out, a) => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  let len = x * x + y * y + z * z;
  
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}

export default normalize;
