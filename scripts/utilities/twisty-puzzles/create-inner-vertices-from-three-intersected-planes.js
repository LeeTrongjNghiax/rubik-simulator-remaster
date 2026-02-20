import createVertexFromThreeIntersectedPlanes from "../maths/create-vertex-from-three-intersected-planes.js";

const createInnerVerticesFromThreeIntersectedPlanes = ({
  twistyPuzzle,
  planesA, 
  planesB,
  planesC,
  isRenderCenterInnerOuterCubes = true,
  isRenderCornerInnerOuterCubes = false,
  isRenderEdgeInnerOuterCubes = false,
}) => {
  const vertices = [];

  for (let i = 0; i < planesA.length; i++) {
    for (let j = 0; j < planesB.length; j++) {
      for (let k = 0; k < planesC.length; k++) {
        const isRenderCenterInnerOuterCube = isRenderCenterInnerOuterCubes
          ? true
          : true;

        const isRenderCornerInnerOuterCube = isRenderCornerInnerOuterCubes
          ? true
          : !(
            (i < 2 || i > planesA.length - 1 - 2) &&
            (j < 2 || j > planesB.length - 1 - 2) &&
            (k < 2 || k > planesC.length - 1 - 2)
          );

        const isRenderEdgeInnerOuterCube = isRenderEdgeInnerOuterCubes
          ? true
          : true;

        if (
          isRenderCenterInnerOuterCube &&
          isRenderCornerInnerOuterCube &&
          isRenderEdgeInnerOuterCube
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
          );

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
          );

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
