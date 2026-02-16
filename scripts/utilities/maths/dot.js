/**
 * Calculates the dot product of two vec3's
 *
 * @param {Float32Array<ArrayBuffer>} a the first operand
 * @param {Float32Array<ArrayBuffer>} b the second operand
 * 
 * @returns {number} dot product of a and b
 * 
 * @see {@link https://en.wikipedia.org/wiki/Dot_product}
 */
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export default dot;
