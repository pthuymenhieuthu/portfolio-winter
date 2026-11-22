"use client";

import { useRef, type HTMLAttributes } from "react";
import { useInView } from "framer-motion";
import { SoapBubbleSurface } from "@/components/reactdrops/soap-bubble";
import { cn } from "@/lib/utils";
import styles from "./case-study-bubble-card.module.css";

export function CaseStudyBubbleCard({
  as: Tag = "div", className, children, radius = 24, staticFilm = false, ...props
}: HTMLAttributes<HTMLDivElement> & { as?: "div" | "article"; radius?: number; staticFilm?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "180px 0px" });
  // Affina's case study is always light, independently of the OS colour scheme.
  return <Tag {...props} ref={ref} data-bubble-card="" data-theme="light" data-static-film={staticFilm || undefined}
    className={cn(styles.card, className)} style={{ borderRadius: radius, ...props.style }}>
    {!staticFilm && visible && <SoapBubbleSurface aria-hidden="true" className={styles.film}
      radius={radius} interactive={false} paused environment="soft" tint="#ffffff00" opacity={0}
      clearCenter={1} glass={0.65} bevel={14} iridescence={0.85}
      oilOpacity={0.25} oilEdge={18} oilEdgeFade={1.4}
      soapShadeColor="#a7c8df" soapHighlightColor="#ffffff"
      reflectivity={1.1} refraction={0.08} windowLight={false} bottomShade={false}
    />}
    {children}
  </Tag>;
}
