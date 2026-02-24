import { NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION, NUMBER_OF_COMPONENT_IN_RGBA_COLOR_FORMAT } from "../../constants/index.js";

const setUpShaderAttribute = (gl) => {
  const vertexPositionAttributeLocationIndex = 0

  const vertexColorAttributeLocationIndex = 1;

  gl.enableVertexAttribArray(vertexPositionAttributeLocationIndex);
  gl.enableVertexAttribArray(vertexColorAttributeLocationIndex);
  
  const attributeSize = NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION + 
    NUMBER_OF_COMPONENT_IN_RGBA_COLOR_FORMAT;

  gl.vertexAttribPointer(
    vertexPositionAttributeLocationIndex, // Atttribute location
    NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION, // Number of components per attribute
    gl.FLOAT, // Type of each component
    false, // Normalize the data
    attributeSize * Float32Array.BYTES_PER_ELEMENT, // Stride
    0 * Float32Array.BYTES_PER_ELEMENT, // Offset
  );

  gl.vertexAttribPointer(
    vertexColorAttributeLocationIndex, // Atttribute location
    NUMBER_OF_COMPONENT_IN_RGBA_COLOR_FORMAT, // Number of components per attribute
    gl.FLOAT, // Type of each component
    false, // Normalize the data
    attributeSize * Float32Array.BYTES_PER_ELEMENT, // Stride
    NUMBER_OF_DIMENSTION_IN_THREE_DIMENSION * Float32Array.BYTES_PER_ELEMENT, // Offset
  );
}

export default setUpShaderAttribute;
