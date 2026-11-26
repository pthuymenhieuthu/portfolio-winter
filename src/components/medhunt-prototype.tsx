"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./medhunt-prototype.module.css";

export function MedhuntPrototype() {
  const container = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    const sync = () => setScale(element.getBoundingClientRect().width / 640);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section id="medhunt-prototype" className={styles.section} aria-label="MedHunt interactive prototype">
    <div ref={container} className={styles.container}>
      <div className={styles.computer} style={{ transform: `scale(${scale})` }}>
        <div className={styles.frame}>
          <div className={styles.screen} data-lenis-prevent>
            <iframe src="/assets/medhunt/prototype/Main.dc.html" title="MedHunt interactive prototype"
              loading="lazy" className={styles.prototype} />
          </div>
        </div>
        <div className={styles.stand} aria-hidden="true" />
        <div className={styles.foot} aria-hidden="true" />
      </div>
    </div>
  </section>;
}
