import { KioskJourneyIllustration } from "@/components/kiosk-journey-illustration";
import { KioskPrototype } from "@/components/kiosk-prototype";
import { KioskCustomerJourney } from "@/components/kiosk-customer-journey";
import { CaseStudyNextProjects } from "@/components/case-study-next-projects";
import { CaseStudySectionNavigation } from "@/components/case-study-section-navigation";
import { ProjectCaseStudyHero } from "@/components/project-case-study-hero";
import { caseStudyStyles as styles } from "@/lib/case-study-styles";

const sections = [
  { id: "kiosk-overview", label: "Overview" },
  { id: "kiosk-problem", label: "Problem statement" },
  { id: "kiosk-journey", label: "Customer journey" },
  { id: "kiosk-challenge", label: "Design challenge" },
  { id: "kiosk-research", label: "Research focus" },
  { id: "kiosk-directions", label: "Design directions" },
  { id: "kiosk-validation", label: "Validation" },
  { id: "kiosk-next", label: "Next projects" },
];

const stages = [
  { name: "Find", question: "Where can I find it?", barrier: "Categories and scrolling are difficult to discover.", research: "Can users find the item they want without assistance?", title: "Clearer navigation", direction: "Recognizable categories, visible selection states, and discoverable scrolling.", task: "Find an item", detail: "Ask participants to locate a specific menu item without prompting." },
  { name: "Choose", question: "What’s included?", barrier: "Similar images and unclear combo details make comparison difficult.", research: "Can users identify the differences and understand what is included?", title: "Clearer meal options", direction: "Distinct product information, explicit combo contents, and clear prices.", task: "Choose a suitable meal", detail: "Ask participants to compare options and explain what their chosen meal includes." },
  { name: "Collect", question: "Where do I collect my order?", barrier: "Order numbers and pickup instructions create uncertainty.", research: "Do users know which number to follow and where to wait?", title: "Clearer pickup guidance", direction: "A prominent order number and instructions tailored to the collection method.", task: "Explain the pickup process", detail: "Ask participants which number they would follow and where they would wait." },
];

function SectionHeading({ index, title }: { index: string; title: string }) {
  return <div className="mb-8 flex items-baseline gap-4"><span className="text-sm tabular-nums text-[#737373]">{index}</span><h2 className={styles.sectionTitle}>{title}</h2></div>;
}

export function KioskCaseStudy() {
  return (
    <main className="bg-white pb-32 text-[#08090a]">
      <CaseStudySectionNavigation heroId="kiosk-hero" sections={sections} />
      <ProjectCaseStudyHero
        id="kiosk-hero"
        title="McDonald’s — Making Self-Ordering Easier"
        titleLines={["McDonald’s — Making", "Self-Ordering Easier"]}
        summaryLines={["Helping occasional kiosk users", "find, choose, and collect meals", "with clearer ordering guidance."]}
        backgroundSrc="/assets/kiosk/thumbnail-mockup.png"
        colors={["#fff8df", "#ffc72c", "#d62819"]}
        role="UX/UI Design · Independent project"
        scope="In-restaurant ordering · Vietnam"
        status="Exploration · Validation planned"
        outcome="Design directions for finding, choosing, and collecting meals"
        links={[{ href: "/classic#projects", label: "All projects", icon: "link" }]}
      />

      <div className="mx-auto flex max-w-[1040px] flex-col gap-24 px-5 pt-[120px] sm:gap-32 sm:px-8">
        <section id="kiosk-overview" className="scroll-mt-28">
          <SectionHeading index="01" title="Overview" />
          <p className={`${styles.body} max-w-[800px]`}>This independent UX/UI project explores how McDonald’s kiosks can better support first-time and occasional users across three moments: finding food, comparing meal options, and understanding pickup instructions.</p>
          <figure className="mt-12">
            <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-[#fafafa]"><KioskJourneyIllustration /></div>
            <figcaption className="mt-4 text-xs leading-5 text-[#64604f]">Find → Choose → Collect · Three moments in the self-ordering journey.</figcaption>
          </figure>
          <div className="mt-9 grid gap-6 border-y border-[#e5e5e5] py-7 sm:grid-cols-3">
            {stages.map((stage, index) => <div key={stage.name}><p className="flex items-center gap-3 text-sm"><span className="flex size-7 items-center justify-center rounded-full bg-[#ffdf70] text-xs">{index + 1}</span>{stage.name}</p><p className="mt-4 text-lg leading-snug">“{stage.question}”</p></div>)}
          </div>
        </section>

        <section id="kiosk-problem" className="scroll-mt-28">
          <SectionHeading index="02" title="Problem statement" />
          <p className={`${styles.body} max-w-[800px]`}>First-time and occasional kiosk users may struggle to find menu items, distinguish between similar meal options, and understand pickup instructions. These moments of uncertainty can make independent ordering more difficult and lead customers to seek staff assistance.</p>
          <KioskCustomerJourney />
        </section>

        <section id="kiosk-challenge" className="scroll-mt-28 border-l-4 border-[#ffc72c] pl-6 sm:pl-10">
          <SectionHeading index="03" title="Design challenge" />
          <p className="max-w-[880px] font-[var(--font-heading)] text-[28px] leading-[1.3] tracking-[-0.5px] sm:text-[40px]">How might we help first-time and occasional kiosk users find the right meal and understand what to do next?</p>
        </section>

        <section id="kiosk-research" className="scroll-mt-28">
          <SectionHeading index="04" title="Research focus" />
          <p className={`${styles.body} max-w-[800px]`}>Secondary research suggests three potential barriers to investigate in Vietnam. These are starting hypotheses to validate through local observation and usability testing.</p>
          <div className="mt-9 overflow-x-auto rounded-lg border border-[#dedede]">
            <table className="w-full min-w-[620px] text-left text-sm leading-relaxed">
              <caption className="sr-only">Potential barriers and research questions across the three ordering stages</caption>
              <thead className="bg-[#f7f7f7]"><tr><th scope="col" className="p-5 font-medium">Stage</th><th scope="col" className="p-5 font-medium">Potential barrier</th><th scope="col" className="p-5 font-medium">Research question</th></tr></thead>
              <tbody>{stages.map(stage => <tr key={stage.name} className="border-t border-[#dedede] align-top"><th scope="row" className="p-5 font-medium">{stage.name}</th><td className="w-[40%] p-5 text-[#525252]">{stage.barrier}</td><td className="p-5 text-[#525252]">{stage.research}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-5 max-w-[800px] text-sm leading-relaxed text-[#737373]">The published case studies below provide context from other projects and markets. They do not establish how today’s kiosks perform in Vietnam.</p>
        </section>

        <section id="kiosk-directions" className="scroll-mt-28">
          <SectionHeading index="05" title="Design directions" />
          <p className={styles.body}>Three directions brought together in a bilingual, interactive kiosk concept.</p>
          <div className="mt-9">{stages.map((stage, index) => <article key={stage.name} className="grid gap-4 border-t border-[#dedede] py-8 sm:grid-cols-[160px_1fr]"><p className="text-sm text-[#737373]">0{index + 1} / {stage.name}</p><div><h3 className="font-[var(--font-heading)] text-2xl">{stage.title}</h3><p className={`${styles.body} mt-3 max-w-[640px]`}>{stage.direction}</p></div></article>)}</div>
          <KioskPrototype />
        </section>

        <section id="kiosk-validation" className="scroll-mt-28">
          <SectionHeading index="06" title="Validation" />
          <p className={`${styles.body} max-w-[800px]`}>Compare the current experience with the prototype using three tasks: find an item, choose a suitable meal, and explain the pickup process.</p>
          <ol className="mt-8 grid gap-7 sm:grid-cols-3">{stages.map((stage, index) => <li key={stage.name} className="border-t-2 border-[#08090a] pt-5"><p className="text-xs text-[#737373]">Task 0{index + 1}</p><h3 className="mt-3 text-lg font-medium">{stage.task}</h3><p className="mt-3 text-sm leading-relaxed text-[#737373]">{stage.detail}</p></li>)}</ol>
          <div className="mt-10 rounded-lg bg-[#f7f7f7] p-6 sm:p-8"><h3 className="text-lg font-medium">What to assess</h3><p className="mt-3 text-base leading-relaxed text-[#525252]">Task completion, errors, requests for assistance, and user confidence.</p><p className="mt-5 text-sm leading-relaxed text-[#737373]">Validation is planned. No participant results or measured improvements are reported at this stage.</p></div>
        </section>

        <aside className="border-t border-[#dedede] pt-8">
          <h2 className="text-lg font-medium">References & project context</h2>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-[#525252]">
            <li><a href="https://adamaugustyn.com/project/mcdonalds-digital-omnichannel-ux" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Adam Augustyn · McDonald’s Digital Omni-Channel Experience ↗</a><p className="mt-1 text-[#737373]">Reference for journey-led storytelling and restaurant service contexts.</p></li>
            <li><a href="https://uxdesign.cc/mcdonalds-kiosk-ordering-system-ui-ux-case-study-fe7b3693f12c" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Chee Seng Leong · McDonald’s kiosk ordering system (2019) ↗</a><p className="mt-1 text-[#737373]">Secondary context for navigation, customization, and collection hypotheses.</p></li>
            <li><a href="https://mcdonalds.vn" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">McDonald’s Vietnam · Product photography ↗</a><p className="mt-1 text-[#737373]">Product images are used in the interactive concept. Prototype prices are illustrative.</p></li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-[#737373]">Independent concept study, not commissioned by or affiliated with McDonald’s. Illustrations show the proposed research focus, not a shipped kiosk interface.</p>
        </aside>
        <CaseStudyNextProjects currentHref="/blog/mcdonalds-kiosk" id="kiosk-next" />
      </div>
    </main>
  );
}
