"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "./ParallaxLayer";
import { useCinematicScroll } from "@/providers/ScrollProvider";
import { cinematicEase } from "./cinematicMotion";

export function NarrativeIntro() {
  const { scrollYProgress } = useCinematicScroll();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isActive, setIsActive] = useState(false);

  const tech = [
    "Deep Learning Systems",
    "Generative AI Architecture",
    "Edge Inference & Optimization",
    "Human-Centered AI Design",
  ];

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const sectionLift = useTransform(scrollYProgress, [0, 1], ["2%", "-4%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.55, 0.55, 0]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = progress >= 0.08 && progress <= 0.92;
    setIsActive((current) => (current === next ? current : next));
  });

  return (
    <ParallaxLayer speed={0.6} className="-mt-[20vh]">
      <motion.section
        className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-transparent"
        style={{
          opacity: shouldReduceMotion ? 1 : sectionOpacity,
          y: shouldReduceMotion ? "0%" : sectionLift,
        }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: shouldReduceMotion ? 0.45 : glowOpacity,
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,229,255,0.03) 0%, transparent 70%)",
          }}
        />

        <Container className="max-w-6xl relative z-10">
          <motion.div
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: shouldReduceMotion ? 0.35 : 0.9, ease: cinematicEase }}
            className="mb-16"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] text-white/20 uppercase">
              /// NARRATIVE_INTRODUCTION
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7">
              <motion.h2
                className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight text-white"
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: shouldReduceMotion ? 0 : 0.08,
                    },
                  },
                }}
              >
                {"Architecting Intelligence".split(" ").map((word, index) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-2"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: shouldReduceMotion ? 0.2 : 0.6, ease: cinematicEase },
                      },
                    }}
                  >
                    {index === 1 ? <span className="italic opacity-70">{word}</span> : word}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <motion.p
                className="text-white/40 font-sans text-lg md:text-xl leading-relaxed"
                initial={false}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: shouldReduceMotion ? 0.35 : 0.9, delay: 0.12, ease: cinematicEase }}
              >
                I explore the fragile boundaries between machine logic and human intuition. This
                archive documents experiments in building systems that don&apos;t just compute —
                they comprehend.
              </motion.p>

              <motion.div
                className="h-px w-full"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.08), transparent)" }}
                initial={false}
                animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.4 : 1.2, delay: 0.28, ease: cinematicEase }}
              />

              <div className="overflow-hidden">
                <motion.div
                  className="whitespace-nowrap flex gap-8"
                  animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : { repeat: Infinity, duration: 18, ease: "linear" }
                  }
                >
                  {tech.map((skill) => (
                    <div
                      key={skill}
                      className="inline-block font-mono text-xs tracking-widest text-white/30 uppercase pr-8"
                    >
                      {skill}
                    </div>
                  ))}
                  {tech.map((skill) => (
                    <div
                      key={`dup-${skill}`}
                      className="inline-block font-mono text-xs tracking-widest text-white/30 uppercase pr-8"
                    >
                      {skill}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-32 md:mt-48 w-full flex justify-end"
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: shouldReduceMotion ? 0.35 : 1.0, delay: 0.42, ease: cinematicEase }}
          >
            <blockquote className="max-w-2xl text-right">
              <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-white/50 italic leading-tight">
                &ldquo;True intelligence emerges when the system learns to interpret ambiguity,
                not just data.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </Container>
      </motion.section>
    </ParallaxLayer>
  );
}