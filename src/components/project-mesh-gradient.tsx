"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export const projectMeshPalettes = {
  affina: ["#65c7ff", "#b9b2ff", "#f38ee7", "#ffd7ed"],
  affinaPartner: ["#65c7ff", "#b9b2ff", "#f38ee7", "#ffd7ed"],
  fourOranges: ["#ff6a00", "#ff9f1c", "#ffd166", "#fff3d0"],
  zoan: ["#d9f7f5", "#15cabe", "#d9f7f5", "#15cabe"],
  trueProfit: ["#e3f8f1", "#72d9b6", "#e3f8f1", "#72d9b6"],
  edtech: ["#ffcf4a", "#ff8066", "#ffb86b", "#fff3c4"],
  series: ["#72c8ff", "#9bdcff", "#c8efff", "#eefaff"],
  graphics: ["#00c7df", "#246bce", "#df4ddd", "#7ff5d6"],
  pizzy: ["#7161d8", "#aa79e6", "#e79ce9", "#f1d6ff"],
  cake: ["#fff0fa", "#ffd6f2", "#f98ad8", "#f849c1"],
  zanzan: ["#4a1f8c", "#8b5cf6", "#ff6b6b", "#ffd166"],
} satisfies Record<string, string[]>;

type ProjectMeshGradientProps = {
  colors: string[];
  className?: string;
  distortion?: number;
  speed?: number;
  swirl?: number;
};

export function ProjectMeshGradient({
  colors,
  className,
  distortion = 0.72,
  speed = 1,
  swirl = 0.22,
}: ProjectMeshGradientProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-[var(--mesh-fallback)]",
        className
      )}
      style={
        {
          "--mesh-fallback": colors[0],
        } as React.CSSProperties
      }
    >
      <MeshGradient
        className="h-full w-full"
        colors={colors}
        distortion={distortion}
        fit="cover"
        grainMixer={0}
        grainOverlay={0}
        height="100%"
        maxPixelCount={960 * 720}
        speed={shouldReduceMotion ? 0 : speed}
        swirl={swirl}
        width="100%"
      />
    </div>
  );
}
