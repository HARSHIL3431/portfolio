// ─── Uniforms ───────────────────────────────────────────────────
uniform float uScroll;   // drives desaturation on scroll

// ─── Varyings ───────────────────────────────────────────────────
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // ── Lighting approximation ────────────────────────────────────
  // Warm directional light — upper left
  vec3 warmDir = normalize(vec3(-1.2, 1.5, 0.8));
  float warmDiff = max(dot(vNormal, warmDir), 0.0);
  vec3 warmLight = vec3(0.98, 0.92, 0.82) * warmDiff * 0.85;

  // Cool point light — lower right (rim effect)
  vec3 coolDir = normalize(vec3(1.4, -0.9, 0.6));
  float coolDiff = max(dot(vNormal, coolDir), 0.0);
  vec3 coolLight = vec3(0.55, 0.68, 0.95) * coolDiff * 0.45;

  // Ambient — very dark
  vec3 ambient = vec3(0.04, 0.04, 0.06);

  // Base material — warm off-white with slight variation from displacement
  vec3 baseColor = vec3(0.91 + vDisplacement * 0.04, 0.89, 0.86);

  // Emissive — subtle warm glow on displaced peaks
  float emissive = max(vDisplacement, 0.0) * 0.12;
  vec3 emissiveColor = vec3(0.96, 0.88, 0.72) * emissive;

  // Final color
  vec3 color = (ambient + warmLight + coolLight) * baseColor + emissiveColor;

  // Scroll desaturation — sphere fades to muted as user scrolls
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(color, vec3(luma), uScroll * 0.5);

  gl_FragColor = vec4(color, 1.0);
}
