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
import LayoutClient from "./layout-client"; // 👈 import client component

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// ✅ Đây là server-side metadata
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
          {/* 👇 Client component */}
          <LayoutClient>{children}</LayoutClient>
        </div>
      </body>
    </html>
  );
}