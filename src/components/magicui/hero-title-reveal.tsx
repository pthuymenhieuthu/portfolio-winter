"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type HeroTitleRevealProps = {
  className?: string;
  delay?: number;
  lines?: readonly string[];
  text: string;
  wrap?: boolean;
};

const CHARACTER_DELAY = 0.035;
const DURATION = 0.64;

export function HeroTitleReveal({
  className,
  delay = 0,
  lines,
  text,
  wrap = false,
}: HeroTitleRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const characters = useMemo(() => Array.from(text), [text]);
  const words = useMemo(() => text.split(/(\s+)/), [text]);

  if (lines?.length) {
    let characterIndex = 0;

    return (
      <h1
        aria-label={text}
        className={cn("flex w-full min-w-0 flex-col items-start whitespace-normal", className)}
      >
        {lines.map((line, lineIndex) => (
          <span
            aria-hidden="true"
            className="-mb-[0.12em] flex overflow-hidden pb-[0.12em] pr-[0.08em] whitespace-nowrap"
            key={`${line}-${lineIndex}`}
          >
            {Array.from(line).map((character) => {
              const index = characterIndex++;

              return (
                <span
                  className="inline-block overflow-visible"
                  key={`${character}-${lineIndex}-${index}`}
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
              );
            })}
          </span>
        ))}
      </h1>
    );
  }

  if (wrap) {
    let characterIndex = 0;

    return (
      <h1
        aria-label={text}
        className={cn("flex w-full min-w-0 flex-wrap justify-center gap-x-[0.28em] whitespace-normal", className)}
      >
        {words.map((word, wordIndex) => {
          if (/^\s+$/.test(word)) {
            return null;
          }

          return (
            <span
              aria-hidden="true"
              className="-mb-[0.12em] inline-flex shrink-0 overflow-hidden pb-[0.12em] pr-[0.08em]"
              key={`${word}-${wordIndex}`}
            >
              {Array.from(word).map((character) => {
                const index = characterIndex++;

                return (
                  <span className="inline-block overflow-visible" key={`${character}-${index}`}>
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
                      {character}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </h1>
    );
  }

  return (
    <h1
      aria-label={text}
      className={cn(
        "-mb-[0.12em] flex justify-center overflow-hidden pb-[0.12em] pr-[0.08em] whitespace-nowrap",
        className
      )}
    >
      {characters.map((character, index) => (
        <span
          aria-hidden="true"
          className="inline-block overflow-visible"
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
