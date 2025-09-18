"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GridBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:24px_24px]",
        className
      )}
    />
  );
}