import Image from "next/image";
import { Search } from "lucide-react";

function Food({file}:{file:string}){
  return <Image src={`/assets/kiosk/food/${file}`} alt="" width={180} height={150} unoptimized className="h-full w-full object-contain"/>;
}

const descriptions=[
  "Front view of a kiosk menu. The category list is cut off at the bottom with no scrolling cue, leaving more food categories hidden.",
  "Front view of a kiosk comparing a Big Mac and Big Mac Meal. Both show the same burger photo and a price, but no explanation of the meal contents.",
  "Front view of a kiosk confirmation screen showing order number 042 and table number 12, without explaining which number to follow or where to collect the order.",
];

const annotations=[
  {title:"No cue to scroll",text:"More categories are hidden below this list.",x:34,y:337,rx:31,ry:29,path:"M65 337C88 337 77 303 90 303",position:"left-[32%] top-[70%] w-[65%]"},
  {title:"What’s in the meal?",text:"The same image appears, with no list of included items.",x:197,y:183,rx:45,ry:43,path:"M190 226C190 251 116 247 116 271",position:"left-[5%] top-[70%] w-[76%]"},
  {title:"Which number?",text:"Order 042 or table 12? The pickup step is unclear.",x:196,y:176,rx:44,ry:44,path:"M193 220C193 251 116 249 116 271",position:"left-[5%] top-[70%] w-[87%]"},
];

function ProblemAnnotation({stage}:{stage:number}){
  const annotation=annotations[stage];
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <svg viewBox="0 0 260 384" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none"><ellipse cx={annotation.x} cy={annotation.y} rx={annotation.rx} ry={annotation.ry} stroke="#bc8500" strokeWidth="2"/><path d={annotation.path} stroke="#bc8500" strokeWidth="1.5"/></svg>
    <div className={`absolute rounded-xl border border-[#e4bd54] bg-[#fff8df] px-3 py-2.5 text-left shadow-[0_3px_10px_rgba(87,65,5,0.06)] ${annotation.position}`}><p className="text-[11px] font-semibold leading-[1.35] text-[#594515]">{annotation.title}</p><p className="mt-1 text-[11px] leading-[1.4] text-[#6c5b32]">{annotation.text}</p></div>
  </div>;
}

export function KioskProblemScreen({stage}:{stage:number}){
  return <div role="img" aria-label={descriptions[stage]} className="relative mx-4 mb-5 mt-4 overflow-hidden rounded-[14px] border-[3px] border-[#373737] bg-white">
    <div aria-hidden="true" className="pointer-events-none select-none">
      <div className="flex h-10 items-center justify-between border-b border-[#ededed] px-3"><span className="text-xs font-semibold tracking-tight">McDonald’s</span><span className="text-[10px] text-[#737373]">EN</span></div>
      {stage===0&&<div className="h-[320px] overflow-hidden">
        <div className="border-b border-[#ededed] p-3"><p className="text-sm font-semibold">Our menu</p><div className="mt-2 flex h-7 items-center gap-2 rounded bg-[#f4f4f4] px-2 text-[10px] text-[#999]"><Search className="size-3"/>Search</div></div>
        <div className="grid h-[230px] grid-cols-[65px_1fr] overflow-hidden">
          <div className="relative overflow-hidden border-r border-[#ededed] bg-[#fafafa] px-1.5 pt-2">{[{name:"Burgers",image:"big-mac.png"},{name:"Chicken",image:"chicken.png"},{name:"Meals",image:"fries.png"},{name:"Sides",image:"corn.png"}].map((category,index)=><div key={category.name} className={`mb-2 flex h-[69px] flex-col items-center justify-center rounded-md px-1 ${index===0?"bg-[#fff0ba]":""}`}><div className="h-10 w-11"><Food file={category.image}/></div><span className="mt-1 text-[9px] text-[#666]">{category.name}</span></div>)}<div className="absolute inset-x-0 bottom-0 h-5 border-t-2 border-dashed border-[#d6b34a] bg-[#fff2bf]/60"/></div>
          <div className="min-w-0 px-2 py-3"><p className="mb-3 text-xs font-medium">Burgers</p><div className="grid grid-cols-2 gap-2">{[{name:"Big Mac",file:"big-mac.png"},{name:"Cheeseburger",file:"cheeseburger.png"},{name:"Chicken Mayo",file:"mcchicken.png"}].map(product=><div key={product.name} className="min-w-0 rounded-md border border-[#ededed] p-1.5"><div className="h-14"><Food file={product.file}/></div><p className="mt-1 text-[9px] leading-snug text-[#666]">{product.name}</p></div>)}</div></div>
        </div>
      </div>}
      {stage===1&&<div className="h-[320px] px-3 py-4">
        <span className="text-[10px] text-[#737373]">← Back</span><p className="mt-2 text-sm font-semibold">Choose your meal</p><p className="mt-1 text-[10px] text-[#999]">Select an option to continue</p>
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-[#e6c660] bg-[#fffdf5] p-2">{[{name:"Big Mac",price:"76,000 ₫"},{name:"Big Mac Meal",price:"109,000 ₫"}].map(option=><div key={option.name} className="min-w-0 rounded-md border border-[#e9e9e9] bg-white p-2"><div className="h-16"><Food file="big-mac.png"/></div><p className="mt-3 min-h-8 text-[11px] font-medium leading-snug">{option.name}</p><p className="mt-1 text-[10px] text-[#737373]">{option.price}</p><div className="mt-4 rounded bg-[#f2f2f2] py-2 text-center text-[10px]">Select</div></div>)}</div>
      </div>}
      {stage===2&&<div className="h-[320px] px-4 py-5 text-center">
        <p className="text-sm font-semibold">Thank you!</p><p className="mt-2 text-[10px] text-[#999]">Your order is being prepared.</p>
        <div className="mt-5 grid grid-cols-2 divide-x divide-[#e6cf85] rounded-lg border border-[#e6c660] bg-[#fff7d8] py-4"><div><p className="text-[10px] text-[#737373]">Order no.</p><p className="mt-1 text-[35px] font-semibold leading-tight tracking-tight">042</p></div><div><p className="text-[10px] text-[#737373]">Table no.</p><p className="mt-1 text-[35px] font-semibold leading-tight tracking-tight">12</p></div></div>
        <p className="mt-6 text-xs">Please take a table number.</p><p className="mt-3 text-[10px] text-[#999]">Keep your receipt.</p><div className="mt-5 rounded-md bg-[#f4f4f4] py-2 text-[10px] text-[#737373]">Done</div>
      </div>}
      <div className="flex h-6 items-center justify-center border-t border-[#ededed] bg-[#fafafa]"><span className="h-1 w-10 rounded-full bg-[#dedede]"/></div>
    </div>
    <ProblemAnnotation stage={stage}/>
  </div>;
}
