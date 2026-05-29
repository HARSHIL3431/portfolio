"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { skills } from "@/content/skills";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";

function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function next(): number {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0x100000000;
  };
}

/* ─── Node Cluster Visualization ───────────────────────── */
function DomainNodes({
  items,
  color,
  isActive,
}: {
  items: string[];
  color: string;
  isActive: boolean;
}) {
  const positions = useMemo(() => {
    const rand = createSeededRandom(items.length * 7919);
    return items.map(() => ({
      x: 20 + rand() * 60,
      y: 15 + rand() * 70,
      r: 2 + rand() * 2.5,
    }));
  }, [items]);

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full absolute inset-0"
      style={{ opacity: isActive ? 0.7 : 0.25, transition: "opacity 0.6s ease" }}
    >
      {/* Connection lines between nodes */}
      {positions.map((pos, i) =>
        positions.slice(i + 1).map((pos2, j) => {
          const dist = Math.hypot(pos.x - pos2.x, pos.y - pos2.y);
          if (dist > 40) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={pos.x}
              y1={pos.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke={color}
              strokeWidth={0.3}
              strokeOpacity={isActive ? 0.3 : 0.08}
              style={{ transition: "stroke-opacity 0.6s ease" }}
            />
          );
        })
      )}
      {/* Nodes */}
      {positions.map((pos, i) => (
        <g key={i}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r={pos.r}
            fill={color}
            fillOpacity={isActive ? 0.4 : 0.1}
            style={{ transition: "fill-opacity 0.6s ease" }}
          />
          <circle
            cx={pos.x}
            cy={pos.y}
            r={pos.r + 0.5}
            fill="none"
            stroke={color}
            strokeWidth={0.3}
            strokeOpacity={isActive ? 0.5 : 0.15}
            style={{ transition: "stroke-opacity 0.6s ease" }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ─── Domain accent colors ─────────────────────────────── */
const DOMAIN_COLORS: Record<string, string> = {
  "Perception & Vision": "#00D4F0",
  "Language & Intelligence": "#E8A87C",
  "Systems & Infrastructure": "#8A8A93",
  "Interface & Product": "#B464FF",
};

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDomain, setActiveDomain] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: `+=${trigger.offsetHeight - window.innerHeight}`,
            scrub: SCRUB.capability,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          stickyRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.15 },
          0
        );

        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.15 },
          0.05
        );

        // Cascade domains in with staggered depth-shift
        domainsRef.current.forEach((domain, i) => {
          if (!domain) return;
          const start = 0.1 + i * 0.14;
          tl.fromTo(
            domain,
            { opacity: 0, y: 30, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.22,
              ease: GSAP_EASE.card,
            },
            start
          );
        });

        tl.to(stickyRef.current, { opacity: 0, duration: 0.15 }, 0.88);
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  const baseStyle = shouldReduceMotion ? {} : { opacity: 0 };

  return (
    <section ref={sectionRef} className="relative" style={{ height: "260vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center"
        style={baseStyle}
      >
        {/* Atmospheric */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 75% at 75% 45%, rgba(0,212,240,0.02) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }}
        />

        <Container className="max-w-7xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col gap-10 md:gap-14">
            <div
              ref={metaRef}
              className="font-mono text-[9px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.15)", ...baseStyle }}
            >
              /// CAPABILITIES
            </div>

            {/* Domain grid — 2x2 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {skills.map((domain, index) => {
                const color = DOMAIN_COLORS[domain.domain] ?? "#8A8A93";
                const isActive = activeDomain === index;

                return (
                  <div
                    key={domain.domain}
                    ref={(el) => {
                      domainsRef.current[index] = el;
                    }}
                    className="group relative border border-white/5 p-6 md:p-7 cursor-default hover-lift"
                    style={{
                      background: "rgba(5,5,5,0.4)",
                      backdropFilter: "blur(4px)",
                      ...baseStyle,
                    }}
                    onMouseEnter={() => setActiveDomain(index)}
                    onMouseLeave={() => setActiveDomain(null)}
                  >
                    {/* Node cluster visualization */}
                    <div className="absolute inset-0 overflow-hidden">
                      <DomainNodes
                        items={domain.items}
                        color={color}
                        isActive={isActive}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            background: color,
                            boxShadow: isActive
                              ? `0 0 8px ${color}40`
                              : "none",
                          }}
                        />
                        <h3
                          className="font-heading text-lg md:text-xl transition-colors duration-300"
                          style={{
                            color: isActive
                              ? "#fff"
                              : "rgba(255,255,255,0.75)",
                          }}
                        >
                          {domain.domain}
                        </h3>
                      </div>

                      <p
                        className="font-sans text-sm leading-relaxed transition-colors duration-300"
                        style={{
                          color: isActive
                            ? "rgba(255,255,255,0.45)"
                            : "rgba(255,255,255,0.25)",
                        }}
                      >
                        {domain.description}
                      </p>

                      {/* Technology items */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                        {domain.items.map((item) => (
                          <span
                            key={item}
                            className="font-mono text-[10px] tracking-wide transition-colors duration-300"
                            style={{
                              color: isActive
                                ? `${color}AA`
                                : "rgba(255,255,255,0.20)",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
