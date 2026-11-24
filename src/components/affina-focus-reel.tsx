"use client";

import { ScreenFocusCarousel } from "@/components/screen-focus-carousel";

const screens = [
  ["00-intro", "Start your insurance journey", "A clear starting point introduces the guided insurance search."],
  ["01-insurance-type", "Choose your insurance", "Select the type of protection to keep the next questions relevant."],
  ["02-insured-person", "Tell us who needs coverage", "Capture the insured person’s basic details before recommending plans."],
  ["03-monthly-budget", "Set a comfortable budget", "Narrow the options to plans that fit the customer’s monthly budget."],
  ["04-preferred-insurer", "Choose preferred insurers", "Include insurer preferences while keeping the available options visible."],
  ["05-matching", "Find matching plans", "Translate the customer’s needs into a focused shortlist of insurance plans."],
  ["07-comparison", "Compare before choosing", "Review benefits and prices side by side before selecting a plan."],
];

export function AffinaFocusReel() {
  return <ScreenFocusCarousel id="affina-focus-reel" label="Affina interface gallery"
    className="-mx-5 sm:-mx-8"
    screens={screens.map(([name, title, description]) => ({
      src: `/assets/affina/ai-journey/${name}.webp?v=figma-20261119`,
      title, description, width: name === "07-comparison" ? 1508 : 1533,
      height: name === "07-comparison" ? 4096 : 3317,
    }))} />;
}
