"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const credsRef = useRef<HTMLDivElement>(null);
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
            scrub: SCRUB.experience,
            invalidateOnRefresh: true,
          },
        });

        // Fade in scene
        tl.fromTo(
          stickyRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.18 },
          0
        );

        // Meta label
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.15 },
          0.05
        );

        // Narrative blocks — depth-shift entrance
        blocksRef.current.forEach((block, i) => {
          if (!block) return;
          const t = 0.12 + i * 0.28;
          tl.fromTo(
            block,
            { opacity: 0, y: 40, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.3,
              ease: GSAP_EASE.card,
            },
            t
          );
        });

        // Credentials section
        if (credsRef.current) {
          tl.fromTo(
            credsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.2, ease: GSAP_EASE.card },
            0.7
          );
        }

        // Fade out
        tl.to(stickyRef.current, { opacity: 0, duration: 0.15 }, 0.88);
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  const baseStyle = shouldReduceMotion ? {} : { opacity: 0 };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "320vh" }}
    >
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
              "radial-gradient(ellipse 55% 65% at 65% 35%, rgba(0,212,240,0.025) 0%, transparent 70%)",
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
            {/* Section label */}
            <div
              ref={metaRef}
              className="font-mono text-[9px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.15)", ...baseStyle }}
            >
              /// EXPERIENCE
            </div>

            {/* Experience narrative blocks */}
            <div className="flex flex-col gap-14 md:gap-18">
              {experience.map((item, index) => {
                const isWork = item.type === "work";

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      blocksRef.current[index] = el;
                    }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16"
                    style={baseStyle}
                  >
                    {/* Left: Identity */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                      <div
                        className="font-mono text-[9px] tracking-widest uppercase"
                        style={{
                          color: isWork
                            ? "rgba(0,212,240,0.5)"
                            : "rgba(255,255,255,0.15)",
                        }}
                      >
                        /// CHAPTER {String(index + 1).padStart(2, "0")} / {item.org.toUpperCase()}
                      </div>

                      <h3 className="font-heading text-xl md:text-2xl text-white leading-tight">
                        {item.role}
                      </h3>

                      <p
                        className="font-mono text-[10px] tracking-widest uppercase"
                        style={{
                          color: isWork ? "#00D4F0" : "#8A8A93",
                        }}
                      >
                        {item.period}
                      </p>
                    </div>

                    {/* Right: Narrative — Challenge → Approach → Impact */}
                    <div className="lg:col-span-8">
                      <div
                        className="border border-white/5 p-5 md:p-7 flex flex-col gap-5"
                        style={{
                          background: "rgba(5,5,5,0.4)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {[
                          { label: "CHALLENGE", value: item.challenge },
                          { label: "APPROACH", value: item.approach },
                          {
                            label: "IMPACT",
                            value: item.impact,
                            highlight: true,
                          },
                        ].map(({ label, value, highlight }) => (
                          <div key={label}>
                            <span
                              className="font-mono text-[9px] tracking-widest block mb-1.5 uppercase"
                              style={{
                                color: highlight
                                  ? isWork
                                    ? "#00D4F0"
                                    : "#E8A87C"
                                  : "rgba(255,255,255,0.22)",
                              }}
                            >
                              {label}:
                            </span>
                            <p className="font-sans text-sm text-white/38 leading-relaxed">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Credentials — compact horizontal */}
            <div ref={credsRef} className="pt-8 border-t border-white/5" style={baseStyle}>
              <div className="font-mono text-[9px] tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.15)" }}>
                /// CREDENTIALS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex flex-col gap-2 border-l border-white/5 pl-4">
                    <span
                      className="font-mono text-[9px] tracking-widest uppercase"
                      style={{ color: "#00D4F0", opacity: 0.6 }}
                    >
                      {cert.issuer}
                    </span>
                    <h4 className="font-heading text-base text-white/80">
                      {cert.name}
                    </h4>
                    <span className="font-mono text-[9px] text-white/20 uppercase">
                      {cert.date} // {cert.credentialId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}