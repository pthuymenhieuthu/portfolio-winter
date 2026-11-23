import { ArrowDown } from "lucide-react";
import { CaseStudyBubbleCard } from "@/components/case-study-bubble-card";

const paths = [
  { title: "Affina Pro", subtitle: "Sales-assisted", steps: ["Sales fills data", "Sales prepares order", "Send request to buyer", "Customer confirms"] },
  { title: "Web App", subtitle: "Self-service", steps: ["Customer fills data", "Customer selects plan", "Customer completes info"] },
];

function Join({ merge = false }: { merge?: boolean }) {
  return <svg aria-hidden="true" className="h-10 w-full text-[#83a4be]" viewBox="0 0 600 40" preserveAspectRatio="none" fill="none">
    <path d={merge ? "M150 0V14Q150 20 156 20H294Q300 20 300 26V40M450 0V14Q450 20 444 20H306Q300 20 300 26" : "M300 0V14Q300 20 294 20H156Q150 20 150 26V40M300 14Q300 20 306 20H444Q450 20 450 26V40"}
      stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
  </svg>;
}

export function PartnerJourneyDiagram() {
  return (
    <figure data-partner-journey-diagram="true" className="mx-auto mt-12 w-full max-w-[760px] text-center">
      <CaseStudyBubbleCard staticFilm tone="accent" className="mx-auto max-w-[300px] px-6 py-5 text-base font-medium">Buy for multiple members</CaseStudyBubbleCard>
      <Join />
      <div className="grid grid-cols-2 items-stretch gap-4 sm:gap-10">
        {paths.map(path => <section key={path.title} aria-label={path.subtitle} className="flex min-w-0 flex-col">
          <CaseStudyBubbleCard staticFilm tone="accent" className="px-3 py-4 sm:px-5">
            <h3 className="text-base font-medium">{path.title}</h3>
            <p className="mt-1 text-xs text-[#526677]">{path.subtitle}</p>
          </CaseStudyBubbleCard>
          <ArrowDown className="mx-auto my-3 size-4 shrink-0 text-[#83a4be]" aria-hidden="true" />
          <ol className="flex flex-1 flex-col justify-between">
            {path.steps.map((step, index) => <li key={step}>
              <CaseStudyBubbleCard staticFilm className="flex min-h-[76px] items-center justify-center px-3 py-4 text-sm leading-5 text-[#345e7a] sm:px-5">{step}</CaseStudyBubbleCard>
              {index < path.steps.length - 1 && <ArrowDown className="mx-auto my-3 size-4 text-[#83a4be]" aria-hidden="true" />}
            </li>)}
          </ol>
        </section>)}
      </div>
      <Join merge />
      <CaseStudyBubbleCard staticFilm tone="accent" className="mx-auto max-w-[240px] px-6 py-4 text-base font-medium">Payment</CaseStudyBubbleCard>
      <ArrowDown className="mx-auto my-3 size-4 text-[#83a4be]" aria-hidden="true" />
      <CaseStudyBubbleCard staticFilm tone="accent" className="mx-auto max-w-[300px] px-6 py-5 text-base font-medium">Family policy</CaseStudyBubbleCard>
      <figcaption className="mt-5 text-sm text-[#626773]">Both paths lead to one family policy.</figcaption>
    </figure>
  );
}
