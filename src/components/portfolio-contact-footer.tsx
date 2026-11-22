"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";
import styles from "./portfolio-contact-footer.module.css";

const FloatingToolsWater = dynamic(
  () => import("./floating-tools-water").then((module) => module.FloatingToolsWater),
  { ssr: false }
);

export function PortfolioContactFooter() {
  const footer = useRef<HTMLElement>(null);
  const [nearFooter, setNearFooter] = useState(false);
  useEffect(() => {
    const anchor = footer.current;
    if (!anchor) return;
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), { rootMargin: "800px 0px" });
    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" ref={footer} aria-labelledby="contact-heading" className={styles.footer}>
      {nearFooter && <div className={styles.scene}><FloatingToolsWater /></div>}
      <div className={styles.content}>
        <h2 id="contact-heading" className="sr-only">Let’s work together</h2>
        <div className={styles.ctaRoot}>
        <a href={DATA.contact.social.email.url} data-analytics-contact="email" className={styles.cta}>
          <span>Let’s work together</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        </div>

      </div>
    </footer>
  );
}
