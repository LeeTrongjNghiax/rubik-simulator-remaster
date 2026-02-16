import { EPSILON } from "../constants/index.js";

/**
 * Round number to the nearest integer.
 * 
 * @function
 * 
 * @param {number} num - The number to round.
 * 
 * @returns {number}
 */
const roundTo = (num) => {
  if (Math.abs(num - 1) < EPSILON) return 1;
  
  if (Math.abs(num - 0) < EPSILON) return 0;

  return num;
};

export default roundTo;
