/* eslint-disable @next/next/no-img-element */
"use client";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./affina-brand-application.module.css";
import device from "./medhunt-prototype.module.css";

export function SilverDesktop({children,className=""}:{children?:ReactNode;className?:string}) {
  const container = useRef<HTMLDivElement>(null);
  const [scale,setScale] = useState(0);
  useLayoutEffect(()=>{
    const element=container.current;
    if(!element) return;
    const resize=()=>setScale(element.clientWidth/640);
    resize();
    const observer=new ResizeObserver(resize);
    observer.observe(element);
    return ()=>observer.disconnect();
  },[]);
  return <div id={children?undefined:"affina-desktop-showcase"} ref={container} className={`${styles.desktop} ${className}`}>
    <div className={device.computer} style={{transform:`scale(${scale})`}}>
      <div className={device.frame}>
        <div className={device.screen}>{children?<div className={styles.desktopContent} data-lenis-prevent tabIndex={0} role="region" aria-label="Scroll the Web App review">{children}</div>:<img className={styles.website} src="/assets/affina/brand-rebuild/imac-affina-screen.png" alt="Affina website displayed in a silver iMac mockup" width={902} height={508} loading="lazy"/>}</div>
      </div>
      <div className={device.stand}/><div className={device.foot}/>
    </div>
  </div>;
}

export function SilverPhone({src,alt="",className="",children}:{src?:string;alt?:string;className?:string;children?:ReactNode}) {
  return <div className={`${styles.phone} ${className}`}>
    <div className={styles.phoneScreen} data-lenis-prevent tabIndex={0} role="region" aria-label={alt?`Scroll ${alt}`:"Scroll the Affina Pro review"}>{children??<img src={src} alt={alt} width={1533} height={3317} loading="lazy"/>}</div>
    <span className={styles.island} aria-hidden="true"/>
    <span className={styles.volume} aria-hidden="true"/>
    <span className={styles.power} aria-hidden="true"/>
  </div>;
}

export function AffinaBrandApplication() {
  return <div className={styles.showcase}>
    <div className={styles.intro}>
      <h2 id="affina-application-title">Bringing the new brand into the app and website</h2>
      <p>I carried the new colors, typography, and visual elements into the app and website, adapting the layouts for mobile and desktop.</p>
    </div>
    <SilverPhone className={styles.left} src="/assets/affina/ai-journey/00-intro.webp" alt="Affina mobile welcome screen with the pink heart and shield"/>
    <SilverPhone className={styles.right} src="/assets/affina/ai-journey/06-recommendations.webp" alt="Affina mobile insurance recommendations"/>
    <div className={styles.lower}>
      <SilverPhone src="/assets/affina/ai-journey/01-insurance-type.webp" alt="Affina mobile insurance consultation"/>
      <img className={styles.mascot} src="/assets/affina/brand-rebuild/mascot-nova.png" alt="" width={1500} height={1800} loading="lazy"/>
    </div>
    <SilverDesktop/>
  </div>;
}
