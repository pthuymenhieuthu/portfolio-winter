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
    const scrollY = window.scrollY + 100; // offset 100px để tính active
    let currentActive = "";

    headings.forEach((h, idx) => {
      const el = document.getElementById(h.id);
      if (!el) return;

      const top = el.offsetTop - 120; // offset cho trigger sớm hơn
      // tìm H2 kế tiếp
      const nextH2 = headings.find(
        (item, i) => i > idx && item.level === 2
      );
      const bottom = nextH2
        ? document.getElementById(nextH2.id)?.offsetTop || Infinity
        : Infinity;

      // Nếu là H2 → active trong cả block (từ top đến trước H2 tiếp theo)
      if (h.level === 2) {
        if (scrollY >= top && scrollY < bottom) {
          currentActive = h.id;
        }
      }

      // Nếu là H3/H4 → active trong block cha
      if (h.level > 2) {
        if (scrollY >= top && scrollY < bottom) {
          currentActive = h.id;
        }
      }
    });

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

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (headings.length === 0) return null;

  return (
    <div className={cn("space-y-2 text-sm", className)}>
      {/* Tiêu đề TOC */}
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

            return (
              <li key={h.id}>
                <button
                  onClick={() => {
                    handleClick(h.id);
                    toggleSection(h.id);
                  }}
                  className={cn(
                    "w-full text-left transition-colors",
                    activeId === h.id
                      ? "text-gray-600 font-medium" // Active
                      : "text-gray-400 hover:text-gray-500" // Inactive
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
                            "transition-colors",
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