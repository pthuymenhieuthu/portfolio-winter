"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { getNextProjects } from "@/lib/next-projects";
import { cn } from "@/lib/utils";
import { CaseStudySectionNavigation } from "@/components/case-study-section-navigation";
import { CaseStudyScrollHighlight } from "@/components/case-study-scroll-highlight";
import { CaseStudyStatementReveal } from "@/components/case-study-statement-reveal";
import { CaseStudyRevealSection } from "@/components/case-study-scroll-reveal";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";
import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import { projectMeshPalettes } from "@/components/project-mesh-gradient";

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
  { id: "zoan-deployment", label: "Deployment dashboard" },
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
  versionReview: "/assets/zoan/deployment-flow/version-review.png",
  reviewDiff: "/assets/zoan/deployment-flow/review-diff.png",
  readyToDeploy: "/assets/zoan/deployment-flow/ready-to-deploy.png",
  publishingLogs: "/assets/zoan/deployment-flow/publishing-logs.png",
  deployed: "/assets/zoan/deployment-flow/deployed.png",
  cloudStorage: "/assets/zoan/deployment-flow/cloud-storage.png",
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
  [zoanAssets.versionReview]: [1440, 1024],
  [zoanAssets.reviewDiff]: [1440, 1024],
  [zoanAssets.readyToDeploy]: [1440, 1024],
  [zoanAssets.publishingLogs]: [1440, 1024],
  [zoanAssets.deployed]: [1440, 1024],
  [zoanAssets.cloudStorage]: [1419, 1339],
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

const deploymentStates = [
  "Submit from chat",
  "Draft",
  "Auditing",
  "Under review",
  "Ready to deploy",
  "Publishing",
  "Deployed",
];

const deploymentStages = [
  {
    number: "01",
    eyebrow: "Review",
    title: "Make every version decision visible",
    description:
      "Filter versions by lifecycle state, then open a project to inspect code changes and audit messages without losing context.",
    images: [
      { src: zoanAssets.versionReview, alt: "Zoan version review dashboard with lifecycle status filters" },
      { src: zoanAssets.reviewDiff, alt: "Zoan version details with code diff and deployment notifications" },
    ],
  },
  {
    number: "02",
    eyebrow: "Release",
    title: "Turn approval into a controlled launch",
    description:
      "Approved versions move into scheduling, while publishing logs make progress and failure states easy to follow during release.",
    images: [
      { src: zoanAssets.readyToDeploy, alt: "Zoan deployment scheduling flow" },
      { src: zoanAssets.publishingLogs, alt: "Zoan publishing logs during deployment" },
    ],
  },
  {
    number: "03",
    eyebrow: "Operate",
    title: "Keep live products and resources connected",
    description:
      "Deployed projects retain their version history and controls, while Zoan Cloud brings storage and supporting resources into the same ecosystem.",
    images: [
      { src: zoanAssets.deployed, alt: "Zoan deployed project summary and version history" },
      { src: zoanAssets.cloudStorage, alt: "Zoan Cloud storage dashboard" },
    ],
  },
];

const nextProjects = getNextProjects(
  DATA.projects as readonly CaseProject[],
  "/blog/zoan"
);

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

      <ProjectCaseStudyHero
        colors={projectMeshPalettes.zoan}
        delay={PROJECT_HERO_DELAY}
        id="zoan-overview"
        links={[
          { href: "https://zoan.network/", label: "Website", icon: "website" },
          { href: "https://www.linkedin.com/company/zoanai/posts/?feedView=all", label: "LinkedIn", icon: "link" },
        ]}
        outcome="A scalable system that reduced design–engineering friction and strengthened the product identity"
        role="UI/UX Designer"
        scope="Cross-platform UI, design system, Rive motion"
        status="Done"
        title="Zoan AI — Designing Clearer AI Workflows"
        titleLines={["Zoan AI —", "Designing Clearer", "AI Workflows"]}
      />

      <section className="relative z-10 mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 py-24 sm:gap-40 sm:px-8 lg:py-36">
        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Overview
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[30px] font-normal leading-[1.2] tracking-[-1px] sm:text-[40px]">
              Will AI replace UI/UX Designers?
            </h2>
            <p className="text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Before joining Zoan AI, I used to ask myself that question. But
              leading this project, from system rebuilding and UI redesign to
              shaping cross-platform experiences, made me realize something
              else.
            </p>
          </div>

          <CaseStudyStatementReveal className="tracking-[-1px]" text="I wasn’t being replaced by AI. I was designing the interface for an AI platform." />

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

          <div className="flex flex-col gap-6">
            <CaseImage src={zoanAssets.color} alt="Zoan color foundation" />
            <CaseImage src={zoanAssets.typography} alt="Zoan typography foundation" />
            <CaseImage
              src={zoanAssets.tokens}
              alt="Zoan variable token system"
              className="mx-auto w-full max-w-[720px]"
            />
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

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-deployment">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Phase 5 · Deployment Dashboard
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[30px] font-normal leading-[1.2] tracking-[-1px] sm:text-[40px]">
              Making every step from review to release visible
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              I mapped deployment as a state-driven workflow so teams could
              review changes, schedule a release, monitor publishing, and manage
              live projects without losing context.
            </p>
          </div>

          <div className="rounded-2xl border border-[#07111f]/10 bg-white p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
              Product lifecycle
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
              {deploymentStates.map((state, index) => (
                <div className="flex items-center gap-3 lg:flex-col lg:items-start" key={state}>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#dff8f6] text-xs font-semibold text-[#087f77]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-5 text-[#08090a]">{state}</span>
                </div>
              ))}
            </div>
          </div>

          <CaseStudyStatementReveal
            className="tracking-[-1px]"
            text="One dashboard connected version decisions, release timing, and live operations."
          />

          <div className="flex flex-col gap-20 sm:gap-28">
            {deploymentStages.map((stage) => (
              <article className="flex flex-col gap-8" key={stage.number}>
                <div className="grid gap-6 border-t border-[#07111f]/10 pt-7 md:grid-cols-[120px_1fr]">
                  <div>
                    <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#15CABE]">
                      {stage.number}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                      {stage.eyebrow}
                    </p>
                  </div>
                  <div className="max-w-[700px]">
                    <h3 className="font-[var(--font-heading)] text-2xl font-normal leading-[1.2] tracking-normal sm:text-[30px]">
                      {stage.title}
                    </h3>
                    <p className="mt-4 text-base leading-[1.6] text-[#737373] sm:text-[17px]">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="grid items-start gap-5 lg:grid-cols-2">
                  {stage.images.map((image) => (
                    <CaseImage
                      className="bg-white"
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="zoan-motion">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1 text-sm text-white">
              Phase 6 · Motion &amp; Micro-Interaction Design
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
