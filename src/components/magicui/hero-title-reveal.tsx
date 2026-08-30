"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type HeroTitleRevealProps = {
  className?: string;
  delay?: number;
  text: string;
};

const CHARACTER_DELAY = 0.035;
const DURATION = 0.64;

export function HeroTitleReveal({
  className,
  delay = 0,
  text,
}: HeroTitleRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const characters = useMemo(() => Array.from(text), [text]);

  return (
    <h1 aria-label={text} className={cn("flex justify-center whitespace-nowrap", className)}>
      {characters.map((character, index) => (
        <span
          aria-hidden="true"
          className="inline-block overflow-hidden"
          key={`${character}-${index}`}
          style={{ width: character === " " ? "0.28em" : "auto" }}
        >
          <motion.span
            animate={{ opacity: 1, y: "0em" }}
            className="inline-block"
            initial={shouldReduceMotion ? false : { opacity: 0, y: "1.05em" }}
            transition={{
              delay: shouldReduceMotion ? 0 : delay + index * CHARACTER_DELAY,
              duration: shouldReduceMotion ? 0 : DURATION,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
