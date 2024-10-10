// src/components/IconCloudDemo.tsx
import IconCloud from "@/components/ui/icon-cloud";

const slugs = [
  "adobeillustrator",
  "adobephotoshop",
  "miro",
  "pinterest",
  "figma",
  "framer",
  "canva",
  "davinciresolve",
  "behance",
  "dribbble",
  "threads",
  "notion",
  "medium",
  "typescript",
  "vercel",
  "github",
  "html5",
  "visualstudiocode",
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
