"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import "./page-ripple-transition.css";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => { finished: Promise<void> };
};

// ReverseUI's shader transitions two images. Native browser snapshots let us
// apply its ripple reveal to real pages without slow DOM rasterization.
export function PageRippleTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<(() => void) | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    pending.current?.();
    pending.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (busy.current || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const viewDocument = document as ViewTransitionDocument;
      if (!viewDocument.startViewTransition) return;

      event.preventDefault();
      event.stopPropagation();
      busy.current = true;
      document.documentElement.style.setProperty("--page-ripple-x", event.clientX + "px");
      document.documentElement.style.setProperty("--page-ripple-y", event.clientY + "px");
      document.documentElement.classList.add("page-ripple-active");
      const transition = viewDocument.startViewTransition(() => new Promise<void>((resolve) => {
        const timeout = window.setTimeout(resolve, 4000);
        pending.current = () => { window.clearTimeout(timeout); resolve(); };
        router.push(url.pathname + url.search + url.hash);
      }));
      void transition.finished.catch(() => undefined).finally(() => {
        document.documentElement.classList.remove("page-ripple-active");
        pending.current = null;
        busy.current = false;
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}><filter id="page-ripple-water"><feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="3" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" /></filter></svg>;
}


