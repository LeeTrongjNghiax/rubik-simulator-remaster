const getUniformsInShader = (
  gl,
  shaderProgram,
  pointSizeUniformName = `pointSize`,
  matWorldUniformName = `mWorld`,
  matViewUniformName = `mView`,
  matProjUniformName = `mProj`,
  axisVectorUniformName = `axis_vec`,
  radUniformName = `rad`,
  planeAUniformName = `plane1`,
  planeBUniformName = `plane2`,
) => {
  const pointSizeUniformLocation = 
    gl.getUniformLocation(shaderProgram, pointSizeUniformName);

  if (!pointSizeUniformLocation) 
    throw new Error(`Point size uniform location not found`);

  const matWorldUniformLocation = 
    gl.getUniformLocation(shaderProgram, matWorldUniformName);

  if (!matWorldUniformLocation)
    throw new Error(`Matrix world uniform location not found`);

  const matViewUniformLocation = 
    gl.getUniformLocation(shaderProgram, matViewUniformName);

  if (!matViewUniformLocation) 
    throw new Error(`Matrix view uniform location not found`);

  const matProjUniformLocation = 
    gl.getUniformLocation(shaderProgram, matProjUniformName);

  if (!matProjUniformLocation) 
    throw new Error(`Matrix projection uniform location not found`);
  
  const axisVectorUniformLocation = 
    gl.getUniformLocation(shaderProgram, axisVectorUniformName);

  if (!axisVectorUniformLocation) 
    throw new Error(`Axis vector uniform location not found`);

  const radUniformLocation = 
    gl.getUniformLocation(shaderProgram, radUniformName);

  if (!radUniformLocation) 
    throw new Error(`Radian uniform location not found`);

  const planeAUniformLocation = 
    gl.getUniformLocation(shaderProgram, planeAUniformName);

  if (!planeAUniformLocation) 
    throw new Error(`Plane A uniform location not found`);

  const planeBUniformLocation = 
    gl.getUniformLocation(shaderProgram, planeBUniformName);

  if (!planeBUniformLocation) 
    throw new Error(`Plane B uniform location not found`);
  
  return {
    pointSizeUniformLocation,
    matWorldUniformLocation,
    matViewUniformLocation,
    matProjUniformLocation,
    axisVectorUniformLocation,
    radUniformLocation,
    planeAUniformLocation,  
    planeBUniformLocation,
  }
}

export default getUniformsInShader;
