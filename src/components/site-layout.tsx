"use client";

import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GridBackground } from "@/components/ui/grid-background";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { BackToTopButton } from "@/components/back-to-top-button";
import { RouteScrollRestoration } from "@/components/route-scroll-restoration";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  useLenis();

  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/classic";
  const isExperiment = pathname.startsWith("/experiments/");
  const isKioskDemo = pathname === "/experiments/mcdonalds-kiosk";
  const isCaseStudy =
    pathname === "/blog/mcdonalds-kiosk" ||
    pathname === "/blog/medhunt" ||
    pathname === "/blog/affina" ||
    pathname === "/blog/affina-partner-flow" ||
    pathname === "/blog/4oranges" ||
    pathname === "/blog/zoan" ||
    pathname === "/blog/trueprofit" ||
    pathname === "/blog/edtechapp" ||
    pathname === "/blog/chande" ||
    pathname === "/blog/graphics" ||
    pathname === "/blog/pizzy" ||
    pathname === "/blog/cake" ||
    pathname === "/blog/lollypop" ||
    pathname === "/blog/zanzan";
  const isFullBleed = isHome || isCaseStudy || isExperiment;

  return (
    <>
      {!isHome && <ScrollProgress />}
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider delayDuration={0}>
          {!isHome && !isExperiment && (
            <GridBackground className="fixed inset-0 -z-10 opacity-20 dark:opacity-10" />
          )}
          <div
            className={cn(
              "relative min-h-[100dvh] max-w-full overflow-x-hidden",
              isFullBleed
                ? "w-full"
                : "mx-auto w-full max-w-2xl px-6 py-12 sm:py-24"
            )}
          >
            {children}
          </div>
          {isFullBleed && !isHome && !isKioskDemo && <BackToTopButton />}
          {!isHome && !isKioskDemo && <Navbar />}
          <RouteScrollRestoration />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}
