"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { setPageTransitionActive } from "@/lib/page-transition";

type NativeViewTransition = { ready: Promise<void>; finished: Promise<void>; skipTransition: () => void };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => NativeViewTransition;
};

// Native View Transitions suppress painting while their update callback runs.
// Yield with a task rather than waiting for a frame that the browser may defer.
const settleLayout = () => new Promise<void>(resolve => setTimeout(resolve, 0));

async function destinationReady() {
  // Let route scroll restoration and layout effects finish before taking the new snapshot.
  await settleLayout();
  const images = Array.from(document.images).filter(image => {
    if (image.closest("[data-page-snapshot]")) return false;
    const rect = image.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
  }).slice(0, 6);
  const cleanups: (() => void)[] = [];
  const loaded = images.map(image => new Promise<void>(resolve => {
    const decode = () => { void image.decode().catch(() => {}).then(resolve); };
    if (image.complete) decode();
    else {
      const finish = () => {
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);
        decode();
      };
      cleanups.push(() => { image.removeEventListener("load", finish); image.removeEventListener("error", finish); });
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    }
  }));
  let timer = 0;
  await Promise.race([
    Promise.all([...loaded, document.fonts.ready]),
    new Promise<void>(resolve => { timer = window.setTimeout(resolve, 1200); }),
  ]);
  clearTimeout(timer);
  cleanups.forEach(cleanup => cleanup());
  await settleLayout();
}

function snapshotVisiblePage() {
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.dataset.pageSnapshot = "";
  layer.inert = true;
  layer.style.cssText = "position:fixed;inset:0;z-index:1000;overflow:hidden;pointer-events:auto;background:white";
  const scrollPositions: [HTMLElement, number, number][] = [];
  const copyVisible = (element: HTMLElement): HTMLElement | null => {
    if (["SCRIPT", "LINK", "STYLE", "DIALOG"].includes(element.tagName) || element.hasAttribute("data-page-snapshot")) return null;
    const rect = element.getBoundingClientRect();
    // Keep offscreen block geometry, without cloning every screenshot, shader and control below it.
    const offscreen = rect.width > 0 && rect.height > 0 && (rect.bottom < 0 || rect.top > innerHeight);
    if (offscreen && element.matches("section,article,figure,li,tr,[data-screen-carousel]")) {
      const spacer = element.cloneNode(false) as HTMLElement;
      spacer.style.height = rect.height + "px";
      spacer.style.boxSizing = "border-box";
      return spacer;
    }
    const copy = element.cloneNode(false) as HTMLElement;
    if (element instanceof HTMLCanvasElement && copy instanceof HTMLCanvasElement) {
      try { copy.getContext("2d")?.drawImage(element, 0, 0); } catch { /* Retain the page's CSS background if a GPU surface cannot be copied. */ }
    } else {
      for (const child of Array.from(element.childNodes)) {
        const node = child instanceof HTMLElement ? copyVisible(child) : child.cloneNode(true);
        if (node) copy.appendChild(node);
      }
    }
    if (element.scrollTop || element.scrollLeft) scrollPositions.push([copy, element.scrollTop, element.scrollLeft]);
    return copy;
  };
  for (const child of Array.from(document.body.children)) {
    if (!(child instanceof HTMLElement)) continue;
    const rect = child.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const copy = copyVisible(child);
    if (!copy) continue;
    Object.assign(copy.style, { position: "absolute", top: rect.top + "px", left: rect.left + "px", width: rect.width + "px", height: rect.height + "px", margin: "0" });
    layer.appendChild(copy);
  }
  document.body.appendChild(layer);
  scrollPositions.forEach(([copy, top, left]) => { copy.scrollTop = top; copy.scrollLeft = left; });
  return layer;
}

export function PageRippleTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const readyRef = useRef<(() => void) | null>(null);
  const destinationRef = useRef("");
  const finishRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (pathname === destinationRef.current) {
      const ready = readyRef.current;
      readyRef.current = null;
      ready?.();
    } else if (finishRef.current) finishRef.current();
  }, [pathname]);

  useEffect(() => {
    const prefetched = new Set<string>();
    const internalLink = (target: EventTarget | null) => {
      const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return null;
      const url = new URL(anchor.href, location.href);
      return url.origin === location.origin && url.pathname !== location.pathname ? { anchor, url } : null;
    };
    const prefetch = (event: Event) => {
      const link = internalLink(event.target);
      if (!link || prefetched.has(link.url.pathname)) return;
      prefetched.add(link.url.pathname);
      router.prefetch(link.url.pathname + link.url.search);
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = internalLink(event.target);
      if (!link || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault(); event.stopPropagation();
      if (finishRef.current) return;
      const { anchor, url } = link;
      const bounds = anchor.getBoundingClientRect();
      const x = Math.max(0, Math.min(innerWidth, event.detail ? event.clientX : bounds.left + bounds.width / 2));
      const y = Math.max(0, Math.min(innerHeight, event.detail ? event.clientY : bounds.top + bounds.height / 2));
      const radius = Math.max(Math.hypot(x, y), Math.hypot(innerWidth - x, y), Math.hypot(x, innerHeight - y), Math.hypot(innerWidth - x, innerHeight - y)) + 40;
      const destination = url.pathname + url.search + url.hash;
      destinationRef.current = url.pathname;
      let snapshot: HTMLElement | null = null;
      let animation: Animation | null = null;
      let native: NativeViewTransition | null = null;
      let release: (() => void) | null = null;
      let pushed = false;
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        readyRef.current = null;
        release?.(); release = null;
        animation?.cancel();
        snapshot?.remove();
        setPageTransitionActive(false);
        finishRef.current = null;
      };
      finishRef.current = finish;
      const timer = window.setTimeout(() => { native?.skipTransition(); finish(); }, 8000);
      const navigate = () => {
        pushed = true;
        router.push(destination);
      };
      const startViewTransition = (document as ViewTransitionDocument).startViewTransition;
      if (startViewTransition) {
        try {
          native = startViewTransition.call(document, () => new Promise<void>(resolve => {
            setPageTransitionActive(true);
            release = resolve;
            readyRef.current = () => { void destinationReady().then(resolve, resolve); };
            navigate();
          }));
          native.ready.then(() => {
            if (finished) return;
            animation = document.documentElement.animate(
              { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
              { duration: 760, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both", pseudoElement: "::view-transition-new(root)" } as KeyframeAnimationOptions & { pseudoElement: string },
            );
          }).catch(() => { if (!pushed) navigate(); finish(); });
          native.finished.then(finish, finish);
        } catch { navigate(); finish(); }
        return;
      }
      snapshot = snapshotVisiblePage();
      setPageTransitionActive(true);
      readyRef.current = () => { void destinationReady().then(() => {
        if (finished || !snapshot) return;
        // Animate a fixed mask in the browser, rather than rebuilding a gradient on every JS frame.
        const diameter = radius * 2;
        snapshot.style.maskImage = "linear-gradient(#000,#000),radial-gradient(closest-side,#000 calc(100% - 20px),transparent 100%)";
        snapshot.style.webkitMaskImage = snapshot.style.maskImage;
        snapshot.style.maskComposite = "exclude";
        snapshot.style.webkitMaskComposite = "xor";
        snapshot.style.maskRepeat = "no-repeat";
        snapshot.style.webkitMaskRepeat = "no-repeat";
        animation = snapshot.animate({
          maskSize: ["100% 100%,1px 1px", `100% 100%,${diameter}px ${diameter}px`],
          maskPosition: [`0 0,${x - 0.5}px ${y - 0.5}px`, `0 0,${x - radius}px ${y - radius}px`],
          webkitMaskSize: ["100% 100%,1px 1px", `100% 100%,${diameter}px ${diameter}px`],
          webkitMaskPosition: [`0 0,${x - 0.5}px ${y - 0.5}px`, `0 0,${x - radius}px ${y - radius}px`],
        }, { duration: 760, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" });
        animation.finished.then(finish, finish);
      }, finish); };
      navigate();
    };
    const cancel = () => finishRef.current?.();
    document.addEventListener("pointerover", prefetch, { passive: true });
    document.addEventListener("focusin", prefetch);
    document.addEventListener("touchstart", prefetch, { passive: true });
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", cancel);
    return () => {
      document.removeEventListener("pointerover", prefetch);
      document.removeEventListener("focusin", prefetch);
      document.removeEventListener("touchstart", prefetch);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", cancel);
      finishRef.current?.();
    };
  }, [router]);

  return null;
}
