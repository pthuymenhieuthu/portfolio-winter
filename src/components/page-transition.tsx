"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const columns = [
  {
    color: "#BE89FF",
    delay: 0.2,
  },
  {
    color: "#D4B1FF",
    delay: 0.1,
  },
  {
    color: "#FFE1FE",
    delay: 0,
  },
  {
    color: "#D4B1FF",
    delay: 0.1,
  },
  {
    color: "#BE89FF",
    delay: 0.2,
  },
] as const;

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
      setPhase("cover");
      setIsActive(true);

      routeTimer.current = window.setTimeout(() => {
        router.push(href);
      }, 880);
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
      cleanupTimer.current = window.setTimeout(() => {
        pendingPath.current = null;
        setIsActive(false);
      }, 980);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isActive, pathname]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[80] overflow-hidden ${
        isActive ? "block" : "hidden"
      }`}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#be89ff] via-[#d4b1ff] to-[#ffe1fe]"
        animate={{ scaleX: phase === "cover" ? 1 : 0, opacity: phase === "cover" ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-x-[-2vw] bottom-0 flex h-[116dvh]">
        {columns.map((column, index) => (
          <motion.div
            className="relative -mx-[0.3vw] h-full flex-1 origin-bottom overflow-hidden"
            key={`${column.color}-${index}`}
            animate={{ y: phase === "cover" ? "0%" : "-112%" }}
            initial={{ y: "100%" }}
            transition={{
              delay: phase === "cover" ? column.delay : 0.1 - Math.min(column.delay, 0.1),
              duration: phase === "cover" ? 0.68 : 0.74,
              ease: phase === "cover" ? [0.76, 0, 0.24, 1] : [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="absolute inset-0 h-full w-full"
              style={{ backgroundColor: column.color }}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: phase === "cover" ? 1 : 0 }}
        className="absolute inset-x-[-8vw] bottom-[-8vh] h-[55vh] bg-[#d4b1ff]/40 blur-[48px]"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </div>
  );
}
