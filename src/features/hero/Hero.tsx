"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { identity } from "@/content/identity";
import { heroStaggerContainer, heroEntrance } from "@/systems/motion/presets";
import { HeroScene } from "@/systems/gl/HeroScene";
import { useCinematicScroll } from "@/systems/scroll/ScrollProvider";

export function Hero() {
  const { scrollYProgress } = useCinematicScroll();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Use refs for scroll-driven values to avoid re-renders
  const scrollProgressRef = useRef(0);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgressRef.current = v;
    // Fade scroll indicator imperatively — no state
    if (indicatorRef.current) {
      const opacity = Math.max(0, 1 - v / 0.2);
      indicatorRef.current.style.opacity = String(opacity);
    }
  });

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#0a0a0f",
      }}
    >
      {/* GL Canvas — absolute right half, composited layer */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "55%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <HeroScene scrollYProgress={scrollYProgress} />
      </div>

      {/* Gradient: left stays readable, right reveals sphere */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #0a0a0f 38%, rgba(10,10,15,0.55) 65%, rgba(10,10,15,0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStaggerContainer}
        style={{
          position: "relative",
          zIndex: 2,
          paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          paddingTop: "7rem",
          paddingBottom: "7rem",
          maxWidth: "52rem",
          width: "100%",
        }}
      >

        {/* Display name — largest element on page */}
        <motion.h1
          variants={heroEntrance(0)}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            color: "#e8e6e1",
            marginBottom: "2rem",
          }}
        >
          {identity.name}
        </motion.h1>

        {/* One-sentence identity */}
        <motion.p
          variants={heroEntrance(0.08)}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            lineHeight: 1.7,
            color: "rgba(232, 230, 225, 0.4)",
            fontWeight: 300,
            maxWidth: "42ch",
            marginBottom: "3rem",
          }}
        >
          {identity.headline}
        </motion.p>

        {/* CTA */}
        <motion.div variants={heroEntrance(0.16)}>
          <a
            href="#projects"
            data-magnetic
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#4a4a52",
              textDecoration: "none",
              paddingBottom: "0.35rem",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              transition: "color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#e8e6e1";
              el.style.borderColor = "rgba(255,255,255,0.2)";
              const arrow = el.querySelector<HTMLElement>(".arrow");
              if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(3px)"; }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#4a4a52";
              el.style.borderColor = "rgba(255,255,255,0.07)";
              const arrow = el.querySelector<HTMLElement>(".arrow");
              if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "translateX(-3px)"; }
            }}
          >
            Selected Work
            <span
              className="arrow"
              aria-hidden="true"
              style={{
                opacity: 0,
                transform: "translateX(-3px)",
                transition: "opacity 0.2s, transform 0.25s",
              }}
            >
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <div
          ref={indicatorRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "clamp(1.5rem, 8vw, 8rem)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.4rem",
            transition: "opacity 0.4s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#2e2e36",
            }}
          >
            Scroll
          </span>
          <span style={{ fontSize: "0.7rem", color: "#2e2e36" }}>↓</span>
        </div>
      )}
    </section>
  );
}
