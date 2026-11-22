import data from "@/data/portfolio-chat-faq.json";
import type { PortfolioProjectId } from "@/lib/portfolio-chat-knowledge";

export type PortfolioFaq = {
  id: string; group: string; question: string; questionVi: string;
  answer: string; answerVi: string; aliases: string[]; project?: PortfolioProjectId; projects?: PortfolioProjectId[];
};

export const portfolioFaq: readonly PortfolioFaq[] = data as PortfolioFaq[];

export function normalizePortfolioQuestion(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim();
}

export function isVietnameseQuestion(value: string) {
  return /[à-ỹđ]/i.test(value) || /\b(thuy la ai|ban la ai|thiet ke|kinh nghiem|bao gia|lien he|dich vu|du an|lam gi|o dau|tieng anh|hoc van|bao lau|bat dau|cau hoi|nguoi dung|quy trinh|phoi hop|the manh)\b/.test(normalizePortfolioQuestion(value));
}

export function findPortfolioFaq(question: string): PortfolioFaq | undefined {
  const query = normalizePortfolioQuestion(question);
  if (!query) return;
  const exact = portfolioFaq.find((faq) => [faq.question, faq.questionVi, ...faq.aliases]
    .some((candidate) => normalizePortfolioQuestion(candidate) === query));
  if (exact) return exact;

  // Prefer a longer, specific phrase over a generic topic. Questions that do
  // not match stay with the existing fallback instead of guessing an answer.
  let winner: PortfolioFaq | undefined;
  let bestScore = 0;
  for (const faq of portfolioFaq) {
    for (const alias of faq.aliases) {
      const phrase = normalizePortfolioQuestion(alias);
      if (` ${query} `.includes(` ${phrase} `)) {
        const score = phrase.split(" ").length * 10 + phrase.length / 100;
        if (score > bestScore) { bestScore = score; winner = faq; }
      }
    }
  }
  return winner;
}

// The AI and the offline guide share the same prepared facts and scope limits.
export const portfolioFaqContext = portfolioFaq.map((faq) =>
  `Q: ${faq.question}\nA: ${faq.answer}`
).join("\n\n");
