"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GSAP_EASE } from "./cinematicMotion";

/**
 * FutureVision — brief cinematic coda.
 *
 * A quiet, contemplative moment before the contact section.
 * Communicates forward-looking ambition without being loud.
 */
export default function FutureVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
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
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          stickyRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0
        );

        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.15 },
          0.08
        );

        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.35,
            ease: GSAP_EASE.card,
          },
          0.15
        );

        tl.fromTo(
          bodyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.25, ease: GSAP_EASE.card },
          0.35
        );

        tl.to(stickyRef.current, { opacity: 0, duration: 0.2 }, 0.8);
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  const baseStyle = shouldReduceMotion ? {} : { opacity: 0 };

  return (
    <section ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center items-center"
        style={baseStyle}
      >
        {/* Atmospheric — warm intimate glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232,168,124,0.03) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{
            background: "linear-gradient(to bottom, #050505, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
          style={{
            background: "linear-gradient(to top, #050505, transparent)",
          }}
        />

        <Container className="max-w-3xl px-6 md:px-12 relative z-10 text-center">
          <div className="flex flex-col items-center gap-8">
            <div
              ref={metaRef}
              className="font-mono text-[9px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.15)", ...baseStyle }}
            >
              /// WHAT COMES NEXT
            </div>

            <h2
              ref={headlineRef}
              className="font-heading leading-[0.95] text-white"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                ...baseStyle,
              }}
            >
              Building the systems{" "}
              <span className="italic" style={{ opacity: 0.6 }}>
                that build
              </span>
              <br />
              the future
            </h2>

            <p
              ref={bodyRef}
              className="font-sans text-sm md:text-base leading-relaxed max-w-lg mx-auto"
              style={{ color: "rgba(255,255,255,0.35)", ...baseStyle }}
            >
              I&apos;m drawn to problems where the constraints are interesting
              — low-latency inference on constrained hardware, diffusion models
              running in a browser, distributed training without the cloud.
              The next chapter is about making AI systems that are not just
              powerful, but trustworthy, transparent, and accessible.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
