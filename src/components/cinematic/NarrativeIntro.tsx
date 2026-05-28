"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";

export default function NarrativeIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
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
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(stickyRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0);
        tl.fromTo(headlineRef.current, { opacity: 0, y: 60, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "power3.out" }, 0.1);
        tl.fromTo(metaRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25 }, 0.15);
        tl.fromTo(line1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 0.3);
        tl.fromTo(line2Ref.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.25 }, 0.45);
        tl.fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2 }, 0.6);
        tl.fromTo(glowRef.current, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power1.inOut" }, 0.1);
        tl.to(stickyRef.current, { opacity: 0, y: -30, duration: 0.2 }, 0.8);
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  const baseStyle = shouldReduceMotion ? {} : { opacity: 0 };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center" style={baseStyle}>
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 30% 60%, rgba(0,229,255,0.04) 0%, transparent 70%)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(to bottom, #050505 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, #050505 0%, transparent 100%)" }} />

        <Container className="max-w-7xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-7">
              <div ref={metaRef} className="font-mono text-[10px] tracking-widest text-white/20 uppercase mb-8">
                /// 01 / IDENTITY
              </div>
              <h2 ref={headlineRef} className="font-heading text-6xl md:text-8xl xl:text-[7rem] leading-none tracking-tighter text-white max-w-2xl">
                The Mind{" "}<span className="italic opacity-70">Behind</span><br />the Machine
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10 mt-4 lg:mt-12">
              <p ref={line1Ref} className="text-white/50 font-sans text-base leading-relaxed max-w-md">
                I engineer AI-driven systems that transform complex real-world workflows into intelligent, interactive experiences. Building these interfaces matters because true innovation requires bridging the gap between raw machine logic and intuitive human creativity.
              </p>
              <p ref={line2Ref} className="font-sans text-sm leading-relaxed italic max-w-md border-l border-cyan-glow/20 pl-4" style={{ color: "#E8D5B0" }}>
                &ldquo;There is a beautiful vulnerability in watching a system try to understand a world it has never touched.&rdquo;
              </p>
              <div ref={statsRef} className="flex flex-wrap gap-8 pt-8 mt-2 border-t border-white/5">
                {[{ label: "03 PROJECTS", accent: true }, { label: "AI SYSTEMS", accent: false }, { label: "REMOTE", accent: false }].map(({ label, accent }) => (
                  <div key={label} className="border-l pl-3 font-mono text-[10px] tracking-widest uppercase" style={{ borderColor: accent ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.1)", color: "#8A8A8A" }}>
                    [{label}]
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