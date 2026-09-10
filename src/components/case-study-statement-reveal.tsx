"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

function RevealWord({
  word,
  index,
  total,
  progress,
  color,
  mutedColor,
  reduceMotion,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  color: string;
  mutedColor: string;
  reduceMotion: boolean;
}) {
  const start = index / total;
  const end = Math.min((index + 1.15) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const animatedColor = useTransform(progress, [start, end], [mutedColor, color]);

  return (
    <motion.span
      aria-hidden="true"
      className="mr-[0.22em] inline-block"
      style={reduceMotion ? { color, opacity: 1 } : { color: animatedColor, opacity }}
    >
      {word}
    </motion.span>
  );
}

export function CaseStudyStatementReveal({
  text,
  color = "#08090a",
  mutedColor = "#c8c8c8",
  className,
}: {
  text: string;
  color?: string;
  mutedColor?: string;
  className?: string;
}) {
  const target = useRef<HTMLQuoteElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.88", "end 0.34"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.22,
  });
  const words = text.split(" ");

  return (
    <motion.blockquote
      ref={target}
      aria-label={text}
      className={cn(
        "max-w-[920px] py-2 font-[var(--font-affina-heading)] text-[30px] leading-[1.2] sm:text-[46px]",
        className
      )}
    >
      {words.map((word, index) => (
        <RevealWord
          color={color}
          index={index}
          key={`${word}-${index}`}
          mutedColor={mutedColor}
          progress={progress}
          reduceMotion={Boolean(shouldReduceMotion)}
          total={words.length}
          word={word}
        />
      ))}
    </motion.blockquote>
  );
}
