import { Plane, Position, Control } from "../../classes/index.js";
import { getPlaneFromThreePoints } from "../maths/index.js";
import {
  MAX_DISTANCE,
  DELTA,
  QUARTER_OF_CIRCLE,
  HALF_OF_CIRCLE,
  ROTATE_QUARTER_OF_CIRCLE_REVERSE_SYMBOL,
} from "../../constants/index.js";

const addTwistyPuzzleControl = ({
  twistyPuzzle,
  start = 0,
  end = 0,
  size = [0, 0, 0],
  directions = [0, 0, 0],
  rotationNames = [``, ``, ``],
  axis = `x`, 
  distance = DELTA,
  haveAllCubies = false,
}) => {
  if (start === end && !haveAllCubies) return;
  
  for (let i = start; i <= end; i++) {
    const mean = (start + end) / 2;

    let suffix = `${(size[0] - Math.abs(i * 2) - 1) / 2 + 1}`;

    let stickerStart = 0;
    let stickerEnd = 0;

    if (i === start && i !== end) {
      stickerStart = MAX_DISTANCE;
    } else if (i === end && i !== start) {
      stickerEnd = MAX_DISTANCE;
    } else if (i === start && i === end) {
      stickerStart = MAX_DISTANCE;
      stickerEnd = MAX_DISTANCE;
    }

    let planeA = new Plane({});
    let planeB = new Plane({});

    const planeUpperLimit = i - distance - stickerStart;
    const planeLowerLimit = i + distance + stickerEnd;

    switch (axis) {
      case `x`:
        planeA = getPlaneFromThreePoints(
          new Position({ x: planeUpperLimit, y: 0, z: 0 }), 
          new Position({ x: planeUpperLimit, y: 0, z: 1 }), 
          new Position({ x: planeUpperLimit, y: 1, z: 1 }), 
        );
        planeB = getPlaneFromThreePoints(
          new Position({ x: planeLowerLimit, y: 0, z: 0 }), 
          new Position({ x: planeLowerLimit, y: 0, z: 1 }), 
          new Position({ x: planeLowerLimit, y: 1, z: 1 }), 
        );
        break;
      case `y`:
        planeA = getPlaneFromThreePoints(
          new Position({ x: 0, y: planeUpperLimit, z: 0 }), 
          new Position({ x: 0, y: planeUpperLimit, z: 1 }), 
          new Position({ x: 1, y: planeUpperLimit, z: 1 }), 
        );
        planeB = getPlaneFromThreePoints(
          new Position({ x: 0, y: planeLowerLimit, z: 0 }), 
          new Position({ x: 0, y: planeLowerLimit, z: 1 }), 
          new Position({ x: 1, y: planeLowerLimit, z: 1 }), 
        );
        break;
      case `z`:
        planeA = getPlaneFromThreePoints(
          new Position({ x: 0, y: 0, z: planeUpperLimit }), 
          new Position({ x: 0, y: 1, z: planeUpperLimit }), 
          new Position({ x: 1, y: 1, z: planeUpperLimit }), 
        );
        planeB = getPlaneFromThreePoints(
          new Position({ x: 0, y: 0, z: planeLowerLimit }), 
          new Position({ x: 0, y: 1, z: planeLowerLimit }), 
          new Position({ x: 1, y: 1, z: planeLowerLimit }), 
        );
        break;
      default:
        return;
    }

    if (
      suffix === `${size[0]}` || 
      suffix === `0` || 
      suffix === `1` || 
      i === mean
    )
      suffix = ``;

    let rotationName = ``;
    let direction = 0;

    if (i < mean) {
      rotationName = rotationNames[0];
      direction = directions[0];
    } else if (i > mean) {
      rotationName = rotationNames[1];
      direction = directions[1];
    } else {
      rotationName = rotationNames[2];
      direction = directions[2];
    }

    if (size[1] === size[2]) {
      twistyPuzzle.addControl(
        new Control({
          name: suffix + rotationName,
          axis: new Position({
            x: planeA.a,
            y: planeA.b,
            z: planeA.c,
          }),
          rad: QUARTER_OF_CIRCLE * direction,
          upperLimit: planeA.d,
          lowerLimit: planeB.d,
          index: i,
        })
      );
      twistyPuzzle.addControl(
        new Control({
          name: suffix + rotationName + ROTATE_QUARTER_OF_CIRCLE_REVERSE_SYMBOL,
          axis: new Position({
            x: planeA.a, 
            y: planeA.b,
            z: planeA.c,
          }),
          rad: -QUARTER_OF_CIRCLE * direction,
          upperLimit: planeA.d,
          lowerLimit: planeB.d,
          index: i,
        })
      );
    }

    twistyPuzzle.addControl(
      new Control({
        name: suffix + rotationName + `2`,
        axis: new Position({
          x: planeA.a,
          y: planeA.b,
          z: planeA.c
        }),
        rad: HALF_OF_CIRCLE * direction,
        upperLimit: planeA.d,
        lowerLimit: planeB.d,
        index: i,
      })
    );
  }
}

export default addTwistyPuzzleControl;