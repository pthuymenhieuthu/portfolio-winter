/* eslint-disable @next/next/no-img-element */
import styles from "./affina-showcase.module.css";

type Label = [number,number,number,number,string,number?];
const mobileLabels:Label[] = [
  [370,240,470,80,"Create Contract",46], [44,392,740,58,"INSURED PERSONS (5)",36],
  [234,515,750,50,"Primary insured",35], [234,826,750,50,"Wife",35],
  [234,1137,750,50,"Son",35], [234,1449,750,50,"Mother-in-law",35],
  [234,1760,750,50,"Father-in-law",35], [44,2080,750,65,"POLICYHOLDER",36],
  [234,2204,750,50,"Primary insured",35], [300,2645,570,100,"Continue",48],
];
const webLabels:Label[] = [
  [185,22,830,35,"INSURANCE PRODUCTS     SEARCH CONTRACTS     ABOUT US     NEWS     FOR SMES     CONTACT",16],
  [75,126,240,32,"View other products",17], [75,202,635,51,"Comprehensive Insurance",36],
  [75,259,410,25,"Coverage: Worldwide",15], [86,332,390,36,"Core Benefits",23],
  [91,389,450,32,"Basic     Savings     Standard     Advanced",17],
  [159,481,465,59,"Death or total permanent disability due to accident",16],
  [159,562,460,38,"Accident injury treatment cost/year",16],
  [159,619,460,56,"Death/disability due to illness, disease or maternity",16],
  [159,754,460,38,"Outpatient treatment for illness/year",16],
  [159,816,460,38,"Dental treatment/year",16], [548,896,111,28,"PREMIUM",12],
  [873,157,249,25,"POLICYHOLDER",13], [873,182,249,28,"No information yet",16],
  [880,249,320,38,"Add information",17],
  [931,334,272,23,"Primary insured",13], [931,446,272,23,"Wife of primary insured",13],
  [931,574,272,23,"Brother of primary insured",13], [931,702,272,23,"Daughter of primary insured",13],
  [931,830,272,23,"Son of primary insured",13],
];
const webBackgrounds = ["#fff", "#f3f9ff", "#fff", "#fff", "#fff", "#f5f5f5", "#fff", "#fafafa", "#fff", "#fff", "#fafafa", "#fff", "#fff", "#fff", "#2c86ff", "#fff", "#fff", "#fff", "#fff", "#fff"];

/** Original screen artwork with translated interface labels. */
export function AffinaFamilyReview({web=false}:{web?:boolean}) {
  const width=web?1280:1170;
  const height=web?2504:2913;
  const labels=web?webLabels:mobileLabels;
  return <div className={`${styles.originalReview} ${web?styles.originalWebReview:""}`}>
    <img src={`/assets/affina/product-review/family-${web?"web":"mobile"}-original.png`} width={width} height={height} alt={web?"Original Web App family insurance review. Sample data.":"Original Affina Pro family insurance review. Sample data."} loading="lazy"/>
    {labels.map(([x,y,w,h,text,size=16],i)=><span key={`${x}-${y}`} className={styles.screenTranslation} style={{left:`${x/width*100}%`,top:`${y/width*100}cqw`,width:`${w/width*100}%`,height:`${h/width*100}cqw`,fontSize:`${size/width*100}cqw`,fontWeight:web?(i===2||i===4||i===14?700:i>=6&&i<=10?400:600):600,background:web?webBackgrounds[i]:y>360&&y<2550?"#eef7ff":y>2600?"#f975c9":"#f6fbff",color:(!web&&y>2600)||(web&&i===14)?"white":web&&i>=15?"#a3a3a3":undefined,justifyContent:text==="Continue"||(web&&i===14)?"center":undefined,textAlign:text==="Continue"||(web&&i===14)?"center":undefined}}>{text}</span>)}
  </div>;
}
