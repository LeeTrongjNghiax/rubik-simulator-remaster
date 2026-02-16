import { Position, Plane } from "../../classes/index.js";
import { dot } from "./index.js";

/**
 * @function
 * 
 * @param {Position} point - 
 * @param {Plane} plane - 
 * 
 * @returns {number}
 * 
 * @author 
 * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
 */
const getDotProductOfPlaneAndVector = (
  point = new Position(), 
  plane = new Plane(),
) => {
  const point2 = new Float32Array(3);
  point2[0] = point.x;
  point2[1] = point.y;
  point2[2] = point.z;

  const plane2 = new Float32Array(3);
  plane2[0] = plane.a;
  plane2[1] = plane.b;
  plane2[2] = plane.c;

  return dot(point2, plane2) + plane.d;
}

export default getDotProductOfPlaneAndVector;
