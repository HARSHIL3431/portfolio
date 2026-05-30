"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";

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
            scrub: SCRUB.narrative,
            invalidateOnRefresh: true,
          },
        });

        // Scene fade-in
        tl.fromTo(
          stickyRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: "power2.out" },
          0
        );

        // Ambient glow breathes in
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power1.inOut" },
          0.05
        );

        // Headline — depth-shift entrance
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.35,
            ease: GSAP_EASE.card,
          },
          0.1
        );

        // Meta label
        tl.fromTo(
          metaRef.current,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.2 },
          0.12
        );

        // Body text
        tl.fromTo(
          line1Ref.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.28, ease: GSAP_EASE.card },
          0.3
        );

        // Quote
        tl.fromTo(
          line2Ref.current,
          { opacity: 0, x: 16 },
          { opacity: 1, x: 0, duration: 0.22 },
          0.45
        );

        // Stats
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.18 },
          0.6
        );

        // Scene fade-out
        tl.to(
          stickyRef.current,
          { opacity: 0, y: -20, duration: 0.2 },
          0.82
        );
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
      style={{
        height: "300vh",
        background: 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.96) 3%, rgba(5,5,5,0.96) 97%, rgba(5,5,5,0) 100%)',
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center"
        style={baseStyle}
      >
        {/* Atmospheric glow — slightly warmer than hero */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 30% 55%, rgba(0,212,240,0.03) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 70% 40%, rgba(232,168,124,0.02) 0%, transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{
            background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
          style={{
            background: "linear-gradient(to top, #050505 0%, transparent 100%)",
          }}
        />

        <Container className="max-w-7xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            {/* Left column */}
            <div className="lg:col-span-7">
              <div
                ref={metaRef}
                className="font-mono text-[9px] tracking-widest uppercase mb-7"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                /// HOW I THINK
              </div>

              <h2
                ref={headlineRef}
                className="font-heading leading-[0.95] tracking-tighter text-white max-w-2xl"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                }}
              >
                The Mind{" "}
                <span className="italic" style={{ opacity: 0.6 }}>
                  Behind
                </span>
                <br />
                the Machine
              </h2>
            </div>

            {/* Right column */}
            <div className="lg:col-span-5 flex flex-col gap-7 md:gap-9 mt-2 lg:mt-12">
              <p
                ref={line1Ref}
                className="font-sans text-sm md:text-base leading-relaxed max-w-md"
                style={{ color: "rgba(255,255,255,0.40)" }}
              >
                I design and build machine learning systems at the intersection
                of research and production engineering. My work spans
                perception, language, and real-time inference — I care about the
                moment when a model stops being a prototype and starts being
                something people rely on.
              </p>

              <p
                ref={line2Ref}
                className="font-sans text-sm leading-relaxed italic max-w-md border-l pl-4"
                style={{
                  color: "#E8A87C",
                  opacity: 0.7,
                  borderColor: "rgba(232,168,124,0.2)",
                }}
              >
                &ldquo;There is a beautiful vulnerability in watching a system
                try to understand a world it has never touched.&rdquo;
              </p>

              <div
                ref={statsRef}
                className="flex flex-wrap gap-7 pt-7 mt-1 border-t border-white/5"
              >
                {[
                  { label: "03 PROJECTS", accent: true },
                  { label: "AI SYSTEMS", accent: false },
                  { label: "INDIA · REMOTE", accent: false },
                ].map(({ label, accent }) => (
                  <div
                    key={label}
                    className="border-l pl-3 font-mono text-[9px] tracking-widest uppercase"
                    style={{
                      borderColor: accent
                        ? "rgba(0,212,240,0.3)"
                        : "rgba(255,255,255,0.08)",
                      color: "#8A8A93",
                    }}
                  >
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