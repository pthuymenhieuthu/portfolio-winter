import { ArrowDown, ArrowRight, UserRound } from "lucide-react";
import { KioskProblemScreen } from "@/components/kiosk-problem-screens";

const moments=[
  {stage:"Find",action:"Browse the menu",thought:"Where can I find it?"},
  {stage:"Choose",action:"Compare meal options",thought:"What’s included?"},
  {stage:"Collect",action:"Work out what to do next",thought:"Where do I collect my order?"},
];

export function KioskCustomerJourney(){
  return <figure id="kiosk-journey" className="mt-10 scroll-mt-28">
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <h3 className="font-[var(--font-heading)] text-2xl">Customer journey</h3>
      <span className="inline-flex items-center gap-2 text-xs text-[#737373]"><UserRound aria-hidden="true" className="size-4"/>First-time / occasional kiosk user</span>
    </div>
    <ol className="grid gap-10 md:grid-cols-3 md:gap-7">
      {moments.map((moment,index)=><li key={moment.stage} className="relative min-w-0">
        <div className="mb-4 flex items-center gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fff0b5] text-xs font-medium">0{index+1}</span><div><p className="text-sm font-medium">{moment.stage}</p><p className="mt-0.5 text-xs text-[#737373]">{moment.action}</p></div></div>
        <div className="overflow-hidden rounded-xl border border-[#e9e9e6] bg-[#fafafa]"><KioskProblemScreen stage={index}/><p className="px-5 pb-5 text-base leading-snug tracking-[-0.2px]">“{moment.thought}”</p></div>
        {index<2&&<><ArrowRight aria-hidden="true" className="absolute -right-6 top-3 hidden size-5 text-[#b6ad93] md:block"/><ArrowDown aria-hidden="true" className="mx-auto mt-7 size-5 text-[#b6ad93] md:hidden"/></>}
      </li>)}
    </ol>
    <figcaption className="mt-7 text-xs leading-relaxed text-[#737373]">Reconstructed screens illustrate potential friction points from secondary research. They are not captures of the current Vietnam kiosk. Customer thoughts are hypotheses, not participant quotes.</figcaption>
  </figure>;
}
