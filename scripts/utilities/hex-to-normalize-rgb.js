/**
 * @function
 * 
 * @param {string} hex - The hex color code.
 * 
 * @returns {number[] | null}
 * 
 * @example
 * hexToNormalizeRgb("#FF0000") // [1, 0, 0]
 * hexToNormalizeRgb("#00FF00") // [0, 1, 0]
 * hexToNormalizeRgb("#0000FF") // [0, 0, 1]
 */
const hexToNormalizeRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ] : null;
};

export default hexToNormalizeRgb;
