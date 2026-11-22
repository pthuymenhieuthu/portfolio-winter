"use client";

import { ContactButton } from "@/components/contact-button";
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
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";

const socialOrder = ["Behance", "Muzli"] as const;

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
          aria-label={label}
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
  const [introComplete, setIntroComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [homeCompact, setHomeCompact] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/classic";
  const homeItem = DATA.navbar[0];
  const motionTransition = shouldReduceMotion ? { duration: 0 } : dockTransition;
  const navigationVisible = !scrollHidden || isMobileMenuOpen;
  const homeNavigationVisible = introComplete && navigationVisible;
  const scrollTransition = {
    duration: shouldReduceMotion ? 0 : navigationVisible ? 0.48 : 0.38,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  useEffect(() => {
    setScrollHidden(false);
    let previousY = Math.max(0, window.scrollY);
    let distance = 0, direction = 0, frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, Math.max(0, document.documentElement.scrollHeight - window.innerHeight)));
      const delta = y - previousY;
      previousY = y;
      if (isHome) setHomeCompact((compact) => window.matchMedia("(min-width: 768px)").matches && !isMobileMenuOpen && y > (compact ? 12 : 32));
      const hero = isHome ? document.getElementById("hero") : null;
      const insideHero = hero ? hero.getBoundingClientRect().bottom > 0 : false;
      const keyboardFocusInNav = navigationRef.current?.contains(document.activeElement)
        && document.activeElement?.matches(":focus-visible");
      if (y <= 48 || insideHero || isMobileMenuOpen || keyboardFocusInNav) {
        distance = 0;
        direction = 0;
        setScrollHidden(false);
        return;
      }
      if (!delta) return;
      const nextDirection = Math.sign(delta);
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;
      if (distance >= (direction > 0 ? 32 : 16)) setScrollHidden(direction > 0);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname, isHome, isMobileMenuOpen]);

  useEffect(() => {
    navigationRef.current?.toggleAttribute("inert", !(isHome ? homeNavigationVisible : navigationVisible));
  }, [isHome, homeNavigationVisible, navigationVisible]);

  const goToProjects = (tab: "work" | "experiments") => {
    setIsMobileMenuOpen(false);
    document.getElementById(`projects-tab-${tab}`)?.click();
    const target = document.getElementById(tab === "experiments" ? "projects-tab-experiments" : "projects");
    target?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: tab === "experiments" ? "center" : "start",
    });
  };

  useEffect(() => {
    if (isHome) return;
    if (shouldReduceMotion) {
      setIsExpanded(true);
      return;
    }

    const timeout = window.setTimeout(() => setIsExpanded(true), 820);
    return () => window.clearTimeout(timeout);
  }, [isHome, shouldReduceMotion]);

  useEffect(() => {
    if (!isHome) return;
    const stage = document.querySelector<HTMLElement>("#hero .fluid-typing-stage");
    if (!stage) { setIntroComplete(true); return; }
    setIntroComplete(false);
    const update = () => {
      if (["holding", "done"].includes(stage.dataset.fluidTypingState ?? "")) setIntroComplete(true);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(stage, { attributes: true, attributeFilter: ["data-fluid-typing-state"] });
    return () => observer.disconnect();
  }, [isHome, pathname]);

  if (isHome) {
    return (
      <>
        <motion.nav
          ref={navigationRef}
          aria-label="Main navigation"
          aria-hidden={!homeNavigationVisible}
          className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-4 sm:px-[clamp(24px,2.5vw,48px)] sm:pt-6"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -54 }}
          animate={{ opacity: homeNavigationVisible ? 1 : 0, y: homeNavigationVisible ? 0 : -100 }}
          transition={scrollTransition}
          style={{ pointerEvents: homeNavigationVisible ? "auto" : "none" }}
        >
          <div data-nav-size={homeCompact ? "compact" : "full"} className={cn(styles.homeBar, "relative mx-auto flex h-[60px] w-full items-center justify-between gap-4 rounded-full border border-white/70 bg-white/80 px-5 shadow-[0_10px_30px_rgba(23,59,75,.09),inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-[24px] md:px-6")}>
            <div className="flex shrink-0 items-center">
              <Link href="/" aria-label="Thuy Nguyen — home" className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3BA0FF]">
                <Image src="/thuy-logo.svg" alt="Thuy" width={1304} height={521} priority className="h-6 w-auto md:h-[26px]" />
              </Link>
            </div>
            <div className="hidden items-center justify-center gap-5 text-sm font-medium text-[#173b4b] md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:gap-9">
              <button type="button" onClick={() => goToProjects("work")} className="whitespace-nowrap rounded-sm py-1 transition hover:text-[#007ac9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3BA0FF]">
                Projects
              </button>
              <button type="button" onClick={() => goToProjects("experiments")} className="whitespace-nowrap rounded-sm py-1 transition hover:text-[#007ac9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3BA0FF]">
                AI Experiments
              </button>
            </div>
            <div className="hidden items-center gap-1 md:flex">
              {socialOrder
                .map((name) => [name, DATA.contact.social[name]] as const)
                .filter(([_, social]) => social?.navbar)
                .map(([name, social]) => (
                  <NavButton href={social.url} label={social.name} key={name}>
                    <social.icon className="size-4" />
                  </NavButton>
                ))}
              <ContactButton className="ml-1 inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#3BA0FF] px-4 text-sm font-bold text-white transition hover:bg-[#238fe8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/35" />
            </div>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-portfolio-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="grid size-10 place-items-center rounded-full text-[#173b4b] transition hover:bg-[#e9f6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3BA0FF] md:hidden"
            >
              {isMobileMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id="mobile-portfolio-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="mt-2 flex flex-col gap-1 rounded-[24px] border border-white/75 bg-white/80 p-3 shadow-[0_14px_34px_rgba(23,59,75,.12)] backdrop-blur-[24px] md:hidden"
              >
                <button type="button" onClick={() => goToProjects("work")} className="min-h-11 rounded-xl px-4 text-left text-sm font-medium text-[#173b4b] hover:bg-[#e9f6ff]">Projects</button>
                <button type="button" onClick={() => goToProjects("experiments")} className="min-h-11 rounded-xl px-4 text-left text-sm font-medium text-[#173b4b] hover:bg-[#e9f6ff]">AI Experiments</button>
                <div className="my-1 h-px bg-[#173b4b]/10" />
                <div className="flex items-center justify-between gap-3 px-1">
                  <div className="flex items-center gap-1">
                    {socialOrder
                      .map((name) => [name, DATA.contact.social[name]] as const)
                      .filter(([_, social]) => social?.navbar)
                      .map(([name, social]) => (
                        <NavButton href={social.url} label={social.name} key={name}>
                          <social.icon className="size-4" />
                        </NavButton>
                      ))}
                  </div>
                  <ContactButton className="inline-flex h-10 items-center justify-center rounded-full bg-[#3BA0FF] px-4 text-sm font-bold text-white hover:bg-[#238fe8]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </>
    );
  }

  return (
    <>
      <motion.div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-16 origin-bottom"
        initial={false} animate={{ opacity: navigationVisible ? 1 : 0, y: navigationVisible ? 0 : 100 }}
        transition={scrollTransition}>
        <div className="fixed inset-x-0 bottom-0 h-32 w-full bg-background/[0.18] backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,.9)_26%,rgba(0,0,0,.55)_56%,rgba(0,0,0,.22)_78%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,.9)_26%,rgba(0,0,0,.55)_56%,rgba(0,0,0,.22)_78%,transparent_100%)] dark:bg-background/[0.18]" />
        <motion.nav
        ref={navigationRef}
        aria-label="Main navigation"
        aria-hidden={!navigationVisible}
        animate={{ width: isExpanded ? 312 : 48 }}
        className="pointer-events-auto relative z-50 mx-auto flex h-16 min-h-0 max-w-[calc(100vw-24px)] items-center justify-center overflow-visible rounded-full border-0 px-2 py-2 shadow-[0_1px_2px_rgba(0,0,0,.03),0_10px_28px_-12px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.92),inset_0_-1px_0_rgba(255,255,255,.4),inset_0_0_0_.5px_rgba(0,0,0,.05)] backdrop-blur-[22px] transform-gpu dark:shadow-[0_1px_2px_rgba(0,0,0,.16),0_10px_28px_-12px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.16),inset_0_-1px_0_rgba(255,255,255,.06)]"
        initial={false}
        style={{
          pointerEvents: navigationVisible ? "auto" : "none",
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
                    <NavButton href={social.url} label={social.name}>
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
                <ContactButton placement="top" className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#3BA0FF] px-4 text-sm font-bold leading-none text-white shadow-[0_2px_4px_rgba(0,0,0,.03),0_8px_14px_rgba(59,160,255,.18),inset_0_3px_5px_rgba(255,255,255,.41)] transition duration-300 hover:bg-[#238fe8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/35 focus-visible:ring-offset-2" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.nav>
      </motion.div>
    </>
  );
}
