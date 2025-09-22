// src/components/client-blog.tsx
'use client';

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { useMDXComponent } from "next-contentlayer/hooks";

type ClientBlogProps = {
  source: string; // MDX body code
  components?: Record<string, React.ComponentType<any>>;
};

export default function ClientBlog({ source, components }: ClientBlogProps) {
  const MDXContent = useMDXComponent(source);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Zoom ảnh sau khi MDX render xong
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
    <article ref={ref} className="prose dark:prose-invert max-w-none">
      <MDXContent components={components ?? {}} />
    </article>
  );
}