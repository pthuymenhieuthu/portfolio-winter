"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialOrder = ["LinkedIn", "Behance", "Threads", "email"] as const;

const dockTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

const itemVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    scale: 0.94,
    x: direction * 10,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
};

function BrandShape() {
  return (
    <svg
      aria-hidden="true"
      className="size-[22px]"
      fill="none"
      viewBox="0 0 930 778"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M174.563 315.703C116.476 372.539 33.9846 394.42 0 398.256C22.0712 413.266 73.1359 463.798 100.825 545.851C128.515 627.904 100.825 734.806 83.5194 778C99.9474 744.312 149.883 670.631 218.204 645.415C341 607.39 444.434 629.571 480.801 645.415C496.727 607.557 548.595 519.034 628.653 467.801C708.711 416.568 862.909 417.101 930 423.772C879.838 409.597 761.607 362.733 689.976 288.686C618.345 214.638 631.788 65.3754 647.464 0C631.913 31.3535 580.498 103.266 499.235 140.09C417.973 176.914 309.875 168.442 265.983 159.603C259.713 187.954 232.65 258.866 174.563 315.703Z"
        fill="#FF76ED"
      />
      <path
        d="M252.638 335.487C210.165 376.983 149.849 392.957 125 395.758C141.138 406.716 178.476 443.608 198.722 503.513C218.968 563.418 198.722 641.465 186.068 673C198.08 648.405 234.592 594.612 284.547 576.203C374.333 548.442 449.962 564.636 476.553 576.203C488.199 548.564 526.123 483.935 584.66 446.531C643.197 409.127 755.944 409.516 805 414.387C768.323 404.037 681.874 369.823 629.498 315.763C577.123 261.702 586.953 152.729 598.414 105C587.044 127.89 549.45 180.392 490.032 207.277C430.615 234.161 351.575 227.975 319.482 221.522C314.898 242.221 295.11 293.992 252.638 335.487Z"
        fill="#FF94F1"
      />
      <path
        d="M329.463 354.895C302.355 381.341 263.859 391.522 248 393.307C258.3 400.291 282.13 423.803 295.052 461.982C307.973 500.161 295.052 549.902 286.976 570C294.642 554.325 317.946 520.042 349.828 508.309C407.133 490.616 455.402 500.937 472.374 508.309C479.806 490.694 504.011 449.504 541.371 425.666C578.732 401.827 650.691 402.075 682 405.179C658.591 398.583 603.417 376.778 569.989 342.324C536.561 307.87 542.834 238.419 550.15 208C542.893 222.589 518.899 256.049 480.977 273.183C443.054 290.317 392.608 286.375 372.125 282.262C369.199 295.454 356.57 328.449 329.463 354.895Z"
        fill="#FFD3F9"
      />
    </svg>
  );
}

function NavButton({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full text-[#171717] hover:bg-[#f5f5f5] dark:text-foreground dark:hover:bg-accent"
          )}
        >
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const homeItem = DATA.navbar[0];
  const motionTransition = shouldReduceMotion ? { duration: 0 } : dockTransition;

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsExpanded(true);
      return;
    }

    const timeout = window.setTimeout(() => setIsExpanded(true), 820);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-14 origin-bottom">
      <div className="fixed inset-x-0 bottom-0 h-32 w-full bg-background/[0.18] backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,.9)_26%,rgba(0,0,0,.55)_56%,rgba(0,0,0,.22)_78%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,.9)_26%,rgba(0,0,0,.55)_56%,rgba(0,0,0,.22)_78%,transparent_100%)] dark:bg-background/[0.18]" />
      <motion.nav
        animate={{ width: isExpanded ? 258 : 48 }}
        className="pointer-events-auto relative z-50 mx-auto flex h-12 min-h-0 items-center justify-center overflow-hidden rounded-full border border-[#e5e5e5] bg-white/90 px-1 py-1 shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-background/90"
        initial={false}
        transition={motionTransition}
      >
        <AnimatePresence initial={false} mode="wait">
          {!isExpanded ? (
            <motion.div
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              exit={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.88,
                rotate: shouldReduceMotion ? 0 : -4,
                transition: {
                  duration: shouldReduceMotion ? 0 : 0.34,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              initial={{ opacity: 1, scale: 1, rotate: 0 }}
              key="brand-shape"
            >
              <BrandShape />
            </motion.div>
          ) : (
            <motion.div
              animate="visible"
              className="flex items-center justify-center"
              initial="hidden"
              key="expanded-nav"
              transition={{
                staggerChildren: shouldReduceMotion ? 0 : 0.075,
                delayChildren: shouldReduceMotion ? 0 : 0.18,
              }}
            >
              {homeItem && (
                <motion.div
                  className="flex size-10 items-center justify-center"
                  custom={-1}
                  transition={motionTransition}
                  variants={itemVariants}
                >
                  <NavButton href={homeItem.href} label={homeItem.label}>
                    <homeItem.icon className="size-4" />
                  </NavButton>
                </motion.div>
              )}
              <motion.div
                className="mx-1 flex h-7 origin-center items-center"
                transition={{ duration: shouldReduceMotion ? 0 : 0.42 }}
                variants={{
                  hidden: { opacity: 0, scaleY: 0.35 },
                  visible: { opacity: 1, scaleY: 1 },
                }}
              >
                <Separator orientation="vertical" className="h-7" />
              </motion.div>
              {socialOrder
                .map((name) => [name, DATA.contact.social[name]] as const)
                .filter(([_, social]) => social?.navbar)
                .map(([name, social]) => (
                  <motion.div
                    className="flex size-10 items-center justify-center"
                    custom={1}
                    key={name}
                    transition={motionTransition}
                    variants={itemVariants}
                  >
                    <NavButton href={social.url} label={name}>
                      <social.icon className="size-4" />
                    </NavButton>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
