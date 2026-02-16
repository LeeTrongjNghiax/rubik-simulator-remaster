// window.location.reload(true)

//
// Constants
//

const ZERO = 0.0;
const ONE = 1.0;
const DELTA = 0.5;
const QUARTER_OF_CIRCLE = Math.PI / 2;
const HALF_OF_CIRCLE    = Math.PI;
const FULL_OF_CIRCLE    = Math.PI * 2;
const ROTATE_QUARTER_OF_CIRCLE_REVERSE_SYMBOL = "′";

const MILLISECOND_PER_SECOND = 1000;

const LIGHT_COLOR = 255 / 255;
const DARK_COLOR = 18 / 255;

const DECIMAL_PLACES = 2;
const UPDATE_EACH_SECOND = 1;
const DECIMAL_PLACES_RATIO = Math.pow(10, DECIMAL_PLACES);

const MAX_DISTANCE = 2;

//
// Shader
//

let SHADER_vertex;
let SHADER_fragment;

//
// HTML Elements
//

let ELEM_canvas;
let ELEM_draw_mode;
let ELEM_predefined_rubik;
let ELEM_rotate_button;
let ELEM_show_fps;

//
// Inputs
//

let INP_predefined_rubik;
let INP_vertex_shader_text;
let INP_fragment_shader_text;
let INP_rubik_size_x;
let INP_rubik_size_y;
let INP_rubik_size_z;
let INP_rubik_length;
let INP_sticker_gap;
let INP_sticker_size;

let INP_translate_x;
let INP_translate_y;
let INP_translate_z;

let INP_axis_rotation_x;
let INP_axis_rotation_y;
let INP_axis_rotation_z;

let INP_is_render_outer_cube;
let INP_is_render_inner_outline_cube;
let INP_is_render_inner_cube;
let INP_is_render_inner_plane;

let INP_rubik_orientation_x;
let INP_rubik_orientation_y;
let INP_rubik_orientation_z;

let INP_rubik_orientation_matrix_x;
let INP_rubik_orientation_matrix_y;
let INP_rubik_orientation_matrix_z;

let INP_rotate_angle_x;
let INP_rotate_angle_y;
let INP_rotate_angle_z;
let INP_angle_per_second;
let INP_update_angle_method;
let INP_smooth_rotation;
let INP_angle_rotated_ratio;

let INP_fovy;
let INP_aspect_ratio;
let INP_near;
let INP_far;

let INP_draw_mode_value;
let INP_point_size;

let INP_camera_position;
let INP_camera_look_at;
let INP_up_axis;

let INP_transparent_sticker = 1.0;
let INP_transparent_inner_cube = 1.0;
let INP_COLOR_up    = [1.0, 1.0, 1.0];
let INP_COLOR_down  = [1.0, 1.0, 0.0];
let INP_COLOR_front = [0.0, 1.0, 0.0];
let INP_COLOR_back  = [0.0, 0.0, 1.0];
let INP_COLOR_right = [1.0, 0.0, 0.0];
let INP_COLOR_left  = [1.0, 0.5, 0.0];

let INP_COLOR_inner_up    = [1.0, 1.0, 1.0];
let INP_COLOR_inner_down  = [1.0, 1.0, 0.0];
let INP_COLOR_inner_front = [0.0, 1.0, 0.0];
let INP_COLOR_inner_back  = [0.0, 0.0, 1.0];
let INP_COLOR_inner_right = [1.0, 0.0, 0.0];
let INP_COLOR_inner_left  = [1.0, 0.5, 0.0];

let INP_shader_program_version;

let INP_generation_method;

//
// Shader buffers
//

let SHADER_BUFFER_vectex;
let SHADER_BUFFER_vectex_index;

//
// Attributes location
//

let ATTR_LOC_position;
let ATTR_LOC_color;

//
// Uniforms location
//

let UNI_LOC_point_size;
let UNI_LOC_mat_world;
let UNI_LOC_mat_view;
let UNI_LOC_mat_projection;
let UNI_LOC_axis_vector;
let UNI_LOC_rad;
let UNI_LOC_plane1;
let UNI_LOC_plane2;

//
// Matrices
//

let MAT_world;
let MAT_view;
let MAT_projection;

let MAT_x_rotation;
let MAT_y_rotation;
let MAT_z_rotation;
let MAT_identity;

//
// Quaternions
//

let quat;
let inverted_quat;
let x_axis_vector;
let y_axis_vector;
let z_axis_vector;

let rotated_x_axis_vector;
let rotated_y_axis_vector;
let rotated_z_axis_vector;

//
// Index
//

let i, j, k, i2, j2, k2, count, i3;

//
// In the init
//

let rubik_half_length;
let end_x;
let start_x;
let end_y;
let start_y;
let end_z;
let start_z;

//
// Creating controls set
//

let rotation_name;
let mean;
let sticker_start;
let sticker_end;
let direction;
let suffix;

let plane1;
let plane2;
let plane1_;
let plane2_;
let axis_vector_;

//
// count_fps variable
//

let timeMeasurements = [];
let fps = 0;
let draw_mode_value;

//
// loop variable
//

let request_animation_frame;

let angle_x = 0;
let angle_y = 0;
let angle_z = 0;

let angle = 0;

let is_running = false;
let last_tick;
let current_tick;
let time;

let control;
let controller_index;
let controller;
let is_rotation_finish = true;
let is_turning_randomly = false;

//
// Rotate loop
//

let rotate_interval;
let rad;
let rad_step;

//
//
//

let gl;

let program;

let sub_vertices;
let faces;
let number_of_face;
let number_of_vertex_per_face = 4;
let cubie;
let rubik;
let vertices;
let vertice_indices;
let vertice_indices_length;

let one_minus_sticker_size;

let planes_x;
let planes_y;
let planes_z

let TEMP_COLOR_up;
let TEMP_COLOR_down;
let TEMP_COLOR_front;
let TEMP_COLOR_back;
let TEMP_COLOR_right;
let TEMP_COLOR_left;

let plane_equation;

let MAT_plane_matrix;

let inverse;
let d_vector;
let result_vector;

let plane_upper_limit;
let plane_lower_limit;

let DEBUG_start_time;
let DEBUG_end_time;
let DEBUG_text;

clear_all_data = () => {
  SHADER_vertex = null;
  SHADER_fragment = null;

  //
  // HTML Elements
  //

  ELEM_canvas = null;
  ELEM_draw_mode = null;
  ELEM_rotate_button = null;
  ELEM_show_fps = null;

  //
  // Inputs
  //

  INP_vertex_shader_text = null;
  INP_fragment_shader_text = null;
  INP_rubik_size_x = null;
  INP_rubik_size_y = null;
  INP_rubik_size_z = null;
  INP_rubik_length = null;
  INP_sticker_gap = null;
  INP_sticker_size = null;

  INP_translate_x = null;
  INP_translate_y = null;
  INP_translate_z = null;
  
  INP_axis_rotation_x = null;
  INP_axis_rotation_y = null;
  INP_axis_rotation_z = null;

  INP_is_render_outer_cube = null;
  INP_is_render_inner_outline_cube = null;
  INP_is_render_inner_cube = null;
  INP_is_render_inner_plane = null;

  INP_rubik_orientation_x = null;
  INP_rubik_orientation_y = null;
  INP_rubik_orientation_z = null;

  INP_rubik_orientation_matrix_x = null;
  INP_rubik_orientation_matrix_y = null;
  INP_rubik_orientation_matrix_z = null;

  INP_rotate_angle_x = null;
  INP_rotate_angle_y = null;
  INP_rotate_angle_z = null;
  INP_angle_per_second = null;
  INP_update_angle_method = null;
  INP_smooth_rotation = null;
  INP_angle_rotated_ratio = null;

  INP_fovy = null;
  INP_aspect_ratio = null;
  INP_near = null;
  INP_far = null;

  INP_draw_mode_value = null;
  INP_point_size = null;

  INP_camera_position = null;
  INP_camera_look_at = null;
  INP_up_axis = null;

  INP_transparent_sticker = 1.0    ;
  INP_transparent_inner_cube = 1.0 ;
  INP_COLOR_up    = [1.0, 1.0, 1.0];
  INP_COLOR_down  = [1.0, 1.0, 0.0];
  INP_COLOR_front = [0.0, 1.0, 0.0];
  INP_COLOR_back  = [0.0, 0.0, 1.0];
  INP_COLOR_right = [1.0, 0.0, 0.0];
  INP_COLOR_left  = [1.0, 0.5, 0.0];

  INP_COLOR_inner_up    = [1.0, 1.0, 1.0];
  INP_COLOR_inner_down  = [1.0, 1.0, 0.0];
  INP_COLOR_inner_front = [0.0, 1.0, 0.0];
  INP_COLOR_inner_back  = [0.0, 0.0, 1.0];
  INP_COLOR_inner_right = [1.0, 0.0, 0.0];
  INP_COLOR_inner_left  = [1.0, 0.5, 0.0];

  INP_shader_program_version = null;

  INP_generation_method = null;

  //
  // Shader buffers
  //

  SHADER_BUFFER_vectex = null;
  SHADER_BUFFER_vectex_index = null;

  // //
  // // Attributes location
  // //

  ATTR_LOC_position = null;
  ATTR_LOC_color = null;

  // //
  // // Uniforms location
  // //

  UNI_LOC_point_size = null;
  UNI_LOC_mat_world = null;
  UNI_LOC_mat_view = null;
  UNI_LOC_mat_projection = null;
  UNI_LOC_axis_vector = null;
  UNI_LOC_rad = null;
  UNI_LOC_plane1 = null;
  UNI_LOC_plane2 = null;

  // //
  // // Matrices
  // //

  MAT_world = null;
  MAT_view = null;
  MAT_projection = null;

  MAT_x_rotation = null;
  MAT_y_rotation = null;
  MAT_z_rotation = null;
  MAT_identity = null;

  // //
  // // Index
  // //

  i = null;
  j = null;
  k = null;
  i2 = null;
  j2 = null;
  k2 = null
  count = null;
  i3 = null;

  // //
  // // In the init
  // //

  rubik_half_length = null;
  end_x = null;
  start_x = null;
  end_y = null;
  start_y = null;
  end_z = null;
  start_z = null;

  // //
  // // Creating controls set
  // //

  rotation_name = null;
  mean = null;
  sticker_start = null;
  sticker_end = null;
  direction = null;
  suffix = null;

  plane1 = null;
  plane2 = null;
  plane1_ = null;
  plane2_ = null;
  axis_vector_ = null;

  // //
  // // count_fps variable
  // //

  timeMeasurements = [];
  fps = 0;
  draw_mode_value = null;

  // //
  // // loop variable
  // //

  // // cancelAnimationFrame(request_animation_frame);
  request_animation_frame = null;

  angle_x = 0;
  angle_y = 0;
  angle_z = 0;
  
  angle = 0;
  
  is_running = false;
  last_tick = null;
  current_tick = null;
  time = null;

  //----------------------------------------------------------------------

  // DO NOT CHANGE

  // control = null;

  // controller_index = null;
  // controller = null;
  // is_rotation_finish = true;
  // is_turning_randomly = false;

  // //
  // // Rotate loop
  // //

  // rotate_interval = null;
  // rad = null;
  // rad_step = null;

  //----------------------------------------------------------------------

  //
  //
  //

  gl = null;

  program = null;

  sub_vertices = null;
  faces = null;
  number_of_face = null;
  number_of_vertex_per_face = 4;
  cubie = null;
  rubik = null;
  vertices = null;
  vertice_indices = null;
  vertice_indices_length = null;

  one_minus_sticker_size = null;

  planes_x = null;
  planes_y = null;
  planes_z = null;

  TEMP_COLOR_up = null;
  TEMP_COLOR_down = null;
  TEMP_COLOR_front = null;
  TEMP_COLOR_back = null;
  TEMP_COLOR_right = null;
  TEMP_COLOR_left = null;

  plane_equation = null;

  MAT_plane_matrix = null;

  inverse = null;
  d_vector = null;
  result_vector = null;

  plane_upper_limit = null;
  plane_lower_limit = null;
}

get_input_data = () => {
  ELEM_show_fps = document.querySelector("#fps");
  ELEM_canvas = document.querySelector('#game-surface');

  ELEM_predefined_rubik = document.querySelector('#predefined-rubik');
  INP_predefined_rubik = ELEM_predefined_rubik.options[ELEM_predefined_rubik.selectedIndex].value;

  INP_rubik_size_x = +document.querySelector("#size-x").value || 2;
  INP_rubik_size_y = +document.querySelector("#size-y").value || 2;
  INP_rubik_size_z = +document.querySelector("#size-z").value || 2;
  INP_rubik_length = +document.querySelector("#length").value || 1;
  INP_sticker_gap = +document.querySelector("#sticker-gap").value || 0;
  INP_sticker_size = +document.querySelector("#sticker-size").value || 1;
  one_minus_sticker_size = (10 - (INP_sticker_size * 10)) / 10;
  
  INP_translate_x = +document.querySelector("#translate-x").value || 0;
  INP_translate_y = +document.querySelector("#translate-y").value || 0;
  INP_translate_z = +document.querySelector("#translate-z").value || 0;

  INP_axis_rotation_x = +document.querySelector("#axis-rotation-x").value || 0;
  INP_axis_rotation_y = +document.querySelector("#axis-rotation-y").value || 0;
  INP_axis_rotation_z = +document.querySelector("#axis-rotation-z").value || 0;

  INP_is_render_outer_cube = document.querySelector("#render-outer-cube").checked;
  INP_is_render_inner_cube = document.querySelector("#render-inner-cube").checked;
  INP_is_render_inner_outline_cube = document.querySelector("#render-inner-outline-cube").checked;
  INP_is_render_inner_plane = document.querySelector("#render-inner-plane").checked;

  INP_rubik_orientation_x = document.querySelector("#orientation-x").value || 0;
  INP_rubik_orientation_y = document.querySelector("#orientation-y").value || 0;
  INP_rubik_orientation_z = document.querySelector("#orientation-z").value || 0;

  INP_rotate_angle_x = +document.querySelector("#rotate-angle-x").value;
  INP_rotate_angle_y = +document.querySelector("#rotate-angle-y").value;
  INP_rotate_angle_z = +document.querySelector("#rotate-angle-z").value;
  INP_angle_per_second = +document.querySelector("#angle-per-second").value || 90;
  INP_update_angle_method = document.querySelector('input[name="update-angle-method"]:checked').value;
  INP_smooth_rotation = document.querySelector('#smooth-rotation').value || 10;
  INP_angle_rotated_ratio = document.querySelector('#angle-rotated-ratio').value || 25;

  INP_camera_position = {
    x: +document.querySelector("#camera-x").value || 0,
    y: +document.querySelector("#camera-y").value || 0,
    z: +document.querySelector("#camera-z").value || -5,
  };

  INP_camera_look_at = {
    x: +document.querySelector("#look-at-x").value || 0,
    y: +document.querySelector("#look-at-y").value || 0,
    z: +document.querySelector("#look-at-z").value || 0,
  }

  INP_up_axis = {
    x: +document.querySelector("#up-axis-x").value || 0,
    y: +document.querySelector("#up-axis-y").value || 1,
    z: +document.querySelector("#up-axis-z").value || 0,
  }

  INP_fovy = +document.querySelector("#fovy").value || toRadian(45);
  set_up_canvas_dimension();
  INP_aspect_ratio = ELEM_canvas.width / ELEM_canvas.height;
  INP_near = +document.querySelector("#near").value || 0.1;
  INP_far = +document.querySelector("#far").value || 100;

  ELEM_draw_mode = document.getElementById("draw-mode");
  INP_draw_mode_value = ELEM_draw_mode.options[ELEM_draw_mode.selectedIndex].value;
  INP_point_size = +document.querySelector("#point-size").value || 1;

  INP_COLOR_up = hex_to_normalize_rgb(document.querySelector("#top-color").value) || [1.0, 1.0, 1.0];
  INP_COLOR_down = hex_to_normalize_rgb(document.querySelector("#bottom-color").value) || [1.0, 1.0, 0.0];
  INP_COLOR_front = hex_to_normalize_rgb(document.querySelector("#front-color").value) || [0.0, 1.0, 0.0];
  INP_COLOR_back = hex_to_normalize_rgb(document.querySelector("#back-color").value) || [0.0, 0.0, 1.0];
  INP_COLOR_right = hex_to_normalize_rgb(document.querySelector("#right-color").value) || [1.0, 0.0, 0.0];
  INP_COLOR_left = hex_to_normalize_rgb(document.querySelector("#left-color").value) || [1.0, 0.5, 0.0];

  INP_COLOR_inner_up = hex_to_normalize_rgb(document.querySelector("#inner-top-color").value) || [1.0, 1.0, 1.0];
  INP_COLOR_inner_down = hex_to_normalize_rgb(document.querySelector("#inner-bottom-color").value) || [1.0, 1.0, 0.0];
  INP_COLOR_inner_front = hex_to_normalize_rgb(document.querySelector("#inner-front-color").value) || [0.0, 1.0, 0.0];
  INP_COLOR_inner_back = hex_to_normalize_rgb(document.querySelector("#inner-back-color").value) || [0.0, 0.0, 1.0];
  INP_COLOR_inner_right = hex_to_normalize_rgb(document.querySelector("#inner-right-color").value) || [1.0, 0.0, 0.0];
  INP_COLOR_inner_left = hex_to_normalize_rgb(document.querySelector("#inner-left-color").value) || [1.0, 0.5, 0.0];
  
  INP_transparent_sticker = +document.querySelector("#transparent").value / 255 || 1.0;
  INP_transparent_inner_cube = +document.querySelector("#transparent-inner-cube").value / 255 || 1.0;

  INP_shader_program_version = document.querySelector("#shader-program-version").checked;
  INP_generation_method = document.querySelector("#generation-method").checked;

  if (INP_shader_program_version) {
    INP_vertex_shader_text = document.querySelector("#vs300").innerHTML;
    INP_fragment_shader_text = document.querySelector("#fs300").innerHTML;
  } else {
    INP_vertex_shader_text = document.querySelector("#vs").innerHTML;
    INP_fragment_shader_text = document.querySelector("#fs").innerHTML;
  }
}

set_up_canvas_dimension = () => {
  if (innerWidth >= innerHeight) {
    ELEM_canvas.width  = innerHeight * 8 / 10;
    ELEM_canvas.height = innerHeight * 8 / 10;
  } else {
    ELEM_canvas.width  = innerWidth * 8 / 10;
    ELEM_canvas.height = innerWidth * 8 / 10;
  }
}

reset_canvas = () => {
  gl.viewport(0, 0, ELEM_canvas.width, ELEM_canvas.height);

  if (document.body.classList.contains("light-mode"))
    gl.clearColor(LIGHT_COLOR, LIGHT_COLOR, LIGHT_COLOR, 1.0);
  else
    gl.clearColor(DARK_COLOR, DARK_COLOR, DARK_COLOR, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}

setup_webgl_canvas = () => {
  set_up_canvas_dimension();

  gl = ELEM_canvas.getContext('webgl2') || ELEM_canvas.getContext('webgl') || ELEM_canvas.getContext('experimental-webgl');

  if (!gl) {
    alert('Your browser does not support WebGL');
    return;
  }

  reset_canvas();

  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  //
  // Create shaders
  // 
  SHADER_vertex = gl.createShader(gl.VERTEX_SHADER);
  SHADER_fragment = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(SHADER_vertex, INP_vertex_shader_text);
  gl.shaderSource(SHADER_fragment, INP_fragment_shader_text);

  gl.compileShader(SHADER_vertex);
  if (!gl.getShaderParameter(SHADER_vertex, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(SHADER_vertex));
    return;
  }

  gl.compileShader(SHADER_fragment);
  if (!gl.getShaderParameter(SHADER_fragment, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(SHADER_fragment));
    return;
  }

  program = gl.createProgram();
  gl.attachShader(program, SHADER_vertex);
  gl.attachShader(program, SHADER_fragment);

  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR linking program!', gl.getProgramInfoLog(program));
    return;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR validating program!', gl.getProgramInfoLog(program));
    return;
  }
}

init_vertex_cubie_face = () => {
  sub_vertices = [];
  cubie = new Cubie();
  cubie.absolute_position = new Position(i, j, k);
  faces = [];
}

add_vertex_from_3_intersected_planes = (i, j, k, plane) => {
  let i_center = 0;
  let j_center = 0;
  let k_center = 0;

  plane_equation = new Float32Array(9);
  plane_equation[0] = planes_x[i].a;
  plane_equation[3] = planes_x[i].b;
  plane_equation[6] = planes_x[i].c;

  plane_equation[1] = planes_y[j].a;
  plane_equation[4] = planes_y[j].b;
  plane_equation[7] = planes_y[j].c;

  plane_equation[2] = planes_z[k].a;
  plane_equation[5] = planes_z[k].b;
  plane_equation[8] = planes_z[k].c;

  inverse = new Float32Array(9);
  invert(inverse, plane_equation);

  d_vector = new Float32Array(3);
  d_vector[0] = -planes_x[i].d;
  d_vector[1] = -planes_y[j].d;
  d_vector[2] = -planes_z[k].d;
  
  result_vector = new Float32Array(3);

  transformMat3(result_vector, d_vector, inverse);

  for (i3 = 0; i3 < rubik.controls.length; i3++) {
    if ( rubik.controls[i3].check_if_control_this_vertex(new Position(
      result_vector[0],
      result_vector[1],
      result_vector[2]
    ))) {
      if (
        rubik.controls[i3].axis.x != 0 && 
        rubik.controls[i3].axis.y == 0 && 
        rubik.controls[i3].axis.z == 0 
      )
        i_center = rubik.controls[i3].index;
        if (
          rubik.controls[i3].axis.x == 0 && 
          rubik.controls[i3].axis.y != 0 && 
          rubik.controls[i3].axis.z == 0 
        )
          j_center = rubik.controls[i3].index;
          if (
            rubik.controls[i3].axis.x == 0 && 
            rubik.controls[i3].axis.y == 0 && 
            rubik.controls[i3].axis.z != 0 
          ) 
            k_center = rubik.controls[i3].index;
    }
  }

  sub_vertices.push(
    new Vertex(
      new Position(
        result_vector[0],
        result_vector[1],
        result_vector[2]
      ),
      plane.color, 
      plane.color_name + `_x_${i_center}_y_${j_center}_z_${k_center}`, 
      new Position(i_center, j_center, k_center)
    ), 
  );
}

create_sticker_planes = () => {
  init_vertex_cubie_face();

  planes_x = [];
  planes_y = [];
  planes_z = [];
    
  for (i = start_x; i <= end_x; i += 1)
    for (i2 = -1; i2 < 2; i2 += 2) {
      //
      // Add sticker start
      //
      if (i == start_x && i2 == -1) 
        planes_x.push(
          new Plane(
            MAT_plane_matrix[0],
            MAT_plane_matrix[1],
            MAT_plane_matrix[2],
            -(i + rubik_half_length * i2 - INP_sticker_gap + INP_translate_x),
            new Color(
              INP_COLOR_right[0],
              INP_COLOR_right[1],
              INP_COLOR_right[2],
            ), `right`, i
          )
        );

      //
      // Add planes that pass through 2 opposite stickers
      //

      //
      // If the current plane is the outer plane
      //
      if ((i == start_x && i2 == -1) || (i == end_x && i2 == 1))
        if (i2 == -1)
          planes_x.push(
            new Plane(
              MAT_plane_matrix[0],
              MAT_plane_matrix[1],
              MAT_plane_matrix[2],
              -(i + rubik_half_length * i2 + one_minus_sticker_size + INP_translate_x),
              new Color(
                INP_COLOR_inner_right[0],
                INP_COLOR_inner_right[1],
                INP_COLOR_inner_right[2],
              ), `inner_right`, i
            )
          );
        else
          planes_x.push(
            new Plane(
              MAT_plane_matrix[0],
              MAT_plane_matrix[1],
              MAT_plane_matrix[2],
              -(i + rubik_half_length * i2 - one_minus_sticker_size + INP_translate_x),
              new Color(
                INP_COLOR_inner_left[0],
                INP_COLOR_inner_left[1],
                INP_COLOR_inner_left[2],
              ), `inner_left`, i
            )
          );
      else
        if (i2 == -1)
          planes_x.push(
            new Plane(
              1, 0, 0,
              -(i + rubik_half_length * i2 + one_minus_sticker_size),
              new Color(
                INP_COLOR_inner_right[0],
                INP_COLOR_inner_right[1],
                INP_COLOR_inner_right[2],
              ), `inner_right`, i
            )
          );
        else
          planes_x.push(
            new Plane(
              1, 0, 0,
              -(i + rubik_half_length * i2 - one_minus_sticker_size),
              new Color(
                INP_COLOR_inner_left[0],
                INP_COLOR_inner_left[1],
                INP_COLOR_inner_left[2],
              ), `inner_left`, i
            )
          );
            
      //
      // Add sticker end
      //
      if (i == end_x && i2 == 1) 
        planes_x.push(
          new Plane(
            MAT_plane_matrix[0],
            MAT_plane_matrix[1],
            MAT_plane_matrix[2],
            -(i + rubik_half_length * i2 + INP_sticker_gap + INP_translate_x),
            new Color(
              INP_COLOR_left[0],
              INP_COLOR_left[1],
              INP_COLOR_left[2],
            ), `left`, i
          )
        );
    }

  for (j = start_y; j <= end_y; j += 1)
    for (j2 = -1; j2 < 2; j2 += 2) {
      //
      // Add sticker start
      //
      if (j == start_y && j2 == -1) 
        planes_y.push(
          new Plane(
            MAT_plane_matrix[3],
            MAT_plane_matrix[4],
            MAT_plane_matrix[5],
            -(j + rubik_half_length * j2 - INP_sticker_gap + INP_translate_y),
            new Color(
              INP_COLOR_down[0],
              INP_COLOR_down[1],
              INP_COLOR_down[2],
            ), `down`, j
          )
        );
            
      //
      // Add planes that pass through 2 opposite stickers
      //

      //
      // If the current plane is the outer plane
      //
      if ((j == start_y && j2 == -1) || (j == end_y && j2 == 1))
        if (j2 == -1)
          planes_y.push(
            new Plane(
              MAT_plane_matrix[3],
              MAT_plane_matrix[4],
              MAT_plane_matrix[5],
              -(j + rubik_half_length * j2 + one_minus_sticker_size + INP_translate_y),
              new Color(
                INP_COLOR_inner_down[0],
                INP_COLOR_inner_down[1],
                INP_COLOR_inner_down[2],
              ), `inner_down`, j
            )
          );
        else
          planes_y.push(
            new Plane(
              MAT_plane_matrix[3],
              MAT_plane_matrix[4],
              MAT_plane_matrix[5],
              -(j + rubik_half_length * j2 - one_minus_sticker_size + INP_translate_y),
              new Color(
                INP_COLOR_inner_up[0],
                INP_COLOR_inner_up[1],
                INP_COLOR_inner_up[2],
              ), `inner_up`, j
            )
          );
      else
        if (j2 == -1)
          planes_y.push(
            new Plane(
              0, 1, 0,
              -(j + rubik_half_length * j2 + one_minus_sticker_size),
              new Color(
                INP_COLOR_inner_down[0],
                INP_COLOR_inner_down[1],
                INP_COLOR_inner_down[2],
              ), `inner_down`, j
            )
          );
        else
          planes_y.push(
            new Plane(
              0, 1, 0,
              -(j + rubik_half_length * j2 - one_minus_sticker_size),
              new Color(
                INP_COLOR_inner_up[0],
                INP_COLOR_inner_up[1],
                INP_COLOR_inner_up[2],
              ), `inner_up`, j
            )
          );

      //
      // Add sticker end
      //
      if (j == end_y && j2 == 1) 
        planes_y.push(
          new Plane(
            MAT_plane_matrix[3],
            MAT_plane_matrix[4],
            MAT_plane_matrix[5],
            -(j + rubik_half_length * j2 + INP_sticker_gap + INP_translate_y),
            new Color(
              INP_COLOR_up[0],
              INP_COLOR_up[1],
              INP_COLOR_up[2],
            ), `up`, j
          )
        );
    }

  for (k = start_z; k <= end_z; k += 1)
    for (k2 = -1; k2 < 2; k2 += 2) {
      //
      // Add sticker start
      //
      if (k == start_z && k2 == -1) 
        planes_z.push(
          new Plane(
            MAT_plane_matrix[6],
            MAT_plane_matrix[7],
            MAT_plane_matrix[8],
            -(k + rubik_half_length * k2 - INP_sticker_gap + INP_translate_z),
            new Color(
              INP_COLOR_front[0],
              INP_COLOR_front[1],
              INP_COLOR_front[2],
            ), `front`, k
          )
        );
            
      //
      // Add planes that pass through 2 opposite stickers
      //
      if ((k == start_z && k2 == -1) || (k == end_z && k2 == 1))
        if (k2 == -1)
          planes_z.push(
            new Plane(
              MAT_plane_matrix[6],
              MAT_plane_matrix[7],
              MAT_plane_matrix[8],
              -(k + rubik_half_length * k2 + one_minus_sticker_size + INP_translate_z),
              new Color(
                INP_COLOR_inner_front[0],
                INP_COLOR_inner_front[1],
                INP_COLOR_inner_front[2],
              ), `inner_front`, k
            )
          );
        else
          planes_z.push(
            new Plane(
              MAT_plane_matrix[6],
              MAT_plane_matrix[7],
              MAT_plane_matrix[8],
              -(k + rubik_half_length * k2 - one_minus_sticker_size + INP_translate_z),
              new Color(
                INP_COLOR_inner_back[0],
                INP_COLOR_inner_back[1],
                INP_COLOR_inner_back[2],
              ), `inner_back`, k
            )
          );
      else
        if (k2 == -1)
          planes_z.push(
            new Plane(
              0, 0, 1,
              -(k + rubik_half_length * k2 + one_minus_sticker_size),
              new Color(
                INP_COLOR_inner_front[0],
                INP_COLOR_inner_front[1],
                INP_COLOR_inner_front[2],
              ), `inner_front`, k
            )
          );
        else
          planes_z.push(
            new Plane(
              0, 0, 1,
              -(k + rubik_half_length * k2 - one_minus_sticker_size),
              new Color(
                INP_COLOR_inner_back[0],
                INP_COLOR_inner_back[1],
                INP_COLOR_inner_back[2],
              ), `inner_back`, k
            )
          );
            
      //
      // Add sticker end
      //
      if (k == end_z && k2 == 1) 
        planes_z.push(
          new Plane(
            MAT_plane_matrix[6],
            MAT_plane_matrix[7],
            MAT_plane_matrix[8],
            -(k + rubik_half_length * k2 + INP_sticker_gap + INP_translate_z),
            new Color(
              INP_COLOR_back[0],
              INP_COLOR_back[1],
              INP_COLOR_back[2],
            ), `back`, k
          )
        );
    }
    
  for (i = 0; i < planes_x.length; i += 1) 
    for (j = 0; j < planes_y.length; j += 1) {
      for (k = 0; k < planes_z.length; k += 1) {
        //
        // Check if 3 planes intersect a sticker vertex
        //
        if (
          (i == 0 || i == planes_x.length - 1) &&
          (j != 0 && j != planes_y.length - 1) &&
          (k != 0 && k != planes_z.length - 1) 
        )
          add_vertex_from_3_intersected_planes(i, j, k, planes_x[i]);

        if (
          (i != 0 && i != planes_x.length - 1) &&
          (j == 0 || j == planes_y.length - 1) &&
          (k != 0 && k != planes_z.length - 1) 
        )
          add_vertex_from_3_intersected_planes(i, j, k, planes_y[j]);

        if (
          (i != 0 && i != planes_x.length - 1) &&
          (j != 0 && j != planes_y.length - 1) &&
          (k == 0 || k == planes_z.length - 1) 
        )
          add_vertex_from_3_intersected_planes(i, j, k, planes_z[k]);
    }
  }

  sub_vertices.sort((a, b) => a.color_name.localeCompare(b.color_name));

  number_of_face = sub_vertices.length / number_of_vertex_per_face;

  for (i3 = 0; i3 < number_of_face; i3++) {
    faces[i3] = new Face();
    faces[i3].color = sub_vertices[number_of_vertex_per_face * i3].color_name;
    faces[i3].absolute_position = sub_vertices[number_of_vertex_per_face * i3].absolute_position;

    for (j3 = 0; j3 < number_of_vertex_per_face; j3 += 1) 
      faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + j3]);
  }

  for (i = start_x; i <= end_x; i += 1) {
    for (j = start_y; j <= end_y; j += 1) {
      for (k = start_z; k <= end_z; k += 1) {
        cubie = new Cubie();
        cubie.absolute_position = new Position(i, j, k);            

        for (i3 = 0; i3 < number_of_face; i3 += 1) {
          if (
            JSON.stringify(faces[i3].absolute_position) === 
            JSON.stringify(cubie.absolute_position)
          ) {
            cubie.add_face(faces[i3]);
                    
            vertice_indices.push(
              count + 0,
              count + 1,
              count + 2,

              count + 0,
              count + 2,
              count + 1,

              count + 3,
              count + 1,
              count + 2,

              count + 3,
              count + 2,
              count + 1,
            );

            count += number_of_vertex_per_face;
          }
        }

        rubik.add_cubie(cubie);
      }
    }
  }

  planes_x = null;
  planes_y = null;
  planes_z = null;
}

create_inner_cube_planes = () => {
  init_vertex_cubie_face();

  planes_x = [];
  planes_y = [];
  planes_z = [];

  for (i = start_x; i <= end_x; i += 1)
    for (i2 = -1; i2 < 2; i2 += 2) {
      if ((i == start_x && i2 == -1) || (i == end_x && i2 == 1))
                if (i2 == -1)
                    planes_x.push(
                        new Plane(
                            MAT_plane_matrix[0],
                            MAT_plane_matrix[1],
                            MAT_plane_matrix[2],
                            -(i + rubik_half_length * i2 + one_minus_sticker_size + INP_translate_x),
                            new Color(
                                INP_COLOR_inner_right[0],
                                INP_COLOR_inner_right[1],
                                INP_COLOR_inner_right[2],
                            ), `inner_cubie_right`, i
                        )
                    );
                else
                    planes_x.push(
                        new Plane(
                            MAT_plane_matrix[0],
                            MAT_plane_matrix[1],
                            MAT_plane_matrix[2],
                            -(i + rubik_half_length * i2 - one_minus_sticker_size + INP_translate_x),
                            new Color(
                                INP_COLOR_inner_left[0],
                                INP_COLOR_inner_left[1],
                                INP_COLOR_inner_left[2],
                            ), `inner_cubie_left`, i
                        )
                    );
            else
                if (i2 == -1)
                    planes_x.push(
                        new Plane(
                            1, 0, 0, -(i + rubik_half_length * i2),
                            new Color(
                                INP_COLOR_inner_right[0],
                                INP_COLOR_inner_right[1],
                                INP_COLOR_inner_right[2],
                            ), `inner_cubie_right`, i
                        )
                    );
                else
                    planes_x.push(
                        new Plane(
                            1, 0, 0,
                            -(i + rubik_half_length * i2),
                            new Color(
                                INP_COLOR_inner_left[0],
                                INP_COLOR_inner_left[1],
                                INP_COLOR_inner_left[2],
                            ), `inner_cubie_left`, i
                        )
                    );
        }

    for (j = start_y; j <= end_y; j += 1)
        for (j2 = -1; j2 < 2; j2 += 2) {
            if ((j == start_y && j2 == -1) || (j == end_y && j2 == 1))
                if (j2 == -1) 
                    planes_y.push(
                        new Plane(
                            MAT_plane_matrix[3],
                            MAT_plane_matrix[4],
                            MAT_plane_matrix[5],
                            -(j + rubik_half_length * j2 + one_minus_sticker_size + INP_translate_y),
                            new Color(
                                INP_COLOR_inner_down[0],
                                INP_COLOR_inner_down[1],
                                INP_COLOR_inner_down[2],
                            ), `inner_cubie_down`, j
                        ) 
                    );
                else 
                    planes_y.push(
                        new Plane(
                            MAT_plane_matrix[3],
                            MAT_plane_matrix[4],
                            MAT_plane_matrix[5],
                            -(j + rubik_half_length * j2 - one_minus_sticker_size + INP_translate_y),
                            new Color(
                                INP_COLOR_inner_up[0],
                                INP_COLOR_inner_up[1],
                                INP_COLOR_inner_up[2],
                            ), `inner_cubie_up`, j
                        )
                    );
            else
                if (j2 == -1) 
                    planes_y.push(
                        new Plane(
                            0, 1, 0,
                            -(j + rubik_half_length * j2),
                            new Color(
                                INP_COLOR_inner_down[0],
                                INP_COLOR_inner_down[1],
                                INP_COLOR_inner_down[2],
                            ), `inner_cubie_down`, j
                        ) 
                    );
                else 
                    planes_y.push(
                        new Plane(
                            0, 1, 0,
                            -(j + rubik_half_length * j2),
                            new Color(
                                INP_COLOR_inner_up[0],
                                INP_COLOR_inner_up[1],
                                INP_COLOR_inner_up[2],
                            ), `inner_cubie_up`, j
                        )
                    );
        }

    for (k = start_z; k <= end_z; k += 1)
        for (k2 = -1; k2 < 2; k2 += 2) {
            if ((k == start_z && k2 == -1) || (k == end_z && k2 == 1))
                if (k2 == -1) 
                    planes_z.push(
                        new Plane(
                            MAT_plane_matrix[6],
                            MAT_plane_matrix[7],
                            MAT_plane_matrix[8],
                            -(k + rubik_half_length * k2 + one_minus_sticker_size + INP_translate_z),
                            new Color(
                                INP_COLOR_inner_front[0],
                                INP_COLOR_inner_front[1],
                                INP_COLOR_inner_front[2],
                            ), `inner_cubie_front`, k
                        )
                    );
                else 
                    planes_z.push(
                        new Plane(
                            MAT_plane_matrix[6],
                            MAT_plane_matrix[7],
                            MAT_plane_matrix[8],
                            -(k + rubik_half_length * k2 - one_minus_sticker_size + INP_translate_z),
                            new Color(
                                INP_COLOR_inner_back[0],
                                INP_COLOR_inner_back[1],
                                INP_COLOR_inner_back[2],
                            ), `inner_cubie_back`, k
                        )
                    );
            else
                if (k2 == -1) 
                    planes_z.push(
                        new Plane(
                            0, 0, 1,
                            -(k + rubik_half_length * k2),
                            new Color(
                                INP_COLOR_inner_front[0],
                                INP_COLOR_inner_front[1],
                                INP_COLOR_inner_front[2],
                            ), `inner_cubie_front`, k
                        )
                    );
                else 
                    planes_z.push(
                        new Plane(
                            0, 0, 1,
                            -(k + rubik_half_length * k2),
                            new Color(
                                INP_COLOR_inner_back[0],
                                INP_COLOR_inner_back[1],
                                INP_COLOR_inner_back[2],
                            ), `inner_cubie_back`, k
                        )
                    );
        }
    
    for (i = 0; i < planes_x.length; i += 1) 
        for (j = 0; j < planes_y.length; j += 1) {
            for (k = 0; k < planes_z.length; k += 1) {
                add_vertex_from_3_intersected_planes(i, j, k, planes_x[i]);
                add_vertex_from_3_intersected_planes(i, j, k, planes_y[j]);
                add_vertex_from_3_intersected_planes(i, j, k, planes_z[k]);
            }
        }

    sub_vertices.sort((a, b) => a.color_name.localeCompare(b.color_name));

    number_of_face = sub_vertices.length / number_of_vertex_per_face;

    for (i3 = 0; i3 < number_of_face; i3++) {
        faces[i3] = new Face();
        faces[i3].color = sub_vertices[number_of_vertex_per_face * i3].color_name;
        faces[i3].absolute_position = sub_vertices[number_of_vertex_per_face * i3].absolute_position;

        for (j3 = 0; j3 < number_of_vertex_per_face; j3 += 1) 
          faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + j3]);
    }

    for (i = start_x; i <= end_x; i += 1) {
        for (j = start_y; j <= end_y; j += 1) {
            for (k = start_z; k <= end_z; k += 1) {
                cubie = new Cubie();
                cubie.absolute_position = new Position(i, j, k);            

                for (i3 = 0; i3 < number_of_face; i3 += 1) {
                    

                    if (
                      JSON.stringify(faces[i3].absolute_position) === 
                      JSON.stringify(cubie.absolute_position)
                    ) {
                      cubie.add_face(faces[i3]);

                      vertice_indices.push(
                          count + 0,
                          count + 1,
                          count + 2,

                          count + 0,
                          count + 2,
                          count + 1,

                          count + 3,
                          count + 1,
                          count + 2,

                          count + 3,
                          count + 2,
                          count + 1,
                      );

                      count += number_of_vertex_per_face;
                    }
                }

                rubik.add_cubie(cubie);
            }
        }
    }

    planes_x = null;
    planes_y = null;
    planes_z = null;
}

create_vertex_base_on_planes = () => {
  quat = new Float32Array(4);
  fromEuler(quat, INP_axis_rotation_x, INP_axis_rotation_y, INP_axis_rotation_z);

  inverted_quat = new Float32Array(4);
  invert_quat(inverted_quat, quat);

  x_axis_vector = new Float32Array(4);
  x_axis_vector[0] = 1;
  x_axis_vector[1] = 0;
  x_axis_vector[2] = 0;
  x_axis_vector[3] = 1;

  y_axis_vector = new Float32Array(4);
  y_axis_vector[0] = 0;
  y_axis_vector[1] = 1;
  y_axis_vector[2] = 0;
  y_axis_vector[3] = 1;

  z_axis_vector = new Float32Array(4);
  z_axis_vector[0] = 0;
  z_axis_vector[1] = 0;
  z_axis_vector[2] = 1;
  z_axis_vector[3] = 1;

  rotated_x_axis_vector = new Float32Array(4);
  rotated_y_axis_vector = new Float32Array(4);
  rotated_z_axis_vector = new Float32Array(4);

  multiply_quat(rotated_x_axis_vector, quat, x_axis_vector);
  
  multiply_quat(rotated_x_axis_vector, rotated_x_axis_vector, inverted_quat);
  
  multiply_quat(rotated_y_axis_vector, quat, y_axis_vector);
  multiply_quat(rotated_y_axis_vector, rotated_y_axis_vector, inverted_quat);
  
  multiply_quat(rotated_z_axis_vector, quat, z_axis_vector);
  multiply_quat(rotated_z_axis_vector, rotated_z_axis_vector, inverted_quat);

  MAT_plane_matrix = new Float32Array(9);
  MAT_plane_matrix[0] = round_to( rotated_x_axis_vector[0] );
  MAT_plane_matrix[1] = round_to( rotated_x_axis_vector[1] );
  MAT_plane_matrix[2] = round_to( rotated_x_axis_vector[2] );
  MAT_plane_matrix[3] = round_to( rotated_y_axis_vector[0] );
  MAT_plane_matrix[4] = round_to( rotated_y_axis_vector[1] );
  MAT_plane_matrix[5] = round_to( rotated_y_axis_vector[2] );
  MAT_plane_matrix[6] = round_to( rotated_z_axis_vector[0] );
  MAT_plane_matrix[7] = round_to( rotated_z_axis_vector[1] );
  MAT_plane_matrix[8] = round_to( rotated_z_axis_vector[2] );

  if (INP_is_render_outer_cube)
    create_sticker_planes();

  if (INP_is_render_inner_cube)
    create_inner_cube_planes();
}

init_rubik_parameter = () => {
  rubik = new Rubik();
  rubik_half_length = INP_rubik_length / 2
  end_x = (INP_rubik_size_x - 1) / 2;
  start_x = -end_x;
  end_y = (INP_rubik_size_y - 1) / 2;
  start_y = -end_y;
  end_z = (INP_rubik_size_z - 1) / 2;
  start_z = -end_z;
  
  rubik.sticker_gap = INP_sticker_gap;

  vertices = [];
  vertice_indices = [];
  count = 0;
}

create_rubik_control = (start = 0, end = 0, size = [0, 0, 0], directions = [0, 0, 0], rotation_names = ["", "", ""], axis = "x", distance = DELTA, have_all_cubies = false) => {    
  // Remove redundant controller
  if (start == end && have_all_cubies == false)
    return;
    
  for (i = start; i <= end; i += 1) {
    mean = (start + end) / 2;
    sticker_start = 0;
    sticker_end = 0;
    suffix = (size[0] - Math.abs(i * 2) - 1) / 2 + 1;

    // Cover extended sticker position when current layer position is outside
    if (i == start && i != end)
      sticker_start = MAX_DISTANCE;
    else if (i != start && i == end)
      sticker_end = MAX_DISTANCE;
    // If current layer is the start and end layer (size = 1)
    else if (i == start && i == end) {
      sticker_start = MAX_DISTANCE;
      sticker_end = MAX_DISTANCE;
    }

    plane1 = new Plane();
    plane2 = new Plane();

    plane_upper_limit = i - distance - sticker_start;
    plane_lower_limit = i + distance + sticker_end;

    // Create planes from that 3 points
    switch (axis) {
            case "x":
                plane1 = create_plane_from_3_points(
                    new Position(plane_upper_limit, ZERO, ZERO), 
                    new Position(plane_upper_limit, ZERO, ONE ), 
                    new Position(plane_upper_limit, ONE,  ONE ), 
                );
                plane2 = create_plane_from_3_points(
                    new Position(plane_lower_limit, ZERO, ZERO), 
                    new Position(plane_lower_limit, ZERO, ONE ), 
                    new Position(plane_lower_limit, ONE,  ONE ), 
                );
                break;
            case "y":
                plane1 = create_plane_from_3_points(
                    new Position(ZERO, plane_upper_limit, ZERO), 
                    new Position(ZERO, plane_upper_limit, ONE ), 
                    new Position(ONE,  plane_upper_limit, ONE ), 
                );
                plane2 = create_plane_from_3_points(
                    new Position(ZERO, plane_lower_limit, ZERO), 
                    new Position(ZERO, plane_lower_limit, ONE ), 
                    new Position(ONE,  plane_lower_limit, ONE ), 
                );
                break;
            case "z":
                plane1 = create_plane_from_3_points(
                    new Position(ZERO, ZERO, plane_upper_limit), 
                    new Position(ZERO, ONE , plane_upper_limit), 
                    new Position(ONE,  ONE , plane_upper_limit), 
                );
                plane2 = create_plane_from_3_points(
                    new Position(ZERO, ZERO, plane_lower_limit), 
                    new Position(ZERO, ONE , plane_lower_limit), 
                    new Position(ONE,  ONE , plane_lower_limit), 
                );
                break;
            default:
                return;
        }

        // Set up those 3 points that define a plane

        // If the choosen layer is at the outside or the middle of the cube, suffix wont appear
        if (suffix == size[0] || suffix == 0 || suffix == 1 || i == mean)
            suffix = "";

        // Set rotation direction and name
        if (i < mean) {
            rotation_name = rotation_names[0];
            direction = directions[0];
        }
        else if (i > mean) {
            rotation_name = rotation_names[1];
            direction = directions[1];
        }
        else {
            rotation_name = rotation_names[2];
            direction = directions[2];
        }
        
        // If the other axis had equal number of cubies, then it can had quarter rotation
        if (size[1] == size[2]) {
            rubik.add_control(
                new Control(
                    suffix + rotation_name,
                    new Position(plane1.a, plane1.b, plane1.c),
                    QUARTER_OF_CIRCLE * direction,
                    plane1.d, plane2.d, i
                )
            );
            rubik.add_control(
                new Control(
                    suffix + rotation_name + ROTATE_QUARTER_OF_CIRCLE_REVERSE_SYMBOL,
                    new Position(plane1.a, plane1.b, plane1.c),
                    -QUARTER_OF_CIRCLE * direction,
                    plane1.d, plane2.d, i
                )
            );
        }

        rubik.add_control(
            new Control(
                suffix + rotation_name + "2",
                new Position(plane1.a, plane1.b, plane1.c),
                HALF_OF_CIRCLE * direction,
                plane1.d, plane2.d, i
            )
        );
    }
}

create_rubik_movement_control_set = () => {
  create_rubik_control(start_x, end_x, [INP_rubik_size_x, INP_rubik_size_y, INP_rubik_size_z], [ 1, -1, -1], ["R", "L", "M"], "x");
  create_rubik_control(start_y, end_y, [INP_rubik_size_y, INP_rubik_size_x, INP_rubik_size_z], [-1,  1, -1], ["D", "U", "E"], "y");
  create_rubik_control(start_z, end_z, [INP_rubik_size_z, INP_rubik_size_x, INP_rubik_size_y], [ 1, -1,  1], ["F", "B", "S"], "z");
}

create_rubik_rotation_control_set = () => {
  create_rubik_control(0, 0, [INP_rubik_size_x, INP_rubik_size_y, INP_rubik_size_z], [null, null, 1], [null, null, "x"], "x", INP_rubik_size_x / 2, true);
  create_rubik_control(0, 0, [INP_rubik_size_y, INP_rubik_size_x, INP_rubik_size_z], [null, null, 1], [null, null, "y"], "y", INP_rubik_size_y / 2, true);
  create_rubik_control(0, 0, [INP_rubik_size_z, INP_rubik_size_x, INP_rubik_size_y], [null, null, 1], [null, null, "z"], "z", INP_rubik_size_z / 2, true);
}

create_vertices = () => {
  if (INP_generation_method)
    create_vertex_base_on_rendering();
  else
    create_vertex_base_on_planes();

  vertices = [].concat(...rubik.cubies.map(cubie => cubie.to_string()));

  // Remove abundant attributes
  
  // rubik.cubies.map(
  //   cubie => {
  //     cubie.faces.map(face => {
  //       face.color = undefined;
  //       delete (face.color);

  //       face.absolute_position = undefined;
  //       delete (face.absolute_position);

  //       face.vertices.map(vertex => {
  //         vertex.absolute_position = undefined;
  //         delete (vertex.absolute_position);

  //         vertex.color_name = undefined;
  //         delete (vertex.color_name);
  //       })
  //     });
  //   }
  // );

  rubik.cubies = rubik.cubies.filter(cubie => cubie.faces.length != 0);

  vertice_indices_length = vertice_indices.length;
}

add_control_set_to_html = () => {
  document.querySelector("#movement-controller").replaceChildren();

  for (i = 0; i < rubik.controls.length; i++) {
    ELEM_rotate_button = document.createElement("button");
    ELEM_rotate_button.id = `rotate-${rubik.controls[i].name}`;
    ELEM_rotate_button.innerHTML = rubik.controls[i].name;
    document.querySelector("#movement-controller").appendChild(ELEM_rotate_button);

    ELEM_rotate_button.setAttribute('onclick', `loop_rotate_face_till_90_deg(this)`);
  }
}

add_buffer_data = () => {
  SHADER_BUFFER_vectex = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, SHADER_BUFFER_vectex);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  SHADER_BUFFER_vectex_index = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SHADER_BUFFER_vectex_index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertice_indices), gl.STATIC_DRAW);

  vertice_indices = null;

  ATTR_LOC_position = gl.getAttribLocation(program, 'vertPosition');
  ATTR_LOC_color = gl.getAttribLocation(program, 'vertColor');

  gl.enableVertexAttribArray(ATTR_LOC_position);
  gl.enableVertexAttribArray(ATTR_LOC_color);

  gl.vertexAttribPointer(
    ATTR_LOC_position, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
  );
  gl.vertexAttribPointer(
    ATTR_LOC_color, // Attribute location
    4, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
  );

  // gl.disableVertexAttribArray(ATTR_LOC_position);
  // gl.disableVertexAttribArray(ATTR_LOC_color);

  // Tell OpenGL state machine which program should be active.
  gl.useProgram(program);

  gl.deleteProgram(program);
};

get_uniforms_in_shader = () => {
  UNI_LOC_point_size = gl.getUniformLocation(program, 'pointSize');
  UNI_LOC_mat_world = gl.getUniformLocation(program, 'mWorld');
  UNI_LOC_mat_view = gl.getUniformLocation(program, 'mView');
  UNI_LOC_mat_projection = gl.getUniformLocation(program, 'mProj');

  UNI_LOC_axis_vector = gl.getUniformLocation(program, 'axis_vec');
  UNI_LOC_rad = gl.getUniformLocation(program, 'rad');

  UNI_LOC_plane1 = gl.getUniformLocation(program, 'plane1');
  UNI_LOC_plane2 = gl.getUniformLocation(program, 'plane2');
}

set_up_support_matrix = () => {
  MAT_x_rotation = new Float32Array(16);
  MAT_y_rotation = new Float32Array(16);
  MAT_z_rotation = new Float32Array(16);
  MAT_identity = new Float32Array(16);

  identity(MAT_x_rotation);
  identity(MAT_y_rotation);
  identity(MAT_z_rotation);
  identity(MAT_identity);

  MAT_world = new Float32Array(16);
  MAT_view = new Float32Array(16);
  MAT_projection = new Float32Array(16);

  INP_rubik_orientation_matrix_x = new Float32Array(16);
  INP_rubik_orientation_matrix_y = new Float32Array(16);
  INP_rubik_orientation_matrix_z = new Float32Array(16);

  rotate(INP_rubik_orientation_matrix_x, MAT_identity, INP_rubik_orientation_x, [1, 0, 0]);
  rotate(INP_rubik_orientation_matrix_y, MAT_identity, INP_rubik_orientation_y, [0, 1, 0]);
  rotate(INP_rubik_orientation_matrix_z, MAT_identity, INP_rubik_orientation_z, [0, 0, 1]);

  identity(MAT_world);

  multiply(MAT_world, INP_rubik_orientation_matrix_x, INP_rubik_orientation_matrix_y);
  multiply(MAT_world, MAT_world, INP_rubik_orientation_matrix_z);

  lookAt(MAT_view, [
    INP_camera_position.x,
    INP_camera_position.y,
    INP_camera_position.z,
  ], [
    INP_camera_look_at.x,
    INP_camera_look_at.y,
    INP_camera_look_at.z,
  ], [
    INP_up_axis.x,
    INP_up_axis.y,
    INP_up_axis.z,
  ]);
  perspective(
    MAT_projection,
    toRadian(INP_fovy),
    INP_aspect_ratio,
    INP_near,
    INP_far
  );
}

add_uniforms_to_shader = () => {
  gl.uniformMatrix4fv(UNI_LOC_mat_world, gl.FALSE, MAT_world);
  gl.uniformMatrix4fv(UNI_LOC_mat_view, gl.FALSE, MAT_view);
  gl.uniformMatrix4fv(UNI_LOC_mat_projection, gl.FALSE, MAT_projection);
  gl.uniform1f(UNI_LOC_point_size, INP_point_size);
}

draw = () => {
  reset_canvas();

  switch (INP_draw_mode_value) {
    case "points":
      draw_mode_value = gl.POINTS;
      break;
    case "lines":
      draw_mode_value = gl.LINES;
      break;
    case "line_loop":
      draw_mode_value = gl.LINE_LOOP;
      break;
    case "line_strip":
      draw_mode_value = gl.LINE_STRIP;
      break;
    case "triangle_strip":
      draw_mode_value = gl.TRIANGLE_STRIP;
      break;
    case "triangle_fan":
      draw_mode_value = gl.TRIANGLE_FAN;
      break;
    case "triangles": default:
      draw_mode_value = gl.TRIANGLES;
  }

  gl.drawElements(draw_mode_value, vertice_indices_length, gl.UNSIGNED_SHORT, 0);
}

update_angle = (angle) => {
  current_tick = performance.now();
  time = (current_tick - last_tick) / MILLISECOND_PER_SECOND;
  last_tick = current_tick;
  return (angle + INP_angle_per_second * time) % FULL_OF_CIRCLE;
}

orbit_around_rubik = () => {
  if (INP_update_angle_method == "method1")
    angle = performance.now() / MILLISECOND_PER_SECOND / 6;
  else if (INP_update_angle_method == "method2")
    angle = update_angle(angle);

  angle_x = angle * INP_rotate_angle_x % FULL_OF_CIRCLE;
  angle_y = angle * INP_rotate_angle_y % FULL_OF_CIRCLE;
  angle_z = angle * INP_rotate_angle_z % FULL_OF_CIRCLE;

  rotate(MAT_x_rotation, MAT_identity, angle_x, [1, 0, 0]);
  rotate(MAT_y_rotation, MAT_identity, angle_y, [0, 1, 0]);
  rotate(MAT_z_rotation, MAT_identity, angle_z, [0, 0, 1]);

  multiply(MAT_world, MAT_x_rotation, MAT_y_rotation);
  multiply(MAT_world, MAT_world, MAT_z_rotation);

  multiply(MAT_world, INP_rubik_orientation_matrix_x, INP_rubik_orientation_matrix_y);
  multiply(MAT_world, MAT_world, INP_rubik_orientation_matrix_z);

  gl.uniformMatrix4fv(UNI_LOC_mat_world, gl.FALSE, MAT_world);
}

loop_rotate_face_till_90_deg = e => {
    DEBUG_text = "";

    disable_rotate_function();
    
    control = null;

    // Get rotation that corresponding to the button name from the list
    for (i = 0; i < rubik.controls.length; i++) 
        if (rubik.controls[i].name == e.id.replace("rotate-", "")) {
            control = rubik.controls[i];
            break;
        }
    
    // Set the finish flag
    is_rotation_finish = false;

    rad = 0;

    // Set the radian step each frame
    rad_step = control.rad / INP_angle_rotated_ratio;

    // Main rotation loop
    rotate_interval = setInterval(() => {
        // Add the angle to rotate each time
        rad += rad_step;
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Set the uniform in the shader to perform a rotation
        rotate_face(
            control.axis, rad, 
            new Plane(
                control.axis.x, 
                control.axis.y, 
                control.axis.z, 
                control.upper_limit
            ), 
            new Plane(
                control.axis.x, 
                control.axis.y, 
                control.axis.z, 
                control.lower_limit
            ), 
        );
        
        // If it had rotated to the pre-determinated arc
        if (Math.abs(rad - control.rad) < EPSILON) {
            DEBUG_start_time = performance.now()

            // Rotate the coressponding face in the rubik object
            rubik.rotate_face(
                control.axis,
                rad,
                control.upper_limit,
                control.lower_limit
            );

            // console.log(performance.now() - DEBUG_start_time);
            
            // Re-init the buffer data
            vertices = [].concat(...rubik.cubies.map(cubie => cubie.to_string()));

            // Set the rotation flag
            is_rotation_finish = true;

            enable_rotate_function();

            clearInterval(rotate_interval);

        }
    }, INP_smooth_rotation);
}

rotate_face = (axis_vector, rad, plane1, plane2) => {
  axis_vector_ = new Float32Array(3);
  axis_vector_[0] = axis_vector.x;
  axis_vector_[1] = axis_vector.y;
  axis_vector_[2] = axis_vector.z;

  plane1_ = new Float32Array(4);
  plane1_[0] = plane1.a;
  plane1_[1] = plane1.b;
  plane1_[2] = plane1.c;
  plane1_[3] = plane1.d;

  plane2_ = new Float32Array(4);
  plane2_[0] = plane2.a;
  plane2_[1] = plane2.b;
  plane2_[2] = plane2.c;
  plane2_[3] = plane2.d;

  gl.uniform3fv(UNI_LOC_axis_vector, axis_vector_);
  gl.uniform1f(UNI_LOC_rad, rad);

  gl.uniform4fv(UNI_LOC_plane1, plane1_);
  gl.uniform4fv(UNI_LOC_plane2, plane2_);
}

count_fps = () => {
  timeMeasurements.push(performance.now());

  const msPassed = timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];

  if (msPassed >= UPDATE_EACH_SECOND * 1000) {
    fps = Math.round(timeMeasurements.length / msPassed * 1000 * DECIMAL_PLACES_RATIO) / DECIMAL_PLACES_RATIO;
    timeMeasurements = [];
  }

  ELEM_show_fps.innerText = fps;
}

loop = () => {
  last_tick = performance.now();

  if (is_rotation_finish && is_turning_randomly) {
    scrambling();
    is_rotation_finish = false;
  }

  count_fps();
  orbit_around_rubik();
  set_up_canvas_dimension();
  
  draw();

  request_animation_frame = requestAnimationFrame(loop);
};

start = () => {
  if (!is_running) {
    loop();
    last_tick = performance.now();
    is_running = true;
  }
}

stop = () => {
  is_running = false;
  cancelAnimationFrame(request_animation_frame);
  request_animation_frame = undefined;
}

show_drop_down = e => {
  e.nextElementSibling.classList.toggle("show");

  if (e.nextElementSibling.classList.contains("show"))
    e.childNodes[0].innerHTML = "△"
  else
    e.childNodes[0].innerHTML = "▽"
}

disable_rotate_function = () => {
  for (i = 0; i < rubik.controls.length; i++)
    document.querySelector(`#rotate-${rubik.controls[i].name}`).disabled = true;
}

enable_rotate_function = () => {
  for (i = 0; i < rubik.controls.length; i++)
    document.querySelector(`#rotate-${rubik.controls[i].name}`).disabled = false;
}

scrambling = () => {
  controller_index = get_random_int(0, rubik.controls.length - 1);

  controller = rubik.controls[controller_index];

  loop_rotate_face_till_90_deg(
    document.querySelector( "#rotate-" + controller.name )
  );
}

swap_color = () => {
  TEMP_COLOR_up    = document.querySelector("#top-color").value   ;
  TEMP_COLOR_down  = document.querySelector("#bottom-color").value;
  TEMP_COLOR_front = document.querySelector("#front-color").value ;
  TEMP_COLOR_back  = document.querySelector("#back-color").value  ;
  TEMP_COLOR_right = document.querySelector("#right-color").value ;
  TEMP_COLOR_left  = document.querySelector("#left-color").value  ;

  document.querySelector("#top-color").value    = document.querySelector("#inner-top-color").value   ;
  document.querySelector("#bottom-color").value = document.querySelector("#inner-bottom-color").value;
  document.querySelector("#front-color").value  = document.querySelector("#inner-front-color").value ;
  document.querySelector("#back-color").value   = document.querySelector("#inner-back-color").value  ;
  document.querySelector("#right-color").value  = document.querySelector("#inner-right-color").value ;
  document.querySelector("#left-color").value   = document.querySelector("#inner-left-color").value  ;

  document.querySelector("#inner-top-color").value    = TEMP_COLOR_up;
  document.querySelector("#inner-bottom-color").value = TEMP_COLOR_down;
  document.querySelector("#inner-front-color").value  = TEMP_COLOR_front;
  document.querySelector("#inner-back-color").value   = TEMP_COLOR_back;
  document.querySelector("#inner-right-color").value  = TEMP_COLOR_right;
  document.querySelector("#inner-left-color").value   = TEMP_COLOR_left;
}
