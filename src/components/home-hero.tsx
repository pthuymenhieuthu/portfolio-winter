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
      className="relative isolate flex min-h-[580px] w-full items-center justify-center overflow-hidden bg-background px-6 py-24 sm:min-h-[670px] md:min-h-[780px] lg:min-h-[860px] min-[1920px]:min-h-[100svh]"
    >
      <CursorRippleBackground interactive />
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
