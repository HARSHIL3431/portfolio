"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useMotionValueEvent, useTransform } from "framer-motion";
import { useCinematicScroll } from "@/providers/ScrollProvider";
import { Container } from "@/components/layout/Container";
import { MOTION } from "./cinematicMotion";

/**
 * Seeded Linear Congruential Generator — produces the same sequence
 * on every call with the same seed, making it safe for SSR + hydration.
 */
function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function next(): number {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0x100000000;
  };
}

const TOTAL_FRAMES = 76;
const SCROLL_MULTIPLIER = 600;

function getFramePath(index: number): string {
  const padded = index.toString().padStart(2, "0");
  return `/sequence/frame_${padded}.066s.png`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function useFramePreloader() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);
    let completed = 0;

    const markComplete = () => {
      completed += 1;
      if (completed === TOTAL_FRAMES) {
        setIsReady(true);
      }
    };

    for (let index = 0; index < TOTAL_FRAMES; index += 1) {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[index] = img;
        markComplete();
      };
      img.onerror = markComplete;
      img.src = getFramePath(index);
    }
  }, []);

  return { imagesRef, isReady };
}

function useCanvasRenderer(imagesRef: React.MutableRefObject<HTMLImageElement[]>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d", { alpha: false });
    if (context) {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = context;
    }
  };

  const drawFrame = (frameIndex: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];

    if (!ctx || !canvas || !img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  return { canvasRef, setupCanvas, drawFrame };
}

/* ─── Hero Phases ─────────────────────────────────────────
 * Narrative arc: identity reveal → positioning → philosophy → work teaser
 */
const PHASES = [
  {
    threshold: 0,
    headline: null,
    mono: "INITIALIZING_",
    subtitle: "AI / ML Engineer",
  },
  {
    threshold: 0.10,
    headline: "Harshil Thakkar",
    mono: "AI / ML ENGINEER",
    subtitle: "I build machine learning systems that ship to production — from perception engines to generative AI.",
  },
  {
    threshold: 0.22,
    headline: "Architecting\nIntelligence",
    mono: "DEEP LEARNING × SYSTEMS",
    subtitle: "Where human intuition meets machine precision.",
  },
] as const;

/** Floating atmospheric particles — hydration-safe via seeded PRNG */
function AtmosphericParticles({ count = 16 }: { count?: number }) {
  const particles = useMemo(() => {
    const rand = createSeededRandom(20240601);
    return Array.from({ length: count }, (_, i) => ({
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 1.8 + 0.4,
      speed: rand() * 0.25 + 0.08,
      opacity: rand() * 0.18 + 0.03,
      delay: i * 0.4,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            background: "rgba(0, 212, 240, 0.6)",
            animation: `heroFloat ${10 / p.speed}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function HeroOverlay({
  phaseIndex,
  reduced,
}: {
  phaseIndex: number;
  reduced: boolean;
  progress: number;
}) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];

  const phaseDuration = reduced ? 0.2 : 0.55;
  const phaseExit = reduced ? 0.12 : 0.28;

  return (
    <Container className="max-w-7xl px-6 md:px-12 xl:px-24 h-full flex flex-col justify-end pb-20 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-end">
        {/* Left column — identity */}
        <div className="lg:col-span-7">
          {/*
           * AnimatePresence mode="wait" on the left column:
           * the previous phase's mono/headline exits fully before
           * the new phase's content appears — no two headlines visible.
           */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={phaseIndex}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: phaseDuration, ease: MOTION.scene.ease }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.5em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                /// {phase.mono}
              </p>
              <h1
                className="font-heading leading-[0.9] tracking-tight text-white max-w-4xl whitespace-pre-line"
                style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
              >
                {phase.headline ?? ""}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right column — subtitle */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:pl-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`sub-${phaseIndex}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8, transition: { duration: phaseExit } }}
              transition={{
                duration: phaseDuration,
                delay: reduced ? 0 : 0.08,
                ease: MOTION.card.ease,
              }}
              className="font-sans text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {phase.subtitle}
            </motion.p>
          </AnimatePresence>

          <div
            className="h-px w-full"
            style={{
              background: "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.02), transparent)",
            }}
          />
        </div>
      </div>
    </Container>
  );
}

export function ScrollyCanvas() {
  const { scrollYProgress } = useCinematicScroll();
  const { imagesRef, isReady } = useFramePreloader();
  const { canvasRef, setupCanvas, drawFrame } = useCanvasRenderer(imagesRef);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ─── Portrait fade-out system ────────────────────────
   * 0–0.35   : Full presence (identity reveal)
   * 0.35–0.55: Gradual recession (opacity ↓, blur ↑, scale ↓)
   * 0.55+    : Gone (focus shifts to WORK)
   */
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1.03, 1.06]);
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.40, 0.50],
    [1, 1, 0.15, 0]
  );

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.06, 0.20, 0.30], [0, 1, 1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["1%", "-5%"]);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    targetFrameRef.current = p * (TOTAL_FRAMES - 1);
    setProgress(p);

    const nextPhase = PHASES.reduce((currentIndex, phase, index) => {
      return p >= phase.threshold ? index : currentIndex;
    }, 0);

    setPhaseIndex((currentPhase) =>
      currentPhase === nextPhase ? currentPhase : nextPhase
    );
  });

  useEffect(() => {
    let lastRendered = -1;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const next = lerp(current, target, 0.1);
      currentFrameRef.current = next;

      const frameIndex = Math.round(next);
      if (frameIndex !== lastRendered) {
        drawFrame(frameIndex);
        lastRendered = frameIndex;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [drawFrame]);

  useEffect(() => {
    if (isReady) {
      drawFrame(0);
    }
  }, [drawFrame, isReady]);

  const canvasStyle = shouldReduceMotion
    ? { opacity: 1, scale: 1, y: "0%" }
    : { opacity: canvasOpacity, scale: canvasScale, y: canvasY };

  const overlayStyle = shouldReduceMotion
    ? { opacity: 1, y: "0%" }
    : { opacity: overlayOpacity, y: overlayY };

  return (
    <div className="relative w-full" style={{ height: `${SCROLL_MULTIPLIER}vh` }}>
      {/* Frame canvas — z-portrait (5) */}
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 block h-screen w-screen pointer-events-none"
        style={{
          ...canvasStyle,
          transformOrigin: "center center",
          background: "#050505",
        }}
      />

      {/* Floating particles — z-particles (2) */}
      {!shouldReduceMotion && (
        <div className="fixed inset-0 pointer-events-none z-[2]">
          <AtmosphericParticles />
        </div>
      )}

      {/* Hero text overlay — z-content (10) */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-end">
        <motion.div className="w-full pb-0" style={overlayStyle}>
          <HeroOverlay
            phaseIndex={phaseIndex}
            reduced={shouldReduceMotion}
            progress={progress}
          />
        </motion.div>
      </div>

      {/* Gradient compositing layers — z-atmosphere (1) */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 45%, transparent 32%, rgba(5,5,5,0.75) 100%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-20"
          style={{ background: "linear-gradient(to bottom, #050505 0%, transparent 100%)" }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.5) 40%, #050505 100%)",
          }}
        />
        {/* Subtle bottom rim light */}
        <div
          className="absolute left-1/2 bottom-0 h-56 w-[28rem] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(0,212,240,0.04) 0%, transparent 72%)",
          }}
        />
      </div>

      {/* Scroll hint — elegant breathing line */}
      {progress < 0.03 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-white/15 scroll-hint-line" />
          <span className="font-mono text-[8px] tracking-[0.5em] text-white/20 uppercase">
            scroll
          </span>
        </motion.div>
      )}
    </div>
  );
}