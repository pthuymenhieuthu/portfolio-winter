"use client";

import { useState } from "react";
import tokens from "@/data/affina-token-comparison.json";
import styles from "./affina-token-comparison.module.css";

export function AffinaTokenComparison() {
  const [selected, setSelected] = useState(0);
  const active = tokens[selected];

  return <div className={styles.comparison}>
    <figure className={styles.figma}>
      <div className={styles.capture}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/affina/brand-rebuild/token-table-capture.png" alt="Original Figma capture of brand and accent text tokens, their usage, and color references" width={1095} height={439} loading="lazy"/>
        {tokens.map((token,index)=><button key={token.figmaName} type="button" className={styles.captureRow} style={{top:`${(117+index*76)/421*100}%`,height:`${76/421*100}%`}} aria-label={`Preview ${token.figmaName}`} aria-pressed={selected===index} onPointerEnter={()=>setSelected(index)} onFocus={()=>setSelected(index)} onClick={()=>setSelected(index)} data-capture-row={index}/>)}
      </div>
      <figcaption>Figma</figcaption>
      <div className={styles.valuePreview} id="affina-token-value-preview" aria-live="polite" aria-atomic="true">
        <code className={styles.activeName}>{active.figmaName}</code>
        <div className={styles.valuePair}>
          <div><span className={styles.swatch} style={{background:active.figmaValue}} aria-hidden="true"/><div><span className={styles.valueSource}>Figma · {active.figmaAlias}</span><code>{active.figmaValue}</code></div></div>
          <div><span className={styles.swatch} style={{background:active.export.value}} aria-hidden="true"/><div><span className={styles.valueSource}>JSON export</span><code>{active.export.value}</code></div></div>
        </div>
      </div>
      <p className={styles.versionNote}>The token names correspond; the color values differ between these sources.</p>
    </figure>
    <figure className={styles.json}>
      <div className={styles.codeHeader}>figma-export.json</div>
      <div className={styles.code} role="group" aria-label="JSON token excerpts">
        <span className={styles.bracket}>[</span>
        {tokens.map((token,index)=><button type="button" key={token.export.token} className={styles.token} aria-label={`Inspect ${token.export.name}`} aria-pressed={selected===index} aria-controls="affina-token-value-preview" onPointerEnter={()=>setSelected(index)} onFocus={()=>setSelected(index)} onClick={()=>setSelected(index)} data-json-token={index}>
          <code>{"  {\n"}{Object.entries(token.export).map(([key,value],field,fields)=><span className={styles.codeLine} key={key}>{"    "}<span className={styles.key}>{JSON.stringify(key)}</span>{": "}<span className={key==="value"?styles.hex:styles.string}>{JSON.stringify(value)}</span>{field<fields.length-1?",":""}{"\n"}</span>)}{`  }${index<tokens.length-1?",":""}`}</code>
        </button>)}
        <span className={styles.bracket}>]</span>
      </div>
      <figcaption>JSON export · Excerpts</figcaption>
    </figure>
  </div>;
}
