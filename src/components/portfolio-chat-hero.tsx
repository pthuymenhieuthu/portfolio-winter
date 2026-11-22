"use client";

import { ChatFreelancePricing } from "@/components/chat-freelance-pricing";
import { FormEvent, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { createEntranceWash } from "@/components/portfolio-entrance";
import { PortfolioBubbleScrollbar } from "@/components/portfolio-bubble-scrollbar";
import { ArrowDown, ArrowUp, ArrowUpRight, Code2, RotateCcw, Route, ShieldCheck, Sparkles } from "lucide-react";
import { FluidTyping, type FluidTypingHandle } from "@/components/reactdrops/fluid-typing";
import { fallbackFor, type PortfolioReply } from "@/lib/portfolio-chat-fallback";
import { portfolioAnswerParagraphs } from "@/lib/portfolio-answer-format";
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
const INTRO_PHRASES = [
  "Hi, I’m Thuy.",
  "A Product Designer & Maker.",
  "I simplify complex UX.",
  "I build design systems.",
  "I bring UI to life.",
];

export function PortfolioChatHero({ preview = false }: { preview?: boolean }) {
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [entranceReady, setEntranceReady] = useState(false);
  const [session, setSession] = useState(0);
  const [restored, setRestored] = useState(false);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const fluidRef = useRef<FluidTypingHandle>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const entranceVeilRef = useRef<HTMLCanvasElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const conversationId = useId();
  const composerBounds = useRef<DOMRect | null>(null);
  const titleBounds = useRef<DOMRect | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { turns?: Turn[]; draft?: string };
        if (Array.isArray(parsed.turns)) {
          setTurns(parsed.turns.filter((turn) => typeof turn.question === "string" && turn.reply).slice(-12).map((turn) => {
            const preparedReply = fallbackFor(turn.question);
            return turn.error || preparedReply.showPricing ? { ...turn, reply: preparedReply } : turn;
          }));
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

  useLayoutEffect(() => {
    const veil = entranceVeilRef.current;
    if (!veil) return;
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduce) {
        gsap.set(veil, { opacity: 0 });
        setEntranceReady(true);
        return;
      }
      const wash = createEntranceWash(veil);
      if (!wash) {
        gsap.set(veil, { opacity: 0 });
        setEntranceReady(true);
        return;
      }
      gsap.set(veil, { opacity: 1, backgroundColor: "transparent" });
      const flow = { progress: 0 };
      let firstWave = false, secondWave = false;
      gsap.to(flow, {
        progress: 1,
        duration: 1.8,
        ease: "sine.inOut",
        onUpdate: () => {
          wash.draw(flow.progress);
          if (!firstWave && flow.progress > 0.24) {
            fluidRef.current?.rippleAt(0.32, 0.12, 0.45, 2.3);
            firstWave = true;
          }
          if (!secondWave && flow.progress > 0.55) {
            fluidRef.current?.rippleAt(0.69, 0.34, 0.35, 2.1);
            secondWave = true;
          }
        },
        onComplete: () => {
          wash.dispose();
          gsap.set(veil, { opacity: 0 });
          setEntranceReady(true);
        },
      });
      return () => wash.dispose();
    });
    return () => media.revert();
  }, [session]);

  useEffect(() => {
    if (!entranceReady) return;
    const stage = surfaceRef.current?.querySelector<HTMLElement>(".fluid-typing-stage");
    if (!stage) return;
    const sync = () => {
      if (["holding", "done"].includes(stage.dataset.fluidTypingState ?? "")) setIntroReady(true);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(stage, { attributes: true, attributeFilter: ["data-fluid-typing-state"] });
    return () => observer.disconnect();
  }, [entranceReady, session]);

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
    composerBounds.current = surfaceRef.current?.querySelector<HTMLFormElement>("form")?.getBoundingClientRect() ?? null;
    titleBounds.current = surfaceRef.current?.querySelector<HTMLElement>(".fluid-typing-copy")?.getBoundingClientRect() ?? null;
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
    setEntranceReady(false);
    setSession((current) => current + 1);
  };

  const hasConversation = turns.length > 0;
  useLayoutEffect(() => {
    if (!hasConversation) return;
    const root = surfaceRef.current;
    const composer = root?.querySelector<HTMLFormElement>("form");
    if (!root || !composer) return;
    const syncArrow = () => {
      let top = composer.offsetHeight / 2;
      let element: HTMLElement | null = composer;
      while (element && element !== root) {
        top += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      root.style.setProperty("--composer-center", `${top}px`);
    };
    syncArrow();
    const observer = new ResizeObserver(syncArrow);
    observer.observe(root);
    observer.observe(composer);
    return () => observer.disconnect();
  }, [hasConversation, session]);


  useLayoutEffect(() => {
    if (hasConversation) setScrollPosition(0);
  }, [hasConversation]);

  useLayoutEffect(() => {
    const root = surfaceRef.current;
    if (!root || !hasConversation) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const title = root.querySelector<HTMLElement>(".fluid-typing-copy");
      const previousTitle = titleBounds.current;
      if (title && previousTitle) {
        const nextTitle = title.getBoundingClientRect();
        gsap.fromTo(title, {
          y: previousTitle.top + previousTitle.height / 2 - nextTitle.top - nextTitle.height / 2,
          scale: nextTitle.width ? previousTitle.width / nextTitle.width : 1,
          transformOrigin: "center center",
        }, { y: 0, scale: 1, duration: 0.48, ease: "power3.out", clearProps: "transform,transformOrigin" });
      }
      const composer = root.querySelector<HTMLFormElement>("form");
      const before = composerBounds.current;
      if (composer && before) {
        const after = composer.getBoundingClientRect();
        gsap.fromTo(composer, { x: before.left - after.left, y: before.top - after.top },
          { x: 0, y: 0, duration: 0.48, ease: "power3.out", clearProps: "transform" });
      }
    });
    composerBounds.current = null;
    titleBounds.current = null;
    return () => media.revert();
  }, [hasConversation]);

  useLayoutEffect(() => {
    const messages = messagesRef.current;
    const latest = messages?.lastElementChild;
    if (!messages || !latest) return;
    const media = gsap.matchMedia();
    const bubbles = Array.from(latest.children).filter((bubble) => !bubble.hasAttribute("data-revealed"));
    bubbles.forEach((bubble) => bubble.setAttribute("data-revealed", "true"));
    const target = latest.lastElementChild?.getBoundingClientRect();
    const viewport = messages.getBoundingClientRect();
    // Keep the beginning of a long answer visible rather than jumping to its end.
    const scrollTop = target ? Math.min(messages.scrollHeight - messages.clientHeight,
      messages.scrollTop + target.top - viewport.top - 12) : 0;
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduce) {
        messages.scrollTop = scrollTop;
        return;
      }
      gsap.fromTo(bubbles, { opacity: 0, y: 12, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.34, stagger: 0.07, ease: "power2.out", clearProps: "opacity,transform" });
    });
    const scrollTween = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null
      : gsap.to(messages, { scrollTop, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    return () => { scrollTween?.kill(); media.revert(); };
  }, [turns]);

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

      <div ref={surfaceRef} className={`${styles.surface} ${!entranceReady ? styles.opening : ""}`}>
        <canvas ref={entranceVeilRef} className={styles.entranceVeil} aria-hidden="true" />
        <FluidTyping
          key={session}
          ref={fluidRef}
          text="Hi, I’m Thuy."
          phrases={INTRO_PHRASES}
          loop
          deleteSpeed={28}
          holdDuration={2400}
          introWave={false}
          introPause={0}
          typingPaused={!entranceReady}
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
              <div className={styles.conversationViewport}>
              <div id={conversationId} ref={messagesRef} className={styles.messages} data-lenis-prevent tabIndex={0} role="log" aria-label="Conversation" aria-live="polite">
                {turns.map((turn, index) => (
                  <div className={styles.turn} key={`${index}-${turn.question}`}>
                    <div className={styles.questionBubble}>
                      <p>{turn.question}</p>
                    </div>
                    {turn.reply ? (
                      <div className={styles.answerBubble}>
                        <div className={styles.answerInner}>
                          <div className={styles.answerCopy}>{portfolioAnswerParagraphs(turn.reply.text).map((paragraph, paragraphIndex) => <p key={paragraphIndex} className={styles.answerText}>{paragraph.split(/(\*\*[^*\n]+\*\*)/g).map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part)}</p>)}</div>
                            {turn.reply.showPricing && <ChatFreelancePricing vietnamese={/[à-ỹđ]/i.test(turn.reply.text)} />}
                            {turn.reply.href && !turn.reply.image && turn.reply.title && <Link href={turn.reply.href} className={styles.serviceLink}>{turn.reply.title}<ArrowUpRight size={17} aria-hidden="true" /></Link>}
                          {(turn.reply.projects ?? (turn.reply.href && turn.reply.image && turn.reply.title ? [{ href: turn.reply.href, image: turn.reply.image, title: turn.reply.title, tag: turn.reply.tag }] : [])).map((project) => <Link key={project.href} href={project.href} className={styles.projectLink}>
                            <span className={styles.projectImage}><Image src={project.image} alt="" fill sizes="64px" /></span>
                            <span className={styles.projectMeta}>
                              {project.tag && <span className={styles.projectTag}>{project.tag}</span>}
                              <strong>{project.title}</strong>
                            </span>
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </Link>)}
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
              <PortfolioBubbleScrollbar scrollRef={messagesRef} controls={conversationId} />
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
          className={`${styles.exploreProjects} ${hasConversation ? styles.chatExploreProjects : ""}`}
          aria-label="Explore projects"
          onClick={() => document.getElementById("projects")?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start",
          })}
        >
          <ArrowDown size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
