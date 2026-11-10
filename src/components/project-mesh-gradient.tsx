export const projectMeshPalettes = {
  medhunt: ["#eaf0ff", "#2457c5", "#bfeaf2", "#f5d866"],
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

// Retained for older local previews; project pages use a plain header.
export function ProjectMeshGradient({ colors, className }: {
  colors: string[];
  className?: string;
  distortion?: number;
  speed?: number;
  swirl?: number;
}) {
  return <div aria-hidden="true" className={className} style={{ position: "absolute", inset: 0, zIndex: -20, backgroundColor: colors[0], pointerEvents: "none" }} />;
}
