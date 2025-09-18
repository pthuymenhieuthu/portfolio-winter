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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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
      const positions = headings.map((h) => {
        const element = document.getElementById(h.id);
        return {
          id: h.id,
          top: element ? element.getBoundingClientRect().top : Infinity,
        };
      });

      const active = positions.find((p) => p.top >= 0 && p.top <= 120);
      if (active && active.id !== activeId) {
        setActiveId(active.id);
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

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (headings.length === 0) return null;

  return (
    <div className={cn("space-y-2 text-sm", className)}>
      <h4 className="text-sm font-semibold text-foreground mb-3">
        On this page
      </h4>
      <ul className="space-y-2">
        {headings.map((h, idx) => {
          if (h.level === 2) {
            // Tìm vị trí h2 kế tiếp
            const nextH2Index = headings.findIndex(
              (item, i) => i > idx && item.level === 2
            );

            // Subheadings = tất cả h3/h4 nằm giữa h2 hiện tại và h2 kế tiếp
            const subHeadings = headings.slice(
              idx + 1,
              nextH2Index === -1 ? headings.length : nextH2Index
            ).filter((sub) => sub.level > 2);

            return (
              <li key={h.id}>
                <button
                  onClick={() => {
                    handleClick(h.id);
                    toggleSection(h.id);
                  }}
                  className={cn(
                    "w-full text-left transition-colors",
                    "hover:text-foreground text-muted-foreground",
                    activeId === h.id && "text-primary font-medium underline"
                  )}
                >
                  {h.text}
                </button>

                {openSections[h.id] && subHeadings.length > 0 && (
                  <ul className="ml-4 mt-2 space-y-1 border-l border-muted-foreground/20 pl-3">
                    {subHeadings.map((sub) => (
                      <li key={sub.id} className="text-xs">
                        <button
                          onClick={() => handleClick(sub.id)}
                          className={cn(
                            "hover:text-foreground text-muted-foreground transition-colors",
                            activeId === sub.id && "text-primary font-medium"
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