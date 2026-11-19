import { portfolioProjects, type PortfolioProjectId } from "@/lib/portfolio-chat-knowledge";

export type PortfolioReply = { text: string; title?: string; href?: string; image?: string; tag?: string };

function withProject(text: string, id: PortfolioProjectId): PortfolioReply {
  const { title, href, image, tag } = portfolioProjects[id];
  return { text, title, href, image, tag };
}

type Answer = { pattern: RegExp; reply: PortfolioReply };

// Specific projects come before broader topics so a named case study wins.
const answers: Answer[] = [
  { pattern: /contact|email|reach (her|you)|get in touch|hire|can we collaborat|lien he/, reply: {
    text: "You can reach Thuy at phuongthuy101222@gmail.com or use the contact form near the bottom of this page.",
  } },
  { pattern: /available|availability|open to work|remote|freelanc|full.time|part.time|contract|time.zone overlap/, reply: {
    text: "Thuy is available for UI, UX, UI/UX and Product Designer roles, including remote full-time, part-time and contract work from Ho Chi Minh City, Vietnam (UTC+7). Contact her at phuongthuy101222@gmail.com to discuss a role and time-zone overlap.",
  } },
  { pattern: /where.*(based|live|work|from)|location|based in|viet nam|vietnam|ho chi minh|o dau/, reply: {
    text: "Thuy is based in Ho Chi Minh City, Vietnam, in the UTC+7 time zone (Asia/Ho_Chi_Minh).",
  } },
  { pattern: /who (is|are)|about (thuy|yourself|her)|introduc|background|ban la ai/, reply: {
    text: "Thuy Nguyen is a UI/UX and product designer with two years of experience, based in Ho Chi Minh City, Vietnam (UTC+7). Her portfolio spans insurance, AI products, recruitment tools, mobile rewards and e-commerce.",
  } },
  { pattern: /how (many|long).*(year|design|work)|years of experience|how much experience|experience level|senior|junior/, reply: {
    text: "Thuy has two years of design experience. Her portfolio shows her contributions across UI/UX and product design projects.",
  } },
  { pattern: /result|impact|metric|conversion|outcome|measur|improv|success/, reply: {
    text: "The portfolio separates design work from measured product outcomes. Affina includes funnel data from an earlier live web flow; those figures should not be attributed to the newer screens without a separate measurement.",
    title: portfolioProjects.affina.title, href: portfolioProjects.affina.href,
    image: portfolioProjects.affina.image, tag: portfolioProjects.affina.tag,
  } },
  { pattern: /affina.*(partner|pro|family|customer)|partner.*affina|assisted sales/, reply: withProject(
    "For Affina’s customer and partner journeys, Thuy designed a family-insurance purchase model spanning self-service web and sales-assisted Affina Pro. She mapped rules, states and edge cases with business and engineering partners.", "affinaPartner",
  ) },
  { pattern: /affina|insurance|coverage|insured/, reply: withProject(
    "At Affina, Thuy designed a guided insurance purchase journey from a four-question survey through recommendations, plan comparison, declarations and payment. She designed the experience around AI-assisted recommendations, not the ranking model itself.", "affina",
  ) },
  { pattern: /zoan/, reply: withProject(
    "At Zoan AI, Thuy designed clearer content-creation workflows across web and mobile, including task flows, high-fidelity screens, prototypes, motion details and design-system foundations.", "zoan",
  ) },
  { pattern: /medhunt/, reply: withProject(
    "In MedHunt, Thuy mapped the recruitment journey from client request and candidate search through interviews, placement, warranty and fees. She used interactive HTML to clarify roles, statuses and handoff details.", "medhunt",
  ) },
  { pattern: /mcdonald|kiosk|self.order/, reply: withProject(
    "Thuy’s McDonald’s kiosk case is an independent design exploration, not a commissioned project. It focuses on helping first-time and occasional users find, choose and collect meals with more confidence.", "kiosk",
  ) },
  { pattern: /4oranges|reward|loyalty|qr scan/, reply: withProject(
    "For 4Oranges, Thuy designed a mobile rewards experience built around QR scans, supported by a UI kit for consistency.", "fourOranges",
  ) },
  { pattern: /trueprofit|shopify|firegroup/, reply: withProject(
    "At FireGroup, Thuy contributed to TrueProfit, a Shopify financial dashboard app, through landing-page improvements and onboarding illustrations. It was a product design internship, not ownership of the entire product.", "trueProfit",
  ) },
  { pattern: /\bai\b|artificial intelligence|ai experiment|dpox/, reply: withProject(
    "Zoan AI is Thuy’s main AI product case: she designed clearer creation workflows across web and mobile. Her DpoX experiment also explores generating and assembling AI video footage, with post-production by a motion designer.", "zoan",
  ) },
  { pattern: /developer|engineer|handoff|cross.functional|collaborat|work with dev/, reply: withProject(
    "Thuy works with developers early to clarify flows, edge cases and reusable UI states. MedHunt shows her interactive handoff approach with BA, operations and engineering.", "medhunt",
  ) },
  { pattern: /research|interview|usability|user test|validat|nghien cuu/, reply: withProject(
    "Thuy uses research to understand the task and friction points before refining a flow. Her kiosk case is an exploration of how first-time and occasional users choose and collect meals; the portfolio does not claim a large validation study.", "kiosk",
  ) },
  { pattern: /design system|component|ui kit|reusab|token/, reply: withProject(
    "Thuy builds reusable UI patterns and documents states so screens stay consistent across a flow. Her Affina work includes a shared web and mobile UI system.", "affina",
  ) },
  { pattern: /prototype|motion|animation|interaction/, reply: withProject(
    "Thuy uses prototypes and motion details to make interactions easier to review before handoff. Zoan AI shows this across web and mobile workflows.", "zoan",
  ) },
  { pattern: /responsive|mobile|cross.platform|web and app/, reply: withProject(
    "Thuy has designed for web and mobile, including Zoan AI’s cross-platform workflows and Affina’s reusable UI system. The case studies show the relevant screens and states.", "zoan",
  ) },
  { pattern: /figma|tool|software|skill|strength/, reply: {
    text: "Her portfolio shows Figma, design systems, responsive UI, prototyping, motion and implementation-aware design. Individual case studies show how she used those skills in context.",
  } },
  { pattern: /role|responsibilit|own|contribut/, reply: withProject(
    "Thuy’s role differs by project. At Affina she designed purchase journeys and UI patterns; at TrueProfit she contributed during a product design internship. Each case study clarifies its scope.", "affina",
  ) },
  { pattern: /constraint|trade.off|edge case|business rule|complex|biggest challenge/, reply: withProject(
    "Thuy maps business rules and edge cases before settling on a flow. The Affina customer and partner case shows how she translated insurance rules into responsive states and handoff details.", "affinaPartner",
  ) },
  { pattern: /\bux\b|process|approach|work flow|design process|design philosophy|prioriti/, reply: withProject(
    "Thuy starts by clarifying the user task and business rules, then maps journeys, explores flows, prototypes interactions and reviews feasibility with developers. Her kiosk study shows that process in a concrete self-ordering journey.", "kiosk",
  ) },
  { pattern: /project|portfolio|case stud|work|show me|industr|sector/, reply: {
    text: "Start with Affina for insurance journeys, Zoan AI for AI workflows, or MedHunt for complex operations and developer handoff. The Projects section below has the full collection.",
  } },
];

export function fallbackFor(question: string): PortfolioReply {
  const query = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  return answers.find(({ pattern }) => pattern.test(query))?.reply ?? {
    text: "The AI guide is unavailable right now, and the portfolio does not provide a verified answer to that question. Try asking about a project, UX process or developer handoff, or explore the work below.",
  };
}
