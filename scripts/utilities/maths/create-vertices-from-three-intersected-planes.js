import createVertexFromThreeIntersectedPlanes from "./create-vertex-from-three-intersected-planes.js";

const createVerticesFromThreeIntersectedPlanes = ({
  twistyPuzzle,
  planesA, 
  planesB,
  planesC,
  isRenderCenterStickers = true,
  isRenderCornerStickers = true,
  isRenderEdgeStickers = true,
}) => {
  const vertices = [];

  for (let i = 0; i < planesA.length; i++) {
    for (let j = 0; j < planesB.length; j++) {
      for (let k = 0; k < planesC.length; k++) {
        // Check if 3 planes intersected a sticker vertex

        const isRenderCenterStickerX = isRenderCenterStickers
          ? true
          : (
            (j < 3 || j > planesB.length - 1 - 3) ||
            (k < 3 || k > planesC.length - 1 - 3)
          );

        const isRenderCenterStickerY = isRenderCenterStickers
          ? true
          : (
            (i < 3 || i > planesA.length - 1 - 3) ||
            (k < 3 || k > planesC.length - 1 - 3)
          );

        const isRenderCenterStickerZ = isRenderCenterStickers
          ? true
          : (
            (i < 3 || i > planesA.length - 1 - 3) ||
            (j < 3 || j > planesB.length - 1 - 3)
          );

        const isRenderCornerSticker = isRenderCornerStickers
          ? true
          : !(
            (i < 3 || i > planesA.length - 1 - 3) &&
            (j < 3 || j > planesB.length - 1 - 3) &&
            (k < 3 || k > planesC.length - 1 - 3)
          );

        const isRenderEdgeStickerX = isRenderEdgeStickers
          ? true
          : (
            ( !(j < 3 || j > planesB.length - 1 - 3) ||
            (  (j < 3 || j > planesA.length - 1 - 3) && (k < 3 || k > planesC.length - 1 - 3) ) ) &&
            ( !(k < 3 || k > planesC.length - 1 - 3) ||
            (  (k < 3 || k > planesC.length - 1 - 3) && (j < 3 || j > planesB.length - 1 - 3) ) )
          );

        const isRenderEdgeStickerY = isRenderEdgeStickers
          ? true
          : (
            ( !(i < 3 || i > planesA.length - 1 - 3) ||
            (  (i < 3 || i > planesA.length - 1 - 3) && (k < 3 || k > planesC.length - 1 - 3) ) ) &&
            ( !(k < 3 || k > planesC.length - 1 - 3) ||
            (  (k < 3 || k > planesC.length - 1 - 3) && (i < 3 || i > planesA.length - 1 - 3) ) )
          );

        const isRenderEdgeStickerZ = isRenderEdgeStickers
          ? true
          : (
            ( !(i < 3 || i > planesA.length - 1 - 3) ||
            (  (i < 3 || i > planesA.length - 1 - 3) && (j < 3 || j > planesB.length - 1 - 3) ) ) &&
            ( !(j < 3 || j > planesB.length - 1 - 3) ||
            (  (j < 3 || j > planesA.length - 1 - 3) && (i < 3 || i > planesA.length - 1 - 3) ) )
          );

        if (
          (i === 0 || i === planesA.length - 1) &&
          (j !== 0 && j !== planesB.length - 1) &&
          (k !== 0 && k !== planesC.length - 1) &&
          isRenderCenterStickerX &&
          isRenderCornerSticker &&
          isRenderEdgeStickerX
        ) {
          vertices.push(
            createVertexFromThreeIntersectedPlanes({
              twistyPuzzle,
              planeAIndex: i,
              planesA,
              planeBIndex: j,
              planesB,
              planeCIndex: k,
              planesC,
              plane: planesA[i],
            })
          )
        }

        if (
          (i !== 0 && i !== planesA.length - 1) &&
          (j === 0 || j === planesB.length - 1) &&
          (k !== 0 && k !== planesC.length - 1) &&
          isRenderCenterStickerY &&
          isRenderCornerSticker &&
          isRenderEdgeStickerY
        ) {
          vertices.push(
            createVertexFromThreeIntersectedPlanes({
              twistyPuzzle,
              planeAIndex: i,
              planesA,
              planeBIndex: j,
              planesB,
              planeCIndex: k,
              planesC,
              plane: planesB[j],
            })
          )
        }

        if (
          (i !== 0 && i !== planesA.length - 1) &&
          (j !== 0 && j !== planesB.length - 1) &&
          (k === 0 || k === planesC.length - 1) &&
          isRenderCenterStickerZ &&
          isRenderCornerSticker &&
          isRenderEdgeStickerZ
        ) {
          vertices.push(
            createVertexFromThreeIntersectedPlanes({
              twistyPuzzle,
              planeAIndex: i,
              planesA,
              planeBIndex: j,
              planesB,
              planeCIndex: k,
              planesC,
              plane: planesC[k],
            })
          )
        }
      }
    }
  }

  return vertices;
};

export default createVerticesFromThreeIntersectedPlanes;
