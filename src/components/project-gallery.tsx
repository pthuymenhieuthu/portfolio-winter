"use client";

import { EXPERIMENTS, type Experiment } from "@/data/experiments";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play, Shapes } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const TABS = [
  { id: "work", label: "Work" },
  { id: "experiments", label: "AI Experiments" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const TAB_SPARKLES = [
  { left: "12%", top: "15%", x: -12, y: -17, size: 12, delay: 0 },
  { left: "37%", top: "0%", x: -4, y: -23, size: 16, delay: 0.04 },
  { left: "74%", top: "5%", x: 9, y: -20, size: 10, delay: 0.08 },
  { left: "96%", top: "35%", x: 20, y: -5, size: 15, delay: 0.02 },
  { left: "83%", top: "85%", x: 12, y: 16, size: 12, delay: 0.06 },
  { left: "20%", top: "90%", x: -9, y: 16, size: 10, delay: 0.1 },
] as const;

function TabSparkles() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {TAB_SPARKLES.map((sparkle, index) => (
        <motion.svg
          key={index}
          viewBox="0 0 16 16"
          className="absolute overflow-visible"
          style={{ left: sparkle.left, top: sparkle.top, width: sparkle.size, height: sparkle.size, color: index % 2 ? "#0096F7" : "#56BFFF" }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: -18 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.15, 1, 0], x: sparkle.x, y: sparkle.y, rotate: 35 }}
          transition={{ duration: 0.65, delay: sparkle.delay, ease: "easeOut", times: [0, 0.2, 0.65, 1] }}
        >
          <path fill="currentColor" d="M8 0C9.2 5.2 10.8 6.8 16 8C10.8 9.2 9.2 10.8 8 16C6.8 10.8 5.2 9.2 0 8C5.2 6.8 6.8 5.2 8 0Z" />
        </motion.svg>
      ))}
    </span>
  );
}

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const isComingSoon = experiment.status === "coming-soon";
  const isExternalHref = /^https?:\/\//.test(experiment.href ?? "");

  return (
    <article className="group min-w-0">
      <div className="relative isolate aspect-video overflow-hidden rounded-2xl bg-[#F2F6FA]">
        {isPlaying && experiment.video ? (
          hasVideoError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-[#596577]">The video couldn’t load.</p>
              <button
                type="button"
                onClick={() => setHasVideoError(false)}
                className="rounded-full bg-white px-4 py-2 text-sm text-[#007AC9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0096F7]"
              >
                Try again
              </button>
            </div>
          ) : (
            <video
              aria-label={`${experiment.title} showreel`}
              autoPlay
              controls
              playsInline
              preload="metadata"
              poster={experiment.poster}
              onError={() => setHasVideoError(true)}
              className="absolute inset-0 h-full w-full object-contain"
            >
              <source src={experiment.video} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          )
        ) : experiment.poster ? (
          <>
            <Image
              src={experiment.poster}
              alt={`${experiment.title} preview`}
              fill
              sizes="(max-width: 639px) calc(100vw - 32px), 388px"
              className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
            />
            {experiment.href && !experiment.video && !isComingSoon && (
              <Link
                href={experiment.href}
                target={isExternalHref ? "_blank" : undefined}
                rel={isExternalHref ? "noopener noreferrer" : undefined}
                aria-label={isExternalHref ? `Try ${experiment.title} (opens in a new tab)` : `Read ${experiment.title}`}
                className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0096F7]"
              />
            )}
            {experiment.video && !isComingSoon && (
              <button
                type="button"
                aria-label={`Watch ${experiment.title}`}
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-end justify-start p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0096F7]"
              >
                <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/95 py-2 pl-3 pr-4 text-sm font-medium text-[#29303B] shadow-sm transition-colors hover:bg-white">
                  <Play aria-hidden="true" className="size-3.5 fill-current" />
                  Watch reel
                </span>
              </button>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <Shapes aria-hidden="true" className="size-8 text-[#8E9BAA]" strokeWidth={1.25} />
            <span className="text-sm text-[#697686]">Preview coming soon</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[#697686]">
        <span>{experiment.category}</span>
        {isComingSoon && <span>Coming soon</span>}
      </div>
      <h3 className="mt-1.5 font-[var(--font-heading)] text-xl font-medium leading-tight tracking-[-0.4px] text-[#29303B]">
        {experiment.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#697686]">{experiment.description}</p>
      {experiment.href && !isComingSoon && (
        <Link
          href={experiment.href}
          target={isExternalHref ? "_blank" : undefined}
          rel={isExternalHref ? "noopener noreferrer" : undefined}
          className="mt-3 inline-flex min-h-11 items-center gap-1 rounded-sm text-sm text-[#007AC9] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0096F7]"
        >
          {experiment.actionLabel ?? `Open ${experiment.category.toLowerCase()}`}
          {isExternalHref ? <ArrowUpRight aria-hidden="true" className="size-4" /> : <ArrowRight aria-hidden="true" className="size-4" />}
          {isExternalHref && <span className="sr-only"> (opens in a new tab)</span>}
        </Link>
      )}
    </article>
  );
}

export function ProjectGallery({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("work");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("collection") === "experiments") {
      setActiveTab("experiments");
    }
  }, []);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight": nextIndex = (index + 1) % TABS.length; break;
      case "ArrowLeft": nextIndex = (index + TABS.length - 1) % TABS.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = TABS.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveTab(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 sm:px-0">
      <div className="mb-8 flex justify-center sm:mb-10">
        <div role="tablist" aria-label="Project collections" className="inline-flex gap-1 rounded-full bg-[#F2F4F7] p-1">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              type="button"
              role="tab"
              id={`projects-tab-${tab.id}`}
              aria-controls={`projects-panel-${tab.id}`}
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`relative isolate min-h-11 rounded-full px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0096F7] ${activeTab === tab.id ? "text-[#29303B]" : "text-[#697686] hover:text-[#29303B]"}`}
            >
              {activeTab === tab.id && (
                <motion.span
                  aria-hidden="true"
                  layoutId="projects-active-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_1px_3px_rgba(41,48,59,0.08)]"
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              {tab.id === "experiments" && activeTab === "experiments" && !reduceMotion && <TabSparkles />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        id="projects-panel-work"
        role="tabpanel"
        aria-labelledby="projects-tab-work"
        hidden={activeTab !== "work"}
        tabIndex={0}
        className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#0096F7]"
      >
        {activeTab === "work" && (
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {children}
          </motion.div>
        )}
      </div>

      <div
        id="projects-panel-experiments"
        role="tabpanel"
        aria-labelledby="projects-tab-experiments"
        hidden={activeTab !== "experiments"}
        tabIndex={0}
        className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#0096F7]"
      >
        {activeTab === "experiments" && (
          <motion.div initial="hidden" animate="visible">
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
            >
              <p className="text-sm leading-relaxed text-[#697686]">A little space for making, testing, and trying things with AI.</p>
              <span className="text-xs text-[#697686]">{EXPERIMENTS.length} experiments & counting</span>
            </motion.div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2">
              {EXPERIMENTS.map((experiment, index) => (
                <motion.div
                  key={experiment.id}
                  variants={{
                    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : 0.04 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ExperimentCard experiment={experiment} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
