export const portfolioProjects = {
  affina: {
    title: "Affina — Brand Rebuild [P1]",
    href: "/blog/affina",
    image: "/assets/project-thumbnails/affina-pink-meadow-en.webp",
    tag: "Brand identity · Design system",
    facts: "Thuy rebuilt Affina’s logo, brand guidelines and design system, developed a mascot concept, and worked with developers to apply the identity to the product. She agreed Figma and JSON naming conventions with developers and documented system changes. The audience was young and middle-aged women. She worked directly with the founder on the direction.",
  },
  affinaPartner: {
    title: "Affina — Product Design [P2]",
    href: "/blog/affina-product-design",
    image: "/assets/affina-partner-flow/partner-thumbnail.png",
    tag: "AI consultation · Insurance & healthcare",
    facts: "Thuy worked with Product, AI and IT teams, including business analysts and developers, to map the insurance consultation flow, design screens and refine the UI in code. The showcase then covers healthcare service discovery and family insurance purchase, across sales-assisted Affina Pro and self-service Web App. Her role covered the recommendation experience, not the ranking model. App-wide satisfaction data is collected after claims and is not an outcome of the consultation design.",
  },
  zoan: {
    title: "Zoan AI — Designing Clearer AI Workflows",
    href: "/blog/zoan",
    image: "/assets/project-thumbnails/zoan.png",
    tag: "AI product · UI system",
    facts: "Thuy designed cross-platform interfaces for an early-stage AI content creation system. She built design-system foundations, task flows, high-fidelity screens, prototypes and motion details for web and mobile. The work focused on making complex AI workflows easier to understand.",
  },
  medhunt: {
    title: "MedHunt — Healthcare Recruitment OS",
    href: "/blog/medhunt",
    image: "/assets/project-thumbnails/medhunt-monitor-en.png",
    tag: "Recruitment · Developer handoff",
    facts: "Thuy mapped a healthcare recruitment workflow from customer request and candidate search through interviews, placement, warranty and fees. She worked in interactive HTML, clarified roles, statuses and edge cases, and iterated with BA, operations and engineering for developer handoff.",
  },
  kiosk: {
    title: "McDonald’s — Making Self-Ordering Easier",
    href: "/blog/mcdonalds-kiosk",
    image: "/assets/kiosk/thumbnail-mockup.png",
    tag: "UX process · Research exploration",
    facts: "An independent mini case study exploring how first-time and occasional kiosk users can find, choose and collect meals with more confidence. It is a design exploration, not a commissioned McDonald’s project.",
  },
  fourOranges: {
    title: "4Oranges — Turning QR Scans into Rewards",
    href: "/blog/4oranges",
    image: "/assets/project-thumbnails/4oranges.png",
    tag: "Mobile app · UI kit",
    facts: "Thuy designed a mobile rewards experience around QR scans for 4Oranges and a UI kit to keep the app consistent.",
  },
  trueProfit: {
    title: "TrueProfit — Rethinking Shopify Onboarding",
    href: "/blog/trueprofit",
    image: "/trueprofit-mobile-poster.jpg",
    tag: "E-commerce · Product design",
    facts: "At FireGroup, Thuy contributed to TrueProfit, a Shopify financial dashboard app, including landing-page improvements and onboarding illustrations. Her role was a product design internship, not ownership of the entire product.",
  },
} as const;

export type PortfolioProjectId = keyof typeof portfolioProjects;

export const portfolioContext = [
  "Thuy Nguyen is a UI/UX and product designer based in Ho Chi Minh City, Vietnam, in the Asia/Ho_Chi_Minh time zone (UTC+7), with two years of design experience. She is currently available for UI Designer, UX Designer, UI/UX Designer and Product Designer roles, including remote full-time, part-time and contract work from Vietnam. Time-zone overlap for a particular role should be discussed rather than assumed. Her portfolio covers insurance, AI products, healthcare recruitment, mobile rewards, self-service kiosks and e-commerce. Her tools and skills include Figma, design systems, responsive UI, prototyping, motion and implementation-aware design. Contact: phuongthuy101222@gmail.com.",
  "Her process: understand the user task and business rules; map journeys, roles and edge cases; explore and prototype flows; build reusable UI; review feasibility and handoff with developers. Do not claim a measured improvement unless the case study explicitly provides evidence.",
  "Other portfolio work includes Pizzy, a social shared-budget app concept; the six-week Mingg landing-page UI challenge; UI and motion for language-learning apps; a CakeBank round-up savings take-home assignment; and marketing graphics for e-commerce campaigns. The DpoX AI experiment covers generating and assembling AI video footage, with post-production handled by a motion designer. These are distinct projects and roles; do not imply they were all shipped commercial products.",
  ...Object.entries(portfolioProjects).map(([id, project]) => `${id}: ${project.facts} Case study: ${project.href}`),
].join("\n");
