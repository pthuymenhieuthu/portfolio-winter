"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CaseStudySection = {
  id: string;
  label: string;
};

export function CaseStudySectionNavigation({
  heroId,
  sections,
}: {
  heroId: string;
  sections: readonly CaseStudySection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeSection =
    sections.find((section) => section.id === activeId) ?? sections[0];

  const scrollToSection = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const hero = document.getElementById(heroId);
    let animationFrame = 0;

    const updateNavigation = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        if (!hero) return;

        const shouldShow = hero.getBoundingClientRect().bottom <= 48;
        setIsVisible(shouldShow);
        if (!shouldShow) setIsMenuOpen(false);

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
    const delayedUpdate = window.setTimeout(updateNavigation, 250);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(delayedUpdate);
      window.removeEventListener("load", updateNavigation);
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, [heroId, sections]);

  if (!activeSection) return null;

  return (
    <>
      <nav
        aria-label="Case study sections"
        aria-hidden={!isVisible}
        className={cn(
          "pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition duration-500 ease-out md:block",
          isVisible
            ? "visible translate-x-0 opacity-100"
            : "invisible -translate-x-4 opacity-0"
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
                      "block size-1.5 shrink-0 rounded-full bg-[#8f47ff] transition-all duration-300 group-hover:scale-150 group-focus-visible:scale-150",
                      isActive
                        ? "scale-150 shadow-[0_0_0_4px_rgba(143,71,255,0.14)]"
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

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-out md:hidden",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls={`${heroId}-mobile-section-menu`}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="pointer-events-auto flex h-10 w-full items-center justify-center gap-1.5 border-b border-black/10 bg-white/70 px-4 text-[13px] text-black shadow-[0_8px_30px_rgba(22,5,31,0.12)] backdrop-blur-xl backdrop-saturate-150"
        >
          <span>{activeSection.label}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-3.5 transition-transform duration-300",
              isMenuOpen && "rotate-180"
            )}
          />
        </button>

        <div
          aria-hidden={!isMenuOpen}
          id={`${heroId}-mobile-section-menu`}
          className={cn(
            "pointer-events-auto mx-3 mt-2 max-h-[min(70vh,520px)] overflow-y-auto rounded-lg border border-black/10 bg-white/80 p-1.5 shadow-[0_12px_36px_rgba(22,5,31,0.16)] backdrop-blur-xl backdrop-saturate-150 transition duration-200",
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none -translate-y-2 opacity-0"
          )}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              aria-current={section.id === activeId ? "location" : undefined}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition-colors",
                section.id === activeId
                  ? "bg-[#f2e8ff] font-bold text-[#6f24dc]"
                  : "text-black/70 hover:bg-black/[0.04]"
              )}
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full bg-[#8f47ff]",
                  section.id === activeId ? "opacity-100" : "opacity-35"
                )}
              />
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
