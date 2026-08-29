"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

const theme = {
  page: "#f3fbf7",
  accent: "#16a34a",
  accent2: "#34d399",
  dark: "#071b14",
  hero:
    "radial-gradient(circle at 18% 18%, #34d399 0%, transparent 28%), radial-gradient(circle at 82% 24%, #22c55e 0%, transparent 30%), linear-gradient(135deg, #071b14 0%, #0f7a4a 50%, #34d399 100%)",
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

const sections = [
  { id: "trueprofit-overview", label: "Clear visual storytelling for e-commerce finance" },
  { id: "trueprofit-work", label: "Overview" },
  { id: "trueprofit-task-01", label: "Task 1: Landing page support" },
  { id: "trueprofit-task-02", label: "Task 2: Onboarding illustrations" },
  { id: "trueprofit-outcome", label: "Outcome" },
  { id: "trueprofit-next", label: "Next projects" },
  { id: "trueprofit-contact", label: "Get in touch" },
];

const assets = {
  hero: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758518915/Untitled_design_32_pf1vgx.gif",
  keywords: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758739200/truepro-01_hcnk3e.png",
  feeling: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758739200/truepro-02_xul57w.png",
  landingOutcome: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758739200/truepro-03_a32knn.png",
  landingResult: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758979026/truepro-02-ux_yjgd3g.png",
  onboardingProblem: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730723/01_xdfyoa.png",
  empathyMap: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758732412/04_sypjpi.png",
  journeyMap: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730723/03_diajt3.png",
  brandAlignment: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730723/05_wo4zax.png",
  handoff: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758733263/Screenshot_212_bpptse.png",
  onboardingOutcome: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758730725/Frame_560_t1ebbr.png",
};

const focusAreas = [
  {
    label: "Task 1",
    title: "Landing Page Support",
    body:
      "The TrueProfit marketing website needed illustration and layout support to better showcase product value across the Home, Features, and Partners pages.",
  },
  {
    label: "Task 2",
    title: "Onboarding Illustrations",
    body:
      "The onboarding flow needed visuals that felt connected to the brand and guided users through the UX journey instead of acting as decoration.",
  },
];

const landingSteps = [
  "Received in-progress design files and content from the design team, then identified keywords, references, and the feeling each visual needed to communicate.",
  "Created illustrations for the Home and Features pages based on the established website structure.",
  "Drafted layout and illustration concepts for the Partners page to support its collaboration story.",
  "Iterated with feedback from the design lead and marketing team until final approval.",
];

const onboardingSteps = [
  "Clarified the KPI direction: reduce skips and increase survey completion.",
  "Mapped the user journey with an empathy lens: what users see, think, feel, and do before, during, and after onboarding.",
  "Pulled assets from the design system and landing page to keep product touchpoints visually connected.",
  "Sketched rough flows, refined with references, applied the style guide, and handed off assets in Figma with developer notes.",
];

const nextProjects = ["Language Learning Apps", "Zoan AI", "Affina"]
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

function TrueProfitStickyIndicator() {
  const [activeLabel, setActiveLabel] = useState(sections[0].label);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("trueprofit-overview");

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
          "pointer-events-auto flex h-8 w-full items-center justify-center rounded-b-[999px] bg-[#071b14] px-4 text-[13px] tracking-normal text-[#ecfdf5] transition-transform duration-500 ease-out sm:text-sm",
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
          "relative overflow-hidden bg-[#e5f7ed]",
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
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#16a34a]">
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
          <p className="mt-4 text-base leading-7 text-[#64746a]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span className="rounded-full bg-[#edf8f1] px-3 py-1.5 text-xs text-[#254236]" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function TrueProfitCaseStudy() {
  return (
    <main className="min-h-screen font-sans text-[#071b14]" style={{ backgroundColor: theme.page }}>
      <TrueProfitStickyIndicator />

      <section
        id="trueprofit-overview"
        className="relative isolate flex min-h-[760px] items-center justify-center overflow-visible bg-[radial-gradient(circle_at_18%_18%,#0f8f5b_0%,transparent_30%),radial-gradient(circle_at_82%_24%,#2dd4bf_0%,transparent_30%),linear-gradient(135deg,#071b14_0%,#15803d_50%,#34d399_100%)] px-6 text-center text-white sm:min-h-[800px]"
      >
        <Image
          src="/assets/trueprofit/trueprofit-hero-blob-top.svg"
          alt=""
          width={1440}
          height={422}
          priority
          className="pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:w-[1640px]"
        />
        <Image
          src="/assets/trueprofit/trueprofit-hero-blob-bottom.svg"
          alt=""
          width={1440}
          height={702}
          priority
          className="pointer-events-none absolute bottom-[-220px] left-1/2 -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:bottom-[-260px] sm:w-[1640px]"
        />

        <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center gap-5">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            E-commerce Finance · Jan 2025
          </p>
          <h1 className="font-[var(--font-heading)] text-[48px] font-bold leading-[1.05] tracking-normal sm:text-[64px]">
            TrueProfit
          </h1>
          <p className="text-base leading-[1.35] text-white">
            Landing Page & Onboarding Illustrations
            <br />
            <span className="text-white/75">
              · Visual storytelling for product clarity
            </span>
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-28 px-5 py-24 before:absolute before:inset-x-[-50vw] before:inset-y-0 before:-z-10 before:bg-[#f3fbf7] sm:gap-32 sm:px-8 lg:gap-36 lg:py-36">
        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="trueprofit-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1.5 text-sm text-white">
              My Projects
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[34px] font-bold leading-[1.28] tracking-normal sm:text-5xl sm:leading-[1.24]">
              Turning product goals into clearer visual stories
            </h2>
            <p className="text-lg leading-8 text-[#64746a] sm:text-xl sm:leading-[1.6]">
              During my internship, I worked on two design tasks tied closely to
              user experience and brand consistency: supporting the marketing
              website launch and redesigning onboarding illustrations.
            </p>
          </div>

          <CaseImage src={assets.hero} alt="TrueProfit landing page preview" />

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["Role", "Visual design, illustration, UX support"],
              ["Scope", "Landing page, partners page, onboarding flow"],
              ["Outcome", "More cohesive visuals across marketing and product"],
            ].map(([title, body]) => (
              <div className="border-t border-[#071b14]/10 pt-5" key={title}>
                <p className="text-sm uppercase tracking-[0.12em] text-[#16a34a]">{title}</p>
                <p className="mt-3 text-base leading-6 text-[#071b14]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1.5 text-sm text-white">
              The work
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              From brand-aligned visuals to a smoother onboarding journey
            </h2>
            <p className="max-w-[720px] text-lg leading-8 text-[#64746a]">
              Both tasks required translating abstract product goals into clear
              visual storytelling while staying aligned with the existing design
              system and marketing direction.
            </p>
          </div>

          <div className="grid gap-6">
            {focusAreas.map((item) => (
              <article className="border-t border-[#071b14]/10 pt-6" key={item.label}>
                <p className="text-sm text-[#16a34a]">{item.label}</p>
                <h3 className="mt-3 font-[var(--font-heading)] text-2xl font-bold leading-[1.2] tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#64746a]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="trueprofit-task-01">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1.5 text-sm text-white">
              Task 1
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Landing Page Support
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <article className="border-t border-[#071b14]/10 pt-6">
              <p className="text-sm font-bold uppercase text-[#16a34a]">Problem</p>
              <p className="mt-4 text-lg leading-8 text-[#071b14]">
                The website needed additional visuals to better showcase product
                value across its main pages.
              </p>
            </article>
            <article className="rounded-xl bg-[#071b14] p-6 text-white shadow-sm sm:p-8">
              <p className="text-sm font-bold uppercase text-[#34d399]">My contribution</p>
              <p className="mt-4 text-lg leading-8 text-white/85">
                From November until launch in January, I created illustrations
                for Home and Features, then drafted layout and visual concepts
                for the Partners page.
              </p>
            </article>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.keywords} alt="TrueProfit illustration keyword references" ratio="aspect-[4/3]" />
            <CaseImage src={assets.feeling} alt="TrueProfit visual feeling references" ratio="aspect-[4/3]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {landingSteps.map((item, index) => (
              <article className="border-t border-[#071b14]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#16a34a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-7 text-[#254236]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.landingOutcome} alt="TrueProfit landing illustration outcome" ratio="aspect-[4/3]" />
            <CaseImage src={assets.landingResult} alt="TrueProfit landing page result" ratio="aspect-[4/3]" />
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="trueprofit-task-02">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1.5 text-sm text-white">
              Task 2
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Onboarding Illustrations
            </h2>
            <p className="max-w-[720px] text-lg leading-8 text-[#64746a]">
              The existing onboarding felt disconnected from the brand, had high
              skip behavior, and used visuals more as decoration than guidance.
            </p>
          </div>

          <CaseImage
            src={assets.onboardingProblem}
            alt="TrueProfit onboarding problem"
            ratio="h-auto"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {onboardingSteps.map((item, index) => (
              <article className="border-t border-[#071b14]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#16a34a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-7 text-[#254236]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.empathyMap} alt="TrueProfit empathy map" ratio="aspect-[4/3]" />
            <CaseImage src={assets.journeyMap} alt="TrueProfit onboarding journey map" ratio="aspect-[4/3]" />
            <CaseImage src={assets.brandAlignment} alt="TrueProfit brand alignment" ratio="aspect-[4/3]" />
            <CaseImage src={assets.handoff} alt="TrueProfit developer handoff" ratio="aspect-[4/3]" />
          </div>

          <CaseImage
            src={assets.onboardingOutcome}
            alt="TrueProfit onboarding illustration outcome"
            ratio="h-auto"
          />
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="trueprofit-outcome">
          <div className="rounded-2xl bg-[#071b14] p-7 text-white shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#34d399]">
              Outcome
            </p>
            <h2 className="mt-5 font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              A more cohesive bridge between website and product onboarding
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              The final illustrations fit the brand identity, supported the
              official website launch, and helped onboarding feel more guided
              and connected to TrueProfit&apos;s product story.
            </p>
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="trueprofit-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#071b14] px-3 py-1.5 text-sm text-white">
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

      <section id="trueprofit-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[420px] w-[1200px] max-w-none -translate-x-1/2 rounded-[100%] bg-white/80" />
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#071b14] px-3 py-1.5 text-sm text-white">
            Contact
          </span>
          <h2 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-[1.18] tracking-normal">
            Get in Touch
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#64746a]">
            Excited to collaborate! Email me at{" "}
            <a className="text-[#16a34a]" href="mailto:phuongthuy101222@gmail.com">
              phuongthuy101222@gmail.com
            </a>{" "}
            or DM me on{" "}
            <a className="text-[#16a34a]" href={DATA.contact.social.LinkedIn.url}>
              Linkedin
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
