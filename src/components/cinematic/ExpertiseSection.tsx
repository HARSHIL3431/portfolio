"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";
import { useOpacityFallback } from "@/hooks/useOpacityFallback";

const EXPERTISE_CARDS = [
  {
    title: "Machine Learning Engineering",
    description:
      "End-to-end ML pipelines — from data preprocessing to model deployment at scale.",
    tags: ["Python", "TensorFlow", "FastAPI", "scikit-learn"],
    accentColor: "#00D4F0",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
        <circle cx="12" cy="12" r="8" strokeDasharray="4 4" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Computer Vision",
    description:
      "Perception systems that see, detect, and understand the visual world.",
    tags: ["OpenCV", "EasyOCR", "Object Detection", "Image Processing"],
    accentColor: "#E8A87C",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Deep Learning",
    description:
      "LSTM, CNN, and transformer architectures for sequence and visual tasks.",
    tags: ["LSTM", "CNNs", "TensorFlow", "Keras"],
    accentColor: "#B464FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="6" y="18" width="12" height="4" rx="1" />
        <path d="M8 7v3m8-3v3M10 15v3m4-3v3" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Applications",
    description:
      "Full-stack AI apps integrating LLMs, APIs, and conversational interfaces.",
    tags: ["React", "FastAPI", "Claude API", "LLMs"],
    accentColor: "#00D4F0",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useOpacityFallback(stickyRef, 800, shouldReduceMotion);

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

        // Fade in scene
        tl.fromTo(
          stickyRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.15 },
          0
        );

        // Meta label
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.15 },
          0.05
        );

        // Heading
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 24, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.25,
            ease: GSAP_EASE.card,
          },
          0.08
        );

        // Stagger cards
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const start = 0.15 + i * 0.12;
          tl.fromTo(
            card,
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
      style={{
        height: "260vh",
        background:
          "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.96) 3%, rgba(5,5,5,0.96) 97%, rgba(5,5,5,0) 100%)",
      }}
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
              "radial-gradient(ellipse 55% 65% at 60% 40%, rgba(0,212,240,0.02) 0%, transparent 70%)",
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
          <div className="flex flex-col gap-10 md:gap-12">
            {/* Meta label */}
            <div
              ref={metaRef}
              className="font-mono text-[9px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.15)", ...baseStyle }}
            >
              /// EXPERTISE
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-heading leading-[0.95] tracking-tight text-white"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                ...baseStyle,
              }}
            >
              What I{" "}
              <span className="italic" style={{ opacity: 0.6 }}>
                Build
              </span>
            </h2>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {EXPERTISE_CARDS.map((card, index) => {
                const isActive = activeCard === index;

                return (
                  <div
                    key={card.title}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="group relative border p-6 md:p-7 cursor-default hover-lift"
                    style={{
                      borderColor: isActive
                        ? `${card.accentColor}40`
                        : "rgba(255,255,255,0.05)",
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(4px)",
                      borderRadius: "4px",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: isActive
                        ? `0 0 24px ${card.accentColor}08`
                        : "none",
                      ...baseStyle,
                    }}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className="relative z-10 flex flex-col gap-4">
                      {/* Icon + Title */}
                      <div className="flex items-center gap-3">
                        <div
                          className="transition-colors duration-300"
                          style={{
                            color: isActive
                              ? card.accentColor
                              : "rgba(255,255,255,0.25)",
                          }}
                        >
                          {card.icon}
                        </div>
                        <h3
                          className="font-heading text-lg md:text-xl transition-colors duration-300"
                          style={{
                            color: isActive
                              ? "#fff"
                              : "rgba(255,255,255,0.75)",
                          }}
                        >
                          {card.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p
                        className="font-sans text-sm leading-relaxed transition-colors duration-300"
                        style={{
                          color: isActive
                            ? "rgba(255,255,255,0.45)"
                            : "rgba(255,255,255,0.25)",
                        }}
                      >
                        {card.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] tracking-widest uppercase border px-3 py-1"
                            style={{
                              color: isActive
                                ? `${card.accentColor}AA`
                                : "rgba(255,255,255,0.20)",
                              borderColor: isActive
                                ? `${card.accentColor}30`
                                : "rgba(255,255,255,0.06)",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {tag}
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
