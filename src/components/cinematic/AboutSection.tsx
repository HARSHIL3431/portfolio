"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconTile } from "@/components/ui/IconTile";

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : "show";

  return (
    <section id="about" className="relative section-gap">
      <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
        <motion.div
          variants={fadeUp}
          initial={initial}
          animate={animate}
          viewport={{ once: false, margin: "-15%" }}
          transition={shouldReduceMotion ? { duration: 0.01 } : undefined}
        >
          <SectionHeader
            eyebrow="About"
            title="Who I Am"
            statement="I am an AI & Machine Learning student passionate about building intelligent systems that solve real-world problems. Currently pursuing B.Tech in Artificial Intelligence and Machine Learning at CHARUSAT."
          />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* ─── Glass Identity / Engineering Card ─── */}
          <motion.div
            variants={fadeUp}
            initial={initial}
            animate={animate}
            viewport={{ once: false, margin: "-15%" }}
            className="lg:col-span-5"
          >
            <div className="glass-card hairline flex h-full flex-col gap-6 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <IconTile size={56}>
                  <span className="font-heading text-xl font-semibold text-ice-highlight">
                    HT
                  </span>
                </IconTile>
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-xl font-medium text-ice-highlight">
                    Harshil Thakkar
                  </span>
                  <span className="eyebrow !text-[10px] !tracking-[0.2em] text-moon-mist/80">
                    AI / ML Engineer
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map((area) => (
                  <span key={area} className="chip">
                    {area}
                  </span>
                ))}
              </div>

              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(186,215,247,0.12), transparent)",
                }}
              />

              <div className="flex flex-wrap items-center gap-5">
                <a
                  id="about-resume-btn"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  aria-label="Download Resume PDF"
                  className="btn btn-primary"
                >
                  Resume ↗
                </a>
                <div className="flex items-center gap-5">
                  {SOCIAL_LINKS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      title={label}
                      className="flex items-center gap-1.5 text-moon-mist/70 transition-colors duration-300 hover:text-ice-highlight"
                    >
                      {icon}
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Narrative — professional identity + personality ─── */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <motion.p
              variants={fadeUp}
              initial={initial}
              animate={animate}
              viewport={{ once: false, margin: "-15%" }}
              className="font-sans text-base leading-7 text-frost-glow/90 md:text-lg"
            >
              I design and build machine learning systems at the intersection of
              research and production engineering. My work spans perception,
              language, and real-time inference — I care about the moment when a
              model stops being a prototype and starts being something people
              rely on.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial={initial}
              animate={animate}
              viewport={{ once: false, margin: "-15%" }}
              className="border-l-2 pl-4 font-sans text-base italic leading-7 text-moon-mist"
              style={{ borderColor: "rgba(186,215,247,0.14)" }}
            >
              &ldquo;There is a beautiful vulnerability in watching a system try
              to understand a world it has never touched.&rdquo;
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial={initial}
              animate={animate}
              viewport={{ once: false, margin: "-15%" }}
              className="font-sans text-base leading-7 text-frost-glow/80"
            >
              I&apos;m drawn to problems where the constraints are interesting —
              low-latency inference on constrained hardware, diffusion models
              running in a browser, distributed training without the cloud. The
              next chapter is about making AI systems that are not just
              powerful, but trustworthy, transparent, and accessible.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial={initial}
              animate={animate}
              viewport={{ once: false, margin: "-15%" }}
              className="mt-2 flex flex-wrap gap-3 pt-6"
              style={{ borderTop: "1px solid rgba(186,215,247,0.08)" }}
            >
              {[
                { label: "03 PROJECTS", accent: true },
                { label: "AI SYSTEMS", accent: false },
                { label: "INDIA · REMOTE", accent: false },
              ].map(({ label, accent }) => (
                <span
                  key={label}
                  className="eyebrow !text-[10px]"
                  style={{
                    color: accent
                      ? "rgba(216,236,248,0.8)"
                      : "rgba(157,167,186,0.7)",
                  }}
                >
                  [{label}]
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}