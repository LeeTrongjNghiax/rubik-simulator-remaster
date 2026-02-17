import addTwistyPuzzleControl from "./add-twisty-puzzle-control.js";

const addTwistyPuzzleMovementControlSet = ({
  twistyPuzzle,
  width,
  startWidth,
  endWidth,
  height,
  startHeight,
  endHeight,
  depth,
  startDepth,
  endDepth,
}) => {
  addTwistyPuzzleControl({
    twistyPuzzle,
    start: startWidth,
    end: endWidth,
    size: [width, height, depth],
    directions: [ 1, -1, -1 ],
    rotationNames: [`R`, `L`, `M`],
    axis: `x`,
  });
  addTwistyPuzzleControl({
    twistyPuzzle,
    start: startHeight,
    end: endHeight,
    size: [height, width, depth],
    directions: [ -1, 1, -1 ],
    rotationNames: [`D`, `U`, `E`],
    axis: `y`,
  });
  addTwistyPuzzleControl({
    twistyPuzzle,
    start: startDepth,
    end: endDepth,
    size: [depth, width, height],
    directions: [ 1, -1, 1 ],
    rotationNames: [`F`, `B`, `S`],
    axis: `z`,
  });
}

export default addTwistyPuzzleMovementControlSet;