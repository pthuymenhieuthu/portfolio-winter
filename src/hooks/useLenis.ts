"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function setScrollPosition(top: number) {
  // Reset Lenis's target and velocity as well as the native scroll position.
  // Otherwise its next frame can restore the previous project's scroll depth.
  activeLenis?.scrollTo(top, { immediate: true, force: true });
  window.scrollTo({ top, left: 0, behavior: "instant" as ScrollBehavior });
}

export function useLenis() {
  useEffect(() => {
    // ❌ Bỏ qua nếu đang chạy trên server
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    activeLenis = lenis;
    let frame = 0;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
    };
  }, []);
}
