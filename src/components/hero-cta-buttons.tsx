"use client";

import Link from "next/link";
import { useState } from "react";
import { CvMorphIcon } from "@/components/cv-morph-icon";

const CV_URL =
  "https://drive.google.com/file/d/1gLkY5mOFYf0NKvDU5oKwIqxyRtvT8PPt/view?usp=sharing";

export function HeroCtaButtons() {
  const [isWorksActive, setIsWorksActive] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Link
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#08090a] bg-[#08090a] px-6 text-[18px] font-medium text-white shadow-[0_14px_34px_rgba(23,23,23,0.16)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ff76ed]/65 hover:shadow-[0_16px_38px_rgba(190,137,255,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be89ff]/35"
        href="#projects"
        onBlur={() => setIsWorksActive(false)}
        onFocus={() => setIsWorksActive(true)}
        onPointerCancel={() => setIsWorksActive(false)}
        onPointerDown={() => setIsWorksActive(true)}
        onPointerEnter={() => setIsWorksActive(true)}
        onPointerLeave={() => setIsWorksActive(false)}
        onPointerUp={() => setIsWorksActive(false)}
      >
        <CvMorphIcon active={isWorksActive} />
        View my works
      </Link>
      <Link
        className="text-[18px] font-medium text-[#a855f7] underline-offset-4 transition duration-300 hover:text-[#ff51ff] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be89ff]/35"
        href={CV_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        Read my CV
      </Link>
    </div>
  );
}
