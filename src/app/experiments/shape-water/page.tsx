"use client";

import { useRef, useState } from "react";
import { FloatingToolsWater } from "@/components/floating-tools-water";
import { type ShapePhysicsHandle } from "@/components/reactdrops/shape-physics/shape-physics";
import styles from "./page.module.css";

export default function ShapeWaterDemo() {
  const physics = useRef<ShapePhysicsHandle>(null);
  const [paused, setPaused] = useState(false);
  const [water, setWater] = useState(true);
  return (
    <main className={styles.page}>
      <header className={styles.bar}>
        <a href="/">← Back to portfolio</a>
        <span>Water playground · Preview</span>
      </header>
      <div className={styles.stage}>
        <FloatingToolsWater ref={physics} paused={paused} water={water} />
        <div className={styles.copy}>
          <p>A few tools. A lot of possibilities.</p>
          <h1>What I bring<br />into the flow.</h1>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.controls}>
          <button onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"}</button>
          <button onClick={() => physics.current?.replay()}>Replay</button>
          <button aria-pressed={water} onClick={() => setWater(!water)}>Water {water ? "on" : "off"}</button>
        </div>
        <p>Based on <a href="https://reactdrops.dev/components/background/shape-physics" target="_blank" rel="noreferrer">ReactDrops Shape Physics</a> + <a href="https://shaders.paper.design/water" target="_blank" rel="noreferrer">Paper Water</a></p>
      </footer>
    </main>
  );
}
