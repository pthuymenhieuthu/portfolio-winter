"use client";

import dynamic from "next/dynamic";
import { DATA } from "@/data/resume";
import { HeroCtaButtons } from "@/components/hero-cta-buttons";

const CursorRippleBackground = dynamic(
  () => import("./cursor-ripple-background").then((module) => module.CursorRippleBackground),
  { ssr: false }
);

export function HomeHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex h-[100dvh] w-full shrink-0 items-center justify-center overflow-hidden bg-background px-6 py-12"
    >
      <CursorRippleBackground interactive />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
        style={{ background: "linear-gradient(to bottom, hsl(var(--background) / 0) 0%, hsl(var(--background) / 0.25) 30%, hsl(var(--background) / 0.72) 68%, hsl(var(--background)) 100%)" }}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col items-center text-center">
        <h1 className="text-balance font-[var(--font-heading)] text-[40px] font-medium leading-[1.05] tracking-[-0.035em] text-[#29303B] min-[390px]:text-[44px] sm:text-[72px]">
          Hi, I&apos;m {DATA.name.split(" ")[0]}
        </h1>
        <div className="mt-5 flex w-full flex-col items-center gap-9">
          <p className="mx-auto max-w-[520px] text-base leading-[1.5] text-[#29303B]">
            Proactive UI/UX Designer
            <br />
            <span className="text-[#496779]">
              Bridging user needs, business goals,
              <br />
              and product outcomes
            </span>
          </p>
          <HeroCtaButtons />
        </div>
      </div>
    </section>
  );
}
