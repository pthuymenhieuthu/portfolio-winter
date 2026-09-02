"use client";

import { useReducedMotion } from "framer-motion";
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

const mobileColumns = [
  {
    color: "#BE89FF",
    delay: 0.08,
  },
  {
    color: "#FFE1FE",
    delay: 0,
  },
  {
    color: "#BE89FF",
    delay: 0.08,
  },
] as const;

function getTransitionTiming() {
  const isMobile = window.matchMedia("(max-width: 639px)").matches;

  return {
    coverDuration: isMobile ? 0.48 : 0.68,
    revealDuration: isMobile ? 0.56 : 0.74,
    routeDelay: isMobile ? 610 : 940,
    cleanupDelay: isMobile ? 720 : 980,
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

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#be89ff] via-[#d4b1ff] to-[#ffe1fe]"
        data-phase={phase}
        style={{ animation: `transition-line-${phase} 280ms cubic-bezier(0.22, 1, 0.36, 1) both` }}
      />
      {[
        { className: "flex sm:hidden", items: mobileColumns },
        { className: "hidden sm:flex", items: columns },
      ].map(({ className, items }) => (
        <div className={`absolute inset-x-[-2vw] bottom-0 h-[116dvh] ${className}`} key={className}>
          {items.map((column, index) => (
            <div
              className="relative -mx-[0.3vw] h-full flex-1 origin-bottom overflow-hidden"
              key={`${column.color}-${index}`}
              style={{
                animation: `transition-column-${phase} ${
                  phase === "cover"
                    ? className.includes("sm:hidden")
                      ? 480
                      : 680
                    : className.includes("sm:hidden")
                      ? 560
                      : 740
                }ms ${phase === "cover" ? "cubic-bezier(0.76, 0, 0.24, 1)" : "cubic-bezier(0.22, 1, 0.36, 1)"} both`,
                animationDelay: `${
                  phase === "cover" ? column.delay : 0.1 - Math.min(column.delay, 0.1)
                }s`,
                transform: phase === "cover" ? "translate3d(0, 100%, 0)" : "translate3d(0, 0, 0)",
                willChange: "transform",
              }}
            >
              <div
                className="absolute inset-0 h-full w-full"
                style={{ backgroundColor: column.color }}
              />
            </div>
          ))}
        </div>
      ))}
      <div
        className="absolute inset-x-[-8vw] bottom-[-8vh] h-[28vh] bg-[#d4b1ff]/16 blur-[16px] sm:h-[55vh] sm:bg-[#d4b1ff]/40 sm:blur-[48px]"
        style={{ animation: `transition-glow-${phase} 320ms ease-out both` }}
      />
      <style>{`
        @keyframes transition-column-cover {
          from {
            transform: translate3d(0, 100%, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes transition-column-reveal {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(0, -112%, 0);
          }
        }

        @keyframes transition-line-cover {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes transition-line-reveal {
          from {
            opacity: 1;
            transform: scaleX(1);
          }
          to {
            opacity: 0;
            transform: scaleX(0);
          }
        }

        @keyframes transition-glow-cover {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes transition-glow-reveal {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
