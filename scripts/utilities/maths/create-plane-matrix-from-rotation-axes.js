import fromEuler from "./from-euler.js";
import radianToDegree from "./radian-to-degree.js";
import roundTo from "./../round-to.js";
import invertQuaternion from "./invert-quarternion.js";
import multiplyQuaternion from "./multiply-quarternion.js";

const createPlaneMatrixFromRotationAxes = ({
  axisRotationX = 0,
  axisRotationY = 0,
  axisRotationZ = 0,
}) => {
  const quat = new Float32Array(4);
  fromEuler(
    quat, 
    radianToDegree(axisRotationX), 
    radianToDegree(axisRotationY), 
    radianToDegree(axisRotationZ)
  );

  const invertedQuat = new Float32Array(4);
  invertQuaternion(invertedQuat, quat);

  const xAxisVector = new Float32Array(4);
  xAxisVector[0] = 1;
  xAxisVector[1] = 0;
  xAxisVector[2] = 0;
  xAxisVector[3] = 1;

  const yAxisVector = new Float32Array(4);
  yAxisVector[0] = 0;
  yAxisVector[1] = 1;
  yAxisVector[2] = 0;
  yAxisVector[3] = 1;

  const zAxisVector = new Float32Array(4);
  zAxisVector[0] = 0;
  zAxisVector[1] = 0;
  zAxisVector[2] = 1;
  zAxisVector[3] = 1;

  const rotatedXAxisVector = new Float32Array(4);
  const rotatedYAxisVector = new Float32Array(4);
  const rotatedZAxisVector = new Float32Array(4);

  multiplyQuaternion(rotatedXAxisVector, quat, xAxisVector);
  
  multiplyQuaternion(rotatedXAxisVector, rotatedXAxisVector, invertedQuat);
  
  multiplyQuaternion(rotatedYAxisVector, quat, yAxisVector);
  multiplyQuaternion(rotatedYAxisVector, rotatedYAxisVector, invertedQuat);
  
  multiplyQuaternion(rotatedZAxisVector, quat, zAxisVector);
  multiplyQuaternion(rotatedZAxisVector, rotatedZAxisVector, invertedQuat);

  const planeMatrix = new Float32Array(9);

  planeMatrix[0] = roundTo( rotatedXAxisVector[0] );
  planeMatrix[1] = roundTo( rotatedXAxisVector[1] );
  planeMatrix[2] = roundTo( rotatedXAxisVector[2] );
  planeMatrix[3] = roundTo( rotatedYAxisVector[0] );
  planeMatrix[4] = roundTo( rotatedYAxisVector[1] );
  planeMatrix[5] = roundTo( rotatedYAxisVector[2] );
  planeMatrix[6] = roundTo( rotatedZAxisVector[0] );
  planeMatrix[7] = roundTo( rotatedZAxisVector[1] );
  planeMatrix[8] = roundTo( rotatedZAxisVector[2] );

  return planeMatrix;
}

export default createPlaneMatrixFromRotationAxes;