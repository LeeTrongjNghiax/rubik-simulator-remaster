import { Color, Position } from "./index.js";

class Vertex {
  /**
   * @typedef {Object} VertexParameters
   * @property {Position} relativePosition - 
   * @property {Color} color - 
   * @property {string} colorName - 
   * @property {Position} absolutePosition - 
   * 
   * @param {VertexParameters} parameters - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  constructor({ relativePosition, color, colorName, absolutePosition }) {
    this.relativePosition = relativePosition;
    this.color = color;
    this.colorName = colorName;
    this.absolutePosition = absolutePosition;
  }

  /**
   * This is used for generating all the vertices of the face.
   * 
   * @returns {string[]}
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  toString() {
    return [ ...this.relativePosition.position, ...this.color.color ];
  }
}

export default Vertex;
