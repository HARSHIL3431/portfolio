"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useCinematicScroll } from "@/providers/ScrollProvider";
import { Container } from "@/components/layout/Container";
import { cinematicEase } from "./cinematicMotion";

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
  { threshold: 0, headline: null, mono: "SYSTEM_INITIALIZED_" },
  { threshold: 0.14, headline: "Architecting Intelligence", mono: "AI / ML ENGINEER" },
  { threshold: 0.38, headline: "Designing Cognitive Systems", mono: "BUILDING HUMAN-CENTERED AI" },
  { threshold: 0.64, headline: "Bridging Design & Engineering", mono: "WHERE VISION MEETS PRECISION" },
  { threshold: 0.86, headline: "Enter the Archive", mono: "EXPLORE THE RESEARCH" },
] as const;

function HeroOverlay({ phaseIndex, reduced }: { phaseIndex: number; reduced: boolean }) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];

  return (
    <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
        <div className="lg:col-span-7">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/20 mb-6">
            /// {phase.mono}
          </p>
          <motion.h1
            key={phaseIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.35 : 0.75, ease: cinematicEase }}
            className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.88] tracking-tight text-white max-w-4xl"
          >
            {phase.headline ?? ""}
          </motion.h1>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-12">
          <p className="text-white/40 font-sans text-lg md:text-xl leading-relaxed max-w-md">
            A continuous cinematic field where frames drift, sections bleed, and the archive
            unfolds as a world instead of a stack of panels.
          </p>
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.04), transparent)",
            }}
          />
          <div className="flex flex-wrap gap-3 font-mono text-[9px] tracking-[0.35em] uppercase text-white/18">
            <span>Parallax depth</span>
            <span>Cinematic scroll</span>
            <span>{reduced ? "Reduced motion" : "Breathing frame drift"}</span>
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

  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);
  const canvasOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["1%", "-6%"]);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

    const nextPhase = PHASES.reduce((currentIndex, phase, index) => {
      return progress >= phase.threshold ? index : currentIndex;
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
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 block h-screen w-screen pointer-events-none"
        style={{
          ...canvasStyle,
          transformOrigin: "center center",
          background: "#050505",
        }}
      />

      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <motion.div className="w-full h-full flex items-center justify-center" style={overlayStyle}>
          <HeroOverlay phaseIndex={phaseIndex} reduced={shouldReduceMotion} />
        </motion.div>
      </div>

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
              "radial-gradient(ellipse at center bottom, rgba(0,229,255,0.05) 0%, transparent 72%)",
          }}
        />
      </div>
    </div>
  );
}