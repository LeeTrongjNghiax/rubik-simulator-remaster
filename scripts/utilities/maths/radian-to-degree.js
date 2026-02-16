import { HALF_OF_CIRCLE } from "./../../constants/index.js";

/**
 * @function
 * 
 * @param {number} r - 
 * 
 * @returns {number}
 * 
 * @see {@link https://en.wikipedia.org/wiki/Degree_(angle)}
 */
const radianToDegree = r => r * 180 / HALF_OF_CIRCLE;

export default radianToDegree;
