"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CaseStudyScrollHighlight({
  children,
  inverted = false,
}: {
  children: React.ReactNode;
  inverted?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const highlightColor = inverted ? "#8a65c7" : "#ffe58a";

  return (
    <motion.span
      className={cn(
        "inline px-1 py-[0.08em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]",
        inverted && "text-white"
      )}
      initial={shouldReduceMotion ? false : { backgroundSize: "0% 100%" }}
      whileInView={
        shouldReduceMotion ? undefined : { backgroundSize: "100% 100%" }
      }
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </motion.span>
  );
}
