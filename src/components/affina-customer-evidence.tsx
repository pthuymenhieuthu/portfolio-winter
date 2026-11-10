import { affinaCxEvidence as evidence } from "@/data/affina-cx-evidence";

const number = (value: number) => value.toLocaleString("en-US");

export function AffinaCustomerEvidence() {
  return (
    <section id="affina-customer-evidence" className="scroll-mt-24">
      <h2 className="font-[var(--font-affina-heading)] text-[30px] leading-[1.2] tracking-[-0.02em] sm:text-[40px]">What customers say about the app</h2>
      <p className="mt-4 max-w-[72ch] text-sm leading-6 text-[#62666b]">Post-claim satisfaction survey · {evidence.period}. Context for the wider app experience, separate from the purchase funnel.</p>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-[#d8dde5] py-7 lg:grid-cols-4">
        {[
          [number(evidence.rated), "Rated responses"],
          [`${evidence.mean.toFixed(2)}/5`, "Average rating"],
          [`${evidence.satisfiedPercent}%`, "Satisfied · scores 4–5"],
          [`${evidence.dissatisfiedPercent}%`, "Dissatisfied · scores 1–2"],
        ].map(([value, label]) => (
          <div key={label}>
            <dt className="text-sm leading-5 text-[#62666b]">{label}</dt>
            <dd className="mt-3 font-[var(--font-affina-heading)] text-[30px] leading-none tabular-nums text-[#17213a] sm:text-[36px]">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2">
        {evidence.issues.map((issue) => (
          <div key={issue.label}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <h3 className="font-medium text-[#17213a]">{issue.label}</h3>
              <span className="shrink-0 tabular-nums text-[#62666b]">{issue.count} · {issue.share}%</span>
            </div>
            <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e3eaf3]">
              <div className="h-full rounded-full bg-[#2c86ff]" style={{ width: `${issue.count / 186 * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-5 text-[#62666b]">Shares use the dashboard’s {evidence.issueSummaryComments}-comment issue summary. Themes overlap; one comment can mention several issues.</p>

      <p className="mt-7 max-w-[72ch] text-sm leading-6 text-[#454b57]">Among {evidence.positiveComments} positive comments, recurring themes included service satisfaction ({evidence.positiveThemes[0].count}), speed ({evidence.positiveThemes[1].count}) and ease of use ({evidence.positiveThemes[2].count}).</p>

      <details className="mt-8 border-y border-[#d8dde5] py-5 text-sm text-[#454b57]">
        <summary className="min-h-6 cursor-pointer font-medium text-[#17213a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2c86ff]">Source, sample & reading notes</summary>
        <div className="mt-5 space-y-6 leading-6">
          <p>Internal CX dashboard, reviewed {evidence.reviewedAt}. {number(evidence.sent)} survey invitations; {number(evidence.rated)} rated responses (98% as reported); {number(evidence.writtenComments)} written comments. Responses are survey submissions, not unique customers. Customer and company identities are omitted.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] text-left text-sm tabular-nums">
              <caption className="mb-3 text-left font-medium">Ratings distribution</caption>
              <thead><tr className="border-b border-[#d8dde5]"><th className="py-2 font-medium">Score</th><th className="py-2 text-right font-medium">Responses</th><th className="py-2 text-right font-medium">Share</th></tr></thead>
              <tbody>{evidence.scores.map((row) => <tr className="border-b border-[#e4e8ee]" key={row.score}><td className="py-2">{row.score}/5</td><td className="text-right">{number(row.count)}</td><td className="text-right">{(row.count / evidence.rated * 100).toFixed(1)}%</td></tr>)}</tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] text-left text-sm tabular-nums">
              <caption className="mb-3 text-left font-medium">Two complete months · descriptive comparison</caption>
              <thead><tr className="border-b border-[#d8dde5]"><th className="py-2 font-medium">Month</th><th className="py-2 text-right font-medium">Responses</th><th className="py-2 text-right font-medium">Rating</th><th className="py-2 text-right font-medium">Satisfied</th></tr></thead>
              <tbody>{evidence.completeMonths.map((row) => <tr className="border-b border-[#e4e8ee]" key={row.month}><td className="py-2">{row.month}</td><td className="text-right">{row.rated}</td><td className="text-right">{row.mean.toFixed(2)}/5</td><td className="text-right">{row.satisfiedPercent}%</td></tr>)}</tbody>
            </table>
          </div>
          <p>November is a partial month and is excluded from this comparison. The dashboard does not establish a controlled before/after redesign result or a causal conversion uplift.</p>
        </div>
      </details>
    </section>
  );
}
