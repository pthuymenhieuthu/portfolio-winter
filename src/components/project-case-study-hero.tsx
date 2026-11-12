"use client";

import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ProjectMockupBackground } from "@/components/affina-mockup-hero";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";

export type ProjectHeroLink = {
  href: string;
  label: string;
  icon?: "website" | "behance" | "appstore" | "googleplay" | "link";
};

type ProjectCaseStudyHeroProps = {
  id: string;
  title: string;
  titleLines: readonly [string, string];
  role: string;
  scope: string;
  status: string;
  outcome: string;
  colors: string[];
  links?: readonly ProjectHeroLink[];
  delay?: number;
  summary?: React.ReactNode;
  summaryLines?: readonly [string, string, string];
  background?: React.ReactNode;
  backgroundSrc?: string;
  posterSrc?: string;
};

function LinkIcon({ icon }: { icon: ProjectHeroLink["icon"] }) {
  const className = "size-4 shrink-0";

  if (icon === "behance") return <Icons.behance aria-hidden="true" className={className} />;
  if (icon === "appstore") return <Icons.appstore aria-hidden="true" className={className} />;
  if (icon === "googleplay") return <Play aria-hidden="true" className={`${className} fill-current`} />;
  if (icon === "link") return <ExternalLink aria-hidden="true" className={className} />;
  return <Icons.globe aria-hidden="true" className={className} />;
}

export function ProjectCaseStudyHero({
  id,
  title,
  titleLines,
  role,
  scope,
  status,
  outcome,
  summary,
  summaryLines,
  background,
  backgroundSrc,
  posterSrc,
  links = [],
}: ProjectCaseStudyHeroProps) {
  const reduceMotion = useReducedMotion();
  const hasBackground = Boolean(background || backgroundSrc);
  const isAnimated = Boolean(backgroundSrc?.match(/\.gif(?:[?#]|$)/i));
  const mediaSrc = isAnimated && !reduceMotion ? backgroundSrc : posterSrc || backgroundSrc;
  const heading = useRef<HTMLHeadingElement>(null);
  const [titleSize, setTitleSize] = useState<number>();

  useEffect(() => {
    const element = heading.current;
    if (!element) return;
    const fit = () => {
      const base = window.matchMedia("(min-width: 640px)").matches ? 52 : 36;
      const current = parseFloat(getComputedStyle(element).fontSize);
      const widest = Math.max(...Array.from(element.children, (line) => line.getBoundingClientRect().width));
      if (!widest || !element.clientWidth) return;
      setTitleSize(Math.floor(Math.min(base, element.clientWidth * current / widest) * 100) / 100);
    };
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    let mounted = true;
    void document.fonts.ready.then(() => { if (mounted) fit(); });
    fit();
    return () => { mounted = false; observer.disconnect(); };
  }, [titleLines]);

  return (
    <>
    <header id={id} data-project-hero="true" className={hasBackground ? "relative isolate flex h-[100dvh] w-full items-end overflow-hidden bg-black text-white" : "text-[#1d1d1d]"}>
      {hasBackground && (
        <>
          {background || (mediaSrc && (isAnimated
            ? <Image src={mediaSrc} alt="" fill unoptimized priority sizes="100vw" className="pointer-events-none select-none object-cover object-center" />
            : <ProjectMockupBackground src={mediaSrc} />))}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-black/60" />
          <div aria-hidden="true" className="project-hero-reading-backdrop pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[min(85%,560px)]" />
          <div aria-hidden="true" className="project-hero-noise pointer-events-none absolute inset-0 z-[2]" />
        </>
      )}
      <div className={cn("relative z-10 mx-auto grid w-full grid-cols-1 items-end gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto]", hasBackground ? "pb-28 pt-24 lg:px-12 lg:pb-12" : "max-w-[1040px] pb-10 pt-24 sm:pb-12 sm:pt-28")}>
        <div className="min-w-0">
        <h1 ref={heading} aria-label={title} style={{ fontSize: titleSize }} className={cn("max-w-[1050px] font-[var(--font-heading)] text-[36px] font-medium leading-[1.12] tracking-[-0.035em] sm:text-[52px]", hasBackground && "text-white")}>
          {titleLines.map((line) => <span key={line} className="block w-max whitespace-nowrap">{line}</span>)}
        </h1>
        {(summary || summaryLines) && <p className={cn("mt-6 max-w-[46ch] text-sm leading-relaxed sm:text-base", hasBackground ? "text-white" : "text-[#626773]")}>{summaryLines ? summaryLines.map((line) => <span key={line} className="block whitespace-nowrap">{line}{" "}</span>) : summary}</p>}
        </div>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-3 lg:justify-self-end">
            {links.map((link) => (
              <a
                aria-label={link.href.startsWith("/") || link.href.startsWith("#") ? `Go to ${link.label}` : `Open ${link.label} in a new tab`}
                className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", hasBackground ? "border-white/40 text-white hover:bg-white/15 focus-visible:outline-white" : "border-black/15 hover:bg-black/5 focus-visible:outline-[#29303B]")}
                href={link.href}
                key={`${link.label}-${link.href}`}
                rel={link.href.startsWith("/") || link.href.startsWith("#") ? undefined : "noreferrer"}
                target={link.href.startsWith("/") || link.href.startsWith("#") ? undefined : "_blank"}
              >
                <LinkIcon icon={link.icon} />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
    <div data-project-metadata="true" className="mx-auto w-full max-w-[1040px] px-5 pt-[120px] text-[#1d1d1d] sm:px-8">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {[["Role", role], ["Scope", scope], ["Status", status], ["Outcome", outcome]].map(([label, value]) => (
          <div key={label}>
            <dt className="text-base leading-6 text-[#626773]">{label}</dt>
            <dd className="mt-3 text-base leading-relaxed sm:text-lg">
              {label === "Status" && value === "Live" ? (
                <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[#16a34a]" />{value}</span>
              ) : value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
    </>
  );
}
