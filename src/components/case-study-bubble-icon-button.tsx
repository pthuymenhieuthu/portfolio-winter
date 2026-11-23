"use client";

import { SoapBubbleIconButton, type SoapBubbleIconButtonProps } from "@/components/reactdrops/soap-bubble";
import { caseStudyBubbleMaterial } from "@/lib/case-study-bubble-material";
import { cn } from "@/lib/utils";
import styles from "./case-study-bubble-icon-button.module.css";
import { forwardRef } from "react";

export const CaseStudyBubbleIconButton = forwardRef<HTMLButtonElement, SoapBubbleIconButtonProps>(function CaseStudyBubbleIconButton({ className, ...props }, ref) {
  return <SoapBubbleIconButton {...caseStudyBubbleMaterial} paused data-theme="light"
    {...props} ref={ref} className={cn(styles.button, className)} />;
});
