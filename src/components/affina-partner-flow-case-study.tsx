"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { cn } from "@/lib/utils";

const PROJECT_HERO_DELAY = 0.36;

const theme = {
  page: "#f9f4ff",
  ink: "#16051f",
  muted: "#715b7c",
  accent: "#b150ff",
  accent2: "#ff5cd6",
  dark: "#0b0610",
};

type CaseProject = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
};

const nextProjects = ["Affina", "Zoan AI", "TrueProfit"]
  .map((name) =>
    (DATA.projects as readonly CaseProject[]).find((project) =>
      project.title.toLowerCase().includes(name.toLowerCase())
    )
  )
  .filter((project): project is CaseProject => Boolean(project));

const complexityCards = [
  ["Multiple people", "1 contract -> N insured people"],
  ["Different plans", "Each person can have separate benefits"],
  ["Business rules", "Age and role determine the next action"],
  ["Dynamic pricing", "People + benefits update the total premium"],
];

const decisionRows = [
  {
    requirement: "Some age conditions only inform the customer, while others require adding another insured person.",
    clarification: "Using the same generic continue action made optional and mandatory cases feel identical.",
    decision: "Separate the CTAs: optional becomes Got it; mandatory becomes Add insured person.",
  },
  {
    requirement: "Multiple insured people can choose different plans and additional benefits.",
    clarification: "A contract-level model could not explain who owns which benefit or cost.",
    decision: "Move the structure from contract-first to people-first, with each insured person treated as an independent unit.",
  },
  {
    requirement: "Review and payment must show every insured person clearly before checkout.",
    clarification: "A single total premium did not give enough confidence for a multi-person contract.",
    decision: "Break review into contract summary, insured people, benefit breakdown, and total premium.",
  },
];

const stateRows = [
  ["No dependent required", "Continue purchase"],
  ["Dependent optional", "Inform + acknowledge"],
  ["Dependent mandatory", "Require adding person"],
  ["Maximum people reached", "Disable add action"],
  ["Person incomplete", "Show incomplete state"],
  ["Person completed", "Allow review and payment"],
];

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-lg bg-[#16051f] px-3 py-1.5 text-base text-white">
      {children}
    </span>
  );
}

function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex scroll-mt-24 flex-col gap-10 sm:gap-12" id={id}>
      <div className="flex flex-col gap-7">
        <SectionPill>{eyebrow}</SectionPill>
        <h2 className="max-w-[780px] font-[var(--font-affina-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-5xl sm:leading-[1.18]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[760px] space-y-5 text-base leading-7 text-[#715b7c] sm:text-lg sm:leading-8">
      {children}
    </div>
  );
}

function ConceptDiagram() {
  const people = ["Person 01", "Person 02", "Person 03"];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#16051f]/8 sm:p-8">
      <div className="mx-auto flex max-w-[780px] flex-col items-center gap-5 text-center">
        <div className="rounded-full bg-[#16051f] px-5 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white">
          Mua Kem
        </div>
        <div className="rounded-2xl border border-[#b150ff]/25 bg-[#f9f4ff] px-8 py-5">
          <p className="text-sm uppercase tracking-[0.12em] text-[#715b7c]">1 Contract</p>
        </div>
        <div className="h-10 w-px bg-[#b150ff]/35" />
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {people.map((person, index) => (
            <div
              className="rounded-2xl border border-[#b150ff]/20 bg-white p-5 text-left shadow-sm"
              key={person}
            >
              <p className="font-[var(--font-affina-heading)] text-xl font-bold text-[#16051f]">
                {person}
              </p>
              <p className="mt-4 rounded-lg bg-[#f9f4ff] px-3 py-2 text-sm text-[#715b7c]">
                Plan {index === 1 ? "B" : "A"}
              </p>
              <p className="mt-2 rounded-lg bg-[#fff2fb] px-3 py-2 text-sm text-[#715b7c]">
                Benefits
              </p>
            </div>
          ))}
        </div>
        <div className="h-10 w-px bg-[#b150ff]/35" />
        <div className="rounded-2xl bg-[#16051f] px-8 py-4 text-white">
          Total Premium
        </div>
      </div>
    </div>
  );
}

function FlowDiagram() {
  const steps = [
    "Choose program",
    "Basic information",
    "Choose plan",
    "Create contract",
    "Eligibility rule",
    "Add insured person",
    "Review",
    "Payment",
  ];

  return (
    <div className="rounded-2xl bg-[#16051f] p-6 text-white shadow-sm sm:p-8">
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div className="rounded-xl border border-white/15 bg-white/8 p-4" key={step}>
            <p className="text-sm text-white/50">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-[var(--font-affina-heading)] text-xl font-bold leading-tight">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleUnitShowcase() {
  const statuses = [
    ["Nguyen Van A", "Policyholder", "Completed"],
    ["Tran Minh B", "Dependent", "In progress"],
    ["Le Hoang C", "Dependent", "Not started"],
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#16051f]/8 sm:p-8">
      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          {statuses.map(([name, role, status]) => (
            <div className="rounded-xl border border-[#16051f]/10 p-4" key={name}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-[#16051f]">{name}</p>
                  <p className="mt-1 text-sm text-[#715b7c]">{role}</p>
                </div>
                <span className="rounded-full bg-[#f9f4ff] px-3 py-1 text-xs text-[#b150ff]">
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-[#f9f4ff] p-5">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#b150ff]">
            Person 02
          </p>
          <h3 className="mt-3 font-[var(--font-affina-heading)] text-2xl font-bold text-[#16051f]">
            Independent plan and benefit setup
          </h3>
          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-white p-4 text-sm text-[#715b7c]">Personal information</div>
            <div className="rounded-xl bg-white p-4 text-sm text-[#715b7c]">Selected plan</div>
            <div className="rounded-xl bg-white p-4 text-sm text-[#715b7c]">Additional benefits</div>
            <div className="rounded-xl bg-white p-4 text-sm text-[#715b7c]">Underwriting answers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingDiagram() {
  const rows = [
    ["Person 01", "Plan A + Benefit X", "1,200,000d"],
    ["Person 02", "Plan B + Benefit Y", "900,000d"],
    ["Person 03", "Plan A", "700,000d"],
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#16051f]/8 sm:p-8">
      <div className="space-y-4">
        {rows.map(([person, detail, amount]) => (
          <div className="grid gap-2 rounded-xl bg-[#f9f4ff] p-4 sm:grid-cols-[1fr_1.3fr_auto] sm:items-center" key={person}>
            <p className="font-bold text-[#16051f]">{person}</p>
            <p className="text-sm text-[#715b7c]">{detail}</p>
            <p className="font-bold text-[#b150ff]">{amount}</p>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-xl bg-[#16051f] p-5 text-white">
          <span className="font-bold">Total</span>
          <span className="font-[var(--font-affina-heading)] text-2xl font-bold">2,800,000d</span>
        </div>
      </div>
    </div>
  );
}

function NextProjectCard({
  project,
  featured = false,
}: {
  project: CaseProject;
  featured?: boolean;
}) {
  return (
    <Link
      href={project.href || "#"}
      className={cn(
        "group block overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.2fr_0.9fr] md:items-stretch"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#f9f4ff]",
          featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"
        )}
      >
        {(project.video || project.image) && (
          <Image
            src={project.image || project.video || ""}
            alt={project.title}
            width={1200}
            height={675}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            unoptimized
            sizes={featured ? "(max-width: 768px) 90vw, 560px" : "(max-width: 768px) 90vw, 440px"}
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-10 p-7 sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#b150ff]">
            {featured ? "Next project" : project.dates}
          </p>
          <h3
            className={cn(
              "mt-3 font-[var(--font-affina-heading)] font-bold leading-[1.18] tracking-normal",
              featured ? "text-3xl sm:text-4xl" : "text-2xl"
            )}
          >
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-[#715b7c]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 4 : 3).map((tag) => (
            <span className="rounded-full bg-[#f9f4ff] px-3 py-1.5 text-xs text-[#16051f]" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function AffinaPartnerFlowCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden font-sans text-[#16051f]" style={{ backgroundColor: theme.page }}>
      <section
        id="affina-partner-flow-overview"
        className="relative isolate flex min-h-[760px] max-w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_18%,#ffd360_0%,transparent_28%),radial-gradient(circle_at_82%_24%,#ff5cd6_0%,transparent_30%),linear-gradient(135deg,#ff6831_0%,#ff5cd6_48%,#7a35ff_100%)] px-6 text-center text-white sm:min-h-[800px]"
      >
        <Image
          src="/assets/affina/affina-hero-blob-top.svg"
          alt=""
          width={1440}
          height={422}
          priority
          className="pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[max(1800px,115vw)] max-w-none origin-center -translate-x-1/2 scale-x-[1.7] select-none"
        />
        <Image
          src="/assets/affina/affina-hero-blob-bottom.svg"
          alt=""
          width={1440}
          height={526}
          priority
          className="pointer-events-none absolute bottom-[-300px] left-1/2 -z-10 w-[max(1800px,115vw)] max-w-none origin-center -translate-x-1/2 scale-x-[1.7] select-none sm:bottom-[-340px]"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[620px] flex-col items-center gap-5">
          <p className="max-w-[calc(100vw-48px)] rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-base leading-tight backdrop-blur">
            Affina Pro & Web
          </p>
          <HeroTitleReveal
            className="max-w-[340px] font-[var(--font-affina-heading)] text-[clamp(36px,9.8vw,64px)] font-bold leading-[1.05] tracking-normal sm:max-w-none sm:text-[64px]"
            delay={PROJECT_HERO_DELAY}
            text="Affina Partner Flow"
            wrap
          />
          <BlurFade delay={1.12}>
            <p className="mx-auto max-w-[360px] text-base leading-[1.35] text-white sm:max-w-[520px]">
              Designing a multi-person insurance journey
              <br />
              <span className="text-white/75">· Turning business rules into clear UI, states, and handoff logic</span>
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex w-full max-w-[934px] flex-col gap-28 px-5 py-24 sm:gap-32 sm:px-8 lg:gap-36 lg:py-36">
        <CaseSection
          eyebrow="Overview"
          id="partner-flow-overview"
          title="Designing a scalable purchase flow for partner-led insurance"
        >
          <BodyText>
            <p>
              This flow expanded the insurance journey from one insured person
              to multiple insured people under the same contract across Affina
              Pro and Web.
            </p>
            <p>
              My role was to work with BA, Business Owner, Product, and IT to
              clarify requirements, translate rules into user flows, design UI
              states, and prepare implementation-ready handoff.
            </p>
          </BodyText>
          <ConceptDiagram />
          <div className="grid gap-4 sm:grid-cols-3">
            {["BRD 01", "BRD 02", "BRD 03"].map((item) => (
              <div className="rounded-xl border border-[#16051f]/10 bg-white p-5 shadow-sm" key={item}>
                <p className="font-bold text-[#16051f]">{item}</p>
                <p className="mt-3 text-sm leading-6 text-[#715b7c]">
                  Requirement evidence for multi-person rules, eligibility, and payment logic.
                </p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          eyebrow="The Challenge"
          id="partner-flow-challenge"
          title="Adding one more person changed the logic of the whole journey"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {complexityCards.map(([title, body]) => (
              <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#16051f]/8" key={title}>
                <h3 className="font-[var(--font-affina-heading)] text-2xl font-bold leading-tight">
                  {title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-[#715b7c]">{body}</p>
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          eyebrow="Requirements To Decisions"
          id="partner-flow-decisions"
          title="Working with BA and Business to turn rules into UI"
        >
          <div className="space-y-4">
            {decisionRows.map((row) => (
              <article className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#16051f]/8 md:grid-cols-3" key={row.requirement}>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#b150ff]">Requirement</p>
                  <p className="mt-3 text-sm leading-6 text-[#715b7c]">{row.requirement}</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#b150ff]">Clarification</p>
                  <p className="mt-3 text-sm leading-6 text-[#715b7c]">{row.clarification}</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#b150ff]">Design Decision</p>
                  <p className="mt-3 text-sm leading-6 text-[#16051f]">{row.decision}</p>
                </div>
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          eyebrow="Flow Structure"
          id="partner-flow-structure"
          title="From a single-person journey to a multi-person journey"
        >
          <FlowDiagram />
          <div className="grid gap-4 sm:grid-cols-4">
            {["Flow", "UI", "States", "Responsive"].map((item) => (
              <div className="rounded-xl bg-white p-5 text-center font-bold shadow-sm ring-1 ring-[#16051f]/8" key={item}>
                {item}
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          eyebrow="Multi-Person UI"
          id="partner-flow-people"
          title="Making each insured person a clear unit"
        >
          <BodyText>
            <p>
              Instead of treating everyone as one large form, each insured
              person became an independent information unit with identity,
              configuration, navigation, and progress.
            </p>
          </BodyText>
          <PeopleUnitShowcase />
        </CaseSection>

        <CaseSection
          eyebrow="Rules And Edge Cases"
          id="partner-flow-rules"
          title="Designing beyond the happy path"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {stateRows.map(([scenario, response]) => (
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#16051f]/8" key={scenario}>
                <p className="font-bold text-[#16051f]">{scenario}</p>
                <p className="mt-2 text-sm text-[#715b7c]">{response}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          eyebrow="Review And Pricing"
          id="partner-flow-pricing"
          title="Making a complex contract easier to review before payment"
        >
          <BodyText>
            <p>
              The review screen had to shift from contract-first to people-first
              so each person&apos;s plan, benefits, and premium could be understood
              before checkout.
            </p>
          </BodyText>
          <PricingDiagram />
        </CaseSection>

        <CaseSection
          eyebrow="Web + Affina Pro"
          id="partner-flow-platforms"
          title="One business logic, adapted to two product contexts"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["Web", "Responsive purchase flow for customers and partner-led journeys."],
              ["Affina Pro", "Operational product context for partners working through the same rules."],
            ].map(([title, body]) => (
              <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#16051f]/8" key={title}>
                <p className="font-[var(--font-affina-heading)] text-3xl font-bold">{title}</p>
                <p className="mt-5 text-base leading-7 text-[#715b7c]">{body}</p>
                <div className="mt-6 grid gap-3">
                  {["Purchase flow", "Responsive states", "Review", "Payment"].map((item) => (
                    <div className="rounded-lg bg-[#f9f4ff] px-4 py-3 text-sm text-[#16051f]" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          eyebrow="Handoff"
          id="partner-flow-handoff"
          title="From design decisions to implementation"
        >
          <BodyText>
            <p>
              Once the structure and interaction rules were aligned, I prepared
              the UI for implementation with reusable components, variants,
              responsive behavior, error states, interaction notes, and
              developer handoff details.
            </p>
          </BodyText>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Components", "Variants", "Responsive states", "Error states", "Interaction", "Developer notes"].map((item) => (
              <div className="rounded-xl bg-white p-5 text-center font-bold shadow-sm ring-1 ring-[#16051f]/8" key={item}>
                {item}
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          eyebrow="Outcome"
          id="partner-flow-outcome"
          title="A clearer foundation for multi-person partner purchase flows"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Clearer structure", "Multiple insured people can sit inside one contract without becoming one large form."],
              ["More explicit rules", "Mandatory and optional actions are communicated differently at critical moments."],
              ["Transparent pricing", "Each person's premium and benefits can be understood before payment."],
              ["Scalable foundation", "The structure can support additional insured people and future partner flows."],
            ].map(([title, body]) => (
              <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#16051f]/8" key={title}>
                <h3 className="font-[var(--font-affina-heading)] text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-base leading-7 text-[#715b7c]">{body}</p>
              </article>
            ))}
          </div>
          <blockquote className="rounded-2xl bg-[#16051f] p-7 font-[var(--font-affina-heading)] text-2xl font-bold leading-tight text-white sm:p-10 sm:text-4xl">
            The complexity was not in the number of screens. It was in the
            rules behind them.
          </blockquote>
        </CaseSection>

        <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10" id="partner-flow-next">
          <div className="flex flex-col gap-5">
            <SectionPill>Next projects</SectionPill>
            <h2 className="font-[var(--font-affina-heading)] text-[32px] font-bold leading-[1.18] tracking-normal sm:text-4xl">
              Keep exploring the work
            </h2>
          </div>

          {nextProjects[0] && <NextProjectCard project={nextProjects[0]} featured />}

          <div className="grid gap-6 md:grid-cols-2">
            {nextProjects.slice(1).map((project) => (
              <NextProjectCard project={project} key={project.href || project.title} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
