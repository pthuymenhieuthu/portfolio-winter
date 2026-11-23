"use client";

import { useRef, type ComponentProps, type HTMLAttributes } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { SoapBubbleSurface } from "@/components/reactdrops/soap-bubble";
import { cn } from "@/lib/utils";
import { caseStudyBubbleMaterial } from "@/lib/case-study-bubble-material";
import styles from "./case-study-bubble-card.module.css";

export function CaseStudyBubbleCard({
  as: Tag = "div", className, children, radius = 24, staticFilm = false, tone = "neutral", ...props
}: HTMLAttributes<HTMLDivElement> & { as?: "div" | "article"; radius?: number; staticFilm?: boolean; tone?: "neutral" | "accent" }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "180px 0px" });
  // Affina's case study is always light, independently of the OS colour scheme.
  return <Tag {...props} ref={ref} data-bubble-card="" data-bubble-tone={tone} data-theme="light" data-static-film={staticFilm || undefined}
    className={cn(styles.card, className)} style={{ borderRadius: radius, ...props.style }}>
    {!staticFilm && visible && <SoapBubbleSurface aria-hidden="true" className={styles.film}
      {...caseStudyBubbleMaterial} radius={radius} interactive={false} paused
    />}
    {children}
  </Tag>;
}

export function CaseStudyBubbleLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} data-bubble-card="" data-static-film data-theme="light"
    className={cn(styles.card, "rounded-3xl", className)}>{children}</Link>;
}
