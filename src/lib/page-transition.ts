"use client";

import { useSyncExternalStore } from "react";

let active = false;
const listeners = new Set<() => void>();

export function setPageTransitionActive(value: boolean) {
  if (active === value) return;
  active = value;
  document.documentElement.toggleAttribute("data-page-transition", value);
  listeners.forEach(listener => listener());
}

export function usePageTransitionActive() {
  return useSyncExternalStore(
    listener => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    () => active,
    () => false,
  );
}
