"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import styles from "./portfolio-masthead.module.css";

const pixelFont = localFont({
  src: "../../public/fonts/PixelifySans-Variable.ttf",
  display: "swap",
});

export function HorseGreeting() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <button
      type="button"
      className={styles.horse}
      aria-label="Say hi to Thuy"
      aria-expanded={isOpen}
      data-open={isOpen}
      onClick={() => setIsOpen((open) => !open)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          event.currentTarget.blur();
        }
      }}
    >
      <Image
        alt=""
        src="/assets/portfolio/horse.png"
        width={1254}
        height={1254}
        loading="eager"
        unoptimized
        className={styles.horseImage}
      />
      <span className={`${styles.greeting} ${pixelFont.className}`} aria-hidden="true">Hi, I’m Thuy</span>
    </button>
  );
}
