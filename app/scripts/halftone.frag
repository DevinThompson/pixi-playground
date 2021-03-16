#ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
#endif
  
  precision highp float;
  
  uniform float uScale;
  uniform float uYrot;
  uniform sampler2D uSampler;
  uniform float dotSize;
  uniform float gridRotation;
  uniform vec2 uDims;
  
  varying vec2 vTextureCoord; //Texcoords
  varying vec2 vOne;
  
  float frequency = 500.0;
  
  float aastep(float threshold, float value) {
    #ifdef GL_OES_standard_derivatives
    float afwidth = 0.7 * length(vec2(dFdx(value)m dFdy(value)));
    #else
    float afwidth = frequency * (1.0/800.0) / uScale / cos(uYrot);
    #endif
    return smoothstep(threshold-afwidth, threshold+ afwidth, value);
  }
  
  mat2 rotated2d(float _angle) {
    return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
  }
  
  void main() {
    //Rotate the dot grid to desired angle
    vec2 st2 = vTextureCoord;
    st2 -= vec2(0.5);
    st2 = rotated2d(gridRotation) * st2;
    st2 += vec2(0.5);
    
    // Distance to nearest point in a grid of
    // (frequency x frequency) points over the unit square
    vec2 nearest = 2.0*fract(frequency * st2) - 1.0;
    float dist = length(nearest);
    
    // Use a texture to modulate the size of the dots
    vec3 texcolor = texture2D(uSampler, vTextureCoord).rgb; // Unrotated coords
    float radius = sqrt(1.0-texcolor.g); // Use green channel
    vec3 white = vec3(0.3, 1.0, 1.0);
    vec3 black = vec3(0.0, 0.0, 0.0);
    vec3 fragcolor = mix(black, white, aastep(radius, dist));
    gl_FragColor = vec4(fragcolor, 1.0);
  }