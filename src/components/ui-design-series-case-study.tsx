"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

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
  page: "#fff8ec",
  accent: "#ff6313",
  dark: "#21120a",
  hero:
    "radial-gradient(circle at 18% 18%, #ff6313 0%, transparent 30%), radial-gradient(circle at 82% 24%, #ebdfaf 0%, transparent 30%), linear-gradient(135deg, #21120a 0%, #ff6313 52%, #ebdfaf 100%)",
};

const sections = [
  { id: "series-overview", label: "Interface Design Series" },
  { id: "series-context", label: "Series overview" },
  { id: "series-brief", label: "Week 4 brief" },
  { id: "series-process", label: "Design process" },
  { id: "series-picks", label: "Top picks" },
  { id: "series-next", label: "Next projects" },
  { id: "series-contact", label: "Get in touch" },
];

const assets = {
  hero: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758519116/Untitled_design_34_ooq2kc.gif",
  direction: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758356378/298bd9ed-f325-48c0-aaf8-e76058112339_o7fhaf.png",
  draft: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758356379/DRAFTTT_wwrvbt.png",
  week1: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758357035/1IEUZ7Fhxsal69TkPP3bhjHfljw_e3c6vh.avif",
  week3: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758357034/lQmZQzSQd5utD8yFPXQpABes44_wse6b2.webp",
  week6: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758357034/KYrmwAQJkJwCYdd5x620BTxlGgo_p08hi9.webp",
};

const gains = [
  "Learned from industry pros.",
  "Built my own Framer library.",
  "Made it to the Top 6 finalists.",
];

const briefFeatures = [
  "Prompt to UI",
  "Smart copy, built-in",
  "Export to Figma",
  "Export to Code",
  "Real-time iteration",
];

const processSteps = [
  {
    title: "Brief Analysis",
    body: "I started by carefully analyzing the prompt to understand the expected output, constraints, and user needs.",
  },
  {
    title: "Direction Setting",
    body: "I defined the art direction, including layout structure, font pairing, color palette, and shape language.",
  },
  {
    title: "Drafting Hero Section & Layout",
    body: "I sketched the layout and designed the hero section first to establish tone and hierarchy.",
  },
  {
    title: "Final Design & Prototyping",
    body: "Once the layout was locked, I polished the visuals and brought the page to life with Framer and Figma.",
  },
];

const topPicks = [
  {
    title: "Week 1: Camera Landing Page",
    href: "https://lomomatic-110-camera.framer.website",
    image: assets.week1,
  },
  {
    title: 'Week 3: Culture Theme - "Phong"',
    href: "https://phong-dat.framer.website",
    image: assets.week3,
  },
  {
    title: "Week 6: Previous version of this portfolio",
    href: "https://thuy-portfolio.framer.website",
    image: assets.week6,
  },
];

const nextProjects = ["CakeBank", "Marketing Graphics", "Speak Chinese"]
  .map((name) =>
    (DATA.projects as readonly CaseProject[]).find((project) =>
      project.title.toLowerCase().includes(name.toLowerCase())
    )
  )
  .filter((project): project is CaseProject => Boolean(project));

function CaseImage({
  src,
  alt,
  ratio = "aspect-[16/9]",
}: {
  src: string;
  alt: string;
  ratio?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-sm">
      <ImageZoom>
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={810}
          unoptimized
          className={cn("w-full rounded-2xl object-cover object-top", ratio)}
          sizes="(max-width: 768px) 90vw, 934px"
        />
      </ImageZoom>
    </div>
  );
}

function SeriesStickyIndicator() {
  const [activeLabel, setActiveLabel] = useState(sections[0].label);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("series-overview");

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
          "pointer-events-auto flex h-8 w-full items-center justify-center rounded-b-[999px] bg-[#21120a] px-4 text-[13px] tracking-normal text-[#fff8ec] transition-transform duration-500 ease-out sm:text-sm",
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
          "relative overflow-hidden bg-[#fff1dc]",
          featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"
        )}
      >
        {(project.video || project.image) && (
          <Image
            src={project.video || project.image || ""}
            alt={project.title}
            width={1200}
            height={675}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            unoptimized
            sizes={featured ? "(max-width: 768px) 90vw, 560px" : "(max-width: 768px) 90vw, 440px"}
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-10 p-7 sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#ff6313]">
            {featured ? "Next project" : project.dates}
          </p>
          <h3
            className={cn(
              "mt-3 font-[var(--font-heading)] font-bold leading-[1.18] tracking-normal",
              featured ? "text-3xl sm:text-4xl" : "text-2xl"
            )}
          >
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-[#78645b]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span className="rounded-full bg-[#fff8ec] px-3 py-1.5 text-xs text-[#4b2e1f]" key={tag}>
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
    <main className="min-h-screen font-sans text-[#21120a]" style={{ backgroundColor: theme.page }}>
      <SeriesStickyIndicator />

      <section
        id="series-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_18%,#ff6313_0%,transparent_30%),radial-gradient(circle_at_82%_24%,#ebdfaf_0%,transparent_30%),linear-gradient(135deg,#21120a_0%,#ff6313_52%,#ebdfaf_100%)] px-6 text-center text-white sm:min-h-[800px]"
      >
        <Image
          src="/assets/ui-design-series/series-hero-blob-top.svg"
          alt=""
          width={1440}
          height={422}
          priority
          className="pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:w-[1640px]"
        />
        <Image
          src="/assets/ui-design-series/series-hero-blob-bottom.svg"
          alt=""
          width={1440}
          height={702}
          priority
          className="pointer-events-none absolute bottom-[-220px] left-1/2 -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:bottom-[-260px] sm:w-[1640px]"
        />

        <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center gap-5">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            Web Design · Jul 2025
          </p>
          <h1 className="font-[var(--font-heading)] text-[48px] font-bold leading-[1.05] tracking-normal sm:text-[64px]">
            UI Design Series
          </h1>
          <p className="text-base leading-[1.35] text-white">
            6-week landing page competition
            <br />
            <span className="text-white/75">
              · Weekly briefs, Framer prototypes, and Top 6 finalist work
            </span>
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-28 px-5 py-24 before:absolute before:inset-x-[-50vw] before:inset-y-0 before:-z-10 before:bg-[#fff8ec] sm:gap-32 sm:px-8 lg:gap-36 lg:py-36">
        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="series-context">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1.5 text-sm text-white">
              Interface Design Series
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[34px] font-bold leading-[1.28] tracking-normal sm:text-5xl sm:leading-[1.24]">
              Six weekly landing pages from brief to interactive prototype
            </h2>
            <p className="text-lg leading-8 text-[#78645b] sm:text-xl sm:leading-[1.6]">
              Mingg UI Design Challenge was a 6-week UI design competition where
              participants created one landing page per week based on a given
              brief.
            </p>
          </div>

          <CaseImage src={assets.hero} alt="UI Design Series final prototype preview" />

          <div className="grid gap-6 sm:grid-cols-3">
            {gains.map((item) => (
              <div className="border-t border-[#21120a]/10 pt-5" key={item}>
                <p className="text-sm uppercase tracking-[0.12em] text-[#ff6313]">What I gained</p>
                <p className="mt-3 text-base leading-6 text-[#21120a]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="series-brief">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1.5 text-sm text-white">
              Week 4 Brief
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Design faster, think smarter with an AI design partner
            </h2>
            <p className="max-w-[720px] text-lg leading-8 text-[#78645b]">
              The brief asked for a website that could show off an early product
              idea, support fundraising, attract community attention, and improve
              content, fonts, colors, and first-glance wow factor.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {briefFeatures.map((item, index) => (
              <article className="border-t border-[#21120a]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#ff6313]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-[var(--font-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="series-process">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1.5 text-sm text-white">
              Design Process
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              From brief analysis to Framer prototype
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {processSteps.map((item, index) => (
              <article className="border-t border-[#21120a]/10 pt-6" key={item.title}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#ff6313]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-[var(--font-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#4b2e1f]">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.direction} alt="UI Design Series direction setting" ratio="aspect-[4/3]" />
            <CaseImage src={assets.draft} alt="UI Design Series draft hero and layout" ratio="aspect-[4/3]" />
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="series-picks">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1.5 text-sm text-white">
              Top Picks
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Selected landing pages from the series
            </h2>
            <p className="max-w-[720px] text-lg leading-8 text-[#78645b]">
              These are selected screens from the weekly challenge. Some were
              optimized for specific desktop widths due to the competition
              timeline.
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
                <div className="overflow-hidden rounded-2xl shadow-sm">
                  <ImageZoom>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1440}
                      height={810}
                      unoptimized
                      className="aspect-[16/9] w-full rounded-2xl object-cover object-top transition duration-500 group-hover:scale-[1.03]"
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
        </section>

        <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="series-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#21120a] px-3 py-1.5 text-sm text-white">
              Next projects
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Keep exploring the work
            </h2>
          </div>

          {nextProjects[0] && <NextProjectCard project={nextProjects[0]} featured />}

          <div className="grid gap-6 md:grid-cols-2">
            {nextProjects.slice(1).map((project) => (
              <NextProjectCard project={project} key={project.href || project.title} />
            ))}
          </div>
        </section>
      </section>

      <section id="series-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[420px] w-[1200px] max-w-none -translate-x-1/2 rounded-[100%] bg-white/80" />
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#21120a] px-3 py-1.5 text-sm text-white">
            Contact
          </span>
          <h2 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-[1.18] tracking-normal">
            Get in Touch
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#78645b]">
            Excited to collaborate! Email me at{" "}
            <a className="text-[#ff6313]" href="mailto:phuongthuy101222@gmail.com">
              phuongthuy101222@gmail.com
            </a>{" "}
            or DM me on{" "}
            <a className="text-[#ff6313]" href={DATA.contact.social.LinkedIn.url}>
              Linkedin
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
