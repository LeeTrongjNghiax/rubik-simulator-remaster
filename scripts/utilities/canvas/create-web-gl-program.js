const createWebGLProgram = ({
  webGLContext,
  vertexShader,
  fragmentShader,
}) => {
  const shaderProgram = webGLContext.createProgram();

  if (!shaderProgram) throw new Error(`Failed to create shader program`);

  webGLContext.attachShader(shaderProgram, vertexShader);
  webGLContext.attachShader(shaderProgram, fragmentShader);
  webGLContext.linkProgram(shaderProgram);

  if (!webGLContext.getProgramParameter(shaderProgram, webGLContext.LINK_STATUS)) {
    console.error(`ERROR linking shader program!`, webGLContext.getProgramInfoLog(shaderProgram));
    throw new Error(`ERROR linking shader program!`);
  }

  webGLContext.validateProgram(shaderProgram);

  if (!webGLContext.getProgramParameter(shaderProgram, webGLContext.VALIDATE_STATUS)) {
    console.error(`ERROR validating program!`, webGLContext.getProgramInfoLog(shaderProgram));
    throw new Error(`ERROR validating program!`);
  }

  return shaderProgram;
}

export default createWebGLProgram;