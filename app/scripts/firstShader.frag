 #ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
#endif
  
  precision highp float;
  
  uniform float uScale;
  uniform float uYrot;
  uniform sampler2D uSampler;
  uniform float dotSize;
  uniform float gridRotation;
  uniform vec2 u_resolution; // Not sure how to define a vec2 in JS
  uniform float time;
  uniform float u_width;
  uniform float u_height;
  uniform float uwidth;
  
  varying vec2 vTextureCoord; //Texcoords
  varying vec2 vOne;
  
  float frequency = 150.0;
  
  float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
  }
  
  vec2 rotate2D(vec2 _st, float _angle) {
    _st -= 0.5;
    _st = mat2(cos(_angle), -sin(_angle), 
               sin(_angle), cos(_angle)) * _st;
    _st += 0.5;
    return _st;
  }
  
  void main() {
    vec2 st = gl_FragCoord.xy/vec2(u_width, u_width);
    vec3 color = vec3(0.0);
    
    st *= 3.; //scale up the space by 3
    st = fract(st); // Wrap around 1.0
    
    // Now we have 9 spaces that go from 0-1
    
    color = vec3(st, 0.0);
    // vec3 tex2 = texture2D(uSampler, vTextureCoord).rgb;
       // color = vec3(circle(st, 0.5));
    
    vec3 tex = texture2D(uSampler, vTextureCoord).rgb;
    
    gl_FragColor = vec4(color, 1.0);
  }