import type { ReactNode } from "react";

type Point = [number, number, number];
const paper = "#fafafa";
const ink = "#66696b";
const crease = "#b6b8b9";
const faint = "#e0e1e2";
const project = ([x, y, z]: Point) => [180 + x - y, 146 + (x + y) / 2 - z * Math.sqrt(1.5)];
const points = (vertices: Point[]) => vertices.map(p => project(p).join(",")).join(" ");

function Box({ at: [x, y, z], size: [w, d, h], children }: { at: Point; size: Point; children?: ReactNode }) {
  return <g fill={paper} strokeLinejoin="round">
    <polygon points={points([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]])} stroke={ink} />
    <polygon points={points([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]])} stroke={ink} />
    <polygon points={points([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]])} stroke={ink} />
    {h > 3 && <polyline points={points([[x,y+d,z+h-2],[x+w,y+d,z+h-2],[x+w,y,z+h-2]])} stroke={faint} fill="none" />}
    {children}
  </g>;
}

function Face({ at, children }: { at: Point; children: ReactNode }) {
  const [x, y] = project(at);
  return <g transform={`matrix(1 .5 0 1 ${x} ${y})`} fill="none" stroke={crease}>{children}</g>;
}

function Disc({ at: [x,y,z], r, h }: {at:Point; r:number; h:number}) {
  const [cx,cy] = project([x,y,z+h]);
  const rx = r*Math.SQRT2;
  const ry = r/Math.SQRT2;
  const height=h*Math.sqrt(1.5);
  return <g fill={paper} stroke={ink}><path d={`M${cx-rx} ${cy}v${height}a${rx} ${ry} 0 0 0 ${rx*2} 0v-${height}`} /><ellipse cx={cx} cy={cy} rx={rx} ry={ry}/><path d={`M${cx-rx} ${cy+height-2}a${rx} ${ry} 0 0 0 ${rx*2} 0`} fill="none" stroke={faint}/></g>;
}

function Floor() {
  return <g stroke={faint} fill="none"><path d="m32 203 148 74 148-74M52 193l148 74M72 183l148 74M92 173l148 74M112 163l148 74M132 153l148 74M152 143l148 74M32 203l148-74M52 213l148-74M72 223l148-74M92 233l148-74M112 243l148-74M132 253l148-74M152 263l148-74" opacity=".4" /></g>;
}

function Kiosk() {
  return <>
    <Box at={[-35,-23,-16]} size={[80,54,4]} />
    <Box at={[-8,-8,-12]} size={[19,19,37]} />
    <Box at={[-26,-11,25]} size={[57,16,113]}>
      <Face at={[-21,5,131]}><rect width="47" height="87" rx="3" stroke={ink}/><path d="M5 11h32M5 17h22"/><rect x="5" y="26" width="10" height="10" rx="2"/><path d="M20 29h20m-20 5h13"/><rect x="5" y="43" width="10" height="10" rx="2"/><path d="M20 46h20m-20 5h13"/><rect x="5" y="60" width="10" height="10" rx="2"/><path d="M20 63h20m-20 5h13m-9 9 4 3 4-3"/><rect x="9" y="96" width="29" height="3" rx="1"/></Face>
    </Box>
  </>;
}

function FindScene() {
  return <>
    <Floor/><Kiosk/>
    <Box at={[48,5,99]} size={[33,3,37]}><Face at={[52,8,130]}><path d="M2 8c0-10 20-10 20 0Zm-1 4h22m-21 4h20M2 26h20"/></Face></Box>
    <Box at={[58,31,65]} size={[33,3,37]}><Face at={[62,34,96]}><path d="M6 1h12l-2 20H8Zm-2 0h16M12 1l3-8m-13 34h20"/></Face></Box>
    <Box at={[-63,20,44]} size={[33,3,37]}><Face at={[-59,23,75]}><path d="m4 9 3 14h13l3-14ZM7 9V0m5 9V-3m5 12V-1m5 10V2M4 29h19"/></Face></Box>
    <path d="M253 102v15m0 12v3" stroke={crease} strokeDasharray="2 4"/>
  </>;
}

function Burger({ at: [x,y,z] }: {at:Point}) {
  const [cx,cy] = project([x,y,z+18]);
  return <><Disc at={[x,y,z]} r={16} h={4}/><Disc at={[x,y,z+6]} r={17} h={3}/><Disc at={[x,y,z+11]} r={16} h={3}/><g stroke={ink} fill={paper}><path d={`M${cx-23} ${cy}C${cx-23} ${cy-23} ${cx+23} ${cy-23} ${cx+23} ${cy}C${cx+20} ${cy+13} ${cx-20} ${cy+13} ${cx-23} ${cy}Z`}/><path d={`m${cx-11} ${cy-6} 2-2m6-3 2 1m7 0 2-2m-10 9 2-1`} stroke={crease}/></g></>;
}

function ChooseScene() {
  return <>
    <Floor/>
    <Box at={[-59,-39,-5]} size={[120,78,4]}><polygon points={points([[-52,-32,0],[54,-32,0],[54,32,0],[-52,32,0]])} fill="none" stroke={faint}/></Box>
    <Box at={[15,-29,14]} size={[22,17,20]} />
    {[0,1,2,3].map(i=><Box key={i} at={[16+i*5,-25,34]} size={[3,3,15+i%2*5]}/>)}
    <Disc at={[33,18,14]} r={13} h={34}/>
    <Disc at={[33,18,49]} r={14} h={2}/>
    <polyline points={points([[35,17,52],[35,17,69],[41,17,72]])} stroke={ink} fill="none"/>
    <Burger at={[-29,9,21]}/>
    <path d="M132 181v19m89-13v15m-33-72v16" stroke={crease} strokeDasharray="2 4"/>
    <Box at={[-43,-31,85]} size={[62,3,27]}><Face at={[-37,-28,107]}><path d="M0 3h27m-27 6h44m-44 6h35"/></Face></Box>
  </>;
}

function CollectScene() {
  return <>
    <Floor/>
    <Box at={[-52,-16,-9]} size={[106,39,52]}/>
    <Box at={[-58,-21,43]} size={[118,49,5]}/>
    <Box at={[11,-7,49]} size={[27,16,32]}><Face at={[15,9,77]}><path d="M3 1v-7a5 5 0 0 1 10 0v7m-12 12h16"/></Face></Box>
    <Box at={[-20,-37,89]} size={[74,5,43]}><Face at={[-14,-32,126]}><path d="M2 3h23m8 0h23" stroke={faint}/><text x="4" y="29" fontFamily="Arial, sans-serif" fontSize="25" letterSpacing="3" stroke="none" fill={ink}>042</text></Face></Box>
    <Box at={[-66,39,26]} size={[35,1,56]}><Face at={[-61,40,76]}><path d="M1 4h20m-20 5h16"/><text x="0" y="27" fontFamily="Arial, sans-serif" fontSize="13" letterSpacing="1" stroke="none" fill={ink}>042</text><path d="M1 34h21m-21 5h16m-16 5h21" stroke={faint}/></Face></Box>
  </>;
}

const sceneComponents = [FindScene, ChooseScene, CollectScene];
const sceneNames = ["Find food: a self-ordering kiosk with visible food categories", "Choose a meal: burger, fries and drink separated above a tray", "Collect an order: a receipt and pickup display share order number 042"];

export function KioskScene({ stage }: {stage:number}) {
  const Scene = sceneComponents[stage];
  return <svg xmlns="http://www.w3.org/2000/svg" width="360" height="300" viewBox="0 0 360 300" role="img" aria-label={sceneNames[stage]} fill="none" strokeWidth=".8" strokeLinecap="round"><g transform="translate(27 56) scale(.85)"><Scene/></g></svg>;
}

export function KioskJourneyIllustration() {
  return <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-0">
    {(["Find", "Choose", "Collect"] as const).map((name,index)=><div key={name} className="min-w-0 sm:border-l sm:border-[#e5e5e5] sm:first:border-0">
      <div className="flex items-baseline justify-between px-5 pt-5 text-xs"><span className="font-medium">{name}</span><span className="tabular-nums text-[#909090]">FIG. 0{index+1}</span></div>
      <div className="mx-auto max-w-[360px] [&>svg]:h-auto [&>svg]:w-full"><KioskScene stage={index}/></div>
      <p className="px-5 pb-5 text-sm leading-relaxed text-[#666]">{["Where can I find it?", "What’s included?", "Where do I collect my order?"][index]}</p>
    </div>)}
  </div>;
}
