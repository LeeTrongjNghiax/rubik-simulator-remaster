import compileShader from "./compile-shader.js";

const createWebGLShaders = ({
  webGLContext,
  vertexShaderSource,
  fragmentShaderSource,
}) => {
  const vertexShader = compileShader({
    gl: webGLContext, 
    type: webGLContext.VERTEX_SHADER, 
    source: vertexShaderSource,
  });
  const fragmentShader = compileShader({
    gl: webGLContext, 
    type: webGLContext.FRAGMENT_SHADER, 
    source: fragmentShaderSource,
  });

  if (!vertexShader || !fragmentShader) 
    throw new Error(`Failed to compile shaders`);

  return [vertexShader, fragmentShader];
}

export default createWebGLShaders;
