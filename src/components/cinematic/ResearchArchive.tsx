"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/content/projects";
import { SCRUB } from "./cinematicMotion";

function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function next(): number {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0x100000000;
  };
}

/* ─── Animated Metric Counter ──────────────────────────── */
/**
 * Counter only starts animating after `canAnimate` becomes true.
 * This prevents showing mixed/0 values during project transitions.
 */
function MetricCounter({
  value,
  label,
  accentColor,
  canAnimate,
}: {
  value: string;
  label: string;
  accentColor: string;
  canAnimate: boolean;
}) {
  const numericMatch = value.match(/^([\d.]+)/);
  const suffix = value.replace(/^[\d.]+/, "");
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;

  const [displayNum, setDisplayNum] = useState(numericValue);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const DURATION = 1200; // ms

  useEffect(() => {
    if (!canAnimate || !numericMatch) return;

    // Reset to full value immediately when not animating
    setDisplayNum(numericValue);
    startTimeRef.current = null;

    const animate = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayNum(Math.round(numericValue * eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAnimate, value]);

  const shown = canAnimate ? displayNum : numericValue;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <span
          className="font-mono text-4xl md:text-5xl font-light tabular-nums"
          style={{ color: accentColor }}
        >
          {numericMatch ? shown : value}
        </span>
        {suffix && (
          <span
            className="font-mono text-lg md:text-xl"
            style={{ color: accentColor, opacity: 0.7 }}
          >
            {suffix}
          </span>
        )}
      </div>
      <span className="font-mono text-[10px] tracking-widest uppercase text-white/25">
        {label}
      </span>
    </div>
  );
}

/* ─── Per-Project Atmospheric Particles ────────────────── */
function ProjectParticles({
  color,
  count = 8,
}: {
  color: string;
  count?: number;
}) {
  const particles = useMemo(() => {
    const rand = createSeededRandom(42);
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 1.5 + 0.3,
      opacity: rand() * 0.12 + 0.02,
      speed: rand() * 0.2 + 0.05,
      delay: rand() * 5,
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
            background: color,
            animation: `heroFloat ${12 / p.speed}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Single Project Slide ─────────────────────────────── */
/**
 * This component owns the ENTIRE visual state of one project.
 * It is only mounted when it is the active project.
 * AnimatePresence mode="wait" ensures exit completes before
 * the next project mounts.
 */
function ProjectSlide({
  project,
  segmentProgress,
  reduced,
}: {
  project: (typeof projects)[0];
  segmentProgress: number;
  reduced: boolean;
}) {
  // Counter only starts after entrance animation completes
  const [counterActive, setCounterActive] = useState(false);
  const accent = project.accentColor;

  const enterVariants = {
    initial: {
      opacity: 0,
      y: reduced ? 0 : 28,
      filter: reduced ? "blur(0px)" : "blur(8px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: reduced ? 0 : -24,
      filter: reduced ? "blur(0px)" : "blur(6px)",
    },
  };

  const transition = {
    duration: reduced ? 0.15 : 0.55,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  const exitTransition = {
    duration: reduced ? 0.1 : 0.38,
    ease: [0.4, 0, 1, 1] as const,
  };

  return (
    <motion.div
      key={project.id}
      variants={enterVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ...transition }}
      onAnimationComplete={(definition) => {
        // Only activate counter after the entrance animation finishes
        if (definition === "animate") {
          setCounterActive(true);
        }
      }}
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 xl:px-28"
      style={{
        // Override framer-motion exit transition duration separately
        // by using a custom exit prop on variants
      }}
    >
      {/* Override exit transition speed */}
      <motion.div
        className="absolute inset-0"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: exitTransition },
        }}
        style={{
          background: `radial-gradient(ellipse 65% 55% at 25% 50%, ${accent.primary} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Per-project particles */}
      {!reduced && <ProjectParticles color={accent.line} />}

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        {/* Left: Project info */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Status + index */}
          <div className="flex items-center gap-4">
            <div
              className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border"
              style={{
                color: accent.text,
                borderColor: accent.line,
                backgroundColor: accent.primary,
              }}
            >
              {project.status}
            </div>
            <div className="font-mono text-[9px] tracking-widest text-white/15 uppercase">
              {project.id} / {projects.length.toString().padStart(2, "0")}
            </div>
          </div>

          {/* Giant background number watermark */}
          <div className="relative">
            <div
              className="absolute -top-14 -left-4 font-mono select-none pointer-events-none"
              style={{
                fontSize: "clamp(5rem, 16vw, 12rem)",
                opacity: 0.03,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {project.id}
            </div>

            {/* Subtitle */}
            <p
              className="font-mono text-[10px] tracking-widest uppercase mb-3"
              style={{ color: accent.text, opacity: 0.7 }}
            >
              {project.subtitle}
            </p>

            {/* Title */}
            <h3
              className="font-heading leading-[1.05] text-white relative z-10"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              {project.title}
            </h3>
          </div>

          {/* Philosophy */}
          <p className="font-sans text-sm md:text-base text-white/40 leading-relaxed max-w-lg">
            {project.philosophy}
          </p>

          {/* Metric counter — only animates after entrance complete */}
          <MetricCounter
            value={project.metric.value}
            label={project.metric.label}
            accentColor={accent.text}
            canAnimate={counterActive}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-widest uppercase border border-white/8 px-3 py-1 text-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Engineering rationale */}
        <div className="lg:col-span-5">
          <div
            className="border border-white/5 p-6 md:p-8 flex flex-col gap-5"
            style={{
              background: "rgba(5,5,5,0.5)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="font-mono text-[9px] tracking-widest uppercase pb-3 border-b"
              style={{
                color: "rgba(255,255,255,0.18)",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              ENGINEERING_RATIONALE
            </div>

            {[
              { label: "CHALLENGE", value: project.rationale.challenge },
              { label: "APPROACH", value: project.rationale.approach },
              { label: "IMPACT", value: project.rationale.impact, highlight: true },
            ].map(({ label, value, highlight }) => (
              <div key={label}>
                <span
                  className="font-mono text-[9px] tracking-widest block mb-1.5 uppercase"
                  style={{
                    color: highlight ? accent.text : "rgba(255,255,255,0.25)",
                  }}
                >
                  {label}:
                </span>
                <p className="font-mono text-[11px] text-white/35 leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Progress bar — reflects position within current project's scroll segment */}
          <div className="mt-4 flex items-center gap-3">
            <div
              className="h-px flex-1 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="h-full transition-none"
                style={{
                  width: `${segmentProgress * 100}%`,
                  background: accent.line,
                }}
              />
            </div>
            <span
              className="font-mono text-[8px] tracking-widest"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              {String(Math.round(segmentProgress * 100)).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Project Showcase ────────────────────────────── */
export default function ResearchArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const PER_PROJECT_SCROLL = 1.8;
  const TOTAL_HEIGHT_VH = 100 + projects.length * PER_PROJECT_SCROLL * 100;

  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const trigger = sectionRef.current;
      if (!trigger) return;

      ctx = gsap.context(() => {
        // Fade section container in
        gsap.fromTo(
          stickyRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger,
              start: "top 80%",
              end: "top top",
              scrub: 1,
            },
          }
        );

        // Track scroll → active project + segment progress
        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: `+=${trigger.offsetHeight - window.innerHeight}`,
          scrub: SCRUB.project,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const totalProjects = projects.length;
            const segmentSize = 1 / totalProjects;
            const activeIdx = Math.min(
              Math.floor(self.progress / segmentSize),
              totalProjects - 1
            );
            const seg =
              (self.progress - activeIdx * segmentSize) / segmentSize;

            setActiveProject(activeIdx);
            setSegmentProgress(Math.max(0, Math.min(1, seg)));
          },
        });

        // Fade section out at end
        gsap.to(stickyRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger,
            start: "bottom 20%",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{
        height: `${TOTAL_HEIGHT_VH}vh`,
        background:
          "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.96) 3%, rgba(5,5,5,0.96) 97%, rgba(5,5,5,0) 100%)",
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden w-full"
        style={{ opacity: shouldReduceMotion ? 1 : 0 }}
      >
        {/* Atmospheric edge blends */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 z-10"
          style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-10"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }}
        />

        {/* Section label */}
        <div className="absolute top-8 left-6 md:left-16 xl:left-28 z-20">
          <div className="font-mono text-[9px] tracking-widest text-white/12 uppercase">
            /// PROJECTS
          </div>
        </div>

        {/* Project index dots — right side */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {projects.map((p, i) => (
            <div
              key={i}
              className="w-1 rounded-full transition-all duration-500"
              style={{
                height: i === activeProject ? "18px" : "4px",
                background:
                  i === activeProject
                    ? p.accentColor.line
                    : "rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>

        {/*
         * AnimatePresence mode="wait":
         * — exit animation of the outgoing project runs to completion
         * — only then does the incoming project mount and animate in
         * — eliminates ALL simultaneous visibility of two projects
         */}
        <AnimatePresence mode="wait" initial={false}>
          <ProjectSlide
            key={projects[activeProject]?.id ?? activeProject}
            project={projects[activeProject] ?? projects[0]}
            segmentProgress={segmentProgress}
            reduced={shouldReduceMotion}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}