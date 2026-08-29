"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = fullHeight - (scrollTop + viewportHeight);

      setIsVisible(scrollTop > viewportHeight && distanceFromBottom < viewportHeight * 1.35);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <button
      aria-label="Back to top"
      className={cn(
        "fixed bottom-28 right-5 z-50 flex h-[68px] w-12 items-center justify-center bg-transparent text-[#1E1E1E] transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1E1E]/30 sm:right-8",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Back to top"
      type="button"
    >
      <svg
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
      </svg>
    </button>
  );
}
