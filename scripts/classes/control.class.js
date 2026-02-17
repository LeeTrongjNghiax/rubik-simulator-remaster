import { Position, Plane } from "./index.js";
import { getDotProductOfPlaneAndVector } from "../utilities/maths/index.js";

class Control {
  /**
   * @typedef {Object} ControlParameters
   * @property {string} name - This name used for sorting
   * @property {Position} [axis=new Position()] -
   * @property {number} [rad=Math.PI / 2] - 
   * @property {number} [upperLimit=0] - 
   * @property {number} [lowerLimit=0] - 
   * @property {number} index - 
   * 
   * @param {ControlParameters} parameters - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  constructor({
    name, 
    axis = new Position(), 
    rad = Math.PI / 2, 
    upperLimit = 0, 
    lowerLimit = 0, 
    index
  }) {
    this.name = name;
    this.axis = axis;
    this.rad = rad;
    this.upperLimit = upperLimit;
    this.lowerLimit = lowerLimit;
    this.index = index;
  }

  /**
   * Check if the input vertex is between the two parallel planes. That mean 
   * this control class is controlling the input vertex.
   * 
   * @param {Position} vertex - 
   * 
   * @returns {boolean}
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   * 
   * @see {@link https://www.google.com/search?q=check+if+vertex+between+two+parallel+plane&ie=UTF-8}
   */
  checkIfControlThisVertex(vertex = new Position()) {
    const dis1 = getDotProductOfPlaneAndVector(
      vertex,
      new Plane({
        a: this.axis.x,
        b: this.axis.y,
        c: this.axis.z,
        d: this.lowerLimit,
      })
    );
    const dis2 = getDotProductOfPlaneAndVector(
      vertex,
      new Plane({
        a: this.axis.x,
        b: this.axis.y,
        c: this.axis.z,
        d: this.upperLimit,
      })
    );

    const sign1 = Math.sign(dis1);
    const sign2 = Math.sign(dis2);

    return sign1 != sign2;
  }
}

export default Control;
