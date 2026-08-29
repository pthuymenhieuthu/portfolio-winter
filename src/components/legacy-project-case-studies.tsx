"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

type Theme = {
  page: string;
  ink: string;
  muted: string;
  accent: string;
  hero: string;
  heroText?: string;
};

type ImageItem = {
  src: string;
  alt: string;
  ratio?: string;
  fit?: "cover" | "contain";
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

const nextProjects = ["Affina", "Zoan AI", "TrueProfit"]
  .map((name) =>
    (DATA.projects as readonly CaseProject[]).find((project) =>
      project.title.toLowerCase().includes(name.toLowerCase())
    )
  )
  .filter((project): project is CaseProject => Boolean(project));

const themes = {
  graphics: {
    page: "#f2fffb",
    ink: "#06272d",
    muted: "#527071",
    accent: "#01c9e0",
    hero:
      "radial-gradient(circle at 18% 18%, #5ff2c9 0%, transparent 30%), radial-gradient(circle at 82% 24%, #2798d3 0%, transparent 30%), linear-gradient(135deg, #06272d 0%, #01c9e0 58%, #5ff2c9 100%)",
  },
  pizzy: {
    page: "#faf5ff",
    ink: "#24133f",
    muted: "#756386",
    accent: "#c1b5f8",
    hero:
      "radial-gradient(circle at 18% 18%, #c1b5f8 0%, transparent 30%), radial-gradient(circle at 82% 24%, #eadcff 0%, transparent 28%), linear-gradient(135deg, #24133f 0%, #c1b5f8 42%, #f1bdfc 78%, #eadcff 100%)",
  },
  cake: {
    page: "#fff6fb",
    ink: "#2b1425",
    muted: "#76586f",
    accent: "#ff56cf",
    hero:
      "radial-gradient(circle at 18% 18%, #ff56cf 0%, transparent 30%), radial-gradient(circle at 82% 24%, #ecd974 0%, transparent 30%), linear-gradient(135deg, #2b1425 0%, #ff56cf 50%, #ecd974 100%)",
  },
  zanzan: {
    page: "#fff3fb",
    ink: "#23072d",
    muted: "#76546f",
    accent: "#e034a9",
    hero:
      "linear-gradient(135deg, #e034a9 0%, #991767 59%, #2f0373 100%)",
  },
} satisfies Record<string, Theme>;

function BlobCutout({
  fill,
  position,
}: {
  fill: string;
  position: "top" | "bottom";
}) {
  const isTop = position === "top";

  return (
    <svg
      aria-hidden="true"
      className={
        isTop
          ? "pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:w-[1640px]"
          : "pointer-events-none absolute bottom-[-220px] left-1/2 -z-10 w-[1200px] max-w-none -translate-x-1/2 sm:bottom-[-260px] sm:w-[1640px]"
      }
      fill="none"
      height={isTop ? 422 : 702}
      viewBox={isTop ? "0 0 1440 422" : "0 0 1440 702"}
      width={1440}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={
          isTop
            ? "M1085.09 250.287C1215.46 436.116 1645.28 428.276 1690.52 416.582L1635.97 -282L-346 -127.227L-308.024 359.076C-75.943 427.41 420.709 482.913 550.666 158.254C941.969 194.444 1012.09 47.8557 1074.47 -20.4985C1029.03 65.5779 1023.56 162.589 1085.09 250.287Z"
            : "M316.649 214.217C201.136 18.8014 -227.988 -6.84558 -274 1.29169V702H1714V214.217C1487.94 128.022 997.12 34.0215 842.281 347.577C454.983 281.033 373.663 421.717 306.146 485.006C358.159 402.73 371.162 306.439 316.649 214.217Z"
        }
        fill={fill}
      />
    </svg>
  );
}

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
      className="relative isolate flex min-h-[760px] items-center justify-center overflow-visible px-6 text-center text-white sm:min-h-[800px]"
      style={{ background: theme.hero }}
    >
      <BlobCutout fill={theme.page} position="top" />
      <BlobCutout fill={theme.page} position="bottom" />
      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center gap-5">
        <p className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
          {date}
        </p>
        <h1 className="font-[var(--font-heading)] text-[44px] font-bold leading-[1.05] tracking-normal sm:text-[64px]">
          {title}
        </h1>
        {summary && (
          <p className="max-w-[620px] text-base leading-7 text-white/80 sm:text-lg">
            {summary}
          </p>
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
      className="w-fit rounded-lg px-3 py-1.5 text-sm text-white"
      style={{ backgroundColor: theme.ink }}
    >
      {children}
    </span>
  );
}

function CaseSection({
  title,
  label,
  children,
  theme,
}: {
  title: string;
  label?: string;
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12">
      <div className="flex flex-col gap-7">
        {label && <SectionLabel theme={theme}>{label}</SectionLabel>}
        <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
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
      className="space-y-5 text-lg leading-8 sm:text-xl sm:leading-[1.6]"
      style={{ color: theme.muted }}
    >
      {children}
    </div>
  );
}

function CaseImage({
  src,
  alt,
  ratio = "aspect-[16/9]",
  fit = "cover",
}: ImageItem) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <ImageZoom>
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={900}
          unoptimized
          className={cn(
            "w-full rounded-2xl object-top",
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
          className="border-t py-4 text-base leading-7"
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
        "group block overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.2fr_0.9fr] md:items-stretch"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"
        )}
        style={{ backgroundColor: `${theme.accent}18` }}
      >
        {(project.video || project.image) && (
          <Image
            src={project.video || project.image || ""}
            alt={project.title}
            width={1200}
            height={675}
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
      <div className="flex flex-col justify-between gap-10 p-7 sm:p-8">
        <div>
          <p
            className="text-sm font-bold uppercase tracking-[0.12em]"
            style={{ color: theme.accent }}
          >
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
          <p className="mt-4 text-base leading-7" style={{ color: theme.muted }}>
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span
              className="rounded-full px-3 py-1.5 text-xs"
              key={tag}
              style={{ backgroundColor: `${theme.accent}14`, color: theme.ink }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function NextProjectsSection({ theme }: { theme: Theme }) {
  return (
    <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-5">
        <SectionLabel theme={theme}>Next projects</SectionLabel>
        <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
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
  title,
  date,
  summary,
  theme,
  children,
}: {
  title: string;
  date: string;
  summary?: string;
  theme: Theme;
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen font-sans"
      style={{ backgroundColor: theme.page, color: theme.ink }}
    >
      <CaseHero date={date} summary={summary} theme={theme} title={title} />
      <section
        className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-28 px-5 py-24 before:absolute before:inset-x-[-50vw] before:inset-y-0 before:-z-10 sm:gap-32 sm:px-8 lg:gap-36 lg:py-36"
        style={{ backgroundColor: theme.page } as React.CSSProperties}
      >
        {children}
        <NextProjectsSection theme={theme} />
      </section>
    </main>
  );
}

export function GraphicsCaseStudy() {
  const theme = themes.graphics;

  return (
    <CaseShell
      date="2023-2025"
      summary="Marketing visuals for e-commerce & education products."
      theme={theme}
      title="Marketing Graphics — Campaign & Social Design"
    >
      <CaseSection label="Overview" theme={theme} title="Overview">
        <BodyText theme={theme}>
          <p>A collection of marketing graphics for:</p>
          <p>
            1️⃣ <strong>TikTok Shop</strong> — Community & promotional visuals
            <br />
            2️⃣ <strong>Language Learning Apps</strong> — Product highlight &
            seasonal banners
          </p>
          <p>Focused on clarity, conversion, and eye-catching storytelling.</p>
        </BodyText>
      </CaseSection>

      <CaseSection
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

      <CaseSection label="Seasonal" theme={theme} title="Seasonal Campaign Assets">
        <ImageGrid
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845920/tet_2_hqhp3d.png",
              alt: "Tet campaign graphic",
              ratio: "aspect-[4/3]",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845920/tet_1_gxxab9.png",
              alt: "Tet campaign graphic",
              ratio: "aspect-[4/3]",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845922/tet_03_yzwbio.png",
              alt: "Tet campaign graphic",
              ratio: "aspect-[4/3]",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764845953/02_ens8yq.jpg",
              alt: "Zalo OA campaign graphic",
              ratio: "aspect-[4/3]",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        label="02"
        theme={theme}
        title="Language Learning Apps — Promotional Visuals"
      >
        <ImageGrid
          images={[
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755849/HSK_soiciu.png",
              alt: "HSK app promotional visual",
              ratio: "aspect-[4/3]",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764755845/android_banner-tr%C3%B9m_japanese_cyfugx.png",
              alt: "Japanese app promotional visual",
              ratio: "aspect-[4/3]",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756721/Frame_2147225634_auzyip.png",
              alt: "Language app product highlight",
              ratio: "aspect-[4/3]",
            },
            {
              src: "https://res.cloudinary.com/dqtfjvkok/image/upload/v1764756718/Frame_2147225633_jn2vkl.png",
              alt: "Language app product highlight",
              ratio: "aspect-[4/3]",
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
      date="2025-08"
      summary="Pizzy is a mobile application that helps users manage shared budgets with friends in a simple, engaging, and social way"
      theme={theme}
      title="Pizzy - Finance Management App"
    >
      <CaseImage alt="Pizzy intro gif" fit="contain" ratio="h-auto" src="/pizzy.gif" />

      {[
        [
          "About",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758327371/04_isp8w7.png",
        ],
        [
          "Research",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758327371/03_zyelt0.png",
        ],
        [
          "How Might We",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758342172/02_snxsdc.png",
        ],
        [
          "Information Architecture",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758332011/01_coe1qv.png",
        ],
        [
          "How it works",
          "https://res.cloudinary.com/dqtfjvkok/image/upload/v1758339821/Frame_427318364_qvmrbo.png",
        ],
      ].map(([title, src]) => (
        <CaseSection key={title} label={title} theme={theme} title={title}>
          <CaseImage alt={title} fit="contain" ratio="h-auto" src={src} />
        </CaseSection>
      ))}

      <CaseSection label="Showcase" theme={theme} title="Showcase">
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

      <CaseSection label="Prototype" theme={theme} title="Prototype">
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
      date="2025-05"
      summary="A take-home assignment for the Product Designer position at Cake, focusing on creating a rounded-up savings feature that helps users save effortlessly while keeping their balances neat."
      theme={theme}
      title="CakeBank - Rounded-Up Savings Feature"
    >
      <CaseSection label="Overview" theme={theme} title="Overview">
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
            <p className="text-sm uppercase tracking-[0.12em]" style={{ color: theme.accent }}>
              My role
            </p>
            <p className="mt-3 text-base leading-6">Product Designer</p>
          </div>
          <div className="border-t pt-5" style={{ borderColor: `${theme.ink}1a` }}>
            <p className="text-sm uppercase tracking-[0.12em]" style={{ color: theme.accent }}>
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
        label="How Might We"
        theme={theme}
        title="How might we help users feel more satisfied and in control by making their account balance look “clean” while also encouraging effortless savings?"
      >
        <CaseImage
          alt="CakeBank how might we"
          fit="contain"
          ratio="h-auto"
          src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1759894994/Group_67_ur7rmg.png"
        />
      </CaseSection>

      <CaseSection label="Research" theme={theme} title="Understanding the Context">
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

      <CaseSection label="Goals" theme={theme} title="Design Goals">
        <BulletList
          items={[
            <>
              Help users <strong>save without friction</strong> through
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

      <CaseSection label="User Flow" theme={theme} title="User Flow">
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

      <CaseSection label="Visual Design" theme={theme} title="Visual Design">
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

      <CaseSection label="Usability Testing" theme={theme} title="Usability Testing">
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

      <CaseSection label="Results" theme={theme} title="Results">
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

      <CaseSection label="Reflection" theme={theme} title="Reflection">
        <BodyText theme={theme}>
          <p>
            This challenge taught me how small design decisions — like rounding
            up numbers — can connect deeply with users’ emotions and behavior.
          </p>
          <p>
            It also reinforced my belief that{" "}
            <strong>
              good design is not about adding features, but about removing
              friction and inspiring action
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
      date="2024-09-20"
      summary="Digital innovation to preserve and reimagine folk games through an interactive and culturally meaningful platform."
      theme={theme}
      title="Lollypop Designathon 2024 | UX/UX Challenge"
    >
      <CaseImage
        alt="ZanZan intro"
        fit="contain"
        ratio="h-auto"
        src="https://res.cloudinary.com/dqtfjvkok/image/upload/v1758358132/1ZaN0fd1UHesnkGpQ5TxYCoJbo_v9qdeo.avif"
      />

      <CaseSection label="Context" theme={theme} title="Context">
        <BodyText theme={theme}>
          <p>
            Vietnam’s traditional culture faces the risk of fading due to
            globalization, modern entertainment, and declining youth interest. At
            the same time, folk games still hold strong nostalgic and social
            value, attracting young people when presented in engaging ways. This
            creates both an urgent need and opportunity to preserve and
            reimagine folk games through digital innovation.
          </p>
        </BodyText>
      </CaseSection>

      <CaseSection label="Problem" theme={theme} title="Problem Statement">
        <BodyText theme={theme}>
          <p>
            Young people today are drawn to digital-first, interactive, and
            social experiences. Traditional folk games, while culturally
            valuable, risk being forgotten if they remain offline-only and
            disconnected from modern life.
          </p>
          <p>
            Design Challenge: Build a solution that both preserves and
            revitalizes folk games, making them accessible, engaging, and
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

      <CaseSection label="Research" theme={theme} title="Research">
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

      <CaseSection label="Persona" theme={theme} title="User Persona & Journey">
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

      <CaseSection label="Ideation" theme={theme} title="Ideation">
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

      <CaseSection label="Solution" theme={theme} title="Solution: Zân Zan Platform">
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

      <CaseSection label="Design System" theme={theme} title="Design System">
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

      <CaseSection label="Prototype" theme={theme} title="UI Design & Prototype">
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
