"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = document.querySelectorAll("h2, h3, h4");
    const items: Heading[] = [];

    headingElements.forEach((el) => {
      if (el.id) {
        items.push({
          id: el.id,
          text: el.textContent || "",
          level: parseInt(el.tagName.replace("H", ""), 10),
        });
      }
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120; 
      let currentActive = "";

      for (let i = 0; i < headings.length; i++) {
        const h = headings[i];
        const el = document.getElementById(h.id);
        if (!el) continue;

        const top = el.offsetTop - 140;
        const next = headings[i + 1];
        const bottom = next
          ? document.getElementById(next.id)?.offsetTop || Infinity
          : Infinity;

        if (scrollY >= top && scrollY < bottom) {
          currentActive = h.id;
          break;
        }
      }

      if (currentActive !== activeId) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, activeId]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className={cn("space-y-2 text-sm", className)}>
      <h4 className="text-sm font-semibold text-gray-600 mb-3">
        On this page
      </h4>

      <ul className="space-y-2">
        {headings.map((h, idx) => {
          if (h.level === 2) {
            const nextH2Index = headings.findIndex(
              (item, i) => i > idx && item.level === 2
            );

            const subHeadings = headings
              .slice(idx + 1, nextH2Index === -1 ? headings.length : nextH2Index)
              .filter((sub) => sub.level > 2);

            // kiểm tra nếu activeId là h2 hoặc 1 trong subHeadings
            const isActiveGroup =
              activeId === h.id || subHeadings.some((s) => s.id === activeId);

            return (
              <li key={h.id} className="w-full">
                <button
                  onClick={() => handleClick(h.id)}
                  className={cn(
                    "w-full text-left block transition-colors",
                    isActiveGroup
                      ? "text-gray-600 font-medium"
                      : "text-gray-400 hover:text-gray-500"
                  )}
                >
                  {h.text}
                </button>

                {isActiveGroup && subHeadings.length > 0 && (
                  <ul className="ml-4 mt-2 space-y-1 border-l border-muted-foreground/20 pl-3">
                    {subHeadings.map((sub) => (
                      <li key={sub.id} className="w-full">
                        <button
                          onClick={() => handleClick(sub.id)}
                          className={cn(
                            "w-full text-left block text-xs transition-colors",
                            activeId === sub.id
                              ? "text-gray-600 font-medium"
                              : "text-gray-400 hover:text-gray-500"
                          )}
                        >
                          {sub.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}