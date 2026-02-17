const createWebGLRenderingContext = (
  canvas,
  options = {
    depth: true, 
    stencil: false, 
    alpha: true, 
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    antialias: true
  }
) => {
  const gl = (
    canvas.getContext(`webgl2`, options) || 
    canvas.getContext(`webgl`, options) || 
    canvas.getContext(`experimental-webgl`, options)
  );

  if (gl) {
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Set the clear color to transparent by default
    gl.clearColor(0, 0, 0, 0);
    
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  if (!gl) {
    throw new Error(`WebGL2RenderingContext or WebGLRenderingContext not found`);
  }

  return gl;
}

export default createWebGLRenderingContext;
