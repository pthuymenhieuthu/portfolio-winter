export type Experiment = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "ready" | "coming-soon";
  poster?: string;
  video?: string;
  href?: string;
  actionLabel?: string;
};

// Add new experiments here. Leave unreleased entries without a fabricated URL.
export const EXPERIMENTS: readonly Experiment[] = [
  {
    id: "zoan-showreel",
    title: "Zoan in motion",
    category: "Showreel",
    description: "A short product motion study for Zoan, made with AI.",
    status: "ready",
    poster: "/experiments/zoan-showreel-7bce9f09.jpg",
    video: "/experiments/zoan-showreel-7bce9f09.mp4",
  },
  {
    id: "framer-component",
    title: "Dynamic carousel",
    category: "Component",
    description: "An interactive portrait carousel, built as a Framer component.",
    status: "ready",
    poster: "/experiments/framer-carousel-poster.png",
    href: "https://breakable-suggestions-169956.framer.app/",
  },
  {
    id: "dpox-product-film",
    title: "DpoX — A collaborative product film",
    category: "Brand film",
    description: "From generated first frames to Kling video clips, in collaboration with a motion designer.",
    status: "ready",
    poster: "/experiments/dpox-generation-process.png",
    href: "/experiments/dpox",
    actionLabel: "Read the process",
  },
];
