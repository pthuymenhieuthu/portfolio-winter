import { PortfolioChatHero } from "@/components/portfolio-chat-hero";
import { ProjectCard } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { DATA } from "@/data/resume";
import { getVisibleProjects } from "@/lib/next-projects";
import styles from "./portfolio-chat.module.css";

const projects = getVisibleProjects(DATA.projects).filter(
  (project) => project.href !== "/blog/lollypop"
);

export default function PortfolioChatPreview() {
  return (
    <main className={styles.page}>
      <PortfolioChatHero preview />
      <section id="projects" className={styles.projects} aria-labelledby="projects-heading">
        <div className={styles.projectsInner}>
          <div className="flex w-full flex-col items-center justify-center space-y-2 px-4 text-center">
            <span className="text-sm font-normal text-[#29303B]/55">My Projects</span>
            <h2 id="projects-heading" className="mx-auto max-w-[300px] font-[var(--font-heading)] text-[26px] font-medium leading-[1.08] tracking-[-2px] text-[#29303B] sm:max-w-none sm:text-[44px] lg:text-[52px]">
              Check out my latest work
            </h2>
            <p className="text-base leading-[1.35] text-[#737373]">
              Find out more on my{" "}
              <a href={DATA.contact.social.Behance.url} target="_blank" rel="noopener noreferrer" className="text-[#0096F7] underline underline-offset-4 transition hover:text-[#007ac9]">Behance</a>
            </p>
          </div>
          <ProjectGallery>
            {projects.map((project) => (
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            ))}
          </ProjectGallery>
        </div>
      </section>
    </main>
  );
}
