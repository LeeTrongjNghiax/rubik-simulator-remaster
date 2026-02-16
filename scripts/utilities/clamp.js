/**
 * Clamp a value between a minimum and maximum value.
 * 
 * @function
 * 
 * @param {number} value - 
 * @param {number} min - The lower bound of the clamp.
 * @param {number} max - The upper bound of the clamp.
 * 
 * @example
 * clamp(5, 0, 10); // 0.5 (middle in range [0, 1])
 * clamp(20, 0, 80); // 0.25 (quarter way in range [0, 1])
 * 
 * @returns {number}
 */
const clamp = (value, min, max) => {
  if (min === max) return 0;

  const n = (value - min) / (max - min);
  return Math.min(1, Math.max(0, n));
}

export default clamp;
