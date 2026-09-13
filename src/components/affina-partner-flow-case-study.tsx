"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { getNextProjects } from "@/lib/next-projects";
import { cn } from "@/lib/utils";
import { caseStudyStyles } from "@/lib/case-study-styles";
import { CaseStudyScrollHighlight } from "@/components/case-study-scroll-highlight";
import { CaseStudyStatementReveal } from "@/components/case-study-statement-reveal";
import { CaseStudySectionNavigation } from "@/components/case-study-section-navigation";
import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import { projectMeshPalettes } from "@/components/project-mesh-gradient";

const PROJECT_HERO_DELAY = 0.36;

type CaseProject = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
};

const sections = [
  { id: "partner-overview", label: "Overview" },
  { id: "partner-user", label: "User" },
  { id: "partner-journey", label: "Journey" },
  { id: "partner-problem", label: "Design Problem" },
  { id: "partner-pro", label: "Affina Pro" },
  { id: "partner-web", label: "Web App" },
  { id: "partner-rules", label: "Edge Cases" },
  { id: "partner-handoff", label: "Handoff" },
] as const;

const nextProjects = getNextProjects(
  DATA.projects as readonly CaseProject[],
  "/blog/affina-partner-flow"
);

type FlowScreen = {
  src: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

const salesAssistedFlow: FlowScreen[] = [
  {
    src: "/assets/affina-partner-flow/flows/mobile-01-home.png",
    width: 1170,
    height: 3210,
    title: "Sales dashboard",
    description: "Start from the partner workspace and product catalogue.",
  },
  {
    src: "/assets/affina-partner-flow/flows/mobile-02-product.png",
    width: 390,
    height: 1070,
    title: "Product overview",
    description: "Explain the offer, commission and core benefits before setup.",
  },
  {
    src: "/assets/affina-partner-flow/flows/mobile-03-family.png",
    width: 1170,
    height: 2937,
    title: "Family assessment",
    description: "Capture the household structure and insurance needs.",
  },
  {
    src: "/assets/affina-partner-flow/flows/mobile-04-provider.png",
    width: 390,
    height: 1985,
    title: "Provider shortlist",
    description: "Compare eligible plans without losing the family context.",
  },
  {
    src: "/assets/affina-partner-flow/flows/mobile-05-benefits.png",
    width: 390,
    height: 1688,
    title: "Benefit setup",
    description: "Configure coverage and benefits for the selected plan.",
  },
  {
    src: "/assets/affina-partner-flow/flows/mobile-06-buyer.png",
    width: 1170,
    height: 4476,
    title: "Buyer details",
    description: "Add the buyer and connect each insured family member.",
  },
  {
    src: "/assets/affina-partner-flow/flows/mobile-07-summary.png",
    width: 1170,
    height: 2913,
    title: "Family review",
    description: "Check every person, relationship and required detail together.",
  },
  {
    src: "/assets/affina-partner-flow/flows/mobile-08-payment.png",
    width: 390,
    height: 4607,
    title: "Payment",
    description: "Complete the purchase with a consolidated family premium.",
  },
];

const selfServiceFlow: FlowScreen[] = [
  {
    src: "/assets/affina-partner-flow/flows/web-01-list.png",
    width: 1280,
    height: 1976,
    title: "Browse products",
    description: "Enter the health-insurance catalogue from the public website.",
  },
  {
    src: "/assets/affina-partner-flow/flows/web-02-filter.png",
    width: 1280,
    height: 2771,
    title: "Set family criteria",
    description: "Use age, gender and budget to narrow eligible options.",
  },
  {
    src: "/assets/affina-partner-flow/flows/web-03-detail.png",
    width: 1280,
    height: 2449,
    title: "Review a plan",
    description: "Understand benefits, exclusions and the target customer.",
  },
  {
    src: "/assets/affina-partner-flow/flows/web-04-buyer.png",
    width: 1280,
    height: 1544,
    title: "Add the buyer",
    description: "Capture individual or business policyholder information.",
  },
  {
    src: "/assets/affina-partner-flow/flows/web-05-insured.png",
    width: 1280,
    height: 1664,
    title: "Add insured members",
    description: "Build the family group one insured person at a time.",
  },
  {
    src: "/assets/affina-partner-flow/flows/web-06-review.png",
    width: 1280,
    height: 2504,
    title: "Review the application",
    description: "Surface missing data before the family can continue.",
  },
  {
    src: "/assets/affina-partner-flow/flows/web-07-complete.png",
    width: 1280,
    height: 2504,
    title: "Complete the family",
    description: "Confirm buyer and insured-member details in one place.",
  },
];

const recoveryStates: FlowScreen[] = [
  {
    src: "/assets/affina-partner-flow/flows/state-01-age-warning.png",
    width: 344,
    height: 436,
    title: "Age rule",
    description: "Explain eligibility constraints at the moment they matter.",
  },
  {
    src: "/assets/affina-partner-flow/flows/state-02-family-warning.png",
    width: 344,
    height: 468,
    title: "Family validation",
    description: "Show which member blocks the current configuration.",
  },
  {
    src: "/assets/affina-partner-flow/flows/state-03-add-success.png",
    width: 390,
    height: 504,
    title: "Member added",
    description: "Confirm the action and keep the user inside the journey.",
  },
  {
    src: "/assets/affina-partner-flow/flows/state-04-upload-warning.png",
    width: 344,
    height: 508,
    title: "Incomplete upload",
    description: "Identify missing rows and offer a direct recovery path.",
  },
  {
    src: "/assets/affina-partner-flow/flows/state-05-upload-failed.png",
    width: 344,
    height: 452,
    title: "Upload failed",
    description: "State the file problem and provide a clear retry action.",
  },
];

const partnerHowMightWe =
  "How might one insurance journey adapt to every family member?";

function ProjectNavigation() {
  return (
    <CaseStudySectionNavigation
      heroId="partner-overview"
      revealAfter={460}
      sections={sections}
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className={caseStudyStyles.eyebrow}>
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  meta,
  size = "section",
}: {
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  meta?: string;
  size?: "overview" | "section";
}) {
  return (
    <div className={caseStudyStyles.headerStack}>
      <div className="flex items-center justify-between gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        {meta && (
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#737373] sm:text-xs">
            {meta}
          </p>
        )}
      </div>
      <h2
        className={
          size === "overview"
            ? cn(caseStudyStyles.overviewTitle, "tracking-[-1px]")
            : caseStudyStyles.sectionTitle
        }
      >
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-[800px]", caseStudyStyles.body)}>
          {description}
        </p>
      )}
    </div>
  );
}

function PartnerHowMightWeReveal() {
  return (
    <CaseStudyStatementReveal className="mt-10 max-w-[1000px] tracking-[-1px]" text={partnerHowMightWe} />
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center text-[#7792a6]",
        vertical ? "h-10" : "w-5 max-sm:rotate-90"
      )}
    >
      →
    </span>
  );
}

function FlowNode({
  children,
  active = false,
  dark = false,
}: {
  children: React.ReactNode;
  active?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-14 flex-1 items-center justify-center rounded-lg border px-3 py-3 text-center text-xs font-semibold leading-5",
        active && "border-[#0293f4] bg-[#f2f6fa]",
        dark && "border-[#08090a] bg-[#08090a] text-white",
        !active && !dark && "border-[#e1e6ea] bg-[#f7f7f8]"
      )}
    >
      {children}
    </div>
  );
}

function OverviewMockups() {
  return (
    <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_185px_185px]">
      <div className="relative aspect-[1.72/1] overflow-hidden rounded-xl border border-[#7792a6] bg-white shadow-[0_12px_30px_rgba(20,45,65,0.08)]">
        <Image
          src="/assets/affina-partner-flow/hero-web.png"
          alt="Affina web insurance purchase screen"
          fill
          priority
          unoptimized
          className="object-cover object-top"
          sizes="(max-width:1024px) 92vw, 575px"
        />
      </div>
      {[
        ["/assets/affina-partner-flow/raw-4.png", "Affina Pro insured member screen"],
        ["/assets/affina-partner-flow/raw-5.png", "Affina mobile payment screen"],
      ].map(([src, alt]) => (
        <div
          className="relative mx-auto aspect-[0.462/1] w-[185px] overflow-hidden rounded-[20px] border border-[#7792a6] bg-white shadow-[0_12px_30px_rgba(20,45,65,0.08)]"
          key={src}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            unoptimized
            className="object-cover object-top"
            sizes="185px"
          />
        </div>
      ))}
    </div>
  );
}

function JourneyDiagram() {
  const assisted = [
    "Sales fills data",
    "Sales prepares order",
    "Send request to buyer",
    "Customer confirms",
  ];
  const selfService = [
    "Customer fills data",
    "Customer selects plan",
    "Customer completes info",
  ];

  return (
    <div className="mx-auto mt-12 flex max-w-[640px] flex-col items-center">
      <div className="w-full max-w-[310px] rounded-xl bg-[#08090a] px-5 py-4 text-center text-sm font-bold text-white">
        FAMILY INSURANCE NEED
      </div>
      <Arrow vertical />
      <FlowNode active>Buy for multiple members</FlowNode>
      <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-[#0293f4] bg-[#f2f6fa] p-4 text-center text-sm font-bold">
            ASSISTED SALES
            <br />
            <span className="font-normal text-[#737373]">Affina Pro</span>
          </div>
          {assisted.map((step) => (
            <FlowNode key={step}>{step}</FlowNode>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-[#e1e6ea] bg-white p-4 text-center text-sm font-bold">
            SELF-SERVICE
            <br />
            <span className="font-normal text-[#737373]">Web App</span>
          </div>
          {selfService.map((step) => (
            <FlowNode key={step}>{step}</FlowNode>
          ))}
        </div>
      </div>
      <Arrow vertical />
      <FlowNode active>PAYMENT</FlowNode>
      <Arrow vertical />
      <FlowNode dark>FAMILY POLICY</FlowNode>
    </div>
  );
}

function ProblemModel() {
  const members = [
    ["Self", "Primary insured", "Health check · Telehealth"],
    ["Spouse", "Partner", "Maternity · Outpatient"],
    ["Child", "Dependent", "Pediatric care · Accident"],
    ["Parent", "Dependent", "Chronic care · Inpatient"],
  ];

  return (
    <div className="grid gap-9 lg:grid-cols-[1.65fr_0.85fr]">
      <div>
        <h3 className={cn("mb-8 text-center", caseStudyStyles.subsectionTitle)}>
          We turn family details into the right coverage.
        </h3>
        <div className="rounded-xl bg-[#f7f7f8] p-5">
          <b>Input factors</b>
          <p className="mt-3 text-sm">Age · Relationship · Eligibility · Pricing</p>
        </div>
        <div className="py-5 text-center font-bold text-[#0293f4]">
          ↓ &nbsp; MATCH SUITABLE PLAN &nbsp; ↓
        </div>
        <div className="space-y-3">
          <div className="rounded-xl bg-[#f7f7f8] p-5">
            <b>Output</b>
            <p className="mt-3 text-sm">
              Different benefits for each member — optimized for the whole family.
            </p>
          </div>
          <div className="rounded-xl bg-[#f7f7f8] p-5">
            <b>Key principle</b>
            <p className="mt-3 text-sm">
              The right benefits for the right person, at the right price.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-hidden rounded-xl border border-[#d4d4d4]">
          <div className="grid grid-cols-2 bg-[#1e1e1e] p-4 text-sm font-bold text-white">
            <span>Member</span>
            <span>Example benefits</span>
          </div>
          {members.map(([member, role, benefit]) => (
            <div
              className="grid grid-cols-2 border-t border-[#d4d4d4] p-4 text-sm"
              key={member}
            >
              <p>
                <b>{member}</b>
                <br />
                {role}
              </p>
              <p>{benefit}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-6 text-xl font-bold">Why this matters</h3>
        <p className="mt-3 text-sm leading-6">
          Each member may have different health needs and benefit preferences.
        </p>
      </div>
    </div>
  );
}

function ScreenFlow({
  screens,
  device,
}: {
  screens: FlowScreen[];
  device: "mobile" | "web";
}) {
  return (
    <div className="-mx-5 mt-12 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
      <div className="flex w-max snap-x snap-mandatory items-start gap-4 pb-4">
        {screens.map((screen, index) => (
          <div className="flex items-center gap-4" key={screen.src}>
            <article
              className={cn(
                "snap-start overflow-hidden rounded-2xl border border-[#e1e6ea] bg-white shadow-[0_18px_50px_rgba(20,45,65,0.08)]",
                device === "mobile" ? "w-[280px] sm:w-[300px]" : "w-[520px] sm:w-[620px]"
              )}
            >
              <a
                className={cn(
                  "block overflow-y-auto overscroll-contain bg-[#f2f6fa]",
                  device === "mobile"
                    ? "h-[720px] sm:h-[780px]"
                    : "h-[520px] sm:h-[580px]"
                )}
                href={screen.src}
                rel="noreferrer"
                target="_blank"
                title="Open the full screen"
              >
                <Image
                  alt={`${index + 1}. ${screen.title}`}
                  className="h-auto w-full"
                  height={screen.height}
                  src={screen.src}
                  unoptimized
                  width={screen.width}
                />
              </a>
              <div className="border-t border-[#e1e6ea] p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0293f4] text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[var(--font-affina-heading)] text-lg font-semibold text-[#08090a]">
                      {screen.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#737373]">
                      {screen.description}
                    </p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0293f4]">
                      Scroll screen · open full ↗
                    </p>
                  </div>
                </div>
              </div>
            </article>
            {index < screens.length - 1 && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#baddff] bg-white text-xl text-[#0293f4]">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductFlowSection({
  id,
  eyebrow,
  meta,
  title,
  description,
  screens,
  device,
  tone = "white",
}: {
  id: string;
  eyebrow: string;
  meta: string;
  title: string;
  description: React.ReactNode;
  screens: FlowScreen[];
  device: "mobile" | "web";
  tone?: "white" | "soft";
}) {
  return (
    <section
      className={cn("scroll-mt-20", tone === "soft" && "bg-[#f7f7f8]")}
      id={id}
    >
      <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
        <SectionHeader
          description={description}
          eyebrow={eyebrow}
          meta={meta}
          title={title}
        />
        <ScreenFlow device={device} screens={screens} />
      </div>
    </section>
  );
}

function RecoveryStatesSection() {
  return (
    <section className="scroll-mt-20 bg-[#f2f6fa]" id="partner-rules">
      <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
        <SectionHeader
          description={
            <>
              The happy path stays readable because eligibility, family composition and
              upload issues are explained as{" "}
              <CaseStudyScrollHighlight>focused recovery states</CaseStudyScrollHighlight>.
            </>
          }
          eyebrow="Designing beyond the happy path"
          title="Rules become clear next actions"
        />
        <div className="-mx-5 mt-12 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          <div className="flex w-max snap-x snap-mandatory items-stretch gap-5 pb-4">
            {recoveryStates.map((screen, index) => (
              <article
                className="w-[280px] snap-start rounded-2xl border border-[#d8ebff] bg-white p-5 shadow-[0_14px_40px_rgba(20,45,65,0.07)]"
                key={screen.src}
              >
                <div className="flex h-[330px] items-center justify-center overflow-hidden rounded-xl bg-[#f7f7f8] p-4">
                  <Image
                    alt={screen.title}
                    className="max-h-full w-auto object-contain"
                    height={screen.height}
                    src={screen.src}
                    unoptimized
                    width={screen.width}
                  />
                </div>
                <p className="mt-5 text-xs font-bold text-[#0293f4]">
                  STATE {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-[var(--font-affina-heading)] text-lg font-semibold">
                  {screen.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#737373]">
                  {screen.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SalesAssistedSection() {
  const steps = [
    "Customer need",
    "Add family members",
    "Match eligible plans",
    "Configure benefits",
    "Review family application",
    "Send request to customer",
  ];

  return (
    <section className="scroll-mt-20 bg-[#f7f7f8]" id="partner-pro">
      <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
        <SectionHeader
          eyebrow="Deep Dive 01"
          meta="Affina Pro · Sales-assisted"
          title="Designing the sales-assisted journey"
          description="For the assisted journey, the focus was helping Sales configure a family policy without losing track of individual members."
        />
        <div className="mt-12 flex flex-col items-stretch gap-2 rounded-xl border border-[#e1e6ea] bg-white p-5 sm:flex-row sm:items-center">
          {steps.map((step, index) => (
            <div className="contents" key={step}>
              <FlowNode active={index === steps.length - 1}>{step}</FlowNode>
              {index < steps.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#737373]">
          * Sales handles most of the setup. The customer completes confirmation and payment.
        </p>
      </div>

      <div className="border-y border-[#e1e6ea] bg-white">
        <div className="mx-auto grid max-w-[1100px] gap-16 px-5 py-24 sm:gap-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-36">
          <div>
            <div className="rounded-xl border border-[#7792a6] bg-[#f2f6fa] p-6">
              <p className="text-xs font-bold tracking-[0.1em] text-[#0293f4]">
                DESIGN PRINCIPLE
              </p>
              <h3 className="mt-4 text-lg font-bold">
                Keep every insured member identifiable throughout the journey.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#737373]">
                Family members remain distinct entities with their own relationships, ages,
                and coverage.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ["01", "Primary Insured Anchor", "Keep the policy buyer visible to preserve pricing context."],
                ["02", "Dynamic Relationship Trees", "Filter eligibility automatically from relationship rules."],
                ["03", "In-line Expansion Control", "Add or remove dependants without losing entered data."],
              ].map(([number, title, body]) => (
                <div className="grid grid-cols-[32px_1fr] gap-3" key={number}>
                  <b className="text-[#0293f4]">{number}</b>
                  <div>
                    <b>{title}</b>
                    <p className="mt-1 text-xs leading-5 text-[#737373]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-[#f2f6fa] p-8">
            <div className="w-full max-w-[310px] rounded-[24px] border-[3px] border-[#7792a6] bg-white p-5 shadow-xl">
              <div className="flex justify-between text-xs font-bold">
                <span>Affina Pro</span>
                <span>●</span>
              </div>
              <div className="mt-4 h-1 rounded bg-[#0293f4]" />
              <h3 className="mt-5 text-lg">Insured Members</h3>
              {[
                ["01 · PRIMARY INSURED", "Johnathan Doe", "Age 34"],
                ["02 · DEPENDANT", "Sarah Doe", "SPOUSE"],
              ].map(([tag, name, info], index) => (
                <div
                  className={cn(
                    "mt-3 rounded-lg border p-3",
                    index === 0
                      ? "border-[#0293f4] bg-[#f2f6fa]"
                      : "border-[#e1e6ea] bg-[#f7f7f8]"
                  )}
                  key={name}
                >
                  <p className="text-[10px] font-bold text-[#0293f4]">{tag}</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <b>{name}</b>
                    <span className="text-xs text-[#737373]">{info}</span>
                  </div>
                </div>
              ))}
              <div className="mt-3 rounded-lg border border-dashed border-[#0293f4] p-3 text-center text-xs font-bold text-[#0293f4]">
                03 · ADD ANOTHER MEMBER
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
        <h3 className={caseStudyStyles.subsectionTitle}>
          Make the impact of every member visible
        </h3>
        <p className={cn("mt-4 max-w-[800px]", caseStudyStyles.body)}>
          Adding or removing a family member can affect the total premium, individual fees,
          and pricing rules.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-stretch gap-2 rounded-xl bg-white p-6 sm:flex-row sm:items-center">
            <FlowNode>2 Members<br />Base Family Rate</FlowNode>
            <Arrow />
            <FlowNode active>Add Dependant<br />+ Child Rider</FlowNode>
            <Arrow />
            <FlowNode dark>Updated total<br />Recalculated Premium</FlowNode>
          </div>
          <div className="rounded-xl border border-[#7792a6] bg-[#f2f6fa] p-6">
            <p className="text-xs font-bold tracking-[0.08em] text-[#0293f4]">
              DRAFT APPLICATION BREAKDOWN
            </p>
            {["Member 01 (Primary)", "Member 02 (Spouse)", "Member 03 (Child)"].map(
              (member) => (
                <div className="mt-3 flex justify-between text-sm" key={member}>
                  <span>{member}</span>
                  <b>Member fee</b>
                </div>
              )
            )}
            <div className="mt-4 flex justify-between border-t border-[#7792a6] pt-4 text-sm font-bold">
              <span>TOTAL</span>
              <span>Updated total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-[#e1e6ea] bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
          <h3 className={caseStudyStyles.subsectionTitle}>
            From Sales back to the customer
          </h3>
          <p className="mt-3 text-[#737373]">
            Sales prepares the journey; the customer owns final confirmation and payment.
          </p>
          <div className="mt-10 grid items-center gap-5 md:grid-cols-[1fr_160px_1fr]">
            <div className="rounded-xl border border-[#e1e6ea] p-6">
              <b>AFFINA PRO / Sales</b>
              <p className="mt-4 text-sm">Prepare family application</p>
            </div>
            <div className="text-center text-xs font-bold tracking-[0.1em] text-[#0293f4]">
              SEND REQUEST
              <br />
              <span className="text-xl">→ ✉ →</span>
              <br />
              <span className="text-[#737373]">EMAIL LINK</span>
            </div>
            <div className="rounded-xl border border-[#7792a6] bg-[#f2f6fa] p-6">
              <b>CUSTOMER / Self-Service</b>
              <p className="mt-4 text-sm leading-6">
                1. Review information
                <br />
                2. Complete assessment
                <br />
                3. Confirm &amp; Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WebAppSection() {
  const statuses = [
    ["✓", "Completed", "All required details and declarations filled"],
    ["●", "In progress", "Partially filled or awaiting declarations"],
    ["○", "Not started", "Awaiting configuration"],
  ];

  return (
    <section className="scroll-mt-20 bg-[#f7f7f8]" id="partner-web">
      <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
        <SectionHeader
          eyebrow="Deep Dive 02"
          meta="Web App · Self-service"
          title="Bringing the same family logic to self-service"
        />
        <div className="mt-8 rounded-xl bg-[#08090a] p-6 text-center text-white">
          <b>Same family logic.</b>
          <span className="ml-4 text-[#737373]">Different actor ownership.</span>
        </div>
        <p className={cn("mt-5 max-w-[900px]", caseStudyStyles.body)}>
          The rules stay the same, but responsibility shifts entirely to the customer. The
          interface guides multi-member setup without a Sales person in the loop.
        </p>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h3 className={caseStudyStyles.subsectionTitle}>
              Keep the family visible throughout the journey
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#737373]">
              Customers need to know whose information they are completing and what remains
              unfinished.
            </p>
            <p className="mt-8 text-xs font-bold tracking-[0.1em] text-[#0293f4]">
              STATUS INDICATORS
            </p>
            <div className="mt-5 space-y-5">
              {statuses.map(([icon, title, body], index) => (
                <div className="grid grid-cols-[28px_1fr] gap-3" key={title}>
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                      index === 0
                        ? "bg-[#22c55e] text-white"
                        : index === 1
                          ? "bg-[#f59e0b] text-white"
                          : "border border-[#7792a6]"
                    )}
                  >
                    {icon}
                  </span>
                  <div>
                    <b className="text-sm">{title}</b>
                    <p className="mt-1 text-xs text-[#737373]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-[#e1e6ea] bg-white p-5">
              <b className="text-xs text-[#737373]">UX HIGHLIGHT</b>
              <p className="mt-3 text-sm leading-6 text-[#737373]">
                Active tracking reduces cognitive load by keeping the family context locked
                on-screen.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#7792a6] bg-white p-6 shadow-[0_12px_32px_rgba(20,45,65,0.08)]">
            <div className="flex justify-between border-b border-[#e1e6ea] pb-4 text-xs text-[#737373]">
              <span>● ● ●</span>
              <span>web.affina-insurance.com/family-flow</span>
              <span>＋</span>
            </div>
            <div className="mt-6 flex justify-between">
              <b>Configure Family Plan</b>
              <b className="text-xs text-[#0293f4]">Step 2 of 4</b>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-1">
              <span className="h-1.5 rounded bg-[#0293f4]" />
              <span className="h-1.5 rounded bg-[#f2f6fa]" />
              <span className="h-1.5 rounded bg-[#e1e6ea]" />
            </div>
            {[
              ["Johnathan Doe (Primary)", "Plan selected: Inpatient Tier A", "ACTIVE"],
              ["Sarah Doe (Spouse)", "Awaiting medical declaration", "Resume"],
              ["Tommy Doe (Child)", "Not configured yet", "Start"],
            ].map(([name, sub, action], index) => (
              <div
                className={cn(
                  "mt-3 flex items-center justify-between rounded-lg border p-4",
                  index === 0
                    ? "border-[#0293f4] bg-[#f2f6fa]"
                    : "border-[#e1e6ea]"
                )}
                key={name}
              >
                <div>
                  <b className="text-sm">{name}</b>
                  <p className="mt-1 text-xs text-[#737373]">{sub}</p>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold",
                    index === 1
                      ? "text-[#f59e0b]"
                      : index === 0
                        ? "rounded bg-[#0293f4] px-2 py-1 text-white"
                        : "text-[#737373]"
                  )}
                >
                  {action}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h3 className={caseStudyStyles.subsectionTitle}>
            More ownership requires clearer progress
          </h3>
          <p className={cn("mt-4 max-w-[800px]", caseStudyStyles.body)}>
            Validation, progress, and next steps need stronger visibility to support
            completion.
          </p>
          <div className="mt-10 rounded-xl border border-[#e1e6ea] bg-white p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {[
                ["01", "Family Details", "Relationships & ages"],
                ["02", "Coverage Choice", "Tailored per person"],
                ["03", "Declarations", "In-line questionnaire"],
                ["04", "Family checkout", "Consolidated fee pay"],
              ].map(([number, title, sub], index) => (
                <div className="contents" key={number}>
                  <div
                    className={cn(
                      "flex-1 rounded-lg border p-4",
                      index === 3
                        ? "border-[#0293f4] bg-[#f2f6fa]"
                        : "border-[#e1e6ea] bg-[#f7f7f8]"
                    )}
                  >
                    <p className="text-[10px] font-bold text-[#737373]">STEP {number}</p>
                    <b className="mt-2 block text-sm">{title}</b>
                    <p className="mt-1 text-xs text-[#737373]">{sub}</p>
                  </div>
                  {index < 3 && <Arrow />}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 text-sm md:grid-cols-2">
              <p>
                <b>• Instant Error Catching</b>
                <br />
                <span className="text-[#737373]">
                  Validate ages and relationships before final review.
                </span>
              </p>
              <p>
                <b>• Multi-Member Progress Lock</b>
                <br />
                <span className="text-[#737373]">
                  Checkout unlocks only when all declarations are complete.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RuleEngine() {
  return (
    <div className="rounded-xl border border-[#e1e6ea] bg-white p-6 sm:p-10">
      <h3 className={caseStudyStyles.subsectionTitle}>Rule Model Engine</h3>
      <p className="mt-2 text-sm text-[#737373]">
        Member profiles map to downstream UI actions.
      </p>
      <div className="mx-auto mt-8 flex max-w-[760px] flex-col items-center">
        <FlowNode active>
          MEMBER INFORMATION
          <br />
          <span className="font-normal text-[#737373]">
            Age, Relationship, Member count
          </span>
        </FlowNode>
        <Arrow vertical />
        <FlowNode>
          INSURANCE RULES
          <br />
          <span className="font-normal text-[#737373]">
            Underwriting &amp; dependencies
          </span>
        </FlowNode>
        <Arrow vertical />
        <div className="w-full rounded-xl border border-[#e1e6ea] bg-[#f7f7f8] p-5 text-center">
          <p className="text-xs font-bold text-[#0293f4]">WHAT CAN CHANGE?</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {["Plan eligibility", "Required companion", "Benefits", "Price"].map(
              (item) => (
                <span
                  className="rounded-md border border-[#e1e6ea] bg-white px-3 py-1 text-xs"
                  key={item}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
        <Arrow vertical />
        <div className="rounded-lg bg-[#08090a] px-8 py-5 text-center text-white">
          <p className="text-xs font-bold tracking-[0.1em] text-[#0293f4]">
            UI RESPONSE STATE
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {["Guide", "Warn", "Recalculate", "Block"].map((item) => (
              <span className="rounded bg-[#1c1e22] px-2 py-1 text-xs" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EdgeCases() {
  return (
    <section className="scroll-mt-20" id="partner-rules">
      <div className="border-y border-[#e1e6ea] bg-[#f2f6fa]">
        <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
          <SectionHeader
            eyebrow="Designing beyond the happy path"
            title="When one member changes the whole journey"
            description="One member can affect available plans, applicable benefits, and how much the family pays."
          />
          <div className="mt-12">
            <RuleEngine />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] space-y-32 px-5 py-24 sm:space-y-40 sm:px-8 lg:py-36">
        <div>
          <SectionHeader
            eyebrow="Edge Case 01"
            title="Recover instead of dead-ending the journey"
            description="Explain who is not eligible and what the customer can do next."
          />
          <div className="mt-10 rounded-xl border border-[#e1e6ea] bg-[#f7f7f8] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Primary Insured", "Age 34 · Eligible", true],
                ["Spouse", "Age 32 · Eligible", true],
                ["Parent", "Age 66 · Not Eligible", false],
              ].map(([name, sub, okay]) => (
                <div
                  className={cn(
                    "rounded-lg border bg-white p-4",
                    okay ? "border-[#e1e6ea]" : "border-[#ef4444]"
                  )}
                  key={String(name)}
                >
                  <div className="flex justify-between">
                    <div>
                      <b className="text-sm">{String(name)}</b>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          okay ? "text-[#737373]" : "text-[#ef4444]"
                        )}
                      >
                        {String(sub)}
                      </p>
                    </div>
                    <b className={okay ? "text-[#22c55e]" : "text-[#ef4444]"}>
                      {okay ? "✓" : "✕"}
                    </b>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-7 text-center text-[#7792a6]">↓</div>
            <div className="mx-auto max-w-[380px] rounded-lg border border-[#0293f4] bg-white p-4 text-center">
              <p className="text-xs font-bold text-[#0293f4]">SYSTEM QUERY</p>
              <b className="mt-2 block text-sm">
                Can the eligible family members continue?
              </b>
            </div>
            <div className="my-7 text-center text-[#7792a6]">↓</div>
            <div className="rounded-xl border border-[#e1e6ea] bg-white p-5">
              <p className="text-xs font-bold text-[#0293f4]">UI SOLUTION</p>
              <b className="mt-2 block text-sm">
                Explain who is not eligible + allow remaining eligible members to continue
              </b>
              <p className="mt-2 text-xs leading-5 text-[#737373]">
                Isolate the affected member without blocking progress for the rest of the
                family.
              </p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Edge Case 02"
            title="Surface rules when they become relevant"
            description="Translate backend rules into one clear next action."
          />
          <div className="mt-10 flex flex-col gap-3 rounded-xl border border-[#e1e6ea] bg-[#f7f7f8] p-7 md:flex-row md:items-center">
            {[
              ["STEP 01", "Member Information", "Minor dependant, age 4"],
              ["STEP 02", "Rule Triggered", "Minors cannot purchase solo"],
              ["ALERT STATE", "Required Companion", "Adult sponsor is mandatory"],
              ["UI ACTION", "Add adult sponsor", "Companion flow initiated"],
            ].map(([tag, title, body], index) => (
              <div className="contents" key={tag}>
                <div
                  className={cn(
                    "flex-1 rounded-lg border bg-white p-4",
                    index === 2
                      ? "border-[#f59e0b]"
                      : index === 3
                        ? "border-[#0293f4]"
                        : "border-[#e1e6ea]"
                  )}
                >
                  <p className="text-[10px] font-bold text-[#737373]">{tag}</p>
                  <b className="mt-2 block text-sm">{title}</b>
                  <p className="mt-2 text-xs text-[#737373]">{body}</p>
                </div>
                {index < 3 && <Arrow />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Edge Case 03"
            title="Shared policy ≠ identical benefits"
            description="Eligibility is mapped to individual members, even inside one family policy."
          />
          <div className="mt-10 overflow-hidden rounded-xl border border-[#e1e6ea]">
            {[
              ["PRIMARY INSURED", "Johnathan Doe (Age 34)", "Maternity Care Package", false],
              ["MEMBER 02 (SPOUSE)", "Sarah Doe (Age 32)", "Maternity Care Package", true],
              ["MEMBER 03 (CHILD)", "Tommy Doe (Age 4)", "Pediatric Special Checkups", true],
            ].map(([tag, name, benefit, yes]) => (
              <div
                className="grid gap-3 border-b border-[#e1e6ea] bg-white p-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
                key={String(name)}
              >
                <div>
                  <p className="text-[10px] font-bold text-[#737373]">{String(tag)}</p>
                  <b className="mt-1 block">{String(name)}</b>
                </div>
                <p className="text-sm">
                  {String(benefit)}{" "}
                  <b className={yes ? "text-[#22c55e]" : "text-[#ef4444]"}>
                    {yes ? "✓" : "✕"}
                  </b>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-[#08090a] p-6 text-center text-white">
            <b className="text-xl">Benefits tailored for each member.</b>
            <p className="mt-2 text-sm text-white/60">
              One family purchase, coverage matched to individual needs.
            </p>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Multi-person assessment"
            title="Turn a long assessment into a trackable sequence"
            description="Users always know whose information they are completing and what remains."
          />
          <div className="mt-10 rounded-xl border border-[#e1e6ea] bg-white p-6">
            <p className="text-xs font-bold tracking-[0.1em] text-[#0293f4]">
              HEALTH DECLARATION TRACKING
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Member 01", "Johnathan (Primary)", "DONE", "w-full bg-[#22c55e]"],
                ["Member 02", "Sarah (Spouse)", "ACTIVE", "w-[45%] bg-[#0293f4]"],
                ["Member 03", "Tommy (Child)", "WAITING", "w-0"],
                ["Member 04", "Lily (Child)", "WAITING", "w-0"],
              ].map(([member, name, status, width]) => (
                <div className="rounded-lg border border-[#e1e6ea] p-4" key={member}>
                  <div className="flex justify-between text-xs">
                    <b>{member}</b>
                    <span>{status}</span>
                  </div>
                  <p className="mt-4 text-sm">{name}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded bg-[#e1e6ea]">
                    <div className={cn("h-full rounded", width)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
        "group overflow-hidden rounded-3xl border border-[#e1e6ea] bg-white/65 transition hover:-translate-y-1 hover:shadow-xl",
        featured && "md:grid md:grid-cols-[1.15fr_0.85fr]"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#f7f7f8]",
          featured ? "aspect-video md:aspect-auto md:min-h-[300px]" : "aspect-video"
        )}
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
          {featured ? "Featured next" : project.dates}
        </p>
        <h3 className="mt-3 font-[var(--font-affina-heading)] text-2xl leading-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-[#737373]">{project.description}</p>
      </div>
    </Link>
  );
}

export function AffinaPartnerFlowCaseStudy() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-[var(--font-affina-body)] text-[#08090a]">
      <ProjectNavigation />

      <ProjectCaseStudyHero
        colors={projectMeshPalettes.affinaPartner}
        delay={PROJECT_HERO_DELAY}
        id="partner-overview"
        links={[
          { href: "https://www.affina.com.vn/ai/", label: "Website", icon: "website" },
          { href: "https://apps.apple.com/us/app/affina-pro/id6444879374", label: "App Store", icon: "appstore" },
          { href: "https://play.google.com/store/apps/details?id=com.affina.agency&hl=en", label: "Google Play", icon: "googleplay" },
        ]}
        outcome="One scalable multi-insured journey across assisted and self-service channels"
        role="UI/UX Designer"
        scope="Affina Pro, web app, responsive states, edge cases"
        status="Live"
        title="Affina — Unifying Customer & Partner Insurance Journeys"
        titleLines={["Affina —", "Unifying Customer & Partner", "Insurance Journeys"]}
      />

      <section className="scroll-mt-20">
        <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
          <SectionHeader
            eyebrow="Overview"
            size="overview"
            title="Designing a scalable purchase flow for partner-led insurance"
          />
          <div className={cn("mt-10 max-w-[780px] space-y-5", caseStudyStyles.body)}>
            <p>
              This flow expanded the insurance journey from one insured person to{" "}
              <CaseStudyScrollHighlight>
                multiple insured people under the same contract
              </CaseStudyScrollHighlight>{" "}
              across Affina Pro and Web.
            </p>
            <p>
              <b>My role</b> was to work with BA, Business Owner, Product, and IT to clarify
              requirements, translate rules into user flows, design UI states, and prepare
              {" "}<CaseStudyScrollHighlight>implementation-ready handoff</CaseStudyScrollHighlight>.
            </p>
          </div>
          <OverviewMockups />

        </div>
      </section>

      <section
        className="scroll-mt-20 border-t border-[#e1e6ea] bg-[#f7f7f8]"
        id="partner-user"
      >
        <div className="mx-auto max-w-[1100px] px-5 pb-14 pt-24 sm:px-8 lg:pb-20 lg:pt-36">
          <SectionHeader
            eyebrow="User"
            title="Adding one more person changed the logic of the whole journey"
            description={
              <>
                People were not only buying for themselves. They were buying for a{" "}
                <CaseStudyScrollHighlight>
                  spouse, child, parent, or another family member
                </CaseStudyScrollHighlight>.
              </>
            }
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div className="rounded-xl border border-[#e1e6ea] bg-white p-6">
              <p className="text-xs font-bold tracking-[0.1em] text-[#0293f4]">
                FAMILY RELATIONSHIP
              </p>
              <p className="mt-5 font-[var(--font-affina-heading)] text-2xl leading-relaxed">
                Self → Spouse → Child → Parent / other family member
              </p>
            </div>
            <div className="rounded-xl bg-[#08090a] p-7 text-lg leading-8 text-white">
              This created an opportunity for Affina to support multi-insured purchases
              within one health insurance journey.
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-20 bg-[#f7f7f8]" id="partner-journey">
        <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-14 sm:px-8 lg:pb-36 lg:pt-20">
          <SectionHeader
            eyebrow="Journey"
            title="One need, two journeys"
            description={
              <>
                The same family-insurance model had to work for both{" "}
                <CaseStudyScrollHighlight>
                  sales-assisted and self-service channels
                </CaseStudyScrollHighlight>.
              </>
            }
          />
          <JourneyDiagram />
        </div>
      </section>

      <section className="scroll-mt-20" id="partner-problem">
        <div className="mx-auto max-w-[1100px] space-y-20 px-5 py-24 sm:space-y-24 sm:px-8 lg:py-36">
          <div>
            <SectionHeader eyebrow="Design Problem" title="Problem Statement" />
            <PartnerHowMightWeReveal />
            <div className="mt-16">
              <ProblemModel />
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Design Problem" title="Design Goal" />
            <CaseStudyStatementReveal
              className="mt-9 tracking-[-1px]"
              text="Design one scalable family-insurance model that could work across both assisted and self-service journeys."
            />
          </div>
        </div>
      </section>

      <ProductFlowSection
        description={
          <>
            Sales can move from product discovery to a complete family application while{" "}
            <CaseStudyScrollHighlight>
              every insured member remains visible and editable
            </CaseStudyScrollHighlight>.
          </>
        }
        device="mobile"
        eyebrow="Deep Dive 01"
        id="partner-pro"
        meta="Affina Pro · Sales-assisted"
        screens={salesAssistedFlow}
        title="Configure a family policy without losing anyone"
        tone="soft"
      />
      <ProductFlowSection
        description={
          <>
            The same family model is translated to self-service with{" "}
            <CaseStudyScrollHighlight>
              stronger guidance, explicit progress and a single review surface
            </CaseStudyScrollHighlight>.
          </>
        }
        device="web"
        eyebrow="Deep Dive 02"
        id="partner-web"
        meta="Website · Self-service"
        screens={selfServiceFlow}
        title="Give customers ownership without exposing the complexity"
      />
      <RecoveryStatesSection />

      <section
        className="scroll-mt-20 border-y border-[#e1e6ea] bg-[#f7f7f8]"
        id="partner-handoff"
      >
        <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
          <SectionHeader
            eyebrow="From rules to production"
            title="Turning business logic into a design that could ship"
          />
          <div className="mt-12 flex flex-col gap-3 rounded-xl border border-[#e1e6ea] bg-white p-6 md:flex-row md:items-center">
            {[
              "BRD / Business request",
              "Clarify rules with BA & Owner",
              "Map happy path + edge cases",
              "Design cross-platform patterns",
              "Review feasibility with Dev",
              "Annotate states & behavior",
              "Handoff + UI audit",
            ].map((step, index, items) => (
              <div className="contents" key={step}>
                <FlowNode active={index === items.length - 1}>{step}</FlowNode>
                {index < items.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#737373]">
            * Every decision was backed by technical constraints and underwriting rules
            mapped beforehand.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [
                "01 — ALIGNING BUSINESS LOGIC",
                "Pre-empting rule friction",
                "Clarified dependencies and required states before finalizing UI.",
              ],
              [
                "02 — DESIGNING ACROSS CHANNELS",
                "Unified underlying core",
                "Translated one family model across assisted and self-service channels.",
              ],
              [
                "03 — MAKING EDGE CASES READY",
                "Documenting the details",
                "Specified validation, switching, pricing updates, and exception flows.",
              ],
            ].map(([tag, title, body]) => (
              <article
                className="rounded-xl border border-[#e1e6ea] bg-white p-7"
                key={tag}
              >
                <p className="text-xs font-bold text-[#0293f4]">{tag}</p>
                <h3 className={cn("mt-4", caseStudyStyles.subsectionTitle)}>
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#737373]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-36">
        <Eyebrow>Next projects</Eyebrow>
        <h2 className={cn("mt-7", caseStudyStyles.overviewTitle)}>
          Keep exploring the work
        </h2>
        <div className="mt-10 space-y-6">
          {nextProjects[0] && <NextProjectCard project={nextProjects[0]} featured />}
          <div className="grid gap-6 md:grid-cols-2">
            {nextProjects.slice(1).map((project) => (
              <NextProjectCard project={project} key={project.href || project.title} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
