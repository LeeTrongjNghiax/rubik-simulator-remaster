class Color {
  /**
   * All of this component are in the range of [0, 1].
   * 
   * @typedef {Object} ColorParameters
   * @property {number} [r=0]
   * @property {number} [g=0]
   * @property {number} [b=0]
   * @property {number} [a=1]
   * 
   * @param {ColorParameters} parameters - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  constructor({ r = 0, g = 0, b = 0, a = 1 }) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * @returns {number[]}
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  get color() {
    return [this.r, this.g, this.b, this.a];
  }
}

export default Color;
