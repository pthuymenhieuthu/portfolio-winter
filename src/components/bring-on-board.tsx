"use client";

import dynamic from "next/dynamic";

const BringOnBoardWater = dynamic(
  () =>
    import("@/components/bring-on-board-water").then(
      (module) => module.BringOnBoardWater
    ),
  { ssr: false }
);

export function BringOnBoard() {
  return (
    <section
      id="bring-on-board"
      className="relative isolate w-full overflow-hidden bg-[#f8fcff] px-5 py-[72px] sm:px-6 sm:py-[88px] lg:py-24"
    >
      <BringOnBoardWater />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,#ffffff_0%,rgba(248,252,255,0.88)_22%,rgba(230,246,255,0.08)_58%,rgba(175,231,252,0.12)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-b from-transparent to-[#F2F6FA]" />

      <div className="mx-auto flex min-h-[620px] w-full max-w-[1173px] flex-col items-center sm:min-h-[700px] lg:min-h-[760px]">
        <div className="relative z-20 mx-auto max-w-[620px] text-center">
          <p className="text-sm font-normal text-[#29303B]/55">
            Creative flow
          </p>
          <h2 className="mt-5 font-[var(--font-heading)] text-[32px] font-medium leading-[1.08] tracking-normal text-[#29303B] sm:text-[44px] lg:text-[52px]">
            What I bring
            <br />
            into the flow
          </h2>
          <p className="mx-auto mt-5 max-w-[660px] text-base leading-[1.45] text-[#737373]">
            Product thinking, UI systems, motion, and AI - different strengths
            moving together to shape one clear experience.
          </p>
        </div>
      </div>
    </section>
  );
}
