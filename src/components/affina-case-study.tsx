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
        Open the{" "}
        <CaseStudyScrollHighlight>
          survey from the homepage
        </CaseStudyScrollHighlight>{" "}
        in a modal — no page change.
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
    detail: "Coverage → Profile → Budget → Benefits → Insurer",
    media: [
      {
        src: "/assets/affina/survey-flow/01-insurance-type.png",
        label: "01 · Insurance type",
        detail: "Choose the insurance product to explore.",
      },
      {
        src: "/assets/affina/survey-flow/02-insured-person.png",
        label: "02 · Insured person",
        detail: "Define who needs coverage and their date of birth.",
      },
      {
        src: "/assets/affina/survey-flow/03-budget-benefits.png",
        label: "03 · Budget & core benefits",
        detail: "Set an expected budget and the most important coverage.",
      },
      {
        src: "/assets/affina/survey-flow/04-extra-benefits-insurer.png",
        label: "04 · Preferences",
        detail: "Add optional benefits and preferred insurers.",
      },
      {
        src: "/assets/affina/survey-flow/05-loading.png",
        label: "05 · Matching",
        detail: "Process the answers before showing suitable plans.",
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
        src: "/assets/affina/survey-flow/06-results.png",
        label: "06 · Recommendations",
        detail: "Surface three suitable plans with clear price and benefit cues.",
      },
    ],
  },
  {
    number: "3",
    title: "Compare",
    eyebrow: "Make complex benefits easier to compare across web and mobile",
    bullets: [
      "Keep the same three plans",
      "Group benefits into clear rows",
      "Emphasize meaningful differences",
      "Add status and best-choice cues",
    ],
    media: [
      {
        src: "/assets/affina/survey-flow/07-compare-top.png",
        label: "07 · Compare overview",
        detail: "Compare plan pricing and providers side by side.",
      },
      {
        src: "/assets/affina/survey-flow/08-compare-details.png",
        label: "08 · Benefit details",
        detail: "Review coverage differences before making a final choice.",
      },
    ],
  },
];

const mobileComparisonScreens = [
  {
    src: "/assets/affina/mobile-flow/06-recommendation.png",
    label: "01 · Recommend",
    detail: "Keep the best-fit plan and essential facts easy to scan.",
    highlightZoom: false,
  },
  {
    src: "/assets/affina/mobile-flow/06-expanded-reasons.png",
    label: "02 · Reveal reasons",
    detail: "Expand why a plan fits only when users need the detail.",
    highlightZoom: false,
  },
  {
    src: "/assets/affina/mobile-flow/07-comparison.png",
    label: "03 · Compare",
    detail: "Preserve readable rows within the narrow mobile viewport.",
    highlightZoom: true,
  },
  {
    src: "/assets/affina/mobile-flow/07-overview.png",
    label: "04 · Open overview",
    detail: "Fit the full table on screen for a faster overall comparison.",
    highlightZoom: false,
  },
] as const;

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
    after: "across responsive healthcare journeys, then refined the system from real use cases.",
    flow: true,
  },
];

const healthcareProductFlow = [
  {
    number: "01",
    title: "Start from Home",
    detail: "Tap Remote Health Consultation.",
    src: "/assets/affina/healthcare-flow/01-home.png",
    objectPosition: "center top",
    highlight: {
      left: "28.5%",
      top: "89.8%",
      width: "20%",
      height: "9.4%",
    },
  },
  {
    number: "02",
    title: "Choose a provider",
    detail: "Pick the care partner that fits the need.",
    src: "/assets/affina/healthcare-flow/01-choose-provider.png",
  },
  {
    number: "03",
    title: "Review the service",
    detail: "Keep provider and benefit context together.",
    src: "/assets/affina/healthcare-flow/02-review-service.png",
  },
  {
    number: "04",
    title: "Accept the terms",
    detail: "Make the required consent easy to scan.",
    src: "/assets/affina/healthcare-flow/03-accept-terms.png",
  },
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
        className="relative flex h-[132px] items-end overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#f7e7ff_0%,#e2f4ff_52%,#fff3db_100%)] p-4"
      >
        <div className="relative grid w-full grid-cols-3 gap-2">
          {["Clear", "Human", "Scalable"].map((item, index) => (
            <div
              className="rounded-xl border border-white/70 bg-white/65 px-2 py-3 text-center shadow-[0_8px_22px_rgba(80,93,130,0.08)] backdrop-blur-sm"
              key={item}
            >
              <span
                className={cn(
                  "mx-auto mb-2 block size-2.5 rounded-full",
                  index === 0 && "bg-[#20b8f5]",
                  index === 1 && "bg-[#ec62d7]",
                  index === 2 && "bg-[#826de8]",
                )}
              />
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
        className="grid h-[132px] grid-cols-[1.05fr_0.95fr] gap-3 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#f7f7f8] p-4"
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
      className="relative flex h-[132px] items-center justify-center overflow-hidden rounded-2xl bg-[#edf4fb] p-4"
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
          <span className="size-7 rounded-lg bg-[linear-gradient(135deg,#6cc9ff,#ec62d7)]" />
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

const foundationSpacingTokens = [4, 8, 12, 16, 24, 32] as const;
const foundationRadiusTokens = [4, 8, 12, 16, 24] as const;

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

function AffinaOverviewPhoneMockup({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-[734/1592] w-[150px] shrink-0 sm:w-[186px]">
      <Image
        src={src}
        alt={alt}
        width={734}
        height={1592}
        className="h-full w-full object-contain"
        sizes="(max-width: 640px) 150px, 186px"
      />
    </div>
  );
}

function AffinaMacBookMockup() {
  return (
    <div className="relative mx-auto aspect-[1482/1062] w-full max-w-[600px]">
      <Image
        src="/assets/affina/overview-desktop-transparent.png"
        alt="Affina website homepage shown in a desktop monitor mockup"
        width={1482}
        height={1062}
        className="absolute inset-0 h-full w-full object-contain"
        sizes="(max-width: 768px) 90vw, 600px"
      />
    </div>
  );
}

type JourneyFlowScreen = {
  src: string;
  label: string;
  detail: string;
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
        <div className="flex w-max snap-x snap-mandatory items-center px-5 sm:px-0">
          {screens.map((screen, index) => (
            <div className="contents" key={screen.src}>
              <figure className="w-[82vw] max-w-[680px] shrink-0 snap-start">
                <ImageZoom>
                  <div className="overflow-hidden rounded-xl border border-[#cfd0d4] bg-white shadow-sm">
                    <Image
                      src={screen.src}
                      alt={`${title}: ${screen.label}`}
                      width={1920}
                      height={912}
                      className="block h-auto w-full"
                      sizes="(max-width: 768px) 82vw, 680px"
                    />
                  </div>
                </ImageZoom>
                <figcaption className="mt-5">
                  <p className="text-sm font-semibold text-[#08090a]">{screen.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[#737373]">{screen.detail}</p>
                </figcaption>
              </figure>
              {index < screens.length - 1 && (
                <div className="mx-4 flex size-10 shrink-0 items-center justify-center rounded-full border border-[#0293f4]/20 bg-white text-[#0293f4] shadow-sm sm:mx-6">
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

function MobileComparisonFlow() {
  return (
    <div className="rounded-[28px] border border-[#d9dce2] bg-white/70 p-5 sm:p-8">
      <div className="mb-10">
        <p className={styles.accentLabel}>Mobile comparison flow</p>
        <h3 className="mt-4 max-w-[720px] font-[var(--font-affina-heading)] text-[26px] font-normal leading-[1.2] tracking-normal text-[#08090a] sm:text-[30px]">
          Keep the detail readable — and the whole picture one tap away
        </h3>
        <p className={cn("mt-5 max-w-[720px]", styles.leadText)}>
          Keep details readable, then use the{" "}
          <CaseStudyScrollHighlight>
            expand control
          </CaseStudyScrollHighlight>{" "}
          to see the full comparison.
        </p>
      </div>

      <div className="-mx-5 overflow-hidden sm:-mx-8 lg:mx-0 lg:overflow-visible">
        <div className="scrollbar-none overflow-x-auto px-5 pb-4 sm:px-8 lg:overflow-visible lg:px-0">
          <div className="flex w-max snap-x snap-mandatory items-start gap-4 lg:grid lg:w-full lg:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)_40px_minmax(0,1fr)_40px_minmax(0,1fr)] lg:gap-3">
            {mobileComparisonScreens.map((screen, index) => (
              <div className="contents" key={screen.src}>
                <figure className="w-[68vw] max-w-[205px] shrink-0 snap-start justify-self-center lg:w-full">
                  <div className="relative overflow-hidden rounded-[20px] border border-[#d9dce2] bg-[#f6f8fb] shadow-sm">
                    <Image
                      src={screen.src}
                      alt={`Affina mobile flow: ${screen.label}`}
                      width={828}
                      height={1792}
                      unoptimized
                      className="block h-auto w-full"
                      sizes="(max-width: 1024px) 68vw, 205px"
                    />
                    {screen.highlightZoom && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-[6.4%] top-[17.65%] h-[4.15%] w-[32.8%] rounded-full border-[1.5px] border-[#f2bd22] bg-[#FFD360]/10 shadow-[0_0_0_3px_rgba(255,211,96,0.24)]"
                      />
                    )}
                  </div>
                  <figcaption className="mt-5">
                    <p className="text-sm font-semibold text-[#08090a]">
                      {screen.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#737373]">
                      {screen.detail}
                    </p>
                  </figcaption>
                </figure>

                {index < mobileComparisonScreens.length - 1 && (
                  <div className="flex size-10 shrink-0 items-center justify-center self-center rounded-full border border-[#0293f4]/20 bg-white text-[#0293f4] shadow-sm">
                    <ChevronRight
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.8}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AffinaDeviceShowcase() {
  return (
    <div className="grid items-center gap-10 py-4 sm:py-6 lg:grid-cols-[0.9fr_1.25fr]">
      <div className="flex items-start justify-center gap-4 sm:gap-5">
        <AffinaOverviewPhoneMockup
          src="/assets/affina/overview-mobile-1.png"
          alt="Affina mobile home screen for a signed-out customer"
        />
        <AffinaOverviewPhoneMockup
          src="/assets/affina/overview-mobile-2.png"
          alt="Affina mobile home screen with an active insurance policy"
        />
      </div>
      <AffinaMacBookMockup />
    </div>
  );
}

function HealthcareProductFlow() {
  return (
    <div className="relative mx-auto grid w-full max-w-[620px] grid-cols-2 gap-x-8 gap-y-10 rounded-3xl border border-[#dde1ff] bg-[#f7f7ff] p-4 sm:p-6">
      <div className="pointer-events-none absolute left-1/2 top-[26%] z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#c8cdff] bg-white text-[#5e6bfc] shadow-sm">
        <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </div>
      <div className="pointer-events-none absolute right-[24%] top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#c8cdff] bg-white text-[#5e6bfc] shadow-sm">
        <ChevronRight aria-hidden="true" className="size-4 rotate-90" strokeWidth={1.8} />
      </div>
      <div className="pointer-events-none absolute bottom-[25%] left-1/2 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#c8cdff] bg-white text-[#5e6bfc] shadow-sm">
        <ChevronRight aria-hidden="true" className="size-4 rotate-180" strokeWidth={1.8} />
      </div>

      {healthcareProductFlow.map((step, index) => (
        <figure
          className={cn(
            "relative min-w-0",
            index === 2 && "col-start-2 row-start-2",
            index === 3 && "col-start-1 row-start-2",
          )}
          key={step.number}
        >
          <div className="relative mx-auto aspect-[390/844] w-full max-w-[190px] overflow-hidden rounded-[18px] border border-[#d9dce2] bg-white shadow-[0_14px_32px_-20px_rgba(32,36,84,0.34)]">
            <Image
              src={step.src}
              alt={`Affina healthcare flow: ${step.title}`}
              width={390}
              height={1128}
              className="h-full w-full object-cover object-top"
              style={{ objectPosition: "objectPosition" in step ? step.objectPosition : undefined }}
              sizes="(max-width: 768px) 42vw, 190px"
            />
            {"highlight" in step && step.highlight ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-10 rounded-2xl border-2 border-[#ff51ff] bg-[#ff51ff]/10 shadow-[0_0_0_4px_rgba(255,255,255,0.92),0_0_0_7px_rgba(255,81,255,0.28)]"
                style={step.highlight}
              >
                <span className="absolute -right-2 -top-6 rounded-full bg-[#202454] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                  Tap
                </span>
              </div>
            ) : null}
          </div>
          <figcaption className="mt-3">
            <p className="text-[10px] font-bold tracking-[0.12em] text-[#5e6bfc]">
              {step.number}
            </p>
            <p className="mt-1 text-sm font-semibold leading-5 text-[#262626]">
              {step.title}
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#737373]">
              {step.detail}
            </p>
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
        <HealthcareProductFlow />
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
        links={[{ href: "https://www.affina.com.vn/ai/", label: "Website", icon: "website" }]}
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

          <AffinaDeviceShowcase />

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

          <CaseStudyScrollReveal className="flex flex-col gap-8 sm:gap-10">
            <div className="aspect-video overflow-hidden rounded-xl border border-[#cfd0d4] bg-black shadow-sm">
              <video
                aria-label="Affina AI recommendation flow demo"
                className="h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
              >
                <source
                  src="https://res.cloudinary.com/dqtfjvkok/video/upload/v1789011251/RECOMMEND_AI_-_AFFINA_1_arfukn.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal>
            <MobileComparisonFlow />
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal>
            <div className="overflow-hidden rounded-xl border border-[#cfd0d4]">
              <ImageZoom>
                <Image
                  src="/assets/affina/affina-care-journey-scene.png"
                  alt="Affina healthcare journey scene"
                  width={1672}
                  height={941}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 90vw, 934px"
                />
              </ImageZoom>
            </div>
          </CaseStudyScrollReveal>

          <CaseStudyScrollReveal className="rounded-xl bg-[#08090a] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd360]">
                  Measured behavior
                </p>
                <h3 className="mt-4 font-[var(--font-affina-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
                  30-day snapshot after launch
                </h3>
              </div>
              <p className="max-w-[300px] text-sm leading-[1.5] text-white/70 sm:text-right">
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
                  <p className="font-[var(--font-affina-heading)] text-[30px] font-medium leading-none tracking-normal text-white sm:text-[34px]">
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
                <p className="font-[var(--font-affina-heading)] text-[52px] font-medium leading-none tracking-[-0.05em] text-[#08090a]">
                  61.4%
                </p>
                <p className="mt-4 text-base leading-7 text-[#454545]">
                  of sessions that reached recommendations continued to{" "}
                  <CaseStudyScrollHighlight>Buy Now</CaseStudyScrollHighlight>.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
                  What&apos;s next
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-base leading-7 text-white/75">
                  {nextMeasurementSteps.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-white/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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

          <CaseStudyScrollReveal className="overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white">
            <div className="bg-[#f0f1ff] p-5 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#262626] sm:text-xs">
                  Design System 1.0
                </p>
                <Image
                  alt="Affina"
                  className="h-auto w-[72px] object-contain sm:w-[92px]"
                  height={60}
                  src="/assets/affina/brand-wordmark-after.svg"
                  width={300}
                />
              </div>
            </div>

            <div className="grid gap-px bg-[#e4e4e7] lg:grid-cols-2">
              <article className="min-w-0 bg-white p-5 sm:p-8 lg:p-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#737373]">
                      01 · Foundation
                    </p>
                    <h4 className="mt-2 font-[var(--font-affina-heading)] text-2xl font-semibold text-[#262626]">
                      Shared visual rules
                    </h4>
                  </div>
                  <span className="rounded-full bg-[#f0f1ff] px-3 py-1 text-[10px] font-bold text-[#5e6bfc]">
                    TOKEN-LED
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#737373]">
                    Brand & neutral colors
                  </p>
                  <div className="mt-3 grid grid-cols-6 overflow-hidden rounded-xl border border-black/[0.06]">
                    {["#5E6BFC", "#8B6CF6", "#FF51FF", "#262626", "#666666", "#EDEDED"].map(
                      (color) => (
                        <div className="aspect-square" key={color} style={{ backgroundColor: color }}>
                          <span className="sr-only">{color}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#737373]">
                    Spacing
                  </p>
                  <div className="mt-4 flex h-16 items-end justify-between gap-2">
                    {foundationSpacingTokens.map((space) => (
                      <div className="flex min-w-0 flex-1 flex-col items-center gap-2" key={space}>
                        <span
                          className="block w-full max-w-10 rounded-sm bg-[#707afc]"
                          style={{ height: `${Math.max(space, 4)}px` }}
                        />
                        <span className="text-[9px] font-medium text-[#737373]">{space}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#737373]">
                    Radius
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {foundationRadiusTokens.map((radius) => (
                      <div
                        className="flex size-12 items-center justify-center border border-[#c8cdff] bg-[#f0f1ff] text-[9px] font-semibold text-[#5e6bfc]"
                        key={radius}
                        style={{ borderRadius: `${radius}px` }}
                      >
                        {radius}
                      </div>
                    ))}
                    <div className="flex size-12 items-center justify-center rounded-full border border-[#c8cdff] bg-[#f0f1ff] text-[9px] font-semibold text-[#5e6bfc]">
                      full
                    </div>
                  </div>
                </div>
              </article>

              <article className="min-w-0 bg-[#fafaff] p-5 sm:p-8 lg:p-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#737373]">
                    02 · Atoms
                  </p>
                  <h4 className="mt-2 font-[var(--font-affina-heading)] text-2xl font-semibold text-[#262626]">
                    Controls with complete states
                  </h4>
                </div>

                <div className="mt-8 grid gap-4 rounded-2xl border border-[#e2e5ff] bg-white p-5">
                  <div className="flex items-center justify-between gap-5">
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#525252]">
                      Selection controls
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex size-6 items-center justify-center rounded-[12px] bg-[#707afc] text-sm font-bold text-white">✓</span>
                      <span className="flex size-6 items-center justify-center rounded-full border border-black/10 bg-white">
                        <span className="size-3 rounded-full bg-[#707afc]" />
                      </span>
                      <span className="relative h-8 w-14 rounded-full bg-[#707afc]">
                        <span className="absolute right-1 top-1 size-6 rounded-full bg-white shadow-sm" />
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-[#ededed]" />
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#707afc] bg-[#f0f1ff] px-3 py-2 text-xs font-semibold text-[#5e6bfc]">
                      Selected
                    </span>
                    <span className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-[#525252]">
                      Default
                    </span>
                    <span className="rounded-full bg-[#ededed] px-3 py-2 text-xs font-semibold text-[#8d808d]">
                      Disabled
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-[#e2e5ff] bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#525252]">
                    Buttons
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-2xl bg-[linear-gradient(90deg,#5e6bfc_0%,#8b6cf6_55%,#ff51ff_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(215,40,175,0.55)]">
                      Continue
                    </span>
                    <span className="rounded-2xl border border-[#ff51ff] bg-white px-4 py-2.5 text-sm font-semibold text-[#ff51ff]">
                      Secondary
                    </span>
                    <span className="rounded-2xl bg-[#262626] px-4 py-2.5 text-sm font-semibold text-white">
                      Neutral
                    </span>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-[#737373]">
                    Default, hover, pressed and disabled variants are documented
                    before components enter product flows.
                  </p>
                </div>
              </article>
            </div>
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
