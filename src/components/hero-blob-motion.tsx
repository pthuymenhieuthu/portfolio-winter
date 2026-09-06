"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function HeroBlobMotion({
  children,
  className,
  position,
}: {
  children: ReactNode;
  className: string;
  position: "top" | "bottom";
}) {
  const shouldReduceMotion = useReducedMotion();
  const isTop = position === "top";

  return (
    <div className={className}>
      <motion.div
        animate={{ filter: "blur(0px)", opacity: 1, scale: 1, x: 0, y: 0 }}
        className="transform-gpu"
        initial={
          shouldReduceMotion
            ? false
            : {
                filter: "blur(6px)",
                opacity: 0.62,
                scale: 1.06,
                x: isTop ? "-3vw" : "3vw",
                y: isTop ? -88 : 108,
              }
        }
        style={{ willChange: "transform, opacity, filter" }}
        transition={{
          delay: shouldReduceMotion ? 0 : isTop ? 0.08 : 0.44,
          duration: shouldReduceMotion ? 0 : 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
