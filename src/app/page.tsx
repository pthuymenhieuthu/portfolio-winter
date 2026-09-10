import BlurFade from "@/components/magicui/blur-fade";
import { BringOnBoard } from "@/components/bring-on-board";
import { ProjectCard } from "@/components/project-card";
import { TallyContactForm } from "@/components/tally-contact-form";
import { HomeHero } from "@/components/home-hero";
import { DATA } from "@/data/resume";
import Link from "next/link";
import GoogleTracking from "@/components/google-tracking";

const BLUR_FADE_DELAY = 0.04;
const HOME_PROJECTS = DATA.projects.filter(
  (project) => project.title !== "ZanZan"
);

export default function Page() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#F2F6FA]">
      <GoogleTracking />
      <main className="relative z-10 flex min-h-[100dvh] w-full max-w-full flex-col overflow-hidden rounded-b-[32px] bg-background text-[#29303B] md:mb-[64dvh] md:rounded-b-[40px]">
        <HomeHero />

        <section id="projects" className="relative z-10 w-full max-w-full overflow-hidden pt-16 sm:pt-36 lg:pt-52">
          <div className="w-full space-y-12 pb-20 sm:space-y-16 lg:space-y-20">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex w-full flex-col items-center justify-center space-y-4 px-4 text-center">
                <div className="space-y-2">
                  <div className="text-sm font-normal text-[#29303B]/55">
                    My Projects
                  </div>
                  <h2 className="mx-auto max-w-[300px] font-[var(--font-heading)] text-[26px] font-medium leading-[1.08] tracking-normal text-[#29303B] sm:max-w-none sm:text-[44px] lg:text-[52px]">
                    Check out my latest work
                  </h2>
                  <p className="text-base leading-[1.35] text-[#737373]">
                    Find out more on my{" "}
                    <a
                      href="https://www.behance.net/thuynguyen175"
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
            <div className="mx-auto grid w-full max-w-[800px] grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-0">
              {HOME_PROJECTS.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
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
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <BringOnBoard />
      </main>
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-20 h-8 md:hidden"
        style={{ marginTop: -32 }}
      >
        <span
          className="absolute bg-[radial-gradient(circle_at_top_right,transparent_0_31px,#F2F6FA_32px)]"
          style={{ inset: "0 auto 0 0", width: 32 }}
        />
        <span
          className="absolute bg-[radial-gradient(circle_at_top_left,transparent_0_31px,#F2F6FA_32px)]"
          style={{ inset: "0 0 0 auto", width: 32 }}
        />
      </div>
      <footer
        id="contact"
        className="relative z-10 flex min-h-[720px] items-center justify-center overflow-hidden bg-[#F2F6FA] px-5 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-20 text-center text-[#29303B] md:fixed md:inset-x-0 md:bottom-0 md:z-0 md:h-[64dvh] md:min-h-[560px] md:px-8 md:pb-40 md:pt-[72px]"
      >
        <div className="mx-auto grid w-full max-w-[1080px] items-center justify-items-center gap-4 text-center md:translate-y-14 md:grid-cols-2 md:gap-8 md:text-left lg:translate-y-12 lg:gap-10">
          <div className="flex w-full max-w-[520px] flex-col items-center md:items-start">
            <div className="text-sm font-normal text-[#29303B]/60">
              Contact
            </div>
            <h2 className="mt-3 max-w-[520px] font-[var(--font-heading)] text-[26px] font-medium leading-[1.06] tracking-normal sm:mt-4 sm:text-[38px] lg:text-[44px]">
              Tell me about your project
            </h2>
            <p className="mt-3 max-w-[500px] text-sm leading-[1.4] text-[#29303B]/70 sm:text-base sm:leading-[1.45]">
              Have a project, role, or collaboration in mind? Drop a quick note
              here, or email me at{" "}
              <Link
                href={DATA.contact.social.email.url}
                className="text-[#0096F7] underline-offset-4 hover:underline"
              >
                phuongthuy101222@gmail.com
              </Link>
              .
            </p>
            <p className="mt-3 text-sm text-[#29303B]/60 sm:mt-4">
              Prefer DM? Find me on{" "}
              <Link
                href={DATA.contact.social.LinkedIn.url}
                className="text-[#0096F7] underline-offset-4 hover:underline"
              >
                Linkedin
              </Link>
              .
            </p>
          </div>
          <TallyContactForm />
        </div>
      </footer>
    </div>
  );
}
