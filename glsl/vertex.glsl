#version 300 es 
precision highp float;

in vec3 vertPosition; 
in vec4 vertColor; 

out lowp vec4 fragColor; 

uniform lowp float pointSize; 
uniform mat4 mWorld; 
uniform mat4 mView; 
uniform mat4 mProj; 

uniform vec3 axis_vec; 
uniform float rad; 
uniform vec4 plane1; 
uniform vec4 plane2; 

float get_dot_product_of_plane_and_vector(vec3 point, vec4 plane) {
  return dot(point.xyz, plane.xyz) + plane.w;
}

bool check_if_point_between_2_planes(vec3 point, vec4 plane1, vec4 plane2) {
  float dis1 = get_dot_product_of_plane_and_vector(point, plane1);
  float dis2 = get_dot_product_of_plane_and_vector(point, plane2);

  float sign1 = sign(dis1);
  float sign2 = sign(dis2);

  if (sign1 != sign2) return true;

  return false;
}

mat4 create_rotation_matrix_around_axis(vec3 axis, float rad) {
  vec3 unit_vec = axis;

  // Check if axis is a unit vector
  if (length(axis) > 1.0)
    // It not then normalize it
    unit_vec = normalize(axis);

  float sin_rad = sin(rad);
  float cos_rad = cos(rad);
  float one_minus_cos_rad = 1.0 - cos_rad;
  float x_sin_rad = unit_vec.x * sin_rad;
  float y_sin_rad = unit_vec.y * sin_rad;
  float z_sin_rad = unit_vec.z * sin_rad;
  float x_y = unit_vec.x * unit_vec.y;
  float y_z = unit_vec.y * unit_vec.z;
  float x_z = unit_vec.x * unit_vec.z;

  float r00 = cos_rad + (unit_vec.x * unit_vec.x) * one_minus_cos_rad;
  float r01 = x_y * one_minus_cos_rad - z_sin_rad;
  float r02 = x_z * one_minus_cos_rad + y_sin_rad;

  float r10 = x_y * one_minus_cos_rad + z_sin_rad;
  float r11 = cos_rad + (unit_vec.y * unit_vec.y) * one_minus_cos_rad;
  float r12 = y_z * one_minus_cos_rad - x_sin_rad;

  float r20 = x_z * one_minus_cos_rad - y_sin_rad;
  float r21 = y_z * one_minus_cos_rad + x_sin_rad;
  float r22 = cos_rad + (unit_vec.z * unit_vec.z) * one_minus_cos_rad;

  mat4 rot_matrix;
  rot_matrix[0] = vec4(r00, r01, r02, 0.0);
  rot_matrix[1] = vec4(r10, r11, r12, 0.0);
  rot_matrix[2] = vec4(r20, r21, r22, 0.0);
  rot_matrix[3] = vec4(0.0, 0.0, 0.0, 1.0);

  return rot_matrix;
}

mat4 check_vertex(vec4 plane1, vec4 plane2, vec3 vertex, vec3 axis_vector, float rad) {
  if ( check_if_point_between_2_planes(vertex, plane1, plane2) ) {
    return create_rotation_matrix_around_axis(axis_vector, rad);
  }
  else {
    mat4 identity;

    identity[0] = vec4(1.0,  .0,  .0,  .0);
    identity[1] = vec4( .0, 1.0,  .0,  .0);
    identity[2] = vec4( .0,  .0, 1.0,  .0);
    identity[3] = vec4( .0,  .0,  .0, 1.0);

    return identity;
  }
}

void main() { 
  fragColor = vertColor;
  gl_PointSize = pointSize;

  mat4 rot = check_vertex(
    plane1, 
    plane2, 
    vertPosition, 
    axis_vec, 
    rad
  );

  gl_Position = mProj * mView * mWorld * rot * vec4(vertPosition, 1.0);
}