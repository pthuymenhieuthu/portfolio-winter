"use client";

import { ScreenFocusCarousel } from "@/components/screen-focus-carousel";

type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  mobilePosterSrc?: string;
};

export function CaseStudyImageCarousel({ images, label = "Project screen gallery", device = "web", className }: {
  images: readonly GalleryImage[];
  label?: string;
  device?: "mobile" | "web";
  className?: string;
}) {
  if (!images.length) return null;
  return <ScreenFocusCarousel label={label} device={device} fit="contain" className={className}
    screens={images.map(image => ({
      src: /\.gif(?:\?|$)/i.test(image.src) && image.src.startsWith("/")
        ? image.mobilePosterSrc || image.src.replace(/\.gif(?=\?|$)/i, ".poster.webp") : image.src,
      title: image.title || image.alt,
      description: image.description || "",
      width: image.width ?? 1440,
      height: image.height ?? 900,
    }))} />;
}
