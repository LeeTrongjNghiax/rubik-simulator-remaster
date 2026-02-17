import { Rubik } from "../../../scripts/classes/index.js";
import { hexColorToUnitColor } from "../../../scripts/utilities/index.js";
import createWebGLRenderingContext from "../../../scripts/utilities/canvas/create-web-gl-rendering-context.js";
import resetWebGL from "../../../scripts/utilities/canvas/reset-web-gl.js";
import addTwistyPuzzleMovementControlSet from "../../../scripts/utilities/twisty-puzzles/add-twisty-puzzle-movement-control-set.js";
import createPlaneMatrixFromRotationAxes from "../../../scripts/utilities/maths/create-plane-matrix-from-rotation-axes.js";
import createStickerPlanes from "../../../scripts/utilities/twisty-puzzles/create-sticker-planes.js";
import createInnerCubiePlanes from "../../../scripts/utilities/twisty-puzzles/create-inner-cubie-planes.js";
import createVerticesFromThreeIntersectedPlanes from "../../../scripts/utilities/maths/create-vertices-from-three-intersected-planes.js";
import createInnerVerticesFromThreeIntersectedPlanes from "../../../scripts/utilities/twisty-puzzles/create-inner-vertices-from-three-intersected-planes.js";
import addTwistyPuzzleRotationControlSet from "../../../scripts/utilities/twisty-puzzles/add-twisty-puzzle-rotation-control-set.js";
import addFacesToTwistyPuzzle from "../../../scripts/utilities/twisty-puzzles/add-faces-to-twisty-puzzle.js";
import createVertices from "../../../scripts/utilities/twisty-puzzles/create-vertices.js";
import setUpWebGL from "../../../scripts/utilities/canvas/set-up-web-gl.js";
import createWebGLShaders from "../../../scripts/utilities/canvas/create-web-gl-shaders.js";
import readTextFile from "../../../scripts/utilities/read-text-file.js";
import createWebGLProgram from "../../../scripts/utilities/canvas/create-web-gl-program.js";
import addVerticesBufferData from "../../../scripts/utilities/canvas/add-vertices-buffer-data.js";
import addVertexIndicesBufferData from "../../../scripts/utilities/canvas/add-vertex-indices-buffer-data.js";
import setUpShaderAttribute from "../../../scripts/utilities/canvas/set-up-shader-attribute.js";
import getUniformsInShader from "../../../scripts/utilities/canvas/get-uniforms-in-shader.js";
import createSupportMatrix from "../../../scripts/utilities/canvas/create-support-matrix.js";
import addUniformsToShader from "../../../scripts/utilities/canvas/add-uniforms-to-shader.js";

const createTwistyPuzzle = async (event) => {
  event.preventDefault();

  const canvas = document.querySelector(`.c-main__canvas`);

  if (!canvas) throw new Error(`Canvas not found`);

  const gl = createWebGLRenderingContext(canvas);

  const formData = new FormData(event.target);

  // console.log(Object.fromEntries(formData));

  resetWebGL({
    webGLContext: gl,
    canvas,
    backgroundColor: formData.get(`background-color`) ? hexColorToUnitColor(formData.get(`background-color`)) : [0, 0, 0],
  });

  setUpWebGL(gl);

  const vertexShaderSource = await readTextFile(`./glsl/vertex.glsl`);
  const fragmentShaderSource = await readTextFile(`./glsl/fragment.glsl`);

  const [vertexShader, fragmentShader] = createWebGLShaders({
    webGLContext: gl,
    vertexShaderSource,
    fragmentShaderSource,
  });

  const shaderProgram = createWebGLProgram({
    webGLContext: gl,
    vertexShader,
    fragmentShader,
  });
  
  const rubik = new Rubik({});

  const cubieHalfLength = (+formData.get(`cubie-length`) ?? 1) / 2;

  const endOfX = ( (+formData.get(`number-of-cubies-x`) ?? 3) - 1) / 2;
  const startOfX = -endOfX;

  const endOfY = ( (+formData.get(`number-of-cubies-y`) ?? 3) - 1) / 2;
  const startOfY = -endOfY;

  const endOfZ = ( (+formData.get(`number-of-cubies-z`) ?? 3) - 1) / 2;
  const startOfZ = -endOfZ;

  rubik.stickerGap = +formData.get(`sticker-gap`) ?? 0;

  addTwistyPuzzleMovementControlSet({
    twistyPuzzle: rubik, 
    width: +formData.get(`number-of-cubies-x`) ?? 3,
    startWidth: startOfX,
    endWidth: endOfX,
    height: +formData.get(`number-of-cubies-y`) ?? 3,
    startHeight: startOfY,
    endHeight: endOfY,
    depth: +formData.get(`number-of-cubies-z`) ?? 3,
    startDepth: startOfZ,
    endDepth: endOfZ,
  });
  
  const planeMatrix = createPlaneMatrixFromRotationAxes({
    axisRotationX: +formData.get(`sticker-container-rotation-x`) ?? 0,
    axisRotationY: +formData.get(`sticker-container-rotation-y`) ?? 0,
    axisRotationZ: +formData.get(`sticker-container-rotation-z`) ?? 0,
  });

  const [planesX, planesY, planesZ] = createStickerPlanes({
    planeMatrix,
    startWidth: startOfX,
    endWidth: endOfX,
    translationX: +formData.get(`sticker-container-position-x`) ?? 0,
    startHeight: startOfY,
    endHeight: endOfY,
    translationY: +formData.get(`sticker-container-position-y`) ?? 0,
    startDepth: startOfZ,
    endDepth: endOfZ,
    translationZ: +formData.get(`sticker-container-position-z`) ?? 0,
    twistyPuzzleCubieHalfLength: cubieHalfLength,
    stickerGap: +formData.get(`sticker-gap`) ?? 0,
    stickerSize: +formData.get(`sticker-size`) ?? 0.95,
    stickerTopColor: formData.get(`sticker-top-color`) ? hexColorToUnitColor(formData.get(`sticker-top-color`)) : [1, 1, 1],
    stickerBottomColor: formData.get(`sticker-bottom-color`) ? hexColorToUnitColor(formData.get(`sticker-bottom-color`)) : [1, 1, 0], 
    stickerFrontColor: formData.get(`sticker-front-color`) ? hexColorToUnitColor(formData.get(`sticker-front-color`)) : [0, 1, 1],
    stickerBackColor: formData.get(`sticker-back-color`) ? hexColorToUnitColor(formData.get(`sticker-back-color`)) : [0, 0, 1],
    stickerRightColor: formData.get(`sticker-right-color`) ? hexColorToUnitColor(formData.get(`sticker-right-color`)) : [1, 0, 0],
    stickerLeftColor: formData.get(`sticker-left-color`) ? hexColorToUnitColor(formData.get(`sticker-left-color`)) : [1, 0.65, 0],
    stickerInnerTopColor: formData.get(`sticker-inner-top-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-top-color`)) : [1, 1, 1],
    stickerInnerBottomColor: formData.get(`sticker-inner-bottom-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-bottom-color`)) : [1, 1, 0],
    stickerInnerFrontColor: formData.get(`sticker-inner-front-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-front-color`)) : [0, 1, 1],
    stickerInnerBackColor: formData.get(`sticker-inner-back-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-back-color`)) : [0, 0, 1],
    stickerInnerRightColor: formData.get(`sticker-inner-right-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-right-color`)) : [1, 0, 0],
    stickerInnerLeftColor: formData.get(`sticker-inner-left-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-left-color`)) : [1, 0.65, 0],
    stickerColorTransparency: formData.get(`sticker-color-transparency`) ?? 1,
    stickerInnerColorTransparency: formData.get(`sticker-inner-color-transparency`) ?? 1,
  });

  const [innerPlanesX, innerPlanesY, innerPlanesZ] = createInnerCubiePlanes({
    planeMatrix,
    startWidth: startOfX,
    endWidth: endOfX,
    translationX: formData.get(`sticker-container-position-x`) ?? 0,
    startHeight: startOfY,
    endHeight: endOfY,
    translationY: formData.get(`sticker-container-position-y`) ?? 0,
    startDepth: startOfZ,
    endDepth: endOfZ,
    translationZ: formData.get(`sticker-container-position-z`) ?? 0,
    twistyPuzzleCubieHalfLength: cubieHalfLength,
    stickerInnerTopColor: formData.get(`sticker-inner-top-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-top-color`)) : [1, 1, 1],
    stickerInnerBottomColor: formData.get(`sticker-inner-bottom-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-bottom-color`)) : [1, 1, 0],
    stickerInnerFrontColor: formData.get(`sticker-inner-front-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-front-color`)) : [0, 1, 1],
    stickerInnerBackColor: formData.get(`sticker-inner-back-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-back-color`)) : [0, 0, 1],
    stickerInnerRightColor: formData.get(`sticker-inner-right-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-right-color`)) : [1, 0, 0],
    stickerInnerLeftColor: formData.get(`sticker-inner-left-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-left-color`)) : [1, 0.65, 0],
    stickerInnerColor: formData.get(`sticker-inner-color`) ? hexColorToUnitColor(formData.get(`sticker-inner-color`)) : [0.5, 0.5, 0.5],
    stickerInnerColorTransparency: formData.get(`sticker-inner-color-transparency`) ?? 1,
  });

  const subVertices = formData.get(`is-render-stickers`) === `on`
    ? createVerticesFromThreeIntersectedPlanes({
      twistyPuzzle: rubik,
      planesA: planesX,
      planesB: planesY,
      planesC: planesZ,
    }) 
    : [];

  const innerSubVertices = formData.get(`is-render-inner-outer-cubes`) === `on`
    ? createInnerVerticesFromThreeIntersectedPlanes({
      twistyPuzzle: rubik,
      planesA: innerPlanesX,
      planesB: innerPlanesY,
      planesC: innerPlanesZ,
    }) 
    : [];

  addTwistyPuzzleRotationControlSet({
    twistyPuzzle: rubik,
    width: +formData.get(`number-of-cubies-x`) ?? 3,
    height: +formData.get(`number-of-cubies-y`) ?? 3,
    depth: +formData.get(`number-of-cubies-z`) ?? 3,
  });

  const allSubVertices = [...subVertices, ...innerSubVertices];

  const sortedVertices = allSubVertices.sort((a, b) => a.colorName.localeCompare(b.colorName));

  const vertexIndices = addFacesToTwistyPuzzle({
    twistyPuzzle: rubik,
    vertices: sortedVertices,
    startWidth: startOfX,
    startHeight: startOfY,
    startDepth: startOfZ,
    endWidth: endOfX,
    endHeight: endOfY,
    endDepth: endOfZ,
  });

  const vertices = createVertices(rubik);

  addVerticesBufferData(gl, vertices);

  addVertexIndicesBufferData(gl, vertexIndices);

  setUpShaderAttribute(gl, shaderProgram);
  
  gl.useProgram(shaderProgram);

  const {
    pointSizeUniformLocation,
    matWorldUniformLocation,
    matViewUniformLocation,
    matProjUniformLocation,
    axisVectorUniformLocation,
    radUniformLocation,
    planeAUniformLocation,
    planeBUniformLocation,
  } = getUniformsInShader(gl, shaderProgram);

  const { matWorld, matView, matProjection } = createSupportMatrix({
    orientationX: +formData.get(`sticker-container-rotation-x`) ?? 0,
    orientationY: +formData.get(`sticker-container-rotation-y`) ?? 0,
    orientationZ: +formData.get(`sticker-container-rotation-z`) ?? 0,
    cameraPositionX: +formData.get(`sticker-container-position-x`) ?? 0,
    cameraPositionY: +formData.get(`sticker-container-position-y`) ?? 0,
    cameraPositionZ: +formData.get(`sticker-container-position-z`) ?? 0,
    cameraLookAtX: +formData.get(`sticker-container-position-x`) ?? 0,
    cameraLookAtY: +formData.get(`sticker-container-position-y`) ?? 0,
    cameraLookAtZ: +formData.get(`sticker-container-position-z`) ?? 0,
    cameraUpX: +formData.get(`sticker-container-position-x`) ?? 0,
    cameraUpY: +formData.get(`sticker-container-position-y`) ?? 0,
    cameraUpZ: +formData.get(`sticker-container-position-z`) ?? 0,
    fieldOfView: +formData.get(`field-of-view`) ?? 45,
    aspectRatio: canvas.width / canvas.height,
    nearPlane: +formData.get(`near-plane`) ?? 0.1,
    farPlane: +formData.get(`far-plane`) ?? 100,
  });

  addUniformsToShader({
    gl,
    matWorld,
    matView,
    matProj: matProjection,
    pointSize: +formData.get(`point-size`) ?? 1,
    matWorldUniformLocation,
    matViewUniformLocation,
    matProjUniformLocation,
    pointSizeUniformLocation,
  });

  // console.log(vertices, vertexIndices);

  gl.drawElements(
    gl.TRIANGLES, 
    vertexIndices.length, 
    gl.UNSIGNED_SHORT,
    0
  );
}

const initiateForm = () => {
  const form = document.querySelector(`.c-form`);

  if (!form) throw new Error(`Form not found`);

  form.addEventListener(`submit`, createTwistyPuzzle);
}

document.addEventListener(`DOMContentLoaded`, initiateForm);
