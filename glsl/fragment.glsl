#version 300 es 
precision highp float; 

in vec4 fragColor; 
out vec4 outFragColor; 
  
void main() { 
  outFragColor = fragColor; 
}