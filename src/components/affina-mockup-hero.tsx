"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePageTransitionActive } from "@/lib/page-transition";

const ImageRippleSurface = dynamic(
  () => import("./image-ripple-surface").then((module) => module.ImageRippleSurface),
  { ssr: false }
);

export function ProjectMockupBackground({ src, alt = "" }: { src: string; alt?: string }) {
  const [interactive, setInteractive] = useState(false);
  const transitionActive = usePageTransitionActive();

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (transitionActive) return;
    let available: boolean | undefined;
    const sync = () => {
      if (!pointer.matches || motion.matches) { setInteractive(false); return; }
      if (available === undefined) {
        const gl = document.createElement("canvas").getContext("webgl2");
        available = Boolean(gl);
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      }
      setInteractive(available);
    };
    sync();
    pointer.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      pointer.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, [transitionActive]);

  return (
    <div aria-hidden="true" className="absolute inset-0 select-none overflow-hidden bg-[#8fc7ff]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        unoptimized
        draggable={false}
        sizes="100vw"
        className="object-cover object-center"
      />
      {interactive && !transitionActive && <ImageRippleSurface key={src} src={src} />}
    </div>
  );
}

export function AffinaMockupHero() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-[#e9f5ff]">
      <div className="absolute inset-x-0 top-0 h-[66%] [mask-image:linear-gradient(to_bottom,#000_0%,#000_73%,transparent_100%)] sm:inset-0 sm:h-full sm:[mask-image:none]">
        <ProjectMockupBackground src="/assets/project-thumbnails/affina-pink-meadow-en.webp" />
      </div>
    </div>
  );
}
