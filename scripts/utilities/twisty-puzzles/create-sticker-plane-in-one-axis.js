import {
  DECIMAL_BASE_DIGIT_COUNT,
  NUMBER_OF_STICKER_PLANE_IN_SINGLE_AXIS,
} from "../../constants/index.js";
import { Color, Plane } from "../../classes/index.js";

const createStickerPlaneInOneAxis = ({
  start,
  end,
  positions,
  defaultPositions,
  stickerStartColor,
  stickerInnerStartColor,
  stickerEndColor,
  stickerInnerEndColor,
  stickerStartColorName,
  stickerInnerStartColorName,
  stickerEndColorName,
  stickerInnerEndColorName,
  stickerGap = 0.01,
  stickerSize = 0.95,
  translation = 0,
  twistyPuzzleCubieHalfLength = 0.5,
  colorTransparency = 1,
  innerColorTransparency = 1,
}) => {
  const planes = [];
  const oneMinusStickerSize = ( 
    DECIMAL_BASE_DIGIT_COUNT - (stickerSize * DECIMAL_BASE_DIGIT_COUNT) 
  ) / DECIMAL_BASE_DIGIT_COUNT;

  for (let i = start; i <= end; i++) {
    for (
      let i2 = -1; 
      i2 < NUMBER_OF_STICKER_PLANE_IN_SINGLE_AXIS; 
      i2 += NUMBER_OF_STICKER_PLANE_IN_SINGLE_AXIS
    ) {
      // Add sticker start
      if (i === start && i2 === -1) {
        planes.push(
          new Plane({
            a: positions[0], 
            b: positions[1], 
            c: positions[2], 
            d: -(i + twistyPuzzleCubieHalfLength * i2 - stickerGap + translation),
            color: new Color({
              r: stickerStartColor[0], 
              g: stickerStartColor[1], 
              b: stickerStartColor[2], 
              a: colorTransparency,
            }),
            colorName: stickerStartColorName, 
            center: i
          })
        );
      }

      // Add planes that pass through 2 opposite stickers

      // If the current plane is the outer plane

      if ( (i === start && i2 === -1) || (i === end && i2 === 1) ) {
        if (i2 === -1) {
          planes.push(
            new Plane({
              a: positions[0], 
              b: positions[1], 
              c: positions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2 + oneMinusStickerSize + translation),
              color: new Color({
                r: stickerInnerStartColor[0], 
                g: stickerInnerStartColor[1], 
                b: stickerInnerStartColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerStartColorName, 
              center: i
            })
          );
        } else {
          planes.push(
            new Plane({
              a: positions[0], 
              b: positions[1], 
              c: positions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2 - oneMinusStickerSize + translation),
              color: new Color({
                r: stickerEndColor[0], 
                g: stickerEndColor[1], 
                b: stickerEndColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerEndColorName, 
              center: i
            })
          );
        }
      } else {
        if (i2 === -1) {
          planes.push(
            new Plane({
              a: defaultPositions[0], 
              b: defaultPositions[1], 
              c: defaultPositions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2 + oneMinusStickerSize),
              color: new Color({
                r: stickerInnerStartColor[0], 
                g: stickerInnerStartColor[1], 
                b: stickerInnerStartColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerStartColorName, 
              center: i
            })
          );
        } else {
          planes.push(
            new Plane({
              a: defaultPositions[0], 
              b: defaultPositions[1], 
              c: defaultPositions[2], 
              d: -(i + twistyPuzzleCubieHalfLength * i2 - oneMinusStickerSize),
              color: new Color({
                r: stickerInnerEndColor[0], 
                g: stickerInnerEndColor[1], 
                b: stickerInnerEndColor[2], 
                a: innerColorTransparency,
              }),
              colorName: stickerInnerEndColorName, 
              center: i
            })
          );
        }
      }

      // Add sticker end
      if (i === end && i2 === 1) {
        planes.push(
          new Plane({
            a: positions[0], 
            b: positions[1], 
            c: positions[2], 
            d: -(i + twistyPuzzleCubieHalfLength * i2 + stickerGap + translation),
            color: new Color({
              r: stickerEndColor[0], 
              g: stickerEndColor[1], 
              b: stickerEndColor[2], 
              a: colorTransparency,
            }),
            colorName: stickerEndColorName, 
            center: i
          })
        );
      }
    }
  }

  return planes;
}

export default createStickerPlaneInOneAxis;
