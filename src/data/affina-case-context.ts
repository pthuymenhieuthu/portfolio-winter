// Curated aggregate values only. Never add source records, customer/company
// names, identifiers, raw comments, dashboard URLs or access credentials here.
export const affinaCaseContext = {
  retail: {
    source: "Affina retail segmentation",
    asOf: "27 Jul 2026",
    medianBuyerAge: 32,
    insuredUnder18Percent: 48.6,
  },
  experience: {
    source: "Affina app satisfaction survey",
    period: "Oct 2024–27 Nov 2026",
    responses: 11897,
    mean: 4.13,
    dissatisfiedPercent: 9.6,
    // The survey is sent after a claim submission; these are app-wide
    // observations, not measured outcomes of the consultation design.
    collection: "Collected after claim submission",
  },
} as const;
