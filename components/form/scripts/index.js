import { Rubik } from "../../../scripts/classes/index.js";
import { EPSILON, SECOND_TO_MILLISECONDS } from "../../../scripts/constants/index.js";
import { getRandomInteger, hexColorToUnitColor } from "../../../scripts/utilities/index.js";
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
import createVertices from "../../../scripts/utilities/twisty-puzzles/create-vertices.js";
import degreeToRadian from "../../../scripts/utilities/maths/degree-to-radian.js";

let isRotating = false;
let rotateInterval;
let loopTimeout;
let isMouseDown = false;
const orbit = {
  radius: 8,
  theta: -1.65,
  phi: 1.990796326794896,
  sensitivity: 0.05,
  zoomSpeed: 1,
}

const createTwistyPuzzle = async (form) => {
  clearInterval(rotateInterval);
  cancelAnimationFrame(loopTimeout);
  isRotating = false;

  const formData = new FormData(form);

  if (!formData) throw new Error(`Form data not found`);

  const canvas = document.querySelector(`.c-main__canvas`);

  if (!canvas) throw new Error(`Canvas not found`);

  const gl = createWebGLRenderingContext(canvas);

  const backgroundColor = document.querySelector(`#background-color`);

  if (!backgroundColor) throw new Error(`Background Color not found`);

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  if (isDarkMode.matches) backgroundColor.value = `#090909`;
  else backgroundColor.value = `#efefef`;

  resetWebGL({
    webGLContext: gl,
    canvas,
    backgroundColor: backgroundColor.value ? hexColorToUnitColor(backgroundColor.value) : [0, 0, 0],
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
  
  const cubieHalfLength = (+formData.get(`cubie-length`) ?? 1) / 2;

  const endOfX = ( (+formData.get(`number-of-cubies-x`) ?? 3) - 1) / 2;
  const startOfX = -endOfX;

  const endOfY = ( (+formData.get(`number-of-cubies-y`) ?? 3) - 1) / 2;
  const startOfY = -endOfY;

  const endOfZ = ( (+formData.get(`number-of-cubies-z`) ?? 3) - 1) / 2;
  const startOfZ = -endOfZ;

  const rubik = new Rubik({});

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
    stickerTopColor: formData.get(`sticker-color-up`) ? hexColorToUnitColor(formData.get(`sticker-color-up`)) : [1, 1, 1],
    stickerBottomColor: formData.get(`sticker-color-down`) ? hexColorToUnitColor(formData.get(`sticker-color-down`)) : [1, 1, 0], 
    stickerFrontColor: formData.get(`sticker-color-front`) ? hexColorToUnitColor(formData.get(`sticker-color-front`)) : [0, 1, 0],
    stickerBackColor: formData.get(`sticker-color-back`) ? hexColorToUnitColor(formData.get(`sticker-color-back`)) : [0, 0, 1],
    stickerRightColor: formData.get(`sticker-color-right`) ? hexColorToUnitColor(formData.get(`sticker-color-right`)) : [1, 0, 0],
    stickerLeftColor: formData.get(`sticker-color-left`) ? hexColorToUnitColor(formData.get(`sticker-color-left`)) : [.65, .65, .65],
    stickerInnerTopColor: formData.get(`inner-cube-outer-color-up`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-up`)) : [.65, .65, .65],
    stickerInnerBottomColor: formData.get(`inner-cube-outer-color-down`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-down`)) : [.65, .65, .65],
    stickerInnerFrontColor: formData.get(`inner-cube-outer-color-front`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-front`)) : [.65, .65, .65],
    stickerInnerBackColor: formData.get(`inner-cube-outer-color-back`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-back`)) : [.65, .65, .65],
    stickerInnerRightColor: formData.get(`inner-cube-outer-color-right`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-right`)) : [.65, .65, .65],
    stickerInnerLeftColor: formData.get(`inner-cube-outer-color-left`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-left`)) : [.65, .65, .65],
    stickerColorTransparency: +formData.get(`sticker-color-transparency`) ?? 1,
    stickerInnerColorTransparency: +formData.get(`inner-cube-outer-color-transparency`) ?? 1,
  });

  const [innerPlanesX, innerPlanesY, innerPlanesZ] = createInnerCubiePlanes({
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
    stickerInnerTopColor: formData.get(`inner-cube-outer-color-up`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-up`)) : [.65, .65, .65],
    stickerInnerBottomColor: formData.get(`inner-cube-outer-color-down`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-down`)) : [.65, .65, .65],
    stickerInnerFrontColor: formData.get(`inner-cube-outer-color-front`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-front`)) : [.65, .65, .65],
    stickerInnerBackColor: formData.get(`inner-cube-outer-color-back`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-back`)) : [.65, .65, .65],
    stickerInnerRightColor: formData.get(`inner-cube-outer-color-right`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-right`)) : [.65, .65, .65],
    stickerInnerLeftColor: formData.get(`inner-cube-outer-color-left`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color-left`)) : [.65, .65, .65],
    stickerInnerColor: formData.get(`inner-cube-outer-color`) ? hexColorToUnitColor(formData.get(`inner-cube-outer-color`)) : [.65, .65, .65],
    stickerInnerColorTransparency: formData.get(`sticker-inner-color-transparency`) ?? 1,
  });

  const subVertices = formData.get(`is-render-stickers`) === `on`
    ? createVerticesFromThreeIntersectedPlanes({
      twistyPuzzle: rubik,
      planesA: planesX,
      planesB: planesY,
      planesC: planesZ,
      isRenderCenterStickers: (formData.get(`is-render-center-stickers`) === `on`),
      isRenderCornerStickers: (formData.get(`is-render-corner-stickers`) === `on`),
      isRenderEdgeStickers: (formData.get(`is-render-edge-stickers`) === `on`),
    }) 
    : [];

  const innerSubVertices = formData.get(`is-render-inner-outer-cubes`) === `on`
    ? createInnerVerticesFromThreeIntersectedPlanes({
      twistyPuzzle: rubik,
      planesA: innerPlanesX,
      planesB: innerPlanesY,
      planesC: innerPlanesZ,
      isRenderCenterInnerOuterCubes: (formData.get(`is-render-center-inner-outer-cubes`) === `on`),
      isRenderCornerInnerOuterCubes: (formData.get(`is-render-corner-inner-outer-cubes`) === `on`),
      isRenderEdgeInnerOuterCubes: (formData.get(`is-render-edge-inner-outer-cubes`) === `on`),
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

  let vertices = createVertices(rubik);

  addVerticesBufferData(gl, vertices);

  addVertexIndicesBufferData(gl, vertexIndices);

  setUpShaderAttribute(gl);
  
  gl.useProgram(shaderProgram);

  const {
    axisVectorUniformLocation,
    radUniformLocation,
    planeAUniformLocation,
    planeBUniformLocation,
  } = getUniformsInShader(gl, shaderProgram);

  const orientationX = document.querySelector(`#cubie-orientation-x`);

  if (!orientationX) throw new Error(`Orientation X not found`);

  const orientationY = document.querySelector(`#cubie-orientation-y`);

  if (!orientationY) throw new Error(`Orientation Y not found`);

  const orientationZ = document.querySelector(`#cubie-orientation-z`);

  if (!orientationZ) throw new Error(`Orientation Z not found`);

  const cameraDistance = document.querySelector(`#camera-distance`);

  if (!cameraDistance) throw new Error(`Camera Distance not found`);

  const cameraSensitivity = document.querySelector(`#camera-sensitivity`);

  if (!cameraSensitivity) throw new Error(`Camera Sensitivity not found`);

  const cameraPolarAngle = document.querySelector(`#camera-polar-angle`);

  if (!cameraPolarAngle) throw new Error(`Camera Polar Angle not found`);

  const cameraAzimuthalAngle = document.querySelector(`#camera-azimuthal-angle`);

  if (!cameraAzimuthalAngle) throw new Error(`Camera Azimuthal Angle not found`);

  const cameraZoomSpeed = document.querySelector(`#camera-zoom-speed`);

  if (!cameraZoomSpeed) throw new Error(`Camera Zoom Speed not found`);

  orbit.sensitivity = +cameraSensitivity.value;
  orbit.radius = +cameraDistance.value;
  orbit.phi = +cameraPolarAngle.value;
  orbit.theta = +cameraAzimuthalAngle.value;
  orbit.zoomSpeed = +cameraZoomSpeed.value;

  const fieldOfView = document.querySelector(`#field-of-view`);

  if (!fieldOfView) throw new Error(`Field Of View not found`);

  const nearPlane = document.querySelector(`#near-plane`);

  if (!nearPlane) throw new Error(`Near Plane not found`);

  const farPlane = document.querySelector(`#far-plane`);

  if (!farPlane) throw new Error(`Far Plane not found`);

  const cameraLookAtX = document.querySelector(`#camera-look-at-x`);

  if (!cameraLookAtX) throw new Error(`Camera Look At X not found`);

  const cameraLookAtY = document.querySelector(`#camera-look-at-y`);

  if (!cameraLookAtY) throw new Error(`Camera Look At Y not found`);

  const cameraLookAtZ = document.querySelector(`#camera-look-at-z`);

  if (!cameraLookAtZ) throw new Error(`Camera Look At Z not found`);

  const cameraUpX = document.querySelector(`#camera-up-axis-x`);

  if (!cameraUpX) throw new Error(`Camera Up Axis X not found`);

  const cameraUpY = document.querySelector(`#camera-up-axis-y`);

  if (!cameraUpY) throw new Error(`Camera Up Axis Y not found`);

  const cameraUpZ = document.querySelector(`#camera-up-axis-z`);

  if (!cameraUpZ) throw new Error(`Camera Up Axis Z not found`);

  const pointSize = document.querySelector(`#point-size`);

  if (!pointSize) throw new Error(`Point size not found`);

  const canvasResolution = document.querySelector(`#canvas-resolution`);

  if (!canvasResolution) throw new Error(`Canvas resolution not found`);

  const angleRotatedRatioPerFrame = document.querySelector(`#angle-rotated-ratio-per-frame`);

  if (!angleRotatedRatioPerFrame) throw new Error(`Angle rotated ratio per frame not found`);

  const smoothRotationPerFrame = document.querySelector(`#smooth-rotation-per-frame`);

  if (!smoothRotationPerFrame) throw new Error(`Smooth rotation per frame not found`);

  let angleRotatedRatioPerFrameValue = +angleRotatedRatioPerFrame.value;

  let smoothRotationPerFrameValue = +smoothRotationPerFrame.value;

  const updateMatrix = () => {
    canvas.width = +canvasResolution.value ?? 500;
    canvas.height = +canvasResolution.value ?? 500;

    angleRotatedRatioPerFrameValue = +angleRotatedRatioPerFrame.value;
    smoothRotationPerFrameValue = +smoothRotationPerFrame.value;

    const {
      pointSizeUniformLocation,
      matWorldUniformLocation,
      matViewUniformLocation,
      matProjUniformLocation,
    } = getUniformsInShader(gl, shaderProgram);

    const x = orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta);
    const y = orbit.radius * Math.cos(orbit.phi);
    const z = orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta);

    const { matWorld, matView, matProjection } = createSupportMatrix({
      orientationX: +orientationX.value ?? 0,
      orientationY: +orientationY.value ?? 0,
      orientationZ: +orientationZ.value ?? 0,
      cameraPositionX: x,
      cameraPositionY: y,
      cameraPositionZ: z,
      cameraLookAtX: +cameraLookAtX.value ?? 0,
      cameraLookAtY: +cameraLookAtY.value ?? 1,
      cameraLookAtZ: +cameraLookAtZ.value ?? 0,
      cameraUpX: +cameraUpX.value ?? 0,
      cameraUpY: +cameraUpY.value ?? 1,
      cameraUpZ: +cameraUpZ.value ?? 0,
      fieldOfView: +fieldOfView.value ? degreeToRadian(+fieldOfView.value) : 45,
      aspectRatio: canvas.width / canvas.height,
      nearPlane: +nearPlane.value ?? 0.1,
      farPlane: +farPlane.value ?? 100,
    });

    addUniformsToShader({
      gl,
      matWorld,
      matView,
      matProj: matProjection,
      pointSize: +pointSize.value ?? 1,
      matWorldUniformLocation,
      matViewUniformLocation,
      matProjUniformLocation,
      pointSizeUniformLocation,
    });
  }

  updateMatrix();

  const drawMode = document.querySelector(`#draw-mode`);

  if (!drawMode) throw new Error(`Draw mode not found`);

  const getDrawMode = () => {
    let drawModeValue = gl.TRIANGLES;

    switch (drawMode.value) {
      case `points`:
        drawModeValue = gl.POINTS;
        break;
      case `lines`:
        drawModeValue = gl.LINES;
        break;
      case `line-loop`:
        drawModeValue = gl.LINE_LOOP;
        break;
      case `line-strip`:
        drawModeValue = gl.LINE_STRIP;
        break;
      case `triangle-strip`:
        drawModeValue = gl.TRIANGLE_STRIP;
        break;
      case `triangle-fan`:
        drawModeValue = gl.TRIANGLE_FAN;
        break;
      case `triangles`:
        drawModeValue = gl.TRIANGLES;
        break;
      default:
        drawModeValue = gl.TRIANGLES;
        break;
    }

    return drawModeValue;
  }

  const draw = () => {
    gl.drawElements(
      getDrawMode(),
      vertexIndices.length,
      gl.UNSIGNED_SHORT,
      0,
    );
  }

  if (vertexIndices.length > 0) {
    resetWebGL({
      webGLContext: gl,
      canvas,
      backgroundColor: backgroundColor.value ? hexColorToUnitColor(backgroundColor.value) : [0, 0, 0],
    });

    draw();
  }

  const controllerContainer = document.querySelector(`.c-controller-container`);

  if (!controllerContainer) throw new Error(`Controller container not found`);

  controllerContainer.innerHTML = ``;

  const controllerTemplate = document.querySelector(`#controller-template`);

  if (!controllerTemplate) throw new Error(`Controller template not found`);

  const rotateTillDone = (controlName) => {
    if (isRotating) return;

    isRotating = true;

    const control = rubik.controls.find(
      (control) => control.name === controlName,
    );

    if (!control) return;

    let angleToRotate = 0;

    const step = control.rad / angleRotatedRatioPerFrameValue;

    let newVertices = [...vertices];

    let currentTime = Date.now();

    clearInterval(rotateInterval);

    rotateInterval = setInterval(() => {
      const timePassed = Date.now() - currentTime;
      currentTime = Date.now();

      // angleToRotate += step * timePassed / SECOND_TO_MILLISECONDS;
      angleToRotate += step;

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newVertices), gl.STATIC_DRAW);

      const axisVector = control.axis.position;

      const planeA = [
        axisVector[0],
        axisVector[1],
        axisVector[2],
        control.lowerLimit,
      ];

      const planeB = [
        axisVector[0],
        axisVector[1],
        axisVector[2],
        control.upperLimit,
      ];

      gl.uniform3fv(axisVectorUniformLocation, axisVector);
      gl.uniform4fv(planeAUniformLocation, planeA);
      gl.uniform4fv(planeBUniformLocation, planeB);
      gl.uniform1f(radUniformLocation, angleToRotate);

      resetWebGL({
        webGLContext: gl,
        canvas,
        backgroundColor: backgroundColor.value ? hexColorToUnitColor(backgroundColor.value) : [0, 0, 0],
      });

      draw();

      if ( Math.abs( angleToRotate - control.rad ) <= EPSILON ) {
        rubik.rotateFace(
          control.axis,
          angleToRotate,
          control.upperLimit,
          control.lowerLimit,
        );

        newVertices = [
          ...[].concat(
            ...rubik.cubies.map(
              (cubie) => cubie.toString()
            )
          )
        ];

        vertices = newVertices;
        isRotating = false;
        clearInterval(rotateInterval);
      }
    }, smoothRotationPerFrameValue);
  }

  rubik.controls.forEach((control) => {
    const clonedControllerTemplate = controllerTemplate.content.cloneNode(true);

    const controllerButton = clonedControllerTemplate.querySelector(`.c-controller-container__controller-button`);

    if (!controllerButton) throw new Error(`Controller button not found`);

    controllerButton.textContent = control.name;

    controllerButton.addEventListener(`click`, (e) => {
      rotateTillDone(e.target.textContent);
    });
    
    controllerContainer.appendChild(clonedControllerTemplate);
  });

  const toggleAutoScrambling = document.querySelector(`#toggle-auto-scrambling`);

  if (!toggleAutoScrambling) throw new Error(`Toggle auto scrambling not found`);

  const loop = () => {
    loopTimeout = requestAnimationFrame(loop);

    const randomControlName = rubik.controls[
      Math.floor(Math.random() * rubik.controls.length)
    ].name;

    if (!randomControlName) return;
    
    rotateTillDone(randomControlName);
  }
    
  if (toggleAutoScrambling.checked) {
    loop();
  } else {
    cancelAnimationFrame(loopTimeout);
  }

  toggleAutoScrambling.addEventListener(`change`, (event) => {
    if (event.target.checked) {
      cancelAnimationFrame(loopTimeout);

      const loop = () => {
        loopTimeout = requestAnimationFrame(loop);

        const randomControlName = rubik.controls[
          Math.floor(Math.random() * rubik.controls.length)
        ].name;

        if (!randomControlName) return;

        rotateTillDone(randomControlName);
      }
      
      loop();
    } else {
      cancelAnimationFrame(loopTimeout);
    }
  });

  orientationX.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  orientationY.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  orientationZ.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  cameraSensitivity.addEventListener(`input`, () => {
    orbit.sensitivity = cameraSensitivity.value;

    updateMatrix();
    draw();
  });

  cameraDistance.addEventListener(`input`, () => {
    orbit.radius = cameraDistance.value;

    updateMatrix();
    draw();
  });

  cameraPolarAngle.addEventListener(`input`, () => {
    orbit.phi = cameraPolarAngle.value;

    updateMatrix();
    draw();
  });

  cameraAzimuthalAngle.addEventListener(`input`, () => {
    orbit.theta = cameraAzimuthalAngle.value;

    updateMatrix();
    draw();
  });

  cameraZoomSpeed.addEventListener(`input`, () => {
    orbit.zoomSpeed = cameraZoomSpeed.value;

    updateMatrix();
    draw();
  });

  cameraLookAtX.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  cameraLookAtY.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  cameraLookAtZ.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  cameraUpX.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  cameraUpY.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  cameraUpZ.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  fieldOfView.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  nearPlane.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  farPlane.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  drawMode.addEventListener(`change`, () => {
    updateMatrix();
    draw();
  });

  pointSize.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  canvasResolution.addEventListener(`input`, () => {
    updateMatrix();
    draw();
  });

  angleRotatedRatioPerFrame.addEventListener(`input`, () => {
    updateMatrix();
  });

  smoothRotationPerFrame.addEventListener(`input`, () => {
    updateMatrix();
  });

  canvas.addEventListener(`mousedown`, () => {
    isMouseDown = true;
    canvas.classList.add(`c-main__canvas--focus`);
  });

  canvas.addEventListener(`mouseup`, () => {
    isMouseDown = false;
    canvas.classList.remove(`c-main__canvas--focus`);
  });

  canvas.addEventListener(`mousemove`, (event) => {
    if (isMouseDown) {
      orbit.theta += event.movementX * orbit.sensitivity;

      orbit.phi += event.movementY * orbit.sensitivity;
      orbit.phi = Math.max(0.01, Math.min(Math.PI - 0.01, orbit.phi));

      updateMatrix();
      draw();
    }
  });

  canvas.addEventListener('wheel', (e) => {
    orbit.radius += e.deltaY * orbit.zoomSpeed;
    orbit.radius = Math.max(1, orbit.radius);
    e.preventDefault();
  }, { passive: true });
}

const initiateForm = () => {
  const form = document.querySelector(`.c-form`);

  if (!form) throw new Error(`Form not found`);

  const handleCreateTwistyPuzzle = (event) => {
    event.preventDefault();
    createTwistyPuzzle(form);
  }

  form.addEventListener(`submit`, handleCreateTwistyPuzzle);

  const loadRubikFormPreset = document.querySelector(`#load-rubik-form-preset`);

  if (!loadRubikFormPreset) throw new Error(`Load rubik form preset not found`);

  const cameraDistance = document.querySelector(`#camera-distance`);

  if (!cameraDistance) throw new Error(`Camera Distance not found`);

  orbit.radius = Math.abs(+cameraDistance.value);

  loadRubikFormPreset.addEventListener(`change`, (event) => {
    const preset = event.target.value;
    
    switch (preset) {
      case `2x2x2`:
        form.querySelector(`#number-of-cubies-x`).value = 2;
        form.querySelector(`#number-of-cubies-y`).value = 2;
        form.querySelector(`#number-of-cubies-z`).value = 2;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -5;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `4x4x4`:
        form.querySelector(`#number-of-cubies-x`).value = 4;
        form.querySelector(`#number-of-cubies-y`).value = 4;
        form.querySelector(`#number-of-cubies-z`).value = 4;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -10;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `5x5x5`:
        form.querySelector(`#number-of-cubies-x`).value = 5;
        form.querySelector(`#number-of-cubies-y`).value = 5;
        form.querySelector(`#number-of-cubies-z`).value = 5;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -12;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `6x6x6`:
        form.querySelector(`#number-of-cubies-x`).value = 6;
        form.querySelector(`#number-of-cubies-y`).value = 6;
        form.querySelector(`#number-of-cubies-z`).value = 6;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -14;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `7x7x7`:
        form.querySelector(`#number-of-cubies-x`).value = 7;
        form.querySelector(`#number-of-cubies-y`).value = 7;
        form.querySelector(`#number-of-cubies-z`).value = 7;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -16;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `domino-cube`:
        form.querySelector(`#number-of-cubies-x`).value = 3;
        form.querySelector(`#number-of-cubies-y`).value = 2;
        form.querySelector(`#number-of-cubies-z`).value = 3;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -8;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `tower-cube`:
        form.querySelector(`#number-of-cubies-x`).value = 2;
        form.querySelector(`#number-of-cubies-y`).value = 4;
        form.querySelector(`#number-of-cubies-z`).value = 2;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -8;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `windmill-cube`:
        form.querySelector(`#number-of-cubies-x`).value = 3;
        form.querySelector(`#number-of-cubies-y`).value = 3;
        form.querySelector(`#number-of-cubies-z`).value = 3;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0.5;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -8;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
      case `mirrors-block`:
        form.querySelector(`#sticker-container-position-x`).value = 0.4;
        form.querySelector(`#sticker-container-position-y`).value = -0.5;
        form.querySelector(`#sticker-container-position-z`).value = 0.6;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -10;

        form.querySelector(`#sticker-color-up`).value = `#c0c0c0`;
        form.querySelector(`#sticker-color-down`).value = `#c0c0c0`;
        form.querySelector(`#sticker-color-front`).value = `#c0c0c0`;
        form.querySelector(`#sticker-color-back`).value = `#c0c0c0`;
        form.querySelector(`#sticker-color-right`).value = `#c0c0c0`;
        form.querySelector(`#sticker-color-left`).value = `#c0c0c0`;

        form.querySelector(`#is-render-inner-outer-cubes`).checked = true;
        break;
      case `void-cube`:
        form.querySelector(`#number-of-cubies-x`).value = 3;
        form.querySelector(`#number-of-cubies-y`).value = 3;
        form.querySelector(`#number-of-cubies-z`).value = 3;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -8;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        form.querySelector(`#is-render-center-stickers`).checked = false;
        form.querySelector(`#is-render-inner-outer-cubes`).checked = false;

        break;
      case `3x3x3`: default:
        form.querySelector(`#number-of-cubies-x`).value = 3;
        form.querySelector(`#number-of-cubies-y`).value = 3;
        form.querySelector(`#number-of-cubies-z`).value = 3;

        form.querySelector(`#sticker-container-position-x`).value = 0;
        form.querySelector(`#sticker-container-position-y`).value = 0;
        form.querySelector(`#sticker-container-position-z`).value = 0;

        form.querySelector(`#sticker-container-rotation-x`).value = 0;
        form.querySelector(`#sticker-container-rotation-y`).value = 0;
        form.querySelector(`#sticker-container-rotation-z`).value = 0;

        cameraDistance.value = -8;

        form.querySelector(`#sticker-color-up`).value = `#ffffff`;
        form.querySelector(`#sticker-color-down`).value = `#ffff00`;
        form.querySelector(`#sticker-color-front`).value = `#00ff00`;
        form.querySelector(`#sticker-color-back`).value = `#0000ff`;
        form.querySelector(`#sticker-color-right`).value = `#ff0000`;
        form.querySelector(`#sticker-color-left`).value = `#ffa800`;

        break;
    }

    createTwistyPuzzle(form);
  });

  const randomRubikFormPresetIndex = getRandomInteger(0, loadRubikFormPreset.options.length - 1);
  // const randomRubikFormPresetIndex = 0;

  loadRubikFormPreset.value = loadRubikFormPreset.options[randomRubikFormPresetIndex].value;

  loadRubikFormPreset.dispatchEvent(new Event(`change`));

  const isAutoUpdate = document.querySelector(`#is-auto-update`);

  if (!isAutoUpdate) throw new Error(`Is auto update not found`);

  if (isAutoUpdate.checked) {
    form.addEventListener(`input`, handleCreateTwistyPuzzle);
  } else {
    form.removeEventListener(`input`, handleCreateTwistyPuzzle);
  }
  
  isAutoUpdate.addEventListener(`change`, (event) => {
    if (event.target.checked) {
      form.addEventListener(`input`, handleCreateTwistyPuzzle);
    } else {
      form.removeEventListener(`input`, handleCreateTwistyPuzzle);
    }
  });

  const toggleControls = document.querySelector(`#toggle-controls`);

  if (!toggleControls) throw new Error(`Toggle controls not found`);

  const controllerContainer = document.querySelector(`.c-controller-container`);

  if (!controllerContainer) throw new Error(`Controller container not found`);

  if (toggleControls.checked) {
    controllerContainer.classList.remove(`u-hidden`);
  } else {
    controllerContainer.classList.add(`u-hidden`);
  }

  toggleControls.addEventListener(`change`, (event) => {
    if (event.target.checked) {
      controllerContainer.classList.remove(`u-hidden`);
    } else {
      controllerContainer.classList.add(`u-hidden`);
    }
  });
}

document.addEventListener(`DOMContentLoaded`, initiateForm);
