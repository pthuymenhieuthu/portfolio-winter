"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

const theme = {
  page: "#f3f7ff",
  ink: "#07111f",
  muted: "#64748b",
  accent: "#15CABE",
  accent2: "#B0F1ED",
  dark: "#07111f",
};

const sections = [
  { id: "zoan-overview", label: "Designing the interface for an AI platform" },
  { id: "zoan-work", label: "The work" },
  { id: "zoan-challenge-01", label: "Challenge 01: Rebuilding product foundations" },
  { id: "zoan-challenge-02", label: "Challenge 02: Cross-platform workflow design" },
  { id: "zoan-motion", label: "Challenge 03: Motion and micro-interactions" },
  { id: "zoan-outcome", label: "Outcome" },
  { id: "zoan-next", label: "Next projects" },
  { id: "zoan-contact", label: "Get in touch" },
];

const zoanAssets = {
  hero: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1787913142/zoan_1_t2snqa.gif",
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
  ratio = "aspect-[16/9]",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl shadow-sm", className)}>
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

function ZoanStickyIndicator() {
  const [activeLabel, setActiveLabel] = useState(sections[0].label);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("zoan-overview");

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
          "pointer-events-auto flex h-8 w-full items-center justify-center rounded-b-[999px] bg-[#07111f] px-4 text-[13px] tracking-normal text-[#eaf7ff] transition-transform duration-500 ease-out sm:text-sm",
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
          "relative overflow-hidden bg-[#e6edff]",
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
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#15CABE]">
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
          <p className="mt-4 text-base leading-7 text-[#64748b]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span className="rounded-full bg-[#eef3ff] px-3 py-1.5 text-xs text-[#334155]" key={tag}>
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
    <main className="min-h-screen w-full max-w-full overflow-x-hidden font-sans text-[#07111f]" style={{ backgroundColor: theme.page }}>
      <ZoanStickyIndicator />

      <section
        id="zoan-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_18%,#ffffff_0%,transparent_30%),radial-gradient(circle_at_84%_18%,#15CABE_0%,transparent_32%),linear-gradient(135deg,#ffffff_0%,#B0F1ED_58%,#15CABE_100%)] px-6 text-center text-[#07111f] sm:min-h-[800px]"
      >
        <Image
          src="/assets/zoan/zoan-hero-blob-top.svg"
          alt=""
          width={1440}
          height={422}
          priority
          className="pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none"
        />
        <Image
          src="/assets/zoan/zoan-hero-blob-bottom.svg"
          alt=""
          width={1440}
          height={702}
          priority
          className="pointer-events-none absolute bottom-[-360px] left-1/2 -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-420px]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-col items-center gap-5">
          <p className="rounded-full border border-[#07111f]/10 bg-white/45 px-4 py-1.5 text-sm text-[#07111f] backdrop-blur">
            AI Product · May 2025
          </p>
          <h1 className="max-w-[340px] font-[var(--font-heading)] text-[clamp(36px,9.8vw,64px)] font-bold leading-[1.05] tracking-normal sm:max-w-none sm:text-[64px]">
            Zoan AI
          </h1>
          <p className="mx-auto max-w-[340px] text-base leading-[1.35] text-[#07111f]">
            AI Workflow Management
            <br />
            <span className="text-[#07111f]/65">
              · From fearing AI to designing for it
            </span>
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-28 px-5 py-24 sm:gap-32 sm:px-8 lg:gap-36 lg:py-36">
        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="zoan-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1.5 text-sm text-white">
              My Projects
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[34px] font-bold leading-[1.28] tracking-normal sm:text-5xl sm:leading-[1.24]">
              Designing the interface an AI engine relies on
            </h2>
            <p className="text-lg leading-8 text-[#64748b] sm:text-xl sm:leading-[1.6]">
              Before joining Zoan AI, I wondered if AI would replace designers.
              This project showed me something else: I was designing the
              interface for an AI platform.
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
                <p className="text-sm uppercase tracking-[0.12em] text-[#15CABE]">{title}</p>
                <p className="mt-3 text-base leading-6 text-[#07111f]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1.5 text-sm text-white">
              The work
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              From loose interface pieces to a scalable AI product system
            </h2>
            <p className="max-w-[720px] text-lg leading-8 text-[#64748b]">
              Zoan enables teams and partners to build AI-generated interactive
              content through unified desktop workflows and a mobile
              chat-to-creation experience.
            </p>
          </div>

          <div className="grid gap-6">
            <CaseImage
              src={zoanAssets.workMockup1}
              alt="Zoan AI desktop and mobile product mockup"
              ratio="aspect-[4/3]"
            />
            <CaseImage
              src={zoanAssets.workMockup2}
              alt="Zoan AI product system mockup"
              ratio="aspect-[4/3]"
            />
          </div>

          <div className="grid gap-6">
            {challenges.map((item) => (
              <article className="border-t border-[#07111f]/10 pt-6" key={item.label}>
                <p className="text-sm text-[#15CABE]">{item.label}</p>
                <h3 className="mt-3 font-[var(--font-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#64748b]">
                  {item.question}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="zoan-challenge-01">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1.5 text-sm text-white">
              Challenge 01
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Rebuilding product foundations for an early-stage AI platform
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <CaseImage src={zoanAssets.color} alt="Zoan color foundation" ratio="aspect-[4/3]" />
            <CaseImage src={zoanAssets.typography} alt="Zoan typography foundation" ratio="aspect-[4/3]" />
            <CaseImage src={zoanAssets.tokens} alt="Zoan variable token system" ratio="aspect-[4/3]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {foundationSteps.map((item, index) => (
              <article className="border-t border-[#07111f]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#15CABE]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-7 text-[#334155]">{item}</p>
              </article>
            ))}
          </div>

          <CaseImage src={zoanAssets.components} alt="Zoan component system" />
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="zoan-challenge-02">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1.5 text-sm text-white">
              Challenge 02
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Designing one workflow across desktop and mobile
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {platformSteps.map((item) => (
              <article className="border-t border-[#07111f]/10 pt-6" key={item}>
                <p className="text-base leading-7 text-[#334155]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6">
            <CaseImage src={zoanAssets.platformShowcase1} alt="Zoan desktop workflow showcase" />
            <CaseImage src={zoanAssets.platformShowcase2} alt="Zoan mobile workflow showcase" />
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="zoan-motion">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1.5 text-sm text-white">
              Challenge 03
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Motion and micro-interactions for guided AI workflows
            </h2>
            <p className="max-w-[720px] text-lg leading-8 text-[#64748b]">
              Motion was introduced to guide attention, clarify transitions,
              reinforce hierarchy, and make the experience feel more responsive
              than static UI.
            </p>
          </div>

          <div className="grid gap-6">
            <CaseImage src={zoanAssets.timelineMotion} alt="Zoan timeline motion" />
            <CaseImage src={zoanAssets.appMotion} alt="Zoan app transition motion" />
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="zoan-outcome">
          <div className="rounded-2xl bg-[#07111f] p-7 text-white shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#15CABE]">
              Outcome
            </p>
            <h2 className="mt-5 font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Designers shape how humans interact with AI
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              The renewed system provided a scalable foundation for future
              development, reduced design-engineering friction, and established
              a stronger visual identity for fundraising and go-to-market.
            </p>
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="zoan-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#07111f] px-3 py-1.5 text-sm text-white">
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

      <section id="zoan-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#07111f] px-3 py-1.5 text-sm text-white">
            Contact
          </span>
          <h2 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-[1.18] tracking-normal">
            Get in Touch
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#64748b]">
            Excited to collaborate! Email me at{" "}
            <a className="text-[#15CABE]" href="mailto:phuongthuy101222@gmail.com">
              phuongthuy101222@gmail.com
            </a>{" "}
            or DM me on{" "}
            <a className="text-[#15CABE]" href={DATA.contact.social.LinkedIn.url}>
              Linkedin
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
