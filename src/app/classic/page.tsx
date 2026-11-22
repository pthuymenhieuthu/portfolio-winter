import { PortfolioContactFooter } from "@/components/portfolio-contact-footer";
import BlurFade from "@/components/magicui/blur-fade";
import { FreelanceServices } from "@/components/freelance-services";
import { ProjectCard } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { HomeHero } from "@/components/home-hero";
import { DATA } from "@/data/resume";
import { getVisibleProjects } from "@/lib/next-projects";
import { WaterModeProvider } from "@/components/water-mode";

const BLUR_FADE_DELAY = 0.04;
const HOME_PROJECTS = getVisibleProjects(DATA.projects).filter(
  (project) => project.href !== "/blog/lollypop"
);

export default function Page() {
  return (
    <WaterModeProvider>
    <div className="w-full max-w-full overflow-x-hidden bg-[#F2F6FA]">
      <main className="relative z-10 flex min-h-[100dvh] w-full max-w-full flex-col overflow-hidden bg-background text-[#29303B]">
        <HomeHero />

        <section id="projects" className="relative z-10 w-full max-w-full scroll-mt-[80px] overflow-hidden pt-16 sm:scroll-mt-[96px] sm:pt-36 lg:pt-52">
          <div className="w-full space-y-12 pb-20 sm:space-y-16 lg:space-y-20">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex w-full flex-col items-center justify-center space-y-4 px-4 text-center">
                <div className="space-y-2">
                  <div className="text-sm font-normal text-[#29303B]/55">
                    My Projects
                  </div>
                  <h2 className="mx-auto max-w-[300px] font-[var(--font-heading)] text-[26px] font-medium leading-[1.08] tracking-[-2px] text-[#29303B] sm:max-w-none sm:text-[44px] lg:text-[52px]">
                    Check out my latest work
                  </h2>
                  <p className="text-base leading-[1.35] text-[#737373]">
                    Find out more on my{" "}
                    <a
                      href={DATA.contact.social.Behance.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0096F7] underline underline-offset-4 transition hover:text-[#007ac9]"
                    >
                      Behance
                    </a>
                  </p>
                </div>
              </div>
            </BlurFade>
            <ProjectGallery>
              {HOME_PROJECTS.map((project) => (
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

        <FreelanceServices />
      </main>
      <PortfolioContactFooter />
    </div>
    </WaterModeProvider>
  );
}
