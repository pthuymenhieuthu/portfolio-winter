"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { cn } from "@/lib/utils";

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
};

function isGif(src: string) {
  return /\.gif(?:\?|$)/i.test(src);
}

function getCloudinaryPosterSrc(src: string) {
  if (!isGif(src) || !src.includes("res.cloudinary.com") || !src.includes("/image/upload/")) {
    return null;
  }

  return src.replace("/image/upload/", "/image/upload/f_jpg,q_auto,w_720,pg_1/");
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
}: ResponsiveMotionImageProps) {
  const posterSrc = mobilePosterSrc || getCloudinaryPosterSrc(src);

  if (isGif(src) && posterSrc) {
    return (
      <picture>
        <source media="(max-width: 639px)" srcSet={posterSrc} />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={cn("block", className)}
        />
      </picture>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized={unoptimized || isGif(src)}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
