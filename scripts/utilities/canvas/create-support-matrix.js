import { identity, lookAt, multiply, perspective, rotate } from "../maths/index.js";

const createSupportMatrix = ({
  orientationX,
  orientationY,
  orientationZ,
  cameraPositionX,
  cameraPositionY,
  cameraPositionZ,
  cameraLookAtX,
  cameraLookAtY,
  cameraLookAtZ,
  cameraUpX,
  cameraUpY,
  cameraUpZ,
  fieldOfView, 
  aspectRatio,
  nearPlane,
  farPlane,
}) => {
  const matXRotation = new Float32Array(16);
  const maxYRotation = new Float32Array(16);
  const maxZRotation = new Float32Array(16);
  const matIdentity = new Float32Array(16);

  identity(matXRotation);
  identity(maxYRotation);
  identity(maxZRotation);
  identity(matIdentity);

  const matWorld = new Float32Array(16);
  const matView = new Float32Array(16);
  const matProjection = new Float32Array(16);

  const matOrientationX = new Float32Array(16);
  const matOrientationY = new Float32Array(16);
  const matOrientationZ = new Float32Array(16);

  rotate(matOrientationX, matIdentity, orientationX, new Float32Array([1, 0, 0]));
  rotate(matOrientationY, matIdentity, orientationY, new Float32Array([0, 1, 0]));
  rotate(matOrientationZ, matIdentity, orientationZ, new Float32Array([0, 0, 1]));

  identity(matWorld);

  multiply(matWorld, matOrientationX, matOrientationY);
  multiply(matWorld, matWorld, matOrientationZ);
  
  lookAt(
    matView, 
    new Float32Array([ cameraPositionX, cameraPositionY, cameraPositionZ ]), 
    new Float32Array([ cameraLookAtX, cameraLookAtY, cameraLookAtZ ]), 
    new Float32Array([ cameraUpX, cameraUpY, cameraUpZ ]), 
  );

  perspective(matProjection, fieldOfView, aspectRatio, nearPlane, farPlane);

  return {
    matWorld,
    matView,
    matProjection,
  };
}

export default createSupportMatrix;
