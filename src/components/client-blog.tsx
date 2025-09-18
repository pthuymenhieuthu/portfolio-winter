"use client";

import { useEffect } from "react";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

export default function ClientBlog({ source }: { source: string }) {
  useEffect(() => {
    const imgs = document.querySelectorAll("article img");
    imgs.forEach((img) => {
      if (!img.closest("zoom-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "zoom-wrapper";
        img.parentNode?.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      }
    });
  }, []);

  return (
    <article
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}