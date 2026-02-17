import { NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION, NUMBER_OF_COMPONENT_IN_RGBA_COLOR_FORMAT } from "../../constants/index.js";

const setUpShaderAttribute = (
  gl,
  shaderProgram,
) => {
  const vertexPositionAttributeLocation = 
    gl.getAttribLocation(shaderProgram, `vertPosition`);

  const vertexColorAttributeLocation = 
    gl.getAttribLocation(shaderProgram, `vertColor`);

  gl.enableVertexAttribArray(vertexPositionAttributeLocation);
  gl.enableVertexAttribArray(vertexColorAttributeLocation);
  
  const attributeSize = NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION + 
    NUMBER_OF_COMPONENT_IN_RGBA_COLOR_FORMAT;

  gl.vertexAttribPointer(
    vertexPositionAttributeLocation, // Atttribute location
    NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION, // Number of components per attribute
    gl.FLOAT, // Type of each component
    false, // Normalize the data
    attributeSize * Float32Array.BYTES_PER_ELEMENT, // Stride
    0 * Float32Array.BYTES_PER_ELEMENT, // Offset
  );

  gl.vertexAttribPointer(
    vertexColorAttributeLocation, // Atttribute location
    NUMBER_OF_COMPONENT_IN_RGBA_COLOR_FORMAT, // Number of components per attribute
    gl.FLOAT, // Type of each component
    false, // Normalize the data
    attributeSize * Float32Array.BYTES_PER_ELEMENT, // Stride
    NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION * Float32Array.BYTES_PER_ELEMENT, // Offset
  );
}

export default setUpShaderAttribute;
