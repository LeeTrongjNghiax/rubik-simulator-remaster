const addUniformsToShader = ({
  gl,
  matWorld,
  matView,
  matProj,
  pointSize,
  matWorldUniformLocation,
  matViewUniformLocation,
  matProjUniformLocation,
  pointSizeUniformLocation,
}) => {
  gl.uniformMatrix4fv(matWorldUniformLocation, false, matWorld);
  gl.uniformMatrix4fv(matViewUniformLocation, false, matView);
  gl.uniformMatrix4fv(matProjUniformLocation, false, matProj);
  gl.uniform1f(pointSizeUniformLocation, pointSize);
};

export default addUniformsToShader;