"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { getNextProjects } from "@/lib/next-projects";
import { cn } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";
import { CaseStudyScrollHighlight } from "@/components/case-study-scroll-highlight";
import { CaseStudyStatementReveal } from "@/components/case-study-statement-reveal";
import { CaseStudyRevealSection } from "@/components/case-study-scroll-reveal";
import {
  CaseStudySectionNavigation,
  type CaseStudySection,
} from "@/components/case-study-section-navigation";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import {
  ProjectMeshGradient,
  projectMeshPalettes,
} from "@/components/project-mesh-gradient";

const PROJECT_HERO_DELAY = 0.36;

type Theme = {
  page: string;
  ink: string;
  muted: string;
  accent: string;
  meshColors: string[];
  heroText?: string;
};

type ImageItem = {
  src: string;
  alt: string;
  ratio?: string;
  fit?: "cover" | "contain";
  mobilePosterSrc?: string;
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

const themes = {
  graphics: {
    page: "#f7f7f8",
    ink: "#08090a",
    muted: "#737373",
    accent: "#01c9e0",
    meshColors: projectMeshPalettes.graphics,
  },
  pizzy: {
    page: "#f7f7f8",
    ink: "#08090a",
    muted: "#737373",
    accent: "#c1b5f8",
    meshColors: projectMeshPalettes.pizzy,
  },
  cake: {
    page: "#f7f7f8",
    ink: "#08090a",
    muted: "#737373",
    accent: "#ff56cf",
    meshColors: projectMeshPalettes.cake,
  },
  zanzan: {
    page: "#f7f7f8",
    ink: "#08090a",
    muted: "#737373",
    accent: "#7451cf",
    meshColors: projectMeshPalettes.zanzan,
  },
} satisfies Record<string, Theme>;

const graphicsSections = [
  { id: "graphics-overview", label: "Overview" },
  { id: "graphics-tiktok", label: "TikTok Shop" },
  { id: "graphics-seasonal", label: "Seasonal campaigns" },
  { id: "graphics-learning", label: "Learning apps" },
  { id: "graphics-next", label: "Next projects" },
] satisfies CaseStudySection[];

const pizzySections = [
  { id: "pizzy-about", label: "About" },
  { id: "pizzy-research", label: "Research" },
  { id: "pizzy-how-might-we", label: "How Might We" },
  { id: "pizzy-information-architecture", label: "Information architecture" },
  { id: "pizzy-how-it-works", label: "How it works" },
  { id: "pizzy-showcase", label: "Showcase" },
  { id: "pizzy-prototype", label: "Prototype" },
  { id: "pizzy-next", label: "Next projects" },
] satisfies CaseStudySection[];

const cakeSections = [
  { id: "cake-overview", label: "Overview" },
  { id: "cake-how-might-we", label: "How Might We" },
  { id: "cake-research", label: "Research" },
  { id: "cake-goals", label: "Goals" },
  { id: "cake-key-screens", label: "Key screens" },
  { id: "cake-user-flow", label: "User flow" },
  { id: "cake-visual-design", label: "Visual design" },
  { id: "cake-testing", label: "Usability testing" },
  { id: "cake-results", label: "Results" },
  { id: "cake-reflection", label: "Reflection" },
  { id: "cake-next", label: "Next projects" },
] satisfies CaseStudySection[];

const zanzanSections = [
  { id: "zanzan-context", label: "Context" },
  { id: "zanzan-problem", label: "Problem" },
  { id: "zanzan-research", label: "Research" },
  { id: "zanzan-persona", label: "Persona" },
  { id: "zanzan-ideation", label: "Ideation" },
  { id: "zanzan-solution", label: "Solution" },
  { id: "zanzan-design-system", label: "Design system" },
  { id: "zanzan-prototype", label: "Prototype" },
  { id: "zanzan-next", label: "Next projects" },
] satisfies CaseStudySection[];

function CaseHero({
  title,
  date,
  summary,
  theme,
}: {
  title: string;
  date: string;
  summary?: string;
  theme: Theme;
}) {
  return (
    <section
      id="legacy-project-overview"
      className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden px-6 text-center text-white sm:min-h-[800px]"
    >
      <ProjectMeshGradient colors={theme.meshColors} />
      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center">
        <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
          {date}
        </p>
        <div style={{ width: "min(720px, calc(100vw - 48px))" }}>
          <HeroTitleReveal
            className="mt-7 font-[var(--font-heading)] text-[clamp(36px,9.8vw,64px)] font-medium leading-[1.1] tracking-[-2.5px]"
            delay={PROJECT_HERO_DELAY}
            text={title}
            wrap
          />
        </div>
        {summary && (
          <BlurFade delay={1.12}>
            <p className="mt-7 max-w-[calc(100vw-40px)] text-base leading-[1.55] text-white/80 sm:max-w-[620px] sm:text-lg">
              {summary}
            </p>
          </BlurFade>
        )}
      </div>
    </section>
  );
}

function SectionLabel({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <span
      className="w-fit rounded-lg px-3 py-1 text-sm text-white"
      style={{ backgroundColor: theme.ink }}
    >
      {children}
    </span>
  );
}

function CaseSection({
  id,
  title,
  label,
  children,
  theme,
}: {
  id: string;
  title?: string;
  label?: string;
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <CaseStudyRevealSection id={id} className="flex scroll-mt-24 flex-col gap-16 sm:gap-20">
      <div className="flex flex-col gap-7">
        {label && <SectionLabel theme={theme}>{label}</SectionLabel>}
        {title && (
          <h2 className={cn(
            "font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]",
            (id.endsWith("-overview") || id === "pizzy-about" || id === "zanzan-context") &&
              "tracking-[-1px]"
          )}>
            {title}
          </h2>
        )}
      </div>
      {children}
    </CaseStudyRevealSection>
  );
}

function BodyText({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <div
      className="space-y-5 text-base leading-[1.6] sm:text-[17px]"
      style={{ color: theme.muted }}
    >
      {children}
    </div>
  );
}

function CaseImage({
  src,
  alt,
  ratio = "h-auto",
  fit = "contain",
  mobilePosterSrc,
}: ImageItem) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#cfd0d4] bg-white shadow-sm">
      <ImageZoom>
        <ResponsiveMotionImage
          src={src}
          alt={alt}
          width={1440}
          height={900}
          unoptimized
          mobilePosterSrc={mobilePosterSrc}
          className={cn(
            "w-full object-top",
            ratio,
            fit === "contain" ? "object-contain" : "object-cover"
          )}
          sizes="(max-width: 768px) 90vw, 934px"
        />
      </ImageZoom>
    </div>
  );
}

function ImageGrid({
  images,
  columns = "md:grid-cols-2",
}: {
  images: ImageItem[];
  columns?: string;
}) {
  return (
    <div className={cn("grid gap-6", columns)}>
      {images.map((image) => (
        <CaseImage key={image.src} {...image} />
      ))}
    </div>
  );
}

function BulletList({
  items,
  theme,
}: {
  items: React.ReactNode[];
  theme: Theme;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div
          className="border-t py-8 text-base leading-[1.6] sm:py-10"
          key={index}
          style={{ borderColor: `${theme.ink}1a`, color: theme.ink }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function NextProjectCard({
  project,
  theme,
  featured = false,
}: {
  project: CaseProject;
  theme: Theme;
  featured?: boolean;
}) {
  return (
    <Link
      href={project.href || "#"}
      className={cn(
        "group block overflow-hidden rounded-3xl border bg-white/65 transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.15fr_0.85fr] md:items-stretch"
      )}
      style={{ borderColor: `${theme.ink}1a` }}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"
        )}
        style={{ backgroundColor: "#eeeff1" }}
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
            sizes={
              featured
                ? "(max-width: 768px) 90vw, 560px"
                : "(max-width: 768px) 90vw, 440px"
            }
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-8 p-7">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: theme.muted }}
          >
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
          <p className="mt-4 text-sm leading-6" style={{ color: theme.muted }}>
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span
              className="rounded-full px-3 py-1.5 text-xs"
              key={tag}
              style={{ backgroundColor: "#eeeff1", color: theme.ink }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function NextProjectsSection({
  currentHref,
  id,
  theme,
}: {
  currentHref: string;
  id: string;
  theme: Theme;
}) {
  const nextProjects = getNextProjects(
    DATA.projects as readonly CaseProject[],
    currentHref
  );

  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-5">
        <SectionLabel theme={theme}>Next projects</SectionLabel>
        <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
          Keep exploring the work
        </h2>
      </div>

      {nextProjects[0] && (
        <NextProjectCard featured project={nextProjects[0]} theme={theme} />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {nextProjects.slice(1).map((project) => (
          <NextProjectCard
            key={project.href || project.title}
            project={project}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
}

function CaseShell({
  currentHref,
  title,
  date,
  summary,
  theme,
  sections,
  children,
  hero,
}: {
  currentHref: string;
  title: string;
  date: string;
  summary?: string;
  theme: Theme;
  sections: readonly CaseStudySection[];
  children: React.ReactNode;
  hero?: Omit<React.ComponentProps<typeof ProjectCaseStudyHero>, "id" | "colors" | "delay">;
}) {
  return (
    <main
      className="min-h-screen w-full max-w-full overflow-x-hidden font-sans"
      style={{ backgroundColor: theme.page, color: theme.ink }}
    >
      <CaseStudySectionNavigation
        heroId="legacy-project-overview"
        sections={sections}
      />
      {hero ? (
        <ProjectCaseStudyHero
          {...hero}
          colors={theme.meshColors}
          delay={PROJECT_HERO_DELAY}
          id="legacy-project-overview"
        />
      ) : (
        <CaseHero date={date} summary={summary} theme={theme} title={title} />
      )}
      <section
        className="relative z-10 mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 py-24 sm:gap-40 sm:px-8 lg:py-36"
        style={{ backgroundColor: theme.page } as React.CSSProperties}
      >
        {children}
        <NextProjectsSection
          currentHref={currentHref}
          id={sections[sections.length - 1].id}
          theme={theme}
        />
      </section>
    </main>
  );
}

export function GraphicsCaseStudy() {
  const theme = themes.graphics;

  return (
    <CaseShell
      currentHref="/blog/graphics"
      date="2023-2025"
      hero={{
        links: [{ href: "https://www.behance.net/gallery/206146695/Seller-Engagement-Design-TikTok-Shop", label: "Behance", icon: "behance" }],
        outcome: "Clearer, conversion-focused campaign and product storytelling",
        role: "Graphic Designer",
        scope: "Campaign graphics, social content, app promotion",
        status: "Done",
        title: "Marketing Graphics — Designing Campaigns That Connect",
        titleLines: ["Marketing Graphics —", "Designing Campaigns", "That Connect"],
      }}
      sections={graphicsSections}
      summary="Campaign and product visuals."
      theme={theme}
      title="Marketing Graphics"
    >
      <CaseSection id="graphics-overview" label="Overview" theme={theme} title="Overview">
        <BodyText theme={theme}>
          <p>A collection of marketing graphics for:</p>
          <p>
            1️⃣ <strong>TikTok Shop</strong> — Community & promotional visuals
            <br />
            2️⃣ <strong>Language Learning Apps</strong> — Product highlight &
            seasonal banners
          </p>
          <p>
            Focused on <CaseStudyScrollHighlight>
              clarity, conversion, and eye-catching storytelling
            </CaseStudyScrollHighlight>.
          </p>
        </BodyText>
      </CaseSection>

      <CaseSection
        id="graphics-tiktok"
        label="01"
        theme={theme}
        title="TikTok Shop — Social & Community Visuals"
      >
        <ImageGrid
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845928/Top_PLAZA_Live_Banner_wfxa4w.png",
              alt: "TikTok Shop live banner",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845944/kv_banner_dafi_zalo_oa_gdis4y.png",
              alt: "TikTok Shop Zalo OA banner",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845938/kv_gia_han_rs1j8d.png",
              alt: "TikTok Shop renewal banner",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="graphics-seasonal"
        label="Seasonal"
        theme={theme}
        title="Seasonal Campaign Assets"
      >
        <ImageGrid
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845920/tet_2_hqhp3d.png",
              alt: "Tet campaign graphic",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845920/tet_1_gxxab9.png",
              alt: "Tet campaign graphic",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845922/tet_03_yzwbio.png",
              alt: "Tet campaign graphic",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845953/02_ens8yq.jpg",
              alt: "Zalo OA campaign graphic",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="graphics-learning"
        label="02"
        theme={theme}
        title="Language Learning Apps — Promotional Visuals"
      >
        <ImageGrid
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755849/HSK_soiciu.png",
              alt: "HSK app promotional visual",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755845/android_banner-tr%C3%B9m_japanese_cyfugx.png",
              alt: "Japanese app promotional visual",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756721/Frame_2147225634_auzyip.png",
              alt: "Language app product highlight",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756718/Frame_2147225633_jn2vkl.png",
              alt: "Language app product highlight",
            },
          ]}
        />
      </CaseSection>
    </CaseShell>
  );
}

export function PizzyCaseStudy() {
  const theme = themes.pizzy;

  return (
    <CaseShell
      currentHref="/blog/pizzy"
      date="2025-08"
      hero={{
        links: [{ href: "https://www.behance.net/gallery/232892697/Pizzy-Social-Budget-Management-App-UXUI-Design?platform=direct", label: "Behance", icon: "behance" }],
        outcome: "A simple, social way to manage shared budgets with friends",
        role: "UI/UX Designer",
        scope: "UX research, mobile UI, motion, prototype",
        status: "Personal project",
        title: "Pizzy — Making Shared Spending Feel Effortless",
        titleLines: ["Pizzy —", "Making Shared Spending", "Feel Effortless"],
      }}
      sections={pizzySections}
      summary="A social budgeting app for shared spending."
      theme={theme}
      title="Pizzy"
    >
      <CaseImage
        alt="Pizzy project preview"
        fit="contain"
        mobilePosterSrc="/pizzy-mobile-poster.jpg"
        ratio="h-auto"
        src="/pizzy-mobile-poster.jpg"
      />

      {[
        [
          "About",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758327371/04_isp8w7.png",
          "pizzy-about",
        ],
        [
          "Research",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758327371/03_zyelt0.png",
          "pizzy-research",
        ],
        [
          "How Might We",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758342172/02_snxsdc.png",
          "pizzy-how-might-we",
        ],
        [
          "Information Architecture",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758332011/01_coe1qv.png",
          "pizzy-information-architecture",
        ],
        [
          "How it works",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758339821/Frame_427318364_qvmrbo.png",
          "pizzy-how-it-works",
        ],
      ].map(([title, src, id]) => (
        <CaseSection id={id} key={title} label={title} theme={theme} title={title}>
          {id === "pizzy-how-might-we" && (
            <CaseStudyStatementReveal
              className="tracking-[-1px]"
              color={theme.ink}
              text="A social budgeting app for shared spending."
            />
          )}
          <CaseImage alt={title} fit="contain" ratio="h-auto" src={src} />
        </CaseSection>
      ))}

      <CaseSection id="pizzy-showcase" label="Showcase" theme={theme} title="Showcase">
        <ImageGrid
          columns="md:grid-cols-1"
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758327371/05_bljo9e.png",
              alt: "Pizzy showcase",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758340281/shocase10_op5skr.png",
              alt: "Pizzy showcase",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758340777/shocase07_upri7m.png",
              alt: "Pizzy showcase",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758340778/shocase09_y8zqfp.png",
              alt: "Pizzy showcase",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758340237/shocase06_npq4ei.png",
              alt: "Pizzy showcase",
              fit: "contain",
              ratio: "h-auto",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="pizzy-prototype" label="Prototype" theme={theme} title="Prototype">
        <BodyText theme={theme}>
          <p>Click below to see YouTube link:</p>
        </BodyText>
        <Link
          href="https://www.youtube.com/watch?v=__zrsOT4klw"
          rel="noopener noreferrer"
          target="_blank"
        >
          <CaseImage
            alt="Pizzy Prototype"
            src="https://img.youtube.com/vi/__zrsOT4klw/maxresdefault.jpg"
          />
        </Link>
      </CaseSection>
    </CaseShell>
  );
}

export function CakeCaseStudy() {
  const theme = themes.cake;

  return (
    <CaseShell
      currentHref="/blog/cake"
      date="2025-05"
      hero={{
        outcome: "A round-up concept that makes saving effortless while keeping balances neat",
        role: "Product Designer",
        scope: "Brief analysis and product design direction",
        status: "Take-home test",
        title: "CakeBank — Making Everyday Saving Automatic",
        titleLines: ["CakeBank —", "Making Everyday Saving", "Automatic"],
      }}
      sections={cakeSections}
      summary="Round-up savings concept."
      theme={theme}
      title="CakeBank"
    >
      <CaseSection id="cake-overview" label="Overview" theme={theme} title="Overview">
        <BodyText theme={theme}>
          <p>
            <strong>CakeBank</strong> is a take-home assignment I completed
            while applying for the <strong>Product Designer</strong> position at
            Cake.
          </p>
          <p>
            Throughout the process, I aimed to design a feature as complete as
            possible — from user flow to interface — including a{" "}
            <strong>simulated usability testing</strong> phase and iterations
            based on identified issues.
          </p>
        </BodyText>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border-t pt-5" style={{ borderColor: `${theme.ink}1a` }}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: theme.muted }}>
              My role
            </p>
            <p className="mt-3 text-base leading-6">Product Designer</p>
          </div>
          <div className="border-t pt-5" style={{ borderColor: `${theme.ink}1a` }}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: theme.muted }}>
              Timeline
            </p>
            <p className="mt-3 text-base leading-6">May 2025 (3 weeks)</p>
          </div>
        </div>
        <CaseImage
          alt="CakeBank brief"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1759893150/Group_66_v0diy9.png"
        />
      </CaseSection>

      <CaseSection
        id="cake-how-might-we"
        label="How Might We"
        theme={theme}
        title=""
      >
        <CaseStudyStatementReveal
          className="tracking-[-1px]"
          color={theme.ink}
          text="How might we help users feel more satisfied and in control by making their account balance look “clean” while also encouraging effortless savings?"
        />
        <CaseImage
          alt="CakeBank how might we"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1759894994/Group_67_ur7rmg.png"
        />
      </CaseSection>

      <CaseSection
        id="cake-research"
        label="Research"
        theme={theme}
        title="Understanding the Context"
      >
        <BodyText theme={theme}>
          <p>
            Due to the limited time frame of the take-home assignment, I{" "}
            <strong>did not conduct direct user interviews</strong>, but built{" "}
            <strong>assumptions</strong> based on common behavioral finance
            insights and user feedback patterns seen in similar financial apps
            like MoMo and Timo.
          </p>
          <p>I defined two user personas based on those insights:</p>
        </BodyText>
        <BulletList
          items={[
            <>
              <strong>Budget-conscious users</strong> who want to save
              consistently but forget to transfer money manually.
            </>,
            <>
              <strong>Casual users</strong> who enjoy the sense of satisfaction
              from “tidy” balances but don’t want the process to be complicated.
            </>,
          ]}
          theme={theme}
        />
        <CaseImage
          alt="CakeBank persona"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1759896234/Group_68_wthqtn.png"
        />
      </CaseSection>

      <CaseSection id="cake-goals" label="Goals" theme={theme} title="Design Goals">
        <BulletList
          items={[
            <>
              Help users <strong><CaseStudyScrollHighlight>
                save without friction
              </CaseStudyScrollHighlight></strong> through
              automatic round-ups.
            </>,
            <>
              Give users <strong>a sense of satisfaction and control</strong> by
              keeping their account balances clean.
            </>,
            <>
              Educate first-time users on{" "}
              <strong>the long-term impact of small savings</strong> through
              engaging visuals and simple data representation.
            </>,
          ]}
          theme={theme}
        />
      </CaseSection>

      <CaseSection
        id="cake-key-screens"
        label="Key Screens"
        theme={theme}
        title="Prioritizing Auto Round-Up Across Key Screens"
      >
        <BodyText theme={theme}>
          <p>
            The <strong>Auto Round-Up</strong> feature is placed where users
            naturally interact with their money, ensuring visibility without
            adding friction.
          </p>
        </BodyText>
        <BulletList
          items={[
            <>
              <strong>Home Screen</strong> – Highlights total savings from
              round-ups to keep motivation visible every day.
            </>,
            <>
              <strong>Transaction Screen</strong> – Suggests enabling round-up
              right after a purchase or transfer, reinforcing the “save while
              spending” habit.
            </>,
            <>
              <strong>Account Balance Screen</strong> – Displays how round-ups
              contribute to the total balance, building awareness of incremental
              growth.
            </>,
            <>
              <strong>Savings Account Settings</strong> – Allows users to
              customize increments (₫10K / ₫50K / ₫100K) or pause the feature
              easily.
            </>,
            <>
              <strong>Savings Detail View</strong> – Shows how each round-up
              contributes to goals, turning abstract savings into tangible
              progress.
            </>,
          ]}
          theme={theme}
        />
        <BodyText theme={theme}>
          <p>
            By distributing touchpoints this way, the experience keeps saving
            top-of-mind but never intrusive — helping users form a lasting
            saving habit through repetition and context.
          </p>
        </BodyText>
      </CaseSection>

      <CaseSection id="cake-user-flow" label="User Flow" theme={theme} title="User Flow">
        <BodyText theme={theme}>
          <p>The flow focuses on minimal friction and high clarity:</p>
        </BodyText>
        <BulletList
          items={[
            <>
              <strong>Onboarding</strong> → Users learn about the feature
              through a short, visual explanation.
            </>,
            <>
              <strong>Setup</strong> → Choose saving preferences and enable
              round-ups.
            </>,
            <>
              <strong>Transaction Simulation</strong> → See how small round-ups
              are saved automatically.
            </>,
            <>
              <strong>Dashboard Overview</strong> → Track accumulated savings
              and progress over time.
            </>,
          ]}
          theme={theme}
        />
        <CaseImage
          alt="CakeBank flow"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1759907168/Group_633000_gacby2.png"
        />
        <Link
          className="w-fit font-medium underline underline-offset-4"
          href="https://miro.com/app/board/uXjVLiYCL6w=/?share_link_id=229788749621"
          rel="noopener noreferrer"
          target="_blank"
        >
          View Miro Flow
        </Link>
      </CaseSection>

      <CaseSection
        id="cake-visual-design"
        label="Visual Design"
        theme={theme}
        title="Visual Design"
      >
        <BodyText theme={theme}>
          <p>
            The interface uses Cake’s signature playful tone, with rounded
            shapes and warm gradients that convey positivity and approachability.
          </p>
          <p>
            Visual elements were designed to make saving feel light and
            effortless, not financial or restrictive.
          </p>
        </BodyText>
        <ImageGrid
          columns="md:grid-cols-1"
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1759909271/Group_633001_u69vfd.png",
              alt: "CakeBank visual design",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1759910918/M%E1%BB%9F_t%C3%A0i_kho%E1%BA%A3n_ti%E1%BB%81n_g%E1%BB%ADi_m%E1%BB%9Bi_onboarding_xjrrzw.png",
              alt: "Enabling Round-up from Savings - Onboarding Screen",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1759910917/Chi_ti%E1%BA%BFt_t%C3%A0i_kho%E1%BA%A3n_ti%E1%BB%81n_g%E1%BB%ADi_p4qb8l.png",
              alt: "Enabling Round-up from Savings - Details Screen",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1759911014/T%E1%BB%B1_nh%E1%BA%ADp_s%E1%BB%91_giao_d%E1%BB%8Bch_Qu%C3%A9t_m%C3%A3_QR_j0mkgt.png",
              alt: "Enabling Round-up from Balance Screen",
              fit: "contain",
              ratio: "h-auto",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="cake-testing"
        label="Usability Testing"
        theme={theme}
        title="Usability Testing"
      >
        <BodyText theme={theme}>
          <p>
            Since this was a solo assignment, I conducted a{" "}
            <strong>simulated post-launch usability test</strong> to identify
            potential issues with user comprehension and flow.
          </p>
        </BodyText>
        <CaseImage
          alt="CakeBank usability testing"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1759910917/Group_633002_aszgse.png"
        />
        <BulletList
          items={[
            <>
              <strong>Issue #1 — Confusion about how round-ups work</strong>
              <br />
              Users didn’t immediately understand where the saved amount goes.
              <br />
              → Added a short visual walkthrough and a progress indicator showing
              how the rounded amount is transferred to savings.
              <br />
              ✅ Result: 100% task completion rate.
            </>,
            <>
              <strong>Issue #2 — Dashboard lacked clear feedback</strong>
              <br />
              Participants wanted to see “impact” immediately.
              <br />
              → Introduced micro-animations and color-coded growth indicators to
              show incremental progress.
              <br />
              ✅ Result: Reduced dashboard exit rate simulation by ~40%.
            </>,
          ]}
          theme={theme}
        />
      </CaseSection>

      <CaseSection id="cake-results" label="Results" theme={theme} title="Results">
        <BodyText theme={theme}>
          <p>
            Even though this was a conceptual assignment, it helped me
            strengthen my <strong>end-to-end product thinking</strong> — from
            understanding the psychological motivation behind saving, to
            designing a flow that feels human and rewarding.
          </p>
        </BodyText>
        <BulletList
          items={[
            <>
              Increased <strong>feature comprehension</strong> (100% completion
              in simulated test).
            </>,
            <>
              Improved <strong>dashboard clarity</strong> through visual
              feedback.
            </>,
            <>
              Delivered a <strong>full user flow and interface prototype</strong>{" "}
              that could be further developed for Cake’s real product ecosystem.
            </>,
          ]}
          theme={theme}
        />
      </CaseSection>

      <CaseSection
        id="cake-reflection"
        label="Reflection"
        theme={theme}
        title="Reflection"
      >
        <BodyText theme={theme}>
          <p>
            This challenge taught me how small design decisions — like rounding
            up numbers — can connect deeply with users’ emotions and behavior.
          </p>
          <p>
            It also reinforced my belief that{" "}
            <strong>
              <CaseStudyScrollHighlight>
                good design is not about adding features, but about removing
                friction and inspiring action
              </CaseStudyScrollHighlight>
            </strong>
            .
          </p>
        </BodyText>
      </CaseSection>
    </CaseShell>
  );
}

export function ZanZanCaseStudy() {
  const theme = themes.zanzan;

  return (
    <CaseShell
      currentHref="/blog/lollypop"
      date="2024-09-20"
      sections={zanzanSections}
      summary="A digital platform for Vietnamese folk games."
      theme={theme}
      title="ZanZan"
    >
      <CaseImage
        alt="ZanZan intro"
        fit="contain"
        ratio="h-auto"
        src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1758358132/1ZaN0fd1UHesnkGpQ5TxYCoJbo_v9qdeo.avif"
      />

      <CaseSection id="zanzan-context" label="Context" theme={theme} title="Context">
        <BodyText theme={theme}>
          <p>
            Vietnam’s traditional culture faces the risk of fading due to
            globalization, modern entertainment, and declining youth interest. At
            the same time, folk games still hold strong nostalgic and social
            value, attracting young people when presented in engaging ways. This
            creates both an urgent need and opportunity to{" "}
            <CaseStudyScrollHighlight>
              preserve and reimagine folk games through digital innovation
            </CaseStudyScrollHighlight>.
          </p>
        </BodyText>
      </CaseSection>

      <CaseSection
        id="zanzan-problem"
        label="Problem"
        theme={theme}
        title="Problem Statement"
      >
        <BodyText theme={theme}>
          <p>
            Young people today are drawn to digital-first, interactive, and
            social experiences. Traditional folk games, while culturally
            valuable, risk being forgotten if they remain offline-only and
            disconnected from modern life.
          </p>
          <p>
            Design Challenge: Build a solution that both{" "}
            <CaseStudyScrollHighlight>
              preserves and revitalizes folk games
            </CaseStudyScrollHighlight>, making them accessible, engaging, and
            meaningful in today’s digital ecosystem.
          </p>
        </BodyText>
        <CaseImage
          alt="ZanZan problem statement"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1758358133/4kp9lfzm6Rm3uYd1eMX0hVlcEyU_qa9kfz.webp"
        />
      </CaseSection>

      <CaseSection id="zanzan-research" label="Research" theme={theme} title="Research">
        <BodyText theme={theme}>
          <p>We conducted desk research and user surveys to validate needs:</p>
        </BodyText>
        <BulletList
          items={[
            "Social Value: 97.4% of respondents agreed folk games create strong community bonds.",
            "Digital Willingness: 97.4% were open to learning folk games online.",
            "High Interest: 67.1% were highly enthusiastic about folk games.",
            "Strong Preservation Motivation: 98.7% wanted to pass folk games to future generations.",
            "Platform Demand: 65.8% expressed interest in a dedicated website/platform for folk games.",
          ]}
          theme={theme}
        />
      </CaseSection>

      <CaseSection
        id="zanzan-persona"
        label="Persona"
        theme={theme}
        title="User Persona & Journey"
      >
        <BodyText theme={theme}>
          <p>
            <strong>Persona:</strong>
          </p>
        </BodyText>
        <BulletList
          items={[
            "Primary: Gen Z (18–28), mainly students and young professionals, often experience folk games at school events, orientation weeks, or company team-building, where the games provide fun, bonding, and a link to tradition.",
            "Secondary: Educators & parents, who seek educational resources and cultural preservation tools.",
          ]}
          theme={theme}
        />
        <BodyText theme={theme}>
          <p>
            <strong>Journey:</strong>
            <br />
            Discovery → Learn rules/history → Try out via digital/interactive
            tools → Share & play socially → Build connection to cultural
            identity.
          </p>
        </BodyText>
      </CaseSection>

      <CaseSection id="zanzan-ideation" label="Ideation" theme={theme} title="Ideation">
        <BodyText theme={theme}>
          <p>
            We generated ideas using “How Might We” questions and prioritized
            via an Impact/Effort Matrix. Key design directions:
          </p>
        </BodyText>
        <BulletList
          items={[
            "Platform as a living archive of folk games.",
            "Interactive, playful, and visual-first to attract youth.",
            "Community-oriented, encouraging sharing and participation.",
            "Scalable features for gamification, AR/VR, and education.",
          ]}
          theme={theme}
        />
        <CaseImage
          alt="ZanZan how might we"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1758358133/4kp9lfzm6Rm3uYd1eMX0hVlcEyU_qa9kfz.webp"
        />
      </CaseSection>

      <CaseSection
        id="zanzan-solution"
        label="Solution"
        theme={theme}
        title="Solution: Zân Zan Platform"
      >
        <BodyText theme={theme}>
          <p>
            Designed a digital platform dedicated to Vietnamese folk games. Core
            features:
          </p>
        </BodyText>
        <BulletList
          items={[
            "Game Library: Browse and learn rules of folk games, categorized by type.",
            "Filter & Search: Quickly find games by region, age group, or type.",
            "Cultural Stories: Context and history of each game for awareness.",
            "Interactive Showcase: Visuals, videos, and prototype interactions.",
            "Community Connection: Encourage users to share experiences.",
          ]}
          theme={theme}
        />
        <ImageGrid
          columns="md:grid-cols-1"
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758358133/Ty3w3dbemYK9iAryPI3diN07o_zzjlrc.webp",
              alt: "ZanZan solution screen",
              fit: "contain",
              ratio: "h-auto",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758358133/HgZgPI0cxFtWtliY7U0k9azu3M_pbv6oc.webp",
              alt: "ZanZan solution screen",
              fit: "contain",
              ratio: "h-auto",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="zanzan-design-system"
        label="Design System"
        theme={theme}
        title="Design System"
      >
        <BulletList
          items={[
            <>
              <strong>Logo:</strong> Combination of the name “Zân Zan” + dragon
              motif, symbolizing cultural roots.
            </>,
            <>
              <strong>Typography:</strong> Bricolage Grotesque, playful but
              modern.
            </>,
            <>
              <strong>Color Palette:</strong> Vibrant pink (#E3019B) and deep
              navy (#0E0E5C) to balance tradition with energy.
            </>,
          ]}
          theme={theme}
        />
      </CaseSection>

      <CaseSection
        id="zanzan-prototype"
        label="Prototype"
        theme={theme}
        title="UI Design & Prototype"
      >
        <Link
          className="w-fit font-medium underline underline-offset-4"
          href="https://www.figma.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          View Prototype
        </Link>
      </CaseSection>
    </CaseShell>
  );
}
