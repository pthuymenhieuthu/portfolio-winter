"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { CaseStudySectionNavigation } from "@/components/case-study-section-navigation";
import { CaseStudyScrollHighlight } from "@/components/case-study-scroll-highlight";
import { CaseStudyStatementReveal } from "@/components/case-study-statement-reveal";
import { CaseStudyRevealSection } from "@/components/case-study-scroll-reveal";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { HeroBlobMotion } from "@/components/hero-blob-motion";

const PROJECT_HERO_DELAY = 0.36;

const theme = {
  page: "#f7f7f8",
  accent: "#16a34a",
  accent2: "#34d399",
  dark: "#071b14",
  hero:
    "radial-gradient(circle at 18% 18%, #34d399 0%, transparent 28%), radial-gradient(circle at 82% 24%, #22c55e 0%, transparent 30%), linear-gradient(135deg, #071b14 0%, #0f7a4a 50%, #34d399 100%)",
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

const sections = [
  { id: "trueprofit-work", label: "Overview" },
  { id: "trueprofit-task-01", label: "Landing page" },
  { id: "trueprofit-task-02", label: "Onboarding" },
  { id: "trueprofit-outcome", label: "Outcome" },
  { id: "trueprofit-next", label: "Next projects" },
  { id: "trueprofit-contact", label: "Get in touch" },
];

const assets = {
  hero: "/trueprofit-mobile-poster.jpg",
  keywords: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758739200/truepro-01_hcnk3e.png",
  feeling: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758739200/truepro-02_xul57w.png",
  landingOutcome: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758739200/truepro-03_a32knn.png",
  landingResult: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758979026/truepro-02-ux_yjgd3g.png",
  onboardingProblem: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730723/01_xdfyoa.png",
  empathyMap: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758732412/04_sypjpi.png",
  journeyMap: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730723/03_diajt3.png",
  brandAlignment: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730723/05_wo4zax.png",
  handoff: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758733263/Screenshot_212_bpptse.png",
  onboardingOutcome: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730725/Frame_560_t1ebbr.png",
};

const assetDimensions: Record<string, [number, number]> = {
  [assets.hero]: [400, 225],
  [assets.keywords]: [1441, 784],
  [assets.feeling]: [1441, 784],
  [assets.landingOutcome]: [1441, 784],
  [assets.landingResult]: [1441, 784],
  [assets.onboardingProblem]: [1441, 784],
  [assets.empathyMap]: [1441, 784],
  [assets.journeyMap]: [1441, 784],
  [assets.brandAlignment]: [1441, 784],
  [assets.handoff]: [1571, 750],
  [assets.onboardingOutcome]: [2881, 5513],
};

const focusAreas = [
  {
    label: "Task 01",
    title: "Landing Page Support",
    body:
      "Supporting the landing page design for trueprofit.io by drafting layout ideas and illustrations aligned with the brand system.",
  },
  {
    label: "Task 02",
    title: "Onboarding Illustrations",
    body:
      "Redesigning onboarding illustrations to increase engagement and reduce skip rates.",
  },
];

const landingSteps = [
  "Received the in-progress design file and content from the design team, then identified keywords for reference illustration and feeling.",
  "Designed illustrations that matched the page structure and emphasized key product highlights.",
  "Drafted the Partners page layout and produced illustration concepts to support its storytelling.",
  "Iterated with feedback from the design lead and marketing team until final approval.",
];

const onboardingSteps = [
  "Brief & Goal Setting: Clarified KPIs to reduce skips and increase survey completion.",
  "User Journey Mapping: Used an Empathy Map (Sees / Thinks / Feels / Does) to define what users experience before, during, and after onboarding.",
  "Brand Alignment: Pulled assets from the design system and landing page to keep visual consistency across touchpoints.",
  "Sketch → References → Final: Sketched rough flows, refined with references, then applied the style guide to finalize.",
  "Feedback Loop: Shared drafts with the leader and developers, then iterated quickly on sketches.",
  "Handoff: Exported assets in Figma with context notes for developers.",
];

const nextProjects = ["Language Learning Apps", "Zoan AI", "Affina"]
  .map((name) =>
    (DATA.projects as readonly CaseProject[]).find((project) =>
      project.title.toLowerCase().includes(name.toLowerCase())
    )
  )
  .filter((project): project is CaseProject => Boolean(project));

function CaseImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [width, height] = assetDimensions[src] ?? [1440, 810];

  return (
    <div className="overflow-hidden rounded-xl border border-[#cfd0d4] shadow-sm">
      <ImageZoom>
        <ResponsiveMotionImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          mobilePosterSrc={src === assets.hero ? "/trueprofit-mobile-poster.jpg" : undefined}
          unoptimized
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 90vw, 934px"
        />
      </ImageZoom>
    </div>
  );
}

function TrueProfitStickyIndicator() {
  return (
    <CaseStudySectionNavigation
      heroId="trueprofit-overview"
      sections={sections}
    />
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
        "group block overflow-hidden rounded-3xl border border-black/10 bg-white/65 transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.15fr_0.85fr] md:items-stretch"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#e5f7ed]",
          featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"
        )}
      >
        {(project.video || project.image) && (
          <ResponsiveMotionImage
            src={project.video || project.image || ""}
            alt={project.title}
            width={1200}
            height={675}
            mobilePosterSrc={project.image || undefined}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            unoptimized
            sizes={featured ? "(max-width: 768px) 90vw, 560px" : "(max-width: 768px) 90vw, 440px"}
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-8 p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
            {featured ? "Next project" : project.dates}
          </p>
          <h3
            className={cn(
              "mt-3 font-[var(--font-heading)] font-normal leading-[1.2] tracking-normal",
              featured ? "text-3xl" : "text-2xl"
            )}
          >
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[#737373]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span className="rounded-full bg-[#eeeff1] px-3 py-1.5 text-xs text-[#08090a]" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function TrueProfitCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f7f8] font-sans text-[#08090a]">
      <TrueProfitStickyIndicator />

      <section
        id="trueprofit-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[#071b14] px-6 text-center text-white sm:min-h-[800px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,#0f8f5b_0%,transparent_30%),radial-gradient(circle_at_82%_24%,#2dd4bf_0%,transparent_30%),linear-gradient(135deg,#071b14_0%,#15803d_50%,#34d399_100%)] opacity-50" />
        <HeroBlobMotion className="pointer-events-none absolute left-[calc(50%-30px)] top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none" position="top">
          <Image src="/assets/trueprofit/trueprofit-hero-blob-top.svg" alt="" width={1440} height={422} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <HeroBlobMotion className="pointer-events-none absolute bottom-[-120px] left-1/2 -z-10 w-[max(1320px,110vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-150px]" position="bottom">
          <Image src="/assets/trueprofit/trueprofit-hero-blob-bottom.svg" alt="" width={1440} height={526} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            E-commerce Finance · Jan 2025
          </p>
          <HeroTitleReveal
            className="mt-7 max-w-[860px] font-[var(--font-heading)] text-[clamp(36px,9.8vw,64px)] font-medium leading-[1.05] tracking-normal [text-shadow:2px_2px_1px_rgba(0,0,0,0.1)]"
            delay={PROJECT_HERO_DELAY}
            text="TrueProfit"
          />
          <BlurFade delay={1.12}>
            <p className="mx-auto mt-7 max-w-[570px] text-base leading-[1.55] text-white sm:text-lg">
              Landing Page & Onboarding
              <br className="sm:hidden" /> Illustrations
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 py-24 sm:gap-40 sm:px-8 lg:py-36">
        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="trueprofit-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1 text-sm text-white">
              Overview
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[30px] font-normal leading-[1.2] tracking-normal sm:text-[40px]">
              Landing page support and onboarding illustrations
            </h2>
            <p className="text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              During my internship, I worked on two design tasks closely tied to
              <CaseStudyScrollHighlight> user experience and brand consistency</CaseStudyScrollHighlight>.
              Both tasks shared the same need for clarity across product and
              communication.
            </p>
          </div>

          <CaseStudyStatementReveal text="Translate abstract product goals into clear visual storytelling while staying aligned with the existing design system and marketing direction." />

          <CaseImage src={assets.hero} alt="TrueProfit landing page preview" />

        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1 text-sm text-white">
              Project scope
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Two design tasks
            </h2>
          </div>

          <div className="grid overflow-hidden rounded-xl border border-[#e4e4e7] bg-white px-6 lg:grid-cols-2 lg:gap-x-[51px]">
            {focusAreas.map((item, index) => (
              <article
                className="relative flex min-w-0 flex-col gap-5 border-b border-[#e4e4e7] py-6 last:border-b-0 lg:border-b-0"
                key={item.label}
              >
                <div className="flex w-full items-center gap-4">
                  <p className="whitespace-nowrap rounded-full bg-[#e8edf4] px-5 py-3 text-base font-bold leading-none text-[#18181b]">
                    {item.label}
                  </p>
                  {index < focusAreas.length - 1 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 shrink-0 rotate-90 text-[#a1a1aa] lg:rotate-0"
                      strokeWidth={2.5}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-[var(--font-heading)] text-xl font-normal leading-normal tracking-normal text-[#18181b]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-[1.5] text-[#71717a]">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="trueprofit-task-01">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1 text-sm text-white">
              Task 01
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Landing Page Support
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <article className="border-t border-[#071b14]/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">Problem</p>
              <p className="mt-4 text-base leading-[1.6] text-[#08090a] sm:text-[17px]">
                The TrueProfit marketing website required additional visuals to
                better showcase product value across its main pages. The design
                system and content were already prepared, but the project needed
                illustration and layout support to complete the visual design.
              </p>
            </article>
            <article className="rounded-xl bg-[#071b14] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd360]">My contribution</p>
              <p className="mt-4 text-base leading-[1.6] text-white/85 sm:text-[17px]">
                From November until the website launch in January, I created
                illustrations for the Home and Features pages, drafted layout and
                illustration concepts for the Partners page, and ensured every
                illustration followed the established brand system and in-app
                onboarding style.
              </p>
            </article>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.keywords} alt="TrueProfit illustration keyword references" />
            <CaseImage src={assets.feeling} alt="TrueProfit visual feeling references" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {landingSteps.map((item, index) => (
              <article className="border-t border-[#071b14]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#08090a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.landingOutcome} alt="TrueProfit landing illustration outcome" />
            <CaseImage src={assets.landingResult} alt="TrueProfit landing page result" />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="trueprofit-task-02">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1 text-sm text-white">
              Task 02
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Onboarding Illustrations
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              The existing onboarding flow felt disconnected from the branding
              on trueprofit.io. A high skip rate and low survey completion gave
              the internal team less insight, while the illustrations focused too
              much on UI decoration instead of guiding the UX journey.
            </p>
          </div>

          <CaseImage
            src={assets.onboardingProblem}
            alt="TrueProfit onboarding problem"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {onboardingSteps.map((item, index) => (
              <article className="border-t border-[#071b14]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#08090a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.empathyMap} alt="TrueProfit empathy map" />
            <CaseImage src={assets.journeyMap} alt="TrueProfit onboarding journey map" />
            <CaseImage src={assets.brandAlignment} alt="TrueProfit brand alignment" />
            <CaseImage src={assets.handoff} alt="TrueProfit developer handoff" />
          </div>

          <CaseImage
            src={assets.onboardingOutcome}
            alt="TrueProfit onboarding illustration outcome"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="trueprofit-outcome">
          <div className="rounded-xl bg-[#071b14] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd360]">
              Outcome
            </p>
            <h2 className="mt-5 font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Final outcomes
            </h2>
            <p className="mt-6 text-base leading-[1.6] text-white/85 sm:text-[17px]">
              Delivered final illustrations for the Home and Features pages,
              produced layout and visual drafts for the Partners page, and
              contributed to a cohesive website experience for the January
              launch. The onboarding illustrations fit the brand identity, guided
              users through the flow instead of distracting them, and supported
              the goals of increasing survey completions and reducing skips.
            </p>
            <p className="mt-4 text-base leading-[1.6] text-white/70 sm:text-[17px]">
              Nov 2024 – Jan 2025: marketing landing page. Jan – Feb 2025:
              in-app onboarding illustrations.
            </p>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="trueprofit-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1 text-sm text-white">
              Next projects
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Keep exploring the work
            </h2>
          </div>

          {nextProjects[0] && <NextProjectCard project={nextProjects[0]} featured />}

          <div className="grid gap-6 md:grid-cols-2">
            {nextProjects.slice(1).map((project) => (
              <NextProjectCard project={project} key={project.href || project.title} />
            ))}
          </div>
        </CaseStudyRevealSection>
      </section>

      <section id="trueprofit-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#071b14] px-3 py-1 text-sm text-white">
            Contact
          </span>
          <h2 className="mt-5 font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
            Get in Touch
          </h2>
          <p className="mt-5 text-base leading-[1.6] text-[#737373] sm:text-[17px]">
            Excited to collaborate! Email me at{" "}
            <a className="text-[#08090a] underline underline-offset-4" href="mailto:phuongthuy101222@gmail.com">
              phuongthuy101222@gmail.com
            </a>{" "}
            or DM me on{" "}
            <a className="text-[#08090a] underline underline-offset-4" href={DATA.contact.social.LinkedIn.url} rel="noopener noreferrer" target="_blank">
              Linkedin
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
