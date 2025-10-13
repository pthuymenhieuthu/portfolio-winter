// src/components/client-blog.tsx
'use client';

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import Image from "next/image";

type ClientBlogProps = {
  source: string; // HTML string thay vì MDX code
};

export default function ClientBlog({ source }: ClientBlogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const imgs = Array.from(container.querySelectorAll("img"));

    imgs.forEach((img) => {
      // Tránh wrap lại nếu đã được xử lý (vd. bởi ImageZoom: data-rmiz)
      if (img.closest("[data-rmiz]")) return;

      const renderWithNextImage = () => {
        const naturalW = img.naturalWidth;
        const naturalH = img.naturalHeight;

        // Fallback size nếu không đọc được kích thước tự nhiên
        const fallbackW = 1200;
        const fallbackH = Math.round((fallbackW * 9) / 16);

        const width = naturalW > 0 ? naturalW : (parseInt(img.getAttribute("width") || "0") || fallbackW);
        const height = naturalH > 0 ? naturalH : (parseInt(img.getAttribute("height") || "0") || fallbackH);

        // Tạo wrapper và thay img cũ bằng wrapper
        const wrapper = document.createElement("div");
        wrapper.style.display = "block";
        img.parentNode?.insertBefore(wrapper, img);
        img.remove();

        // Render React vào wrapper với <Image /> của Next
        const root = createRoot(wrapper);
        root.render(
          <ImageZoom>
            <Image
              src={img.src}
              alt={img.alt || ""}
              width={width}
              height={height}
              className="rounded-lg shadow w-full h-auto"
              sizes="100vw"
              // Dùng unoptimized vì ảnh có thể đến từ domain ngoài chưa whitelist.
              // Nếu bạn đã cấu hình images.domains trong next.config.js thì có thể bỏ dòng này.
              unoptimized
              priority={false}
            />
          </ImageZoom>
        );
      };

      if (img.complete && img.naturalWidth > 0) {
        renderWithNextImage();
      } else {
        img.addEventListener("load", renderWithNextImage, { once: true });
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