"use client";

import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

import { Icons } from "@/components/icons";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { ProjectMeshGradient } from "@/components/project-mesh-gradient";

export type ProjectHeroLink = {
  href: string;
  label: string;
  icon?: "website" | "behance" | "appstore" | "googleplay" | "link";
};

type ProjectCaseStudyHeroProps = {
  id: string;
  title: string;
  titleLines: readonly string[];
  role: string;
  scope: string;
  status: string;
  outcome: string;
  colors: string[];
  links?: readonly ProjectHeroLink[];
  delay?: number;
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
  colors,
  links = [],
  delay = 0.96,
}: ProjectCaseStudyHeroProps) {
  const longestTitleLine = Math.max(...titleLines.map((line) => line.length));
  const titleSizeClass = longestTitleLine >= 25
    ? "text-[clamp(23px,calc(4.3vw+9.3px),60px)]"
    : longestTitleLine >= 22
      ? "text-[clamp(24px,calc(7.15vw+1.1px),60px)]"
      : longestTitleLine >= 19
        ? "text-[clamp(27px,calc(5.7vw+8.8px),60px)]"
        : "text-[clamp(31px,calc(4.3vw+17.2px),60px)]";
  const statusClass = /uat|test/i.test(status)
    ? "text-[#ffd166] sm:text-[#b86900]"
    : /personal/i.test(status)
      ? "text-[#b9ddff] sm:text-[#2878bd]"
      : "text-[#68ed82] sm:text-[#19c332]";

  return (
    <section
      id={id}
      className="relative isolate flex min-h-[800px] max-w-full items-center justify-center overflow-hidden bg-[#f9f4ff] px-5 py-24 text-left text-white sm:px-8 sm:text-[#1d1d1d]"
    >
      <ProjectMeshGradient colors={colors} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/10 sm:hidden" />

      <div className="pointer-events-none absolute left-[-41px] top-[167px] -z-10 hidden h-[846px] w-[2026px] items-center justify-center sm:flex">
        <div className="-scale-y-100 rotate-[3.16deg]">
          <Image
            alt=""
            className="block h-[738px] w-[1988px] max-w-none"
            height={746}
            priority
            src="/assets/affina/hero-mesh-cutout-bottom.svg"
            width={1996}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute left-[calc(50%+183px)] top-[-218px] -z-10 hidden h-[756px] w-[2006px] -translate-x-1/2 items-center justify-center sm:flex">
        <div className="-scale-y-100 rotate-[-178.43deg]">
          <Image
            alt=""
            className="block h-[702px] w-[1988px] max-w-none"
            height={702}
            priority
            src="/assets/affina/hero-mesh-cutout-top.svg"
            width={1988}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[976px] flex-col items-start">
        <HeroTitleReveal
          className={`${titleSizeClass} max-w-[976px] font-[var(--font-heading)] font-medium leading-[1.1] tracking-[-2.5px] text-white sm:text-[#1d1d1d]`}
          delay={delay}
          lines={titleLines}
          text={title}
        />
        <BlurFade delay={delay + 0.16}>
          <div className="mt-10 flex w-full max-w-[760px] flex-col items-start gap-[19px] backdrop-blur-[12px]">
            <div>
              <p className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[0.14em] text-white/65 sm:text-[#2e2e2e]/65">Role</p>
              <p className="mt-[11px] text-base leading-6 sm:text-xl">{role}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[0.14em] text-white/65 sm:text-[#2e2e2e]/65">Scope</p>
              <p className="mt-[11px] text-base leading-6 sm:text-xl">{scope}</p>
            </div>
            <div className="flex flex-col items-start gap-[9px]">
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[0.14em] text-white/65 sm:text-[#2e2e2e]/65">Status</p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${statusClass}`}>
                  <span className="size-1.5 rounded-full bg-current shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]" />
                  {status}
                </span>
              </div>
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {links.map((link) => (
                    <a
                      aria-label={`Open ${link.label} in a new tab`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#a3a3a3]/10 px-3 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition hover:bg-white/20 sm:text-base sm:text-[#1d1d1d]"
                      href={link.href}
                      key={`${link.label}-${link.href}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <LinkIcon icon={link.icon} />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[0.14em] text-white/65 sm:text-[#2e2e2e]/65">Outcome</p>
              <p className="mt-[11px] text-base leading-6 sm:text-xl">{outcome}</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
