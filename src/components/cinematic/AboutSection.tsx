"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";
import { useOpacityFallback } from "@/hooks/useOpacityFallback";

const FOCUS_AREAS = [
  "Machine Learning",
  "Computer Vision",
  "Deep Learning",
  "Intelligent Automation",
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/HARSHIL3431",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/harshilthakkar-dev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:harshilthakkar3435@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function PortraitImage() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="w-full aspect-[4/5] flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          borderRadius: "2px",
        }}
      >
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">
          Portrait
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden" style={{ borderRadius: "2px" }}>
      {/* Warm orange glow behind portrait */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,168,124,0.12) 0%, transparent 70%)",
        }}
      />
      <img
        src="/images/profile/hero-harshil.png"
        alt="Harshil Thakkar — AI/ML Engineer portrait"
        className="relative z-10 w-full h-full object-cover"
        style={{ borderRadius: "2px" }}
        onError={() => setImgError(true)}
      />
      {/* Subtle border glow */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          borderRadius: "2px",
          boxShadow: "inset 0 0 40px rgba(232,168,124,0.06), inset 0 0 80px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
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

        // Ambient glow
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power1.inOut" },
          0.05
        );

        // Portrait — depth-shift from left
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, x: -40, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.35,
            ease: GSAP_EASE.card,
          },
          0.1
        );

        // Content — depth-shift from right
        tl.fromTo(
          contentRef.current,
          { opacity: 0, x: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.35,
            ease: GSAP_EASE.card,
          },
          0.15
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
        height: "280vh",
        background:
          "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.96) 3%, rgba(5,5,5,0.96) 97%, rgba(5,5,5,0) 100%)",
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center"
        style={baseStyle}
      >
        {/* Atmospheric glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 35% 50%, rgba(232,168,124,0.03) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 65% 45%, rgba(0,212,240,0.02) 0%, transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{ background: "linear-gradient(to bottom, #050505 0%, transparent 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
          style={{ background: "linear-gradient(to top, #050505 0%, transparent 100%)" }}
        />

        <Container className="max-w-7xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-20 items-center">
            {/* Left — Portrait */}
            <div
              ref={portraitRef}
              className="md:col-span-5"
              style={baseStyle}
            >
              <PortraitImage />
            </div>

            {/* Right — Content */}
            <div
              ref={contentRef}
              className="md:col-span-7 flex flex-col gap-6"
              style={baseStyle}
            >
              {/* Section label */}
              <p
                className="font-mono text-[10px] tracking-[0.5em] uppercase"
                style={{ color: "#00D4F0" }}
              >
                /// ABOUT
              </p>

              {/* Name */}
              <h2
                className="font-heading leading-[0.95] tracking-tight text-white"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                Harshil Thakkar
              </h2>

              {/* Role badge */}
              <div className="flex">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-4 py-1.5 border"
                  style={{
                    color: "#00D4F0",
                    borderColor: "rgba(0,212,240,0.25)",
                    backgroundColor: "rgba(0,212,240,0.06)",
                  }}
                >
                  AI / ML Engineer
                </span>
              </div>

              {/* Bio */}
              <p
                className="font-sans text-sm md:text-base leading-relaxed max-w-lg"
                style={{ color: "rgba(255,255,255,0.40)" }}
              >
                I am an AI & Machine Learning student passionate about building
                intelligent systems that solve real-world problems. Currently
                pursuing B.Tech in Artificial Intelligence and Machine Learning
                at CHARUSAT.
              </p>

              {/* Focus area pills */}
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="font-mono text-[9px] tracking-widest uppercase border px-3 py-1 transition-colors duration-300 hover:bg-cyan-glow/10 hover:border-cyan-glow/40"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Separator */}
              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.02), transparent)",
                }}
              />

              {/* Resume + Social row */}
              <div className="flex flex-wrap items-center gap-5">
                {/* Resume button */}
                <a
                  id="about-resume-btn"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="font-mono text-[10px] tracking-widest uppercase px-5 py-2.5 border relative overflow-hidden group hover-lift transition-all duration-300"
                  style={{
                    color: "#fff",
                    borderColor: "rgba(0,212,240,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,212,240,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,240,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,212,240,0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="relative z-10">Download Resume ↗</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: "linear-gradient(to right, rgba(0,212,240,0.04), transparent)",
                    }}
                  />
                </a>

                {/* Social links */}
                <div className="flex items-center gap-4">
                  {SOCIAL_LINKS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="transition-colors duration-300 hover:text-cyan-glow"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                      title={label}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
