"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { CaseStudyBubbleIconButton } from "@/components/case-study-bubble-icon-button";
import { PortfolioBubbleScrollbar } from "@/components/portfolio-bubble-scrollbar";
import styles from "./screen-focus-carousel.module.css";

export type FocusScreen = {
  src: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

function ScreenPreview({ screen, active, fit, onImageSize }: {
  screen: FocusScreen;
  active: boolean;
  fit: "scroll" | "contain";
  onImageSize: (src: string, width: number, height: number) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const id = useId();
  return <>
    <div className="h-full w-full overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_12px_40px_-24px_rgba(40,76,106,0.25)]">
      <div ref={scroller} id={id} data-app-screen-preview data-lenis-prevent-wheel
        className={fit === "contain" ? "h-full overflow-hidden" : "h-full overflow-x-hidden overflow-y-auto overscroll-y-contain"}
        tabIndex={active ? 0 : -1} aria-label={active ? `${screen.title} preview` : undefined}
        aria-hidden={!active || undefined}>
        <Image src={screen.src} alt={screen.title} width={screen.width} height={screen.height}
          unoptimized draggable={false}
          onLoad={event => onImageSize(screen.src, event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)}
          className={`pointer-events-none block w-full select-none ${fit === "contain" ? "h-full object-contain" : "h-auto"}`}
          sizes="(max-width: 640px) 76vw, 500px" />
      </div>
    </div>
    {active && fit === "scroll" && <PortfolioBubbleScrollbar scrollRef={scroller} controls={id}
      label={`Scroll ${screen.title} preview`} className={styles.previewScrollbar} />}
  </>;
}

export function ScreenFocusCarousel({ screens, label, device = "mobile", fit = "scroll", className = "", id }: {
  screens: readonly FocusScreen[];
  label: string;
  device?: "mobile" | "web";
  fit?: "scroll" | "contain";
  className?: string;
  id?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const inView = useInView(root, { amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [imageSizes, setImageSizes] = useState<Record<string, { width: number; height: number }>>({});
  const [available, setAvailable] = useState(900);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const index = ((active % screens.length) + screens.length) % screens.length;

  useEffect(() => {
    setMounted(true);
    const element = root.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
    observer.observe(element);
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  useEffect(() => {
    if (!inView || !visible || paused || hovered || focused || reducedMotion || screens.length < 2) return;
    const timer = window.setInterval(() => setActive(value => value + 1), 1500);
    return () => window.clearInterval(timer);
  }, [active, inView, visible, paused, hovered, focused, reducedMotion, screens.length]);

  const select = (position: number) => { setPaused(true); setActive(position); };
  const compact = available < 640;
  const width = device === "web" ? Math.min(500, available * (compact ? 0.76 : 0.55))
    : Math.min(210, available * 0.46);
  const height = device === "web" ? width * 0.7 : width * 2.2;
  const imageSize = (src: string, naturalWidth: number, naturalHeight: number) => {
    if (!naturalWidth || !naturalHeight) return;
    setImageSizes(previous => previous[src]?.width === naturalWidth && previous[src]?.height === naturalHeight
      ? previous : { ...previous, [src]: { width: naturalWidth, height: naturalHeight } });
  };
  const frameSize = (screen: FocusScreen) => {
    const natural = imageSizes[screen.src] ?? screen;
    const ratio = natural.height / natural.width;
    const frameWidth = fit === "contain" ? Math.min(width, Math.ceil((height - 2) / ratio) + 2) : width;
    return { width: frameWidth, height: Math.min(height, Math.ceil((frameWidth - 2) * ratio) + 2) };
  };
  const centerWidth = frameSize(screens[index]).width;
  const sideScale = device === "web" ? 0.64 : 0.62;
  const gap = compact ? 12 : 24;
  const offsets = screens.length > 4 ? [-2, -1, 0, 1, 2] : screens.length > 2 ? [-1, 0, 1] : screens.length === 2 ? [0, 1] : [0];

  return <div ref={root} id={id} role="region" aria-roledescription="carousel" aria-label={label}
    data-screen-carousel data-active-screen={index} data-autoplay={inView && visible && !paused && !hovered && !focused && !reducedMotion} className={`min-w-0 ${className}`}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={event => { if (!(event.target as Element).closest("[data-carousel-playback]")) setFocused(true); }}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if ((event.target as Element).closest("[role=scrollbar]")) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault(); select(active + (event.key === "ArrowRight" ? 1 : -1));
      }
    }}>
    <motion.div className="relative cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
      data-carousel-stage style={{ height: height + 32 }}
      onPanStart={() => { dragged.current = true; setPaused(true); }}
      onPanEnd={(_, info) => { if (Math.abs(info.offset.x) > 35 && Math.abs(info.offset.x) > Math.abs(info.offset.y)) select(active + (info.offset.x < 0 ? 1 : -1)); }}
      onPointerDown={() => { dragged.current = false; setPaused(true); }}>
      {offsets.map(offset => {
        const position = active + offset;
        const screenIndex = ((position % screens.length) + screens.length) % screens.length;
        const screen = screens[screenIndex];
        const distance = Math.abs(offset);
        const frame = frameSize(screen);
        let x = distance === 0 ? 0 : centerWidth / 2 + gap + frame.width * sideScale / 2;
        for (let step = 1; step < distance; step++) {
          const adjacentIndex = ((active + Math.sign(offset) * step) % screens.length + screens.length) % screens.length;
          x += frameSize(screens[adjacentIndex]).width * sideScale + gap;
        }
        x *= Math.sign(offset);
        return <motion.div key={position} data-carousel-slide data-screen-index={screenIndex}
          className="absolute left-1/2"
          style={{ width: frame.width, height: frame.height, top: 16 + (height - frame.height) / 2,
            marginLeft: -frame.width / 2, zIndex: 3 - distance }} initial={false}
          animate={{ x, scale: distance === 0 ? 1 : sideScale, opacity: distance > 1 ? 0.65 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}>
          <ScreenPreview screen={screen} active={offset === 0} fit={fit} onImageSize={imageSize} />
          {offset !== 0 && <button type="button" className="absolute inset-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#0293f4]"
            tabIndex={-1} aria-label={`Show ${screen.title}`} onClick={() => { if (!dragged.current) select(position); }} />}
        </motion.div>;
      })}
    </motion.div>
    {screens.length > 1 && <div className="mt-5 flex items-center justify-center gap-3">
      <CaseStudyBubbleIconButton aria-label="Previous screen" disabled={screens.length < 2} onClick={() => select(active - 1)}><ChevronLeft size={18} aria-hidden="true" /></CaseStudyBubbleIconButton>
      <CaseStudyBubbleIconButton data-carousel-playback aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        disabled={(mounted && Boolean(reducedMotion)) || screens.length < 2}
        onClick={() => { setPaused(!paused); setFocused(false); }}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </CaseStudyBubbleIconButton>
      <CaseStudyBubbleIconButton aria-label="Next screen" disabled={screens.length < 2} onClick={() => select(active + 1)}><ChevronRight size={18} aria-hidden="true" /></CaseStudyBubbleIconButton>
    </div>}
    <div className="mx-auto mt-6 flex max-w-[680px] flex-col items-center px-5 text-center" aria-live={paused || focused || hovered ? "polite" : "off"} aria-atomic="true">
      <p className="text-xs tabular-nums text-[#526677]">{String(index + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</p>
      <div className="mt-3 grid min-h-[56px]">
        {screens.map((screen, screenIndex) => (
          <div key={`${screen.src}-${screenIndex}`} className={`col-start-1 row-start-1 ${screenIndex === index ? "" : "invisible"}`}
            aria-hidden={screenIndex !== index || undefined}>
            <h3 className="font-[var(--font-affina-heading)] text-xl font-medium leading-7 text-[#173b4b]">{screen.title}</h3>
            {screen.description && <p className="mt-2 text-sm leading-6 text-[#526677]">{screen.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </div>;
}
