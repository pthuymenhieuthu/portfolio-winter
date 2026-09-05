"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";

const PROJECT_HERO_DELAY = 0.36;

const sections = [
  { id: "affina-overview", label: "Making insurance feel simple" },
  { id: "affina-work", label: "Designing clearer healthcare journeys" },
  {
    id: "affina-challenge-01",
    label: "Challenge 01: AI-assisted online insurance journey",
  },
  {
    id: "affina-challenge-02",
    label: "Challenge 02: Healthcare-oriented design system",
  },
  { id: "affina-brand", label: "Challenge 03: Rebuilding the brand foundation" },
  { id: "affina-next", label: "Next projects" },
  { id: "affina-contact", label: "Get in touch" },
];

const challenges = [
  {
    label: "Challenge 01",
    title: "Turning an offline sales journey into an AI-assisted online experience",
    question:
      "How can users move from many products, benefits and conditions toward a confident next action?",
  },
  {
    label: "Challenge 02",
    title: "Evolving the system for healthcare.",
    question:
      "How could Affina become warmer and more healthcare-oriented without creating an entirely new design system?",
  },
  {
    label: "Challenge 03",
    title: "Maintaining design ownership beyond handoff.",
    question:
      "How could hierarchy, spacing and interactions remain strong once the interface moved into the browser?",
  },
  {
    label: "Challenge 04",
    title: "Scaling one visual language across touchpoints.",
    question:
      "How could product, website, partners and campaigns feel part of the same ecosystem?",
  },
];

const journeySteps = [
  {
    number: "1",
    title: "Survey",
    eyebrow: "Start with less friction",
    body: "I made the survey accessible directly from the homepage. Users can open it in a modal and start without leaving the page.",
    detailLabel: "The survey asks only what's needed:",
    detail:
      "Insurance type -> Gender -> Date of birth -> Budget -> Main & additional benefits -> Preferred insurers",
    media: [
      "/assets/affina/journey/survey-01.png",
      "/assets/affina/journey/survey-02.png",
      "/assets/affina/journey/survey-03.png",
      "/assets/affina/journey/survey-04.png",
    ],
  },
  {
    number: "2",
    title: "Recommend",
    eyebrow: "Make the best options easy to scan",
    body: "I surfaced 3 recommended plans",
    bullets: [
      "Highlight the best-fit plan first",
      "Show price and key benefits upfront",
      "Keep \"Why this plan?\" inside the card without taking extra space",
      "Make differences between plans easy to scan",
    ],
    media: [
      "/assets/affina/journey/recommend-loading.png",
      "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787911198/recommend_3_iqlh41.gif",
    ],
  },
  {
    number: "3",
    title: "Compare",
    eyebrow: "Make complex benefits easier to compare across web and mobile",
    bullets: [
      "Keep the same 3 plans from recommendation",
      "Group benefits into clear rows",
      "Highlight meaningful differences",
      "Use status and \"Best choice\" cues for faster scanning",
    ],
    media: [
      "/assets/affina/journey/recommend-compare.png",
      "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787911103/compare_1_ovmofq.gif",
    ],
  },
];

const healthcareRows = [
  {
    number: "1",
    title: "Preserve the core",
    bold: "component structure, primitives and alias",
    before: "Kept the existing",
    after: "tokens to avoid unnecessary rebuilds.",
    image: "/assets/affina/product-screen-1.png",
    ratio: "aspect-[1213/894]",
  },
  {
    number: "2",
    title: "Evolving the system for a new care direction",
    bold: "Updated foundation values and extended components",
    after: "with flexible slots to support the new Care direction.",
    image: "/assets/affina/product-screen-2.png",
    ratio: "aspect-[1213/973]",
  },
  {
    number: "3",
    title: "Handoff & maintain",
    bold: "Documented naming conventions, exported CSS values",
    after: "for IT, and tracked future changes through a Figma change log.",
    image: "/assets/affina/product-screen-3.png",
    ratio: "aspect-[1213/924]",
  },
  {
    number: "4",
    title: "From system to product",
    bold: "Documented naming conventions, exported CSS values",
    after: "for IT, and tracked future changes through a Figma change log.",
    phones: true,
  },
];

const processSteps = [
  { label: "Survey", active: true },
  { label: "Recommend", active: true },
  { label: "Compare", active: true },
  { label: "Complete Info", active: false },
  { label: "Purchase", active: false },
];

const workedOnItems = [
  {
    title: "Designed and reworked key user flows",
    body: "Simplified steps, content hierarchy and interactions across existing web journeys",
  },
  {
    title: "Collaborated across Product, business and development",
    body: "Aligned user needs, business requirements and technical constraints before bringing flows into production",
  },
  {
    title: "Translated the design system into consistent web experiences",
    body: "Defined responsive behavior, interaction states and reusable UI patterns across screens",
  },
  {
    title: "Tested real flows and iterated after implementation",
    body: "Reviewed usability, visual consistency and edge cases, then refined the experience with developers",
  },
  {
    title: "Implemented selected front-end UI refinements with HTML/CSS",
    body: "Worked within the existing WordPress and plugin foundation while partnering with developers on backend or plugin-level changes",
  },
];

const measuredBehaviorStats = [
  { value: "1,567", label: "Users" },
  { value: "2,046", label: "Sessions" },
  { value: "3,078", label: "Page views" },
  { value: "29", label: "Leads" },
  { value: "1.42%", label: "Lead conversion" },
];

const nextMeasurementSteps = [
  "Increase survey entry from organic traffic.",
  "Reduce drop-off across key survey steps.",
  "Improve recommendation relevance to support conversion.",
];

const styles = {
  sectionPill: "w-fit rounded-lg bg-[#08090a] px-3 py-1.5 text-base text-white",
  accentLabel: "text-sm font-bold uppercase tracking-[0.12em] text-[#ff51ff]",
  mutedLabel: "text-sm uppercase tracking-[0.08em] text-[#737373] sm:text-base",
  sectionTitle:
    "font-[var(--font-affina-heading)] text-[32px] font-bold leading-[1.2] tracking-normal sm:text-4xl",
  leadText: "text-lg leading-8 text-[#737373] sm:text-xl sm:leading-[1.6]",
  bodyText: "text-base leading-7 text-[#454545] sm:text-lg",
  compactBody: "text-base leading-7 text-[#454545]",
};

type CaseProject = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
};

const nextProjects = ["Zoan AI", "TrueProfit", "Language Learning Apps"]
  .map((name) =>
    (DATA.projects as readonly CaseProject[]).find((project) =>
      project.title.toLowerCase().includes(name.toLowerCase())
    )
  )
  .filter((project): project is CaseProject => Boolean(project));

function AffinaPhoneMockup({
  className,
  screenPosition = "top",
}: {
  className?: string;
  screenPosition?: "top" | "middle";
}) {
  return (
    <div
      className={cn(
        "relative aspect-[372/750] w-[150px] shrink-0 sm:w-[186px]",
        className
      )}
    >
      <div className="absolute inset-[2.5%_5.7%] overflow-hidden rounded-[15px] bg-[#f7f7f7]">
        <Image
          src="/assets/affina/phone-inner.png"
          alt=""
          width={780}
          height={3500}
          className={cn(
            "h-[207%] w-full object-cover",
            screenPosition === "middle" && "translate-y-[-34%]"
          )}
          sizes="186px"
        />
      </div>
      <Image
        src="/assets/affina/phone-frame.png"
        alt=""
        width={372}
        height={750}
        className="absolute inset-0 h-full w-full object-contain"
        sizes="186px"
      />
    </div>
  );
}

function AffinaMacBookMockup() {
  return (
    <div className="relative mx-auto aspect-[2010/1325] w-full max-w-[560px]">
      <Image
        src="/assets/affina/journey/recommend-compare.png"
        alt=""
        width={2010}
        height={1325}
        className="absolute inset-0 h-full w-full object-contain"
        sizes="(max-width: 768px) 90vw, 560px"
      />
    </div>
  );
}

function JourneyMacBook({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative flex aspect-[2010/1325] w-[300px] shrink-0 items-center justify-center sm:w-[400px]">
      <ResponsiveMotionImage
        src={src}
        alt={alt}
        width={2010}
        height={1325}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function AffinaDeviceShowcase() {
  return (
    <div className="grid items-center gap-10 py-4 sm:py-6 lg:grid-cols-[0.9fr_1.25fr]">
      <div className="flex items-start justify-center gap-4 sm:gap-5">
        <AffinaPhoneMockup />
        <AffinaPhoneMockup screenPosition="middle" />
      </div>
      <AffinaMacBookMockup />
    </div>
  );
}

function AffinaHealthcareRow({
  row,
}: {
  row: (typeof healthcareRows)[number];
}) {
  return (
    <div className="grid items-start gap-8 md:grid-cols-[0.88fr_1.12fr] lg:gap-[45px]">
      <div className="flex flex-col items-start gap-2">
        <div className="flex size-[29px] items-center justify-center rounded-full bg-[#08090a] text-base font-bold leading-none text-white">
          {row.number}
        </div>
        <h3 className="font-[var(--font-affina-body)] text-xl uppercase leading-[1.2] tracking-normal text-[#08090a] sm:text-2xl">
          {row.title}
        </h3>
        <p className={cn("pt-4", styles.bodyText)}>
          {row.before && <>{row.before} </>}
          <strong>{row.bold}</strong> {row.after}
        </p>
      </div>

      {row.phones ? (
        <div className="flex items-center justify-center gap-3 sm:justify-start">
          <AffinaPhoneMockup className="w-[136px] sm:w-[186px]" />
          <AffinaPhoneMockup
            className="w-[136px] sm:w-[186px]"
            screenPosition="middle"
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-sm">
          <ImageZoom>
            <Image
              src={row.image || ""}
              alt=""
              width={1213}
              height={894}
              className={cn(
                "w-full rounded-xl object-cover object-top",
                row.ratio
              )}
              sizes="(max-width: 768px) 90vw, 500px"
            />
          </ImageZoom>
        </div>
      )}
    </div>
  );
}

function ComparisonPanel({
  label,
  children,
  tone = "before",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "before" | "after";
}) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center gap-6 p-6 text-center",
        "pt-[72px] sm:p-8 sm:pt-20",
        tone === "before" ? "bg-[#e6e6e6]" : "bg-white"
      )}
    >
      <p className="text-xl uppercase text-black/25">{label}</p>
      {children}
    </div>
  );
}

function ComparisonRow({
  title,
  before,
  after,
}: {
  title: string;
  before: React.ReactNode;
  after: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.04]">
      <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2 rounded-xl bg-[#0d0d0d] px-4 py-1.5 text-sm font-bold text-white sm:text-base">
        {title}
      </div>
      <div className="grid sm:grid-cols-2">
        <ComparisonPanel label="Before">{before}</ComparisonPanel>
        <ComparisonPanel label="After" tone="after">
          {after}
        </ComparisonPanel>
      </div>
    </div>
  );
}

function AffinaStickyIndicator() {
  const [activeLabel, setActiveLabel] = useState(sections[0].label);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("affina-overview");

    const updateVisibility = () => {
      if (!hero) return;

      setIsVisible(window.scrollY > hero.offsetHeight - 48);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    const observers = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element))
      .map((element) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              const section = sections.find((item) => item.id === element.id);
              if (section) setActiveLabel(section.label);
            }
          },
          { rootMargin: "-18% 0px -62% 0px", threshold: 0.01 }
        );

        observer.observe(element);
        return observer;
      });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-transparent">
      <div
        className={cn(
          "pointer-events-auto flex h-8 w-full items-center justify-center border-b border-black/10 bg-white/65 px-4 text-[13px] tracking-normal text-black shadow-[0_8px_30px_rgba(22,5,31,0.12)] backdrop-blur-xl backdrop-saturate-150 transition-transform duration-500 ease-out sm:text-sm",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {activeLabel}
      </div>
    </div>
  );
}

function NextProjectCard({
  project,
  featured = false,
}: {
  project: CaseProject;
  featured?: boolean;
}) {
  return (
    <Link
      href={project.href || "#"}
      className={cn(
        "group block overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.2fr_0.9fr] md:items-stretch"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#eee7f7]",
          featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"
        )}
      >
        {project.video ? (
          <ResponsiveMotionImage
            src={project.video}
            alt={project.title}
            width={1200}
            height={675}
            mobilePosterSrc={project.image || undefined}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            unoptimized
            sizes={
              featured
                ? "(max-width: 768px) 90vw, 560px"
                : "(max-width: 768px) 90vw, 440px"
            }
          />
        ) : project.image ? (
          <ResponsiveMotionImage
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            sizes={
              featured
                ? "(max-width: 768px) 90vw, 560px"
                : "(max-width: 768px) 90vw, 440px"
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#ff6831,#ff51ff,#7a35ff)] text-white">
            <span className="font-[var(--font-affina-heading)] text-4xl font-bold">
              {project.title.slice(0, 1)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between gap-10 p-7 sm:p-8">
        <div>
          <p className={styles.accentLabel}>
            {featured ? "Next project" : project.dates}
          </p>
          <h3
            className={cn(
              "mt-3 font-[var(--font-affina-heading)] font-bold leading-[1.18] tracking-normal",
              featured ? "text-3xl leading-[1.18] sm:text-4xl" : "text-2xl"
            )}
          >
            {project.title}
          </h3>
          <p className={cn("mt-4", styles.compactBody, "text-[#737373]")}>
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span
              className="rounded-full bg-[#f9f4ff] px-3 py-1.5 text-xs text-[#454545]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function AffinaCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f9f4ff] font-[var(--font-affina-body)] text-[#08090a]">
      <AffinaStickyIndicator />

      <section
        id="affina-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[#f9f4ff] px-6 text-center text-white sm:min-h-[800px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,#ffd360_0%,transparent_28%),radial-gradient(circle_at_82%_24%,#ff51ff_0%,transparent_30%),linear-gradient(135deg,#ff6831_0%,#ff51ff_48%,#7a35ff_100%)]" />
        <Image
          src="/assets/affina/affina-hero-blob-top.svg"
          alt=""
          width={1440}
          height={422}
          priority
          className="pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none"
        />
        <Image
          src="/assets/affina/affina-hero-blob-bottom.svg"
          alt=""
          width={1440}
          height={526}
          priority
          className="pointer-events-none absolute bottom-[-120px] left-1/2 -z-10 w-[max(1320px,110vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-150px]"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-col items-center gap-5">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-base backdrop-blur">
            Web & Mobile · Oct 2025 - Present
          </p>
          <HeroTitleReveal
            className="max-w-[340px] font-[var(--font-affina-heading)] text-[clamp(36px,9.8vw,64px)] font-bold leading-[1.05] tracking-normal sm:max-w-none sm:text-[64px]"
            delay={PROJECT_HERO_DELAY}
            text="Affina"
          />
          <BlurFade delay={1.12}>
            <p className="mx-auto max-w-[340px] text-base leading-[1.35] text-white">
              Brand & Product Transformation
              <br />
              <span className="text-white/75">
                · Scalable design system and
                <br className="sm:hidden" /> AI-enhanced workflow
              </span>
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-28 px-5 py-24 sm:gap-32 sm:px-8 lg:gap-36 lg:py-36">
        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="affina-work">
          <div className="flex flex-col gap-7">
            <span className={styles.sectionPill}>
              My Projects
            </span>
            <h2 className="max-w-[760px] font-[var(--font-affina-heading)] text-[34px] font-bold leading-[1.28] tracking-normal sm:text-5xl sm:leading-[1.24]">
              Designing clearer insurance and healthcare experiences
            </h2>
            <p className={styles.leadText}>
              I worked across Affina&apos;s digital ecosystem, simplifying insurance
              journeys, evolving an existing design system toward a more
              healthcare-oriented experience, refining interfaces beyond
              handoff, and keeping the product language consistent across
              digital touchpoints.
            </p>
          </div>

          <AffinaDeviceShowcase />

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["Role", "UI/UX, product system, brand foundation"],
              ["Scope", "Web, mobile, design system, AI workflow"],
              ["Outcome", "Clearer journeys and stronger brand consistency"],
            ].map(([title, body]) => (
              <div className="border-t border-black/10 pt-5" key={title}>
                <p className={styles.accentLabel}>
                  {title}
                </p>
                <p className={cn("mt-3", styles.compactBody)}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="affina-system">
          <div className="flex flex-col gap-6 sm:gap-7">
            <span className={styles.sectionPill}>
              The work
            </span>
            <h2 className={styles.sectionTitle}>
              From fragmented touchpoints to one scalable system
            </h2>
            <p className={cn("max-w-[720px]", styles.leadText)}>
              The project moved across product flow, UI implementation, brand
              foundation, and system consistency. I framed the work around four
              design challenges so the case study can show what changed and why.
            </p>
          </div>

          <div className="grid gap-6">
            {challenges.map((item) => (
              <article
                className="border-t border-black/10 pt-6"
                key={item.label}
              >
                <p className={styles.accentLabel}>{item.label}</p>
                <h3 className="mt-3 font-[var(--font-affina-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
                  {item.title}
                </h3>
                <p className={cn("mt-4", styles.compactBody)}>
                  {item.question}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="affina-challenge-01">
          <div className="flex flex-col gap-6 sm:gap-7">
            <span className={styles.sectionPill}>
              Challenge 01
            </span>
            <h2 className={styles.sectionTitle}>
              Turning an offline sales journey into an AI-assisted online
              experience
            </h2>
          </div>

          <div className="grid gap-6">
            <article className="border-t border-black/10 pt-6">
              <p className={styles.accentLabel}>
                Business context
              </p>
              <p className={cn("mt-4", styles.bodyText)}>
                Affina wanted to move more of its insurance journey online.
              </p>
            </article>
            <article className="rounded-xl bg-[#08090a] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase text-[#ffd360]">
                Our solution
              </p>
              <p className="mt-4 max-w-[900px] text-lg leading-8 text-white/85 sm:text-xl sm:leading-9">
                Instead of simply digitising the sales form, we built an
                AI-assisted journey that narrowed choices, recommended suitable
                plans, and made comparison easier.
              </p>
            </article>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border-t border-black/10 pt-6">
              <p className="font-[var(--font-affina-heading)] text-[52px] font-bold leading-none tracking-[-0.05em] text-[#ff51ff]">
                46%
              </p>
              <p className={cn("mt-4", styles.compactBody)}>
                were open to buying insurance online.
              </p>
              <p className="mt-5 text-sm text-[#737373]">
                Source: IXT by OneDegree, 2022
              </p>
            </div>
            <div className="border-t border-black/10 pt-6">
              <p className="font-[var(--font-affina-heading)] text-[52px] font-bold leading-none tracking-[-0.05em] text-[#7a35ff]">
                43%+
              </p>
              <p className={cn("mt-4", styles.compactBody)}>
                in Vietnam and Thailand still valued agent support when going
                digital.
              </p>
              <p className="mt-5 text-sm text-[#737373]">
                Source: Swiss Re Institute, 2021
              </p>
            </div>
          </div>

          <div className="py-2">
            <div>
              <p className="text-sm font-bold uppercase leading-none tracking-normal text-[#08090a]">
                What I worked on
              </p>
              <p className="mt-4 max-w-[980px] text-base font-bold leading-7 text-[#08090a] sm:text-lg sm:leading-8">
                I redesigned and refined key web journeys across Affina, working
                closely with Product, business stakeholders and developers to make
                complex insurance flows clearer, smoother and easier to complete.
              </p>
            </div>

            <div className="mt-8">
              <div className="min-w-0">
                <div className="divide-y divide-black/10 border-t border-black/10">
                  {workedOnItems.map((item) => (
                    <div className="py-7 first:pt-7 sm:py-8" key={item.title}>
                      <h3 className="text-base font-bold leading-6 tracking-normal text-[#08090a]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-base leading-7 text-[#08090a]">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl shadow-sm">
                <ImageZoom zoomImg={{ src: "/assets/affina/user-flow-image.png" }}>
                  <Image
                    src="/assets/affina/user-flow-image.png"
                    alt="Affina insurance purchase user flow"
                    width={1920}
                    height={912}
                    unoptimized
                    className="h-auto w-full object-cover object-top"
                    sizes="(max-width: 640px) 90vw, 450px"
                  />
                </ImageZoom>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-sm">
                <ImageZoom zoomImg={{ src: "/assets/affina/gitlab-code-repo-blur.png" }}>
                  <Image
                    src="/assets/affina/gitlab-code-repo-blur.png"
                    alt="Affina GitLab code repository overview"
                    width={1792}
                    height={920}
                    unoptimized
                    className="h-auto w-full object-cover object-top"
                    sizes="(max-width: 640px) 90vw, 450px"
                  />
                </ImageZoom>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <p className={styles.accentLabel}>
              How I solved it
            </p>
            <h3 className="mt-4 font-[var(--font-affina-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
              I broke the decision into smaller, clearer steps.
            </h3>
            <div className="scrollbar-none mt-8 overflow-x-auto pb-2">
              <div className="relative flex w-max items-center gap-3 pr-20">
                <div className="pointer-events-none absolute left-3 right-6 top-1/2 h-px -translate-y-1/2 bg-[#08090a]/25">
                  <span className="absolute right-[-1px] top-1/2 size-2.5 -translate-y-1/2 rotate-45 border-r border-t border-[#08090a]/35" />
                </div>
                {processSteps.map((step) => (
                  <span
                    className={cn(
                      "relative z-10 rounded-full px-5 py-3 text-sm leading-none",
                      step.active
                        ? "bg-[#08090a] text-white"
                        : "bg-[#e8edf4] text-[#18181b]"
                    )}
                    key={step.label}
                  >
                    {step.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {journeySteps.map((step) => (
              <article className="grid grid-cols-[29px_1fr] gap-5" key={step.number}>
                <div className="flex flex-col items-center">
                  <div className="flex size-[29px] items-center justify-center rounded-full bg-[#08090a] text-base font-bold leading-none text-white">
                    {step.number}
                  </div>
                  {step.number !== "3" && (
                    <div className="h-full min-h-[64px] w-px bg-[#08090a]/25" />
                  )}
                </div>

                <div className="flex min-w-0 flex-col gap-5 pb-12 last:pb-0 sm:gap-6 sm:pb-14">
                  <div className="font-[var(--font-affina-body)]">
                    <h3 className="text-xl uppercase leading-[1.2] tracking-normal text-[#08090a] sm:text-2xl">
                      {step.title}
                    </h3>
                    <div className="mt-5 flex flex-col gap-5">
                      <p className={styles.mutedLabel}>
                        {step.eyebrow}
                      </p>
                      {step.body && (
                        <p className={styles.bodyText}>
                          {step.body}
                        </p>
                      )}
                      {step.detailLabel && (
                        <p className={styles.mutedLabel}>
                          {step.detailLabel}
                        </p>
                      )}
                      {step.detail && (
                        <p className={styles.bodyText}>
                          {step.detail}
                        </p>
                      )}
                      {step.bullets && (
                        <ul className={cn("list-disc pl-6", styles.bodyText)}>
                          {step.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="scrollbar-none overflow-x-auto pb-5 pt-1">
                    <div className="flex w-max items-center gap-8 sm:gap-10">
                      {step.media.map((src, index) => (
                        <ImageZoom key={`${step.number}-${src}`}>
                          <JourneyMacBook
                            src={src}
                            alt={`${step.title} screen ${index + 1}`}
                          />
                        </ImageZoom>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl">
            <ImageZoom>
              <Image
                src="/assets/affina/affina-care-journey-scene.png"
                alt="Affina healthcare journey scene"
                width={1680}
                height={940}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 90vw, 934px"
              />
            </ImageZoom>
          </div>

          <div className="rounded-2xl bg-[#08090a] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#ffd360]">
                  Measured behavior
                </p>
                <h3 className="mt-4 font-[var(--font-affina-heading)] text-2xl font-bold leading-[1.2] tracking-normal sm:text-4xl">
                  30-day snapshot after launch
                </h3>
              </div>
              <p className="max-w-[300px] text-sm leading-6 text-white/55 sm:text-right">
                Traffic during this period was primarily organic and internal
                testing, with no paid acquisition campaigns.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {measuredBehaviorStats.map((stat) => (
                <div
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                  key={stat.label}
                >
                  <p className="font-[var(--font-affina-heading)] text-[30px] font-bold leading-none tracking-normal text-white sm:text-[34px]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-white/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-xl bg-white p-5 text-[#08090a]">
                <p className="font-[var(--font-affina-heading)] text-[44px] font-bold leading-none tracking-normal text-[#ff51ff]">
                  61.4%
                </p>
                <p className="mt-4 text-base leading-7 text-[#454545]">
                  of sessions that reached recommendations continued to{" "}
                  <span className="font-bold text-[#08090a]">Buy Now</span>.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#ff93f1]">
                  What&apos;s next
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-base leading-7 text-white/75">
                  {nextMeasurementSteps.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-[#ff93f1]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="affina-challenge-02">
          <div className="flex flex-col gap-4">
            <span className={styles.sectionPill}>
              Challenge 02
            </span>
            <h2 className={styles.sectionTitle}>
              Evolving the Design System for Healthcare
            </h2>
          </div>

          <div className="flex flex-col gap-16 sm:gap-[66px]">
            {healthcareRows.map((row) => (
              <AffinaHealthcareRow row={row} key={row.number} />
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="affina-brand">
          <div className="flex flex-col gap-6 sm:gap-7">
            <span className={styles.sectionPill}>
              Challenge 03
            </span>
            <h2 className={styles.sectionTitle}>
              Rebuilding the Brand Foundation
            </h2>
            <p className={styles.accentLabel}>
              Turning customer insight into a brand system
            </p>
            <p className={cn("max-w-[720px]", styles.leadText)}>
              Affina&apos;s customer data showed a strong female audience,
              especially among younger health customers and young parents. The
              brand needed to feel more relevant to women without losing its
              youthful, energetic character.
            </p>
          </div>

          <div className="border-y border-black/10 py-8">
            <p className={styles.accentLabel}>
              Founder direction -&gt; Solution
            </p>
            <p className={cn("mt-5", styles.bodyText)}>
              The founder wanted the brand to feel more relevant to women
              without losing its youthful, energetic character. I translated
              that direction into a visual foundation that could scale across
              product and communication.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <ComparisonRow
              title="Logo usage"
              before={
                <Image
                  src="/assets/affina/brand-logo-before.png"
                  alt="Affina old logo mark"
                  width={194}
                  height={190}
                  className="size-[150px] rounded-[36px] object-cover sm:size-[190px]"
                />
              }
              after={
                <div className="flex size-[170px] items-center justify-center rounded-[42px] border border-white bg-gradient-to-b from-white to-[#ececec] p-9 shadow-sm sm:size-[200px]">
                  <Image
                    src="/assets/affina/brand-logomark-after.svg"
                    alt="Affina refined logo mark"
                    width={130}
                    height={130}
                    className="h-full w-full object-contain"
                  />
                </div>
              }
            />

            <ComparisonRow
              title="Wordmark usage"
              before={
                <Image
                  src="/assets/affina/brand-wordmark-before.svg"
                  alt="Affina old wordmark"
                  width={300}
                  height={60}
                  className="w-[220px] object-contain sm:w-[300px]"
                />
              }
              after={
                <Image
                  src="/assets/affina/brand-wordmark-after.svg"
                  alt="Affina refined wordmark"
                  width={300}
                  height={60}
                  className="w-[220px] object-contain sm:w-[300px]"
                />
              }
            />

            <ComparisonRow
              title="Brand / Graphic Typography"
              before={
                <div className="max-w-[320px] text-left text-[#7f7f7f]">
                  <p className="text-4xl font-semibold">Montserrat</p>
                  <p className="mt-4 text-2xl leading-snug">
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm
                  </p>
                  <p className="mt-2 text-2xl leading-snug">0 1 2 3 4 5 6 7 8 9</p>
                </div>
              }
              after={
                <div className="max-w-[360px] text-left text-[#7f7f7f]">
                  <p className="text-4xl font-semibold">Familjen Grotesk</p>
                  <p className="mt-4 text-2xl leading-snug">
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm
                  </p>
                  <p className="mt-2 text-2xl leading-snug">0 1 2 3 4 5 6 7 8 9</p>
                </div>
              }
            />

            <ComparisonRow
              title="Product / UI Typography"
              before={
                <div className="max-w-[320px] text-left text-[#7f7f7f]">
                  <p className="text-4xl font-semibold">Montserrat</p>
                  <p className="mt-4 text-2xl leading-snug">
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm
                  </p>
                  <p className="mt-2 text-2xl leading-snug">0 1 2 3 4 5 6 7 8 9</p>
                </div>
              }
              after={
                <div className="max-w-[360px] text-left text-[#7f7f7f]">
                  <p className="text-4xl font-semibold">Be Vietnam Pro</p>
                  <p className="mt-4 text-2xl leading-snug">
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm
                  </p>
                  <p className="mt-2 text-2xl leading-snug">0 1 2 3 4 5 6 7 8 9</p>
                </div>
              }
            />

            <ComparisonRow
              title="Color system"
              before={
                <Image
                  src="/assets/affina/color-before.png"
                  alt="Affina old color system"
                  width={389}
                  height={374}
                  className="max-h-[300px] w-full max-w-[320px] object-contain"
                />
              }
              after={
                <Image
                  src="/assets/affina/color-after.png"
                  alt="Affina refined color system"
                  width={379}
                  height={364}
                  className="max-h-[300px] w-full max-w-[320px] object-contain"
                />
              }
            />
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="affina-next">
          <div className="flex flex-col gap-5">
            <span className={styles.sectionPill}>
              Next projects
            </span>
            <h2 className={styles.sectionTitle}>
              Keep exploring the work
            </h2>
          </div>

          {nextProjects[0] && (
            <NextProjectCard project={nextProjects[0]} featured />
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {nextProjects.slice(1).map((project) => (
              <NextProjectCard project={project} key={project.href || project.title} />
            ))}
          </div>
        </section>
      </section>

      <section
        id="affina-contact"
        className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36"
      >
        <div className="relative mx-auto max-w-[560px]">
          <span className={cn("inline-flex", styles.sectionPill)}>
            Contact
          </span>
          <h2 className="mt-5 font-[var(--font-affina-heading)] text-4xl font-bold leading-[1.18] tracking-normal">
            Get in Touch
          </h2>
          <p className={cn("mt-5", styles.leadText)}>
            Excited to collaborate! Email me at{" "}
            <a className="text-[#3b82f6]" href="mailto:phuongthuy101222@gmail.com">
              phuongthuy101222@gmail.com
            </a>{" "}
            or DM me on{" "}
            <a className="text-[#3b82f6]" href={DATA.contact.social.LinkedIn.url}>
              Linkedin
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
