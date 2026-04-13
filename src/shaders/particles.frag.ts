const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float d = length(coord);
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, d) * 0.65;

    float t = (sin(uTime * 0.3) + 1.0) * 0.5;
    vec3 color = mix(uColorA, uColorB, t);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default fragmentShader;
