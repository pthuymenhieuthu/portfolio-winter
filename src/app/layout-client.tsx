"use client";

import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  useLenis(); // chạy smooth scroll ở client

  return (
    <>
      <ScrollProgress />
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider delayDuration={0}>
          {children}
          <Navbar />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}