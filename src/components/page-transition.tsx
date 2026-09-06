"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const RIBBON_PATHS = {
  back: "M 0 12 Q 50 0 100 12 V 116 Q 50 128 0 116 Z",
  front: "M 0 16 Q 50 3 100 16 V 112 Q 50 128 0 112 Z",
} as const;

function getTransitionTiming() {
  const isMobile = window.matchMedia("(max-width: 639px)").matches;

  return {
    backDuration: isMobile ? 0.58 : 0.64,
    frontDuration: isMobile ? 0.6 : 0.68,
    frontDelay: isMobile ? 0.05 : 0.06,
    backRevealDuration: isMobile ? 0.38 : 0.42,
    frontRevealDuration: isMobile ? 0.44 : 0.48,
    routeDelay: isMobile ? 690 : 770,
    cleanupDelay: isMobile ? 500 : 540,
  };
}

function getInternalHref(anchor: HTMLAnchorElement) {
  if (
    anchor.target === "_blank" ||
    anchor.hasAttribute("download") ||
    anchor.dataset.transition === "false"
  ) {
    return null;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  const url = new URL(anchor.href);
  if (url.origin !== window.location.origin) {
    return null;
  }

  const current = `${window.location.pathname}${window.location.search}`;
  const next = `${url.pathname}${url.search}`;
  if (current === next) {
    return null;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"cover" | "reveal">("cover");
  const pendingPath = useRef<string | null>(null);
  const routeTimer = useRef<number | null>(null);
  const cleanupTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (routeTimer.current) {
        window.clearTimeout(routeTimer.current);
      }
      if (cleanupTimer.current) {
        window.clearTimeout(cleanupTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        isActive
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) {
        return;
      }

      const href = getInternalHref(anchor);
      if (!href) {
        return;
      }

      event.preventDefault();
      pendingPath.current = new URL(href, window.location.origin).pathname;
      router.prefetch(href);
      setPhase("cover");
      setIsActive(true);

      const timing = getTransitionTiming();
      routeTimer.current = window.setTimeout(() => {
        router.push(href);
      }, timing.routeDelay);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isActive, router, shouldReduceMotion]);

  useEffect(() => {
    if (!isActive || pendingPath.current !== pathname) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setPhase("reveal");
      const timing = getTransitionTiming();
      cleanupTimer.current = window.setTimeout(() => {
        pendingPath.current = null;
        setIsActive(false);
      }, timing.cleanupDelay);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isActive, pathname]);

  if (shouldReduceMotion || !isActive) {
    return null;
  }

  const timing = getTransitionTiming();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-auto fixed inset-0 z-[100] overflow-hidden"
    >
      <motion.div
        animate={{
          y: phase === "cover" ? ["100dvh", "-12dvh"] : "-128dvh",
        }}
        className="absolute inset-x-0 top-0 h-[128dvh] transform-gpu"
        initial={{ y: "100dvh" }}
        style={{ willChange: "transform" }}
        transition={{
          duration:
            phase === "cover"
              ? timing.backDuration
              : timing.backRevealDuration,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        <svg
          className="block h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 128"
        >
          <path d={RIBBON_PATHS.back} fill="#FFE1FE" />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: phase === "cover" ? ["100dvh", "-16dvh"] : "-128dvh",
        }}
        className="absolute inset-x-0 top-0 h-[128dvh] transform-gpu"
        initial={{ y: "100dvh" }}
        style={{
          WebkitMaskImage:
            phase === "reveal"
              ? "linear-gradient(to bottom, black 0%, black 86%, transparent 100%)"
              : "none",
          maskImage:
            phase === "reveal"
              ? "linear-gradient(to bottom, black 0%, black 86%, transparent 100%)"
              : "none",
          willChange: "transform",
        }}
        transition={{
          delay: phase === "cover" ? timing.frontDelay : 0,
          duration:
            phase === "cover"
              ? timing.frontDuration
              : timing.frontRevealDuration,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        <svg
          className="block h-full w-full"
          preserveAspectRatio="none"
          style={{
            filter: phase === "reveal" ? "blur(4px)" : "blur(0px)",
            transform: "scaleX(1.015)",
            transition: "filter 180ms ease-out",
          }}
          viewBox="0 0 100 128"
        >
          <defs>
            <linearGradient id="page-transition-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#BE89FF" />
              <stop offset="58%" stopColor="#D4B1FF" />
              <stop offset="100%" stopColor="#F7F7F8" />
            </linearGradient>
          </defs>
          <path d={RIBBON_PATHS.front} fill="url(#page-transition-gradient)" />
        </svg>
      </motion.div>
    </div>
  );
}
