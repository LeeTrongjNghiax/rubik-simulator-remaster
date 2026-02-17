import addTwistyPuzzleControl from "./add-twisty-puzzle-control.js";

const addTwistyPuzzleRotationControlSet = ({
  twistyPuzzle,
  width,
  height,
  depth,
}) => {
  addTwistyPuzzleControl({
    twistyPuzzle,
    start: 0,
    end: 0,
    size: [width, height, depth],
    directions: [ 0, 0, 1 ],
    rotationNames: [ ``, ``, `x` ],
    axis: `x`,
    distance: width / 2,
    haveAllCubies: true,
  });
  addTwistyPuzzleControl({
    twistyPuzzle,
    start: 0,
    end: 0,
    size: [height, width, depth],
    directions: [ 0, 0, 1 ],
    rotationNames: [ ``, ``, `y` ],
    axis: `y`,
    distance: height / 2,
    haveAllCubies: true,
  });
  addTwistyPuzzleControl({
    twistyPuzzle,
    start: 0,
    end: 0,
    size: [depth, width, height],
    directions: [ 0, 0, 1 ],
    rotationNames: [ ``, ``, `z` ],
    axis: `z`,
    distance: depth / 2,
    haveAllCubies: true,
  });
}

export default addTwistyPuzzleRotationControlSet;
