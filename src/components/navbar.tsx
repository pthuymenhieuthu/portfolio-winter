"use client";

import { ContactButton } from "@/components/contact-button";
import { buttonVariants } from "@/components/ui/button";
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
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";

const socialOrder = ["Behance", "Muzli"] as const;

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
  const [introComplete, setIntroComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [homeCompact, setHomeCompact] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/" || pathname === "/classic";
  const navigationVisible = !scrollHidden || isMobileMenuOpen;
  const topNavigationVisible = (!isHome || introComplete) && navigationVisible;
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
      setHomeCompact((compact) => window.matchMedia("(min-width: 768px)").matches && !isMobileMenuOpen && y > (compact ? 12 : 32));
      const hero = isHome ? document.getElementById("hero") : document.querySelector<HTMLElement>("[data-project-hero]");
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
    navigationRef.current?.toggleAttribute("inert", !topNavigationVisible);
  }, [topNavigationVisible]);

  const goToProjects = useCallback((tab: "work" | "experiments") => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      router.push(tab === "experiments" ? "/?collection=experiments#projects" : "/#projects", { scroll: false });
      return;
    }
    document.getElementById(`projects-tab-${tab}`)?.click();
    const target = document.getElementById(tab === "experiments" ? "projects-tab-experiments" : "projects");
    target?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: tab === "experiments" ? "center" : "start",
    });
  }, [isHome, router, shouldReduceMotion]);

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

  return (
      <>
        <motion.nav
          ref={navigationRef}
          aria-label="Main navigation"
          aria-hidden={!topNavigationVisible}
          className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-4 sm:px-[clamp(24px,2.5vw,48px)] sm:pt-6"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -54 }}
          animate={{ opacity: topNavigationVisible ? 1 : 0, y: topNavigationVisible ? 0 : -100 }}
          transition={scrollTransition}
          style={{ pointerEvents: topNavigationVisible ? "auto" : "none" }}
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
