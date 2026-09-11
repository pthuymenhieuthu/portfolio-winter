"use client";

import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroCtaButtons() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");

    if (!projectsSection) return;

    projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#projects");
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        aria-label="View projects"
        className="inline-flex size-11 items-center justify-center rounded-full bg-transparent text-[#29303B]/60 transition-colors duration-300 hover:text-[#29303B]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/35"
        onClick={scrollToProjects}
      >
        <motion.span
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
          className="inline-flex"
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  delay: 1.9,
                  duration: 1.45,
                  ease: [0.45, 0, 0.2, 1],
                  repeat: Infinity,
                  repeatDelay: 0.45,
                }
          }
        >
          <ArrowDown className="size-5" strokeWidth={1.8} />
        </motion.span>
      </button>
    </div>
  );
}
