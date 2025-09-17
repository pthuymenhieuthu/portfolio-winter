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
    // Quét các heading trong bài (h2, h3)
    const headingElements = document.querySelectorAll("h2, h3");
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

      // heading nào gần top nhất thì active
      const active = positions.find((p) => p.top >= 0 && p.top <= 120);
      if (active && active.id !== activeId) {
        setActiveId(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // chạy lần đầu

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, activeId]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // để trừ header
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-semibold text-foreground mb-3">
        On this page
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "ml-4")}>
            <button
              onClick={() => handleClick(h.id)}
              className={cn(
                "hover:text-foreground text-muted-foreground transition-colors",
                {
                  "text-primary font-medium":
                    activeId === h.id,
                }
              )}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}