"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { resetScrollToTop } from "@/hooks/useLenis";

type NativeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};
type TransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => NativeViewTransition;
};
type PendingRoute = { destination: string; resolve: () => void };

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const outgoing = useRef<SVGFEDisplacementMapElement>(null);
  const incoming = useRef<SVGFEDisplacementMapElement>(null);
  const pending = useRef<PendingRoute | null>(null);
  const active = useRef<NativeViewTransition | null>(null);
  const frame = useRef(0);
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    const complete = pending.current?.destination === pathname ? pending.current : null;
    if (!complete && (!changed || !pathname.startsWith("/blog/"))) return;
    // Next's route commit is complete. Capture its actual hero at the top,
    // after the router's own layout effects have restored the scroll position.
    const timer = setTimeout(() => {
      resetScrollToTop();
      if (complete) {
        complete.resolve();
        if (pending.current === complete) pending.current = null;
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const doc = document as TransitionDocument;
    if (!doc.startViewTransition) return;
    // The experimental horse landing page is intentionally outside this flow.
    if (pathname !== "/classic" && !pathname.startsWith("/blog/")) return;

    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || active.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download") || anchor.dataset.transition === "false") return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin || !url.pathname.startsWith("/blog/") || url.pathname === pathname) return;
      event.preventDefault();
      router.prefetch(url.pathname);
      document.documentElement.dataset.projectWaterTransition = "capturing";

      const transition = doc.startViewTransition!(async () => {
        // The outgoing viewport has already been captured. Clear the old
        // smooth-scroll target before mounting and snapshotting the new route.
        resetScrollToTop();
        await new Promise<void>((resolve) => {
          pending.current = { destination: url.pathname, resolve };
          watchdog.current = setTimeout(() => {
            pending.current = null;
            resolve();
            transition.skipTransition();
          }, 4000);
          router.push(url.pathname + url.search + url.hash, { scroll: true });
        });
      });
      active.current = transition;

      const animate = async () => {
        await transition.ready;
        if (watchdog.current) clearTimeout(watchdog.current);
        document.documentElement.dataset.projectWaterTransition = "running";
        const duration = 1200;
        // Blend both real page snapshots across the entire viewport together.
        // No wipe, clip path, moving edge, or directional reveal.
        const oldView = document.documentElement.animate([
          { opacity: 1 },
          { opacity: 0 },
        ], { duration, fill: "both", easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-old(root)" });
        const newView = document.documentElement.animate([
          { opacity: 0 },
          { opacity: 1 },
        ], { duration, fill: "both", easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" });
        const start = performance.now();
        const refract = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const swell = Math.sin(progress * Math.PI);
          outgoing.current?.setAttribute("scale", String(swell * 185));
          incoming.current?.setAttribute("scale", String(swell * 145));
          if (progress < 1) frame.current = requestAnimationFrame(refract);
        };
        frame.current = requestAnimationFrame(refract);
        await Promise.all([oldView.finished, newView.finished]);
      };
      // Unsupported snapshot animation, a slow route, or a cancelled transition
      // must leave normal navigation usable rather than trap the viewport.
      void animate().catch(() => transition.skipTransition());
      void transition.updateCallbackDone.catch(() => {});
      void transition.finished.catch(() => {}).finally(() => {
        if (active.current !== transition) return;
        cancelAnimationFrame(frame.current);
        if (watchdog.current) clearTimeout(watchdog.current);
        outgoing.current?.setAttribute("scale", "0");
        incoming.current?.setAttribute("scale", "0");
        delete document.documentElement.dataset.projectWaterTransition;
        pending.current = null;
        active.current = null;
      });
    }
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [pathname, router]);

  useEffect(() => () => {
    pending.current?.resolve();
    active.current?.skipTransition();
    cancelAnimationFrame(frame.current);
    if (watchdog.current) clearTimeout(watchdog.current);
    delete document.documentElement.dataset.projectWaterTransition;
  }, []);

  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none fixed" focusable="false">
      <defs>
        <filter id="project-water-out" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.018" numOctaves="2" seed="9" result="water" />
          <feDisplacementMap ref={outgoing} in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="project-water-in" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.018" numOctaves="2" seed="9" result="water" />
          <feDisplacementMap ref={incoming} in="SourceGraphic" in2="water" scale="0" xChannelSelector="G" yChannelSelector="R" />
        </filter>
      </defs>
    </svg>
  );
}
