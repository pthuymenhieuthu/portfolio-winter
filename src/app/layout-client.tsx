"use client";

import dynamic from "next/dynamic";

const SiteLayout = dynamic(() => import("@/components/site-layout"));

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
