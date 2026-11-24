"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CaseStudyBubbleIconButton } from "@/components/case-study-bubble-icon-button";
import { ArrowUp } from "lucide-react";
import { createPortal } from "react-dom";
import { scrollToPosition } from "@/hooks/useLenis";
import styles from "./back-to-top-button.module.css";

export function BackToTopButton({ targetId, bubble = false }: { targetId?: string; bubble?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const label = targetId === "projects" ? "Back to projects" : "Back to top";
  const Button = bubble ? CaseStudyBubbleIconButton : "button";

  const scrollBack = () => {
    buttonRef.current?.blur();
    const target = targetId ? document.getElementById(targetId) : null;

    if (target) {
      scrollToPosition(window.scrollY + target.getBoundingClientRect().top);
      window.history.replaceState(null, "", `#${targetId}`);
      return;
    }

    scrollToPosition(0);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const updateVisibility = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = fullHeight - (scrollTop + viewportHeight);

      setIsVisible(scrollTop > viewportHeight && distanceFromBottom < viewportHeight * 1.35);

      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const elementsBelow = document.elementsFromPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
        const surface = elementsBelow.find(
          (element) =>
            element !== button &&
            !button.contains(element) &&
            element !== document.body &&
            element !== document.documentElement
        );

        setIsOverFooter(Boolean(surface?.closest("footer")));
      }
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.positioner} data-back-to-top>
      <Button
        aria-label={label}
        aria-hidden={!isVisible || undefined}
        tabIndex={isVisible ? 0 : -1}
        ref={buttonRef}
        className={cn(
          "flex items-center justify-center transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2",
          !bubble && "h-[68px] w-12 bg-transparent",
          isOverFooter
            ? "text-[#29303B] focus-visible:ring-[#29303B]/30"
            : "text-[#1E1E1E] focus-visible:ring-[#1E1E1E]/30",
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        onClick={scrollBack}
        title={label}
        type="button"
      >
        {bubble ? <ArrowUp size={20} aria-hidden="true" /> : <svg
          aria-hidden="true"
          fill="none"
          height="68"
          viewBox="0 0 48 68"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 53V10M38 24L24 10L10 24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>}
      </Button>
    </div>,
    document.body
  );
}
