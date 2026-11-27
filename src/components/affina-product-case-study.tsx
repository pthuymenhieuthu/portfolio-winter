"use client";

import { ExternalLink, Star } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import { AffinaMockupHero } from "@/components/affina-mockup-hero";
import { projectMeshPalettes } from "@/components/project-mesh-gradient";
import { CaseStudyNextProjects } from "@/components/case-study-next-projects";
import { CollaborationScene, FounderVisionScene } from "./affina-showcase-scenes";
import { AffinaFamilyReview } from "./affina-family-review";
import { AffinaHealthcareShowcase } from "./affina-healthcare-showcase";
import { CaseStudyBubbleLink } from "./case-study-bubble-card";
import { SilverDesktop, SilverPhone } from "./affina-brand-application";
import styles from "./affina-showcase.module.css";
import { affinaCaseContext } from "@/data/affina-case-context";

const consultation = [
  { title:"Survey", detail:"Insurance type → Insured person → Monthly budget → Preferred insurers.", image:"03-monthly-budget", caption:"Four focused questions about the coverage the customer needs." },
  { title:"Recommend", detail:"Three best-fit plans with essential details upfront.", image:"06-recommendations", caption:"Recommended plans with price, core benefits and reasons to consider them." },
  { title:"Compare", detail:"Benefits and prices side by side before choosing a plan.", image:"07-comparison", caption:"A comparison table keeps benefit labels beside the selected plans." },
];

const consultationUrl = "https://www.affina.com.vn/ai/goi-y-bao-hiem/buoc-1/?platform=webview&affina_set_lang=en";

export function AffinaCaseStudyContact() {
  return <section className={styles.contact}><h2>Get in touch</h2><p>Excited to collaborate! Email me at <a href="mailto:phuongthuy101222@gmail.com">phuongthuy101222@gmail.com</a></p></section>;
}

export function AffinaPlayground() {
  return <section className={styles.playgroundSection} id="affina-playground" aria-labelledby="affina-playground-title">
    <div className={styles.playground}>
    <h2 className={styles.heading} id="affina-playground-title">Prototype Playground</h2>
    <div className={styles.liveDevice}>
      <div className={styles.deviceBar} aria-hidden="true"><i/><i/><i/></div>
      <iframe className={styles.liveFrame} src="/api/affina-preview/goi-y-bao-hiem/buoc-1/?platform=webview" title="Affina AI insurance consultation" loading="lazy" />
    </div>
    </div>
    <CaseStudyBubbleLink className={styles.projectCta} href={consultationUrl} target="_blank" rel="noopener noreferrer">Open Affina AI →</CaseStudyBubbleLink>
  </section>;
}

export function AffinaProductCaseStudy() {
  const familyDesktop = useRef<HTMLDivElement>(null);
  const consultationGrid = useRef<HTMLDivElement>(null);
  const [consultationDevice, setConsultationDevice] = useState<{width:number;height:number}>();
  const [familyDeviceHeight, setFamilyDeviceHeight] = useState<number>();
  useLayoutEffect(() => {
    const element = familyDesktop.current;
    if (!element) return;
    const resize = () => setFamilyDeviceHeight(element.getBoundingClientRect().height);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const phone = consultationGrid.current?.firstElementChild?.firstElementChild;
    if (!phone) return;
    const resize = () => { const {width,height}=phone.getBoundingClientRect(); setConsultationDevice({width,height}); };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(phone);
    return () => observer.disconnect();
  }, []);
  return <main className={styles.page}>
    <ProjectCaseStudyHero id="affina-product-overview" title="Affina — Product Design" titleLines={["Affina —", "Product Design"]} role="Product Designer" scope="AI consultation, healthcare, family insurance" status="Design exploration" outcome="Web and mobile interfaces" colors={projectMeshPalettes.affina} background={<AffinaMockupHero/>} appearance="light" summary="AI-assisted insurance consultation, healthcare discovery, and family insurance purchase across app and web." links={[{href:"https://www.affina.com.vn/ai/",label:"Affina AI",icon:"website"}]}/>
    <div className={styles.body}>
      <div className={styles.stack}>
        <section className={styles.context} aria-labelledby="affina-context-title"><h2 className={styles.heading} id="affina-context-title">Customer experience context</h2><dl className={styles.contextNumbers}><div><dt>Rated responses</dt><dd>{affinaCaseContext.experience.responses.toLocaleString("en-US")}</dd></div><div><dt>Average rating</dt><dd className={styles.ratingValue}><Star className={styles.ratingStar} aria-hidden="true"/>{affinaCaseContext.experience.mean}<small>/5</small></dd></div><div><dt className={styles.ratingLabel} aria-label="Rated 1–2 stars">Rated 1–2 <Star aria-hidden="true"/></dt><dd>{affinaCaseContext.experience.dissatisfiedPercent}%</dd></div></dl><p className={styles.source}>{affinaCaseContext.experience.source} · {affinaCaseContext.experience.period}<br/>{affinaCaseContext.experience.collection}. App-wide feedback; these figures do not measure the consultation screens below.</p></section>
        <section className={styles.row} aria-labelledby="affina-founder-vision-title">
          <div className={styles.copy}><h2 id="affina-founder-vision-title">The founder’s vision</h2><p>The founder wanted to use AI to help people choose insurance and improve the overall customer experience. This was a new direction for Affina.</p></div>
          <FounderVisionScene/>
        </section>
        <section id="affina-ai" aria-labelledby="affina-ai-title">
          <div className={styles.row}>
            <div className={styles.copy}><h2 id="affina-ai-title">AI-assisted insurance consultation</h2><p>Affina wanted to move more of its insurance journey online. Instead of simply digitising the sales form, we built an AI-assisted journey that narrowed choices, recommended suitable plans, and made comparison easier.</p></div>
            <div className={styles.copy}><blockquote>“I worked with the Product, AI and IT teams, including business analysts and developers, to map the consultation flow, design the screens, and refine the UI in code.”</blockquote></div>
          </div>
          <div className={`${styles.row} ${styles.role}`}>
            <div className={styles.copy}><h2>From flow to interface</h2><p>I owned the journey from flow definition to responsive UI delivery. My scope covered the experience around recommendations, not the ranking model behind them.</p></div><CollaborationScene/>
          </div>
          <a className={styles.textLink} href="https://schema-wreath-37837045.figma.site" target="_blank" rel="noopener noreferrer">View the consultation flow <ExternalLink size={14} style={{display:"inline",marginLeft:6}}/></a>
          <div className={styles.flow} aria-label="Consultation flow">{consultation.map((step,i)=><div className={styles.flowStep} key={step.title}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.detail}</p></div>)}</div>
          <div className={styles.screenGrid} ref={consultationGrid}>{consultation.map(step=><figure key={step.image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <SilverPhone src={`/assets/affina/ai-journey/${step.image}.webp`} alt={`Affina ${step.title.toLowerCase()} screen`}/><figcaption>{step.caption}</figcaption>
          </figure>)}</div>
        </section>
        <section id="affina-healthcare" aria-labelledby="affina-healthcare-title">
          <div className={styles.sectionIntro}><h2 className={styles.heading} id="affina-healthcare-title">Healthcare e-commerce</h2><p>The founder wanted discovering healthcare services to feel as familiar as browsing a shopping app. I reviewed e-commerce UI patterns and insurance design references, including Generali’s design system, then explored different ways to organize and present Affina’s services.</p></div>
          <AffinaHealthcareShowcase referenceDevice={consultationDevice}/>
        </section>
        <section id="affina-family" aria-labelledby="affina-family-title">
          <div className={styles.copy}><h2 id="affina-family-title">Family insurance purchase</h2><p className={styles.intro}>Two review surfaces for a family insurance purchase: Affina Pro for sales-assisted consultation, and Web App for customers buying coverage for multiple family members under one policy.</p></div>
          <div className={styles.family}>
            <figure><h3>Affina Pro</h3><p>Sales-assisted consultation</p><div className={styles.familyPhone} style={{height:familyDeviceHeight,width:familyDeviceHeight ? familyDeviceHeight*390/844 : undefined}}><SilverPhone><AffinaFamilyReview/></SilverPhone></div></figure>
            <figure><h3>Web App</h3><p>Self-service family purchase</p><div ref={familyDesktop}><SilverDesktop className={styles.familyDesktop}><AffinaFamilyReview web/></SilverDesktop></div></figure>
          </div>
        </section>
      </div>
      <AffinaPlayground/>
      <div className={styles.footer}><CaseStudyNextProjects currentHref="/blog/affina-product-design" id="affina-product-next"/></div>
    </div>
    <AffinaCaseStudyContact/>
  </main>;
}
