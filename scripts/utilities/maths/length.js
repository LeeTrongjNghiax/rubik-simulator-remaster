/**
 * Calculates the length of a vec3
 *
 * @param {Float32Array<ArrayBuffer>} a vector to calculate length of
 * 
 * @returns {number} length of a
 */
const length = (a) => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const len = x * x + y * y + z * z;
  
  if (len > 0) return Math.sqrt(len);
}

export default length;
