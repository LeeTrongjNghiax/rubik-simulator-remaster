const addVerticesBufferData = (
  gl,
  vertices,
) => {
  const vertexBuffer = gl.createBuffer();

  if (!vertexBuffer) throw new Error(`Vertex buffer not created`);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW,
  );
}

export default addVerticesBufferData;
