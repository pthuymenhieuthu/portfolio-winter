"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  History,
  QrCode,
  ScanLine,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { HeroBlobMotion } from "@/components/hero-blob-motion";
import { cn } from "@/lib/utils";
import { caseStudyStyles } from "@/lib/case-study-styles";

const PROJECT_HERO_DELAY = 0.36;

const brandLogos = [
  { name: "MYKOLOR", src: "/assets/4oranges/brands/mykolor.png", width: 172, height: 53 },
  { name: "SPEC", src: "/assets/4oranges/brands/spec.png", width: 1230, height: 531 },
  { name: "SONBOSS", src: "/assets/4oranges/brands/sonboss.svg", width: 779, height: 129 },
  { name: "EXPO", src: "/assets/4oranges/brands/expo.png", width: 117, height: 101 },
  { name: "OEXPO", src: "/assets/4oranges/brands/oexpo.png", width: 128, height: 30 },
  { name: "SUPORSEAL", src: "/assets/4oranges/brands/suporseal.png", width: 638, height: 168 },
] as const;

const sections = [
  { id: "four-oranges-overview", label: "Overview" },
  { id: "four-oranges-empathize", label: "Empathize" },
  { id: "four-oranges-define", label: "Define" },
  { id: "four-oranges-ideate", label: "Ideate" },
  { id: "four-oranges-prototype", label: "Prototype" },
  { id: "four-oranges-test", label: "Test & refine" },
  { id: "four-oranges-ui-kit", label: "UI kit" },
  { id: "four-oranges-outcome", label: "Outcome" },
];

type CaseProject = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
};

const nextProjects = ["Zoan AI", "TrueProfit", "Language Learning Apps"]
  .map((name) =>
    (DATA.projects as readonly CaseProject[]).find((project) =>
      project.title.toLowerCase().includes(name.toLowerCase())
    )
  )
  .filter((project): project is CaseProject => Boolean(project));

function ProjectNavigation() {
  const [activeLabel, setActiveLabel] = useState(sections[0].label);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("four-oranges-hero");
    const updateVisibility = () => {
      if (hero) setIsVisible(window.scrollY > hero.offsetHeight - 48);
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
            if (!entry.isIntersecting) return;
            const section = sections.find((item) => item.id === element.id);
            if (section) setActiveLabel(section.label);
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

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 lg:hidden">
      <div
        className={cn(
          "pointer-events-auto flex h-9 items-center justify-center border-b border-black/10 bg-[#f7f7f8]/85 px-4 text-sm text-[#351303] shadow-[0_8px_30px_rgba(8,9,10,0.08)] backdrop-blur-xl transition-transform duration-500",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {activeLabel}
      </div>
      </div>

      <nav
        aria-label="Case study sections"
        className={cn(
          "pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 lg:flex lg:flex-col lg:gap-4",
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        )}
      >
        {sections.map((section) => {
          const isActive = activeLabel === section.label;

          return (
            <button
              type="button"
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
              className="pointer-events-auto relative flex h-6 items-center"
              onClick={() => goToSection(section.id)}
              key={section.id}
            >
              <span
                className={cn(
                  "relative flex shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isActive ? "size-6 bg-[#3BA0FF]/15" : "size-4"
                )}
              >
                <span
                  className={cn(
                    "rounded-full bg-[#3BA0FF]/90 transition-all duration-300",
                    isActive ? "size-3" : "size-2"
                  )}
                />
              </span>
              {isActive && (
                <span className="ml-2 whitespace-nowrap rounded bg-[#29292d] px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                  {section.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-lg bg-[#351303] px-3 py-1 text-sm font-normal text-white">
      {children}
    </span>
  );
}

function CaseSection({
  id,
  number,
  title,
  copy,
  children,
  centered = false,
}: {
  id: string;
  number: string;
  title: string;
  copy: string;
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <section className={caseStudyStyles.sectionStack} id={id}>
      <div className={cn(caseStudyStyles.headerStack, "max-w-[760px]", centered && "mx-auto items-center text-center")}>
        <SectionLabel>{number}</SectionLabel>
        {title && (
          <h2 className="font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal text-[#351303] sm:text-[30px]">
            {title}
          </h2>
        )}
        <p className="max-w-[680px] text-base leading-[1.6] text-[#754426] sm:text-[17px]">{copy}</p>
      </div>
      {children}
    </section>
  );
}

function BrandStrip() {
  const shouldReduceMotion = useReducedMotion();

  const LogoGroup = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
      {brandLogos.map((brand) => (
        <div className="flex h-16 w-[170px] shrink-0 items-center justify-center" key={brand.name}>
          <Image
            src={brand.src}
            alt={hidden ? "" : `${brand.name} logo`}
            width={brand.width}
            height={brand.height}
            className="h-auto max-h-14 w-auto max-w-full object-contain"
            style={{ width: "auto", height: "auto" }}
            unoptimized
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max items-center py-3"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        <LogoGroup />
        <LogoGroup hidden />
      </motion.div>
    </div>
  );
}

function FlowSteps() {
  const steps = ["Create account", "Add bank", "Scan code", "Earn reward", "Withdraw", "Track status"];

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, index) => (
          <div className="relative rounded-2xl border border-[#351303]/10 bg-white/55 p-4" key={step}>
            <span className="text-xs text-[#fba919]">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-8 text-sm font-medium leading-5 text-[#351303]">{step}</p>
            {index < steps.length - 1 && (
              <ArrowDown className="absolute right-3 top-3 size-4 -rotate-90 text-[#351303]/25" />
            )}
          </div>
        ))}
    </div>
  );
}

const howMightWeText = "How might we make every code and transaction status immediately understandable?";

function RevealWord({
  word,
  index,
  total,
  progress,
  reduceMotion,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = index / total;
  const end = Math.min((index + 1.15) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const color = useTransform(progress, [start, end], ["#c8c8c8", "#351303"]);

  return (
    <motion.span
      aria-hidden="true"
      className="mr-[0.22em] inline-block"
      style={reduceMotion ? { color: "#351303", opacity: 1 } : { color, opacity }}
    >
      {word}
    </motion.span>
  );
}

function HowMightWeReveal() {
  const target = useRef<HTMLQuoteElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.88", "end 0.34"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.22,
  });
  const words = howMightWeText.split(" ");

  return (
    <motion.blockquote
      ref={target}
      aria-label={howMightWeText}
      className="max-w-[920px] py-2 font-[var(--font-affina-heading)] text-[30px] leading-[1.2] text-[#351303] sm:text-[46px]"
    >
      {words.map((word, index) => (
        <RevealWord
          word={word}
          index={index}
          total={words.length}
          progress={progress}
          reduceMotion={Boolean(shouldReduceMotion)}
          key={`${word}-${index}`}
        />
      ))}
    </motion.blockquote>
  );
}

const typographyScale = [
  { name: "Display/H1", sample: "1.800.000đ Tổng thưởng", size: 24, weight: 700, meta: "24px · Bold" },
  { name: "Display/H2", sample: "Lịch sử giao dịch", size: 20, weight: 700, meta: "20px · Bold" },
  { name: "Display/H3", sample: "Thông tin tài khoản", size: 18, weight: 600, meta: "18px · Semibold" },
  { name: "Heading/Bold", sample: "Tất cả · Có thể rút", size: 16, weight: 700, meta: "16px · Bold" },
  { name: "Body/Regular", sample: "Cập nhật chương trình và tin tức mới nhất", size: 15, weight: 400, meta: "15px · Regular" },
  { name: "Body/Semibold", sample: "Liên kết tài khoản ngân hàng", size: 15, weight: 600, meta: "15px · Semibold" },
  { name: "Label/Regular", sample: "Họ và tên · Ngày sinh · Địa chỉ", size: 14, weight: 400, meta: "14px · Regular" },
  { name: "Caption/Regular", sample: "Ngày yêu cầu: Hôm nay, 11:00", size: 12, weight: 400, meta: "12px · Regular" },
  { name: "Tab/Label", sample: "Trang chủ · Lịch sử · Tin tức", size: 10, weight: 500, meta: "10px · Medium" },
] as const;

function TypographySystem() {
  return (
    <div className="rounded-3xl border border-[#351303]/10 bg-white/60 p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7057]">Typography</p>
        <p className="text-xs text-[#9a7057]">SF Pro (iOS) · Inter (cross-platform)</p>
      </div>

      <div className="mt-6 divide-y divide-[#351303]/10 sm:mt-8">
        {typographyScale.map((style) => (
          <div className="flex items-end justify-between gap-4 px-1 py-4 sm:px-2" key={style.name}>
            <div className="min-w-0">
              <p className="mb-1 text-[13px] font-medium text-[#f5780b]">{style.name}</p>
              <p
                className="break-words leading-normal text-black"
                style={{ fontSize: `${style.size}px`, fontWeight: style.weight }}
              >
                {style.sample}
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-[#f6f8fa] px-3 py-1.5 text-[11px] font-semibold text-[#6b7280] sm:text-xs">
              {style.meta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

type FlowScreen = {
  src: string;
  alt: string;
  label: string;
  detail: string;
  width: number;
  height: number;
};

function ScreenCard({ screen, compact = false }: { screen: FlowScreen; compact?: boolean }) {
  return (
    <figure
      className={cn(
        "w-full min-w-0 justify-self-center",
        compact ? "max-w-[210px] sm:max-w-[220px] lg:max-w-[200px]" : "max-w-[280px]"
      )}
    >
      <div
        className={cn(
          "w-full overflow-hidden rounded-[22px]",
          compact && "flex items-start justify-center"
        )}
      >
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          unoptimized
          className={cn(
            "block",
            compact ? "h-auto w-full object-cover object-top" : "h-auto w-full"
          )}
          sizes="(max-width: 640px) 76vw, 260px"
        />
      </div>
      <figcaption className="mt-5">
        <p className="text-sm font-semibold text-[#351303]">{screen.label}</p>
        <p className="mt-1 text-xs leading-5 text-[#8d684f]">{screen.detail}</p>
      </figcaption>
    </figure>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-2 self-center py-2 text-[#f86706]">
      {label && (
        <span className="max-w-24 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9a7057]">
          {label}
        </span>
      )}
      <span className="flex size-10 items-center justify-center rounded-full border border-[#f86706]/25 bg-white text-xl shadow-sm max-lg:rotate-90">
        →
      </span>
    </div>
  );
}

function LinearScreenFlow({
  title,
  copy,
  screens,
}: {
  title: string;
  copy: string;
  screens: FlowScreen[];
}) {
  return (
    <div className="rounded-[32px] border border-[#351303]/10 bg-white/65 p-5 sm:p-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#f86706]">
          {title}
        </p>
        <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#754426]">{copy}</p>
      </div>
      <div
        className={cn(
          "grid items-start gap-5",
          screens.length === 2
            ? "lg:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)]"
            : "lg:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)_48px_minmax(0,1fr)_48px_minmax(0,1fr)]"
        )}
      >
        {screens.map((screen, index) => (
          <div className="contents" key={screen.src}>
            <ScreenCard screen={screen} compact={screens.length === 4} />
            {index < screens.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
    </div>
  );
}

const entryScreens: FlowScreen[] = [
  {
    src: "/assets/4oranges/ui-flow/login.png",
    alt: "4Oranges login screen",
    label: "01 · Login",
    detail: "Zalo or account sign-in.",
    width: 390,
    height: 844,
  },
  {
    src: "/assets/4oranges/ui-flow/home.png",
    alt: "4Oranges rewards home screen",
    label: "02 · Home",
    detail: "Reward balance, history, campaigns and scan entry.",
    width: 645,
    height: 2060,
  },
];

const qrScreens: FlowScreen[] = [
  {
    src: "/assets/4oranges/ui-flow/qr-camera.png",
    alt: "4Oranges QR camera screen",
    label: "11 · Scan QR",
    detail: "Camera-first scan with manual fallback.",
    width: 390,
    height: 859,
  },
  {
    src: "/assets/4oranges/ui-flow/qr-manual.png",
    alt: "4Oranges manual serial entry screen",
    label: "12 · Manual entry",
    detail: "Enter the serial printed on the product.",
    width: 1720,
    height: 3500,
  },
  {
    src: "/assets/4oranges/ui-flow/qr-loading.png",
    alt: "4Oranges QR validation screen",
    label: "13 · Processing",
    detail: "System validates the code.",
    width: 1560,
    height: 3436,
  },
  {
    src: "/assets/4oranges/ui-flow/qr-success.png",
    alt: "4Oranges reward success screen",
    label: "14 · Reward success",
    detail: "Show value, campaign and transaction status.",
    width: 1720,
    height: 3484,
  },
];

const accountScreen: FlowScreen = {
  src: "/assets/4oranges/ui-flow/account.png",
  alt: "4Oranges account screen",
  label: "26 · Account",
  detail: "Profile, bank, security and support settings.",
  width: 390,
  height: 1239,
};

const bankScreens: FlowScreen[] = [
  {
    src: "/assets/4oranges/ui-flow/bank-linked.png",
    alt: "4Oranges linked bank account screen",
    label: "27 · Bank linked",
    detail: "Verified account ready for new withdrawals.",
    width: 390,
    height: 844,
  },
  {
    src: "/assets/4oranges/ui-flow/bank-empty.png",
    alt: "4Oranges bank account empty state",
    label: "28 · Empty state",
    detail: "Explain the benefit and prompt the next action.",
    width: 390,
    height: 844,
  },
];

function AccountBranchFlow() {
  return (
    <div className="rounded-[32px] border border-[#351303]/10 bg-white/65 p-5 sm:p-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#f86706]">
          Account &amp; payout setup
        </p>
        <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#754426]">
          The account path handles both returning users with a verified bank and first-time setup.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_64px_minmax(0,1.8fr)] lg:items-start">
        <ScreenCard screen={accountScreen} />
        <div className="flex h-full min-h-20 flex-col items-center justify-center gap-2 text-[#f86706]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9a7057]">Bank account</span>
          <span className="text-2xl max-lg:rotate-90">→</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {bankScreens.map((screen) => (
            <ScreenCard screen={screen} key={screen.src} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NextProjectCard({ project, featured = false }: { project: CaseProject; featured?: boolean }) {
  return (
    <Link
      href={project.href || "#"}
      className={cn(
        "group block overflow-hidden rounded-3xl border border-[#351303]/10 bg-white/65 transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.15fr_0.85fr]"
      )}
    >
      <div className={cn("overflow-hidden bg-white", featured ? "aspect-[16/9] md:aspect-auto" : "aspect-[16/9]") }>
        {(project.image || project.video) && (
          <Image src={project.image || project.video || ""} alt={project.title} width={1200} height={675} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" unoptimized />
        )}
      </div>
      <div className="flex flex-col justify-between gap-8 p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7057]">{featured ? "Next project" : project.dates}</p>
          <h3 className={cn("mt-3 font-[var(--font-affina-heading)] font-normal leading-[1.2] text-[#351303]", featured ? "text-3xl" : "text-2xl")}>{project.title}</h3>
          <p className="mt-4 text-sm leading-6 text-[#754426]">{project.description}</p>
        </div>
      </div>
    </Link>
  );
}

export function FourOrangesCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f7f8] font-[var(--font-affina-body)] text-[#351303]">
      <ProjectNavigation />

      <section
        id="four-oranges-hero"
        className="relative isolate flex min-h-[760px] items-center justify-center overflow-hidden bg-[#fff4da] px-6 py-24 text-center"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 18% 10%, rgba(255,244,218,.72) 0, rgba(255,244,218,0) 31%), radial-gradient(circle at 90% 86%, rgba(248,103,6,.78) 0, rgba(248,103,6,0) 34%), linear-gradient(145deg,#f86706 0%,#fba919 55%,#ffd97d 100%)",
          }}
        />
        <HeroBlobMotion className="pointer-events-none absolute left-[calc(50%-30px)] top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none -translate-x-1/2 select-none" position="top">
          <Image src="/assets/4oranges/4oranges-hero-blob-top.svg" alt="" width={1440} height={422} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <HeroBlobMotion className="pointer-events-none absolute bottom-[-120px] left-1/2 -z-10 w-[max(1320px,110vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-150px]" position="bottom">
          <Image src="/assets/4oranges/4oranges-hero-blob-bottom.svg" alt="" width={1440} height={526} priority className="block h-auto w-full" />
        </HeroBlobMotion>
        <div className="absolute left-[-80px] top-[-90px] size-[330px] rounded-full border border-white/25" />
        <div className="absolute bottom-[-220px] right-[-130px] size-[520px] rounded-full border border-[#351303]/10" />
        <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center">
          <BlurFade delay={1.02}>
            <p className="rounded-full border border-[#351303]/15 bg-[#fff4da]/35 px-4 py-1.5 text-sm font-medium text-[#351303] backdrop-blur">Mobile app &amp; UI kit · 2026</p>
          </BlurFade>
          <HeroTitleReveal className="mt-7 max-w-[860px] font-[var(--font-heading)] text-[clamp(36px,9.8vw,64px)] font-medium leading-[1.05] tracking-normal text-[#351303]" delay={PROJECT_HERO_DELAY} text="4Oranges Rewards" wrap />
          <BlurFade delay={1.12}>
            <p className="mx-auto mt-7 max-w-[570px] text-base leading-[1.55] text-[#54250c]/75 sm:text-lg">A QR reward experience for painters and contractors — from code verification to bank withdrawal.</p>
          </BlurFade>
          <BlurFade delay={1.18}>
            <div className="mt-11 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#351303]/70">
              <span className="rounded-full bg-[#fff4da]/45 px-4 py-2">Scan</span><span className="rounded-full bg-[#fff4da]/45 px-4 py-2">Earn</span><span className="rounded-full bg-[#fff4da]/45 px-4 py-2">Withdraw</span>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 py-24 sm:gap-40 sm:px-8 lg:py-36">
        <section className="flex scroll-mt-24 flex-col gap-10" id="four-oranges-overview">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <SectionLabel>Overview</SectionLabel>
              <h2 className="mt-7 max-w-[760px] font-[var(--font-heading)] text-[30px] font-normal leading-[1.2] tracking-normal sm:text-[40px]">A reward app for a major paint manufacturer</h2>
            </div>
            <p className="text-base leading-[1.65] text-[#754426]">I designed the end-to-end mobile experience and UI kit, turning physical promotional codes into a clear digital reward journey.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {["Role: Sole UI/UX Designer", "Mobile app", "iOS & Android", "2026"].map((item) => <div className="rounded-2xl border border-[#351303]/10 bg-white/55 p-4 text-sm font-medium" key={item}>{item}</div>)}
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7057]">Brands by 4Oranges</p>
            <BrandStrip />
          </div>
        </section>

        <CaseSection id="four-oranges-empathize" number="01 · Empathize" title="Understand the reward moment" copy="Painters and contractors open the app with one goal: verify a code and know what happens to their money. The experience had to answer that quickly.">
          <div className="grid gap-4 sm:grid-cols-3">
            {[[ScanLine, "Fast entry", "Scan or enter a serial code."], [CheckCircle2, "Clear result", "Know whether the code worked."], [WalletCards, "Visible money", "Track rewards and transfers."]].map(([Icon, title, body]) => {
              const IconComponent = Icon as typeof ScanLine;
              return <div className="rounded-3xl border border-[#351303]/10 bg-white/60 p-6" key={String(title)}><IconComponent className="size-6 text-[#f86706]" /><h3 className="mt-8 text-lg font-semibold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-[#754426]">{String(body)}</p></div>;
            })}
          </div>
        </CaseSection>

        <CaseSection id="four-oranges-define" number="02 · Define" title="" copy="The product needed to distinguish a verified reward from money already transferred to a bank account.">
          <HowMightWeReveal />
          <FlowSteps />
        </CaseSection>

        <CaseSection id="four-oranges-ideate" number="03 · Ideate" title="Build around the next action" copy="Scanning stayed central. Profile, bank details, histories, rules and support were organized around the moments users needed them.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[[QrCode, "Scan & enter code"], [UserRound, "Profile"], [CreditCard, "Bank account"], [WalletCards, "Rewards"], [History, "Transactions"], [CheckCircle2, "Rules & support"]].map(([Icon, label]) => {
              const IconComponent = Icon as typeof QrCode;
              return <div className="flex items-center gap-4 rounded-2xl border border-[#351303]/10 bg-white/55 p-5" key={String(label)}><div className="flex size-11 items-center justify-center rounded-xl bg-[#fba919]/25"><IconComponent className="size-5 text-[#f86706]" /></div><span className="text-sm font-medium">{String(label)}</span></div>;
            })}
          </div>
        </CaseSection>

        <CaseSection id="four-oranges-prototype" number="04 · Prototype" title="Connect the complete flow" copy="I mapped the key product journeys from account entry to code validation, reward confirmation and payout setup." centered>
          <div className="space-y-8">
            <LinearScreenFlow
              title="Entry journey"
              copy="Users sign in, then land on a dashboard that keeps rewards, transactions, campaigns and the scan action in one place."
              screens={entryScreens}
            />
            <LinearScreenFlow
              title="QR reward journey"
              copy="The main path supports camera scanning, a manual fallback, a clear processing state and an outcome with the reward details."
              screens={qrScreens}
            />
            <AccountBranchFlow />
          </div>
        </CaseSection>

        <CaseSection id="four-oranges-test" number="05 · Test & refine" title="Design beyond success" copy="The flow was checked against business rules, then refined for invalid, used, expired, pending and failed states.">
          <div className="overflow-hidden rounded-3xl border border-[#351303]/10 bg-white/60">
            {[[Check, "Valid code", "Reward added", "#16845b"], [X, "Invalid or used", "Explain what happened", "#d33b2f"], [Clock3, "Processing", "Keep the status visible", "#c76a08"], [CreditCard, "Transfer failed", "Show a clear next step", "#d33b2f"]].map(([Icon, label, response, color], index) => {
              const IconComponent = Icon as typeof Check;
              return <div className={cn("grid gap-4 p-5 sm:grid-cols-[42px_1fr_1.3fr] sm:items-center", index > 0 && "border-t border-[#351303]/10")} key={String(label)}><div className="flex size-10 items-center justify-center rounded-xl bg-white"><IconComponent className="size-5" style={{ color: String(color) }} /></div><p className="text-sm font-semibold">{String(label)}</p><p className="text-sm text-[#754426]">{String(response)}</p></div>;
            })}
          </div>
        </CaseSection>

        <CaseSection id="four-oranges-ui-kit" number="UI kit" title="A system built from the product" copy="Foundations, components and states were created alongside the real flows so the interface stayed consistent through implementation.">
          <TypographySystem />
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl border border-[#351303]/10 bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7057]">Color system</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[ ["#FBA919", "Brand yellow"], ["#F86706", "Brand orange"], ["#FFF4DA", "Warm canvas"], ["#351303", "Ink"] ].map(([hex, name]) => <div key={hex}><div className="aspect-[4/3] rounded-2xl border border-[#351303]/10" style={{ backgroundColor: hex }} /><p className="mt-3 text-xs font-semibold text-[#351303]">{hex}</p><p className="mt-1 text-[11px] text-[#9a7057]">{name}</p></div>)}
              </div>
            </div>
            <div className="rounded-3xl border border-[#351303]/10 bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7057]">Core components</p>
              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <div className="space-y-3">
                  <button className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#f58a0b] bg-[linear-gradient(180deg,#fba919_0%,#f86706_100%)] px-5 text-base font-bold tracking-[-0.01em] text-white shadow-[0_4px_20px_rgba(166,104,4,0.16)]">
                    <QrCode className="size-5" />
                    Quét QR nhận thưởng
                  </button>
                  <button className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#fba919] bg-white px-5 text-base font-bold tracking-[-0.01em] text-[#f5780b] shadow-[0_4px_20px_rgba(166,104,4,0.16)]">
                    <QrCode className="size-5" />
                    Quét QR nhận thưởng
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="flex h-14 items-center gap-2 rounded-xl border border-[#ede1d4] bg-white px-4 text-[15px] text-[#191d22] shadow-[0_2px_8px_rgba(196,196,196,0.08)]">
                    <UserRound className="size-5 shrink-0 text-[#667085]" />
                    <span>user@example.com</span>
                  </div>
                  <div className="flex h-9 items-start justify-center border-b border-[#f58a0b] px-3 pt-1 text-sm font-bold leading-[1.4] text-[#f58a0b]">
                    Nhận thưởng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CaseSection>

        <CaseSection id="four-oranges-outcome" number="Outcome" title="A complete reward journey" copy="The final design covered the customer journey from registration to withdrawal, supported by reusable components and implementation-ready states.">
          <div className="grid gap-4 sm:grid-cols-3">
            {["End-to-end mobile flow", "Reusable UI system", "Clear reward states"].map((item, index) => <div className="rounded-3xl border border-[#351303]/10 bg-white/60 p-6" key={item}><span className="text-sm text-[#f86706]">0{index + 1}</span><p className="mt-10 font-[var(--font-affina-heading)] text-2xl leading-tight">{item}</p></div>)}
          </div>
        </CaseSection>

        <section className="flex flex-col gap-8" id="four-oranges-next">
          <div><SectionLabel>Next projects</SectionLabel><h2 className="mt-7 font-[var(--font-heading)] text-[26px] font-normal leading-[1.2] tracking-normal sm:text-[30px]">Keep exploring the work</h2></div>
          {nextProjects[0] && <NextProjectCard project={nextProjects[0]} featured />}
          <div className="grid gap-5 md:grid-cols-2">{nextProjects.slice(1).map((project) => <NextProjectCard project={project} key={project.title} />)}</div>
        </section>
      </div>
    </main>
  );
}
