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

function getCloudinaryPosterSrc(src: string) {
  if (!isGif(src) || !src.includes("res.cloudinary.com") || !src.includes("/image/upload/")) {
    return null;
  }

  return src.replace("/image/upload/", "/image/upload/f_webp,q_auto,w_720,pg_1/");
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
    ? mobilePosterSrc || getCloudinaryPosterSrc(src)
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
