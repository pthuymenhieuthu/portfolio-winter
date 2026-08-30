import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { BringOnBoard } from "@/components/bring-on-board";
import { ProjectCard } from "@/components/project-card";
import { TallyContactForm } from "@/components/tally-contact-form";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import GoogleTracking from "@/components/google-tracking";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#08090a]">
      <GoogleTracking />
      <main className="relative z-10 mb-[64dvh] flex min-h-[100dvh] w-full max-w-full flex-col overflow-hidden rounded-b-[40px] bg-background">
        <section
          id="hero"
          className="relative isolate flex min-h-[650px] w-full max-w-full items-center justify-center overflow-hidden px-6 sm:min-h-[760px] md:min-h-[900px] lg:min-h-[1000px]"
        >
          <Image
            src="/assets/home/hero-blob-top.svg"
            alt=""
            width={1440}
            height={422}
            priority
            className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[max(1500px,112vw)] max-w-none -translate-x-1/2 select-none"
          />
          <Image
            src="/assets/home/hero-blob-bottom.svg"
            alt=""
            width={1440}
            height={702}
            priority
            className="pointer-events-none absolute bottom-[-120px] left-1/2 -z-10 w-[max(1500px,112vw)] max-w-none -translate-x-1/2 select-none"
          />

          <div className="mx-auto flex w-full max-w-[560px] -translate-y-6 flex-col items-center text-center sm:-translate-y-14 lg:-translate-y-16">
            <HeroTitleReveal
              className="font-[var(--font-heading)] text-[48px] font-bold leading-[0.95] tracking-normal text-[hsl(var(--ink))] sm:text-[64px]"
              delay={BLUR_FADE_DELAY}
              text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
            />
            <BlurFade delay={1.28}>
              <p className="mt-5 text-base leading-[1.35] text-[#171717]">
                Proactive Product Designer
                <br />
                <span className="text-[hsl(var(--ink-soft))]">
                  · Passionate about learning and growth
                </span>
              </p>
            </BlurFade>
          </div>
        </section>

        <section id="projects" className="relative z-10 w-full max-w-full overflow-hidden pt-16 sm:pt-36 lg:pt-52">
          <div className="w-full space-y-12 pb-20 sm:space-y-16 lg:space-y-20">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex w-full flex-col items-center justify-center space-y-4 px-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="mx-auto max-w-[360px] font-[var(--font-heading)] text-[28px] font-bold leading-[1.08] tracking-normal sm:max-w-none sm:text-[44px] lg:text-[52px]">
                    Check out my latest work
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Find out more on my{" "}
                    <a
                      href="https://www.behance.net/thuynguyen175"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Behance
                    </a>
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="mx-auto grid w-full max-w-[800px] grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-0">
              {DATA.projects.map((project, id) => (
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
        <div aria-hidden="true" className="h-32 bg-background sm:h-44" />
      </main>
      <footer
        id="contact"
        className="fixed inset-x-0 bottom-0 z-0 flex h-[64dvh] min-h-[560px] items-center justify-center overflow-hidden bg-[#08090a] px-5 pb-36 pt-16 text-center text-white sm:px-8 sm:pb-40 sm:pt-[72px]"
      >
        <div className="mx-auto grid w-full max-w-[1080px] translate-y-16 items-center justify-items-center gap-6 text-center sm:translate-y-14 md:grid-cols-2 md:gap-8 md:text-left lg:translate-y-12 lg:gap-10">
          <div className="flex w-full max-w-[520px] flex-col items-center md:items-start">
            <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm font-medium text-[#08090a]">
              Contact
            </div>
            <h2 className="mt-4 max-w-[520px] font-[var(--font-heading)] text-[28px] font-bold leading-[1.06] tracking-normal sm:text-[38px] lg:text-[44px]">
              Tell me about your project
            </h2>
            <p className="mt-3 max-w-[500px] text-sm leading-[1.45] text-white/68 sm:text-base">
              Have a project, role, or collaboration in mind? Drop a quick note
              here, or email me at{" "}
              <Link
                href={DATA.contact.social.email.url}
                className="text-[#ff93f1] underline-offset-4 hover:underline"
              >
                phuongthuy101222@gmail.com
              </Link>
              .
            </p>
            <p className="mt-4 text-sm text-white/50">
              Prefer DM? Find me on{" "}
              <Link
                href={DATA.contact.social.LinkedIn.url}
                className="text-[#ff93f1] underline-offset-4 hover:underline"
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
