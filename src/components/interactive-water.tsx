"use client";

import { ShaderMount, waterPresets } from "@paper-design/shaders-react";
import { getShaderColorFromString, waterFragmentShader, ShaderFitOptions, type PaperShaderElement } from "@paper-design/shaders";
import { useEffect, useRef } from "react";

const RIPPLE_COUNT = 12;
const RIPPLE_LIFETIME = 2;
const emptyRipples = () => Array.from({ length: RIPPLE_COUNT }, () => [0, 0, -10, 0]);

// Keep Paper's original water and caustic calculation. The only change is its
// input coordinates: expanding cursor waves refract that same water surface.
const fragmentShader = waterFragmentShader
  .replace("uniform float u_time;", `uniform float u_time;
uniform vec2 u_resolution;
uniform float u_cursorTime;
uniform vec4 u_cursorRipples[${RIPPLE_COUNT}];

vec2 cursorRefraction() {
  vec2 screenUV = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 offset = vec2(0.);
  for (int i = 0; i < ${RIPPLE_COUNT}; i++) {
    vec4 ripple = u_cursorRipples[i];
    float age = u_cursorTime - ripple.z;
    if (ripple.w <= 0. || age < 0. || age > 2.) continue;
    vec2 delta = (screenUV - ripple.xy) * vec2(aspect, 1.);
    float distanceFromCursor = length(delta);
    float front = distanceFromCursor - age * .24;
    float envelope = exp(-front * front * 150.);
    float fade = exp(-age * 2.2) * (1. - smoothstep(1.3, 2., age));
    float wave = sin(front * 76.) * envelope * fade * ripple.w;
    vec2 direction = delta / max(distanceFromCursor, .008);
    offset += direction / vec2(aspect, 1.) * wave * .024;
  }
  return offset;
}`)
  .replace("vec2 imageUV = v_imageUV;", "vec2 surfaceUV = v_imageUV + cursorRefraction();\n  vec2 imageUV = surfaceUV;")
  .replace("vec2 patternUV = v_imageUV - .5;", "vec2 patternUV = surfaceUV - .5;");

const defaults = waterPresets[0].params;
const uniforms = {
  u_image: "",
  u_colorBack: getShaderColorFromString("#e6f6ff"),
  u_colorHighlight: getShaderColorFromString("#ffffff"),
  u_highlights: 0.22,
  u_layering: 0.62,
  u_waves: 0.26,
  u_edges: 0.3,
  u_caustic: 0.16,
  u_size: 1.08,
  u_fit: ShaderFitOptions[defaults.fit],
  u_scale: defaults.scale,
  u_rotation: defaults.rotation,
  u_offsetX: defaults.offsetX,
  u_offsetY: defaults.offsetY,
  u_originX: defaults.originX,
  u_originY: defaults.originY,
  u_worldWidth: defaults.worldWidth,
  u_worldHeight: defaults.worldHeight,
  u_cursorTime: 0,
  u_cursorRipples: emptyRipples(),
};

export function InteractiveWater() {
  const surface = useRef<PaperShaderElement>(null);

  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    const epoch = performance.now();
    let ripples = emptyRipples();
    let next = 0;
    let frame = 0;
    let lastStamp = -1;
    let lastX = -1000;
    let lastY = -1000;
    let dirty = false;
    const clock = () => (performance.now() - epoch) / 1000;

    function tick() {
      frame = 0;
      const now = clock();
      const mount = element?.paperShaderMount;
      const active = ripples.some((ripple) => ripple[3] > 0 && now - ripple[2] < RIPPLE_LIFETIME);
      if (!active) {
        if (element) element.dataset.waterResponse = "idle";
        ripples = emptyRipples();
        mount?.setUniforms({ u_cursorTime: now, u_cursorRipples: ripples });
        return;
      }
      if (dirty) {
        mount?.setUniforms({ u_cursorTime: now, u_cursorRipples: ripples.map((ripple) => [...ripple]) });
        dirty = false;
      } else {
        mount?.setUniforms({ u_cursorTime: now });
      }
      frame = requestAnimationFrame(tick);
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !element?.paperShaderMount) return;
      const bounds = element.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
      const now = clock();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (now - lastStamp < 0.04 || distance < 6) return;
      ripples[next] = [
        (event.clientX - bounds.left) / bounds.width,
        1 - (event.clientY - bounds.top) / bounds.height,
        now,
        Math.min(1.25, 0.65 + distance / 100),
      ];
      next = (next + 1) % RIPPLE_COUNT;
      lastX = event.clientX;
      lastY = event.clientY;
      lastStamp = now;
      dirty = true;
      element.dataset.waterResponse = "rippling";
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function clear() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastX = lastY = -1000;
      if (element) element.dataset.waterResponse = "idle";
      ripples = emptyRipples();
      element?.paperShaderMount?.setUniforms({ u_cursorRipples: ripples });
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, []);

  return <ShaderMount ref={surface} data-interactive-water="true" data-water-response="idle" fragmentShader={fragmentShader} uniforms={uniforms} mipmaps={["u_image"]} speed={0.42} maxPixelCount={1280 * 720} className="h-full w-full" style={{ height: "100%", width: "100%" }} />;
}
