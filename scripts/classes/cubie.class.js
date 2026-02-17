import { Face, Position } from "./index.js";

class Cubie {
  /**
   * @param {Face[]} faces - Can have 3, 4 or 6 faces.
   * @param {Position} [absolutePosition=new Position(0, 0, 0)] - This position does NOT related to the cubie.
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  constructor(faces = [], absolutePosition = new Position(0, 0, 0)) {
    this.faces = faces;
    this.absolutePosition = absolutePosition;
  }

  /**
   * @param {Face} face - 
   * 
   * @returns {boolean}
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  addFace(face) {
    this.faces.push(face);
  }

  /**
   * This is used for generating all the vertices of the cubie.
   * 
   * @returns {string[]}
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  toString() {
    return [].concat(...this.faces.map(e => e.toString()));
  }
}

export default Cubie;
