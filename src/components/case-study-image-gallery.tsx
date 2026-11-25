import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  mobilePosterSrc?: string;
};

/** Static screens for case studies outside the two Affina projects. */
export function CaseStudyImageGallery({ images, label = "Project screens", device = "web", className = "" }: {
  images: readonly GalleryImage[];
  label?: string;
  device?: "mobile" | "web";
  className?: string;
}) {
  if (!images.length) return null;
  return <div aria-label={label} data-static-screen-gallery
    className={`grid items-start gap-8 sm:gap-10 ${device === "mobile" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} ${className}`}>
    {images.map(image => <figure key={image.src} className="min-w-0">
      <Image src={/\.gif(?:\?|$)/i.test(image.src) && image.src.startsWith("/")
        ? image.mobilePosterSrc || image.src.replace(/\.gif(?=\?|$)/i, ".poster.webp") : image.src}
        alt={image.alt} width={image.width ?? 1440} height={image.height ?? 900}
        unoptimized className="block h-auto w-full rounded-[20px]"
        sizes={device === "mobile" ? "(max-width: 1024px) 45vw, 320px" : "(max-width: 768px) 90vw, 1100px"} />
      {(image.title || image.description) && <figcaption className="mt-5 space-y-2 text-base leading-relaxed">
        {image.title && <p className="font-medium">{image.title}</p>}
        {image.description && <p className="text-[#737373]">{image.description}</p>}
      </figcaption>}
    </figure>)}
  </div>;
}

export function StaticScreenGallery({ screens, label }: {
  screens: readonly { src: string; title: string; description: string; width: number; height: number }[];
  label: string;
}) {
  return <CaseStudyImageGallery device="mobile" label={label}
    images={screens.map(screen => ({ ...screen, alt: screen.title }))} />;
}
