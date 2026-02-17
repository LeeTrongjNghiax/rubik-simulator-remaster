import createVertexFromThreeIntersectedPlanes from "./create-vertex-from-three-intersected-planes.js";

const createVerticesFromThreeIntersectedPlanes = ({
  twistyPuzzle,
  planesA, 
  planesB,
  planesC,
}) => {
  const vertices = [];

  for (let i = 0; i < planesA.length; i++) {
    for (let j = 0; j < planesB.length; j++) {
      for (let k = 0; k < planesC.length; k++) {
        // Check if 3 planes intersected a sticker vertex

        if (
          (i === 0 || i === planesA.length - 1) &&
          (j !== 0 && j !== planesB.length - 1) &&
          (k !== 0 && k !== planesC.length - 1) 
        ) {
          vertices.push(
            createVertexFromThreeIntersectedPlanes({
              twistyPuzzle,
              planeAIndex: i,
              planesA,
              planeBIndex: j,
              planesB,
              planeCIndex: k,
              planesC,
              plane: planesA[i],
            })
          )
        }

        if (
          (i !== 0 && i !== planesA.length - 1) &&
          (j === 0 || j === planesB.length - 1) &&
          (k !== 0 && k !== planesC.length - 1) 
        ) {
          vertices.push(
            createVertexFromThreeIntersectedPlanes({
              twistyPuzzle,
              planeAIndex: i,
              planesA,
              planeBIndex: j,
              planesB,
              planeCIndex: k,
              planesC,
              plane: planesB[j],
            })
          )
        }

        if (
          (i !== 0 && i !== planesA.length - 1) &&
          (j !== 0 && j !== planesB.length - 1) &&
          (k === 0 || k === planesC.length - 1) 
        ) {
          vertices.push(
            createVertexFromThreeIntersectedPlanes({
              twistyPuzzle,
              planeAIndex: i,
              planesA,
              planeBIndex: j,
              planesB,
              planeCIndex: k,
              planesC,
              plane: planesC[k],
            })
          )
        }
      }
    }
  }

  return vertices;
};

export default createVerticesFromThreeIntersectedPlanes;
