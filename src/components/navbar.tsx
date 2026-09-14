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
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialOrder = ["LinkedIn", "Behance", "Threads", "email"] as const;
const CV_URL =
  "https://drive.google.com/file/d/1gLkY5mOFYf0NKvDU5oKwIqxyRtvT8PPt/view?usp=sharing";

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
    <Image
      alt=""
      aria-hidden="true"
      className="size-[28px] object-contain"
      height={28}
      priority
      src="/icon.png"
      width={28}
    />
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
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full transition duration-300 focus-visible:ring-2 focus-visible:ring-[#0096F7]/35 focus-visible:ring-offset-2",
            "text-[#29303B] hover:bg-[#e9f6ff] hover:text-[#007ac9] dark:text-foreground dark:hover:bg-[#0096F7]/15"
          )}
        >
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={10}>
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-16 origin-bottom">
      <div className="fixed inset-x-0 bottom-0 h-32 w-full bg-background/[0.18] backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,.9)_26%,rgba(0,0,0,.55)_56%,rgba(0,0,0,.22)_78%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,.9)_26%,rgba(0,0,0,.55)_56%,rgba(0,0,0,.22)_78%,transparent_100%)] dark:bg-background/[0.18]" />
      <motion.nav
        animate={{ width: isExpanded ? 368 : 48 }}
        className="pointer-events-auto relative z-50 mx-auto flex h-16 min-h-0 max-w-[calc(100vw-24px)] items-center justify-center overflow-hidden rounded-full border-0 px-2 py-2 shadow-[0_1px_2px_rgba(0,0,0,.03),0_10px_28px_-12px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.92),inset_0_-1px_0_rgba(255,255,255,.4),inset_0_0_0_.5px_rgba(0,0,0,.05)] backdrop-blur-[22px] transform-gpu dark:shadow-[0_1px_2px_rgba(0,0,0,.16),0_10px_28px_-12px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.16),inset_0_-1px_0_rgba(255,255,255,.06)]"
        initial={false}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,.34) 0%, rgba(255,255,255,0) 62%), linear-gradient(90deg, rgba(255,255,255,.72) 0%, rgba(255,255,255,.72) 100%)",
        }}
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
              <motion.div
                className="ml-1 flex items-center justify-center"
                custom={1}
                transition={motionTransition}
                variants={itemVariants}
              >
                <Link
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#3BA0FF] px-4 text-sm font-bold leading-none text-white shadow-[0_2px_4px_rgba(0,0,0,.03),0_8px_14px_rgba(59,160,255,.18),inset_0_3px_5px_rgba(255,255,255,.41)] transition duration-300 hover:bg-[#238fe8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/35 focus-visible:ring-offset-2"
                  href={CV_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read my CV
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
