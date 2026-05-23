"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { projects } from "@/content/projects";
import { entrance } from "@/systems/motion/presets";

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected Work"
      style={{
        paddingTop: "8rem",
        paddingBottom: "4rem",
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "4rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4a4a52",
          }}
        >
          Selected Work
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#2e2e36",
          }}
        >
          {projects.length} Projects
        </p>
      </div>

      {/* Project list — each item self-triggers inView */}
      <div>
        {projects.map((project, i) => (
          <ProjectItem key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectItem({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (imageWrapRef.current) {
      imageWrapRef.current.style.transform = "scale(1.025)";
    }
  };

  const handleMouseLeave = () => {
    if (imageWrapRef.current) {
      imageWrapRef.current.style.transform = "scale(1)";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={entrance(index * 0.06)}
      style={{
        paddingTop: "3.5rem",
        paddingBottom: "3.5rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Row: number + title + links */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "260px" }}>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.4rem, 3vw, 2.25rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#e8e6e1",
              marginBottom: "0.75rem",
            }}
          >
            {project.title}
          </h2>

          {/* Outcome metric — accent color (1 of 3 uses) */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.04em",
              color: "#c8b89a",
              marginBottom: "1rem",
            }}
          >
            ↑ {project.metric}
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "#4a4a52",
              maxWidth: "52ch",
              fontWeight: 300,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            alignItems: "flex-end",
            flexShrink: 0,
            paddingTop: "0.25rem",
          }}
        >
          <ProjectLink href={project.liveUrl} label="Live →" />
          <ProjectLink href={project.githubUrl} label="GitHub" dim />
        </div>
      </div>

      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: "3px",
          background: "#0c0c10",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          ref={imageWrapRef}
          style={{
            position: "absolute",
            inset: 0,
            transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} — project preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            style={{ objectFit: "cover", opacity: 0.8 }}
            loading={index === 0 ? "eager" : "lazy"}
            onError={() => {/* fallback handled by bg */}}
          />
        </div>

        {/* Tags — bottom left */}
        <div
          aria-label="Technologies"
          style={{
            position: "absolute",
            bottom: "0.875rem",
            left: "0.875rem",
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
            zIndex: 1,
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(232, 230, 225, 0.35)",
                background: "rgba(10, 10, 15, 0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "0.2rem 0.45rem",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectLink({
  href,
  label,
  dim = false,
}: {
  href: string;
  label: string;
  dim?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: dim ? "#2e2e36" : "#4a4a52",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "#e8e6e1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = dim ? "#2e2e36" : "#4a4a52";
      }}
    >
      {label}
    </a>
  );
}
