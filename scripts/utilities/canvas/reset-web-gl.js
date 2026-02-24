const resetWebGL = ({
  webGLContext,
  canvas,
  backgroundColor = [.1, .1, .1, 0.],
}) => {
  webGLContext.clearColor(
    backgroundColor[0],
    backgroundColor[1],
    backgroundColor[2],
    backgroundColor[3],
  );
  
  webGLContext.clearDepth(1.);
  webGLContext.viewport(0.0, 0.0, canvas.width, canvas.height);
  webGLContext.clear(
    webGLContext.COLOR_BUFFER_BIT | 
    webGLContext.DEPTH_BUFFER_BIT | 
    webGLContext.STENCIL_BUFFER_BIT
  );
}

export default resetWebGL;
