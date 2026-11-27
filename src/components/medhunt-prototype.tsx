"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./medhunt-prototype.module.css";

export function MedhuntPrototype() {
  const container = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const pointer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const area = section.current;
    const frame = iframe.current;
    const cursor = pointer.current;
    if (!area || !frame || !cursor) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let lastPosition: { x: number; y: number } | null = null;
    const hide = () => { delete cursor.dataset.visible; delete cursor.dataset.pressed; };
    const move = (event: PointerEvent, insideFrame = false) => {
      if (!finePointer.matches || event.pointerType === "touch") return hide();
      const box = frame.getBoundingClientRect();
      const x = insideFrame ? box.left + event.clientX * box.width / frame.clientWidth : event.clientX;
      const y = insideFrame ? box.top + event.clientY * box.height / frame.clientHeight : event.clientY;
      lastPosition = { x, y };
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursor.dataset.visible = "true";
      cursor.dataset.flip = String(x > window.innerWidth - 170);
    };
    const parentMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") {
        lastPosition = null;
        return hide();
      }
      lastPosition = { x: event.clientX, y: event.clientY };
      if (event.target instanceof Node && area.contains(event.target)) move(event);
      else hide();
    };
    const frameMove = (event: PointerEvent) => move(event, true);
    // Scrolling moves the content beneath the pointer, not the pointer itself.
    // Keep it visible unless the playground has moved away from that position.
    const scroll = () => {
      if (!lastPosition || !finePointer.matches) return;
      const target = document.elementFromPoint(lastPosition.x, lastPosition.y);
      if (target && area.contains(target)) {
        cursor.style.transform = `translate3d(${lastPosition.x}px, ${lastPosition.y}px, 0)`;
        cursor.dataset.visible = "true";
        cursor.dataset.flip = String(lastPosition.x > window.innerWidth - 170);
      } else hide();
    };
    const press = () => { cursor.dataset.pressed = "true"; };
    const release = () => { delete cursor.dataset.pressed; };
    // Focusing the embedded prototype blurs the outer window, but the pointer
    // is still inside the playground and must remain visible during clicks.
    const blur = () => { if (document.activeElement !== frame) hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    let detachFrame = () => {};
    const attachFrame = () => {
      detachFrame();
      const doc = frame.contentDocument;
      if (!doc) return;
      // Same-origin iframe events do not bubble into the portfolio. Translate its
      // desktop coordinates through the scaled mockup without intercepting input.
      const style = doc.createElement("style");
      style.textContent = "@media (hover: hover) and (pointer: fine) { html, html * { cursor: none !important; } }";
      doc.head.appendChild(style);
      doc.addEventListener("pointermove", frameMove);
      doc.addEventListener("pointerleave", hide);
      doc.addEventListener("pointerdown", press);
      doc.addEventListener("pointerup", release);
      detachFrame = () => {
        style.remove();
        doc.removeEventListener("pointermove", frameMove);
        doc.removeEventListener("pointerleave", hide);
        doc.removeEventListener("pointerdown", press);
        doc.removeEventListener("pointerup", release);
      };
    };
    window.addEventListener("pointermove", parentMove);
    area.addEventListener("pointerleave", hide);
    area.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    window.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", hide);
    finePointer.addEventListener("change", hide);
    frame.addEventListener("load", attachFrame);
    attachFrame();
    return () => {
      detachFrame();
      window.removeEventListener("pointermove", parentMove);
      area.removeEventListener("pointerleave", hide);
      area.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", blur);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", hide);
      finePointer.removeEventListener("change", hide);
      frame.removeEventListener("load", attachFrame);
    };
  }, []);

  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    const sync = () => setScale(element.getBoundingClientRect().width / 640);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={section} id="medhunt-prototype" className={styles.section} aria-labelledby="medhunt-prototype-title">
    <h2 id="medhunt-prototype-title" className={styles.title}>Prototype playground</h2>
    <div ref={container} className={styles.container}>
      <div className={styles.computer} style={{ transform: `scale(${scale})` }}>
        <div className={styles.frame}>
          <div className={styles.screen} data-lenis-prevent>
            <iframe ref={iframe} src="/assets/medhunt/prototype/Main.dc.html" title="MedHunt interactive prototype"
              loading="lazy" className={styles.prototype} />
          </div>
        </div>
        <div className={styles.stand} aria-hidden="true" />
        <div className={styles.foot} aria-hidden="true" />
      </div>
    </div>
    <div ref={pointer} className={styles.pointer} aria-hidden="true">
      <div className={styles.pointerBody}>
        <svg className={styles.pointerArrow} viewBox="0 0 24 24" width="28" height="28">
          <path className={styles.pointerEdge} d="M4.2 3.3 20.1 9.6 13.3 12.3 10.6 19.2Z" />
          <path className={styles.pointerFill} d="M4.2 3.3 20.1 9.6 13.3 12.3 10.6 19.2Z" />
        </svg>
        <span className={styles.pointerLabel}>You</span>
      </div>
    </div>
  </section>;
}
