import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Braces, Check, Code2, FileText, UsersRound } from "lucide-react";
import { CaseStudyBubbleCard } from "@/components/case-study-bubble-card";
import styles from "./medhunt-case-study.module.css";
import { MedhuntPrototype } from "./medhunt-prototype";

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

/** Deliberately a replaceable composition frame, not a finished illustration. */
function TeamIllustrationDraft() {
  return <figure className={styles.illustration} aria-label="Agree on the rules, prototype the behavior, and build from the reference">
    <CaseStudyBubbleCard staticFilm className={styles.illustrationFrame}>
      <div className={styles.scenes}>
        <div className={styles.scene}>
          <div className={styles.sketch} aria-hidden="true">
            <UsersRound size={38} strokeWidth={1.2} />
            <span className={styles.sketchLabel}>BA + designer</span>
            <div className={styles.ruleCard}><FileText size={18} strokeWidth={1.2} /><span>Business rule</span><Check size={17} strokeWidth={1.3} /></div>
          </div>
          <p>Agree on the rules</p>
          <ArrowRight className={styles.sceneArrow} size={22} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <div className={styles.scene}>
          <div className={styles.sketch} aria-hidden="true">
            <Code2 size={32} strokeWidth={1.2} />
            <span className={styles.sketchLabel}>Designer · HTML prototype</span>
            <div className={styles.statePair}><div>State A</div><ArrowRight size={17} strokeWidth={1.2} /><div>State B</div></div>
          </div>
          <p>Prototype the behavior</p>
          <ArrowRight className={styles.sceneArrow} size={22} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <div className={styles.scene}>
          <div className={styles.sketch} aria-hidden="true">
            <Braces size={32} strokeWidth={1.2} />
            <span className={styles.sketchLabel}>Frontend developer</span>
            <div className={styles.referencePair}><div><FileText size={20} strokeWidth={1.2} /><span>Prototype</span></div><div><Code2 size={20} strokeWidth={1.2} /><span>Code</span></div></div>
          </div>
          <p>Build from the reference</p>
        </div>
      </div>
    </CaseStudyBubbleCard>
  </figure>;
}

export function MedhuntCaseStudy() {
  return <main className={styles.page}>
    <header className={styles.hero} id="medhunt-hero" data-project-hero="true">
      <Image src="/assets/project-thumbnails/medhunt-monitor.png" alt="" fill priority unoptimized
        sizes="100vw" className={styles.heroImage} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}>
        <h1>MedHunt — Making the next hiring step visible</h1>
        <p className={styles.intro}>A healthcare recruitment dashboard that shows recruiters where each candidate stands and what comes next.</p>
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
          <div className={styles.learningCopy}>
            <p className={styles.takeaway}>A clickable prototype gave our team a concrete way to discuss what the interface should do before implementation.</p>
            <p className={styles.story}>At first, I edited the UI directly in the shared codebase. Some of my edits affected existing logic while the frontend developer and business analyst were still refining it, and I had to pull updates frequently to keep up. We agreed on a different workflow. I clarified the business rules with the BA, used Claude to build a standalone, clickable HTML prototype, and shared it with the frontend developer as a reference for implementation.</p>
          </div>
          <TeamIllustrationDraft />
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/#projects">Back to projects <ArrowRight size={17} aria-hidden="true" /></Link>
        <a href="mailto:phuongthuy101222@gmail.com">Get in touch <ArrowRight size={17} aria-hidden="true" /></a>
      </footer>
    </div>
  </main>;
}
