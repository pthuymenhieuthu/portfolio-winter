"use client";

import { Water } from "@paper-design/shaders-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { HeroCtaButtons } from "@/components/hero-cta-buttons";

const BLUR_FADE_DELAY = 0.04;
const WATER_MODE_LABEL = "My name means “water” in Vietnamese 😉";
const DEFAULT_MODE_LABEL = "Make it more “Thủy”";

function WaterModeLabel({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const label = active ? WATER_MODE_LABEL : DEFAULT_MODE_LABEL;

  return (
    <span
      aria-hidden="true"
      className="grid h-[1.25em] items-center overflow-hidden [perspective:180px]"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={label}
          className="origin-center whitespace-nowrap [grid-area:1/1]"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, rotateX: -64, y: "72%" }
          }
          animate={{ opacity: 1, rotateX: 0, y: "0%" }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, rotateX: 64, y: "-72%" }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.78,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className={reduceMotion ? undefined : "water-button-shiny-text"}>
            {label}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HomeHero() {
  const [isWaterMode, setIsWaterMode] = useState(false);
  const [isWaterLabelActive, setIsWaterLabelActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [supportsWaterShader, setSupportsWaterShader] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobile(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    setSupportsWaterShader(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  const waterIsActive = isMobile || isWaterMode;

  const toggleWaterMode = () => {
    const nextWaterMode = !isWaterMode;
    setIsWaterLabelActive(nextWaterMode);
    setIsWaterMode(nextWaterMode);
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[580px] w-full max-w-full items-center justify-center overflow-hidden px-6 sm:min-h-[670px] md:min-h-[780px] lg:min-h-[860px]"
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: waterIsActive ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 z-[2]"
        initial={false}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.52,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {waterIsActive && supportsWaterShader ? (
          <Water
            colorBack="#e6f6ff"
            colorHighlight="#ffffff"
            speed={0.52}
            size={1.08}
            caustic={0.16}
            waves={0.26}
            layering={0.62}
            highlights={0.22}
            edges={0.3}
            maxPixelCount={isMobile ? 720 * 1280 : 1920 * 1080}
            className="h-full w-full"
            style={{ height: "100%", width: "100%" }}
          />
        ) : waterIsActive ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_22%_18%,#ffffff_0%,transparent_38%),radial-gradient(circle_at_80%_72%,#c8ecff_0%,transparent_44%),linear-gradient(160deg,#edfaff_0%,#d8f2ff_48%,#b9ddff_100%)]" />
        ) : null}
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-140px] z-[1] hidden w-[max(1280px,100vw)] max-w-none -translate-x-1/2 select-none md:block lg:top-[-140px]"
      >
        <motion.div
          animate={
            isWaterMode
              ? { filter: "blur(8px)", opacity: 0, scale: 1.04, x: "-6vw", y: -150 }
              : { filter: "blur(0px)", opacity: 1, scale: 1, x: 0, y: 0 }
          }
          initial={
            shouldReduceMotion
              ? false
              : { filter: "blur(6px)", opacity: 0, scale: 1.06, x: "-3vw", y: -88 }
          }
          style={{ willChange: "transform, opacity, filter" }}
          transition={{
            delay: shouldReduceMotion ? 0 : isWaterMode ? 0 : 0.08,
            duration: shouldReduceMotion ? 0 : isWaterMode ? 0.52 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src="/assets/home/hero-blob-top.svg"
            alt=""
            width={1440}
            height={422}
            priority
            className="block h-auto w-full"
          />
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-210px] left-1/2 z-[1] hidden w-[max(1280px,100vw)] max-w-none -translate-x-1/2 select-none md:block lg:bottom-[-190px]"
      >
        <motion.div
          animate={
            isWaterMode
              ? { filter: "blur(8px)", opacity: 0, scale: 1.04, x: "6vw", y: 180 }
              : { filter: "blur(0px)", opacity: 1, scale: 1, x: 0, y: 0 }
          }
          initial={
            shouldReduceMotion
              ? false
              : { filter: "blur(6px)", opacity: 0, scale: 1.06, x: "3vw", y: 108 }
          }
          style={{ willChange: "transform, opacity, filter" }}
          transition={{
            delay: shouldReduceMotion ? 0 : isWaterMode ? 0.04 : 0.44,
            duration: shouldReduceMotion ? 0 : isWaterMode ? 0.56 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src="/assets/home/hero-blob-bottom.svg"
            alt=""
            width={1440}
            height={702}
            priority
            className="block h-auto w-full"
          />
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        animate={{ opacity: waterIsActive ? 0.16 : 0 }}
        className="pointer-events-none absolute inset-0 z-[3] bg-[#0096F7]"
        initial={false}
        transition={{
          delay: shouldReduceMotion || !waterIsActive ? 0 : 0.3,
          duration: shouldReduceMotion ? 0 : 0.48,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ mixBlendMode: "soft-light" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-28 bg-gradient-to-b from-transparent via-background/55 to-background"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[640px] -translate-y-4 flex-col items-center text-center sm:-translate-y-8 lg:-translate-y-10">
        {!isMobile ? (
          <BlurFade delay={BLUR_FADE_DELAY}>
            <motion.button
              layout
              type="button"
              aria-label={
                isWaterLabelActive ? WATER_MODE_LABEL : DEFAULT_MODE_LABEL
              }
              aria-checked={isWaterLabelActive}
              role="switch"
              className="water-mode-button group relative isolate mb-6 inline-flex items-center justify-center overflow-hidden rounded-full border border-black/[0.05] bg-[#F7F7FA] px-3.5 py-2 text-[13px] font-medium text-[#7892A3] shadow-[0_0_0_1px_rgba(0,0,0,.035),0_1px_1px_.5px_rgba(0,0,0,.06),0_3px_3px_1.5px_rgba(0,0,0,.05),0_8px_14px_-5px_rgba(0,0,0,.08),inset_0_1px_0_rgba(255,255,255,.95)] transition-[border-color,background-color,box-shadow,color] duration-500 hover:border-[#3BA0FF]/40 hover:bg-white hover:text-[#557A92] hover:shadow-[0_0_0_1px_rgba(59,160,255,.10),0_2px_3px_rgba(0,0,0,.05),0_8px_18px_-6px_rgba(0,0,0,.10),0_0_18px_-7px_rgba(59,160,255,.55),inset_0_1px_0_#fff,inset_0_-12px_18px_-14px_rgba(59,160,255,.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/30"
              onClick={toggleWaterMode}
              transition={{
                layout: {
                  duration: shouldReduceMotion ? 0 : 0.72,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#3BA0FF]/20 via-[#3BA0FF]/[0.035] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative z-10">
                <WaterModeLabel
                  active={isWaterLabelActive}
                  reduceMotion={Boolean(shouldReduceMotion)}
                />
              </span>
            </motion.button>
          </BlurFade>
        ) : null}

        <HeroTitleReveal
          className="max-w-full font-[var(--font-heading)] text-[40px] font-medium leading-[0.95] tracking-[-3px] text-[#29303B] min-[390px]:text-[44px] sm:text-[72px]"
          delay={BLUR_FADE_DELAY * 3}
          text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
        />

        <BlurFade delay={1.28}>
          <div className="mt-5 flex w-full flex-col items-center gap-[36px]">
            <p className="mx-auto max-w-[520px] text-base leading-[1.35] text-[#29303B]">
              Proactive UI/UX Designer
              <br />
              <span className="text-[hsl(var(--ink-soft))]">
                Bridging user needs, business goals,
                <br />
                and product outcomes
              </span>
            </p>
            <HeroCtaButtons />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
