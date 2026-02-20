import createVertexFromThreeIntersectedPlanes from "../maths/create-vertex-from-three-intersected-planes.js";

const createInnerVerticesFromThreeIntersectedPlanes = ({
  twistyPuzzle,
  planesA, 
  planesB,
  planesC,
  isRenderCenterInnerOuterCubes,
}) => {
  const vertices = [];

  for (let i = 0; i < planesA.length; i++) {
    for (let j = 0; j < planesB.length; j++) {
      for (let k = 0; k < planesC.length; k++) {
        const isRenderCenterInnerOuterCube = isRenderCenterInnerOuterCubes
          ? true
          : (
            (j < 3 || j > planesB.length - 1 - 3) ||
            (i < 3 || i > planesA.length - 1 - 3) ||
            (k < 3 || k > planesC.length - 1 - 3)
          );

        if (isRenderCenterInnerOuterCube) {
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

        if (isRenderCenterInnerOuterCube) {
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

        if (isRenderCenterInnerOuterCube) {
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

export default createInnerVerticesFromThreeIntersectedPlanes;
