"use client";

import { useLayoutEffect, useRef, useState, type RefObject, type PointerEvent, type KeyboardEvent } from "react";
import { SoapBubbleSurface } from "@/components/reactdrops/soap-bubble";
import styles from "@/app/experiments/portfolio-chat/portfolio-chat.module.css";

export function PortfolioBubbleScrollbar({ scrollRef, controls }: {
  scrollRef: RefObject<HTMLDivElement>;
  controls: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number; top: number; ratio: number } | null>(null);
  const [metrics, setMetrics] = useState({ max: 0, top: 0, size: 64, travel: 0 });

  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      const height = track.clientHeight;
      const size = Math.min(height, Math.max(44, Math.min(100,
        height * scroller.clientHeight / Math.max(1, scroller.scrollHeight))));
      setMetrics({ max, top: Math.max(0, Math.min(max, scroller.scrollTop)), size, travel: Math.max(0, height - size) });
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
  }, [scrollRef]);

  const offset = metrics.max ? metrics.top / metrics.max * metrics.travel : 0;
  const onDragStart = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || !scrollRef.current) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { y: event.clientY, top: scrollRef.current.scrollTop, ratio: metrics.max / Math.max(1, metrics.travel) };
  };
  const onDrag = (event: PointerEvent<HTMLElement>) => {
    if (drag.current && scrollRef.current) {
      scrollRef.current.scrollTop = drag.current.top + (event.clientY - drag.current.y) * drag.current.ratio;
    }
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const positions: Record<string, number> = {
      ArrowDown: scroller.scrollTop + 48, ArrowUp: scroller.scrollTop - 48,
      PageDown: scroller.scrollTop + scroller.clientHeight * 0.85,
      PageUp: scroller.scrollTop - scroller.clientHeight * 0.85,
      Home: 0, End: metrics.max,
    };
    if (event.key in positions) {
      event.preventDefault();
      scroller.scrollTop = positions[event.key];
    }
  };

  return <div ref={trackRef} className={styles.bubbleScrollTrack}
    aria-hidden={metrics.max <= 1} style={{ visibility: metrics.max > 1 ? "visible" : "hidden" }}
    onPointerDown={(event) => {
      if (event.button !== 0 || event.target !== event.currentTarget || !scrollRef.current) return;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().top;
      scrollRef.current.scrollTop = (y - metrics.size / 2) / Math.max(1, metrics.travel) * metrics.max;
    }}>
    <SoapBubbleSurface className={styles.bubbleScrollThumb}
      style={{ height: metrics.size, transform: `translateY(${offset}px)` }}
      role="scrollbar" aria-label="Scroll conversation" aria-controls={controls}
      aria-orientation="vertical" aria-valuemin={0} aria-valuemax={Math.round(metrics.max)}
      aria-valuenow={Math.round(metrics.top)} tabIndex={metrics.max > 1 ? 0 : -1}
      radius={9999} interactive={false} tint="#ffffff00" opacity={0}
      clearCenter={1} glass={0.6} bevel={3} iridescence={0.85} oilOpacity={0.35}
      reflectivity={0.95} refraction={0.08} windowLight windowStyle="edge"
      windowWidth={0.5} windowIntensity={0.65} bottomShade={false}
      onPointerDown={onDragStart} onPointerMove={onDrag}
      onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }} onKeyDown={onKeyDown}
    />
  </div>;
}
