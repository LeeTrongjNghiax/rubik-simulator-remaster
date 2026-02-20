import { Face, Cubie, Position } from "../../classes/index.js";
import { NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE } from "../../constants/index.js";

const addFacesToTwistyPuzzle = ({
  twistyPuzzle,
  vertices,
  startWidth,
  startHeight,
  startDepth,
  endWidth,
  endHeight,
  endDepth,
}) => {
  let count = 0;
  const faces = [];
  const vertexIndices = [];

  const numberOfFace = vertices.length / NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE;

  for (let i = 0; i < numberOfFace; i++) {
    const color = vertices[NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE * i].color;

    const colorName = vertices[NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE * i].colorName;

    const absolutePosition = vertices[NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE * i].absolutePosition;

    const faceVertices = [];

    for (let j = 0; j < NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE; j++) {
      faceVertices.push(
        vertices[NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE * i + j],
      );
    }

    let addedFaces = faceVertices;

    if (faceVertices.includes(undefined)) addedFaces = [];

    const face = new Face({
      vertices: addedFaces,
      absolutePosition,
      color,
      colorName,
    });

    faces.push(face);
  }

  for (let i = startWidth; i <= endWidth; i++) {
    for (let j = startHeight; j <= endHeight; j++) {
      for (let k = startDepth; k <= endDepth; k++) {
        const cubie = new Cubie([], new Position({ x: i, y: j, z: k }));

        for (let l = 0; l < numberOfFace; l++) {
          if (faces[l] === undefined) continue

          if (
            JSON.stringify(faces[l].absolutePosition) === 
            JSON.stringify(cubie.absolutePosition)
          ) {
            cubie.addFace(faces[l]);

            vertexIndices.push(
              count + 0, 
              count + 1, 
              count + 2, 

              count + 0, 
              count + 2, 
              count + 1, 

              count + 3, 
              count + 1, 
              count + 2, 

              count + 3, 
              count + 2, 
              count + 1, 
            );

            count += NUMBER_OF_VERTEX_PER_QUADRILATERAL_FACE;
          }
        }

        twistyPuzzle.addCubie(cubie);
      }
    }
  }

  return vertexIndices;
}

export default addFacesToTwistyPuzzle;
