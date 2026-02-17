import { NUMBER_OF_STICKER_PLANE_IN_SINGLE_AXIS } from "../../constants/index.js";
import { Color, Plane } from "../../classes/index.js";

const createInnerCubiePlaneInOneAxis = ({
  start,
  end,
  positions,
  defaultPositions,
  stickerInnerStartColor,
  stickerInnerEndColor,
  stickerInnerColor = [0.5, 0.5, 0.5],
  stickerInnerStartColorName,
  stickerInnerEndColorName,
  translation = 0,
  twistyPuzzleCubieHalfLength = 0.5,
  innerColorTransparency,
}) => {
  const planes = [];

  for (let i = start; i <= end; i++) {
    for (
      let i2 = -1; 
      i2 < NUMBER_OF_STICKER_PLANE_IN_SINGLE_AXIS; 
      i2 += NUMBER_OF_STICKER_PLANE_IN_SINGLE_AXIS
    ) {
      // Add sticker start
      if ( (i === start && i2 === -1) || (i === end && i2 === 1) ) {
        if ( i2 === -1 ) {
          planes.push(
            new Plane({
              a: positions[0], 
              b: positions[1], 
              c: positions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2 + translation),
              color: new Color({
                r: stickerInnerStartColor[0], 
                g: stickerInnerStartColor[1], 
                b: stickerInnerStartColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerStartColorName, 
              center: i,
            })
          );
        } else {
          planes.push(
            new Plane({
              a: positions[0], 
              b: positions[1], 
              c: positions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2 + translation),
              color: new Color({
                r: stickerInnerEndColor[0], 
                g: stickerInnerEndColor[1], 
                b: stickerInnerEndColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerEndColorName, 
              center: i,
            })
          );
        }
      } else {
        if ( i2 === -1 ) {
          planes.push(
            new Plane({
              a: defaultPositions[0], 
              b: defaultPositions[1], 
              c: defaultPositions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2),
              color: new Color({
                r: stickerInnerColor[0], 
                g: stickerInnerColor[1], 
                b: stickerInnerColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerStartColorName, 
              center: i,
            })
          );
        } else {
          planes.push(
            new Plane({
              a: defaultPositions[0], 
              b: defaultPositions[1], 
              c: defaultPositions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2),
              color: new Color({
                r: stickerInnerColor[0], 
                g: stickerInnerColor[1], 
                b: stickerInnerColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerEndColorName, 
              center: i,
            })
          );
        }
      }
    }
  }

  return planes;
}

export default createInnerCubiePlaneInOneAxis;