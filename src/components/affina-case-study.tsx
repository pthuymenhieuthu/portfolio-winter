"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { getNextProjects } from "@/lib/next-projects";
import { cn } from "@/lib/utils";
import { CaseStudySectionNavigation } from "@/components/case-study-section-navigation";
import {
  CaseStudyRevealSection,
  CaseStudyScrollReveal,
} from "@/components/case-study-scroll-reveal";
import { CaseStudyScrollHighlight } from "@/components/case-study-scroll-highlight";
import { CaseStudyStatementReveal } from "@/components/case-study-statement-reveal";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import { projectMeshPalettes } from "@/components/project-mesh-gradient";
import { caseStudyStyles } from "@/lib/case-study-styles";
import { Icons } from "@/components/icons";
import { AffinaAppDesignSystem, affinaAppGradient } from "@/components/affina-app-system";

const PROJECT_HERO_DELAY = 0.36;

const sections = [
  { id: "affina-work", label: "Overview" },
  { id: "affina-system", label: "Design challenges" },
  {
    id: "affina-challenge-01",
    label: "AI journey",
  },
  {
    id: "affina-challenge-02",
    label: "Healthcare system",
  },
  { id: "affina-brand", label: "Brand foundation" },
  { id: "affina-next", label: "Next projects" },
  { id: "affina-contact", label: "Get in touch" },
];

const challenges = [
  {
    label: "Challenge 01",
    title: "Turning an offline sales journey into an AI-assisted online experience",
    question:
      "How might AI narrow complex choices without removing the human support users trust?",
  },
  {
    label: "Challenge 02",
    title: "Building the design system from foundations up",
    question:
      "How could one shared system make Affina clearer, warmer and easier to scale?",
  },
  {
    label: "Challenge 03",
    title: "Rebuilding the brand foundation",
    question:
      "How could the brand feel more relevant to women while staying youthful and energetic?",
  },
];

const journeySteps = [
  {
    number: "1",
    title: "Survey",
    eyebrow: "Start with less friction",
    body: (
      <>
        Start with{" "}
        <CaseStudyScrollHighlight>
          four focused questions
        </CaseStudyScrollHighlight>{" "}
        about the coverage the customer needs.
      </>
    ),
    detailLabel: (
      <>
        Ask{" "}
        <CaseStudyScrollHighlight>
          only what shapes the match
        </CaseStudyScrollHighlight>
        :
      </>
    ),
    detail: "Insurance type → Insured person → Monthly budget → Preferred insurers",
    media: [
      {
        src: "/assets/affina/ai-journey/00-intro.webp?v=en-final",
        label: "Start · Design your protection",
        detail: "Introduce the journey before asking for personal preferences.",
      },
      {
        src: "/assets/affina/ai-journey/01-insurance-type.webp?v=en-final",
        label: "01 / 04 · Insurance type",
        detail: "Choose the insurance product to explore.",
      },
      {
        src: "/assets/affina/ai-journey/02-insured-person.webp?v=en-final",
        label: "02 / 04 · Insured person",
        detail: "Provide the protected person's gender and birth year.",
      },
      {
        src: "/assets/affina/ai-journey/03-monthly-budget.webp?v=en-final",
        label: "03 / 04 · Monthly budget",
        detail: "Choose an expected monthly budget from four clear ranges.",
      },
      {
        src: "/assets/affina/ai-journey/04-preferred-insurer.webp?v=en-final",
        label: "04 / 04 · Preferred insurers",
        detail: "Select preferred providers using familiar insurer logos.",
      },
      {
        src: "/assets/affina/ai-journey/05-matching.webp?v=en-final",
        label: "Matching · Finding suitable plans",
        detail: "Use the Affina mascot to explain the wait before recommendations appear.",
      },
    ],
  },
  {
    number: "2",
    title: "Recommend",
    eyebrow: "Make the best options easy to scan",
    body: (
      <>
        Surface{" "}
        <CaseStudyScrollHighlight>
          three best-fit plans
        </CaseStudyScrollHighlight>{" "}
        with essential details upfront.
      </>
    ),
    bullets: [
      "Put the best match first",
      "Show price and core benefits",
      "Reveal why it fits on demand",
    ],
    media: [
      {
        src: "/assets/affina/ai-journey/06-recommendations.webp?v=en-final",
        label: "06 · Recommendations",
        detail: "Surface three suitable plans with clear price and benefit cues.",
      },
    ],
  },
  {
    number: "3",
    title: "Compare",
    eyebrow: "Keep benefits readable within a narrow mobile viewport",
    bullets: [
      "Keep the three recommended plans together",
      "Group benefits into clear rows",
      "Keep benefit labels beside the plan columns",
      "Distinguish included, selected and optional benefits",
    ],
    media: [
      {
        src: "/assets/affina/ai-journey/07-comparison.webp?v=en-final",
        label: "07 · Compare plans",
        height: 4164,
        detail: "Swipe across three plans to compare annual fees, benefit status and purchase actions.",
      },
    ],
  },
];

const healthcareRows = [
  {
    number: "1",
    title: "Foundation first",
    bold: "primitive palettes, typography, spacing, radius and effects",
    before: "I defined",
    after: "before composing product screens.",
    image: "/assets/affina/product-screen-1.png",
    ratio: "aspect-[1213/894]",
  },
  {
    number: "2",
    title: "Add meaning with semantic tokens",
    bold: "mapped primitives to product roles",
    before: "I",
    after: "such as primary, secondary, positive, warning and disabled.",
    image: "/assets/affina/product-screen-2.png",
    ratio: "aspect-[1909/973]",
  },
  {
    number: "3",
    title: "Bridge design and code",
    bold: "Exported shared values as CSS custom properties",
    after: "so design decisions could move into implementation without translation gaps.",
    image: "/assets/affina/product-screen-3.png",
    ratio: "aspect-[1727/924]",
  },
  {
    number: "4",
    title: "Prove it in product",
    bold: "Applied the same tokens and reusable components",
    after: "across the insurance survey, matching, recommendations and comparison, so the same visual language supports every decision.",
    flow: true,
  },
];

const insuranceProductFlow = [
  { number: "01", title: "Choose protection", detail: "Use clear option cards and pink selection cues to capture insurance needs.", src: "/assets/affina/ai-journey/01-insurance-type.webp?v=en-final" },
  { number: "02", title: "Find a match", detail: "Carry the blue background and Affina mascot into the waiting state.", src: "/assets/affina/ai-journey/05-matching.webp?v=en-final" },
  { number: "03", title: "Review recommendations", detail: "Bring provider, price and purchase action together in a white plan card.", src: "/assets/affina/ai-journey/06-recommendations.webp?v=en-final" },
  { number: "04", title: "Compare plans", detail: "Reuse the same colors and controls to distinguish coverage and compare fees.", src: "/assets/affina/ai-journey/07-comparison.webp?v=en-final" },
] as const;

const designSystemLayers = [
  {
    kind: "principles",
    label: "Principles",
    detail: "Clear decisions · Human care · Scalable delivery",
  },
  {
    kind: "rules",
    label: "Rules",
    detail: "Tokens · Grid · Accessibility · Responsive behavior",
  },
  {
    kind: "elements",
    label: "Elements",
    detail: "Foundations · Components · Patterns · Templates",
  },
] as const;

function DesignSystemLayerVisual({
  kind,
}: {
  kind: (typeof designSystemLayers)[number]["kind"];
}) {
  if (kind === "principles") {
    return (
      <div
        aria-hidden="true"
        className="relative flex h-[132px] items-end overflow-hidden rounded-2xl p-4"
        style={{ background: affinaAppGradient }}
      >
        <div className="relative grid w-full grid-cols-3 gap-2">
          {["Clear", "Human", "Scalable"].map((item) => (
            <div
              className="rounded-xl border border-white/70 bg-white/65 px-2 py-3 text-center shadow-[0_8px_22px_rgba(80,93,130,0.08)] backdrop-blur-sm"
              key={item}
            >
              <span className="text-[10px] font-semibold text-[#35343b] sm:text-xs">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "rules") {
    return (
      <div
        aria-hidden="true"
        className="grid h-[132px] grid-cols-[1.05fr_0.95fr] gap-3 overflow-hidden rounded-2xl border border-black/[0.06] p-4"
        style={{ background: affinaAppGradient }}
      >
        <div className="flex min-w-0 flex-col justify-between">
          <div className="grid grid-cols-5 gap-1.5">
            {["#08090a", "#0096f7", "#8b6de9", "#ec62d7", "#f3c862"].map(
              (color) => (
                <span
                  className="aspect-square rounded-md"
                  key={color}
                  style={{ backgroundColor: color }}
                />
              ),
            )}
          </div>
          <div>
            <p className="font-[var(--font-affina-heading)] text-3xl leading-none text-[#18181b]">
              Aa
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-[#dfe3e8]" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-[#dfe3e8]" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5 rounded-xl bg-white p-2 shadow-[0_8px_22px_rgba(80,93,130,0.07)]">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              className={cn(
                "rounded-[4px] bg-[#edf0f4]",
                [2, 5, 10, 15].includes(index) && "bg-[#bce9ff]",
              )}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative flex h-[132px] items-center justify-center overflow-hidden rounded-2xl p-4"
      style={{ background: affinaAppGradient }}
    >
      <div className="w-full max-w-[230px] rounded-xl border border-black/[0.07] bg-white p-3 shadow-[0_10px_28px_rgba(52,72,108,0.10)]">
        <div className="flex items-center justify-between">
          <span className="h-2 w-16 rounded-full bg-[#d9dde3]" />
          <span className="rounded-full bg-[#e9dcff] px-2 py-1 text-[8px] font-bold text-[#7055bc]">
            Selected
          </span>
        </div>
        <div className="mt-3 h-7 rounded-lg border border-[#dfe3e8] bg-[#fafafa]" />
        <div className="mt-2 flex gap-2">
          <span className="h-7 flex-1 rounded-lg bg-[#08090a]" />
          <span className="size-7 rounded-lg bg-[linear-gradient(135deg,#a8dffe,#2c86ff)]" />
        </div>
      </div>
    </div>
  );
}

const designSystemBuildOrder = [
  {
    number: "01",
    title: "Audit",
    detail: "Inventory live screens, repeated patterns and visual inconsistencies.",
  },
  {
    number: "02",
    title: "Foundations",
    detail: "Set the shared language for color, type, spacing, grid, radius and elevation.",
  },
  {
    number: "03",
    title: "Components",
    detail: "Build from small controls to reusable product patterns, with states and variants.",
  },
  {
    number: "04",
    title: "Governance",
    detail: "Document usage, map values to code and record every system change.",
  },
] as const;


const processSteps = [
  { label: "Survey", active: true },
  { label: "Recommend", active: true },
  { label: "Compare", active: true },
  { label: "Complete info", active: false },
  { label: "Purchase", active: false },
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
  sectionPill: caseStudyStyles.eyebrow,
  accentLabel: "text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]",
  mutedLabel: "text-xs font-semibold uppercase tracking-[0.1em] text-[#737373]",
  sectionTitle: caseStudyStyles.sectionTitle,
  leadText: caseStudyStyles.body,
  bodyText: caseStudyStyles.bodyInk,
  compactBody: "text-base leading-[1.6] text-[#08090a]",
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

const nextProjects = getNextProjects(
  DATA.projects as readonly CaseProject[],
  "/blog/affina"
);

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

type JourneyFlowScreen = {
  src: string;
  label: string;
  detail: string;
  height?: number;
};

function JourneyScreenFlow({
  screens,
  title,
}: {
  screens: readonly JourneyFlowScreen[];
  title: string;
}) {
  return (
    <div className="-mx-5 overflow-hidden sm:mx-0">
      <div className="scrollbar-none overflow-x-auto pb-4">
        <div className="flex w-max snap-x snap-mandatory items-start px-5 sm:px-0">
          {screens.map((screen, index) => (
            <div className="contents" key={screen.src}>
              <figure className="w-[62vw] max-w-[240px] shrink-0 snap-start">
                <ImageZoom>
                  <div className="overflow-hidden rounded-[24px] border border-[#cfd0d4] bg-white shadow-sm">
                    <Image
                      src={screen.src}
                      alt={`${title}: ${screen.label}`}
                      width={1533}
                      height={screen.height ?? 3317}
                      className="block h-auto w-full"
                      sizes="(max-width: 768px) 62vw, 240px"
                    />
                  </div>
                </ImageZoom>
                <figcaption className="mt-5">
                  <p className="text-sm font-semibold text-[#08090a]">{screen.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[#737373]">{screen.detail}</p>
                </figcaption>
              </figure>
              {index < screens.length - 1 && (
                <div className="mx-4 mt-48 flex size-10 shrink-0 items-center justify-center rounded-full border border-[#0293f4]/20 bg-white text-[#0293f4] shadow-sm sm:mx-6">
                  <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AffinaProjectCover() {
  return (
    <div className="overflow-hidden rounded-xl">
      <Image
        src="/assets/project-thumbnails/affina-pink-meadow-en.webp"
        alt="Affina app displayed on a phone above a grassy hill with pink flowers"
        width={1448}
        height={1086}
        className="block h-auto w-full"
        sizes="(max-width: 1040px) 100vw, 976px"
      />
    </div>
  );
}

function InsuranceProductFlow() {
  return (
    <div id="affina-system-product-flow" className="relative mx-auto grid w-full max-w-[620px] grid-cols-2 gap-x-7 gap-y-10 p-4 sm:p-6">
      {insuranceProductFlow.map((step, index) => (
        <figure className={cn("relative min-w-0", index === 2 && "col-start-2 row-start-2", index === 3 && "col-start-1 row-start-2")} key={step.number}>
          <ImageZoom>
            <div className="relative mx-auto aspect-[390/844] w-full max-w-[190px] overflow-hidden rounded-[18px] border border-[#e8e3ed] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.09)]">
              <Image src={step.src} alt={step.title} width={1533} height={3317} className="h-full w-full object-cover object-top" sizes="(max-width: 768px) 42vw, 190px" />
            </div>
          </ImageZoom>
          <figcaption className="mt-3">
            <p className="text-[10px] font-bold tracking-[0.12em] text-[#2366b7]">{step.number}</p>
            <p className="mt-1 text-sm font-semibold leading-5 text-[#2e2222]">{step.title}</p>
            <p className="mt-1 text-[11px] leading-4 text-[#62666b]">{step.detail}</p>
          </figcaption>
        </figure>
      ))}
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
        <h3 className="font-[var(--font-heading)] text-lg font-normal leading-[1.25] tracking-normal text-[#08090a] sm:text-xl">
          {row.title}
        </h3>
        <p className={cn("pt-4", styles.bodyText)}>
          {row.before && <>{row.before} </>}
          <CaseStudyScrollHighlight>{row.bold}</CaseStudyScrollHighlight>{" "}
          {row.after}
        </p>
      </div>

      {row.flow ? (
        <InsuranceProductFlow />
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#cfd0d4] shadow-sm">
          <ImageZoom>
            <Image
              src={row.image || ""}
              alt=""
              width={1213}
              height={894}
              className={cn(
                "w-full rounded-xl object-contain object-top",
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
        "flex h-full min-h-0 flex-col items-center justify-center gap-6 p-6 text-center",
        "sm:p-8",
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
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showAfter = isRevealed || isHovered;

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <div className="whitespace-nowrap rounded-xl bg-[#0d0d0d] px-4 py-1.5 text-center text-sm font-normal text-white sm:text-base">
          {title}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#e4e4e7] bg-[#e6e6e6]">
        <button
          type="button"
          aria-label={`${title}: reveal ${showAfter ? "before" : "after"}`}
          aria-pressed={showAfter}
          className="block w-full cursor-pointer text-inherit [perspective:1400px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0293f4]"
          onClick={() => setIsRevealed((current) => !current)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{ rotateY: showAfter ? 180 : 0 }}
            className="relative h-[430px] w-full sm:h-[480px]"
            style={{ transformStyle: "preserve-3d" }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden" }}
            >
              <ComparisonPanel label="Before">{before}</ComparisonPanel>
            </div>
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <ComparisonPanel label="After" tone="after">
                {after}
              </ComparisonPanel>
            </div>
          </motion.div>
        </button>
      </div>
    </div>
  );
}

function AffinaStickyIndicator() {
  return (
    <CaseStudySectionNavigation
      heroId="affina-overview"
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
      <div className="flex flex-col justify-between gap-8 p-7">
        <div>
          <p className={styles.accentLabel}>
            {featured ? "Next project" : project.dates}
          </p>
          <h3
            className={cn(
              "mt-3 font-[var(--font-affina-heading)] font-normal leading-[1.2] tracking-normal",
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
            <span
              className="rounded-full bg-[#eeeff1] px-3 py-1.5 text-xs text-[#454545]"
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
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f7f8] font-[var(--font-affina-body)] text-[#08090a]">
      <AffinaStickyIndicator />

      <ProjectCaseStudyHero
        colors={projectMeshPalettes.affina}
        delay={PROJECT_HERO_DELAY}
        id="affina-overview"
        links={[
          { href: "https://apps.apple.com/vn/app/affina-one/id6474957786", label: "App Store", icon: "appstore" },
          { href: "https://play.google.com/store/apps/details?id=com.affina&hl=en", label: "Google Play", icon: "googleplay" },
        ]}
        outcome="Clearer journeys and stronger brand consistency"
        role="Product Designer"
        scope="Web, mobile, design system, AI workflow"
        status="Live"
        title="Affina — Simplifying Insurance with AI"
        titleLines={["Affina —", "Simplifying", "Insurance with AI"]}
      />

      <section className={cn("relative z-10 mx-auto w-full max-w-[1040px] px-5 py-24 sm:px-8 lg:py-36", caseStudyStyles.pageStack)}>
        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="affina-work">
          <div className="flex flex-col gap-7">
            <span className={styles.sectionPill}>
              Overview
            </span>
            <h2 className={cn(caseStudyStyles.overviewTitle, "tracking-[-1px]")}>
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

          <AffinaProjectCover />

        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="affina-system">
          <span className={styles.sectionPill}>Design challenges</span>

          <CaseStudyStatementReveal
            className="tracking-[-1px]"
            text="How might we turn a fragmented insurance journey into one clear path forward?"
          />

          <CaseStudyScrollReveal>
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
                    <h3 className="font-[var(--font-affina-heading)] text-lg font-normal leading-[1.3] tracking-normal text-[#18181b]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#71717a]">
                      {item.question}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </CaseStudyScrollReveal>
        </CaseStudyRevealSection>

        <section className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="affina-challenge-01">
          <CaseStudyScrollReveal className="flex flex-col gap-6 sm:gap-7">
            <span className={styles.sectionPill}>
              Challenge 01
            </span>
            <h2 className={styles.sectionTitle}>
              Turning an offline sales journey into an AI-assisted online
              experience
            </h2>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal className="grid gap-8 sm:gap-10">
            <article className="border-t border-black/10 pt-8">
              <p className={styles.accentLabel}>
                Business context
              </p>
              <p className={cn("mt-4", styles.bodyText)}>
                Affina wanted to move more of its insurance journey online.
              </p>
            </article>
            <article className="rounded-xl bg-[#08090a] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd360]">
                Our solution
              </p>
              <p className="mt-4 max-w-[900px] text-base leading-[1.6] text-white/85 sm:text-[17px]">
                Instead of simply digitising the sales form, we built an{" "}
                <CaseStudyScrollHighlight inverted>
                  AI-assisted journey
                </CaseStudyScrollHighlight>{" "}
                that narrowed choices, recommended suitable plans, and made
                comparison easier.
              </p>
            </article>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal>
            <div className="border-y border-black/10 py-10 sm:py-12">
              <p className={styles.accentLabel}>
                My product design scope
              </p>
              <p className="mt-6 max-w-[760px] text-base font-normal leading-[1.6] text-[#18181b] sm:text-[17px]">
                I owned the journey from flow definition to responsive UI delivery.
              </p>
              <ul className="mt-8 flex max-w-[760px] list-disc flex-col gap-2 pl-6 text-base font-normal leading-[1.6] text-[#18181b] marker:text-[#18181b] sm:text-[17px]">
                <li>
                  Mapped the{" "}
                  <CaseStudyScrollHighlight>
                    survey-to-comparison flow
                  </CaseStudyScrollHighlight>
                </li>
                <li>
                  Simplified{" "}
                  <CaseStudyScrollHighlight>
                    hierarchy and responsive states
                  </CaseStudyScrollHighlight>
                </li>
                <li>
                  <CaseStudyScrollHighlight>
                    Implemented the UI in source code
                  </CaseStudyScrollHighlight>{" "}
                  and refined production details
                </li>
              </ul>
            </div>

            <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-[#cfd0d4] shadow-sm">
                <a
                  href="https://schema-wreath-37837045.figma.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the Affina insurance purchase flow in a new tab"
                  className="block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0293f4]"
                >
                  <Image
                    src="/assets/affina/user-flow-image.png"
                    alt="Affina insurance purchase user flow"
                    width={1920}
                    height={912}
                    unoptimized
                    className="h-auto w-full object-cover object-top"
                    sizes="(max-width: 640px) 90vw, 450px"
                  />
                </a>
              </div>
              <div className="overflow-hidden rounded-xl border border-[#cfd0d4] shadow-sm">
                <ImageZoom zoomImg={{ src: "/assets/affina/gitlab-code-repo-blur.png" }}>
                  <Image
                    src="/assets/affina/gitlab-code-repo-blur.png"
                    alt="Affina GitLab code repository overview"
                    width={1774}
                    height={887}
                    unoptimized
                    className="h-auto w-full object-cover object-top"
                    sizes="(max-width: 640px) 90vw, 450px"
                  />
                </ImageZoom>
              </div>
            </div>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <p className={styles.accentLabel}>
              How I solved it
            </p>
            <h3 className="mt-4 font-[var(--font-affina-heading)] text-lg font-normal leading-[1.25] tracking-normal sm:text-xl">
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
                        : "bg-[#e6e6e8] text-[#18181b]"
                    )}
                    key={step.label}
                  >
                    {step.label}
                  </span>
                ))}
              </div>
            </div>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal className="flex flex-col gap-0">
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

                <div
                  className={cn(
                    "flex min-w-0 flex-col gap-5 sm:gap-6",
                    step.number !== "3" && "pb-16 sm:pb-20"
                  )}
                >
                  <div className="font-[var(--font-affina-body)]">
                    <h3 className="font-[var(--font-heading)] text-lg font-normal leading-[1.25] tracking-normal text-[#08090a] sm:text-xl">
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
                          {step.bullets.map((item, index) => (
                            <li key={`${step.number}-${index}`}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <JourneyScreenFlow screens={step.media} title={step.title} />
                </div>
              </article>
            ))}
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal>
            <div id="affina-measured-behavior" className="rounded-3xl border border-[#cce6f7] p-6 text-[#2e2222] shadow-sm sm:p-8 lg:p-10" style={{ background: affinaAppGradient }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2366b7]">
                  Measured behavior
                </p>
                <h3 className="mt-4 font-[var(--font-affina-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
                  30-day snapshot after launch
                </h3>
              </div>
              <p className="max-w-[300px] text-sm leading-[1.5] text-[#526677] sm:text-right">
                Traffic during this period was primarily organic and internal
                testing, with no paid acquisition campaigns.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {measuredBehaviorStats.map((stat) => (
                <div
                  className="rounded-xl border border-white/80 bg-white/65 p-4"
                  key={stat.label}
                >
                  <p className="font-[var(--font-affina-heading)] text-[30px] font-medium leading-none tracking-normal text-[#2e2222] sm:text-[34px]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-[#526677]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-xl bg-white p-5 text-[#08090a]">
                <p className="font-[var(--font-affina-heading)] text-[52px] font-medium leading-none tracking-[-0.05em] text-[#08090a]">
                  61.4%
                </p>
                <p className="mt-4 text-base leading-7 text-[#454545]">
                  of sessions that reached recommendations continued to{" "}
                  <CaseStudyScrollHighlight>Buy Now</CaseStudyScrollHighlight>.
                </p>
              </div>

              <div className="rounded-xl border border-white/80 bg-white/45 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#526677]">
                  What&apos;s next
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-base leading-7 text-[#405568]">
                  {nextMeasurementSteps.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-[#2c86ff]/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>
          </CaseStudyScrollReveal>
        </section>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="affina-challenge-02">
          <div className="flex flex-col gap-6 sm:gap-7">
            <span className={styles.sectionPill}>
              Challenge 02
            </span>
            <h2 className={styles.sectionTitle}>
              Building the design system from foundations up
            </h2>
            <p className={cn("max-w-[760px]", styles.leadText)}>
              I treated the system as a product: start with the decisions it
              must protect, translate them into rules, then prove those rules
              through real interfaces.
            </p>
          </div>

          <CaseStudyStatementReveal
            className="tracking-[-1px]"
            text="Principles guide the rules. Rules shape the elements. Real product use keeps the system honest."
          />

          <CaseStudyScrollReveal className="rounded-2xl border border-[#e4e4e7] bg-white p-5 sm:p-8 lg:p-10">
            <p className={styles.accentLabel}>System architecture</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {designSystemLayers.map((layer, index) => (
                <div
                  className="relative flex min-w-0 flex-col rounded-3xl border border-black/10 bg-white p-3"
                  key={layer.label}
                >
                  <DesignSystemLayerVisual kind={layer.kind} />
                  <div className="px-2 pb-3 pt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0096f7]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-2 font-[var(--font-affina-heading)] text-2xl font-medium leading-tight">
                      {layer.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#737373]">
                      {layer.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal>
            <div className="flex flex-col gap-6">
              <div>
                <p className={styles.accentLabel}>Build order</p>
                <h3 className="mt-4 font-[var(--font-affina-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
                  What I built first — and why
                </h3>
              </div>
              <div className="grid overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white sm:grid-cols-2 lg:grid-cols-4">
                {designSystemBuildOrder.map((step) => (
                  <article
                    className="border-b border-[#e4e4e7] p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0"
                    key={step.number}
                  >
                    <p className="text-xs font-bold tracking-[0.12em] text-[#0096f7]">
                      {step.number}
                    </p>
                    <h4 className="mt-4 font-[var(--font-affina-heading)] text-xl font-medium leading-tight">
                      {step.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-[#737373]">
                      {step.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal>
            <AffinaAppDesignSystem />
          </CaseStudyScrollReveal>

          <div>
            <p className={styles.accentLabel}>From system to product</p>
            <h3 className="mt-4 max-w-[720px] font-[var(--font-affina-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Four checkpoints kept design, Figma and production aligned
            </h3>
          </div>

          <div className="flex flex-col gap-16 sm:gap-20">
            {healthcareRows.map((row) => (
              <AffinaHealthcareRow row={row} key={row.number} />
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="affina-brand">
          <div className="flex flex-col gap-6 sm:gap-7">
            <span className={styles.sectionPill}>
              Challenge 03
            </span>
            <h2 className={styles.sectionTitle}>
              Rebuilding the brand foundation
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

          <div className="border-y border-black/10 py-10 sm:py-12">
            <p className={styles.accentLabel}>
              Founder direction → solution
            </p>
            <p className={cn("mt-5", styles.bodyText)}>
              The founder wanted the brand to feel more relevant to women
              without losing its youthful, energetic character. I translated
              that direction into a visual foundation that could scale across
              product and communication.
            </p>
          </div>

          <div className="flex flex-col gap-16 sm:gap-20">
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
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="affina-next">
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
        </CaseStudyRevealSection>
      </section>

      <section
        id="affina-contact"
        className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36"
      >
        <div className="relative mx-auto max-w-[560px]">
          <span className={cn("inline-flex", styles.sectionPill)}>
            Contact
          </span>
          <h2 className="mt-5 font-[var(--font-affina-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
            Get in touch
          </h2>
          <p className={cn("mt-5", styles.leadText)}>
            Excited to collaborate! Email me at{" "}
            <a className="text-[#08090a] underline underline-offset-4" href="mailto:phuongthuy101222@gmail.com">
              phuongthuy101222@gmail.com
            </a>{" "}
            or see my work on{" "}
            <a className="text-[#08090a] underline underline-offset-4" href={DATA.contact.social.Behance.url} rel="noopener noreferrer" target="_blank">
              Behance
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
