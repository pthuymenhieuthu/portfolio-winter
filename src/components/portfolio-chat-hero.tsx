"use client";

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, Code2, RotateCcw, Route, ShieldCheck, Sparkles } from "lucide-react";
import { FluidTyping, type FluidTypingHandle } from "@/components/reactdrops/fluid-typing";
import { fallbackFor, type PortfolioReply } from "@/lib/portfolio-chat-fallback";
import { setScrollPosition } from "@/hooks/useLenis";
import styles from "@/app/experiments/portfolio-chat/portfolio-chat.module.css";

type Reply = PortfolioReply;
type Turn = { question: string; reply?: Reply; error?: boolean };

const SUGGESTIONS = [
  { question: "What did you design at Affina?", icon: ShieldCheck, tone: "peach" },
  { question: "How do you approach UX?", icon: Route, tone: "blue" },
  { question: "Show me your AI work", icon: Sparkles, tone: "lilac" },
  { question: "How do you work with developers?", icon: Code2, tone: "mint" },
];

const CHAT_STORAGE_KEY = "thuy-portfolio-chat-v1";

export function PortfolioChatHero({ preview = false }: { preview?: boolean }) {
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [session, setSession] = useState(0);
  const [restored, setRestored] = useState(false);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const fluidRef = useRef<FluidTypingHandle>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { turns?: Turn[]; draft?: string };
        if (Array.isArray(parsed.turns)) {
          setTurns(parsed.turns.filter((turn) => typeof turn.question === "string" && turn.reply).slice(-12));
        }
        if (typeof parsed.draft === "string") setDraft(parsed.draft.slice(0, 180));
      }
    } catch { /* A stale session should not break the hero. */ }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try { sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify({ turns: turns.slice(-12), draft })); }
    catch { /* Private browsing can block session storage. */ }
  }, [turns, draft, restored]);

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
    requestRef.current?.abort();
  }, []);

  const sendQuestion = async (event: FormEvent<HTMLFormElement>) => {
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

    const history = turns.filter((turn) => turn.reply && !turn.error).slice(-4)
      .map((turn) => ({ question: turn.question, answer: turn.reply!.text }));
    const controller = new AbortController();
    requestRef.current = controller;
    setTurns((current) => [...current, { question }]);
    setDraft("");
    setIsAnswering(true);

    try {
      if (aiUnavailable) throw new Error("unavailable");
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
        signal: controller.signal,
      });
      const result = await response.json() as { reply?: Reply; upstreamCode?: string };
      if (!response.ok || !result.reply || typeof result.reply.text !== "string") {
        if (response.status === 503 || result.upstreamCode === "credit_balance_exhausted") setAiUnavailable(true);
        throw new Error(response.status === 503 ? "unconfigured" : response.status === 429 ? "limited" : "unavailable");
      }
      setTurns((current) => current.map((turn, index) =>
        index === current.length - 1 ? { ...turn, reply: result.reply } : turn
      ));
    } catch (error) {
      if (controller.signal.aborted) return;
      setTurns((current) => current.map((turn, index) =>
        index === current.length - 1 ? { ...turn, reply: fallbackFor(question), error: true } : turn
      ));
    } finally {
      if (!controller.signal.aborted) {
        requestRef.current = null;
        setIsAnswering(false);
      }
    }
  };

  const reset = () => {
    requestRef.current?.abort();
    requestRef.current = null;
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
                          {turn.error && <p className={styles.fallbackNote}>Portfolio summary · AI temporarily unavailable</p>}
                          {turn.reply.href && turn.reply.image && turn.reply.title && <Link href={turn.reply.href} className={styles.projectLink}>
                            <span className={styles.projectImage}><Image src={turn.reply.image} alt="" fill sizes="64px" /></span>
                            <span className={styles.projectMeta}>
                              {turn.reply.tag && <span className={styles.projectTag}>{turn.reply.tag}</span>}
                              <strong>{turn.reply.title}</strong>
                            </span>
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </Link>}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.loadingBubble}>
                        <span className={styles.loadingDots} aria-label="Thinking about your question"><i /><i /><i /></span>
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
        <button
          type="button"
          className={styles.exploreProjects}
          onClick={() => document.getElementById("projects")?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start",
          })}
        >
          Explore projects <ArrowDown size={17} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
