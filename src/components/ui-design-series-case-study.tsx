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
  accent: "#ff6313",
  dark: "#21120a",
  hero:
    "radial-gradient(circle at 18% 18%, #ff6313 0%, transparent 30%), radial-gradient(circle at 82% 24%, #ebdfaf 0%, transparent 30%), linear-gradient(135deg, #21120a 0%, #ff6313 52%, #ebdfaf 100%)",
};

const sections = [
  { id: "series-context", label: "Series overview" },
  { id: "series-brief", label: "Competition brief" },
  { id: "series-process", label: "Design process" },
  { id: "series-picks", label: "Top picks" },
  { id: "series-next", label: "Next projects" },
  { id: "series-contact", label: "Get in touch" },
];

const assets = {
  hero: "/uidesignseries-mobile-poster.jpg",
  direction: "/298bd9ed-f325-48c0-aaf8-e76058112339_o7fhaf.png",
  draft: "/DRAFTTT_wwrvbt.png",
  week1: "/1IEUZ7Fhxsal69TkPP3bhjHfljw_e3c6vh.avif",
  week3: "/lQmZQzSQd5utD8yFPXQpABes44_wse6b2.webp",
  week6: "/KYrmwAQJkJwCYdd5x620BTxlGgo_p08hi9.webp",
};

const assetDimensions: Record<string, [number, number]> = {
  [assets.hero]: [400, 225],
  [assets.direction]: [1500, 1000],
  [assets.draft]: [2500, 1667],
  [assets.week1]: [2048, 1536],
  [assets.week3]: [2048, 1455],
  [assets.week6]: [2048, 1365],
};

const gains = [
  "Learned from industry pros.",
  "Built my own Framer library.",
  "Made it to the Top 6 finalists.",
];

const processSteps = [
  {
    title: "Brief Analysis",
    body: "I start by carefully analyzing the challenge prompt to understand the expected output, constraints, and user needs.",
  },
  {
    title: "Direction Setting",
    body: "Next, I define the overall art direction — including layout structure, font pairing, color palette, and shape language that best fit the concept.",
  },
  {
    title: "Drafting Hero Section & Layout",
    body: "I sketch out the layout and begin designing the hero section to establish the tone and hierarchy for the rest of the page.",
  },
  {
    title: "Final Design & Prototyping using Figma and Framer",
    body: "Once the layout is locked in, I polish the visuals and bring everything to life with interactive prototyping in Framer and Figma.",
  },
];

const topPicks = [
  {
    title: "Week 1: Camera Landing Page",
    href: "https://lomomatic-110-camera.framer.website",
    image: assets.week1,
  },
  {
    title: 'Week 3: Culture Theme – "Phỗng"',
    href: "https://phong-dat.framer.website",
    image: assets.week3,
  },
  {
    title: "Week 6: Previous version of this portfolio",
    href: "https://thuy-portfolio.framer.website",
    image: assets.week6,
  },
];

const nextProjects = getNextProjects(
  DATA.projects as readonly CaseProject[],
  "/blog/chande"
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
          mobilePosterSrc={src === assets.hero ? "/uidesignseries-mobile-poster.jpg" : undefined}
          unoptimized
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 90vw, 934px"
        />
      </ImageZoom>
    </div>
  );
}

function SeriesStickyIndicator() {
  return (
    <CaseStudySectionNavigation heroId="series-overview" sections={sections} />
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
          "relative overflow-hidden bg-[#fff1dc]",
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

export function UiDesignSeriesCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f7f8] font-sans text-[#08090a]">
      <SeriesStickyIndicator />

      <ProjectCaseStudyHero
        summaryLines={["Six weeks. Six landing-page briefs.", "Exploring visual design and motion,", "with a reusable Framer library."]}
        backgroundSrc="/assets/project-thumbnails/ui-design-series.png"
        summary={<>
          Mingg UI Design Challenge was a 6-week UI design competition where
              participants created <CaseStudyScrollHighlight>
                one landing page per week
              </CaseStudyScrollHighlight>{" "}
              based on a given brief.
        </>}
        colors={projectMeshPalettes.series}
        delay={PROJECT_HERO_DELAY}
        id="series-overview"
        links={[{ href: "https://www.behance.net/thuynguyen175", label: "Behance", icon: "behance" }]}
        outcome="Top 6 finalist with a reusable Framer library and six weekly landing-page concepts"
        role="UI Designer"
        scope="Six weekly briefs, web design, motion, prototype"
        status="Done"
        title="Mingg Challenge — One Landing Page a Week"
        titleLines={["Mingg Challenge —", "One Landing Page a Week"]}
      />

      <section className="relative z-10 mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 pb-24 pt-[120px] sm:gap-40 sm:px-8 lg:pb-36">
        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="series-context">


          <CaseStudyStatementReveal className="tracking-[-1px]" text="One landing page per week, shaped by a different brief." />

          <CaseImage src={assets.hero} alt="UI Design Series final prototype preview" />

          <div className="grid gap-6 sm:grid-cols-3">
            {gains.map((item) => (
              <div className="border-t border-[#21120a]/10 pt-5" key={item}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">What I gained</p>
                <p className="mt-3 text-base leading-[1.6] text-[#08090a]">{item}</p>
              </div>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="max-w-[860px] scroll-mt-24" id="series-brief">
          <p className="text-base italic leading-[1.8] text-[#62666b] sm:text-[17px]">
            For one week of the Mingg UI Design Challenge, the competition brief
            was to design a fundraising-ready landing page for a pre-MVP AI
            design partner, under the theme “Design faster, think smarter with an
            AI design partner.” The proposed product would turn a written prompt
            into editable UI layouts and copy, support real-time iteration, and
            export designs to Figma or HTML/CSS/React. The brief described a
            journey from writing a prompt and generating a layout to customizing
            the design and exporting it. My task was to communicate this concept
            through a friendly visual identity, clear messaging, and a strong
            first impression.
          </p>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="series-process">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1 text-sm text-white">
              Design Process
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              My Design Process during Chande
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {processSteps.map((item, index) => (
              <article className="border-t border-[#21120a]/10 pt-6" key={item.title}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#08090a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-[var(--font-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-[1.6] text-[#08090a]">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.direction} alt="UI Design Series direction setting" />
            <CaseImage src={assets.draft} alt="UI Design Series draft hero and layout" />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-16 sm:gap-20" id="series-picks">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1 text-sm text-white">
              Top Picks
            </span>
            <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">
              Top Picks from the Challenge
            </h2>
            <p className="max-w-[720px] text-base leading-[1.6] text-[#737373] sm:text-[17px]">
              Please check the screen size note — there was limited time for full responsiveness.
            </p>
          </div>

          <div className="grid gap-6">
            {topPicks.map((item) => (
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-t border-[#21120a]/10 pt-6 transition duration-300 hover:-translate-y-1"
                key={item.href}
              >
                <div className="overflow-hidden rounded-xl border border-[#cfd0d4] shadow-sm">
                  <ImageZoom>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={assetDimensions[item.image]?.[0] ?? 1440}
                      height={assetDimensions[item.image]?.[1] ?? 810}
                      unoptimized
                      className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 90vw, 934px"
                    />
                  </ImageZoom>
                </div>
                <h3 className="mt-5 font-[var(--font-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="series-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1 text-sm text-white">
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

      <section id="series-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#21120a] px-3 py-1 text-sm text-white">
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
