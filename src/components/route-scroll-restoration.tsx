"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { setScrollPosition } from "@/hooks/useLenis";

let homeScrollPosition = 0;
const isHome = (path: string) => path === "/" || path === "/classic";

export function RouteScrollRestoration() {
  const pathname = usePathname();
  const currentPath = useRef(pathname);
  const leavingHome = useRef(false);

  useLayoutEffect(() => {
    const changed = currentPath.current !== pathname;
    currentPath.current = pathname;
    leavingHome.current = false;
    if (!changed) return;
    const top = isHome(pathname) ? homeScrollPosition : pathname.startsWith("/blog/") ? 0 : null;
    if (top === null) return;
    let frame = 0;
    const timer = setTimeout(() => {
      setScrollPosition(top);
      frame = requestAnimationFrame(() => setScrollPosition(top));
    }, 0);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [pathname]);

  useEffect(() => {
    const remember = () => {
      if (isHome(currentPath.current) && !leavingHome.current) homeScrollPosition = window.scrollY;
    };
    const leave = () => {
      if (!isHome(currentPath.current)) return;
      homeScrollPosition = window.scrollY;
      leavingHome.current = true;
    };
    const navigate = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname !== currentPath.current) leave();
    };
    window.addEventListener("scroll", remember, { passive: true });
    window.addEventListener("popstate", leave);
    document.addEventListener("click", navigate, true);
    return () => {
      window.removeEventListener("scroll", remember);
      window.removeEventListener("popstate", leave);
      document.removeEventListener("click", navigate, true);
    };
  }, []);

  return null;
}
