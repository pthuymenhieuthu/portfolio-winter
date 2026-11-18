"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

const DEPTH_MARKS = [25, 50, 75, 90] as const;
const SECTION_SELECTOR = "main header[id], main section[id], main footer[id], footer[id]";

function getSections() {
  return Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR))
    .filter((section) => section.id && !section.closest("[aria-hidden='true']") && !section.querySelector("section[id]"));
}

function sendEvent(name: string, parameters: Record<string, string | number>, closing = false) {
  const analytics = window as AnalyticsWindow;
  const payload = { ...parameters, ...(closing ? { transport_type: "beacon" } : {}) };
  if (analytics.gtag) analytics.gtag("event", name, payload);
  else analytics.dataLayer?.push(["event", name, payload]);
}

export default function PortfolioAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const pagePath = pathname || "/";
    const sections = getSections();
    const seen = new Set<string>();
    const depthSent = new Set<number>();
    let activeSection: string | null = null;
    let lastSection: string | null = null;
    let focusedSeconds = 0;
    let maxDepth = 0;
    let closed = false;
    let scrollFrame = 0;

    const flushSection = (closing = false) => {
      if (activeSection && focusedSeconds > 0) {
        sendEvent("portfolio_section_time", {
          page_path: pagePath,
          section_id: activeSection,
          focused_seconds: focusedSeconds,
        }, closing);
      }
      focusedSeconds = 0;
    };

    const setSection = (id: string | null) => {
      if (id === activeSection) return;
      flushSection();
      activeSection = id;
      if (id) {
        lastSection = id;
      }
    };

    const updateSection = () => {
      if (document.hidden) return;
      const viewportHeight = window.innerHeight;
      const visibleSections = sections
        .map((section) => {
          const rect = section.getBoundingClientRect();
          const visiblePixels = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          return { id: section.id, visiblePixels };
        });
      const threshold = Math.min(80, viewportHeight * 0.15);
      for (const section of visibleSections) {
        if (section.visiblePixels >= threshold && !seen.has(section.id)) {
          seen.add(section.id);
          sendEvent("portfolio_section_view", { page_path: pagePath, section_id: section.id });
        }
      }
      const visible = visibleSections.sort((a, b) => b.visiblePixels - a.visiblePixels)[0];
      setSection(visible && visible.visiblePixels >= threshold ? visible.id : null);
    };

    const updateDepth = () => {
      const scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const percent = scrollable === 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      maxDepth = Math.max(maxDepth, percent);
      for (const mark of DEPTH_MARKS) {
        if (percent >= mark && !depthSent.has(mark)) {
          depthSent.add(mark);
          sendEvent("portfolio_scroll_depth", { page_path: pagePath, depth_percent: mark });
        }
      }
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateDepth();
        updateSection();
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-analytics-contact]")) {
        sendEvent("portfolio_contact_click", { page_path: pagePath, contact_type: "project_form" });
        return;
      }
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname.startsWith("/blog/")) {
        sendEvent("portfolio_project_open", {
          page_path: pagePath,
          project_id: url.pathname.split("/")[2] || "unknown",
        });
      } else if (url.protocol === "mailto:" || (url.origin === window.location.origin && url.hash === "#contact")) {
        sendEvent("portfolio_contact_click", {
          page_path: pagePath,
          contact_type: url.protocol === "mailto:" ? "email" : "project_form",
        });
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        flushSection(true);
        activeSection = null;
      } else {
        updateSection();
      }
    };

    const onPageHide = () => finish(true);
    const finish = (closing = false) => {
      if (closed) return;
      closed = true;
      flushSection(closing);
      sendEvent("portfolio_page_exit", {
        page_path: pagePath,
        last_section: lastSection || "none",
        max_depth_percent: maxDepth,
      }, closing);
    };

    const observer = new MutationObserver(() => {
      // The route can render its sections after this component mounts.
      const current = getSections();
      if (current.length !== sections.length || current.some((section, index) => section !== sections[index])) {
        sections.splice(0, sections.length, ...current);
        updateSection();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setInterval(() => {
      if (!document.hidden && document.hasFocus() && activeSection) {
        focusedSeconds += 1;
      }
    }, 1000);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);
    updateDepth();
    updateSection();

    return () => {
      finish();
      observer.disconnect();
      window.clearInterval(timer);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname]);

  return null;
}
