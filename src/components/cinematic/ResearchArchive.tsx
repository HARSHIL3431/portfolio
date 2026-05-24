"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "./ParallaxLayer";
import { HoverGlow } from "@/components/interaction/HoverGlow";
import { projects } from "@/content/projects";

function ProjectCard({ project, className }: { project: (typeof projects)[0]; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HoverGlow>
        <div className="h-full p-8 md:p-12 border border-white/5 bg-[#050505]/40 flex flex-col justify-between overflow-hidden min-h-[400px]">
          <div className="relative z-10 flex flex-col gap-6">
            <div className="font-mono text-[10px] tracking-widest uppercase">
              <span className={project.status === "ACTIVE" ? "text-[#00E5FF]" : "text-[#8A8A8A]"}>
                {project.status}
              </span>
            </div>

            <div className="relative mt-4">
              <div className="absolute -top-12 -left-4 font-mono text-8xl opacity-[0.06] select-none pointer-events-none text-white">
                {project.id}
              </div>
              <h3 className="font-heading text-4xl md:text-5xl leading-tight text-[#F5F5F5] relative z-10">
                {project.title}
              </h3>
            </div>

            <p className="font-sans text-sm text-[#8A8A8A] leading-relaxed max-w-md mt-4">
              {project.philosophy}
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-widest uppercase border border-white/10 px-2 py-1 text-[#8A8A8A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-20 bg-[#050505]/95 p-8 md:p-12 flex flex-col justify-center border border-white/5"
              >
                <div className="font-mono text-[10px] tracking-widest uppercase text-[#8A8A8A] mb-8 border-b border-white/10 pb-4">
                  ENGINEERING_RATIONALE
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-white/40 block mb-2">
                      PROBLEM:
                    </span>
                    <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
                      {project.rationale.problem}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-white/40 block mb-2">
                      APPROACH:
                    </span>
                    <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
                      {project.rationale.approach}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#00E5FF]/60 block mb-2">
                      RESULT:
                    </span>
                    <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
                      {project.rationale.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </HoverGlow>
    </div>
  );
}

export default function ResearchArchive() {
  return (
    <section id="projects" className="relative w-full py-24 md:py-32 bg-transparent z-10">
      <ParallaxLayer speed={0.9}>
        <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
          <div className="flex flex-col gap-16 md:gap-24">
            <div className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
              /// 03 / PROJECTS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {projects.map((project, index) => {
                let colSpanClass = "md:col-span-12";
                if (index === 0) colSpanClass = "md:col-span-7";
                if (index === 1) colSpanClass = "md:col-span-5";

                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className={`col-span-1 ${colSpanClass}`}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </ParallaxLayer>
    </section>
  );
}