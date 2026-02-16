import { HALF_OF_CIRCLE } from "./../../constants/index.js";

/**
 * @function
 * 
 * @param {number} d - 
 * 
 * @returns {number}
 * 
 * @see {@link https://en.wikipedia.org/wiki/Radian}
 */
const degreeToRadian = d => d * HALF_OF_CIRCLE / 180;

export default degreeToRadian;
