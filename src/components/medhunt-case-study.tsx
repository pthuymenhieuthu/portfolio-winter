"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Code2,
  FileCheck2,
  FileText,
  GitPullRequest,
  LayoutDashboard,
  Network,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { CaseStudyRevealSection } from "@/components/case-study-scroll-reveal";
import { CaseStudySectionNavigation } from "@/components/case-study-section-navigation";
import { CaseStudyStatementReveal } from "@/components/case-study-statement-reveal";
import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import { projectMeshPalettes } from "@/components/project-mesh-gradient";
import { DATA } from "@/data/resume";
import { getNextProjects } from "@/lib/next-projects";
import { cn } from "@/lib/utils";

const sections = [
  { id: "medhunt-overview", label: "Overview" },
  { id: "medhunt-architecture", label: "Architecture" },
  { id: "medhunt-workflow", label: "Working process" },
  { id: "medhunt-dashboard", label: "Dashboard" },
  { id: "medhunt-core", label: "Core workflows" },
  { id: "medhunt-system", label: "Design system" },
  { id: "medhunt-outcome", label: "Outcome" },
  { id: "medhunt-next", label: "Next projects" },
  { id: "medhunt-contact", label: "Get in touch" },
] as const;

const journey = [
  "Customer",
  "Request",
  "Candidate search",
  "Evaluation",
  "Interview",
  "Offer & onboarding",
  "Warranty & fee",
] as const;

const process = [
  { icon: FileText, title: "Business rules", text: "Read BA documents, map roles, permissions, statuses, and edge cases." },
  { icon: Network, title: "IA & flows", text: "Turn fragmented modules into one navigable recruitment operating model." },
  { icon: Code2, title: "Claude HTML", text: "Design directly in working HTML to test density, interaction, and responsive behavior." },
  { icon: GitPullRequest, title: "Review & iterate", text: "Refine the browser prototype with BA, operations, and engineering feedback." },
  { icon: FileCheck2, title: "Developer handoff", text: "Share implemented states, interaction logic, and visual rules as a living reference." },
] as const;

type Project = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  image?: string;
  video?: string;
};

const nextProjects = getNextProjects(
  DATA.projects as readonly Project[],
  "/blog/medhunt"
);

function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[760px]", className)}>
      <h2 className="text-balance font-[var(--font-heading)] text-[30px] font-normal leading-[1.16] tracking-[-0.02em] text-[#111827] sm:text-[40px]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-[70ch] text-base leading-[1.65] text-[#5b677c] sm:text-[17px]">
          {description}
        </p>
      )}
    </div>
  );
}

function ProductFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-[#e8edf6] p-2 shadow-[0_20px_50px_rgba(36,87,197,0.12)] sm:p-3", className)}>
      <div className="overflow-hidden rounded-xl bg-[#f6f8fc] ring-1 ring-[#d7dfec]">{children}</div>
    </div>
  );
}

function ProductScreenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <ProductFrame>
      <div className="relative min-w-[820px] aspect-[16/10] bg-white">
        <Image
          alt={alt}
          className="object-cover"
          fill
          priority={src.endsWith("dashboard.png")}
          sizes="(max-width: 1040px) 100vw, 1040px"
          src={src}
        />
      </div>
    </ProductFrame>
  );
}

const navGroups = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Overview" },
      { icon: CheckCircle2, label: "My work" },
      { icon: Bell, label: "Notifications" },
    ],
  },
  {
    label: "Create & track customers",
    items: [{ icon: Building2, label: "Customers" }],
  },
  {
    label: "Track recruitment requests",
    items: [{ icon: BriefcaseBusiness, label: "Recruitment requests" }],
  },
  {
    label: "Find candidates",
    items: [
      { icon: Users, label: "Candidate pool" },
      { icon: FileCheck2, label: "Candidate reviews" },
    ],
  },
  {
    label: "Recruitment operations",
    items: [
      { icon: CalendarDays, label: "Interviews" },
      { icon: ShieldCheck, label: "Warranty & claims" },
    ],
  },
] as const;

function ProductShell({ children, active = "Overview" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="min-w-[820px] bg-[#f7f9fc] text-[#17213a]">
      <div className="grid min-h-[580px] grid-cols-[192px_1fr]">
        <aside className="flex flex-col border-r border-[#dce3ee] bg-white px-3 py-4">
          <div className="px-1">
            <Image alt="MedHunt" className="h-auto w-[132px]" height={201} src="/assets/medhunt/logo.png" width={900} />
            <p className="mt-1 text-[8px] font-semibold text-[#2457c5]">SMS · Healthcare Headhunter</p>
          </div>
          <nav className="mt-5 flex-1 space-y-4">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 px-2 text-[7px] font-bold uppercase tracking-[0.11em] text-[#6f7f97]">{group.label}</p>
                <div className="space-y-0.5">
                  {group.items.map(({ icon: Icon, label }) => (
                    <div
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[9px] font-medium",
                        active === label ? "bg-[#e7efff] font-semibold text-[#2457c5]" : "text-[#51627b]"
                      )}
                      key={label}
                    >
                      <Icon className="size-3.5" strokeWidth={1.7} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-4 rounded-xl border border-[#dce3ee] bg-white p-2.5">
            <p className="text-[9px] font-semibold">Customer portal</p>
            <p className="mt-0.5 text-[8px] leading-3 text-[#74829a]">Open the employer workspace</p>
          </div>
        </aside>
        <div>
          <header className="flex h-14 items-center gap-2 border-b border-[#dce3ee] bg-white/90 px-4">
            <div className="flex h-8 min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-[#dce3ee] px-3 text-[9px] text-[#7a879d]">
              <Search className="size-3.5" /> Search candidates, IDs, or specialties
            </div>
            <div className="flex h-8 items-center gap-2 rounded-lg border border-[#dce3ee] bg-white px-2.5 text-[8px] font-medium text-[#51627b]">Administrator <ChevronDown className="size-3" /></div>
            <div className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dce3ee] bg-white px-2.5"><span className="grid size-5 place-items-center rounded-full bg-[#e7efff] text-[7px] font-bold text-[#2457c5]">RO</span><span className="text-[8px] font-semibold">rontech-hq</span><ChevronDown className="size-3" /></div>
            <div className="relative grid size-8 place-items-center text-[#66758d]"><Bell className="size-4" /><span className="absolute right-0 top-0 grid size-3.5 place-items-center rounded-full bg-[#d32f2f] text-[7px] font-bold text-white">3</span></div>
            <div className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dce3ee] bg-white px-1.5 pr-2">
              <span className="relative size-6 overflow-hidden rounded-full border border-[#dce3ee] bg-[#e8eef7]"><Image alt="" className="object-cover object-[28%_16%]" fill sizes="24px" src="/assets/medhunt/medical-team.webp" /></span>
              <div className="leading-tight"><p className="text-[8px] font-semibold">Lan Pham</p><p className="text-[7px] text-[#74829a]">Administrator</p></div>
              <ChevronDown className="size-3" />
              </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

const metrics = [
  { icon: AlertTriangle, value: "3", label: "Tasks due", helper: "1 overdue · 2 today", color: "#e5484d" },
  { icon: CalendarDays, value: "1", label: "Interview this week", helper: "Shared schedule", color: "#3dbbd8" },
  { icon: FileText, value: "7", label: "Open requests", helper: "Within current access", color: "#2457c5" },
  { icon: ShieldCheck, value: "2", label: "Active warranties", helper: "Excludes completed cases", color: "#e6b326" },
] as const;

function DashboardMockup() {
  return (
    <ProductFrame>
      <ProductShell>
        <main className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[25px] font-semibold tracking-[-0.03em]">Good morning, Lan <span aria-hidden="true">👋</span></h3>
              <p className="mt-1.5 text-[11px] text-[#64748b]">You have 1 overdue task and 2 items to handle today.</p>
              <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.1em] text-[#5d6b82]">Today, Oct 15, 2026</p>
            </div>
            <button className="rounded-lg border border-[#d5ddea] bg-white px-3 py-2 text-[10px] font-semibold">My work</button>
          </div>

          <div className="mt-7 grid grid-cols-4 border-y border-[#dce3ee] bg-white">
            {metrics.map(({ icon: Icon, value, label, helper, color }) => (
              <div className="border-r border-[#e2e7ef] px-4 py-4 last:border-r-0" key={label} style={{ borderTop: `3px solid ${color}` }}>
                <Icon className="size-4" style={{ color }} strokeWidth={1.8} />
                <p className="mt-4 text-[24px] leading-none tabular-nums">{value}</p>
                <p className="mt-2 text-[11px] font-semibold text-[#506078]">{label}</p>
                <p className="mt-1 text-[9px] text-[#74829a]">{helper}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-[1.4fr_0.9fr] gap-5">
            <div className="bg-white p-4 ring-1 ring-[#dce3ee]">
              <div className="flex items-center justify-between">
                <h4 className="text-[12px] font-semibold">Priority work</h4>
                <span className="text-[9px] font-medium text-[#2457c5]">View all</span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["Lê Thu Trang · C-103", "Candidate feedback · REQ-0012", "Overdue", "#e5484d"],
                  ["Contact Nguyễn Văn Thành", "Active resuscitation · Chợ Rẫy Hospital", "Today", "#3dbbd8"],
                  ["Contact Phạm Thu Hà", "Neonatology · Children’s Hospital 1", "Today", "#3dbbd8"],
                ].map(([title, helper, tag, color]) => (
                  <div className="flex items-center gap-3" key={title}>
                    <span className="grid size-7 place-items-center rounded-lg" style={{ backgroundColor: `${color}14`, color }}><Clock3 className="size-3.5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold">{title}</p>
                      <p className="truncate text-[9px] text-[#74829a]">{helper}</p>
                    </div>
                    <span className="rounded-md px-2 py-1 text-[8px] font-bold" style={{ backgroundColor: `${color}12`, color }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 ring-1 ring-[#dce3ee]">
              <div className="flex items-center justify-between">
                <h4 className="text-[12px] font-semibold">Interview calendar</h4>
                <span className="text-[9px] text-[#74829a]">October 2026</span>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-y-2 text-center text-[8px] text-[#596981]">
                {["M","T","W","T","F","S","S",...Array.from({ length: 31 }, (_, i) => String(i + 1))].map((day, i) => (
                  <span className={cn("grid h-5 place-items-center", day === "17" && i > 6 && "rounded-md bg-[#2457c5] font-bold text-white", day === "15" && i > 6 && "font-bold text-[#2457c5]")} key={`${day}-${i}`}>{day}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div>
              <h4 className="text-[12px] font-semibold">Fees and recruitment funnel</h4>
              <p className="mt-1 text-[9px] text-[#74829a]">Collection status and conversion from shortlisted profiles to completed warranty.</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-5">
              <article className="border border-[#dce3ee] bg-white p-4">
                <div className="flex items-center justify-between"><h5 className="text-[10px] font-semibold">Outstanding fees</h5><span className="text-[8px] font-medium text-[#2457c5]">View ledger</span></div>
                <div className="mt-4 flex items-center gap-5">
                  <div className="relative size-24 shrink-0 rounded-full bg-[conic-gradient(#2457c5_0_46%,#3dbbd8_46%_82%,#e5484d_82%_100%)] p-[12px]">
                    <div className="grid size-full place-items-center rounded-full bg-white text-center"><div><p className="text-[14px] font-bold tabular-nums">$18.4k</p><p className="text-[7px] text-[#74829a]">outstanding</p></div></div>
                  </div>
                  <div className="flex-1 space-y-2.5">
                    {[["Collected","$24.1k","#2457c5"],["Within term","$12.7k","#3dbbd8"],["Overdue","$5.7k","#e5484d"]].map(([label,value,color]) => <div className="flex items-center gap-2" key={label}><span className="size-2 rounded-sm" style={{backgroundColor:color}} /><span className="flex-1 text-[8px] text-[#66758d]">{label}</span><span className="text-[8px] font-bold tabular-nums">{value}</span></div>)}
                  </div>
                </div>
              </article>
              <article className="border border-[#dce3ee] bg-white p-4">
                <div className="flex items-center justify-between"><h5 className="text-[10px] font-semibold">Recruitment funnel</h5><span className="text-[8px] font-medium text-[#2457c5]">Reports</span></div>
                <div className="mt-4 space-y-2.5">
                  {[["Shortlisted",36,100],["Employer review",24,67],["Interviewed",14,39],["Offered",7,19],["Warranty passed",4,11]].map(([label,value,width],index) => <div className="grid grid-cols-[78px_1fr_30px] items-center gap-2" key={String(label)}><span className="text-[8px] font-medium text-[#66758d]">{label}</span><span className="flex justify-center"><span className="h-4 rounded-[5px] border border-[#d8e2f7]" style={{width:`${width}%`,background:`linear-gradient(to bottom, color-mix(in srgb, #2457c5 ${100-index*15}%, white), color-mix(in srgb, #2457c5 ${42-index*7}%, white))`}} /></span><span className="text-right text-[8px] font-bold tabular-nums">{value}</span></div>)}
                </div>
                <p className="mt-3 border-t border-[#e3e8f0] pt-2 text-right text-[8px] text-[#74829a]">Full-funnel conversion <b className="text-[#2457c5]">11%</b></p>
              </article>
            </div>
          </div>
        </main>
      </ProductShell>
    </ProductFrame>
  );
}

function StatusPill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "cyan" | "red" | "yellow" | "green" }) {
  const styles = {
    blue: "bg-[#eaf0ff] text-[#2457c5]",
    cyan: "bg-[#e6f8fb] text-[#1385a0]",
    red: "bg-[#fff0f0] text-[#cf3f44]",
    yellow: "bg-[#fff8df] text-[#9a7311]",
    green: "bg-[#eaf8ef] text-[#24894b]",
  };
  return <span className={cn("inline-flex rounded-md px-2 py-1 text-[8px] font-bold", styles[tone])}>{children}</span>;
}

function RequestsMockup() {
  const summary = [
    { icon: FileText, value: "24", label: "Total requests", color: "#2457c5" },
    { icon: AlertTriangle, value: "4", label: "Needs action", color: "#e5484d" },
    { icon: CalendarDays, value: "6", label: "Interviewing", color: "#3dbbd8" },
  ] as const;
  const rows = [
    ["REQ-0012", "Emergency physician", "Chợ Rẫy Hospital", "12", "Candidate review", "red"],
    ["REQ-0015", "Clinical pharmacist", "University Medical Center", "8", "Sourcing", "cyan"],
    ["REQ-0018", "Head nurse", "Phương Nam Hospital", "5", "Interviewing", "yellow"],
    ["REQ-0021", "Radiology technician", "Hoàn Mỹ Hospital", "4", "Offer", "green"],
  ] as const;
  return (
    <ProductFrame>
      <ProductShell active="Recruitment requests">
        <main className="p-6">
          <div className="flex items-end justify-between">
            <div><h3 className="text-[22px] font-semibold tracking-[-0.02em]">Recruitment requests</h3><p className="mt-1 text-[10px] text-[#74829a]">Track every request from intake to placement.</p></div>
            <button className="rounded-lg bg-[#2457c5] px-3 py-2 text-[10px] font-semibold text-white">Create request</button>
          </div>
          <div className="mt-5 grid grid-cols-3 border-y border-[#dce3ee] bg-white">
            {summary.map(({ icon: Icon, value, label, color }) => <div className="grid grid-cols-[28px_1fr] gap-x-3 border-r border-[#e2e7ef] px-4 py-3 last:border-r-0" key={label} style={{borderTop:`2px solid ${color}`}}><Icon className="mt-0.5 size-4" strokeWidth={1.8} style={{color}} /><div><p className="text-[18px] leading-none tabular-nums">{value}</p><p className="mt-2 text-[9px] font-semibold text-[#5c6c84]">{label}</p></div></div>)}
          </div>
          <div className="mt-5 flex gap-2">
            {['All · 24','Needs action · 4','Interviewing · 6','Offer · 3'].map((item, i) => <span className={cn("rounded-lg border px-3 py-2 text-[9px] font-semibold", i === 0 ? "border-[#a9bceb] bg-[#eef3ff] text-[#2457c5]" : "border-[#dce3ee] bg-white text-[#67768d]")} key={item}>{item}</span>)}
          </div>
          <div className="mt-4 overflow-hidden border-y border-[#dce3ee] bg-white">
            <div className="grid grid-cols-[80px_1.2fr_1.4fr_54px_105px_24px] gap-3 bg-[#f4f6fa] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.08em] text-[#7c899d]">
              <span>ID</span><span>Position</span><span>Customer</span><span>Openings</span><span>Stage</span><span />
            </div>
            {rows.map(([id, position, customer, openings, stage, tone]) => (
              <div className="grid grid-cols-[80px_1.2fr_1.4fr_54px_105px_24px] items-center gap-3 border-t border-[#e5e9f0] px-4 py-3" key={id}>
                <span className="text-[9px] font-bold text-[#2457c5]">{id}</span>
                <span className="text-[10px] font-semibold">{position}</span>
                <span className="text-[9px] text-[#66758d]">{customer}</span>
                <span className="text-[9px] tabular-nums text-[#66758d]">{openings}</span>
                <StatusPill tone={tone}>{stage}</StatusPill>
                <ArrowRight className="size-3.5 text-[#8290a6]" />
              </div>
            ))}
          </div>
        </main>
      </ProductShell>
    </ProductFrame>
  );
}

function CandidateMockup() {
  return (
    <ProductFrame>
      <ProductShell active="Candidate reviews">
        <main className="grid grid-cols-[1fr_250px] gap-4 p-6">
          <div>
            <div className="flex items-center justify-between"><div><h3 className="text-[20px] font-semibold">Candidate review</h3><p className="mt-1 text-[10px] text-[#74829a]">REQ-0012 · Emergency physician</p></div><StatusPill tone="yellow">Awaiting review</StatusPill></div>
            <div className="mt-5 bg-white p-5 ring-1 ring-[#dce3ee]">
              <div className="flex gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eaf0ff] text-[13px] font-bold text-[#2457c5]">NT</div>
                <div><h4 className="text-[14px] font-semibold">Nguyễn Minh Tú</h4><p className="mt-1 text-[9px] text-[#74829a]">Emergency physician · 6 years experience</p><div className="mt-3 flex gap-2"><StatusPill>License verified</StatusPill><StatusPill tone="cyan">Available</StatusPill></div></div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-y border-[#e3e8f0] py-4">
                {[['Experience','6 years'],['Location','Ho Chi Minh City'],['Expected salary','$2,200/mo']].map(([label,value]) => <div key={label}><p className="text-[8px] uppercase tracking-[0.08em] text-[#8894a7]">{label}</p><p className="mt-1 text-[10px] font-semibold">{value}</p></div>)}
              </div>
              <h5 className="mt-5 text-[10px] font-semibold">Evaluation criteria</h5>
              <div className="mt-3 space-y-3">
                {[['Clinical expertise',88],['Communication',82],['Hospital fit',76]].map(([label,value]) => <div key={String(label)}><div className="flex justify-between text-[9px]"><span className="text-[#62718a]">{label}</span><span className="font-semibold tabular-nums">{value}%</span></div><div className="mt-1 h-1.5 bg-[#edf1f6]"><div className="h-full bg-[#2457c5]" style={{width:`${value}%`}} /></div></div>)}
              </div>
            </div>
          </div>
          <aside className="bg-white p-4 ring-1 ring-[#dce3ee]">
            <h4 className="text-[11px] font-semibold">Review action</h4>
            <p className="mt-1 text-[9px] leading-4 text-[#74829a]">Record a decision without leaving the candidate context.</p>
            <label className="mt-5 block text-[9px] font-semibold">Recommendation</label>
            <div className="mt-2 flex gap-2"><button className="flex-1 rounded-lg bg-[#eaf8ef] py-2 text-[9px] font-bold text-[#24894b]">Shortlist</button><button className="flex-1 rounded-lg bg-[#fff0f0] py-2 text-[9px] font-bold text-[#cf3f44]">Reject</button></div>
            <label className="mt-5 block text-[9px] font-semibold">Internal note</label>
            <div className="mt-2 h-24 rounded-lg border border-[#dce3ee] p-3 text-[9px] leading-4 text-[#8793a5]">Add context for the hiring team...</div>
            <button className="mt-4 w-full rounded-lg bg-[#2457c5] py-2.5 text-[9px] font-semibold text-white">Save review</button>
          </aside>
        </main>
      </ProductShell>
    </ProductFrame>
  );
}

function PipelineMockup() {
  const columns = [
    ["Sourced", "12", ["Trần Anh Khoa", "Phạm Mai Linh"], "#2457c5"],
    ["Reviewed", "7", ["Nguyễn Minh Tú", "Vũ Quang Hải"], "#3dbbd8"],
    ["Interview", "4", ["Lê Bảo Ngọc", "Đỗ Thanh Sơn"], "#e6b326"],
    ["Offer", "2", ["Hoàng Gia Hân"], "#36a269"],
  ] as const;
  return (
    <ProductFrame>
      <ProductShell active="Candidate pool">
        <main className="p-6">
          <div className="flex items-end justify-between"><div><h3 className="text-[21px] font-semibold">Recruitment pipeline</h3><p className="mt-1 text-[10px] text-[#74829a]">REQ-0012 · Emergency physician</p></div><button className="rounded-lg border border-[#dce3ee] bg-white px-3 py-2 text-[9px] font-semibold">Pipeline settings</button></div>
          <div className="mt-5 grid grid-cols-4 gap-3">
            {columns.map(([stage, count, people, color], column) => <section className="bg-[#eef2f7] p-3" key={stage} style={{borderTop:`2px solid ${color}`}}><div className="flex items-center justify-between"><span className="text-[10px] font-semibold">{stage}</span><span className="rounded bg-white px-1.5 py-0.5 text-[8px] font-bold" style={{color}}>{count}</span></div><div className="mt-3 space-y-2">{people.map((name,index)=><article className="bg-white p-3 ring-1 ring-[#dce3ee]" key={name}><div className="flex items-start justify-between"><span className="grid size-6 place-items-center rounded-full text-[8px] font-bold" style={{backgroundColor:`${color}14`,color}}>{name.split(' ').slice(-1)[0][0]}</span>{column === 2 && index === 0 ? <StatusPill tone="yellow">Oct 17</StatusPill> : <span className="text-[8px] text-[#95a0b1]">•••</span>}</div><p className="mt-3 text-[9px] font-semibold">{name}</p><p className="mt-1 text-[8px] text-[#74829a]">Emergency physician</p></article>)}</div></section>)}
          </div>
        </main>
      </ProductShell>
    </ProductFrame>
  );
}

function WarrantyMockup() {
  const summary = [
    { icon: ShieldCheck, value: "12", label: "Active warranties", color: "#2457c5" },
    { icon: AlertTriangle, value: "2", label: "Milestones due", color: "#e6b326" },
    { icon: CircleDollarSign, value: "$18.4k", label: "Fees receivable", color: "#36a269" },
  ] as const;
  const rows = [
    ["PL-0106", "Đặng Quốc Bảo", "Emergency physician", "Trial period", "Dec 01", "green"],
    ["PL-0108", "Hoàng Kim Ngân", "Clinical pharmacist", "Warranty active", "Dec 15", "blue"],
    ["PL-0112", "Nguyễn Thị Hạnh", "Head nurse", "Fee pending", "Nov 30", "yellow"],
  ] as const;
  return (
    <ProductFrame>
      <ProductShell active="Warranty & claims">
        <main className="p-6">
          <div className="flex items-start justify-between"><div><h3 className="text-[21px] font-semibold">Placement assurance</h3><p className="mt-1 text-[10px] text-[#74829a]">Track post-hire milestones, warranty, claims, and service fees.</p></div><StatusPill tone="blue">Shared operations view</StatusPill></div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {summary.map(({ icon: Icon, value, label, color }) => <div className="bg-white p-4 ring-1 ring-[#dce3ee]" key={label} style={{borderTop:`2px solid ${color}`}}><Icon className="size-4" style={{color}} /><p className="mt-3 text-[20px] font-semibold tabular-nums">{value}</p><p className="mt-1 text-[9px] text-[#66758d]">{label}</p></div>)}
          </div>
          <div className="mt-4 bg-white ring-1 ring-[#dce3ee]">
            <div className="grid grid-cols-[74px_1fr_1.2fr_100px_66px] gap-3 bg-[#f4f6fa] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.08em] text-[#7c899d]"><span>Placement</span><span>Candidate</span><span>Position</span><span>Status</span><span>Milestone</span></div>
            {rows.map(([id,name,position,status,date,tone])=><div className="grid grid-cols-[74px_1fr_1.2fr_100px_66px] items-center gap-3 border-t border-[#e5e9f0] px-4 py-3" key={id}><span className="text-[9px] font-bold text-[#2457c5]">{id}</span><span className="text-[9px] font-semibold">{name}</span><span className="text-[9px] text-[#66758d]">{position}</span><StatusPill tone={tone}>{status}</StatusPill><span className="text-[9px] tabular-nums text-[#66758d]">{date}</span></div>)}
          </div>
        </main>
      </ProductShell>
    </ProductFrame>
  );
}

function NextProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link className={cn("group grid overflow-hidden rounded-2xl bg-white ring-1 ring-[#d9e0eb] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(17,24,39,0.12)]", featured && "md:grid-cols-[1.2fr_1fr]")} href={project.href || "#"}>
      {project.image && <div className={cn("relative aspect-[4/3] overflow-hidden bg-[#edf1f7]", featured && "md:aspect-auto md:min-h-[300px]")}><Image alt="" className="object-cover transition duration-500 group-hover:scale-[1.02]" fill sizes={featured ? "(max-width: 768px) 100vw, 600px" : "(max-width: 768px) 100vw, 480px"} src={project.image} /></div>}
      <div className="flex flex-col justify-between p-6 sm:p-8"><div><p className="text-sm text-[#708097]">{project.dates}</p><h3 className="mt-3 font-[var(--font-heading)] text-2xl leading-tight tracking-[-0.02em] text-[#111827]">{project.title}</h3><p className="mt-4 text-sm leading-6 text-[#66758d]">{project.description}</p></div><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2457c5]">View case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div>
    </Link>
  );
}

export function MedhuntCaseStudy() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f5f7fb] text-[#111827] selection:bg-[#c9d8ff] selection:text-[#10285f]">
      <CaseStudySectionNavigation heroId="medhunt-hero" sections={sections} />
      <ProjectCaseStudyHero
        colors={projectMeshPalettes.medhunt}
        id="medhunt-hero"
        links={[
          {
            href: "https://medhunts.com/",
            label: "Live project",
            icon: "website",
          },
        ]}
        outcome="A unified workspace connecting recruitment requests, candidates, interviews, placements, warranty, and service fees."
        role="UI/UX Designer"
        scope="Product architecture · Interactive HTML prototyping · Design system · Developer handoff"
        status="Prototype · In development"
        title="MedHunt — Healthcare Recruitment OS"
        titleLines={["MedHunt — Healthcare", "Recruitment OS"]}
      />

      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-32 px-5 py-28 sm:gap-40 sm:px-8 sm:py-36">
        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-overview">
          <div className="border-y border-[#d7deea] py-10">
            <CaseStudyStatementReveal className="text-[#17213a]" text="The design challenge was not a single dashboard. It was making an entire service operation understandable." />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-architecture">
          <div>
            <h3 className="font-[var(--font-heading)] text-[26px] tracking-[-0.02em]">Service journey and system spine</h3>
            <div className="mt-8 overflow-x-auto pb-4">
              <div className="flex min-w-[900px] items-center">
                {journey.map((item, index) => <div className="flex flex-1 items-center" key={item}><div className="flex min-h-24 flex-1 flex-col justify-between border-y border-[#cfd8e6] bg-white px-4 py-4"><span className="text-xs font-bold tabular-nums text-[#2457c5]">{String(index + 1).padStart(2,"0")}</span><span className="mt-5 text-sm font-semibold text-[#27334b]">{item}</span></div>{index < journey.length - 1 && <ArrowRight className="mx-2 size-4 shrink-0 text-[#8592a6]" />}</div>)}
              </div>
            </div>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-workflow">
          <SectionHeading title="From business rules to working HTML prototypes" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#d7deea] ring-1 ring-[#d7deea] md:grid-cols-5">
            {process.map(({ icon: Icon, title }, index) => <article className="bg-white p-5" key={title}><div className="flex items-center justify-between"><Icon className="size-5 text-[#2457c5]" strokeWidth={1.8} /><span className="text-xs font-bold tabular-nums text-[#9aa5b5]">{String(index + 1).padStart(2,"0")}</span></div><h3 className="mt-8 text-sm font-semibold">{title}</h3></article>)}
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-dashboard">
          <SectionHeading title="A dashboard that leads with work, not reporting" />
          <div className="mt-12 overflow-x-auto pb-4"><ProductScreenshot alt="MedHunt dashboard showing today’s work, open requests, active cases, and outstanding fees" src="/assets/medhunt/screens/dashboard.png" /></div>
          <p className="mt-5 text-sm leading-6 text-[#728097]">Synthetic demonstration data.</p>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-core">
          <SectionHeading title="Core workflows stay close to the decision" />
          <div className="mt-16 space-y-24 sm:space-y-32">
            <article><h3 className="mb-5 font-[var(--font-heading)] text-[26px] tracking-[-0.02em]">01. Request intake and tracking</h3><div className="overflow-x-auto pb-4"><ProductScreenshot alt="MedHunt recruitment request list with status metrics and operational table" src="/assets/medhunt/screens/requests.png?v=cards-3" /></div></article>
            <article><h3 className="mb-5 font-[var(--font-heading)] text-[26px] tracking-[-0.02em]">02. Candidate pool visibility</h3><div className="overflow-x-auto pb-4"><ProductScreenshot alt="MedHunt candidate pool with profile status, specialty, experience, and license information" src="/assets/medhunt/screens/candidates.png?v=cards-3" /></div></article>
            <article><h3 className="mb-5 font-[var(--font-heading)] text-[26px] tracking-[-0.02em]">03. Pipeline visibility</h3><div className="overflow-x-auto pb-4"><ProductScreenshot alt="MedHunt recruitment pipeline showing candidate stages and next milestones" src="/assets/medhunt/screens/pipeline.png?v=cards-3" /></div></article>
            <article><h3 className="mb-5 font-[var(--font-heading)] text-[26px] tracking-[-0.02em]">04. Fees and recruitment funnel</h3><div className="overflow-x-auto pb-4"><ProductScreenshot alt="MedHunt fee collection and recruitment funnel dashboard" src="/assets/medhunt/screens/fees-funnel.png?v=cards-3" /></div></article>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-system">
          <SectionHeading title="A calm system for dense operational work" />
          <div className="mt-12 grid gap-10 border-y border-[#d7deea] py-10 lg:grid-cols-[1fr_1.3fr]">
            <div><h3 className="text-sm font-semibold">Semantic color</h3><div className="mt-6 grid grid-cols-5 gap-3">{[['#2457c5','Primary'],['#3dbbd8','Schedule'],['#e6b326','Pending'],['#e5484d','Exception'],['#36a269','Success']].map(([color,label])=><div key={label}><div className="h-20" style={{backgroundColor:color}} /><p className="mt-2 text-xs text-[#64748b]">{label}</p></div>)}</div></div>
            <div><h3 className="text-sm font-semibold">Interface principles</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{[['Action before analytics','The overview prioritizes overdue work and today’s coordination.'],['Flat operational surfaces','Tables and lists stay readable without excessive shadows or decoration.'],['Status is explicit','Labels pair text with restrained semantic color, never color alone.'],['Details without dead ends','Contextual panels keep decisions near the selected record.']].map(([title,text])=><div className="border-t border-[#cfd8e6] pt-4" key={title}><p className="text-sm font-semibold">{title}</p><p className="mt-2 text-sm leading-6 text-[#66758d]">{text}</p></div>)}</div></div>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-outcome">
          <div className="rounded-2xl bg-[#10285f] p-7 text-white sm:p-10 lg:p-12">
            <CheckCircle2 className="size-7 text-[#73d3e7]" />
            <h2 className="mt-7 max-w-[780px] text-balance font-[var(--font-heading)] text-[30px] leading-[1.2] tracking-[-0.02em] sm:text-[40px]">The result is a clearer product model and a more testable handoff.</h2>
            <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-3">{[['Connected system','Requests, candidates, interviews, placements, warranty, and fees share a visible relationship.'],['Browser-tested decisions','Real layout density, responsive behavior, and UI states can be reviewed before implementation.'],['Living handoff','Developers receive more than static screens: they can inspect behavior and state logic in context.']].map(([title,text])=><div key={title}><p className="text-sm font-semibold text-white">{title}</p><p className="mt-3 text-sm leading-6 text-[#cbd6ed]">{text}</p></div>)}</div>
            <p className="mt-10 max-w-[72ch] text-sm leading-6 text-[#aebdd9]">MedHunt is presented as a prototype in development. The outcome described here is the design and collaboration foundation, not a claim of measured production impact.</p>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection className="scroll-mt-24" id="medhunt-next">
          <SectionHeading title="Keep exploring the work" />
          <div className="mt-10 space-y-6">{nextProjects[0] && <NextProjectCard featured project={nextProjects[0]} />}<div className="grid gap-6 md:grid-cols-2">{nextProjects.slice(1).map((project)=><NextProjectCard key={project.href || project.title} project={project} />)}</div></div>
        </CaseStudyRevealSection>
      </div>

      <section className="px-5 pb-72 pt-24 text-center sm:pb-80" id="medhunt-contact">
        <h2 className="font-[var(--font-heading)] text-[30px] tracking-[-0.02em] sm:text-[40px]">Let’s build clearer product systems.</h2>
        <p className="mx-auto mt-5 max-w-[600px] text-base leading-7 text-[#64748b]">I’m open to UI/UX and Product Design opportunities. Email me at <a className="font-medium text-[#2457c5] underline decoration-[#9fb4e6] underline-offset-4" href="mailto:phuongthuy101222@gmail.com">phuongthuy101222@gmail.com</a>.</p>
      </section>
    </main>
  );
}
