import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Kiểm tra DATA.url có hợp lệ chưa
const siteUrl =
  typeof DATA?.url === "string" && DATA.url.startsWith("http")
    ? DATA.url
    : "https://example.com"; // fallback an toàn

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DATA?.name || "My Site",
    template: `%s | ${DATA?.name || "My Site"}`,
  },
  description: DATA?.description || "Default description",
  openGraph: {
    title: `${DATA?.name || "My Site"}`,
    description: DATA?.description || "Default description",
    url: siteUrl,
    siteName: `${DATA?.name || "My Site"}`,
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
    title: `${DATA?.name || "My Site"}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-5xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}