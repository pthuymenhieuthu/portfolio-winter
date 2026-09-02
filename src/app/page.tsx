import BlurFade from "@/components/magicui/blur-fade";
import { HeroTitleReveal } from "@/components/magicui/hero-title-reveal";
import { BringOnBoard } from "@/components/bring-on-board";
import { ProjectCard } from "@/components/project-card";
import { TallyContactForm } from "@/components/tally-contact-form";
import { HeroCtaButtons } from "@/components/hero-cta-buttons";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import GoogleTracking from "@/components/google-tracking";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#08090a]">
      <GoogleTracking />
      <main className="relative z-10 flex min-h-[100dvh] w-full max-w-full flex-col overflow-hidden rounded-b-[32px] bg-background md:mb-[64dvh] md:rounded-b-[40px]">
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
            className="pointer-events-none absolute left-1/2 top-[-96px] z-0 w-[max(1280px,100vw)] max-w-none -translate-x-1/2 select-none sm:top-[-132px] md:top-[-104px] lg:top-[-72px]"
          />
          <Image
            src="/assets/home/hero-blob-bottom.svg"
            alt=""
            width={1440}
            height={702}
            priority
            className="pointer-events-none absolute bottom-[-230px] left-1/2 z-0 w-[max(1280px,100vw)] max-w-none -translate-x-1/2 select-none sm:bottom-[-220px] md:bottom-[-210px] lg:bottom-[-190px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent via-background/55 to-background"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-[560px] -translate-y-6 flex-col items-center text-center sm:-translate-y-14 lg:-translate-y-16">
            <HeroTitleReveal
              className="max-w-full font-[var(--font-heading)] text-[34px] font-bold leading-[0.95] tracking-normal text-[hsl(var(--ink))] min-[390px]:text-[36px] sm:text-[64px]"
              delay={BLUR_FADE_DELAY}
              text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
            />
            <BlurFade delay={1.28}>
              <div className="mt-5 flex w-full flex-col items-center gap-[36px]">
                <p className="mx-auto max-w-[520px] text-base leading-[1.35] text-[#171717]">
                  Proactive Product Designer
                  <br />
                  <span className="text-[hsl(var(--ink-soft))]">
                    Bridging user needs, business goals, and product outcomes
                  </span>
                </p>
                <HeroCtaButtons />
              </div>
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
                  <h2 className="mx-auto max-w-[300px] font-[var(--font-heading)] text-[26px] font-bold leading-[1.08] tracking-normal sm:max-w-none sm:text-[44px] lg:text-[52px]">
                    Check out my latest work
                  </h2>
                  <p className="text-base leading-[1.35] text-[#737373]">
                    Find out more on my{" "}
                    <a
                      href="https://www.behance.net/thuynguyen175"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a855f7] underline underline-offset-4 transition hover:text-[#ff51ff]"
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
        className="relative z-10 flex min-h-[720px] items-center justify-center overflow-hidden bg-[#08090a] px-5 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-20 text-center text-white md:fixed md:inset-x-0 md:bottom-0 md:z-0 md:h-[64dvh] md:min-h-[560px] md:px-8 md:pb-40 md:pt-[72px]"
      >
        <div className="mx-auto grid w-full max-w-[1080px] items-center justify-items-center gap-4 text-center md:translate-y-14 md:grid-cols-2 md:gap-8 md:text-left lg:translate-y-12 lg:gap-10">
          <div className="flex w-full max-w-[520px] flex-col items-center md:items-start">
            <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm font-medium text-[#08090a]">
              Contact
            </div>
            <h2 className="mt-3 max-w-[520px] font-[var(--font-heading)] text-[26px] font-bold leading-[1.06] tracking-normal sm:mt-4 sm:text-[38px] lg:text-[44px]">
              Tell me about your project
            </h2>
            <p className="mt-3 max-w-[500px] text-sm leading-[1.4] text-white/68 sm:text-base sm:leading-[1.45]">
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
            <p className="mt-3 text-sm text-white/50 sm:mt-4">
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
