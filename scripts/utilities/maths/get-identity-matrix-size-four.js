/**
 * Creates a new identity mat4
 * 
 * @returns {Float32Array<ArrayBuffer>} out
 */
const getIdentityMatrixSizeFour = () => {
  const out = new Float32Array(16);

  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;

  return out;
};

export default getIdentityMatrixSizeFour;
