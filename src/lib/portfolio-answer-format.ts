/** Keep prepared, generated and restored answers equally easy to scan. */
export function portfolioAnswerParagraphs(text: string): string[] {
  const paragraphs = text.trim().split(/\n+|(?<=[.!?])\s+(?=[A-ZÀ-Ỹ])/u).filter(Boolean);
  // A one-word confirmation belongs with the explanation that follows it.
  if (/^(Yes|No|Có|Không)\.$/.test(paragraphs[0] ?? "") && paragraphs.length > 1) {
    paragraphs.splice(0, 2, `${paragraphs[0]} ${paragraphs[1]}`);
  }
  return paragraphs.map((paragraph) => paragraph.split(/(\*\*[^*\n]+\*\*)/g).map((part) =>
    part.startsWith("**") ? part : part.replace(
      /McDonald[’']s(?: kiosk)?|Affina(?: Pro)?|Zoan AI|MedHunt|4Oranges|TrueProfit|Pizzy|Mingg|CakeBank|DpoX|Trùm Chinese|Trum Chinese/g,
      (name) => `**${name}**`,
    )
  ).join(""));
}
