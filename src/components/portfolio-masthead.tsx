import { HorseGreeting } from "./horse-greeting";
import styles from "./portfolio-masthead.module.css";

type SceneObject = {
  name: string;
  crop: string;
  image?: string;
  size?: number;
};

// Individual viewports let the scene objects move independently.
const OBJECTS: readonly SceneObject[] = [
  { name: "affina", crop: "0 0 1254 1254", image: "/assets/portfolio/affina-supplied-preview-v2.png", size: 1254 },
  { name: "finance", crop: "0 0 1254 1254", image: "/assets/portfolio/finance-piggy-pixel-preview.png", size: 1254 },
  { name: "medhunt", crop: "0 0 1254 1254", image: "/assets/portfolio/medhunt-profile-pixel.png", size: 1254 },
  { name: "mingg", crop: "0 0 1254 1254", image: "/assets/portfolio/mingg-browser-cards.png", size: 1254 },
  { name: "playground", crop: "0 0 1254 1254", image: "/assets/portfolio/playground-arcade.png", size: 1254 },
  { name: "zoan", crop: "0 0 1254 1254", image: "/assets/portfolio/zoan-robot-preview.png", size: 1254 },
  { name: "accentEsc", crop: "0 0 724 724", image: "/assets/portfolio/accent-esc.png", size: 724 },
  { name: "accentStar", crop: "0 0 724 724", image: "/assets/portfolio/accent-star.png", size: 724 },
] as const;

export function PortfolioMasthead() {
  return (
    <header className={styles.hero}>
      <div className={styles.floor} aria-hidden="true">
        <div className={styles.floorPlane} />
      </div>
      <div className={styles.scene}>
        <div className={styles.artwork} aria-hidden="true">
          {OBJECTS.map((object) => (
            <svg
              key={object.name}
              viewBox={object.crop}
              className={`${styles.object} ${styles[object.name]}`}
            >
              <image
                href={object.image ?? "/assets/portfolio/still-life.png"}
                width={object.size ?? 1200}
                height={object.size ?? 1434}
              />
            </svg>
          ))}
        </div>
        <HorseGreeting />
        <p className={styles.sceneGuide}>Explore my little world</p>
      </div>
      <div className={styles.masthead}>
        <h1 className={styles.name}>
          <span className="sr-only">Thuy Nguyen</span>
          <svg aria-hidden="true" viewBox="0 0 1135 182">
            <text x="0" y="159" textLength="442" lengthAdjust="spacingAndGlyphs">THUY</text>
            <text x="472" y="159" textLength="660" lengthAdjust="spacingAndGlyphs">NGUYEN</text>
          </svg>
        </h1>
        <p className={styles.role}>A Proactive UX/Product Designer</p>
      </div>
    </header>
  );
}
