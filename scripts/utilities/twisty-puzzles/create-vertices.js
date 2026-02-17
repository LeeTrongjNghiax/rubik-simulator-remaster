const createVertices = (twistyPuzzle) => [].concat(
  ...twistyPuzzle.cubies.map( (cubie) => cubie.toString() )
);

export default createVertices;
