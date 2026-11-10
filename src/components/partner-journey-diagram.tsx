import { partnerJourneySvg } from "@/data/partner-journey-svg";

export function PartnerJourneyDiagram() {
  return (
    <figure data-partner-journey-diagram="true" className="mx-auto mt-12 w-full max-w-[840px]">
      <div className="sr-only">
        <h3>Affina Pro · Sales-assisted</h3>
        <ol><li>Sales fills data</li><li>Sales prepares order</li><li>Send request to buyer</li><li>Customer confirms</li></ol>
        <h3>Web App · Self-service</h3>
        <ol><li>Customer fills data</li><li>Customer selects plan</li><li>Customer completes info</li></ol>
        <p>Both routes: payment, then a family policy.</p>
      </div>
      <div className="scrollbar-none overflow-x-auto" tabIndex={0} aria-label="Family insurance flowchart. Scroll horizontally on narrow screens.">
        <div aria-hidden="true" className="partner-journey-chart min-w-[600px]" dangerouslySetInnerHTML={{ __html: partnerJourneySvg }} />
      </div>
      <figcaption className="mt-5 text-center text-sm text-[#626773] sm:hidden">Swipe to compare both paths.</figcaption>
    </figure>
  );
}
