import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const FILM_URL = "https://www.linkedin.com/posts/dpox_dataprivacy-privacycompliance-gdpr-activity-7469667755596791808-z_n0";
const PROCESS_IMAGE = "/experiments/dpox-generation-process.png";

export const metadata: Metadata = {
  title: "DpoX — From first frame to finished film",
  description: "How I generated first frames, turned them into Kling 3.0 video clips in Higgsfield, and collaborated with a motion designer on a DpoX promotional film.",
};

const steps = [
  {
    title: "Generate the first frame",
    body: "I started by generating a first frame. Before there was any moving footage, this image gave each shot a visual starting point and became the reference for video generation.",
  },
  {
    title: "Bring the frame into Higgsfield",
    body: "I used Kling 3.0 in Higgsfield to turn the starting frame into a short video clip. I built the footage in separate segments, rather than generating the entire film in one go. Clip length depended on the shot; the result in the screenshot is eight seconds long.",
  },
  {
    title: "Combine the generated clips",
    body: "I combined multiple generated segments into a sequence. This was the video material I prepared for the next stage of the collaboration.",
  },
  {
    title: "Hand over for post-production",
    body: "I handed the generated video to a motion designer, who handled post-production. My contribution was creating and assembling the AI footage; the finished film brought that work together with the motion designer’s finishing work.",
  },
];

export default function DpoxExperimentPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1040px] px-5 pb-36 pt-10 text-[#29303B] sm:px-8 sm:pt-14">
      <Link
        href="/?collection=experiments#projects"
        className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-[#697686] transition-colors hover:text-[#007AC9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0096F7]"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        AI Experiments
      </Link>

      <header className="mt-10 sm:mt-14">
        <p className="text-sm text-[#697686]">DpoX · Collaborative brand film</p>
        <h1 className="mt-4 max-w-[800px] text-balance font-[var(--font-heading)] text-[38px] font-medium leading-[1.08] tracking-[-1.5px] sm:text-[56px] sm:tracking-[-2px]">
          From first frame to finished film
        </h1>
        <p className="mt-5 max-w-[680px] text-base leading-relaxed text-[#697686] sm:text-lg">
          A look at how I generated the footage for a DpoX promotional film,
          then collaborated with a motion designer to bring it into the final edit.
        </p>
        <a
          href={FILM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm text-[#007AC9] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0096F7]"
        >
          Watch the published film on LinkedIn
          <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <dl className="mt-8 grid gap-6 border-y border-[#29303B]/10 py-6 text-sm sm:grid-cols-3">
          <div><dt className="text-[#697686]">My role</dt><dd className="mt-2 leading-relaxed">First frames, AI video generation & clip assembly</dd></div>
          <div><dt className="text-[#697686]">Video generation</dt><dd className="mt-2 leading-relaxed">Higgsfield · Kling 3.0</dd></div>
          <div><dt className="text-[#697686]">Collaboration</dt><dd className="mt-2 leading-relaxed">A motion designer · Post-production</dd></div>
        </dl>
      </header>

      <figure className="mt-9 sm:mt-12">
        <a
          href={PROCESS_IMAGE}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the full-size Higgsfield process screenshot in a new tab"
          className="block overflow-hidden rounded-2xl bg-[#101112] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0096F7]"
        >
          <Image
            src={PROCESS_IMAGE}
            alt="Higgsfield generation workspace showing an office scene, a starting-frame reference, and a Kling 3.0 result labelled 1080p, eight seconds and 16:9."
            width={1910}
            height={868}
            priority
            sizes="(max-width: 1040px) calc(100vw - 40px), 976px"
            className="h-auto w-full"
          />
        </a>
        <figcaption className="mt-3 text-sm leading-relaxed text-[#697686]">
          A snapshot of my generation workflow. The selected result on the right is labelled Kling 3.0.
          Click the image to inspect it at full size.
        </figcaption>
      </figure>

      <article className="mx-auto mt-14 max-w-[680px] space-y-12 sm:mt-20 sm:space-y-14">
        <section aria-labelledby="dpox-context">
          <h2 id="dpox-context" className="font-[var(--font-heading)] text-2xl font-medium tracking-[-0.5px] sm:text-[28px]">The project</h2>
          <p className="mt-4 text-base leading-[1.8] text-[#596577]">
            The film introduces DpoX, a workspace for managing privacy operations. It moves from the friction of scattered spreadsheets, emails and manual coordination to a more connected way for teams to work.
          </p>
          <p className="mt-4 text-base leading-[1.8] text-[#596577]">
            My part was generating the source footage and combining clips before the post-production handoff. Here is how those stages connected.
          </p>
        </section>

        <section aria-labelledby="dpox-workflow">
          <h2 id="dpox-workflow" className="font-[var(--font-heading)] text-2xl font-medium tracking-[-0.5px] sm:text-[28px]">The generation workflow</h2>
          <ol className="mt-8 space-y-9">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[24px_minmax(0,1fr)] gap-4 sm:gap-5">
                <span aria-hidden="true" className="pt-1 text-sm tabular-nums text-[#697686]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-[var(--font-heading)] text-xl font-medium leading-snug tracking-[-0.3px]">{step.title}</h3>
                  <p className="mt-3 text-base leading-[1.8] text-[#596577]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="dpox-prompt">
          <h2 id="dpox-prompt" className="font-[var(--font-heading)] text-2xl font-medium tracking-[-0.5px] sm:text-[28px]">A closer look at the prompt</h2>
          <p className="mt-4 text-base leading-[1.8] text-[#596577]">
            The visible prompt uses the starting frame as the opening shot and asks to keep the character, outfit and office atmosphere consistent. It also describes the character’s movement within the shot.
          </p>
          <blockquote className="mt-6 border-l-2 border-[#0096F7]/40 pl-5 text-lg leading-relaxed text-[#29303B]">
            “Keep the same man, outfit, and office atmosphere consistent.”
          </blockquote>
          <p className="mt-2 pl-5 text-xs text-[#697686]">Excerpt from the prompt visible in the process screenshot.</p>
        </section>

        <section aria-labelledby="dpox-credits" className="border-t border-[#29303B]/10 pt-8">
          <h2 id="dpox-credits" className="font-[var(--font-heading)] text-2xl font-medium tracking-[-0.5px] sm:text-[28px]">A collaborative result</h2>
          <p className="mt-4 text-base leading-[1.8] text-[#596577]">
            This film was made in collaboration with a motion designer. I created the generated first frames and video segments, combined the footage, and handed it over. The motion designer handled post-production.
          </p>
          <p className="mt-4 text-base leading-[1.8] text-[#596577]">
            The finished film is available in DpoX’s published LinkedIn post.
          </p>
          <a href={FILM_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm text-[#007AC9] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0096F7]">
            Watch the final film<ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </article>
    </main>
  );
}
