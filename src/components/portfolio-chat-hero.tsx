"use client";

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Code2, RotateCcw, Route, ShieldCheck, Sparkles } from "lucide-react";
import { FluidTyping, type FluidTypingHandle } from "@/components/reactdrops/fluid-typing";
import { setScrollPosition } from "@/hooks/useLenis";
import styles from "@/app/experiments/portfolio-chat/portfolio-chat.module.css";

type Reply = { text: string; title: string; href: string; image: string; tag: string };
type Turn = { question: string; reply?: Reply };

const SUGGESTIONS = [
  { question: "What did you design at Affina?", icon: ShieldCheck, tone: "peach" },
  { question: "How do you approach UX?", icon: Route, tone: "blue" },
  { question: "Show me your AI work", icon: Sparkles, tone: "lilac" },
  { question: "How do you work with developers?", icon: Code2, tone: "mint" },
];

function responseFor(question: string): Reply {
  const query = question.toLowerCase();

  if (/zoan|\bai\b|motion|animation/.test(query)) {
    return {
      text: "At Zoan AI, I designed clearer workflows for a complex AI product across web and mobile. The case study shows how I organized the flows and built a consistent interface system.",
      title: "Zoan AI — Designing Clearer AI Workflows",
      href: "/blog/zoan",
      image: "/assets/project-thumbnails/zoan.png",
      tag: "AI product · UI system",
    };
  }

  if (/affina|insurance|coverage|survey/.test(query)) {
    return {
      text: "At Affina, I designed a guided insurance journey from the first survey question through plan comparison. I also worked on a reusable UI system across web and mobile.",
      title: "Affina — Simplifying Insurance with AI",
      href: "/blog/affina",
      image: "/assets/project-thumbnails/affina-pink-meadow-en.webp",
      tag: "Insurance journey · Product design",
    };
  }

  if (/developer|handoff|collaborat|team/.test(query)) {
    return {
      text: "I work with developers early to clarify flows, edge cases, and reusable UI states. In MedHunt, I mapped a complex recruitment workflow into an interactive system that supported design and developer handoff.",
      title: "MedHunt — Healthcare Recruitment OS",
      href: "/blog/medhunt",
      image: "/assets/project-thumbnails/medhunt-monitor.png",
      tag: "Collaboration · Developer handoff",
    };
  }

  return {
    text: "I start by understanding what people need to accomplish, map the journey, and test a concrete flow before polishing the interface. Affina is a good example of that process in a complex product.",
    title: "Affina — See the design process",
    href: "/blog/affina",
    image: "/assets/project-thumbnails/affina-pink-meadow-en.webp",
    tag: "UX process · Case study",
  };
}

export function PortfolioChatHero({ preview = false }: { preview?: boolean }) {
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [session, setSession] = useState(0);
  const fluidRef = useRef<FluidTypingHandle>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIntroReady(true), 1550);
    return () => clearTimeout(timer);
  }, [session]);

  useEffect(() => {
    const stage = surfaceRef.current?.querySelector<HTMLElement>(".fluid-typing-stage");
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    let pulse = 0;
    const sync = () => {
      if (stage.dataset.fluidTypingState !== "done" || interval) return;
      interval = setInterval(() => {
        if (!document.hidden) {
          fluidRef.current?.rippleAt(pulse++ % 2 ? 0.56 : 0.44, 0.34, 0.55, 1.65);
        }
      }, 4600);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(stage, { attributes: true, attributeFilter: ["data-fluid-typing-state"] });
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [session]);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  const sendQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question || isAnswering) return;

    const surface = surfaceRef.current?.getBoundingClientRect();
    const button = sendRef.current?.getBoundingClientRect();
    if (surface && button) {
      fluidRef.current?.rippleAt(
        (button.left + button.width / 2 - surface.left) / surface.width,
        (button.top + button.height / 2 - surface.top) / surface.height,
        1.5,
        2.2,
      );
    }

    setTurns((current) => [...current, { question }]);
    setDraft("");
    setIsAnswering(true);
    replyTimer.current = setTimeout(() => {
      setTurns((current) => current.map((turn, index) =>
        index === current.length - 1 ? { ...turn, reply: responseFor(turn.question) } : turn
      ));
      setIsAnswering(false);
      replyTimer.current = null;
    }, 1050);
  };

  const reset = () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = null;
    setTurns([]);
    setDraft("");
    setIsAnswering(false);
    setIntroReady(false);
    setSession((current) => current + 1);
  };

  const hasConversation = turns.length > 0;

  useLayoutEffect(() => {
    if (hasConversation) setScrollPosition(0);
  }, [hasConversation]);

  return (
    <section id="hero" className={styles.hero}>
      {preview && <div className={styles.topbar}>
        <Link href="/classic" className={styles.brand}>THUY NGUYEN</Link>
        <div className={styles.topActions}>
          <span className={styles.previewLabel}>Interaction preview</span>
          {hasConversation && (
            <button className={styles.reset} type="button" onClick={reset}>
              <RotateCcw size={15} aria-hidden="true" /> Start over
            </button>
          )}
        </div>
      </div>}

      <div ref={surfaceRef} className={styles.surface}>
        <FluidTyping
          key={session}
          ref={fluidRef}
          text="Hi, I’m Thuy."
          loop={false}
          introWave={false}
          introPause={0}
          typeSpeed={82}
          palette="auto"
          theme="light"
          backgroundColor="#e6f6ff"
          blueColor="#c1e7ff"
          lavenderColor="#3BA0FF"
          highlightColor="#ffffff"
          speed={0.18}
          maxFps={40}
          maxPixels={720000}
          borderRadius={0}
          className={`${styles.fluid} ${hasConversation ? styles.chatMode : ""}`}
        >
          {!hasConversation ? (
            <div className={`${styles.intro} ${introReady ? styles.introReady : ""}`}>
              <h1 className="sr-only">Hi, I’m Thuy</h1>
              <p className={styles.introCopy}>A designer who turns complex journeys<br />into clear experiences.</p>
              <form className={styles.composer} onSubmit={sendQuestion}>
                <div className={styles.inputBubble}>
                  <input
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    aria-label="Ask about Thuy’s work"
                    placeholder="Curious about my work? Ask me here."
                    maxLength={180}
                  />
                  <button
                    ref={sendRef}
                    className={styles.sendButton}
                    aria-label="Send question"
                    type="submit"
                    disabled={!draft.trim()}
                  >
                    <ArrowUp size={19} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </form>
              <div className={styles.suggestions} aria-label="Suggested questions">
                {SUGGESTIONS.map(({ question, icon: Icon, tone }) => (
                  <button
                    key={question}
                    className={styles.suggestion}
                    data-tone={tone}
                    type="button"
                    onClick={() => { setDraft(question); inputRef.current?.focus(); }}
                  >
                    <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.chat}>
              <p className={styles.chatGuide}>Ask about my projects, process, or experience.</p>
              <div className={styles.messages} data-lenis-prevent tabIndex={0} role="log" aria-label="Conversation" aria-live="polite">
                {turns.map((turn, index) => (
                  <div className={styles.turn} key={`${index}-${turn.question}`}>
                    <div className={styles.questionBubble}>
                      <p>{turn.question}</p>
                    </div>
                    {turn.reply ? (
                      <div className={styles.answerBubble}>
                        <div className={styles.answerInner}>
                          <p className={styles.answerText}>{turn.reply.text}</p>
                          <Link href={turn.reply.href} className={styles.projectLink}>
                            <span className={styles.projectImage}><Image src={turn.reply.image} alt="" fill sizes="64px" /></span>
                            <span className={styles.projectMeta}>
                              <span className={styles.projectTag}>{turn.reply.tag}</span>
                              <strong>{turn.reply.title}</strong>
                            </span>
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.loadingBubble}>
                        <span className={styles.loadingDots} aria-label="Preparing a sample answer"><i /><i /><i /></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form className={`${styles.composer} ${styles.chatComposer}`} onSubmit={sendQuestion}>
                <div className={styles.inputBubble}>
                  <input
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    aria-label="Ask a follow-up question"
                    placeholder="Ask a follow-up…"
                    maxLength={180}
                    disabled={isAnswering}
                  />
                  <button
                    ref={sendRef}
                    className={styles.sendButton}
                    aria-label="Send question"
                    type="submit"
                    disabled={!draft.trim() || isAnswering}
                  >
                    <ArrowUp size={19} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </FluidTyping>
      </div>
    </section>
  );
}
