"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const screens = [
  "00-intro", "01-insurance-type", "02-insured-person", "03-monthly-budget",
  "04-preferred-insurer", "05-matching", "06-recommendations", "07-comparison",
];
const offsets = [-3, -2, -1, 0, 1, 2, 3];

export function AffinaFocusReel() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(260);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setWidth(Math.min(280, available * (available < 640 ? 0.6 : 0.3)));
    });
    observer.observe(element);
    const syncVisibility = () => setVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!inView || !visible || paused || hovered || focused || reduceMotion) return;
    const timer = window.setInterval(() => setActive((value) => value + 1), 3600);
    return () => window.clearInterval(timer);
  }, [active, inView, visible, paused, hovered, focused, reduceMotion]);

  const height = width * (3317 / 1533);
  const gap = width < 220 ? 16 : 22;
  const sideScale = 0.52;
  const move = (direction: number) => setActive((value) => value + direction);

  return (
    <div
      ref={root}
      id="affina-focus-reel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Affina interface gallery"
      className="-mx-5 overflow-hidden sm:-mx-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <motion.div
        className="relative cursor-grab touch-pan-y active:cursor-grabbing"
        style={{ height: height + 32 }}
        onPanEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 40) move(info.offset.x < 0 ? 1 : -1);
        }}
      >
        {offsets.map((offset) => {
          const position = active + offset;
          const index = ((position % screens.length) + screens.length) % screens.length;
          const distance = Math.abs(offset);
          const x = distance === 0 ? 0 : Math.sign(offset) * (
            width / 2 + gap + width * sideScale / 2 + (distance - 1) * (width * sideScale + gap)
          );
          return (
            <motion.button
              key={position}
              type="button"
              tabIndex={offset === 0 ? 0 : -1}
              aria-hidden={distance > 2}
              aria-label={`Show Affina screen ${index + 1} of ${screens.length}`}
              aria-current={offset === 0 ? "true" : undefined}
              onClick={() => { if (offset !== 0) setActive(position); }}
              className="absolute left-1/2 top-4 overflow-hidden rounded-[20px] bg-white text-left outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0293f4]"
              style={{ width, height, marginLeft: -width / 2, zIndex: 4 - distance }}
              initial={false}
              animate={{ x, scale: offset === 0 ? 1 : sideScale, opacity: distance > 2 ? 0 : 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={`/assets/affina/ai-journey/${screens[index]}.webp?v=en-final`}
                alt={`Affina interface, screen ${index + 1}`}
                fill
                unoptimized
                draggable={false}
                sizes="280px"
                className="pointer-events-none select-none object-cover object-top"
              />
            </motion.button>
          );
        })}
      </motion.div>
      <div className="mt-5 flex items-center justify-center gap-2">
        <button type="button" aria-label="Previous screen" onClick={() => move(-1)} className={controlClass}>
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        {!reduceMotion && (
          <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)} className={controlClass}>
            {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          </button>
        )}
        <button type="button" aria-label="Next screen" onClick={() => move(1)} className={controlClass}>
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

const controlClass = "flex size-11 items-center justify-center rounded-full text-[#737373] transition-colors hover:bg-black/[0.05] hover:text-[#08090a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0293f4]";
