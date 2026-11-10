"use client";

import Link from "next/link";
import { DATA } from "@/data/resume";
import { getNextProjects } from "@/lib/next-projects";
import { caseStudyStyles } from "@/lib/case-study-styles";
import { cn } from "@/lib/utils";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";

type RelatedProject = (typeof DATA.projects)[number];

function NextProjectCard({ project, featured = false }: { project: RelatedProject; featured?: boolean }) {
  return (
    <Link href={project.href} className={cn("group block overflow-hidden rounded-3xl border border-black/10 bg-white/65 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2c86ff]", featured && "md:grid md:grid-cols-[1.15fr_0.85fr] md:items-stretch")}>
      <div className={cn("relative overflow-hidden bg-[#eef3f8]", featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]")}>
        {(project.video || project.image) && <ResponsiveMotionImage src={project.video || project.image} mobilePosterSrc={project.image || undefined} alt={project.title} width={1200} height={675} unoptimized sizes={featured ? "(max-width: 768px) 90vw, 560px" : "(max-width: 768px) 90vw, 440px"} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />}
      </div>
      <div className="flex flex-col justify-between gap-8 p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#626773]">{featured ? "Next project" : project.dates}</p>
          <h3 className={cn("mt-3 font-[var(--font-heading)] font-normal leading-[1.2] tracking-normal", featured ? "text-3xl" : "text-2xl")}>{project.title}</h3>
          <p className="mt-4 text-sm leading-6 text-[#737373]">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">{project.technologies.slice(0, featured ? 4 : 3).map(tag => <span key={tag} className="rounded-full bg-[#eeeff1] px-3 py-1.5 text-xs text-[#454545]">{tag}</span>)}</div>
      </div>
    </Link>
  );
}

export function CaseStudyNextProjects({ currentHref, id }: { currentHref: string; id: string }) {
  const projects = getNextProjects(DATA.projects, currentHref);
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-5"><span className={caseStudyStyles.eyebrow}>Next projects</span><h2 className={caseStudyStyles.sectionTitle}>Keep exploring the work</h2></div>
      {projects[0] && <NextProjectCard project={projects[0]} featured />}
      <div className="grid gap-6 md:grid-cols-2">{projects.slice(1).map(project => <NextProjectCard project={project} key={project.href} />)}</div>
    </section>
  );
}
