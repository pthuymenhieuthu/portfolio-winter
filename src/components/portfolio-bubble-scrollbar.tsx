"use client";

import { useLayoutEffect, useRef, useState, type RefObject, type PointerEvent, type KeyboardEvent } from "react";
import { SoapBubbleSurface } from "@/components/reactdrops/soap-bubble";
import styles from "@/app/experiments/portfolio-chat/portfolio-chat.module.css";

export function PortfolioBubbleScrollbar({ scrollRef, controls, orientation = "vertical", label = "Scroll conversation", className = "" }: {
  scrollRef: RefObject<HTMLDivElement>;
  controls: string;
  orientation?: "vertical" | "horizontal";
  label?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ coordinate: number; top: number; ratio: number } | null>(null);
  const horizontal = orientation === "horizontal";
  const [metrics, setMetrics] = useState({ max: 0, top: 0, size: 64, travel: 0 });

  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const viewportSize = horizontal ? scroller.clientWidth : scroller.clientHeight;
      const contentSize = horizontal ? scroller.scrollWidth : scroller.scrollHeight;
      const max = Math.max(0, contentSize - viewportSize);
      const height = horizontal ? track.clientWidth : track.clientHeight;
      const size = Math.min(height, Math.max(44, Math.min(100,
        height * viewportSize / Math.max(1, contentSize))));
      setMetrics({ max, top: Math.max(0, Math.min(max, horizontal ? scroller.scrollLeft : scroller.scrollTop)), size, travel: Math.max(0, height - size) });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    resize.observe(scroller);
    resize.observe(track);
    const watchContent = () => {
      Array.from(scroller.children).forEach((child) => resize.observe(child));
      schedule();
    };
    const mutation = new MutationObserver(watchContent);
    mutation.observe(scroller, { childList: true, subtree: true, characterData: true });
    scroller.addEventListener("scroll", schedule, { passive: true });
    watchContent();
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutation.disconnect();
      scroller.removeEventListener("scroll", schedule);
    };
  }, [scrollRef, horizontal]);

  const offset = metrics.max ? metrics.top / metrics.max * metrics.travel : 0;
  const onDragStart = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || !scrollRef.current) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus();
    drag.current = { coordinate: horizontal ? event.clientX : event.clientY,
      top: horizontal ? scrollRef.current.scrollLeft : scrollRef.current.scrollTop,
      ratio: metrics.max / Math.max(1, metrics.travel) };
  };
  const onDrag = (event: PointerEvent<HTMLElement>) => {
    if (drag.current && scrollRef.current) {
      event.stopPropagation();
      const next = drag.current.top + ((horizontal ? event.clientX : event.clientY) - drag.current.coordinate) * drag.current.ratio;
      if (horizontal) scrollRef.current.scrollLeft = next;
      else scrollRef.current.scrollTop = next;
    }
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const current = horizontal ? scroller.scrollLeft : scroller.scrollTop;
    const size = horizontal ? scroller.clientWidth : scroller.clientHeight;
    const positions: Record<string, number> = {
      [horizontal ? "ArrowRight" : "ArrowDown"]: current + 48,
      [horizontal ? "ArrowLeft" : "ArrowUp"]: current - 48,
      PageDown: current + size * 0.85,
      PageUp: current - size * 0.85,
      Home: 0, End: metrics.max,
    };
    if (event.key in positions) {
      event.preventDefault();
      event.stopPropagation();
      if (horizontal) scroller.scrollLeft = positions[event.key];
      else scroller.scrollTop = positions[event.key];
    }
  };

  return <div ref={trackRef} data-bubble-scroll-track className={`${styles.bubbleScrollTrack} ${horizontal ? styles.bubbleScrollTrackHorizontal : ""} ${className}`}
    aria-hidden={metrics.max <= 1} style={{ visibility: metrics.max > 1 ? "visible" : "hidden" }}
    onPointerDown={(event) => {
      if (event.button !== 0) return;
      event.stopPropagation();
      if (event.target !== event.currentTarget || !scrollRef.current) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = horizontal ? event.clientX - bounds.left : event.clientY - bounds.top;
      const next = (position - metrics.size / 2) / Math.max(1, metrics.travel) * metrics.max;
      if (horizontal) scrollRef.current.scrollLeft = next;
      else scrollRef.current.scrollTop = next;
    }}>
    {metrics.max > 1 && <SoapBubbleSurface className={styles.bubbleScrollThumb}
      style={{ [horizontal ? "width" : "height"]: metrics.size, transform: horizontal ? `translateX(${offset}px)` : `translateY(${offset}px)` }}
      role="scrollbar" aria-label={label} aria-controls={controls}
      aria-orientation={orientation} aria-valuemin={0} aria-valuemax={Math.round(metrics.max)}
      aria-valuenow={Math.round(metrics.top)} tabIndex={metrics.max > 1 ? 0 : -1}
      radius={9999} interactive={false} tint="#ffffff00" opacity={0}
      clearCenter={1} glass={0.6} bevel={3} iridescence={0.85} oilOpacity={0.35}
      reflectivity={0.95} refraction={0.08} windowLight windowStyle="edge"
      windowWidth={0.5} windowIntensity={0.65} bottomShade={false}
      onPointerDown={onDragStart} onPointerMove={onDrag}
      onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }} onKeyDown={onKeyDown}
    />}
  </div>;
}
