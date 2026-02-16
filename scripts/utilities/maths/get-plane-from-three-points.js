import { Position, Plane } from "../../classes/index.js";
import { cross, dot } from "./index.js";

/**
 * Creates a new plane from three points
 * 
 * @param {Position} [a=new Position()] -
 * @param {Position} [b=new Position()] -
 * @param {Position} [c=new Position()] -
 * 
 * @returns {Plane}
 * 
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_planes_in_three-dimensional_space#Describing_a_plane_through_three_points}
 */
const getPlaneFromThreePoints = (
  a = new Position(),
  b = new Position(),
  c = new Position(),
) => {
  const v1 = new Float32Array(3);
  v1[0] = b.x - a.x;
  v1[1] = b.y - a.y;
  v1[2] = b.z - a.z;

  const v2 = new Float32Array(3);
  v2[0] = c.x - a.x;
  v2[1] = c.y - a.y;
  v2[2] = c.z - a.z;

  const normal = new Float32Array(3);
  cross(normal, v1, v2);

  const a0 = new Float32Array(3);
  a0[0] = a.x;
  a0[1] = a.y;
  a0[2] = a.z;

  const d = -dot(normal, a0);

  return new Plane(normal[0], normal[1], normal[2], d);
}

export default getPlaneFromThreePoints;
