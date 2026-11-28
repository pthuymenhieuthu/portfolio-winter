/* eslint-disable @next/next/no-img-element */
import styles from "./affina-legacy-web-preview.module.css";

const assets = "/assets/affina/brand-rebuild/legacy-web/";

/** The first desktop fold of Figma node 2078:2, scaled to fill the iMac screen. */
export function AffinaLegacyWebPreview() {
  return <div className={styles.page} role="img" aria-label="Affina website design: sky background, family photograph and insurance consultation">
    <img className={styles.sky} src={`${assets}sky.png`} alt="" width={1814} height={955}/>
    <div className={styles.header}>
      <div className={styles.navigation}>
        <img src={`${assets}logo.svg`} alt="Affina" width={166.341} height={33.2864}/>
        <span className={styles.products}>PRODUCTS <img src={`${assets}chevron.svg`} alt="" width={28.3438} height={28.3438}/></span>
        <span>ABOUT US</span><span>COMMUNITY</span><span>CONTACT</span>
      </div>
      <div className={styles.actions}>
        <img src={`${assets}search.svg`} alt="" width={34.0125} height={34.0125}/>
        <span className={styles.language}><i aria-hidden="true"/> English</span>
        <span className={styles.solution}><img src={`${assets}star.svg`} alt="" width={28.3438} height={28.3438}/>Insurance solutions</span>
      </div>
    </div>
    <div className={styles.hero}>
      <div className={styles.copy}>
        <h3>Choose insurance<br/>coverage<br/><span>that fits your<br/>needs</span></h3>
        <p>Simple. Transparent. Effective.</p>
        <span className={styles.start}><img src={`${assets}start.svg`} alt="" width={24} height={24}/>Get started now</span>
      </div>
      <div className={styles.family}>
        <div className={styles.back}/><div className={styles.front}/>
        <img src={`${assets}family.png`} alt="" width={775} height={435.438}/>
      </div>
    </div>
  </div>;
}
