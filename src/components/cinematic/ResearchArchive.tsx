"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { projects } from "@/content/projects";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";

function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function next(): number {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0x100000000;
  };
}

/* ─── Animated Metric Counter ──────────────────────────── */
function MetricCounter({
  value,
  label,
  progress,
  accentColor,
}: {
  value: string;
  label: string;
  progress: number;
  accentColor: string;
}) {
  const numericMatch = value.match(/^([\d.]+)/);
  const suffix = value.replace(/^[\d.]+/, "");
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const displayValue = numericMatch
    ? Math.round(numericValue * Math.min(progress * 2, 1))
    : value;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <span
          className="font-mono text-4xl md:text-5xl font-light tabular-nums"
          style={{ color: accentColor }}
        >
          {numericMatch ? displayValue : value}
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
function ProjectSlide({
  project,
  isActive,
  progress,
  reduced,
}: {
  project: (typeof projects)[0];
  isActive: boolean;
  progress: number;
  reduced: boolean;
}) {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || reduced || !slideRef.current) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      if (!slideRef.current) return;

      if (isActive) {
        gsap.to(slideRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: GSAP_EASE.card,
        });
      } else {
        gsap.to(slideRef.current, {
          opacity: 0,
          scale: 0.97,
          y: 24,
          filter: "blur(6px)",
          duration: 0.7,
          ease: "power2.in",
        });
      }
    };

    init();
  }, [isActive, reduced]);

  const accent = project.accentColor;

  return (
    <div
      ref={slideRef}
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 xl:px-28"
      style={{
        opacity: reduced ? 1 : 0,
        transform: reduced ? "none" : "translateY(24px) scale(0.97)",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {/* Background atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 25% 50%, ${accent.primary} 0%, transparent 70%)`,
        }}
      />

      {/* Per-project particles */}
      {!reduced && <ProjectParticles color={accent.line} />}

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        {/* Left: Project info — visual hierarchy: number → title → philosophy → tags */}
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

          {/* Metric counter */}
          <MetricCounter
            value={project.metric.value}
            label={project.metric.label}
            progress={progress}
            accentColor={accent.text}
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

        {/* Right: Engineering rationale — Challenge → Approach → Impact */}
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

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div
              className="h-px flex-1 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="h-full transition-none"
                style={{
                  width: `${progress * 100}%`,
                  background: accent.line,
                }}
              />
            </div>
            <span
              className="font-mono text-[8px] tracking-widest"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Project Showcase ────────────────────────────── */
export default function ResearchArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [projectProgress, setProjectProgress] = useState(0);
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
        // Fade scene in with depth-shift
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

        // Track overall progress → active project
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
            const segmentProgress =
              (self.progress - activeIdx * segmentSize) / segmentSize;
            setActiveProject(activeIdx);
            setProjectProgress(Math.max(0, Math.min(1, segmentProgress)));
          },
        });

        // Fade out at end
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
      style={{ height: `${TOTAL_HEIGHT_VH}vh` }}
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
            /// WHAT I BUILD
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

        {/* Project slides */}
        {projects.map((project, i) => (
          <ProjectSlide
            key={project.id}
            project={project}
            isActive={i === activeProject}
            progress={i === activeProject ? projectProgress : 0}
            reduced={shouldReduceMotion}
          />
        ))}
      </div>
    </section>
  );
}