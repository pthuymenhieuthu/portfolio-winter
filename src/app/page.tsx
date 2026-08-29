import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { BringOnBoard } from "@/components/bring-on-board";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import GoogleTracking from "@/components/google-tracking";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <div className="bg-background">
      <GoogleTracking />
      <main className="flex min-h-[100dvh] flex-col">
        <section
          id="hero"
          className="relative isolate flex min-h-[820px] w-full items-center justify-center overflow-visible px-6 md:min-h-[940px] lg:min-h-[1000px]"
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

          <div className="mx-auto flex w-full max-w-[560px] -translate-y-10 flex-col items-center text-center sm:-translate-y-14 lg:-translate-y-16">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="font-[var(--font-heading)] text-[48px] font-bold leading-[0.95] tracking-normal text-[hsl(var(--ink))] sm:text-[64px]"
              yOffset={8}
              text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
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

        <section id="projects" className="relative z-10 pt-44 sm:pt-52 lg:pt-60">
          <div className="w-full space-y-20 pb-20">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.08] tracking-normal sm:text-[44px] lg:text-[52px]">
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
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

        <section id="contact" className="pb-80 pt-20">
          <div className="grid w-full items-center justify-center gap-4 px-4 text-center md:px-6">
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact
                </div>
                <h2 className="font-[var(--font-heading)] text-[32px] font-bold leading-[1.08] tracking-normal sm:text-[44px] lg:text-[52px]">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Excited to collaborate! Email me at{" "}
                  <Link
                    href={DATA.contact.social.email.url}
                    className="text-blue-500 hover:underline"
                  >
                    phuongthuy101222@gmail.com
                  </Link>{" "}
                  or DM me on{" "}
                  <Link
                    href={DATA.contact.social.Threads.url}
                    className="text-blue-500 hover:underline"
                  >
                    Threads
                  </Link>{" "}
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
    </div>
  );
}
