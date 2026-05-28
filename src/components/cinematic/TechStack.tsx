"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { skills } from "@/content/skills";

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scanBarRef = useRef<HTMLDivElement>(null);
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
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(stickyRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0);
        tl.fromTo(metaRef.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.2 }, 0.05);
        tl.fromTo(scanBarRef.current, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.4, ease: "none" }, 0.1);

        rowsRef.current.forEach((row, i) => {
          if (!row) return;
          const start = 0.15 + i * 0.1;
          tl.fromTo(row, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, start);
        });

        tl.to(stickyRef.current, { opacity: 0, duration: 0.15 }, 0.85);
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  const baseStyle = shouldReduceMotion ? {} : { opacity: 0 };

  return (
    <section ref={sectionRef} className="relative" style={{ height: "220vh" }}>
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center" style={baseStyle}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 40%, rgba(0,229,255,0.03) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, #050505, transparent)" }} />

        <Container className="max-w-7xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col gap-12 md:gap-16">
            <div ref={metaRef} className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
              /// 02 / CAPABILITIES
            </div>

            <div className="relative flex flex-col">
              <div
                ref={scanBarRef}
                className="absolute left-0 top-0 bottom-0 w-px origin-top"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(0,229,255,0.3), transparent)" }}
              />

              {skills.map((skillGroup, index) => (
                <div
                  key={skillGroup.category}
                  ref={(el) => { rowsRef.current[index] = el; }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline py-7 border-t border-white/5 pl-6"
                >
                  <div className="md:col-span-4">
                    <h3 className="font-heading text-xl md:text-2xl text-white">{skillGroup.category}</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="font-mono text-sm text-white/40 leading-relaxed tracking-wide">
                      {skillGroup.items.join("   ·   ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
