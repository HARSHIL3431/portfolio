"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  CATEGORY_LABELS,
  projects,
  type Project,
  type ProjectCategory,
} from "@/content/projects";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

/* ─── Filters ─────────────────────────────────────────── */

type FilterValue = ProjectCategory | "all";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "AI / ML", value: "ai-ml" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Research", value: "research" },
  { label: "Full Stack", value: "full-stack" },
  { label: "Computer Vision", value: "computer-vision" },
];

function ProjectFilters({
  active,
  onChange,
}: {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
    >
      {FILTERS.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300",
              isActive
                ? "text-pure-white"
                : "text-moon-mist/70 hover:text-ice-highlight"
            )}
            style={
              isActive
                ? {
                    background: "rgba(102,58,243,0.18)",
                    boxShadow: "0 0 0 1px rgba(147,113,255,0.45) inset",
                  }
                : {
                    background: "rgba(199,211,234,0.04)",
                    boxShadow: "0 0 0 1px rgba(186,215,247,0.10) inset",
                  }
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Project Media (image with graceful fallback) ────── */

function ProjectMedia({ src, alt }: { src: string | null; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{
          aspectRatio: "16/9",
          background:
            "linear-gradient(135deg, rgba(35,38,62,0.4), rgba(22,33,62,0.2))",
        }}
      >
        <span className="px-4 text-center font-mono text-xs tracking-widest uppercase text-frost-glow/30">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16/9" }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        onError={() => setImgError(true)}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,6,15,0.6), transparent 55%)",
        }}
      />
    </div>
  );
}

/* ─── Screenshot gallery strip (detail view) ──────────── */

function GalleryStrip({ screenshots }: { screenshots: string[] }) {
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div
      className="flex gap-3 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      {screenshots.map((src, i) =>
        failed[i] ? (
          <div
            key={i}
            className="flex h-[68px] w-[108px] flex-shrink-0 items-center justify-center"
            style={{
              borderRadius: "6px",
              border: "1px solid rgba(186,215,247,0.08)",
              background: "rgba(186,215,247,0.02)",
            }}
          >
            <span className="font-mono text-[8px] text-frost-glow/25">
              SCREEN {i + 1}
            </span>
          </div>
        ) : (
          <img
            key={i}
            src={src}
            alt={`${src.split("/")[2] ?? "project"} screen ${i + 1}`}
            loading="lazy"
            className="h-[68px] w-[108px] flex-shrink-0 cursor-pointer object-cover transition-opacity duration-300 hover:opacity-80"
            style={{
              borderRadius: "6px",
              border: "1px solid rgba(186,215,247,0.08)",
            }}
            onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
          />
        )
      )}
    </div>
  );
}

/* ─── Compact Project Card ────────────────────────────── */

function ProjectCard({
  project,
  total,
  onOpen,
}: {
  project: Project;
  total: number;
  onOpen: (project: Project) => void;
}) {
  const accent = project.accentColor.text;

  const visibleTags = project.tags.slice(0, 3);
  const hiddenTagCount = project.tags.length - visibleTags.length;

  return (
    <article
      onClick={() => onOpen(project)}
      className="project-card glass-card hairline group relative flex h-full cursor-pointer flex-col overflow-hidden"
      style={{ "--card-accent": project.accentColor.line } as React.CSSProperties}
    >
      {/* Featured accent hairline */}
      {project.featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[1]"
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${project.accentColor.line} 40%, ${project.accentColor.line} 60%, transparent)`,
          }}
        />
      )}

      {/* Media */}
      <div className="relative w-full border-b" style={{ borderColor: "rgba(186,215,247,0.08)" }}>
        <ProjectMedia src={project.thumbnail} alt={project.title} />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="font-mono text-[9px] tracking-widest uppercase"
            style={{ color: accent }}
          >
            {CATEGORY_LABELS[project.category]}
          </span>
          {project.featured && (
            <span
              className="chip chip-sm"
              style={{ color: "#B8A6FF", background: "rgba(102,58,243,0.16)" }}
            >
              Featured
            </span>
          )}
          {project.needsReview && (
            <span
              className="chip chip-sm"
              style={{ color: "#E8C87C", background: "rgba(232,200,124,0.12)" }}
            >
              Pending Review
            </span>
          )}
          <span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-fog-veil/50">
            {project.id} / {total.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-medium leading-tight text-ice-highlight">
          {project.title}
        </h3>

        {/* Short description */}
        <p className="line-clamp-2 font-sans text-[13px] leading-relaxed text-moon-mist">
          {project.philosophy}
        </p>

        {/* Headline metric */}
        {project.metric && (
          <div className="flex items-baseline gap-2">
            <span
              className="font-mono text-base font-light tabular-nums"
              style={{ color: accent }}
            >
              {project.metric.value}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-fog-veil/60">
              {project.metric.label}
            </span>
          </div>
        )}

        {/* Technology tags */}
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span key={tag} className="chip chip-sm">
                {tag}
              </span>
            ))}
            {hiddenTagCount > 0 && (
              <span className="chip chip-sm text-fog-veil/70">
                +{hiddenTagCount}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div
          className="mt-auto flex items-center gap-3 border-t pt-3"
          style={{ borderColor: "rgba(186,215,247,0.08)" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-frost-glow/70 transition-colors duration-250 hover:text-ice-highlight"
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-frost-glow/70 transition-colors duration-250 hover:text-ice-highlight"
            >
              Demo ↗
            </a>
          )}
          <button
            type="button"
            aria-label={`View details for ${project.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-250"
            style={{ color: accent }}
          >
            Details
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── Project Detail Modal ────────────────────────────── */

function DetailSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[9px] tracking-widest uppercase text-fog-veil/50">
        {label}
      </span>
      {children}
    </div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const accent = project.accentColor.text;

  // Lock background scroll while open
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  // Focus management + Escape to close
  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain p-4 py-10 md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
      style={{ background: "rgba(3,4,10,0.82)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel hairline relative w-full max-w-3xl outline-none"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close project details"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm text-moon-mist/70 transition-colors duration-250 hover:text-ice-highlight"
          style={{
            background: "rgba(5,6,15,0.7)",
            boxShadow: "0 0 0 1px rgba(186,215,247,0.14) inset",
          }}
        >
          ✕
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          {/* Media */}
          {project.thumbnail && (
            <div className="border-b" style={{ borderColor: "rgba(186,215,247,0.08)" }}>
              <ProjectMedia src={project.thumbnail} alt={project.title} />
            </div>
          )}

          <div className="flex flex-col gap-7 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2 pr-10">
                <span
                  className="font-mono text-[9px] tracking-widest uppercase"
                  style={{ color: accent }}
                >
                  {CATEGORY_LABELS[project.category]}
                </span>
                <span className="chip chip-sm" style={{ color: "rgba(184,214,240,0.9)" }}>
                  ● {project.status}
                </span>
                {project.featured && (
                  <span
                    className="chip chip-sm"
                    style={{ color: "#B8A6FF", background: "rgba(102,58,243,0.16)" }}
                  >
                    Featured
                  </span>
                )}
                {project.needsReview && (
                  <span
                    className="chip chip-sm"
                    style={{ color: "#E8C87C", background: "rgba(232,200,124,0.12)" }}
                  >
                    Pending Review
                  </span>
                )}
                <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-fog-veil/50">
                  {project.id}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-widest uppercase text-fog-veil/60">
                  {project.subtitle}
                </span>
                <h3
                  id="project-detail-title"
                  className="font-heading text-2xl font-medium leading-tight text-ice-highlight md:text-3xl"
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Overview */}
            <DetailSection label="Overview">
              <p className="font-sans text-sm leading-relaxed text-moon-mist">
                {project.philosophy}
              </p>
            </DetailSection>

            {/* Metrics */}
            {(project.metric || project.metrics.length > 0) && (
              <DetailSection label="Key Metrics">
                <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                  {project.metric && (
                    <div className="flex flex-col gap-1">
                      <span
                        className="font-mono text-3xl font-light tabular-nums"
                        style={{ color: accent }}
                      >
                        {project.metric.value}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest uppercase text-fog-veil/70">
                        {project.metric.label}
                      </span>
                    </div>
                  )}
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="font-mono text-xl font-light tabular-nums text-frost-glow/80">
                        {m.value}
                      </span>
                      <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-fog-veil/60">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {/* Architecture */}
            {project.architecture && (
              <DetailSection label="Architecture">
                <p
                  className="rounded-lg p-4 font-mono text-[11px] leading-relaxed text-frost-glow/75"
                  style={{
                    background: "rgba(199,211,234,0.04)",
                    boxShadow: "0 0 0 1px rgba(186,215,247,0.08) inset",
                  }}
                >
                  {project.architecture}
                </p>
              </DetailSection>
            )}

            {/* Engineering rationale */}
            {project.rationale && (
              <DetailSection label="Engineering Rationale">
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Challenge", value: project.rationale.challenge },
                    { label: "Approach", value: project.rationale.approach },
                    { label: "Impact", value: project.rationale.impact, highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase"
                        style={{ color: highlight ? accent : "rgba(157,167,186,0.8)" }}
                      >
                        {label}
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-frost-glow/75">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {/* Tech stack */}
            {project.tags.length > 0 && (
              <DetailSection label="Tech Stack">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </DetailSection>
            )}

            {/* Screenshots */}
            {project.screenshots.length > 0 && (
              <DetailSection label="Screenshots">
                <GalleryStrip screenshots={project.screenshots} />
              </DetailSection>
            )}

            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 border-t pt-5" style={{ borderColor: "rgba(186,215,247,0.08)" }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  GitHub ↗
                </a>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-violet btn-sm"
                >
                  Live Demo →
                </a>
              ) : (
                <span
                  className="chip btn-sm cursor-default text-fog-veil/60"
                  title="Coming Soon"
                >
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────── */

export default function ResearchArchive() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="projects" className="relative section-gap">
      <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Work"
          statement="AI systems, applied machine learning, cybersecurity, and research — built to solve real problems."
        />

        <ProjectFilters active={activeFilter} onChange={setActiveFilter} />

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="min-w-0"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12%" }}
              transition={{
                duration: 0.7,
                delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProjectCard
                project={project}
                total={projects.length}
                onOpen={setSelectedProject}
              />
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Project detail view */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
