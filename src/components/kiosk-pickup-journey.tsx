import { ArrowDown, ArrowRight } from "lucide-react";
import type { KioskLanguage } from "@/data/kiosk-menu";
import { KioskPickupIsometric } from "@/components/kiosk-pickup-isometric";

const copy = {
  vi: { heading: "Hướng dẫn nhận món", steps: ["Giữ hoá đơn", "Theo dõi bảng gọi số", "Đến quầy nhận món"] },
  en: { heading: "Pickup instructions", steps: ["Keep your receipt", "Watch the order display", "Collect at the counter"] },
};

export function KioskPickupJourney({language}:{language:KioskLanguage}){
  const t=copy[language];
  return <section aria-label={t.heading} className="mx-auto my-9 max-w-[760px] border-y border-[#ededed] py-7 sm:py-8">
    <h5 className="text-center text-lg font-semibold">{t.heading}</h5>
    <ol className="mt-4 grid gap-8 sm:grid-cols-3 sm:gap-8">
      {t.steps.map((title,index)=><li key={index} className="relative grid grid-cols-[112px_1fr] items-center gap-4 min-[420px]:grid-cols-[140px_1fr] sm:block">
        <div className="relative mx-auto w-full max-w-[240px]"><KioskPickupIsometric stage={index} language={language}/></div>
        <p className="flex items-center gap-2 text-sm font-semibold sm:mt-2 sm:justify-center sm:text-center"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#fff0b5] text-xs">{index+1}</span>{title}</p>
        {index<2&&<><ArrowRight aria-hidden="true" className="absolute -right-6 top-[78px] hidden size-4 text-[#b5aa8d] sm:block"/><ArrowDown aria-hidden="true" className="absolute -bottom-6 left-[48px] size-4 text-[#b5aa8d] min-[420px]:left-[62px] sm:hidden"/></>}
      </li>)}
    </ol>
  </section>;
}
