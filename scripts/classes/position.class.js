class Position {
  /**
   * @typedef {Object} PositionParameters
   * @property {number} [x=0] - The x of the position.
   * @property {number} [y=0] - The y of the position.
   * @property {number} [z=0] - The z of the position.
   * 
   * @param {PositionParameters} parameters - 
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  constructor({ x = 0, y = 0, z = 0 }) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @returns {number[]}
   * 
   * @author 
   * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
   */
  get position() {
    return [this.x, this.y, this.z];
  }
}

export default Position;
