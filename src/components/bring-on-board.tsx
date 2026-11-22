"use client";

import dynamic from "next/dynamic";
import serviceStyles from "@/components/freelance-services.module.css";

const FloatingToolsWater = dynamic(
  () => import("@/components/floating-tools-water").then((module) => module.FloatingToolsWater),
  { ssr: false }
);

export function BringOnBoard() {
  return (
    <section id="bring-on-board" aria-labelledby="creative-flow-heading"
      className="relative isolate flex min-h-[640px] w-full scroll-mt-20 items-center justify-center overflow-hidden bg-[#e6f6ff] px-5 py-24 sm:min-h-[740px] sm:px-6 lg:min-h-[800px]">
      <FloatingToolsWater />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-[#F2F6FA]" />
      <div className={`pointer-events-none relative z-20 mx-auto max-w-[620px] text-center ${serviceStyles.heading}`} style={{ marginBottom: 0 }}>
        <div className={serviceStyles.eyebrow}>Creative flow</div>
        <h2 id="creative-flow-heading" className="text-[#29303b]">
          What I bring<br />into the flow
        </h2>
        <p className="mx-auto max-w-[460px]">
          Product thinking, UI systems, motion, and AI - different strengths
          moving together to shape one clear experience.
        </p>
      </div>
    </section>
  );
}
