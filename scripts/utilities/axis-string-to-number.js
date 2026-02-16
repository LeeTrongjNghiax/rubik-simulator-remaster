/**
 * @function
 * 
 * @param {string} string - Can be 'x', 'y', 'z' or other strings.
 * 
 * @returns {number}
 */
const axisStringToNumber = (string) => {
  if (string === `x`) return 0;
  if (string === `y`) return 1;
  if (string === `z`) return 2;

  return -1;
};

export default axisStringToNumber;
