"use client";

import { ShaderMount } from "@paper-design/shaders-react";
import type { PaperShaderElement } from "@paper-design/shaders";
import { useEffect, useMemo, useRef } from "react";

const RIPPLE_COUNT = 12;
const LIFETIME = 1.8;
const emptyRipples = () => Array.from({ length: RIPPLE_COUNT }, () => [0, 0, -10, 0]);

// Refract the actual mockup texture. With no pointer waves, this samples the
// exact unmodified image; there is no animated water layer painted over it.
const fragmentShader = `#version 300 es
precision mediump float;
uniform sampler2D u_image;
uniform float u_imageAspectRatio;
uniform vec2 u_resolution;
uniform float u_clock;
uniform vec4 u_ripples[${RIPPLE_COUNT}];
in vec2 v_imageUV;
out vec4 fragColor;

void main() {
  vec2 screen = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 refraction = vec2(0.);
  for (int i = 0; i < ${RIPPLE_COUNT}; i++) {
    vec4 ripple = u_ripples[i];
    float age = u_clock - ripple.z;
    if (ripple.w <= 0. || age < 0. || age > 1.8) continue;
    vec2 delta = (screen - ripple.xy) * vec2(aspect, 1.);
    float distance = length(delta);
    float front = distance - age * .25;
    float envelope = exp(-front * front * 210.);
    float decay = exp(-age * 2.5) * (1. - smoothstep(1.2, 1.8, age));
    float wave = sin(front * 86.) * envelope * decay * ripple.w;
    refraction += delta / max(distance, .012) / vec2(aspect, 1.) * wave * .014;
  }
  vec2 cover = vec2(min(aspect / u_imageAspectRatio, 1.), min(u_imageAspectRatio / aspect, 1.));
  vec2 uv = v_imageUV + refraction * cover * vec2(1., -1.);
  fragColor = texture(u_image, clamp(uv, .001, .999));
}
`;

export function ImageRippleSurface({ src }: { src: string }) {
  const parent = useRef<HTMLDivElement>(null);
  const surface = useRef<PaperShaderElement>(null);
  const uniforms = useMemo(() => ({
    u_image: src,
    u_clock: 0,
    u_ripples: emptyRipples(),
    u_fit: 2,
    u_scale: 1,
    u_rotation: 0,
    u_originX: 0.5,
    u_originY: 0.5,
    u_offsetX: 0,
    u_offsetY: 0,
    u_worldWidth: 0,
    u_worldHeight: 0,
  }), [src]);

  useEffect(() => {
    const region = parent.current?.closest<HTMLElement>("[data-project-hero]") || parent.current?.parentElement;
    if (!region) return;
    const epoch = performance.now();
    let ripples = emptyRipples();
    let next = 0;
    let frame = 0;
    let lastStamp = -1;
    let lastX = -1000;
    let lastY = -1000;
    const now = () => (performance.now() - epoch) / 1000;

    function tick() {
      const time = now();
      const active = ripples.some((ripple) => ripple[3] > 0 && time - ripple[2] < LIFETIME);
      if (!active) {
        ripples = emptyRipples();
        surface.current?.paperShaderMount?.setUniforms({ u_clock: time, u_ripples: ripples });
        if (parent.current) parent.current.dataset.rippleState = "idle";
        frame = 0;
        return;
      }
      surface.current?.paperShaderMount?.setUniforms({ u_clock: time, u_ripples: ripples.map((ripple) => [...ripple]) });
      frame = requestAnimationFrame(tick);
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !surface.current?.paperShaderMount) return;
      const bounds = region!.getBoundingClientRect();
      const time = now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (time - lastStamp < 0.045 || distance < 8) return;
      ripples[next] = [
        (event.clientX - bounds.left) / bounds.width,
        1 - (event.clientY - bounds.top) / bounds.height,
        time,
        Math.min(1, 0.5 + distance / 180),
      ];
      next = (next + 1) % RIPPLE_COUNT;
      lastX = event.clientX;
      lastY = event.clientY;
      lastStamp = time;
      if (parent.current) parent.current.dataset.rippleState = "rippling";
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function clear() {
      cancelAnimationFrame(frame);
      frame = 0;
      ripples = emptyRipples();
      lastX = lastY = -1000;
      surface.current?.paperShaderMount?.setUniforms({ u_clock: now(), u_ripples: ripples });
      if (parent.current) parent.current.dataset.rippleState = "idle";
    }

    region.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      cancelAnimationFrame(frame);
      region.removeEventListener("pointermove", move);
      window.removeEventListener("resize", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, []);

  return (
    <div ref={parent} aria-hidden="true" data-mockup-ripple="true" data-ripple-state="idle" className="pointer-events-none absolute inset-0">
      <ShaderMount
        ref={surface}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        speed={0}
        minPixelRatio={1}
        maxPixelCount={1920 * 1080}
        webGlContextAttributes={{ alpha: false, preserveDrawingBuffer: true }}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
