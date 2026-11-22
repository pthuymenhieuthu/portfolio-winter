"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Water } from "@paper-design/shaders-react";
import { InteractiveWater } from "./interactive-water";
import { ShapePhysics, type ShapePhysicsHandle } from "./reactdrops/shape-physics/shape-physics";

const artwork = ["figma", "rive", "adobeaftereffects", "capcut", "adobeillustrator", "adobephotoshop"]
  .map((tool) => `/demo/tool-logos/${tool}.svg?v=bubble-soft-rim`);

export const FloatingToolsWater = forwardRef<ShapePhysicsHandle, { paused?: boolean; water?: boolean }>(
  function FloatingToolsWater({ paused = false, water = true }, ref) {
    const host = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [entered, setEntered] = useState(false);
    const [supported, setSupported] = useState(false);
    const [reduced, setReduced] = useState(false);
    const [small, setSmall] = useState(false);
    const [finePointer, setFinePointer] = useState(false);

    useEffect(() => {
      const motion = matchMedia("(prefers-reduced-motion: reduce)");
      const mobile = matchMedia("(max-width: 640px)");
      const pointer = matchMedia("(hover: hover) and (pointer: fine)");
      const sync = () => {
        setReduced(motion.matches);
        setSmall(mobile.matches);
        setFinePointer(pointer.matches);
      };
      sync();
      [motion, mobile, pointer].forEach((query) => query.addEventListener("change", sync));
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setSupported(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setEntered(true);
      }, { rootMargin: "150px" });
      if (host.current) observer.observe(host.current);
      return () => {
        observer.disconnect();
        [motion, mobile, pointer].forEach((query) => query.removeEventListener("change", sync));
      };
    }, []);

    return (
      <div ref={host} className="absolute inset-0">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_48%_35%,#f3fcff_0%,#d4efff_45%,#a8d8f7_100%)]" />
        {entered && <div className="absolute inset-0">
          <ShapePhysics ref={ref} artwork={artwork} background="transparent"
            shape="circle" depth="2d" faces={false} followCursor={false} cursorRepulsion
            interactive={finePointer} count={small ? 12 : 24} size={small ? 48 : 70} sizeVariation={0.18}
            gravity={0} spin={0.22} restitution={0.65} friction={0.04} damping={0.35}
            spawnRate={12} appearanceDuration={0.7} paused={paused}
            aria-label="Floating Figma, Rive, After Effects, CapCut, Illustrator and Photoshop logos. Move your cursor to gently repel logos, or drag one; press R to replay." />
        </div>}
        {water && supported && visible && <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.65]">
          {finePointer && !reduced && !paused ? <InteractiveWater transparent projectRipple speed={0.35} maxPixelCount={small ? 350000 : 800000} /> : <Water colorBack="#e6f6ff00" colorHighlight="#ffffff" speed={paused || reduced ? 0 : 0.35}
            size={1.08} caustic={0.16} waves={0.26} layering={0.62} highlights={0.3} edges={0.3}
            maxPixelCount={small ? 350000 : 800000} style={{ width: "100%", height: "100%" }} />}
        </div>}
      </div>
    );
  }
);
