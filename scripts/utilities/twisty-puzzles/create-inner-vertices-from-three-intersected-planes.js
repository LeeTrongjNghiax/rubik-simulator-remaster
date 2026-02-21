import createVertexFromThreeIntersectedPlanes from "../maths/create-vertex-from-three-intersected-planes.js";

const createInnerVerticesFromThreeIntersectedPlanes = ({
  twistyPuzzle,
  planesA, 
  planesB,
  planesC,
  isRenderCenterInnerOuterCubes = true,
  isRenderCornerInnerOuterCubes = true,
  isRenderEdgeInnerOuterCubes = true,
}) => {
  const vertices = [];

  for (let i = 0; i < planesA.length; i++) {
    for (let j = 0; j < planesB.length; j++) {
      for (let k = 0; k < planesC.length; k++) {

        const isRenderCenterInnerOuterCubeX = isRenderCenterInnerOuterCubes
          ? true
          : true;
          // : (
          //   (j < 2 || j > planesB.length - 1 - 2) ||
          //   (k < 2 || k > planesC.length - 1 - 2)
          // );

        const isRenderCenterInnerOuterCubeY = isRenderCenterInnerOuterCubes
          ? true
          : true;
          // : (
          //   (i < 2 || i > planesA.length - 1 - 2) ||
          //   (k < 2 || k > planesC.length - 1 - 2)
          // );

        const isRenderCenterInnerOuterCubeZ = isRenderCenterInnerOuterCubes
          ? true
          : true;
          // : (
          //   (i < 2 || i > planesA.length - 1 - 2) ||
          //   (j < 2 || j > planesB.length - 1 - 2)
          // );

        const isRenderCornerInnerOuterCube = isRenderCornerInnerOuterCubes
          ? true
          : !(
            (i < 2 || i > planesA.length - 1 - 2) &&
            (j < 2 || j > planesB.length - 1 - 2) &&
            (k < 2 || k > planesC.length - 1 - 2)
          );

        const isRenderEdgeInnerOuterCubeX = isRenderEdgeInnerOuterCubes
          ? true
          : true;
          // : (
          //   ( !(j < 2 || j > planesB.length - 1 - 2) ||
          //   (  (j < 2 || j > planesB.length - 1 - 2) && (k < 2 || k > planesC.length - 1 - 2) ) ) &&
          //   ( !(k < 2 || k > planesC.length - 1 - 2) ||
          //   (  (k < 2 || k > planesC.length - 1 - 2) && (j < 2 || j > planesB.length - 1 - 2) ) )
          // );

        const isRenderEdgeInnerOuterCubeY = isRenderEdgeInnerOuterCubes
          ? true
          : true;
          // : (
          //   ( !(i < 2 || i > planesA.length - 1 - 2) ||
          //   (  (i < 2 || i > planesA.length - 1 - 2) && (k < 2 || k > planesC.length - 1 - 2) ) ) &&
          //   ( !(k < 2 || k > planesC.length - 1 - 2) ||
          //   (  (k < 2 || k > planesC.length - 1 - 2) && (i < 2 || i > planesA.length - 1 - 2) ) )
          // );

        const isRenderEdgeInnerOuterCubeZ = isRenderEdgeInnerOuterCubes
          ? true
          : true;
          // : (
          //   ( !(i == 0 || i == 1 || i == 4 || i == 5 ) ) 
          //   // ||
          //   // (  (i < 2 || i > planesA.length - 1 - 2) && (j < 2 || j > planesB.length - 1 - 2) ) )
          // );

        if (
          isRenderCenterInnerOuterCubeX &&
          isRenderCornerInnerOuterCube &&
          isRenderEdgeInnerOuterCubeX
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
        }

        if (
          isRenderCenterInnerOuterCubeY &&
          isRenderCornerInnerOuterCube &&
          isRenderEdgeInnerOuterCubeY
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
          );
        }

        if (
          isRenderCenterInnerOuterCubeZ &&
          isRenderCornerInnerOuterCube &&
          isRenderEdgeInnerOuterCubeZ
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

export default createInnerVerticesFromThreeIntersectedPlanes;
