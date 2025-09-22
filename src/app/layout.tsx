// 👇 phải có "use client" ở đầu vì ta sẽ gọi hook client-side
"use client";

import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/scroll-progress"; 
import { GridBackground } from "@/components/ui/grid-background";

// 👇 import hook smooth scroll
import { useLenis } from "@/hooks/useLenis";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// ✅ Nếu DATA.url không hợp lệ thì bỏ metadataBase
export const metadata: Metadata = {
  ...(DATA.url ? { metadataBase: new URL(DATA.url) } : {}), 
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: DATA.name,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: DATA.name,
    card: "summary_large_image",
  },
};

// 👇 Component riêng để gắn hook vào client
function LayoutClient({ children }: { children: React.ReactNode }) {
  useLenis(); // gọi smooth scroll ở đây

  return (
    <>
      {/* Progress bar */}
      <ScrollProgress />

      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider delayDuration={0}>
          {children}
          <Navbar /> {/* 👈 giữ nguyên */}
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* Background grid */}
        <GridBackground className="absolute inset-0 -z-10 opacity-20 dark:opacity-10" />

        <div className="max-w-2xl mx-auto py-12 sm:py-24 px-6">
          <LayoutClient>{children}</LayoutClient>
        </div>
      </body>
    </html>
  );
}