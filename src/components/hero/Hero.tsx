"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { IconTile } from "@/components/ui/IconTile";

/* ─── Real portfolio capabilities (derived from src/content/skills + projects) ── */
const CAPABILITIES = [
  {
    label: "AI / ML Engineering",
    chips: ["TensorFlow", "PyTorch", "scikit-learn"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: "Computer Vision · OCR",
    chips: ["OpenCV", "EasyOCR", "Detection"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: "Deep Learning",
    chips: ["LSTM", "CNN", "Keras"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="6" y="18" width="12" height="4" rx="1" />
        <path d="M8 7v3m8-3v3M10 15v3m4-3v3" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "LLM & NLP Systems",
    chips: ["Claude API", "Intent Classification"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Python · FastAPI · Data",
    chips: ["FastAPI", "PostgreSQL", "Docker"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "React · Next.js · TypeScript",
    chips: ["Next.js", "React", "WebGL"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3 4 7l4 4" />
        <path d="M4 7h16" />
        <path d="M16 21l4-4-4-4" />
        <path d="M20 17H4" />
      </svg>
    ),
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

function scrollToId(id: string, lenis?: ReturnType<typeof useLenis>) {
  if (lenis) {
    lenis.scrollTo(id, {
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 md:pt-32"
    >
      {/* Eyebrow */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="flex items-center gap-4"
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[rgba(186,215,247,0.16)] md:w-16" />
        <span className="eyebrow">AI / ML Engineer</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[rgba(186,215,247,0.16)] md:w-16" />
      </motion.div>

      {/* Identity wordmark */}
      <motion.h1
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.08, ease: easeOut }}
        className="text-skywash font-heading mt-6 text-center font-medium leading-[0.98] tracking-[-0.02em]"
        style={{ fontSize: "clamp(2.8rem, 9vw, 5.5rem)" }}
      >
        Harshil Thakkar
      </motion.h1>

      {/* Positioning statement */}
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
        className="mt-7 max-w-xl text-center font-sans text-base leading-7 text-frost-glow/90 md:text-lg"
      >
        I build machine learning systems that ship to production — from
        perception engines to generative AI.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.32, ease: easeOut }}
        className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("#projects", lenis);
          }}
          className="btn btn-primary cursor-target w-full sm:w-auto"
          data-cursor-label="Explore"
        >
          View Projects →
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label="Download Resume PDF"
          className="btn btn-outline cursor-target w-full sm:w-auto"
        >
          Resume ↗
        </a>
      </motion.div>

      {/* Floating glass capability cards */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: easeOut }}
        className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
      >
        {CAPABILITIES.map((cap, i) => (
          <div
            key={cap.label}
            className="glass-card hairline group flex flex-col gap-3 p-4 transition-transform duration-300 hover:-translate-y-1"
            style={{
              /* CSS keyframe float (cardDrift) replaces the per-frame Framer
               * Motion loop: same 0 → -6px motion, ease-in-out, stagger kept.
               * `alternate` makes a full cycle 2x the keyframe duration, so it
               * is halved to match the original [0,-6,0] timing (6/7.5/9s).
               * Reduced-motion is neutralized by the global rule in globals.css. */
              animation: `cardDrift ${(6 + (i % 3) * 1.5) / 2}s ${
                i * 0.35
              }s ease-in-out infinite alternate`,
            }}
          >
            <div className="flex items-center gap-3">
              <IconTile size={40}>{cap.icon}</IconTile>
              <span className="font-sans text-sm font-medium leading-tight text-ice-highlight">
                {cap.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cap.chips.map((chip) => (
                <span
                  key={chip}
                  className="chip !px-2 !py-0.5 !text-[9px]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="mt-14 flex flex-col items-center gap-2"
      >
        {/* Fixed-height box: the line's height pulse (12↔20px) is contained
            inside it, so it can never re-center the hero or move the label. */}
        <div className="h-5 w-px">
          <div
            className="scroll-hint-line w-full"
            style={{ background: "rgba(186,215,247,0.4)" }}
          />
        </div>
        <span className="eyebrow !text-[9px] !tracking-[0.4em] text-fog-veil/70">
          scroll
        </span>
      </motion.div>
    </section>
  );
}