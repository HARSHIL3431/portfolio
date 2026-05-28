"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, useMotionValueEvent, useTransform } from "framer-motion";
import { useCinematicScroll } from "@/providers/ScrollProvider";
import { Container } from "@/components/layout/Container";
import { cinematicEase } from "./cinematicMotion";

/**
 * Seeded Linear Congruential Generator — produces the same sequence
 * on every call with the same seed, making it safe for SSR + hydration.
 */
function createSeededRandom(seed: number) {
  let s = seed >>> 0; // force unsigned 32-bit
  return function next(): number {
    // LCG parameters from Numerical Recipes
    s = Math.imul(1664525, s) + 1013904223;
    // Shift to unsigned and normalise to [0, 1)
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

const PHASES = [
  { threshold: 0, headline: null, mono: "SYSTEM_INITIALIZED_", subtitle: "AI/ML Engineer. I build systems that learn." },
  { threshold: 0.10, headline: "Architecting Intelligence", mono: "AI / ML ENGINEER", subtitle: "Turning complex real-world workflows into intelligent interactive experiences." },
  { threshold: 0.22, headline: "Designing Cognitive Systems", mono: "", subtitle: "Where human intuition meets machine precision." },
  { threshold: 0.35, headline: "Bridging Design & Engineering", mono: "WHERE VISION MEETS PRECISION", subtitle: "Enter the projects. The work speaks." },
  { threshold: 0.45, headline: "Enter the Archive", mono: "EXPLORE THE RESEARCH", subtitle: "" },
] as const;

/** Animated scanning line that appears at the bottom of the hero overlay */
function ScanLine({ progress }: { progress: number }) {
  const opacity = Math.sin(progress * Math.PI * 6) * 0.04 + 0.04;
  const yPercent = (progress * 120) % 100;
  return (
    <div
      className="pointer-events-none absolute inset-x-0 h-px"
      style={{
        top: `${yPercent}%`,
        background: "linear-gradient(to right, transparent, rgba(0,229,255,0.18), transparent)",
        opacity,
      }}
    />
  );
}

/** Floating atmospheric particles in the hero.
 *
 * HYDRATION SAFETY: particle values are derived from a seeded deterministic
 * PRNG (not Math.random()), so the server and client always produce the
 * same sequence — no hydration mismatch.
 */
function AtmosphericParticles({ count = 24 }: { count?: number }) {
  // useMemo keeps the array stable across re-renders while still being
  // computed identically on server and client thanks to the fixed seed.
  const particles = useMemo(() => {
    const rand = createSeededRandom(20240601); // fixed seed — never changes, deterministic
    return Array.from({ length: count }, (_, i) => ({
      x:       rand() * 100,
      y:       rand() * 100,
      size:    rand() * 2 + 0.5,
      speed:   rand() * 0.3 + 0.1,
      opacity: rand() * 0.25 + 0.05,
      delay:   i * 0.3,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-glow"
          style={{
            left:      `${p.x}%`,
            top:       `${p.y}%`,
            width:     `${p.size}px`,
            height:    `${p.size}px`,
            opacity:   p.opacity,
            animation: `heroFloat ${8 / p.speed}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function HeroOverlay({ phaseIndex, reduced, progress }: { phaseIndex: number; reduced: boolean; progress: number }) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];

  return (
    <Container className="max-w-7xl px-6 md:px-12 xl:px-24 h-full flex flex-col justify-end pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
        <div className="lg:col-span-7">
          <motion.p
            key={`mono-${phaseIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/20 mb-6"
          >
            /// {phase.mono}
          </motion.p>
          <motion.h1
            key={phaseIndex}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reduced ? 0.35 : 0.85, ease: cinematicEase }}
            className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.88] tracking-tight text-white max-w-4xl"
          >
            {phase.headline ?? ""}
          </motion.h1>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-12">
          <motion.p
            key={`sub-${phaseIndex}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduced ? 0.35 : 0.75, delay: 0.15, ease: cinematicEase }}
            className="text-white/40 font-sans text-lg md:text-xl leading-relaxed max-w-md"
          >
            {phase.subtitle}
          </motion.p>
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.04), transparent)",
            }}
          />
          {/* Scroll progress indicator */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-cyan-glow/40 transition-none"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-white/15">
              {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
          </div>
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

  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 0.75],
    [1, 1, 0.3, 0]
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.45], [0, 1, 1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["1%", "-6%"]);

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

    setPhaseIndex((currentPhase) => (currentPhase === nextPhase ? currentPhase : nextPhase));
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
      {/* Frame canvas */}
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 block h-screen w-screen pointer-events-none"
        style={{
          ...canvasStyle,
          transformOrigin: "center center",
          background: "#050505",
        }}
      />

      {/* Atmospheric scan lines */}
      {!shouldReduceMotion && (
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <ScanLine progress={progress} />
        </div>
      )}

      {/* Floating particles */}
      {!shouldReduceMotion && (
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <AtmosphericParticles />
        </div>
      )}

      {/* Hero text overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-end">
        <motion.div className="w-full pb-0" style={overlayStyle}>
          <HeroOverlay phaseIndex={phaseIndex} reduced={shouldReduceMotion} progress={progress} />
        </motion.div>
      </div>

      {/* Gradient compositing layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 45%, transparent 32%, rgba(5,5,5,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{ background: "linear-gradient(to bottom, #050505 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-60"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.6) 45%, #050505 100%)" }}
        />
        <div
          className="absolute left-1/2 bottom-0 h-72 w-[32rem] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, rgba(0,229,255,0.06) 0%, transparent 72%)",
          }}
        />
      </div>

      {/* Scroll hint — fades at progress > 0 */}
      {progress < 0.04 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-white/20 scroll-hint-line" />
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase">scroll</span>
        </motion.div>
      )}
    </div>
  );
}