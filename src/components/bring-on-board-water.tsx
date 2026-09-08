"use client";

import { Water } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";

export function BringOnBoardWater() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [supportsWater, setSupportsWater] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    setSupportsWater(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px 0px", threshold: 0.01 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#f8fcff_0%,#e6f6ff_100%)]"
    >
      {isVisible && supportsWater ? (
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
      ) : null}
    </div>
  );
}
