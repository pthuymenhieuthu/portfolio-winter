"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { CaseStudySectionNavigation } from "@/components/case-study-section-navigation";
import { CaseStudyScrollHighlight } from "@/components/case-study-scroll-highlight";
import { CaseStudyRevealSection } from "@/components/case-study-scroll-reveal";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { HeroBlobMotion } from "@/components/hero-blob-motion";

const PROJECT_HERO_DELAY = 0.36;

const theme = {
  page: "#f7f7f8",
  ink: "#08090a",
  muted: "#737373",
  accent: "#15CABE",
  accent2: "#B0F1ED",
  dark: "#07111f",
};

const sections = [
  { id: "zoan-work", label: "Overview" },
  { id: "zoan-challenge-01", label: "Product foundations" },
  { id: "zoan-challenge-02", label: "Cross-platform workflow" },
  { id: "zoan-motion", label: "Motion" },
  { id: "zoan-outcome", label: "Outcome" },
  { id: "zoan-next", label: "Next projects" },
  { id: "zoan-contact", label: "Get in touch" },
];

const zoanAssets = {
  hero: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787904374/Frame_2147225273_isnnjf.png",
  overview: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1766037533/01_sj2voy.png",
  workMockup1: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787904374/Frame_2147225272_dz9vld.png",
  workMockup2: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787904374/Frame_2147225273_isnnjf.png",
  color: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787989302/Showcase_hehe-05_ny1lld.png",
  typography: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787989302/Showcase_hehe-04_yapp30.png",
  tokens: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1763893945/Screenshot_252_ngb7lj.png",
  components: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1763909689/Screenshot_253_kqzyld.png",
  platformShowcase1: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787989538/Showcase_hehe-03_rvw75h.png",
  platformShowcase2: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787989540/Showcase_hehe-01_zbeuze.png",
  timelineMotion: "https://res.cloudinary.com/dqtfjvkok/image/upload/f_webp,q_auto,w_900,pg_1/v1764161748/Timeline_5-macd_dosrrf.webp",
  appMotion: "https://res.cloudinary.com/dqtfjvkok/image/upload/f_webp,q_auto,w_900,pg_1/v1764161236/app_vvjcwd.webp",
};

const zoanAssetDimensions: Record<string, [number, number]> = {
  [zoanAssets.hero]: [1152, 648],
  [zoanAssets.overview]: [5469, 3264],
  [zoanAssets.workMockup1]: [3693, 2760],
  [zoanAssets.workMockup2]: [3604, 2760],
  [zoanAssets.color]: [1400, 612],
  [zoanAssets.typography]: [1400, 683],
  [zoanAssets.tokens]: [703, 686],
  [zoanAssets.components]: [692, 678],
  [zoanAssets.platformShowcase1]: [3646, 1876],
  [zoanAssets.platformShowcase2]: [3646, 2176],
  [zoanAssets.timelineMotion]: [702, 480],
  [zoanAssets.appMotion]: [702, 480],
};

const challenges = [
  {
    label: "Challenge 01",
    title: "Rebuilding product foundations for an early-stage AI platform",
    question:
      "How could the product feel more structured and trustworthy without slowing down launch momentum?",
  },
  {
    label: "Challenge 02",
    title: "Designing one workflow across desktop and mobile",
    question:
      "How could teams manage AI-generated content on desktop while keeping creation fast and conversational on mobile?",
  },
  {
    label: "Challenge 03",
    title: "Making AI interactions feel guided, not static",
    question:
      "How could motion help users understand transitions, hierarchy, and system feedback?",
  },
];

const foundationSteps = [
  "Audited the interface to identify weak hierarchy, inconsistent spacing, and disconnected component usage.",
  "Reset the visual language through color, typography, variables, and reusable product primitives.",
  "Built out component patterns for controls, forms, overlays, cards, lists, tables, and navigation.",
  "Documented behavior and state variations so design and engineering could move with less friction.",
];

const platformSteps = [
  "Desktop: dashboard and workflow management for organizing assets, content, reviews, and iterations.",
  "Mobile: chat-based creation, interactive previews, and faster content iteration on smaller screens.",
  "Cross-platform: shared design language so users could move between surfaces without relearning the product.",
];

const nextProjects = ["TrueProfit", "Language Learning Apps", "Affina"]
  .map((name) =>
    (DATA.projects as readonly CaseProject[]).find((project) =>
      project.title.toLowerCase().includes(name.toLowerCase())
    )
  )
  .filter((project): project is CaseProject => Boolean(project));

type CaseProject = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
};

function CaseImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [width, height] = zoanAssetDimensions[src] ?? [1440, 810];

  return (
    <div className={cn("overflow-hidden rounded-xl border border-[#cfd0d4] shadow-sm", className)}>
      <ImageZoom>
        <ResponsiveMotionImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          mobilePosterSrc={src === zoanAssets.hero ? zoanAssets.workMockup2 : undefined}
          unoptimized
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 90vw, 934px"
        />
      </ImageZoom>
    </div>
  );
}

function ZoanStickyIndicator() {
  return (
    <CaseStudySectionNavigation heroId="zoan-overview" sections={sections} />
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
          "relative overflow-hidden bg-[#e6edff]",
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
      <div className="flex flex-col justify-between gap-10 p-7 sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#737373]">
            {featured ? "Next project" : project.dates}
          </p>
          <h3
            className={cn(
              "mt-3 font-[var(--font-heading)] font-normal leading-[1.2] tracking-normal",
              featured ? "text-[26px] sm:text-[30px]" : "text-xl sm:text-[22px]"
            )}
          >
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-[1.6] text-[#737373]">
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

export function ZoanCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f7f8] font-sans text-[#08090a]">
      <ZoanStickyIndicator />

      <section
        id="zoan-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_18%,#ffffff_0%,transparent_30%),radial-gradient(circle_at_84%_18%,#15CABE_0%,transparent_32%),linear-gradient(135deg,#ffffff_0%,#B0F1ED_58%,#15CABE_100%)] px-6 text-center text-[#07111f] sm:min-h-[800px]"
      >
        <HeroBlobMotion className="pointer-events-none absolute left-[calc(50%-30px)] top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none" position="top">
          <Image src="/assets/zoan/zoan-hero-blob-top.svg" alt="" width={1440} height={422} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <HeroBlobMotion className="pointer-events-none absolute bottom-[-120px] left-1/2 -z-10 w-[max(1320px,110vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-150px]" position="bottom">
          <Image src="/assets/zoan/zoan-hero-blob-bottom.svg" alt="" width={1440} height={526} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-col items-center gap-5">
          <p className="rounded-full border border-[#07111f]/10 bg-white/45 px-4 py-1.5 text-sm text-[#07111f] backdrop-blur">
            AI Product · May 2025
          </p>
          <HeroTitleReveal
            className="max-w-[340px] font-[var(--font-heading)] text-[clamp(36px,9.8vw,64px)] font-medium leading-[1.05] tracking-normal [text-shadow:2px_2px_1px_rgba(0,0,0,0.1)] sm:max-w-none sm:text-[64px]"
            delay={PROJECT_HERO_DELAY}
            text="Zoan AI"
          />
          <BlurFade delay={1.12}>
            <p className="mx-auto max-w-[340px] text-base leading-[1.35] text-[#07111f]">
              AI Workflow Management
              <br />
              <span className="text-[#07111f]/65">
                · From fearing AI to designing for it
              </span>
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-32 px-5 py-24 sm:gap-40 sm:px-8 lg:py-36">
        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              My Projects
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[30px] font-normal leading-[1.2] tracking-normal sm:text-[40px]">
              Designing the interface an AI engine relies on
            </h2>
            <p className="text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Before joining Zoan AI, I wondered if AI would replace designers.
              This project showed me something else: I was designing the
              {" "}<CaseStudyScrollHighlight>
                interface for an AI platform
              </CaseStudyScrollHighlight>.
            </p>
          </div>

          <CaseImage src={zoanAssets.hero} alt="Zoan AI animated workflow preview" />

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["Role", "UI/UX, product system, Rive motion"],
              ["Scope", "Desktop, mobile, design system, AI workflow"],
              ["Outcome", "A scalable foundation for launch and go-to-market"],
            ].map(([title, body]) => (
              <div className="border-t border-[#07111f]/10 pt-5" key={title}>
                <p className="text-sm uppercase tracking-[0.12em] text-[#737373]">{title}</p>
                <p className="mt-3 text-base leading-[1.6] text-[#08090a]">{body}</p>
              </div>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Design scope
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              From loose interface pieces to a scalable AI product system
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Zoan enables teams and partners to build AI-generated interactive
              content through <CaseStudyScrollHighlight>
                unified desktop workflows and a mobile chat-to-creation experience
              </CaseStudyScrollHighlight>.
            </p>
          </div>

          <div className="grid gap-6">
            <CaseImage
              src={zoanAssets.workMockup1}
              alt="Zoan AI desktop and mobile product mockup"
            />
            <CaseImage
              src={zoanAssets.workMockup2}
              alt="Zoan AI product system mockup"
            />
          </div>

          <div className="grid overflow-hidden rounded-xl border border-[#e4e4e7] bg-white px-6 lg:grid-cols-3 lg:gap-x-[51px]">
            {challenges.map((item, index) => (
              <article
                className="relative flex min-w-0 flex-col gap-5 border-b border-[#e4e4e7] py-6 last:border-b-0 lg:border-b-0"
                key={item.label}
              >
                <div className="flex w-full items-center gap-4">
                  <p className="whitespace-nowrap rounded-full bg-[#e8edf4] px-5 py-3 text-base font-bold leading-none text-[#18181b]">
                    {item.label}
                  </p>
                  {index < challenges.length - 1 && (
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
                    {item.question}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-challenge-01">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Challenge 01
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Rebuilding product foundations for an early-stage AI platform
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <CaseImage src={zoanAssets.color} alt="Zoan color foundation" />
            <CaseImage src={zoanAssets.typography} alt="Zoan typography foundation" />
            <CaseImage src={zoanAssets.tokens} alt="Zoan variable token system" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {foundationSteps.map((item, index) => (
              <article className="border-t border-[#07111f]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#08090a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>

          <CaseImage src={zoanAssets.components} alt="Zoan component system" />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-challenge-02">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Challenge 02
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Designing one workflow across desktop and mobile
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {platformSteps.map((item) => (
              <article className="border-t border-[#07111f]/10 pt-6" key={item}>
                <p className="text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6">
            <CaseImage src={zoanAssets.platformShowcase1} alt="Zoan desktop workflow showcase" />
            <CaseImage src={zoanAssets.platformShowcase2} alt="Zoan mobile workflow showcase" />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-motion">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Challenge 03
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Motion and micro-interactions for guided AI workflows
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Motion was introduced to guide attention, clarify transitions,
              reinforce hierarchy, and make the experience feel more responsive
              than static UI.
            </p>
          </div>

          <div className="grid gap-6">
            <CaseImage src={zoanAssets.timelineMotion} alt="Zoan timeline motion" />
            <CaseImage src={zoanAssets.appMotion} alt="Zoan app transition motion" />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-outcome">
          <div className="rounded-xl bg-[#07111f] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#ffd360]">
              Outcome
            </p>
            <h2 className="mt-5 font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Designers shape how humans interact with AI
            </h2>
            <p className="mt-6 text-base leading-[1.6] text-white/85 sm:text-[17px]">
              The renewed system provided a scalable foundation for future
              development, reduced design-engineering friction, and established
              a stronger visual identity for fundraising and go-to-market.
            </p>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="zoan-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
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

      <section id="zoan-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
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
            <a className="text-[#08090a] underline underline-offset-4" href={DATA.contact.social.LinkedIn.url}>
              Linkedin
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
