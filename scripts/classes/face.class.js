import { Vertex, Position, Color } from "./index.js";

class Face {
  /**
   * @typedef {Object} FaceParameters
   * @property {Vertex[]} [vertices=[]] - 
   * @property {Position} [absolutePosition=new Position(0, 0, 0)] - This absolute position does NOT related to the face.
   * @property {Color} [color=new Color()] - Technically all the vertices will defined the color of this face.
   * @property {string} [colorName=""] - 
   * 
   * @param {FaceParameters} parameters - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  constructor({
    vertices = [],
    absolutePosition = new Position(),
    color = new Color(),
    colorName = "",
  }) {
    this.vertices = vertices;
    this.absolutePosition = absolutePosition;
    this.color = color;
    this.colorName = colorName;
  }

  /**
   * @param {Vertex} vertex - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  addVertex(vertex) {
    this.vertices.push(vertex);
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
    return [].concat(
      ...[].concat(
        ...this.vertices.map(e => e.toString())
      )
    );
  }
}

export default Face;
