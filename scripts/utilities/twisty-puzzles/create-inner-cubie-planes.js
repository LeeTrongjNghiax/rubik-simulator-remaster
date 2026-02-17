import createInnerCubiePlaneInOneAxis from "./create-inner-cubie-plane-in-one-axis.js";

const createInnerCubiePlanes = ({
  planeMatrix = new Float32Array(16), 
  startWidth = 0,
  endWidth = 0,
  translationX = 0,
  startHeight = 0,
  endHeight = 0,
  translationY = 0,
  startDepth = 0,
  endDepth = 0,
  translationZ = 0,
  twistyPuzzleCubieHalfLength = 0.5, 
  stickerInnerTopColor = [1, 1, 1],
  stickerInnerBottomColor = [1, 1, 0],
  stickerInnerFrontColor = [0, 1, 1],
  stickerInnerBackColor = [0, 0, 1],
  stickerInnerRightColor = [1, 0, 0],
  stickerInnerLeftColor = [1, 0.65, 0],
  stickerInnerColor = [0.5, 0.5, 0.5],
  stickerInnerColorTransparency = 1,
}) => {
  const planesX = createInnerCubiePlaneInOneAxis({
    positions: [ planeMatrix[0], planeMatrix[1], planeMatrix[2] ],
    defaultPositions: [1, 0, 0],
    start: startWidth,
    end: endWidth,
    translation: translationX,
    twistyPuzzleCubieHalfLength,
    stickerInnerStartColorName: `inner-start-right`,
    stickerInnerEndColorName: `inner-end-left`,
    stickerInnerStartColor: stickerInnerRightColor,
    stickerInnerEndColor: stickerInnerLeftColor,
    stickerInnerColor: stickerInnerColor,
    innerColorTransparency: stickerInnerColorTransparency,
  });

  const planesY = createInnerCubiePlaneInOneAxis({
    positions: [ planeMatrix[3], planeMatrix[4], planeMatrix[5] ],
    defaultPositions: [0, 1, 0],
    start: startHeight,
    end: endHeight,
    translation: translationY,
    twistyPuzzleCubieHalfLength,
    stickerInnerStartColorName: `inner-start-down`,
    stickerInnerEndColorName: `inner-end-up`,
    stickerInnerStartColor: stickerInnerBottomColor,
    stickerInnerEndColor: stickerInnerTopColor,
    stickerInnerColor: stickerInnerColor,
    innerColorTransparency: stickerInnerColorTransparency,
  });

  const planesZ = createInnerCubiePlaneInOneAxis({
    positions: [ planeMatrix[6], planeMatrix[7], planeMatrix[8] ],
    defaultPositions: [0, 0, 1],
    start: startDepth,
    end: endDepth,
    translation: translationZ,
    twistyPuzzleCubieHalfLength,
    stickerInnerStartColorName: `inner-start-front`,
    stickerInnerEndColorName: `inner-end-back`,
    stickerInnerStartColor: stickerInnerFrontColor,
    stickerInnerEndColor: stickerInnerBackColor,
    stickerInnerColor: stickerInnerColor,
    innerColorTransparency: stickerInnerColorTransparency,
  });

  return [planesX, planesY, planesZ];
};

export default createInnerCubiePlanes;