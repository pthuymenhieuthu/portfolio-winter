"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Home, Layers, Coins, Newspaper, UserRound, ShieldPlus, Gauge } from "lucide-react";
import screens from "@/data/affina-healthcare-screens.json";
import device from "./affina-brand-application.module.css";
import styles from "./affina-healthcare-showcase.module.css";

const screenInfo=[
  {title:"Affina Home",image:"home-prelogin.png",label:"Scroll the Affina Home design"},
  {title:"Health tab",image:"health-tab.png",label:"Scroll the Health tab design",note:"Planned for early 2027"},
];
const navigation = [
  [{label:"Home",icon:Home},{label:"Services",icon:Layers},{label:"Affina Points",icon:Coins},{label:"News",icon:Newspaper},{label:"Account",icon:UserRound}],
  [{label:"Insurance",icon:ShieldPlus},{label:"Health",icon:Gauge},{label:"News",icon:Newspaper},{label:"Account",icon:UserRound}],
];
const moods = [{emoji:"🥺",label:"Bad"},{emoji:"☹️",label:"Not good"},{emoji:"😐",label:"Okay"},{emoji:"😊",label:"Good"},{emoji:"😆",label:"Great"}];

export function AffinaHealthcareShowcase({referenceDevice}:{referenceDevice?:{width:number;height:number}}) {
  const root = useRef<HTMLDivElement>(null);
  const [fittedScreens, setFittedScreens] = useState(screens);
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !root.current) return;
      const context = document.createElement("canvas").getContext("2d");
      const sample = root.current.querySelector("[data-screen-label]");
      if (!context || !sample) return;
      const family = getComputedStyle(sample).fontFamily;
      setFittedScreens(screens.map(screen => ({ ...screen, texts: screen.texts.map(label => {
        const fits = (size: number) => {
          context.font = `400 ${size}px ${family}`;
          let lines = 0;
          for (const paragraph of label.text.split("\n")) {
            let line = "";
            lines++;
            for (const word of paragraph.split(" ")) {
              if (context.measureText(word).width > label.w - 4) return false;
              const next = line ? `${line} ${word}` : word;
              if (context.measureText(next).width > label.w - 4) { lines++; line = word; }
              else line = next;
            }
          }
          return lines * size * 1.2 <= label.h - 4;
        };
        let low = 0, high = label.size;
        for (let i = 0; i < 14; i++) {
          const mid = (low + high) / 2;
          if (fits(mid)) low = mid; else high = mid;
        }
        return { ...label, size: low * .97 };
      }) })));
    });
    return () => { cancelled = true; };
  }, []);
  return <div className={styles.pair} ref={root} style={referenceDevice?{"--reference-phone-width":`${referenceDevice.width}px`,"--reference-phone-height":`${referenceDevice.height}px`} as CSSProperties:undefined}>
    {fittedScreens.map((screen,index)=><figure key={screen.id}>
      <figcaption className={styles.caption}><span>{screenInfo[index].title}</span><small>{screenInfo[index].note ?? "\u00a0"}</small></figcaption>
      <div className={`${device.phone} ${styles.deviceFrame}`}>
        <div className={styles.viewport} role="region" tabIndex={0} aria-label={screenInfo[index].label} data-healthcare-screen={index} data-lenis-prevent>
          <div className={styles.artwork} style={{aspectRatio:`${screen.width}/${index===0?5590:10100}`}}>
            <img src={`/assets/affina/product-review/${screenInfo[index].image}`} width={Math.round(screen.width)} height={Math.round(screen.height)} alt={`${screenInfo[index].title} from the selected Figma design`} loading="lazy"/>
            {screen.texts.map((label,i)=>((index===0&&i>=33)||(index===1&&(i>=60||(i>=8&&i<=13))))?null:<span key={i} data-screen-label aria-hidden="true" className={styles.translation} style={{left:`${label.x/screen.width*100}%`,top:`${label.y/screen.width*100}cqw`,width:`${label.w/screen.width*100}%`,height:`${label.h/screen.width*100}cqw`,fontSize:`${label.size/screen.width*100}cqw`,background:label.bg,color:label.color,textAlign:label.align as "left"|"center"}}>{label.text}</span>)}
            {index===1&&<div className={styles.mood} style={{left:`${55/screen.width*100}%`,top:`${2490/screen.width*100}cqw`,width:`${1422/screen.width*100}%`,height:`${600/screen.width*100}cqw`}}><p>How are you feeling today?</p><div>{moods.map(mood=><span key={mood.label}><span className={styles.emoji}>{mood.emoji}</span><span>{mood.label}</span></span>)}</div></div>}
          </div>
        </div>
        <div className={styles.bottomNav} aria-label={`${screenInfo[index].title} navigation`}>{navigation[index].map(({label,icon:Icon})=><span key={label} className={label===(index===0?"Home":"Health")?styles.active:undefined}><Icon aria-hidden="true"/><span>{label}</span></span>)}</div>
        <span className={device.island} aria-hidden="true"/><span className={device.volume} aria-hidden="true"/><span className={device.power} aria-hidden="true"/>
      </div>
    </figure>)}
  </div>;
}
