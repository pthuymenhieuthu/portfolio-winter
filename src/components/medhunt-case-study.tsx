import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseStudyBubbleCard } from "@/components/case-study-bubble-card";
import styles from "./medhunt-case-study.module.css";
import { MedhuntPrototype } from "./medhunt-prototype";
import { Icons } from "@/components/icons";

/** Crops the original product capture in CSS, preserving the source for later motion. */
function ProductCrop({ src, alt, crop, priority = false }: {
  src: string;
  alt: string;
  crop: { x: number; y: number; width: number; height: number };
  priority?: boolean;
}) {
  return <div className={styles.crop} style={{ aspectRatio: `${crop.width} / ${crop.height}` }}>
    <Image src={src} alt={alt} width={1440} height={900} priority={priority} unoptimized
      draggable={false} className={styles.sourceImage}
      style={{ width: `${1440 / crop.width * 100}%`, left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%` }}
      sizes="(min-width: 1440px) 900px, 70vw" />
  </div>;
}

function ShowcaseCopy({ id, title, children }: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return <div className={styles.showcaseCopy}>
    <h2 id={id}>{title}</h2>
    <div className={styles.copy}>{children}</div>
  </div>;
}

const teamStory = [
  {
    title: "When UI edits overlapped with evolving logic",
    copy: "At first, I edited the UI directly in the shared codebase while the frontend developer and BA were still refining the logic. Some of my edits affected that logic, and I had to pull updates frequently to keep up.",
    image: "01-shared-code",
    alt: "The BA, designer and frontend developer making changes around the same shared code window, with edits overlapping between UI and logic.",
  },
  {
    title: "Agree on the rules",
    copy: "We agreed on a different workflow. I clarified the business rules with the BA before translating them into UI behavior.",
    image: "02-agree-on-rules",
    alt: "A BA and designer pointing at the same business rule: a passed interview leads to creating an offer.",
  },
  {
    title: "Prototype the behavior",
    copy: "I used Claude to build a standalone, clickable HTML prototype showing how the interface should respond to those rules.",
    image: "03-prototype-behavior",
    alt: "Two concrete MedHunt case states: interview with the record-result action, then passed interview with the create-offer action.",
  },
  {
    title: "Build from the reference",
    copy: "I shared the prototype with the frontend developer as a reference for implementation.",
    image: "04-build-reference",
    alt: "A frontend developer working with the HTML prototype and a code window open side by side.",
  },
] as const;

export function MedhuntCaseStudy() {
  return <main className={styles.page}>
    <header className={styles.hero} id="medhunt-hero" data-project-hero="true">
      <Image src="/assets/project-thumbnails/medhunt-monitor.png" alt="" fill priority unoptimized
        sizes="100vw" className={styles.heroImage} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}>
        <h1>MedHunt — Making the next hiring step visible</h1>
        <p className={styles.intro}>A healthcare recruitment dashboard that shows recruiters where each candidate stands and what comes next.</p>
        <div className={styles.heroActions}>
          <a href="https://medhunts.com/" target="_blank" rel="noreferrer"
            aria-label="Open Live project in a new tab"
            className="project-hero-glass-link project-hero-glass-link--silver inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium text-[#17324a] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3BA0FF]">
            <Icons.globe className="size-4 shrink-0" aria-hidden="true" />
            Live project
          </a>
        </div>
      </div>
    </header>
    <div className={styles.container}>
      <div className={styles.showcases}>
        <section className={styles.showcase} id="medhunt-pipeline" aria-labelledby="medhunt-pipeline-title">
          <div><ShowcaseCopy id="medhunt-pipeline-title" title="See where a candidate stands">
            <p>I designed the pipeline as a step chart so recruiters could see a candidate’s current stage and what comes next at a glance.</p>
          </ShowcaseCopy></div>
          <figure className={styles.visual} data-medhunt-visual="pipeline">
            <CaseStudyBubbleCard staticFilm className={styles.productFrame}>
              <ProductCrop src="/assets/medhunt/screens/pipeline.png"
                alt="MedHunt pipeline: the hiring step chart above candidate rows, with current stage and next milestone visible together."
                crop={{ x: 292, y: 248, width: 1120, height: 398 }} />
            </CaseStudyBubbleCard>
          </figure>
        </section>

        <section className={`${styles.showcase} ${styles.visualFirst}`} id="medhunt-overview" aria-labelledby="medhunt-overview-title">
          <div><ShowcaseCopy id="medhunt-overview-title" title="Put today’s work first">
            <p>We decided which numbers belonged at the top of the overview and how to present them in cards. I used the same table and filter patterns across the workspace so recruiters could recognize the controls from screen to screen.</p>
          </ShowcaseCopy></div>
          <figure className={styles.visual} data-medhunt-visual="overview">
            <CaseStudyBubbleCard staticFilm className={styles.productFrame}>
              <ProductCrop src="/assets/medhunt/screens/dashboard.png"
                alt="MedHunt overview with open requests, active cases and outstanding fees above today’s work and new recruitment requests."
                crop={{ x: 292, y: 264, width: 1120, height: 574 }} />
            </CaseStudyBubbleCard>
          </figure>
        </section>

        <section className={styles.showcase} id="medhunt-recruitment-chart" aria-labelledby="medhunt-chart-title">
          <div><ShowcaseCopy id="medhunt-chart-title" title="See how candidates move through hiring">
            <p>The recruitment funnel shows how candidates are distributed across hiring stages.</p>
          </ShowcaseCopy></div>
          <figure className={`${styles.visual} ${styles.funnelVisual}`} data-medhunt-visual="funnel">
            <CaseStudyBubbleCard staticFilm className={styles.productFrame}>
              <ProductCrop src="/assets/medhunt/screens/fees-funnel.png"
                alt="Recruitment funnel with stage labels, candidate counts and conversion percentages, from selected profiles through warranty completion. Sample data."
                crop={{ x: 866, y: 80, width: 546, height: 410 }} />
            </CaseStudyBubbleCard>
            <figcaption>Sample data</figcaption>
          </figure>
        </section>
      </div>

      <MedhuntPrototype />

      <section className={styles.learning} id="medhunt-team" aria-labelledby="medhunt-team-title">
        <div className={styles.learningHeading}>
          <h2 id="medhunt-team-title">What I learned about working with the team</h2>
        </div>
        <div className={styles.learningContent}>
          {teamStory.map(scene => <article key={scene.image} className={styles.storyScene}>
            <h3>{scene.title}</h3>
            <p>{scene.copy}</p>
            <Image src={`/assets/medhunt/story/${scene.image}.svg`} alt={scene.alt}
              width={1020} height={480} unoptimized className={styles.storySketch}
              sizes="(max-width: 1023px) 90vw, 920px" />
          </article>)}
          <p className={styles.takeaway}>A clickable prototype gave our team a concrete way to discuss what the interface should do before implementation.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/#projects">Back to projects <ArrowRight size={17} aria-hidden="true" /></Link>
        <a href="mailto:phuongthuy101222@gmail.com">Get in touch <ArrowRight size={17} aria-hidden="true" /></a>
      </footer>
    </div>
  </main>;
}
