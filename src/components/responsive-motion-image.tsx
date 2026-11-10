/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

type ResponsiveMotionImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  mobilePosterSrc?: string;
  priority?: boolean;
  unoptimized?: boolean;
  preserveAnimation?: boolean;
};

function isGif(src: string) {
  return /\.gif(?:\?|$)/i.test(src);
}

function getLocalPosterSrc(src: string) {
  if (!isGif(src) || !src.startsWith("/") || src.startsWith("//")) {
    return null;
  }

  return src.replace(/\.gif(?=\?|$)/i, ".poster.webp");
}

export function ResponsiveMotionImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  mobilePosterSrc,
  priority = false,
  unoptimized,
  preserveAnimation = false,
}: ResponsiveMotionImageProps) {
  const gifPosterSrc = isGif(src) && !preserveAnimation
    ? mobilePosterSrc || getLocalPosterSrc(src)
    : null;
  const displaySrc = gifPosterSrc || src;

  if (/^https?:\/\//i.test(displaySrc)) {
    return (
      <img
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    );
  }

  return (
    <Image
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      unoptimized={unoptimized || Boolean(gifPosterSrc)}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
