import Link from "next/link";
import { KioskPrototype } from "@/components/kiosk-prototype";

export const metadata = {
  title: { absolute: "McDonald’s Kiosk — Interactive Concept | Thuy Nguyen" },
  description: "A bilingual self-ordering kiosk concept. Find a meal, customize your order and understand pickup instructions in Vietnamese or English.",
};

export default function KioskDemoPage({searchParams}:{searchParams:{mockup?:string}}){
  if(searchParams.mockup==="1") return <main className="h-[1920px] w-[1080px] overflow-hidden bg-white"><KioskPrototype standalone mockup/></main>;
  return <main className="min-h-screen bg-[#efefeb] px-3 pb-28 pt-6 sm:px-6 sm:pt-10"><div className="mx-auto mb-5 flex max-w-[960px] flex-wrap items-center justify-between gap-3 text-xs text-[#666]"><Link href="/blog/mcdonalds-kiosk#kiosk-directions" className="inline-flex min-h-11 items-center underline underline-offset-4">← Case study</Link><span>Independent UX/UI concept · VI / EN</span></div><KioskPrototype standalone/></main>;
}
