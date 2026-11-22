"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, Copy, Linkedin, ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";
import styles from "./contact-button.module.css";

// Set to Thuy's confirmed personal profile, never a guessed account.
const linkedinUrl = "https://www.linkedin.com/in/thuy-nguyen-1665ab208/";

export function ContactButton({ className, rootClassName = "", children = "Contact me", placement = "bottom", align = "end" }: { className?: string; rootClassName?: string; children?: ReactNode; placement?: "top" | "bottom"; align?: "start" | "end" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const copyButton = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>();
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>();
  const id = useId();
  const reveal = () => { clearTimeout(leaveTimer.current); setOpen(true); };
  const close = () => { clearTimeout(leaveTimer.current); setOpen(false); };

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const scroll = () => setOpen(false);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("scroll", scroll); };
  }, [open]);
  useEffect(() => () => { clearTimeout(leaveTimer.current); clearTimeout(copiedTimer.current); }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true); setCopyError(false);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch { setCopyError(true); }
  };
  return <div ref={root} className={`${styles.root} ${rootClassName}`} onPointerEnter={event => { if (event.pointerType === "mouse") reveal(); }}
    onPointerLeave={event => { if (event.pointerType === "mouse") leaveTimer.current = setTimeout(close, 160); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}
    onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); trigger.current?.focus(); close(); } }}>
    <a ref={trigger} href={DATA.contact.social.email.url} className={className} data-analytics-contact="email"
      aria-expanded={open} aria-controls={open ? id : undefined}
      onFocus={event => { if (event.currentTarget.matches(":focus-visible")) reveal(); }}
      onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); reveal(); requestAnimationFrame(() => copyButton.current?.focus()); } }}>
      {children}
    </a>
    {open && <div id={id} className={styles.popover} data-placement={placement} data-align={align}>
      <div className={styles.panel} role="group" aria-label="Contact options">
        <button ref={copyButton} type="button" onClick={copyEmail} className={styles.option}>
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span><strong>{copied ? "Email copied!" : "Copy email"}</strong><small>{DATA.contact.email}</small></span>
        </button>
        {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" data-analytics-contact="linkedin" className={styles.option}>
          <Linkedin size={16} aria-hidden="true" /><span><strong>LinkedIn</strong><small>Let’s connect</small></span><ArrowUpRight size={15} aria-hidden="true" />
        </a>}
        <span className={styles.status} role="status">{copied ? "Email copied to clipboard" : ""}</span>
        {copyError && <p className={styles.error}>Copy this address: {DATA.contact.email}</p>}
      </div>
    </div>}
  </div>;
}
