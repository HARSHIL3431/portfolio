"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "./ParallaxLayer";
import { experience } from "@/content/experience";

function TimelineItem({ item, index, progress }: { item: (typeof experience)[0], index: number, progress: any }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  
  // Stagger the animation based on index
  const start = 0.2 + index * 0.15;
  const end = start + 0.2;
  
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [-40, 0]);

  return (
    <motion.div
      style={{
        opacity: shouldReduceMotion ? 1 : opacity,
        x: shouldReduceMotion ? 0 : x,
      }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-white/5 relative"
    >
      <div className="md:col-span-3 pt-1">
        <p className="font-mono text-[10px] text-[#8A8A8A] md:text-right uppercase">
          {item.period}
        </p>
      </div>
      <div className="md:col-span-9 flex flex-col gap-2">
        <h3 className="font-heading text-xl text-[#F5F5F5]">{item.role}</h3>
        <p
          className={`font-mono text-[11px] uppercase tracking-widest ${
            item.type === "work" ? "text-[#00E5FF]" : "text-[#8A8A8A]"
          }`}
        >
          {item.org}
        </p>
        <p className="font-sans text-sm text-[#8A8A8A] leading-relaxed max-w-2xl mt-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent z-10">
      <ParallaxLayer speed={0.9}>
        <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
          <div ref={containerRef} className="flex flex-col gap-16 md:gap-24">
            <div className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
              /// 04 / TIMELINE
            </div>

            <div className="relative pl-6 md:pl-12">
              {/* Left vertical hairline line */}
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-px bg-white/10"
                style={{
                  scaleY: shouldReduceMotion ? 1 : lineScaleY,
                  transformOrigin: "top",
                }}
              />

              <div className="flex flex-col">
                {experience.map((item, index) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </ParallaxLayer>
    </section>
  );
}