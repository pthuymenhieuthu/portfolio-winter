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
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { HeroBlobMotion } from "@/components/hero-blob-motion";

const PROJECT_HERO_DELAY = 0.36;

type CaseProject = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
};

const theme = {
  page: "#f7f7f8",
  accent: "#23c55e",
  dark: "#092014",
  hero:
    "radial-gradient(circle at 18% 18%, #12CD83 0%, transparent 30%), radial-gradient(circle at 82% 24%, #BCECDB 0%, transparent 30%), linear-gradient(135deg, #092014 0%, #12CD83 42%, #15D590 100%)",
};

const sections = [
  { id: "edtech-work", label: "Overview" },
  { id: "edtech-motion", label: "Motion showcase" },
  { id: "edtech-speak", label: "Speak Chinese UI showcase" },
  { id: "edtech-graphics", label: "App Store graphics" },
  { id: "edtech-tools", label: "Tools" },
  { id: "edtech-next", label: "Next projects" },
  { id: "edtech-contact", label: "Get in touch" },
];

const assets = {
  hero: "/speakchinese-mobile-poster.jpg",
  leftRight: "https://res.cloudinary.com/dqtfjvkok/image/upload/f_webp,q_auto,w_1200,pg_1/v1764752790/Copy_of_Phone_shocase_e6nh4i.webp",
  speakChinese: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764754172/speak_chinese_z1dzwv.png",
  sensei: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755845/android_banner-tr%C3%B9m_japanese_cyfugx.png",
  hsk: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755849/HSK_soiciu.png",
  androidBanner: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755833/android_banner_xge5vi.png",
  graphics1: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756718/Frame_2147225633_jn2vkl.png",
  graphics2: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756721/Frame_2147225634_auzyip.png",
};

const assetDimensions: Record<string, [number, number]> = {
  [assets.hero]: [1920, 1080],
  [assets.leftRight]: [1920, 1080],
  [assets.speakChinese]: [4167, 2326],
  [assets.sensei]: [4167, 2035],
  [assets.hsk]: [5501, 2686],
  [assets.androidBanner]: [5486, 2679],
  [assets.graphics1]: [5736, 3118],
  [assets.graphics2]: [8825, 3072],
};

const appLinks = [
  {
    label: "Speak Chinese - Learn Mandarin",
    href: "https://apps.apple.com/app/id6468914724",
  },
  {
    label: "HSK Vocab - Chinese Flashcards",
    href: "https://apps.apple.com/app/id6744602011",
  },
  {
    label: "Sensei - Learn Japanese JLPT",
    href: "https://apps.apple.com/app/id6467135284",
  },
];

const motionPoints = [
  "Built using Rive + After Effects",
  "Integrated data binding linked to learning states",
  "Concept: learners continuously level up as they practice",
  "Users can hold left/right to move the mascot interactively",
];

const graphicsPoints = [
  "App Store UI preview screenshots — highlight the main learning experience",
  "Feature banners — communicate key outcomes (speak, memorize faster, track progress)",
];

const nextProjects = getNextProjects(
  DATA.projects as readonly CaseProject[],
  "/blog/edtechapp"
);

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
          mobilePosterSrc={src === assets.hero ? "/speakchinese-mobile-poster.jpg" : undefined}
          unoptimized
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 90vw, 934px"
        />
      </ImageZoom>
    </div>
  );
}

function EdTechStickyIndicator() {
  return (
    <CaseStudySectionNavigation heroId="edtech-overview" sections={sections} />
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
          "relative overflow-hidden bg-[#eafbe7]",
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

export function EdTechCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f7f8] font-sans text-[#08090a]">
      <EdTechStickyIndicator />

      <section
        id="edtech-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[#092014] px-6 text-center text-white sm:min-h-[800px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,#12CD83_0%,transparent_30%),radial-gradient(circle_at_82%_24%,#BCECDB_0%,transparent_30%),linear-gradient(135deg,#092014_0%,#12CD83_42%,#15D590_100%)] opacity-50" />
        <HeroBlobMotion className="pointer-events-none absolute left-[calc(50%-30px)] top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none" position="top">
          <Image src="/assets/edtech/edtech-hero-blob-top.svg" alt="" width={1440} height={422} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <HeroBlobMotion className="pointer-events-none absolute bottom-[-120px] left-1/2 -z-10 w-[max(1320px,110vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-150px]" position="bottom">
          <Image src="/assets/edtech/edtech-hero-blob-bottom.svg" alt="" width={1440} height={526} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            Mobile App · Feb 2025
          </p>
          <HeroTitleReveal
            className="mt-7 max-w-[860px] font-[var(--font-heading)] text-[clamp(36px,9.8vw,64px)] font-medium leading-[1.05] tracking-normal"
            delay={PROJECT_HERO_DELAY}
            text="Language Learning Apps"
          />
          <BlurFade delay={1.12}>
            <p className="mx-auto mt-7 max-w-[570px] text-base leading-[1.55] text-white sm:text-lg">
              UI Enhancement Showcase
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 py-24 sm:gap-40 sm:px-8 lg:py-36">
        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="edtech-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1 text-sm text-white">
              Overview
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[30px] font-normal leading-[1.2] tracking-normal sm:text-[40px]">
              UI improvements for Chinese and Japanese learning apps
            </h2>
            <p className="text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              This showcase focuses on <CaseStudyScrollHighlight>
                clarity, motivation, and friendly interaction
              </CaseStudyScrollHighlight>{" "}
              for language learning apps that are publicly available
              on the App Store and used by global learners every day.
            </p>
          </div>

          <CaseStudyStatementReveal text="Clarity, motivation, and friendly interaction for language learning apps used by global learners every day." />

          <CaseImage src={assets.hero} alt="Speak Chinese splash and mascot motion" />

          <div className="grid gap-4">
            {appLinks.map((app) => (
              <Link
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-t border-[#092014]/10 py-4 text-base font-medium text-[#092014] transition hover:text-[#16a34a]"
                key={app.href}
              >
                {app.label}
              </Link>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="edtech-motion">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1 text-sm text-white">
              Motion Showcase
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Motion isn&apos;t just for delight — it motivates progress and supports learning
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Splash &amp; Mascot Motion. The level-up concept helps learners feel
              that they <CaseStudyScrollHighlight>continuously level up as they practice</CaseStudyScrollHighlight>,
              improving engagement and time-on-task.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.hero} alt="Splash and mascot motion" />
            <CaseImage src={assets.leftRight} alt="Interactive left and right mascot motion" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {motionPoints.map((item, index) => (
              <article className="border-t border-[#092014]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#08090a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="edtech-speak">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1 text-sm text-white">
              UI Showcase
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Speak Chinese - Learn Mandarin
            </h2>
          </div>

          <CaseImage src={assets.speakChinese} alt="Speak Chinese app UI screens" />
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1 text-sm text-white">
              UI Showcase
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Sensei - Learn Japanese JLPT
            </h2>
          </div>
          <CaseImage src={assets.sensei} alt="Sensei Japanese learning app UI screens" />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="edtech-graphics">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1 text-sm text-white">
              App Store Graphics
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Promotional visuals designed to improve conversion and clarify product value
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {graphicsPoints.map((item) => (
              <article className="border-t border-[#092014]/10 pt-6" key={item}>
                <p className="text-base leading-[1.6] text-[#08090a]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.hsk} alt="HSK app store graphics" />
            <CaseImage src={assets.androidBanner} alt="Language app feature banner" />
            <CaseImage src={assets.graphics1} alt="App store promotional graphic" />
            <CaseImage src={assets.graphics2} alt="App store promotional graphic" />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="edtech-tools">
          <div className="rounded-xl bg-[#092014] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd360]">
              Tools
            </p>
            <h2 className="mt-5 font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Figma, Rive, and After Effects
            </h2>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="edtech-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1 text-sm text-white">
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

      <section id="edtech-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#092014] px-3 py-1 text-sm text-white">
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
