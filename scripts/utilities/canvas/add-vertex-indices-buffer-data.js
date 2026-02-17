const addVertexIndicesBufferData = (
  gl,
  vertexIndices,
) => {
  const vertexIndexBuffer = gl.createBuffer();

  if (!vertexIndexBuffer) throw new Error(`Vertex index buffer not created`);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(vertexIndices),
    gl.STATIC_DRAW,
  );
}

export default addVertexIndicesBufferData;
