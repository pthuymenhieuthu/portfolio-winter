"use client";

import { useEffect, useState } from "react";
import { scrollToPosition } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

export type CaseStudySection = {
  id: string;
  label: string;
};

export function CaseStudySectionNavigation({
  heroId,
  revealAfter,
  sections,
}: {
  heroId: string;
  revealAfter?: number;
  sections: readonly CaseStudySection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [isVisible, setIsVisible] = useState(false);

  const activeSection =
    sections.find((section) => section.id === activeId) ?? sections[0];

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const target = document.getElementById(id);
    if (!target) return;
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    scrollToPosition(window.scrollY + target.getBoundingClientRect().top - margin);
  };

  useEffect(() => {
    const hero = document.getElementById(heroId);
    let animationFrame = 0;

    const updateNavigation = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        if (!hero) return;

        const shouldShow = hero.getBoundingClientRect().bottom <= 0 &&
          (revealAfter === undefined || window.scrollY > revealAfter);
        setIsVisible(shouldShow);

        const readingLine = window.innerHeight * 0.3;
        let currentSection = sections[0];

        sections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= readingLine) {
            currentSection = section;
          }
        });

        if (currentSection) setActiveId(currentSection.id);
      });
    };

    updateNavigation();
    window.addEventListener("load", updateNavigation);
    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);
    const heroResize = new ResizeObserver(updateNavigation);
    if (hero) heroResize.observe(hero);
    const delayedUpdate = window.setTimeout(updateNavigation, 250);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(delayedUpdate);
      window.removeEventListener("load", updateNavigation);
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
      heroResize.disconnect();
    };
  }, [heroId, revealAfter, sections]);

  if (!activeSection) return null;

  return (
    <>
      <nav
        aria-label="Case study sections"
        aria-hidden={!isVisible}
        data-visible={isVisible}
        className={cn(
          "pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-[transform,opacity,visibility] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:block",
          isVisible
            ? "visible translate-x-0 opacity-100"
            : "invisible -translate-x-[calc(100%+1.25rem)] opacity-0"
        )}
      >
        <ol className="flex flex-col gap-1.5">
          {sections.map((section) => {
            const isActive = section.id === activeId;

            return (
              <li key={section.id}>
                <button
                  type="button"
                  aria-current={isActive ? "location" : undefined}
                  aria-label={`Go to ${section.label}`}
                  onClick={() => scrollToSection(section.id)}
                  className="group pointer-events-auto flex min-h-7 items-center gap-2 text-left focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "block size-1.5 shrink-0 rounded-full bg-[#3BA0FF]/90 transition-all duration-300 group-hover:scale-150 group-focus-visible:scale-150",
                      isActive
                        ? "scale-150 shadow-[0_0_0_4px_rgba(59,160,255,0.14)]"
                        : "opacity-35"
                    )}
                  />
                  <span
                    className={cn(
                      "max-w-0 overflow-hidden whitespace-nowrap rounded bg-black/85 px-0 py-1 text-xs text-white opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:max-w-48 group-hover:px-2 group-hover:opacity-100 group-focus-visible:max-w-48 group-focus-visible:px-2 group-focus-visible:opacity-100",
                      isActive && "max-w-48 px-2 opacity-100"
                    )}
                  >
                    {section.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

    </>
  );
}
