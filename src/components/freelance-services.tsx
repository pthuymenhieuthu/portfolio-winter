"use client";
import { useState, useRef, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, Clock3, RotateCcw } from "lucide-react";
import { CaseStudyBubbleCard } from "@/components/case-study-bubble-card";
import { DATA } from "@/data/resume";
import styles from "./freelance-services.module.css";

import { freelanceCatalog as catalog } from "@/data/freelance-catalog";

type Category = keyof typeof catalog;

export function FreelanceServices() {
  const [category, setCategory] = useState<Category>("app");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const keys: Category[] = ["app", "landing"];
  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : event.key === "ArrowRight" ? (index + 1) % 2 : event.key === "ArrowLeft" ? (index + 1) % 2 : null;
    if (next === null) return;
    event.preventDefault(); setCategory(keys[next]); tabs.current[next]?.focus();
  };
  return <section id="services" aria-labelledby="services-heading" className={styles.section} data-theme="light">
    <div className={styles.inner}>
      <div className={styles.heading}>
        <div className={styles.eyebrow}>Freelance services</div>
        <h2 id="services-heading">Good things start small.</h2>
        <p>A clear scope, a visual direction and a price before we talk.</p>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Freelance service">
        {keys.map((key, i) => <button key={key} ref={el => { tabs.current[i] = el; }} type="button" role="tab" id={`service-tab-${key}`} aria-controls={`service-panel-${key}`} aria-selected={category === key} tabIndex={category === key ? 0 : -1} onKeyDown={e => moveTab(e, i)} onClick={() => setCategory(key)}>{catalog[key].label}</button>)}
      </div>
      {keys.map(key => <div key={key} role="tabpanel" id={`service-panel-${key}`} aria-labelledby={`service-tab-${key}`} hidden={category !== key}>
        <p className={styles.intro}>{catalog[key].intro}</p>
        <div className={styles.packages}>
          {catalog[key].packages.map(item => {
            const subject = `Freelance inquiry — ${catalog[key].label} / ${item.name}`;
            const body = `Hi Thuy,\n\nI'm interested in ${catalog[key].label} / ${item.name}, starting at $${item.price} USD.\nScope: ${item.scope}\n\nProject overview:\nTarget audience:\nExisting designs or references:\nAvailable copy and assets:\nTarget deadline:\n`;
            return <CaseStudyBubbleCard key={item.name} radius={28} staticFilm className={styles.package}>
              <p className={styles.tier}>{item.name}</p><h3>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.price}><span>Starting at</span><strong>${item.price}</strong><span>USD / project</span></div>
              <p className={styles.scope}>{item.scope}</p>
              <div className={styles.timing}><span><Clock3 size={14} aria-hidden="true" />{item.delivery}</span><span><RotateCcw size={14} aria-hidden="true" />{item.revisions}</span></div>
              <ul className={styles.features}>{item.features.map(feature => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              <p className={styles.excludes}>{item.excludes}</p>
              <a data-analytics-contact="email" href={`mailto:${DATA.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} className={styles.cta}>Discuss {item.name}<ArrowUpRight size={17} aria-hidden="true" /></a>
            </CaseStudyBubbleCard>;
          })}
        </div>
      </div>)}
    </div>
  </section>;
}
