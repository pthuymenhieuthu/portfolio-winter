"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type NativeViewTransition = { ready: Promise<void>; finished: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => NativeViewTransition;
};

function snapshotVisiblePage() {
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:fixed;inset:0;z-index:1000;overflow:hidden;pointer-events:auto;background:white";
  for (const child of Array.from(document.body.children)) {
    if (!(child instanceof HTMLElement) || ["SCRIPT", "CANVAS", "LINK", "DIALOG"].includes(child.tagName) || child.hasAttribute("data-page-snapshot")) continue;
    const rect = child.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const copy = child.cloneNode(true) as HTMLElement;
    copy.style.position = "absolute";
    copy.style.top = rect.top + "px";
    copy.style.left = rect.left + "px";
    copy.style.width = rect.width + "px";
    copy.style.height = rect.height + "px";
    copy.style.margin = "0";
    const originals = child.querySelectorAll("*");
    const copies = copy.querySelectorAll("*");
    originals.forEach((node, index) => {
      if (node.scrollTop) copies[index].scrollTop = node.scrollTop;
      if (node.scrollLeft) copies[index].scrollLeft = node.scrollLeft;
    });
    layer.appendChild(copy);
  }
  layer.dataset.pageSnapshot = "";
  document.body.appendChild(layer);
  return layer;
}

export function PageRippleTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const phaseRef = useRef<"idle" | "native" | "snapshot">("idle");
  const snapshotRef = useRef<HTMLElement | null>(null);
  const originRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const timeoutRef = useRef(0);
  const routeReadyRef = useRef<(() => void) | null>(null);

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current);
    clearTimeout(timeoutRef.current);
    snapshotRef.current?.remove();
    snapshotRef.current = null;
  }, []);

  const revealSnapshot = () => {
    if (phaseRef.current !== "snapshot" || !snapshotRef.current) return;
    clearTimeout(timeoutRef.current);
    const layer = snapshotRef.current;
    const { x, y } = originRef.current;
    const radius = Math.max(
      Math.hypot(x, y), Math.hypot(innerWidth - x, y),
      Math.hypot(x, innerHeight - y), Math.hypot(innerWidth - x, innerHeight - y),
    ) + 40;
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - started) / 760, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const r = eased * radius;
      const mask = "radial-gradient(circle at " + x + "px " + y + "px, transparent " + Math.max(0, r - 20) + "px, black " + (r + 20) + "px)";
      layer.style.maskImage = mask;
      layer.style.webkitMaskImage = mask;
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
      else {
        layer.remove();
        snapshotRef.current = null;
        phaseRef.current = "idle";
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    routeReadyRef.current?.();
    routeReadyRef.current = null;
    if (phaseRef.current === "snapshot") frameRef.current = requestAnimationFrame(revealSnapshot);
  // The new route begins the reveal, so it shows the destination rather than a color sheet.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (phaseRef.current !== "idle" || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      event.stopPropagation();
      const destination = url.pathname + url.search + url.hash;
      const x = event.clientX;
      const y = event.clientY;
      const startViewTransition = (document as ViewTransitionDocument).startViewTransition;
      if (startViewTransition) {
        const radius = Math.max(
          Math.hypot(x, y), Math.hypot(innerWidth - x, y),
          Math.hypot(x, innerHeight - y), Math.hypot(innerWidth - x, innerHeight - y),
        );
        phaseRef.current = "native";
        const transition = startViewTransition.call(document, () => new Promise<void>((resolve) => {
          routeReadyRef.current = resolve;
          router.push(destination);
          timeoutRef.current = window.setTimeout(() => {
            routeReadyRef.current?.();
            routeReadyRef.current = null;
          }, 4000);
        }));
        transition.ready.then(() => {
          clearTimeout(timeoutRef.current);
          document.documentElement.animate(
            { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
            {
              duration: 760,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
              pseudoElement: "::view-transition-new(root)",
            } as KeyframeAnimationOptions & { pseudoElement: string },
          );
        }).catch(() => {
          routeReadyRef.current?.();
          routeReadyRef.current = null;
        });
        transition.finished.finally(() => { phaseRef.current = "idle"; });
        return;
      }

      originRef.current = { x, y };
      snapshotRef.current = snapshotVisiblePage();
      phaseRef.current = "snapshot";
      router.push(destination);
      timeoutRef.current = window.setTimeout(revealSnapshot, 4000);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return null;
}
