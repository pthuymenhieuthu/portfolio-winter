// src/components/client-blog.tsx
'use client';

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

type ClientBlogProps = {
  source: string; // HTML string thay vì MDX code
};

export default function ClientBlog({ source }: ClientBlogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Zoom ảnh sau khi render xong
    const imgs = ref.current.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.closest("[data-rmiz]")) {
        const wrapper = document.createElement("div");
        img.parentNode?.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        const root = createRoot(wrapper);
        root.render(
          <ImageZoom>
            <img src={img.src} alt={img.alt} className="rounded-lg shadow" />
          </ImageZoom>
        );
      }
    });
  }, [source]);

  return (
    <article
      ref={ref}
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}