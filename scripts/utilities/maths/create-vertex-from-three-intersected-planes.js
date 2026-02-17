import { invert, transformMat3 } from "./index.js";
import { Position, Vertex } from "../../classes/index.js";

const createVertexFromThreeIntersectedPlanes = ({
  twistyPuzzle,
  planeAIndex = 0, 
  planesA, 
  planeBIndex = 0,
  planesB,
  planeCIndex = 0,
  planesC,
  plane,
}) => {
  const planeEquation = new Float32Array(9);

  planeEquation[0] = planesA[planeAIndex].a;
  planeEquation[3] = planesA[planeAIndex].b;
  planeEquation[6] = planesA[planeAIndex].c;

  planeEquation[1] = planesB[planeBIndex].a;
  planeEquation[4] = planesB[planeBIndex].b;
  planeEquation[7] = planesB[planeBIndex].c;

  planeEquation[2] = planesC[planeCIndex].a;
  planeEquation[5] = planesC[planeCIndex].b;
  planeEquation[8] = planesC[planeCIndex].c;

  const inverse = new Float32Array(9);

  invert(inverse, planeEquation);

  const dVector = new Float32Array(3);
  dVector[0] = -planesA[planeAIndex].d;
  dVector[1] = -planesB[planeBIndex].d;
  dVector[2] = -planesC[planeCIndex].d;

  const resultVector = new Float32Array(3);
  transformMat3(resultVector, dVector, inverse);

  let xCenter = 0;
  let yCenter = 0;
  let zCenter = 0;

  for (let i = 0; i < twistyPuzzle.controls.length; i++) {
    const vector = new Position({
      x: resultVector[0], 
      y: resultVector[1], 
      z: resultVector[2],
    });
    
    if ( twistyPuzzle.controls[i].checkIfControlThisVertex(vector) ) {
      const currentControl = twistyPuzzle.controls[i];

      if (
        currentControl.axis.x !== 0 &&
        currentControl.axis.y === 0 &&
        currentControl.axis.z === 0
      ) 
        xCenter = currentControl.index;

      if (
        currentControl.axis.x === 0 &&
        currentControl.axis.y !== 0 &&
        currentControl.axis.z === 0
      )
        yCenter = currentControl.index;

      if (
        currentControl.axis.x === 0 &&
        currentControl.axis.y === 0 &&
        currentControl.axis.z !== 0
      )
        zCenter = currentControl.index;
    }
  }

  return new Vertex({
    relativePosition: new Position({
      x: resultVector[0],
      y: resultVector[1],
      z: resultVector[2]
    }),
    color: plane.color,
    colorName: `${plane.colorName}_x_${xCenter}_y_${yCenter}_z_${zCenter}`,
    absolutePosition: new Position({
      x: xCenter,
      y: yCenter,
      z: zCenter
    })
  });
};

export default createVertexFromThreeIntersectedPlanes;
