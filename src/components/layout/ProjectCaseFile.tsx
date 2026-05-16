"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/motion/FadeIn";
import { HoverGlow } from "@/components/interaction/HoverGlow";
import { MetadataBlock } from "@/components/core/MetadataBlock";

interface ProjectCaseFileProps {
  id: string;
  title: string;
  fascination: string;
  architecture: string;
  technicalDepth: string;
  reflection: string;
  index: number;
}

export function ProjectCaseFile({
  id,
  title,
  fascination,
  architecture,
  technicalDepth,
  reflection,
  index,
}: ProjectCaseFileProps) {
  return (
    <div className="relative w-full py-32 md:py-48 border-b border-white/5 group">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        {/* Left Column: Metadata & Title */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-start">
          <FadeIn direction="up">
            <MetadataBlock className="mb-8 opacity-40">
              EXPERIMENT_{index.toString().padStart(3, "0")} / {id}
            </MetadataBlock>
            <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-12 leading-[1.1] tracking-tight">
              {title}
            </h3>
            
            <div className="pl-0 border-l-0 md:pl-6 md:border-l border-white/10 hidden lg:block">
              <MetadataBlock className="mb-4 text-white opacity-80">Human Reflection</MetadataBlock>
              <p className="text-text-primary text-xl md:text-2xl font-heading leading-relaxed italic opacity-90">
                "{reflection}"
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Deep Dive & Technical Credibility */}
        <div className="md:col-span-12 lg:col-span-7 flex flex-col space-y-24 mt-12 lg:mt-0">
          <FadeIn direction="up" delay={0.1}>
            <div className="pl-0 lg:pl-12">
              <MetadataBlock className="mb-6 text-cyan-glow">The Fascination</MetadataBlock>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-sans max-w-2xl">
                {fascination}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="pl-0 lg:pl-12">
              <MetadataBlock className="mb-6">System Architecture</MetadataBlock>
              <HoverGlow className="p-8 md:p-12 bg-carbon/30 border border-white/5 rounded-sm backdrop-blur-md">
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-mono">
                  {architecture}
                </p>
              </HoverGlow>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="pl-0 lg:pl-12">
              <MetadataBlock className="mb-6">Technical Exploration</MetadataBlock>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-sans max-w-2xl">
                {technicalDepth}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="pl-0 lg:pl-12 mt-8">
              <div className="border-t border-b border-white/10 py-6 bg-carbon/20">
                <MetadataBlock className="mb-4 font-bold text-white/50">ENGINEERING_RATIONALE</MetadataBlock>
                <ul className="text-text-secondary text-sm font-mono space-y-3 max-w-2xl opacity-80 list-decimal pl-4">
                  <li className="pl-2">Architecture Tradeoff: Latency (p99 45ms) prioritized over parameter scale. Dropped from 7B to 3B.</li>
                  <li className="pl-2">Memory Rationale: Strict 8GB VRAM constraint required KV-cache offloading via custom CUDA kernel.</li>
                  <li className="pl-2">Optimization: FlashAttention-2 integration yielded a 3.4x throughput increase during long-context generation.</li>
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Mobile-only Reflection */}
          <FadeIn direction="up" delay={0.5} className="block lg:hidden">
            <div className="pl-0 border-l-0 border-white/10 mt-12">
              <MetadataBlock className="mb-4 text-white opacity-80">Human Reflection</MetadataBlock>
              <p className="text-text-primary text-xl md:text-2xl font-heading leading-relaxed italic opacity-90">
                "{reflection}"
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
