"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { projects } from "@/content/projects";

// Accent colors per project
const PROJECT_ACCENTS = [
  { primary: "rgba(0,229,255,0.12)", line: "rgba(0,229,255,0.5)", text: "#00E5FF" },
  { primary: "rgba(255,140,0,0.10)", line: "rgba(255,140,0,0.4)", text: "#FF8C00" },
  { primary: "rgba(180,100,255,0.10)", line: "rgba(180,100,255,0.35)", text: "#B464FF" },
];

function ProjectSlide({
  project,
  accent,
  isActive,
  progress,
  reduced,
}: {
  project: (typeof projects)[0];
  accent: (typeof PROJECT_ACCENTS)[0];
  isActive: boolean;
  progress: number; // 0–1 within this project's scroll window
  reduced: boolean;
}) {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) return;
    if (!slideRef.current) return;
    
    const init = async () => {
      const { gsap } = await import("gsap");
      if (!slideRef.current) return;
      
      if (isActive) {
        gsap.to(slideRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        gsap.to(slideRef.current, {
          opacity: 0,
          scale: 0.96,
          y: 30,
          filter: "blur(6px)",
          duration: 0.6,
          ease: "power2.in",
        });
      }
    };

    init();
  }, [isActive, reduced]);

  return (
    <div
      ref={slideRef}
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 xl:px-28"
      style={{
        opacity: reduced ? 1 : 0,
        transform: reduced ? "none" : "translateY(30px) scale(0.96)",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {/* Background accent glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 20% 50%, ${accent.primary} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left: Project info */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div
              className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border"
              style={{
                color: accent.text,
                borderColor: `${accent.line}`,
                backgroundColor: `${accent.primary}`,
              }}
            >
              {project.status}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
              {project.id} / {projects.length.toString().padStart(2, "0")}
            </div>
          </div>

          {/* Giant background number */}
          <div className="relative">
            <div
              className="absolute -top-16 -left-6 font-mono select-none pointer-events-none"
              style={{ fontSize: "clamp(6rem, 18vw, 14rem)", opacity: 0.04, color: "#fff", lineHeight: 1 }}
            >
              {project.id}
            </div>
            <h3
              className="font-heading leading-tight text-white relative z-10"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {project.title}
            </h3>
          </div>

          <p className="font-sans text-base md:text-lg text-white/50 leading-relaxed max-w-lg">
            {project.philosophy}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-widest uppercase border border-white/10 px-3 py-1 text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Engineering rationale */}
        <div className="lg:col-span-5">
          <div
            className="border border-white/5 p-6 md:p-8 flex flex-col gap-6"
            style={{ background: "rgba(5,5,5,0.6)", backdropFilter: "blur(8px)" }}
          >
            <div
              className="font-mono text-[10px] tracking-widest uppercase pb-4 border-b"
              style={{ color: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.05)" }}
            >
              ENGINEERING_RATIONALE
            </div>

            {[
              { label: "PROBLEM", value: project.rationale.problem },
              { label: "APPROACH", value: project.rationale.approach },
              { label: "RESULT", value: project.rationale.result, highlight: true },
            ].map(({ label, value, highlight }) => (
              <div key={label}>
                <span
                  className="font-mono text-[9px] tracking-widest block mb-2 uppercase"
                  style={{ color: highlight ? accent.text : "rgba(255,255,255,0.3)" }}
                >
                  {label}:
                </span>
                <p className="font-mono text-[11px] text-white/40 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          {/* Scroll progress within this project */}
          <div className="mt-4 flex items-center gap-3">
            <div
              className="h-px flex-1 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full transition-none"
                style={{ width: `${progress * 100}%`, background: accent.line }}
              />
            </div>
            <span className="font-mono text-[9px] tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResearchArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [projectProgress, setProjectProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const PER_PROJECT_SCROLL = 1.5; // Each project occupies 1.5 screens of scroll
  const TOTAL_HEIGHT_VH = 100 + projects.length * PER_PROJECT_SCROLL * 100;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldReduceMotion) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const trigger = sectionRef.current;
      if (!trigger) return;

      ctx = gsap.context(() => {
        // Fade scene in
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

        // Track overall progress to determine active project
        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: `+=${trigger.offsetHeight - window.innerHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const totalProjects = projects.length;
            const segmentSize = 1 / totalProjects;
            const activeIdx = Math.min(
              Math.floor(self.progress / segmentSize),
              totalProjects - 1
            );
            const segmentProgress = (self.progress - activeIdx * segmentSize) / segmentSize;
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
        {/* Atmospheric blend */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 z-10"
          style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-10"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }}
        />

        {/* Section label */}
        <div className="absolute top-8 left-6 md:left-16 xl:left-28 z-20">
          <div className="font-mono text-[10px] tracking-widest text-white/15 uppercase">
            /// 03 / PROJECTS
          </div>
        </div>

        {/* Project index dots */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {projects.map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full transition-all duration-500"
              style={{
                height: i === activeProject ? "20px" : "4px",
                background: i === activeProject
                  ? PROJECT_ACCENTS[i]?.line ?? "rgba(0,229,255,0.6)"
                  : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Project slides */}
        {projects.map((project, i) => (
          <ProjectSlide
            key={project.id}
            project={project}
            accent={PROJECT_ACCENTS[i % PROJECT_ACCENTS.length]}
            isActive={i === activeProject}
            progress={i === activeProject ? projectProgress : 0}
            reduced={shouldReduceMotion}
          />
        ))}
      </div>
    </section>
  );
}