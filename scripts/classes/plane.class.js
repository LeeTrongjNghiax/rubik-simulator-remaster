import { Color } from "./index.js";

class Plane {
  /**
   * Represent a two-dimensional space that extends indefinitely using 
   * point–normal form
   * 
   * @typedef {Object} PlaneParameters
   * @property {number} a - 
   * @property {number} b - 
   * @property {number} c - 
   * @property {number} d - 
   * @property {Color} [color=new Color()] - 
   * @property {string} [colorName=""] - 
   * @property {number} [center=0] - 
   * 
   * @param {PlaneParameters} parameters - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   * 
   * @see {@link https://en.wikipedia.org/wiki/Plane_(mathematics)}
   */
  constructor({
    a = 0,
    b = 0,
    c = 0,
    d = 0,
    color = new Color(),
    colorName = "",
    center = 0
  }) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.color = color;
    this.colorName = colorName;
    this.center = center;
  }
}

export default Plane;
