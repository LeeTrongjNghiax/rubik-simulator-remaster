import createVertexFromThreeIntersectedPlanes from "../maths/create-vertex-from-three-intersected-planes.js";

const createInnerVerticesFromThreeIntersectedPlanes = ({
  twistyPuzzle,
  planesA, 
  planesB,
  planesC,
}) => {
  const vertices = [];

  for (let i = 0; i < planesA.length; i++) {
    for (let j = 0; j < planesB.length; j++) {
      for (let k = 0; k < planesC.length; k++) {
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

  return vertices;
};

export default createInnerVerticesFromThreeIntersectedPlanes;
