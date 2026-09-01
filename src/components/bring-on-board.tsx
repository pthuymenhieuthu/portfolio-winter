"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const smallAssets = [
  {
    src: "/assets/home/bring-figma.png",
    alt: "",
    width: 760,
    height: 489,
    className:
      "right-[31%] bottom-[37%] w-[58px] sm:right-[31%] sm:bottom-[36%] sm:w-[104px] lg:w-[132px]",
  },
  {
    src: "/assets/home/bring-mouse.png",
    alt: "",
    width: 560,
    height: 300,
    className:
      "right-[18%] bottom-[47%] w-[52px] sm:right-[20%] sm:bottom-[45%] sm:w-[88px] lg:w-[108px]",
  },
  {
    src: "/assets/home/bring-robot.png",
    alt: "",
    width: 760,
    height: 524,
    className:
      "right-[3%] bottom-[40%] w-[82px] sm:right-[6%] sm:bottom-[39%] sm:w-[132px] lg:w-[164px]",
  },
  {
    src: "/assets/home/bring-phone.png",
    alt: "",
    width: 760,
    height: 596,
    className:
      "right-[28%] bottom-[17%] w-[78px] sm:right-[27%] sm:bottom-[10%] sm:w-[128px] lg:w-[160px]",
  },
  {
    src: "/assets/home/bring-laptop.png",
    alt: "",
    width: 760,
    height: 686,
    className:
      "right-[-1%] bottom-[12%] w-[112px] sm:right-[3%] sm:bottom-[3%] sm:w-[196px] lg:w-[248px]",
  },
];

export function BringOnBoard() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const planeX = useTransform(scrollYProgress, [0.15, 0.85], ["12%", "-12%"]);
  const planeY = useTransform(scrollYProgress, [0.15, 0.85], ["10px", "-10px"]);
  const itemsX = useTransform(scrollYProgress, [0.2, 0.85], ["0%", "9%"]);

  return (
    <section
      ref={sectionRef}
      id="bring-on-board"
      className="relative isolate w-full overflow-hidden bg-background px-5 py-[72px] sm:px-6 sm:py-[88px] lg:py-24"
    >
      <div className="mx-auto flex min-h-[620px] w-full max-w-[1173px] flex-col items-center sm:min-h-[700px] lg:min-h-[760px]">
        <div className="relative z-20 mx-auto max-w-[620px] text-center">
          <p className="inline-block rounded-lg bg-[#08090a] px-3 py-1 text-sm font-medium text-white">
            Creative toolkit
          </p>
          <h2 className="mt-5 font-[var(--font-heading)] text-[32px] font-bold leading-[1.08] tracking-normal text-[#08090a] sm:text-[44px] lg:text-[52px]">
            What I bring on board
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-sm leading-6 text-[#737373] sm:text-base sm:leading-7">
            I work across product, UI, design systems,
            <br className="hidden sm:block" />
            motion, and AI - depending on
            <br className="hidden sm:block" />
            what the project needs
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
        >
          <motion.div
            style={{ x: planeX, y: planeY }}
            className="absolute bottom-[24%] left-[-94%] z-10 w-[712px] sm:bottom-[17%] sm:left-[-42%] sm:w-[832px] lg:bottom-[18%] lg:left-[-17%] lg:w-[928px] xl:left-[-10%] xl:w-[992px]"
          >
            <Image
              src="/assets/home/bring-plane.png"
              alt=""
              width={2080}
              height={716}
              priority
              unoptimized
              className="w-full max-w-none select-none object-contain"
              sizes="(max-width: 768px) 712px, 928px"
            />
          </motion.div>

          <motion.div
            style={{ x: itemsX }}
            className="absolute inset-x-0 bottom-[10%] z-20 h-[280px] sm:bottom-[6%] sm:h-[390px] lg:bottom-[4%] lg:h-[460px]"
          >
            {smallAssets.map((asset) => (
              <Image
                key={asset.src}
                src={asset.src}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                priority
                unoptimized
                className={`absolute max-w-none select-none object-contain drop-shadow-[0_24px_50px_rgba(8,9,10,0.10)] ${asset.className}`}
                sizes="(max-width: 768px) 36vw, 220px"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
