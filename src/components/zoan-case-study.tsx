"use client";

import Image from "next/image";
import Link from "next/link";
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
  ink: "#08090a",
  muted: "#737373",
  accent: "#15CABE",
  accent2: "#B0F1ED",
  dark: "#07111f",
};

const sections = [
  { id: "zoan-work", label: "Overview" },
  { id: "zoan-foundations", label: "System foundations" },
  { id: "zoan-platform", label: "Cross-platform application" },
  { id: "zoan-motion", label: "Motion & micro-interactions" },
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
  timelineMotion: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764161748/Timeline_5-macd_dosrrf.gif",
  appMotion: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764161236/app_vvjcwd.gif",
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

const responsibilities = [
  "UI audit and redesign",
  "Design system foundations & component library",
  "Web & mobile experience alignment",
];

const componentSystem = [
  "Controls, forms, and overlays",
  "Cards, lists, and tables",
  "Navigation patterns",
  "Clear state variations",
];

const platformSteps = [
  "Dashboard and workflow management",
  "Asset and content organization",
  "Review and iteration screens",
  "Chat-based creation",
  "Interactive previews",
  "Quick content iteration",
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
  preserveAnimation = false,
}: {
  src: string;
  alt: string;
  className?: string;
  preserveAnimation?: boolean;
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
          preserveAnimation={preserveAnimation}
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
        "group block overflow-hidden rounded-3xl border border-black/10 bg-white/65 transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.15fr_0.85fr] md:items-stretch"
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

export function ZoanCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f7f8] font-sans text-[#08090a]">
      <ZoanStickyIndicator />

      <section
        id="zoan-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[#f7f7f8] px-6 text-center text-[#07111f] sm:min-h-[800px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,#ffffff_0%,transparent_30%),radial-gradient(circle_at_84%_18%,#15CABE_0%,transparent_32%),linear-gradient(135deg,#ffffff_0%,#B0F1ED_58%,#15CABE_100%)] opacity-50" />
        <HeroBlobMotion className="pointer-events-none absolute left-[calc(50%-30px)] top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none" position="top">
          <Image src="/assets/zoan/zoan-hero-blob-top.svg" alt="" width={1440} height={422} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <HeroBlobMotion className="pointer-events-none absolute bottom-[-120px] left-1/2 -z-10 w-[max(1320px,110vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-150px]" position="bottom">
          <Image src="/assets/zoan/zoan-hero-blob-bottom.svg" alt="" width={1440} height={526} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center">
          <p className="rounded-full border border-[#07111f]/10 bg-white/45 px-4 py-1.5 text-sm font-medium text-[#07111f] backdrop-blur">
            AI Product · May 2025
          </p>
          <HeroTitleReveal
            className="mt-7 max-w-[860px] font-[var(--font-heading)] text-[clamp(36px,9.8vw,64px)] font-medium leading-[1.05] tracking-normal"
            delay={PROJECT_HERO_DELAY}
            text="Zoan AI"
          />
          <BlurFade delay={1.12}>
            <p className="mx-auto mt-7 max-w-[570px] text-base leading-[1.55] text-[#07111f] sm:text-lg">
              AI Workflow Management
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 py-24 sm:gap-40 sm:px-8 lg:py-36">
        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Overview
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[30px] font-normal leading-[1.2] tracking-normal sm:text-[40px]">
              Will AI replace UI/UX Designers?
            </h2>
            <p className="text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Before joining Zoan AI, I used to ask myself that question. But
              leading this project, from system rebuilding and UI redesign to
              shaping cross-platform experiences, made me realize something
              else.
            </p>
          </div>

          <CaseStudyStatementReveal text="I wasn’t being replaced by AI. I was designing the interface for an AI platform." />

        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Overview
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              AI-generated interactive content across desktop and mobile
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

          <div className="grid gap-6 sm:grid-cols-3">
            {responsibilities.map((item) => (
              <article className="border-t border-[#07111f]/10 pt-5" key={item}>
                <p className="text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-foundations">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Phase 1 · Visual Challenges
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Rebuilding the system from the ground up
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              As an early-stage product, the interface lacked structure and brand
              consistency. This became the starting point for rebuilding the
              system from the ground up.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#737373]">Phase 2 · System Foundations</p>
            <h3 className="font-[var(--font-heading)] text-2xl font-normal leading-[1.2] tracking-normal">
              Resetting the visual language
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <CaseImage src={zoanAssets.color} alt="Zoan color foundation" />
            <CaseImage src={zoanAssets.typography} alt="Zoan typography foundation" />
            <CaseImage src={zoanAssets.tokens} alt="Zoan variable token system" />
          </div>

          <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
            A scalable token structure ensured consistency across both desktop
            and mobile platforms.
          </p>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#737373]">Phase 3 · Component System</p>
            <h3 className="font-[var(--font-heading)] text-2xl font-normal leading-[1.2] tracking-normal">
              Building out the component library
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {componentSystem.map((item, index) => (
              <article className="border-t border-[#07111f]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#08090a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>

          <CaseImage src={zoanAssets.components} alt="Zoan component system" />
          <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
            Each component included guidelines for behavior and implementation.
          </p>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-platform">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Phase 4 · Cross-Platform Application
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Desktop and mobile experiences
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              The same system was adapted for smaller screens while supporting
              dashboard and workflow management on desktop.
            </p>
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
              Phase 5 · Motion &amp; Micro-Interaction Design
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Motion that guides attention and transitions
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Motion was introduced to guide attention and transitions, reinforce
              hierarchy and interaction states, and elevate the experience beyond
              static UI. These animations were designed modularly to scale with
              future features.
            </p>
          </div>

          <div className="grid gap-6">
            <CaseImage
              src={zoanAssets.timelineMotion}
              alt="Zoan timeline motion"
              preserveAnimation
            />
            <CaseImage
              src={zoanAssets.appMotion}
              alt="Zoan app transition motion"
              preserveAnimation
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-outcome">
          <div className="rounded-xl bg-[#07111f] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd360]">
              Outcome
            </p>
            <h2 className="mt-5 font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Designers shape how humans interact with AI
            </h2>
            <p className="mt-6 text-base leading-[1.6] text-white/85 sm:text-[17px]">
              The renewed system provided a scalable foundation for future
              development, reduced design-engineering friction, and established
              a strong visual identity for fundraising and go-to-market. Working
              on Zoan AI didn&apos;t show me that AI replaces designers. It showed me
              that designers shape how humans interact with AI.
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
            <a className="text-[#08090a] underline underline-offset-4" href={DATA.contact.social.LinkedIn.url} rel="noopener noreferrer" target="_blank">
              Linkedin
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
