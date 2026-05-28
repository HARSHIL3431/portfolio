"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { experience } from "@/content/experience";

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion() ?? false;

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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: `+=${trigger.offsetHeight - window.innerHeight}`,
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        });

        // Fade in scene
        tl.fromTo(stickyRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);

        // Meta label
        tl.fromTo(metaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.05);

        // Timeline line draws from top to bottom
        tl.fromTo(
          lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, ease: "none", transformOrigin: "top center" },
          0.1
        );

        // Items cascade in
        itemsRef.current.forEach((item, i) => {
          if (!item) return;
          const t = 0.15 + i * 0.22;
          tl.fromTo(
            item,
            { opacity: 0, x: -40, filter: "blur(4px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.28, ease: "power2.out" },
            t
          );
        });

        // Fade out
        tl.to(stickyRef.current, { opacity: 0, duration: 0.15 }, 0.85);
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
      style={{ height: "280vh" }}
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
            background: "radial-gradient(ellipse 50% 70% at 70% 30%, rgba(0,229,255,0.03) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }}
        />

        <Container className="max-w-7xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col gap-12 md:gap-16">
            <div ref={metaRef} className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
              /// 04 / TIMELINE
            </div>

            <div className="relative pl-6 md:pl-12">
              {/* Vertical timeline line */}
              <div
                ref={lineRef}
                className="absolute top-0 bottom-0 left-0 w-px"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,229,255,0.3), rgba(255,255,255,0.06), transparent)",
                  transformOrigin: "top center",
                  transform: shouldReduceMotion ? "scaleY(1)" : "scaleY(0)",
                }}
              />

              <div className="flex flex-col">
                {experience.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => { itemsRef.current[index] = el; }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-white/5 relative"
                    style={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[calc(1.5rem+0.5px)] md:-left-[calc(3rem+0.5px)] top-10 w-2 h-2 rounded-full border"
                      style={{
                        borderColor: item.type === "work" ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.15)",
                        background: item.type === "work" ? "rgba(0,229,255,0.15)" : "transparent",
                      }}
                    />

                    <div className="md:col-span-3 pt-1">
                      <p className="font-mono text-[10px] text-white/30 md:text-right uppercase tracking-widest">
                        {item.period}
                      </p>
                    </div>
                    <div className="md:col-span-9 flex flex-col gap-2">
                      <h3 className="font-heading text-xl md:text-2xl text-white">{item.role}</h3>
                      <p
                        className="font-mono text-[11px] uppercase tracking-widest"
                        style={{ color: item.type === "work" ? "#00E5FF" : "#8A8A8A" }}
                      >
                        {item.org}
                      </p>
                      <p className="font-sans text-sm text-white/40 leading-relaxed max-w-2xl mt-2">
                        {item.description}
                      </p>
                    </div>
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