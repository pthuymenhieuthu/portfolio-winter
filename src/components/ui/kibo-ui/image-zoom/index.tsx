"use client";

import Zoom, {
  type ControlledProps,
  type UncontrolledProps,
} from "react-medium-image-zoom";
import { cn } from "@/lib/utils";

export type ImageZoomProps = UncontrolledProps & {
  isZoomed?: ControlledProps["isZoomed"];
  onZoomChange?: ControlledProps["onZoomChange"];
  className?: string;
  backdropClassName?: string;
};

export const ImageZoom = ({
  className,
  backdropClassName,
  ...props
}: ImageZoomProps) => (
  <div
    className={cn(
      "relative",
      "[&_[data-rmiz-ghost]]:pointer-events-none [&_[data-rmiz-ghost]]:absolute",
      "[&_[data-rmiz-btn-zoom]]:absolute [&_[data-rmiz-btn-zoom]]:inset-0 [&_[data-rmiz-btn-zoom]]:z-10 [&_[data-rmiz-btn-zoom]]:m-0 [&_[data-rmiz-btn-zoom]]:size-full [&_[data-rmiz-btn-zoom]]:touch-manipulation [&_[data-rmiz-btn-zoom]]:appearance-none [&_[data-rmiz-btn-zoom]]:border-none [&_[data-rmiz-btn-zoom]]:bg-transparent [&_[data-rmiz-btn-zoom]]:p-0 [&_[data-rmiz-btn-zoom]]:text-transparent [&_[data-rmiz-btn-zoom]]:outline-offset-2",
      "[&_[data-rmiz-btn-unzoom]]:m-0 [&_[data-rmiz-btn-unzoom]]:size-10 [&_[data-rmiz-btn-unzoom]]:touch-manipulation [&_[data-rmiz-btn-unzoom]]:appearance-none [&_[data-rmiz-btn-unzoom]]:rounded-[50%] [&_[data-rmiz-btn-unzoom]]:border-none [&_[data-rmiz-btn-unzoom]]:bg-foreground/70 [&_[data-rmiz-btn-unzoom]]:p-2 [&_[data-rmiz-btn-unzoom]]:text-background [&_[data-rmiz-btn-unzoom]]:outline-offset-2",
      "[&_[data-rmiz-btn-zoom]]:cursor-zoom-in [&_[data-rmiz-btn-zoom]_svg]:hidden",
      "[&_[data-rmiz-btn-unzoom]]:absolute [&_[data-rmiz-btn-unzoom]]:top-5 [&_[data-rmiz-btn-unzoom]]:right-5 [&_[data-rmiz-btn-unzoom]]:bottom-auto [&_[data-rmiz-btn-unzoom]]:left-auto [&_[data-rmiz-btn-unzoom]]:z-[1] [&_[data-rmiz-btn-unzoom]]:cursor-zoom-out",
      '[&_[data-rmiz-content="found"]_img]:cursor-zoom-in',
      '[&_[data-rmiz-content="found"]_svg]:cursor-zoom-in',
      '[&_[data-rmiz-content="found"]_[role="img"]]:cursor-zoom-in',
      '[&_[data-rmiz-content="found"]_[data-zoom]]:cursor-zoom-in',
      className
    )}
  >
    <Zoom
      classDialog={cn(
        "[&::backdrop]:hidden",
        "[&[open]]:fixed [&[open]]:m-0 [&[open]]:h-dvh [&[open]]:max-h-none [&[open]]:w-dvw [&[open]]:max-w-none [&[open]]:overflow-hidden [&[open]]:border-0 [&[open]]:bg-transparent [&[open]]:p-0",
        "[&_[data-rmiz-modal-overlay]]:absolute [&_[data-rmiz-modal-overlay]]:inset-0 [&_[data-rmiz-modal-overlay]]:transition-all",
        '[&_[data-rmiz-modal-overlay="hidden"]]:bg-transparent',
        '[&_[data-rmiz-modal-overlay="visible"]]:bg-background/80 [&_[data-rmiz-modal-overlay="visible"]]:backdrop-blur-md',
        "[&_[data-rmiz-modal-content]]:relative [&_[data-rmiz-modal-content]]:size-full",
        "[&_[data-rmiz-modal-img]]:absolute [&_[data-rmiz-modal-img]]:origin-top-left [&_[data-rmiz-modal-img]]:cursor-zoom-out [&_[data-rmiz-modal-img]]:transition-transform",
        "motion-reduce:[&_[data-rmiz-modal-img]]:transition-none motion-reduce:[&_[data-rmiz-modal-overlay]]:transition-none",
        backdropClassName
      )}
      {...props}
    />
  </div>
);
