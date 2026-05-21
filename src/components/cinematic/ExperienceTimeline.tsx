"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { MetadataBlock } from "@/components/core/MetadataBlock";
import { ParallaxLayer } from "./ParallaxLayer";
import { useCinematicScroll } from "@/providers/ScrollProvider";

interface TimelineItem {
  period: string;
  role: string;
  org: string;
  description: string;
  tags: string[];
  type: "experience" | "research" | "education";
}

const timeline: TimelineItem[] = [
  {
    period: "2024 — Present",
    role: "AI/ML Engineer",
    org: "Research Laboratory",
    description:
      "Leading development of production-grade LLM inference pipelines. Architecting distributed training systems for billion-parameter models on multi-GPU clusters.",
    tags: ["PyTorch", "CUDA", "Kubernetes", "MLflow"],
    type: "experience",
  },
  {
    period: "2023 — 2024",
    role: "ML Research Intern",
    org: "Deep Learning Institute",
    description:
      "Investigated novel attention mechanisms for long-context language modeling. Published findings on efficient KV-cache management under memory-constrained inference.",
    tags: ["Research", "Transformers", "FlashAttention", "Python"],
    type: "research",
  },
  {
    period: "2022 — 2023",
    role: "Computer Vision Engineer",
    org: "Perception Systems Lab",
    description:
      "Built real-time object detection pipelines for autonomous navigation. Optimized YOLO variants for embedded deployment achieving 30fps on edge hardware.",
    tags: ["OpenCV", "TensorRT", "ONNX", "C++"],
    type: "experience",
  },
  {
    period: "2019 — 2023",
    role: "B.Tech in Computer Science",
    org: "Institute of Technology",
    description:
      "Specialized in machine learning and systems programming. Graduated with honors, thesis on federated learning for privacy-preserving medical AI.",
    tags: ["Honors", "Federated Learning", "Research Thesis"],
    type: "education",
  },
];

const techStack = [
  { category: "Frameworks", items: ["PyTorch", "TensorFlow", "JAX", "Hugging Face"] },
  { category: "Infrastructure", items: ["Kubernetes", "Docker", "Ray", "Triton"] },
  { category: "Languages", items: ["Python", "C++", "CUDA", "Rust", "TypeScript"] },
  { category: "Research", items: ["Transformers", "Diffusion", "RL", "GNNs"] },
];

function TimelineEntry({
  item,
  i,
  progress,
}: {
  item: TimelineItem;
  i: number;
  progress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const typeColors: Record<string, string> = {
    experience: "rgba(0,229,255,0.5)",
    research: "rgba(180,120,255,0.5)",
    education: "rgba(255,200,100,0.5)",
  };
  const color = typeColors[item.type];
  const start = 0.1 + i * 0.14;
  const entryProgress = useTransform(progress, [start, start + 0.22], [0, 1], { clamp: true });
  const opacity = useTransform(entryProgress, [0, 0.2, 1], [0, 1, 1]);
  const x = useTransform(entryProgress, [0, 1], ["-60px", "0px"]);
  const lift = useTransform(entryProgress, [0, 1], ["18px", "0px"]);

  return (
    <motion.div
      className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 border-b border-white/[0.04] group"
      style={{
        opacity,
        x: shouldReduceMotion ? "0px" : x,
        y: shouldReduceMotion ? "0px" : lift,
      }}
    >
      <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3">
        <div
          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 md:hidden"
          style={{ background: color }}
        />
        <div>
          <p className="font-mono text-xs text-white/20 tracking-widest mb-2">{item.period}</p>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color }}>
            {item.type}
          </p>
        </div>
      </div>

      <div className="md:col-span-9">
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-px self-stretch flex-shrink-0 mt-1 hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
          />
          <div>
            <h3 className="font-heading text-2xl md:text-3xl text-white mb-1 tracking-tight group-hover:text-white/90 transition-colors">
              {item.role}
            </h3>
            <p className="font-sans text-sm text-white/30 mb-4">{item.org}</p>
            <p className="font-sans text-sm md:text-base text-white/40 leading-relaxed mb-6 max-w-xl">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 border border-white/[0.06] text-white/20 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useCinematicScroll();
  const [sectionRange, setSectionRange] = useState({ start: 0, end: 1 });

  useEffect(() => {
    const updateRange = () => {
      const section = sectionRef.current;
      if (!section) return;

      const start = section.offsetTop - window.innerHeight * 0.85;
      const end = section.offsetTop + section.offsetHeight - window.innerHeight * 0.15;
      setSectionRange({ start, end: Math.max(end, start + 1) });
    };

    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const sectionProgress = useTransform(scrollY, [sectionRange.start, sectionRange.end], [0, 1], {
    clamp: true,
  });

  const sectionOpacity = useTransform(sectionProgress, [0, 0.08, 0.86, 1], [0, 1, 1, 0]);
  const sectionLift = useTransform(sectionProgress, [0, 1], ["1%", "-3%"]);
  const lineScaleY = useTransform(sectionProgress, [0, 1], [0, 1]);
  const headerOpacity = useTransform(sectionProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0]);
  const stackOpacity = useTransform(sectionProgress, [0.56, 0.74, 1], [0, 1, 0.9]);

  return (
    <ParallaxLayer speed={0.9} className="-mt-[10vh]">
      <div ref={sectionRef} className="relative w-full" style={{ position: "relative" }}>
        <motion.section
          className="relative w-full py-32 md:py-48 bg-transparent"
          style={{
            opacity: shouldReduceMotion ? 1 : sectionOpacity,
            y: shouldReduceMotion ? "0%" : sectionLift,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.04), transparent)" }}
          />

          <Container className="max-w-6xl">
            <div className="relative" style={{ position: "relative" }}>
              <motion.div
                className="hidden md:block absolute left-6 top-8 bottom-8 w-px bg-white/[0.03] pointer-events-none origin-top"
                style={{ scaleY: shouldReduceMotion ? 1 : lineScaleY }}
              />

              <motion.div className="mb-24" style={{ opacity: shouldReduceMotion ? 1 : headerOpacity }}>
                <MetadataBlock className="mb-4 opacity-30">/// SYSTEMS_HISTORY</MetadataBlock>
                <h2 className="font-heading text-5xl md:text-6xl text-white leading-tight tracking-tight">
                  Experience<br />
                  <span className="italic opacity-60">& Systems</span>
                </h2>
              </motion.div>

              <div>
                {timeline.map((item, i) => (
                  <TimelineEntry key={item.role} item={item} i={i} progress={sectionProgress} />
                ))}
              </div>
            </div>

            <motion.div style={{ opacity: shouldReduceMotion ? 1 : stackOpacity }}>
              <div className="mt-24 md:mt-32">
                <MetadataBlock className="mb-12 text-cyan-glow">/// TECHNICAL_STACK</MetadataBlock>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {techStack.map((group) => (
                    <div key={group.category}>
                      <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20 mb-4">
                        {group.category}
                      </p>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="font-sans text-sm text-white/40 hover:text-white/60 transition-colors duration-300"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Container>
        </motion.section>
      </div>
    </ParallaxLayer>
  );
}