"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./horizontal-screen-gallery.module.css";
import { CaseStudyBubbleIconButton } from "@/components/case-study-bubble-icon-button";
import { PortfolioBubbleScrollbar } from "@/components/portfolio-bubble-scrollbar";

const GalleryNavigation = createContext<(index: number) => void>(() => {});

export function HorizontalScreenGallery({ children, label, className, viewportClassName }: {
  children: ReactNode;
  label: string;
  className?: string;
  viewportClassName?: string;
}) {
  const id = useId();
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft <= 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const positions = () => {
    const element = viewport.current;
    if (!element) return [];
    const left = element.getBoundingClientRect().left;
    const padding = parseFloat(getComputedStyle(element).paddingLeft);
    const marked = element.querySelectorAll<HTMLElement>("[data-gallery-item]");
    const items = marked.length ? Array.from(marked) : Array.from(element.firstElementChild?.children ?? []) as HTMLElement[];
    return items
      .map(item => item.getBoundingClientRect().left - left + element.scrollLeft - padding);
  };
  const scrollTo = (left: number) => viewport.current?.scrollTo({ left,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  const step = (direction: number) => {
    const element = viewport.current;
    if (!element) return;
    const points = positions();
    const next = direction > 0 ? points.find(left => left > element.scrollLeft + 4)
      : points.reverse().find(left => left < element.scrollLeft - 4);
    scrollTo(next ?? element.scrollLeft + direction * element.clientWidth * 0.85);
  };
  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.moved) suppressClick.current = true;
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <GalleryNavigation.Provider value={index => scrollTo(positions()[index] ?? 0)}>
      <div className={className} role="region" aria-label={label}>
        <div className="mb-4 flex items-center justify-between gap-3 px-5 sm:px-8 lg:px-0">
          <p className="text-xs text-[#737373]"><span className="hidden sm:inline">Drag or use the arrows to explore</span><span className="sm:hidden">Swipe to explore</span></p>
          <div className="flex gap-2">
            <CaseStudyBubbleIconButton aria-label="Previous screens" aria-controls={id} disabled={edges.start} onClick={() => step(-1)}><ArrowLeft size={18} aria-hidden="true" /></CaseStudyBubbleIconButton>
            <CaseStudyBubbleIconButton aria-label="Next screens" aria-controls={id} disabled={edges.end} onClick={() => step(1)}><ArrowRight size={18} aria-hidden="true" /></CaseStudyBubbleIconButton>
          </div>
        </div>
        <div className={styles.scrollArea}>
        <div ref={viewport} id={id} data-gallery-viewport data-lenis-prevent-wheel
          className={cn(styles.viewport, "px-5 pb-3 sm:px-8 lg:px-0", viewportClassName)}
          tabIndex={0} aria-label={`${label} scroll area`}
          onKeyDown={event => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1);
            } else if (event.key === "Home" || event.key === "End") {
              event.preventDefault(); scrollTo(event.key === "Home" ? 0 : event.currentTarget.scrollWidth);
            }
          }}
          onPointerDown={event => {
            suppressClick.current = false;
            if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("button")) return;
            drag.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, moved: false };
          }}
          onPointerMove={event => {
            const start = drag.current;
            if (!start) return;
            const dx = event.clientX - start.x, dy = event.clientY - start.y;
            if (!start.moved) {
              if (Math.abs(dy) > Math.max(6, Math.abs(dx))) { drag.current = null; return; }
              if (Math.abs(dx) < 6) return;
              start.moved = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.dataset.dragging = "true";
            }
            event.preventDefault();
            event.currentTarget.scrollLeft = start.left - dx;
          }}
          onPointerUp={finishDrag} onPointerCancel={finishDrag}
          onDragStart={event => event.preventDefault()}
          onClickCapture={event => {
            if (!suppressClick.current) return;
            event.preventDefault(); event.stopPropagation(); suppressClick.current = false;
          }}
        >{children}</div>
        <PortfolioBubbleScrollbar scrollRef={viewport} controls={id} orientation="horizontal" label={`Scroll ${label}`} />
        </div>
      </div>
    </GalleryNavigation.Provider>
  );
}

export function GalleryNextButton({ index }: { index: number }) {
  const goTo = useContext(GalleryNavigation);
  return <CaseStudyBubbleIconButton aria-label={`Show screen ${index + 2}`} onClick={() => goTo(index + 1)}><ArrowRight size={20} aria-hidden="true" /></CaseStudyBubbleIconButton>;
}
