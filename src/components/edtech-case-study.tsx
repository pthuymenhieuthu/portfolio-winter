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
  page: "#f7fff3",
  accent: "#23c55e",
  dark: "#092014",
  hero:
    "radial-gradient(circle at 18% 18%, #12CD83 0%, transparent 30%), radial-gradient(circle at 82% 24%, #BCECDB 0%, transparent 30%), linear-gradient(135deg, #092014 0%, #12CD83 42%, #15D590 100%)",
};

const sections = [
  { id: "edtech-overview", label: "Friendly learning experiences" },
  { id: "edtech-work", label: "Overview" },
  { id: "edtech-motion", label: "Motion showcase" },
  { id: "edtech-speak", label: "Speak Chinese UI showcase" },
  { id: "edtech-graphics", label: "App Store graphics" },
  { id: "edtech-tools", label: "Tools" },
  { id: "edtech-next", label: "Next projects" },
  { id: "edtech-contact", label: "Get in touch" },
];

const assets = {
  hero: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764751725/Phone_shocase_lxj9ih.gif",
  leftRight: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764752790/Copy_of_Phone_shocase_e6nh4i.gif",
  speakChinese: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764754172/speak_chinese_z1dzwv.png",
  sensei: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755845/android_banner-tr%C3%B9m_japanese_cyfugx.png",
  hsk: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755849/HSK_soiciu.png",
  androidBanner: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755833/android_banner_xge5vi.png",
  graphics1: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756718/Frame_2147225633_jn2vkl.png",
  graphics2: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756721/Frame_2147225634_auzyip.png",
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
  "Built using Rive and After Effects.",
  "Integrated data binding linked to learning states.",
  "Used the level-up concept to make practice feel progressive.",
  "Designed interactive left/right hold behavior for mascot movement.",
];

const graphicsPoints = [
  "App Store UI preview screenshots that highlight the main learning experience.",
  "Feature banners that communicate key outcomes like speaking, memorizing faster, and tracking progress.",
  "Promotional visuals shaped to improve conversion while keeping the apps friendly and approachable.",
];

const nextProjects = ["Marketing Graphics", "TrueProfit", "Zoan AI"]
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

function EdTechStickyIndicator() {
  const [activeLabel, setActiveLabel] = useState(sections[0].label);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("edtech-overview");

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
          "pointer-events-auto flex h-8 w-full items-center justify-center rounded-b-[999px] bg-[#092014] px-4 text-[13px] tracking-normal text-[#f7fee7] transition-transform duration-500 ease-out sm:text-sm",
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
          "relative overflow-hidden bg-[#eafbe7]",
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
          <p className="mt-4 text-base leading-7 text-[#607068]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span className="rounded-full bg-[#effbe9] px-3 py-1.5 text-xs text-[#274333]" key={tag}>
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
    <main className="min-h-screen w-full max-w-full overflow-x-hidden font-sans text-[#092014]" style={{ backgroundColor: theme.page }}>
      <EdTechStickyIndicator />

      <section
        id="edtech-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_18%,#12CD83_0%,transparent_30%),radial-gradient(circle_at_82%_24%,#BCECDB_0%,transparent_30%),linear-gradient(135deg,#092014_0%,#12CD83_42%,#15D590_100%)] px-6 text-center text-white sm:min-h-[800px]"
      >
        <Image
          src="/assets/edtech/edtech-hero-blob-top.svg"
          alt=""
          width={1440}
          height={422}
          priority
          className="pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:w-[1640px]"
        />
        <Image
          src="/assets/edtech/edtech-hero-blob-bottom.svg"
          alt=""
          width={1440}
          height={702}
          priority
          className="pointer-events-none absolute bottom-[-220px] left-1/2 -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:bottom-[-260px] sm:w-[1640px]"
        />

        <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center gap-5">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            Mobile App · Feb 2025
          </p>
          <h1 className="font-[var(--font-heading)] text-[48px] font-bold leading-[1.05] tracking-normal sm:text-[64px]">
            Speak Chinese
          </h1>
          <p className="text-base leading-[1.35] text-white">
            UI & Motion Enhancement Showcase
            <br />
            <span className="text-white/75">
              · Friendly interaction for daily learning
            </span>
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-28 px-5 py-24 sm:gap-32 sm:px-8 lg:gap-36 lg:py-36">
        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="edtech-work">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1.5 text-sm text-white">
              My Projects
            </span>
            <h2 className="max-w-[760px] font-[var(--font-heading)] text-[34px] font-bold leading-[1.28] tracking-normal sm:text-5xl sm:leading-[1.24]">
              UI improvements for Chinese and Japanese learning apps
            </h2>
            <p className="text-lg leading-8 text-[#607068] sm:text-xl sm:leading-[1.6]">
              This showcase focuses on clarity, motivation, and friendly
              interaction for language learning apps that are publicly available
              on the App Store and used by global learners every day.
            </p>
          </div>

          <CaseImage src={assets.hero} alt="Speak Chinese splash and mascot motion" />

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["Role", "UI enhancement, Rive motion, App Store graphics"],
              ["Scope", "Speak Chinese, HSK Vocab, Sensei JLPT"],
              ["Tools", "Figma, Rive, After Effects"],
            ].map(([title, body]) => (
              <div className="border-t border-[#092014]/10 pt-5" key={title}>
                <p className="text-sm uppercase tracking-[0.12em] text-[#16a34a]">{title}</p>
                <p className="mt-3 text-base leading-6 text-[#092014]">{body}</p>
              </div>
            ))}
          </div>

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
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="edtech-motion">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1.5 text-sm text-white">
              Motion Showcase
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Motion that motivates progress and supports learning
            </h2>
            <p className="max-w-[720px] text-lg leading-8 text-[#607068]">
              Motion was not added only for delight. It helped reinforce the
              feeling that learners continuously level up as they practice.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.hero} alt="Splash and mascot motion" ratio="aspect-[4/5]" />
            <CaseImage src={assets.leftRight} alt="Interactive left and right mascot motion" ratio="aspect-[4/5]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {motionPoints.map((item, index) => (
              <article className="border-t border-[#092014]/10 pt-6" key={item}>
                <p className="font-[var(--font-heading)] text-4xl font-bold leading-none text-[#16a34a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-base leading-7 text-[#274333]">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="edtech-speak">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1.5 text-sm text-white">
              UI Showcase
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Speak Chinese - Learn Mandarin
            </h2>
          </div>

          <CaseImage src={assets.speakChinese} alt="Speak Chinese app UI screens" />
          <CaseImage src={assets.sensei} alt="Sensei Japanese learning app UI screens" />
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="edtech-graphics">
          <div className="flex flex-col gap-7">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1.5 text-sm text-white">
              App Store Graphics
            </span>
            <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Promotional visuals for product value and conversion
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {graphicsPoints.map((item) => (
              <article className="border-t border-[#092014]/10 pt-6" key={item}>
                <p className="text-base leading-7 text-[#274333]">{item}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseImage src={assets.hsk} alt="HSK app store graphics" ratio="aspect-[4/3]" />
            <CaseImage src={assets.androidBanner} alt="Language app feature banner" ratio="aspect-[4/3]" />
            <CaseImage src={assets.graphics1} alt="App store promotional graphic" ratio="aspect-[4/3]" />
            <CaseImage src={assets.graphics2} alt="App store promotional graphic" ratio="aspect-[4/3]" />
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id="edtech-tools">
          <div className="rounded-2xl bg-[#092014] p-7 text-white shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#bef264]">
              Tools
            </p>
            <h2 className="mt-5 font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Figma, Rive, and After Effects
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              The final work connected UI polish, motion-ready mascot behavior,
              and App Store visuals so the learning experience felt clearer,
              friendlier, and more motivating.
            </p>
          </div>
        </section>

        <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="edtech-next">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-lg bg-[#092014] px-3 py-1.5 text-sm text-white">
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

      <section id="edtech-contact" className="relative overflow-hidden px-5 pb-80 pt-32 text-center sm:pb-96 sm:pt-36">
        <div className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[420px] w-[1200px] max-w-none -translate-x-1/2 rounded-[100%] bg-white/80" />
        <div className="relative mx-auto max-w-[560px]">
          <span className="inline-flex rounded-lg bg-[#092014] px-3 py-1.5 text-sm text-white">
            Contact
          </span>
          <h2 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-[1.18] tracking-normal">
            Get in Touch
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#607068]">
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
