"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { HoverGlow } from "@/components/interaction/HoverGlow";
import { MetadataBlock } from "@/components/core/MetadataBlock";
import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "./ParallaxLayer";
import { useCinematicScroll } from "@/providers/ScrollProvider";

interface Project {
  id: string;
  index: number;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status: string;
}

const projects: Project[] = [
  {
    id: "NEURAL_SYNTHESIS",
    index: 1,
    title: "Predictive Cognitive Models",
    tagline: "Mapping emotional resonance in latent space",
    description:
      "Transformer-based architecture utilizing dynamic latent space interpolation. Trained on 40TB of decentralized unstructured linguistic data to map emotional resonance under uncertainty.",
    tags: ["PyTorch", "Transformers", "CUDA", "Distributed Training"],
    status: "RESEARCH_ACTIVE",
  },
  {
    id: "VOID_PROTOCOL",
    index: 2,
    title: "Autonomous Edge Decisioning",
    tagline: "Isolated machine intelligence at the network periphery",
    description:
      "Quantized 7B parameter LLMs running entirely on low-power edge nodes. Utilizing a bespoke P2P protocol via WebRTC for asynchronous weight updates without central orchestration.",
    tags: ["INT4 Quantization", "WebRTC", "Edge AI", "Rust"],
    status: "DEPLOYED",
  },
  {
    id: "PHANTOM_SIGNAL",
    index: 3,
    title: "Multimodal Perceptual Engine",
    tagline: "Cross-modal understanding between vision and language",
    description:
      "End-to-end multimodal architecture bridging visual scene understanding with causal language generation. Achieves state-of-the-art on VQA benchmarks using novel cross-attention fusion.",
    tags: ["Vision Transformer", "CLIP", "Multimodal", "Python"],
    status: "EXPERIMENTAL",
  },
  {
    id: "ECHO_CHAMBER",
    index: 4,
    title: "Synthetic Data Fabrication",
    tagline: "Engineering artificial reality for model training",
    description:
      "Diffusion-based pipeline for generating photorealistic synthetic datasets at scale. Reduces annotation costs by 94% while maintaining distribution parity with real-world data.",
    tags: ["Stable Diffusion", "Data Engineering", "GAN", "MLOps"],
    status: "PRODUCTION",
  },
];

function ProjectCard({
  project,
  i,
  progress,
}: {
  project: Project;
  i: number;
  progress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const speed = [0.7, 0.9, 1, 0.95][i] ?? 1;
  const start = 0.12 + i * 0.12;
  const cardProgress = useTransform(progress, [start, start + 0.22], [0, 1], { clamp: true });
  const opacity = useTransform(cardProgress, [0, 0.2, 1], [0, 1, 1]);
  const y = useTransform(cardProgress, [0, 1], [`${24 + (1 - speed) * 16}px`, "0px"]);
  const scale = useTransform(cardProgress, [0, 1], [0.96, 1]);
  const blur = useTransform(cardProgress, [0, 1], ["blur(12px)", "blur(0px)"]);

  const statusColors: Record<string, string> = {
    RESEARCH_ACTIVE: "rgba(0,229,255,0.6)",
    DEPLOYED: "rgba(0,255,128,0.6)",
    EXPERIMENTAL: "rgba(255,200,0,0.6)",
    PRODUCTION: "rgba(180,120,255,0.6)",
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      style={{
        opacity,
        y,
        scale,
        filter: blur,
      }}
    >
      <HoverGlow
        className="group relative w-full rounded-sm overflow-hidden border border-white/[0.06] backdrop-blur-sm"
        style={{
          background: "rgba(10, 10, 12, 0.8)",
          ["--color-surface-border" as never]: "#FF5252",
        } as React.CSSProperties}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(to right, transparent, ${statusColors[project.status] ?? "rgba(0,229,255,0.4)"}, transparent)`,
          }}
        />

        <div className="p-8 md:p-12">
          <div className="flex items-start justify-between mb-8">
            <MetadataBlock className="opacity-30">
              EXPERIMENT_{project.index.toString().padStart(3, "0")} / {project.id}
            </MetadataBlock>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: statusColors[project.status] ?? "#fff" }}
              />
              <span
                className="font-mono text-[9px] tracking-[0.4em] uppercase"
                style={{ color: statusColors[project.status] ?? "#fff" }}
              >
                {project.status}
              </span>
            </div>
          </div>

          <h3 className="font-heading text-3xl md:text-4xl text-white mb-3 leading-tight tracking-tight group-hover:text-white/90 transition-colors duration-500">
            {project.title}
          </h3>
          <p className="font-sans text-sm text-white/30 italic mb-8 leading-relaxed">
            {project.tagline}
          </p>

          <p className="font-sans text-base text-white/40 leading-relaxed mb-10 max-w-prose">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 border border-white/[0.06] text-white/20 group-hover:border-white/10 group-hover:text-white/30 transition-all duration-500 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </HoverGlow>
    </motion.div>
  );
}

export function ResearchArchive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useCinematicScroll();
  const sectionProgress = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (currentScroll) => {
    const section = sectionRef.current;
    if (!section) return;

    const start = section.offsetTop - window.innerHeight * 0.8;
    const end = section.offsetTop + section.offsetHeight - window.innerHeight * 0.2;
    const progress = end <= start ? 0 : (currentScroll - start) / (end - start);
    sectionProgress.set(Math.max(0, Math.min(1, progress)));
  });

  const sectionOpacity = useTransform(sectionProgress, [0, 0.08, 0.84, 1], [0, 1, 1, 0]);
  const sectionLift = useTransform(sectionProgress, [0, 1], ["1%", "-3%"]);
  const headerOpacity = useTransform(sectionProgress, [0, 0.12, 0.8, 1], [0, 1, 1, 0]);
  const quoteOpacity = useTransform(sectionProgress, [0.48, 0.66, 0.96, 1], [0, 1, 1, 0]);

  return (
    <ParallaxLayer speed={0.85} className="-mt-[15vh]">
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
            <motion.div
              className="flex items-end justify-between mb-24 border-b border-white/[0.04] pb-12"
              style={{ opacity: shouldReduceMotion ? 1 : headerOpacity }}
            >
              <div>
                <MetadataBlock className="mb-4 text-cyan-glow">/// THE_RESEARCH_ARCHIVES</MetadataBlock>
                <h2 className="font-heading text-5xl md:text-6xl text-white leading-tight tracking-tight">
                  Selected<br />
                  <span className="italic opacity-60">Experiments</span>
                </h2>
              </div>
              <div className="hidden md:flex flex-col items-end gap-1">
                <span className="font-mono text-[9px] tracking-[0.4em] text-white/15 uppercase">
                  {projects.length} Projects
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/10 uppercase">
                  AI / ML Research
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {projects.map((project, i) => {
                const colClass =
                  i === 0 ? "lg:col-span-7" : i === 1 ? "lg:col-span-5" : i === 2 ? "lg:col-span-12" : "lg:col-span-6";

                return (
                  <div key={project.id} className={colClass}>
                    <ProjectCard project={project} i={i} progress={sectionProgress} />
                  </div>
                );
              })}
            </div>

            <motion.div
              className="mt-32 md:mt-48 flex justify-center"
              style={{ opacity: shouldReduceMotion ? 1 : quoteOpacity }}
            >
              <p className="font-heading italic text-xl md:text-2xl max-w-2xl text-center text-white/40 leading-relaxed">
                There is a beautiful vulnerability in watching a system try to understand a world
                it has never touched.
              </p>
            </motion.div>
          </Container>
        </motion.section>
      </div>
    </ParallaxLayer>
  );
}