"use client";

import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import { AffinaMockupHero } from "@/components/affina-mockup-hero";
import { projectMeshPalettes } from "@/components/project-mesh-gradient";
import { CaseStudyNextProjects } from "@/components/case-study-next-projects";
import { AffinaCaseStudyContact } from "./affina-product-case-study";
import { AudienceScene, LeadScene, SystemUpdateScene } from "./affina-showcase-scenes";
import styles from "./affina-showcase.module.css";
import { affinaCaseContext } from "@/data/affina-case-context";
import { AffinaTokenComparison } from "./affina-token-comparison";
import { AffinaBrandApplication } from "./affina-brand-application";
import { CaseStudyBubbleLink } from "./case-study-bubble-card";

export function AffinaBrandCaseStudy() {
  return <main className={styles.page}>
    <ProjectCaseStudyHero id="affina-brand-overview" title="Affina — Brand Rebuild" titleLines={["Affina —", "Brand Rebuild"]} role="Brand & Product Designer" scope="Logo, brand guidelines, design system" status="Design exploration" outcome="Identity across app and website" colors={projectMeshPalettes.affina} background={<AffinaMockupHero/>} appearance="light" summary="I rebuilt Affina’s visual identity and design system as the company brought insurance, healthcare, and finance together under one brand. I designed the new logo, developed the brand guidelines, and worked with developers to carry the new identity into the product."/>
    <div className={styles.body}>
      <div className={styles.stack}>
        <section className={styles.row} aria-labelledby="affina-lead-title">
          <div className={styles.copy}><h2 id="affina-lead-title">Working directly with my lead</h2><blockquote>“I worked directly with my lead from the start to agree on who we were designing for, how Affina should feel, and how that direction would carry through to the app and website.”</blockquote></div><LeadScene/>
        </section>
        <section className={`${styles.row} ${styles.reverse}`} aria-labelledby="affina-audience-title">
          <div className={styles.copy}><span className={styles.label}>Primary audience · Young and middle-aged women</span><h2 id="affina-audience-title">Who we designed for</h2><p>The redesign focused on young and middle-aged women making decisions about insurance, healthcare, and finances for themselves and their families. I chose a vivid pink to give the refreshed identity a brighter, more energetic feel.</p><dl className={styles.audienceNumbers}><div><dt>Median buyer age</dt><dd>{affinaCaseContext.retail.medianBuyerAge}</dd></div><div><dt>Insured under 18</dt><dd>{affinaCaseContext.retail.insuredUnder18Percent}%</dd></div></dl><small className={styles.source}>{affinaCaseContext.retail.source} · {affinaCaseContext.retail.asOf}</small></div><AudienceScene/>
        </section>
        <section aria-labelledby="affina-identity-title">
          <div className={styles.row}><div className={styles.copy}><h2 id="affina-identity-title">Rebuilding the Affina identity</h2></div><div className={styles.copy}><p>Protection was already part of Affina’s identity. I carried that idea into the redesign through three leaf-like shapes that form an ‘A’ and suggest a shield. The three shapes represent insurance, healthcare, and finance.</p></div></div>
          <div className={styles.logoPair}>
            <figure className={styles.logoFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/affina/brand-rebuild/previous-identity-full.svg" alt="Previous Affina logo with its original Vietnamese tagline from the 2024 brand guidelines"/><figcaption>Previous identity</figcaption></figure>
            <figure className={styles.logoFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/affina/brand-wordmark-after.svg" alt="New Affina vivid pink wordmark"/><figcaption>New identity</figcaption></figure>
          </div>
          <div className={styles.logoBreakdown}>
            <div><span>Insurance<br/>Healthcare<br/>Finance</span><p>Three leaf-like shapes</p></div><b aria-hidden="true">→</b>
            <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/affina/brand-logomark-after.svg" alt="Three shapes forming an A and a shield"/><p>‘A’ and shield</p></div><b aria-hidden="true">→</b>
            <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img style={{maxWidth:230}} src="/assets/affina/brand-wordmark-after.svg" alt="Complete Affina wordmark"/><p>Affina</p></div>
          </div>
          <div className={styles.paper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.guideline} src="/assets/affina/color-after.png" alt="Affina brand color system from the new visual guidelines" loading="lazy"/></div>
        </section>
        <section id="affina-design-system" aria-labelledby="affina-design-system-title">
          <div className={styles.sectionIntro}><h2 className={styles.heading} id="affina-design-system-title">Rebuilding the design system</h2><p>I worked closely with developers to rebuild Affina’s design system. We agreed on a naming convention in Figma and used it in the JSON exports I shared with the team. Whenever I updated the system, I documented what changed and let developers know so they could keep the implementation in sync.</p></div>
          <AffinaTokenComparison/>
          <div className={styles.systemUpdate}><SystemUpdateScene/></div>
        </section>
        <section aria-labelledby="affina-mascot-title">
          <div className={styles.copy}><h2 id="affina-mascot-title">Giving Affina a character</h2><p className={styles.intro}>I explored how a mascot could make Affina feel more approachable. Here’s the concept I developed alongside the version the founder selected.</p></div>
          <div className={styles.mascots}>
            <figure className={styles.mascot}><div className={styles.mascotFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/affina/brand-rebuild/mascot-concept.png" alt="My mascot concept: a waving white guardian with wings and a pink shield" width="1280" height="1280" loading="lazy"/>
            </div><figcaption>My mascot concept</figcaption></figure>
            <figure className={styles.mascot}><div className={styles.mascotFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/affina/brand-rebuild/mascot-nova.png" alt="FINA NOVA, the founder-selected mascot, waving with a shield and pink and blue headset" width="1500" height="1800" loading="lazy"/>
            </div><figcaption>Founder-selected mascot · FINA NOVA</figcaption></figure>
          </div>
        </section>
        <section aria-labelledby="affina-application-title">
          <AffinaBrandApplication/>
          <CaseStudyBubbleLink className={styles.projectCta} href="/blog/affina-product-design#affina-ai">Explore Affina — Product Design →</CaseStudyBubbleLink>
        </section>
      </div>
      <div className={styles.footer}><CaseStudyNextProjects currentHref="/blog/affina" id="affina-brand-next"/></div>
    </div>
    <AffinaCaseStudyContact/>
  </main>;
}
