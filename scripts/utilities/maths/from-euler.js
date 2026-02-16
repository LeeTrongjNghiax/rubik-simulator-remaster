/**
 * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order (default is zyx).
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x Angle to rotate around X axis in degrees.
 * @param {Number} y Angle to rotate around Y axis in degrees.
 * @param {Number} z Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
const fromEuler = (out, x, y, z) => {
  const halfToRad = (0.5 * Math.PI) / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;

  const sx = Math.sin(x);
  const cx = Math.cos(x);
  const sy = Math.sin(y);
  const cy = Math.cos(y);
  const sz = Math.sin(z);
  const cz = Math.cos(z);

  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  
  return out;
}

export default fromEuler;
