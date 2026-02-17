const compileShader = ({
  gl,
  type,
  source,
}) => {
  const shader = gl.createShader(type);

  if (!shader) throw new Error(`Shader not created`);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
    console.error(
      `ERROR compiling ${type} shader!`,
      gl.getShaderInfoLog(shader),
    );
    throw new Error(`ERROR compiling ${type} shader!`);
  }

  return shader;
}

export default compileShader;