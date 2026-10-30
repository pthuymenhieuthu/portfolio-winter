"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { TallyContactForm } from "@/components/tally-contact-form";

type ProjectInquiryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectInquiryDialog({
  open,
  onOpenChange,
}: ProjectInquiryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onOpenChange(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      aria-labelledby="project-inquiry-title"
      className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[680px] overflow-y-auto rounded-[28px] bg-white p-0 text-[#29303B] shadow-[0_0_0_1px_rgba(15,23,42,.06),0_28px_80px_-20px_rgba(15,23,42,.32)] backdrop:bg-[#101827]/40 backdrop:backdrop-blur-[6px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      ref={dialogRef}
    >
      <div className="relative px-5 pb-5 pt-7 sm:px-8 sm:pb-7 sm:pt-8">
        <button
          aria-label="Close project inquiry"
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full text-[#29303B]/60 transition-[background-color,color,transform] duration-150 hover:bg-[#eef5fb] hover:text-[#29303B] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/40 focus-visible:ring-offset-2"
          onClick={() => dialogRef.current?.close()}
          type="button"
        >
          <X aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        </button>

        <div className="pr-12">
          <p className="text-sm text-[#29303B]/55">Project inquiry</p>
          <h2
            className="mt-2 text-balance font-[var(--font-heading)] text-[30px] font-medium leading-[1.08] tracking-[-1.5px] sm:text-[38px]"
            id="project-inquiry-title"
          >
            Tell me what you’re building
          </h2>
          <p className="mt-3 max-w-[540px] text-sm leading-6 text-[#29303B]/65 sm:text-[15px]">
            Share a few details and I’ll get back to you by email.
          </p>
        </div>

        <div className="mt-5 rounded-[20px] bg-[#F4F7FA] px-3 py-2 sm:px-4 sm:py-3">
          <TallyContactForm />
        </div>
      </div>
    </dialog>
  );
}
