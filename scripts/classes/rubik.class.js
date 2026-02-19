import { getDotProductOfPlaneAndVector } from "../utilities/maths/index.js";
import { Plane, Position, Control, Cubie } from "./index.js";
import identity from "../utilities/maths/identity.js";
import rotate from "../utilities/maths/rotate.js";
import transformMat4 from "../utilities/maths/transform-mat4.js";

class Rubik {
  /**
   * @typedef {Object} RubikParameters
   * @property {Cubie[]} [cubies=[]] - 
   * @property {Control[]} [controls=[]] - 
   * @property {number} stickerGap - 
   * 
   * @param {RubikParameters} parameters - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  constructor({ cubies = [], controls = [], stickerGap }) {
    this.cubies = cubies;
    this.controls = controls;
    this.stickerGap = stickerGap;
  }

  /**
   * @param {Control} control - The control to add.
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  addControl(control) {
    this.controls.push(control);
  }

  /**
   * @param {Cubie} cubie - The cubie to add.
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  addCubie(cubie) {
    this.cubies.push(cubie);
  }

  /**
   * @param {Plane} planeA - The first plane.
   * @param {Plane} planeB - The second plane.
   * 
   * @returns {Cubie[]}
   * 
   * @example
   * const rubik = new Rubik([new Cubie(), new Cubie()], [new Control(), new Control()], 0);
   * console.log(rubik.getCubiesInBetweenTwoParallelPlanes(new Plane(0, 0, 0, 0), new Plane(0, 0, 0, 0))); // [Cubie, Cubie]
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  getCubiesInBetweenTwoParallelPlanes(
    planeA = new Plane(),
    planeB = new Plane()
  ) {
    const result = [];

    for (let i = 0; i < this.cubies.length; i++) {
      const dis1 = getDotProductOfPlaneAndVector(
        this.cubies[i].absolutePosition,
        planeA,
      );
      const dis2 = getDotProductOfPlaneAndVector(
        this.cubies[i].absolutePosition,
        planeB,
      );

      const sign1 = Math.sign(dis1);
      const sign2 = Math.sign(dis2);

      if (sign1 != sign2) result.push(this.cubies[i]);
    }

    return result;
  }

  /**
   * @param {Position} [axis=new Position()] - The axis of the face to rotate.
   * @param {number} [rad=0] - The rad of the face to rotate.
   * @param {number} [upperLimit=0] - The upper limit of the face to rotate.
   * @param {number} [lowerLimit=0] - The lower limit of the face to rotate.
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  rotateFace(
    axis = new Position(),
    rad = 0,
    upperLimit = 0,
    lowerLimit = 0
  ) {
    // console.log(axis, rad, upper_limit, lower_limit);

    const cubiesToRotate = this.getCubiesInBetweenTwoParallelPlanes(
      new Plane({
        a: axis.x,
        b: axis.y,
        c: axis.z,
        d: upperLimit
      }), 
      new Plane({
        a: axis.x,
        b: axis.y,
        c: axis.z,
        d: lowerLimit
      }), 
    );

    // console.log(cubies_to_rotate);

    const identityMatrix = new Float32Array(16);
    identity(identityMatrix);

    const axisVector = new Float32Array(16);
    axisVector[0] = axis.x;
    axisVector[1] = axis.y;
    axisVector[2] = axis.z;

    const rotateMatrix = new Float32Array(16);
    rotate(rotateMatrix, identityMatrix, -rad, axisVector);

    // console.log(rotate_matrix);
    
    let rotatedVector;

    for (let i = 0; i < cubiesToRotate.length; i++) {

      rotatedVector = [];

      transformMat4(rotatedVector, [
        cubiesToRotate[i].absolutePosition.x,
        cubiesToRotate[i].absolutePosition.y,
        cubiesToRotate[i].absolutePosition.z,
        1
      ], rotateMatrix);

      // console.log(rotated_vector);

      cubiesToRotate[i].absolutePosition.x = rotatedVector[0];
      cubiesToRotate[i].absolutePosition.y = rotatedVector[1];
      cubiesToRotate[i].absolutePosition.z = rotatedVector[2];

      // console.log(cubies_to_rotate[i].absolute_position);

      for (let j = 0; j < cubiesToRotate[i].faces.length; j++) {
        for (let k = 0; k < cubiesToRotate[i].faces[j].vertices.length; k++) {
          rotatedVector = [];

          transformMat4(
            rotatedVector,
            [
              cubiesToRotate[i].faces[j].vertices[k].relativePosition.x,
              cubiesToRotate[i].faces[j].vertices[k].relativePosition.y,
              cubiesToRotate[i].faces[j].vertices[k].relativePosition.z,
              1
            ],
            rotateMatrix
          );
        
          cubiesToRotate[i].faces[j].vertices[k].relativePosition.x = rotatedVector[0];
          cubiesToRotate[i].faces[j].vertices[k].relativePosition.y = rotatedVector[1];
          cubiesToRotate[i].faces[j].vertices[k].relativePosition.z = rotatedVector[2];
        }
      }
    }
  }
}

export default Rubik;
