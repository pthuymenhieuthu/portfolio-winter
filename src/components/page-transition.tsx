"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";

const RIBBON_PATHS = {
  back: "M 0 12 Q 50 0 100 12 V 116 Q 50 128 0 116 Z",
  front: "M 0 16 Q 50 3 100 16 V 112 Q 50 128 0 112 Z",
} as const;

function getTransitionTiming(isMobile: boolean) {
  return {
    backDuration: 0.64,
    frontDuration: 0.68,
    frontDelay: 0.06,
    backRevealDuration: 0.42,
    frontRevealDuration: 0.48,
    routeDelay: isMobile ? 220 : 770,
    cleanupDelay: isMobile ? 260 : 540,
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

function clearTimer(timer: MutableRefObject<number | null>) {
  if (timer.current !== null) {
    window.clearTimeout(timer.current);
    timer.current = null;
  }
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"cover" | "reveal">("cover");
  const pendingPath = useRef<string | null>(null);
  const routeTimer = useRef<number | null>(null);
  const cleanupTimer = useRef<number | null>(null);
  const watchdogTimer = useRef<number | null>(null);

  const revealAndReset = useCallback(() => {
    clearTimer(watchdogTimer);
    setPhase("reveal");

    const timing = getTransitionTiming(isMobile);
    clearTimer(cleanupTimer);
    cleanupTimer.current = window.setTimeout(() => {
      pendingPath.current = null;
      setIsActive(false);
      cleanupTimer.current = null;
    }, timing.cleanupDelay);
  }, [isMobile]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobile(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    return () => {
      clearTimer(routeTimer);
      clearTimer(cleanupTimer);
      clearTimer(watchdogTimer);
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

      const mobileViewport = window.matchMedia("(max-width: 767px)").matches;
      const timing = getTransitionTiming(mobileViewport);
      clearTimer(routeTimer);
      clearTimer(cleanupTimer);
      clearTimer(watchdogTimer);
      routeTimer.current = window.setTimeout(() => {
        router.push(href);
        routeTimer.current = null;
      }, timing.routeDelay);

      // A failed/slow route must never leave the full-screen transition mounted.
      // This also protects local development when Next's incremental cache is rebuilding.
      watchdogTimer.current = window.setTimeout(
        revealAndReset,
        timing.routeDelay + 4000
      );
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isActive, revealAndReset, router, shouldReduceMotion]);

  useEffect(() => {
    if (!isActive || pendingPath.current !== pathname) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      revealAndReset();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isActive, pathname, revealAndReset]);

  if (shouldReduceMotion || !isActive) {
    return null;
  }

  const timing = getTransitionTiming(isMobile);

  if (isMobile) {
    return (
      <motion.div
        aria-hidden="true"
        animate={{ opacity: phase === "cover" ? 1 : 0 }}
        className="pointer-events-auto fixed inset-0 z-[100] bg-[linear-gradient(180deg,#f8fcff_0%,#dff5ff_48%,#c3e1ff_100%)]"
        initial={{ opacity: 0 }}
        style={{ willChange: "opacity" }}
        transition={{
          duration: phase === "cover" ? 0.22 : 0.24,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    );
  }

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
          <path d={RIBBON_PATHS.back} fill="#EAF8FF" />
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
              <stop offset="2.6%" stopColor="#FFFFFF" />
              <stop offset="48.48%" stopColor="#AFE7FC" />
              <stop offset="76.98%" stopColor="#A8D1FF" />
            </linearGradient>
          </defs>
          <path d={RIBBON_PATHS.front} fill="url(#page-transition-gradient)" />
        </svg>
      </motion.div>
    </div>
  );
}
