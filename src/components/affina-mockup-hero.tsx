"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageRippleSurface = dynamic(
  () => import("./image-ripple-surface").then((module) => module.ImageRippleSurface),
  { ssr: false }
);

export function ProjectMockupBackground({ src, alt = "" }: { src: string; alt?: string }) {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    const available = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    const sync = () => setInteractive(available && pointer.matches && !motion.matches);
    sync();
    pointer.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      pointer.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

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
      {interactive && <ImageRippleSurface key={src} src={src} />}
    </div>
  );
}

export function AffinaMockupHero() {
  return <ProjectMockupBackground src="/assets/project-thumbnails/affina-pink-meadow-en.webp" />;
}
