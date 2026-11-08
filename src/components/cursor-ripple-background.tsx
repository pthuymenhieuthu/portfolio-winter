"use client";

import { Water } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";
import { InteractiveWater } from "./interactive-water";

export function CursorRippleBackground({ interactive = false }: { interactive?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [supportsWater, setSupportsWater] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopPointer = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(!reducedMotion.matches && desktopPointer.matches);
    sync();
    reducedMotion.addEventListener("change", sync);
    desktopPointer.addEventListener("change", sync);
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    setSupportsWater(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (container.current) observer.observe(container.current);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      desktopPointer.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={container} aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(160deg, #edfaff, #d8f2ff 48%, #b9ddff)" }}>
      {visible && supportsWater && (interactive && canHover ? (
        <InteractiveWater />
      ) : (
        <Water
          colorBack="#e6f6ff"
          colorHighlight="#ffffff"
          speed={0.42}
          size={1.08}
          caustic={0.16}
          waves={0.26}
          layering={0.62}
          highlights={0.22}
          edges={0.3}
          maxPixelCount={1280 * 720}
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
        />
      ))}
    </div>
  );
}
