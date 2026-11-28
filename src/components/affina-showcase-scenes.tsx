import styles from "./affina-showcase.module.css";

export function SystemUpdateScene() {
  return <svg className={styles.sketch} viewBox="0 0 920 370" role="img" aria-label="Updating the design system, documenting changes, and notifying developers">
    <g stroke="#192022" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <g transform="rotate(-5 158 163)">
        <path d="M43 64h227v207H43z" fill="white" stroke="none"/>
        <path d="M65 88h180v152H65zM65 109h180M105 110v130"/>
        <circle cx="76" cy="99" r="1.5" fill="#192022"/><circle cx="84" cy="99" r="1.5" fill="#192022"/>
        <path d="M76 125h18m-18 10h13m-13 25h18m-18 10h13M119 125h35v32h-35zM169 125h61m-61 10h46m-46 11h52M119 176h111m-111 11h76m-76 18h111m-111 11h86"/>
        <path d="M133 139l8 8 17-20" strokeWidth="1"/>
      </g>
      <g transform="rotate(4 461 159)">
        <path d="M365 69l183 1-1 213-184-1z" fill="white" stroke="none"/>
        <path d="M385 99h139M386 106h85M387 133h10v10h-10zM390 136l3 3 7-9M408 135h101m-101 11h78M387 166h10v10h-10zM390 169l3 3 7-9M408 168h105m-105 11h86M386 207h128m-128 11h88m-88 11h112"/>
        <path d="M520 205l8-24 7 3-8 24-8 9z" fill="#192022"/>
      </g>
      <path d="M268 146q33-25 76-1m-13-13l15 14-20 3M551 166q43-34 84-4m-11-16l13 17-21 1"/>
      <g transform="rotate(-4 746 173)">
        <path d="M653 75h191v174H653z" fill="white" stroke="none"/>
        <path d="M675 94h146v98H675zM684 104h128v76H684zM666 202h163l13 12H655zM705 151l-10-10 11-10m29 0l11 10-10 10m-14-23l-6 28"/>
        <path d="M763 118h36v27h-36zM763 118l18 14 18-14"/>
        <path d="M779 151l5 5 10-11" strokeWidth="1"/>
      </g>
      <g transform="rotate(7 856 263)">
        <path d="M822 212h66v100h-66z" fill="white" stroke="none"/>
        <path d="M853 226c-9-1-11 16-2 18 10 2 14-16 2-18Zm-3 22-8 15-12 9 3 4 15-8 3-9-1 23-6 22h5l7-20 7 20h5l-8-28 1-16 11 12 4-3-15-19Z" fill="#192022" stroke="none"/>
      </g>
      <path d="M176 299q245 53 478-14" strokeDasharray="5 10"/>
      <path d="M645 282l13 1-8 11"/>
    </g>
    <g fill="#192022" fontFamily="var(--font-krub),sans-serif" fontSize="24">
      <text x="63" y="42" transform="rotate(-4 63 42)">Update the system</text>
      <text x="361" y="47" transform="rotate(3 361 47)">Document changes</text>
      <text x="654" y="51" transform="rotate(-3 654 51)">Notify developers</text>
    </g>
  </svg>;
}

export function CollaborationScene() {
  return <svg className={styles.sketch} viewBox="0 0 720 430" role="img" aria-label="Mapping the consultation flow, designing screens and refining the interface in code with Product, AI and IT teams, including business analysts and developers">
    <g fill="none" stroke="#192022" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path fill="white" stroke="none" d="M67 111l162-26 23 224-161 24zM284 71l168 14-14 237-168-15zM512 115l157-11 15 218-158 10z"/>
      <path d="M95 154l101-15m-97 28l70-10M110 204l28-4 5 33-29 3zM172 196l29-4 5 33-30 4zM144 215l23-3m-9-6l9 6-7 9M122 253l74-9m-66 20l60-8"/>
      <path d="M305 116l120 10-12 161-119-10zM305 151l115 10M315 135l23 2m10 1l21 2M312 178l88 7m-90 12l60 5m-63 25l85 7m-82 9l82 7M310 259l62 5"/>
      <path d="M541 146l105-8 9 139-106 7zM543 168l104-7M577 187l-17 16 20 13m31-31l20 13-17 17m-18-33l-6 38M561 245l73-5m-71 13l43-3"/>
      <path d="M202 71q27-38 74-10m-12-16l13 16-20 5M449 40q28-35 60-5m-13-16l14 17-21 1"/>
    </g>
    <g fill="#192022" fontFamily="var(--font-krub),sans-serif" fontSize="23"><text transform="translate(85 102) rotate(-9)">Map the flow</text><text transform="translate(295 64) rotate(5)">Design the screens</text><text transform="translate(508 96) rotate(-4)">Refine in code</text><text x="235" y="398">Product, AI &amp; IT teams</text><text x="237" y="426" fontSize="17">Business analysts &amp; developers</text></g>
  </svg>;
}

export function FounderVisionScene() {
  return <div className={styles.founderVision} role="img" aria-label="The Affina founder's vision for AI-assisted insurance selection">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/assets/affina/brand-rebuild/lead.png" alt="" className={styles.visionPortrait}/>
    <svg className={styles.sketch} viewBox="0 0 720 410" aria-hidden="true">
      <defs>
        <filter id="affina-founder-sticker" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="outline"/>
          <feFlood floodColor="white" result="paper"/>
          <feComposite in="paper" in2="outline" operator="in" result="whiteOutline"/>
          <feMerge><feMergeNode in="whiteOutline"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g stroke="#192022" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M265 190q31-38 69-18m-13-14l15 15-21 4"/>
        <path d="M353 87l282 14-11 218-282-14z" fill="white" stroke="none"/>
        <path d="M373 118l238 12-8 145-238-12zM373 143l236 12M385 131l7 0m6 1l7 0M392 166l39 2-3 66-39-2zM453 169l39 2-3 66-39-2zM514 172l61 3-3 66-61-3zM527 194l11 12 21-26M397 180l22 1m-23 10l17 1m38-9l22 1m-22 10l15 1M466 283l67 3m-31-13l-1 13"/>
        <path d="M262 342q125 34 251-13" strokeDasharray="5 10"/>
        <path d="M502 324l14 4-9 11"/>
        <path d="M602 58l3 10m-16-3l10 5m17-11l-6 9"/>
      </g>
      <g fill="#192022" fontFamily="var(--font-krub),sans-serif" fontSize="24"><text x="50" y="67" transform="rotate(-4 50 67)">Affina founder</text><text x="366" y="70" transform="rotate(3 366 70)">AI-assisted selection</text></g>
    </svg>
  </div>;
}

export function LeadScene() {
  return <div className={styles.leadVisual} role="img" aria-label="Affina founder beside the new Affina logo and three layers representing insurance, healthcare and finance">
    {/* The supplied portrait remains intact; collage styling is applied in the page. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.leadPhoto} src="/assets/affina/brand-rebuild/lead.png" alt="" />
    <svg className={styles.leadInk} viewBox="0 0 650 430" aria-hidden="true">
      <defs>
        <filter id="affina-founder-sticker" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="outline"/>
          <feFlood floodColor="white" result="paper"/>
          <feComposite in="paper" in2="outline" operator="in" result="whiteOutline"/>
          <feMerge><feMergeNode in="whiteOutline"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="#192022" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path fill="white" stroke="none" d="M348 105l177-20 19 171-177 20z"/>
        <path d="M377 137l93-10m-96 17l66-7"/>
        <path fill="white" d="M412 258l175 3-2 34-174-2zM425 302l175-2 1 34-176 2zM414 345l175 3-1 34-175-2z"/>
        <path d="M222 58C264 59 291 88 279 116m-3-16l3 16 14-7M316 223q13-20 43-20m-9-8l11 8-11 8"/>
      </g>
      <image href="/assets/affina/brand-rebuild/affina-horizontal.svg" x="384" y="169" width="124" height="32.062" preserveAspectRatio="xMidYMid meet"/>
      <g fontFamily="var(--font-krub),sans-serif" fill="#192022">
        <text x="37" y="50" fontSize="26" transform="rotate(-5 37 50)">Affina founder</text>
        <text x="375" y="126" fontSize="19" transform="rotate(-6 375 126)">Logo</text>
        <text x="441" y="282" fontSize="20">Insurance</text>
        <text x="453" y="326" fontSize="20">Healthcare</text>
        <text x="446" y="370" fontSize="20">Finance</text>
      </g>
    </svg>
  </div>;
}

export function AudienceScene() {
  return <svg className={styles.sketch} viewBox="0 0 700 420" role="img" aria-label="Young and middle-aged women beside the new Affina vivid pink swatch">
    <path fill="white" d="M51 79l218-14 16 267-219 15zM293 90l197 21-23 240-196-21z"/>
    <g stroke="#192022" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path fill="#192022" d="M115 168q-10-92 47-91 64-2 49 100l-25-6 7-38q-28 4-48-17-8 27-4 56z"/>
      <path d="M141 133C135 168 148 185 168 185C186 184 194 166 192 135M161 172Q168 177 175 172M159 184L157 199M176 184L179 199M153 198C120 203 99 236 95 288M183 198C214 207 231 240 235 284M114 231L109 287M217 236L222 284M103 290L228 284M153 198L168 222L183 198M168 222L171 286"/>
      <path d="M149 146Q154 143 159 145M176 145Q181 143 186 146M150 153Q153 151 156 153M177 153Q180 151 183 153M168 155L165 165L170 166M123 213L116 227M203 215L213 228"/>
      <path d="M167 240H169M168 254H170M168 268H170"/>
      <path fill="#192022" d="M332 175q-11-65 39-65 50-5 49 55l-18 9q-3-34-28-37-6 24-28 25l1 24z"/>
      <path d="M347 158C341 190 350 211 371 213C390 214 399 194 402 171M365 201Q373 207 381 201M361 212L357 232M379 212L381 233M354 232C327 237 308 266 303 306M384 234C411 245 424 276 427 310M318 270L316 310M410 276L414 317M311 310L423 318M354 232L367 255L384 234M367 255L364 313"/>
      <path d="M354 174Q359 171 364 174M381 175Q386 173 391 176M355 181Q359 179 362 182M380 183Q384 181 387 184M372 182L369 192L375 193M347 182C340 178 341 188 348 191M400 184C407 181 406 190 400 193M337 242L324 257M391 248L405 262"/>
      <circle cx="346" cy="194" r="2.3"/><circle cx="399" cy="197" r="2.3"/>
      <path d="M365 273H367M365 288H367M364 303H366"/>
      <path d="M77 366q206-12 390 7M468 108Q475 77 507 88M498 78L508 88L495 92"/>
    </g>
    <g fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity=".7">
      <path d="M157 88q-27 4-29 51m37-51q-12 5-18 17m39-9q18 21 15 54M362 119q-20 4-23 29m33-28q21 4 28 27m-21-20q14 8 19 21"/>
    </g>
    <path fill="#ff51ff" d="M520 137l133 15-17 155-135-16z"/>
    <g fill="#192022" fontFamily="var(--font-krub),sans-serif" fontSize="24"><text x="513" y="109" transform="rotate(6 513 109)">Vivid pink</text><text x="513" y="344" fontSize="18">#FF51FF</text></g>
  </svg>;
}
