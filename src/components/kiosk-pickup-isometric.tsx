import type { KioskLanguage } from "@/data/kiosk-menu";

const edge="#858582", crease="#c6c6c0", lip="#e8e8e3", yellow="#ffdf70";

function Ground(){
  return <g fill="none" stroke={lip} strokeWidth=".6" opacity=".65"><path d="m27 139 96 48 106-53M47 129l96 48m-76-58 96 48m-76-58 96 48M47 149l106-53m-86 63 106-53m-86 63 106-53"/></g>;
}

/** Original 2:1 line figures; yellow links the same pickup number across steps. */
export function KioskPickupIsometric({stage,language}:{stage:number;language:KioskLanguage}){
  return <svg viewBox="0 0 260 200" width="260" height="200" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".85" className="h-auto w-full">
    <Ground/>
    {stage===0&&<g>
      <g transform="matrix(1 .5 0 1 94 17)" fill="white" stroke={crease}><path d="M0 0h64v91l-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3Z"/></g>
      <g transform="matrix(1 .5 0 1 82 30)">
        <path d="M0 0h64v91l-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3Z" fill="white" stroke={edge}/>
        <path d="M1 3h62" stroke={lip}/><path d="M13 14h38m-32 5h26" stroke={crease}/>
        <rect x="9" y="29" width="46" height="28" rx="3" fill={yellow}/>
        <text x="32" y="49" fontSize="22" fontFamily="Arial,sans-serif" fontWeight="600" textAnchor="middle" fill="#4b493f">042</text>
        <path d="M12 68h27m5 0h8m-40 7h40" stroke={crease}/>
      </g>
    </g>}
    {stage===1&&<g>
      <path d="m101 145 23-11 26 13-23 11Z" fill="white" stroke={edge}/><path d="m103 148 24 12 23-11" stroke={lip}/>
      <path d="M116 108v34l9 4v-34" fill="white" stroke={edge}/>
      <g transform="matrix(1 .5 0 1 40 20)">
        <path d="m0 0 7-4h150l-7 4Z" fill="white" stroke={crease}/><path d="m150 0 7-4v64l-7 4Z" fill="white" stroke={edge}/>
        <rect width="150" height="64" rx="3" fill="white" stroke={edge}/><path d="M1 3h147M75 9v46" stroke={lip}/>
        <text x="37" y="17" fontSize="7.5" fontFamily="Arial,sans-serif" textAnchor="middle" fill="#92928b">{language==="vi"?"Đang chuẩn bị":"Preparing"}</text>
        <text x="112" y="17" fontSize="7.5" fontFamily="Arial,sans-serif" textAnchor="middle" fill="#68685f">{language==="vi"?"Sẵn sàng":"Ready"}</text>
        <text x="37" y="45" fontSize="22" fontFamily="Arial,sans-serif" textAnchor="middle" fill="#bebeb7">043</text>
        <rect x="87" y="25" width="50" height="27" rx="3" fill={yellow}/><text x="112" y="45" fontSize="22" fontFamily="Arial,sans-serif" fontWeight="600" textAnchor="middle" fill="#4b493f">042</text>
      </g>
    </g>}
    {stage===2&&<g>
      <path d="m51 113 103 52v25L51 138Z" fill="white" stroke={edge}/><path d="m154 165 57-29v25l-57 29Z" fill="white" stroke={edge}/><path d="m51 117 103 52 57-29m-136-4 53 27" stroke={lip}/>
      <path d="m43 105 61-31 115 58-61 31Z" fill="white" stroke={edge}/><path d="m43 105 115 58 61-31v4l-61 31-115-58Z" fill="white" stroke={crease}/>
      <g transform="matrix(1 .5 0 1 71 53)"><path d="M0 0h24v38l-4-2-4 2-4-2-4 2-4-2-4 2Z" fill="white" stroke={edge}/><rect x="3" y="12" width="18" height="11" rx="1" fill={yellow}/><text x="12" y="20" fontSize="8" fontFamily="Arial,sans-serif" fontWeight="600" textAnchor="middle" fill="#4b493f">042</text><path d="M5 29h14" stroke={crease}/></g>
      <g transform="matrix(1 .5 0 1 136 68)">
        <path d="m0 0 12-6h35L35 0Z" fill="white" stroke={crease}/><path d="m35 0 12-6 4 40-12 6Z" fill="white" stroke={edge}/><path d="M0 0h35l4 40H-4Z" fill="white" stroke={edge}/>
        <path d="M9 3v-10a8 8 0 0 1 16 0V3" stroke={edge}/><path d="M1 3h33m-35 32h38" stroke={lip}/><rect x="3" y="14" width="29" height="17" rx="2" fill={yellow}/><text x="17.5" y="26" fontSize="13" fontFamily="Arial,sans-serif" fontWeight="600" textAnchor="middle" fill="#4b493f">042</text>
      </g>
    </g>}
  </svg>;
}
