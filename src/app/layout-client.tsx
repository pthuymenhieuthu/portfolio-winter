"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const SiteLayout = dynamic(() => import("@/components/site-layout"));

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/" && process.env.NODE_ENV !== "production") {
    return <>{children}</>;
  }

  return <SiteLayout>{children}</SiteLayout>;
}
