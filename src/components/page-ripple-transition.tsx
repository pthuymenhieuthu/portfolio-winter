"use client";

/*
 * Page transition wavefront adapted from Mick Cesanek's MIT-licensed Ripple:
 * https://github.com/m1ckc3s/ripple
 *
 * The original shader crossfades two photos. Here the same noisy wavefront
 * covers the current page, Next navigates, then the wave uncovers the new page.
 */
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_center;
uniform float u_progress;
uniform float u_phase;
uniform float u_noiseWarp;
uniform float u_glow;
varying vec2 v_uv;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p, int octaves) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    val += amp * vnoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}
void main() {
  vec2 uv = v_uv;
  vec2 p = uv - u_center;
  float aspect = u_resolution.x / u_resolution.y;
  p.x *= aspect;
  float dist = length(p);
  float farthest = max(
    max(length(vec2(u_center.x * aspect, u_center.y)),
        length(vec2((1.0 - u_center.x) * aspect, u_center.y))),
    max(length(vec2(u_center.x * aspect, 1.0 - u_center.y)),
        length(vec2((1.0 - u_center.x) * aspect, 1.0 - u_center.y)))
  );
  float normDist = dist / farthest;
  float noiseLarge = fbm(p * 4.0 + vec2(u_progress, u_progress * 0.5), 4);
  float noiseSmall = fbm(p * 12.0 + vec2(u_progress * 2.0, -u_progress), 3);
  float warpScale = smoothstep(0.0, 0.08, u_progress);
  float warpedDist = normDist
    + (noiseLarge - 0.5) * u_noiseWarp * warpScale
    + (noiseSmall - 0.5) * u_noiseWarp * 0.6 * warpScale;
  float waveFront = u_progress * (1.0 + u_noiseWarp * 0.7 + 0.08);
  float delta = warpedDist - waveFront;
  float envelope = exp(-delta * delta / (2.0 * 0.11 * 0.11));
  float ripples = max(0.0, cos(delta * 18.0));
  float wave = envelope * ripples;
  float covered = 1.0 - smoothstep(-0.035, 0.035, delta);
  float alpha = u_phase < 0.5 ? covered : 1.0 - covered;
  vec3 blue = mix(vec3(0.24, 0.61, 0.95), vec3(0.57, 0.78, 0.98), uv.y);
  vec3 color = mix(blue, vec3(0.81, 0.92, 1.0), wave * u_glow);
  // No yellow color dodge or RGB channel splitting.
  gl_FragColor = vec4(color, clamp(alpha + wave * u_glow * 0.12, 0.0, 1.0));
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("WebGL shader unavailable");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(error || "Ripple shader failed");
  }
  return shader;
}

type RippleRenderer = {
  draw: (progress: number, phase: number, x: number, y: number) => void;
  resize: () => void;
  dispose: () => void;
};

function makeRenderer(canvas: HTMLCanvasElement): RippleRenderer {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
  if (!gl) throw new Error("WebGL unavailable");
  const vertex = compile(gl, gl.VERTEX_SHADER, VERT);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!program) throw new Error("WebGL program unavailable");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "WebGL link failed");
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  const uniforms = {
    size: gl.getUniformLocation(program, "u_resolution"),
    center: gl.getUniformLocation(program, "u_center"),
    progress: gl.getUniformLocation(program, "u_progress"),
    phase: gl.getUniformLocation(program, "u_phase"),
    noiseWarp: gl.getUniformLocation(program, "u_noiseWarp"),
    glow: gl.getUniformLocation(program, "u_glow"),
  };
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  return {
    resize,
    draw(progress, phase, x, y) {
      gl.useProgram(program);
      gl.uniform2f(uniforms.size, canvas.width, canvas.height);
      gl.uniform2f(uniforms.center, x, y);
      gl.uniform1f(uniforms.progress, progress);
      gl.uniform1f(uniforms.phase, phase);
      gl.uniform1f(uniforms.noiseWarp, 0.17);
      gl.uniform1f(uniforms.glow, 0.16);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
  };
}

export function PageRippleTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<RippleRenderer | null>(null);
  const phaseRef = useRef<"idle" | "cover" | "waiting" | "uncover">("idle");
  const originRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef(0);
  const timeoutRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try { rendererRef.current = makeRenderer(canvas); }
    catch { rendererRef.current = null; }
    const resize = () => rendererRef.current?.resize();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeoutRef.current);
      window.removeEventListener("resize", resize);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  const animate = (phase: 0 | 1, duration: number, done: () => void) => {
    const renderer = rendererRef.current;
    if (!renderer) { done(); return; }
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - started) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      renderer.draw(eased, phase, originRef.current.x, originRef.current.y);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
      else done();
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (phaseRef.current !== "waiting") return;
    clearTimeout(timeoutRef.current);
    phaseRef.current = "uncover";
    animate(1, 520, () => {
      if (canvasRef.current) canvasRef.current.style.display = "none";
      phaseRef.current = "idle";
    });
  // Only the destination route starts the second half of the transition.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (phaseRef.current !== "idle" || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !rendererRef.current || !canvasRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      originRef.current = { x: event.clientX / innerWidth, y: event.clientY / innerHeight };
      const canvas = canvasRef.current;
      canvas.style.display = "block";
      canvas.style.pointerEvents = "auto";
      phaseRef.current = "cover";
      animate(0, 440, () => {
        phaseRef.current = "waiting";
        router.push(url.pathname + url.search + url.hash);
        timeoutRef.current = window.setTimeout(() => {
          if (phaseRef.current !== "waiting") return;
          phaseRef.current = "uncover";
          animate(1, 520, () => {
            canvas.style.display = "none";
            phaseRef.current = "idle";
          });
        }, 4000);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <canvas ref={canvasRef} aria-hidden="true" data-page-ripple="shader" style={{
    display: "none", position: "fixed", inset: 0, width: "100vw", height: "100dvh",
    zIndex: 1000, pointerEvents: "none",
  }} />;
}
