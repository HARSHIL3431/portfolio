"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconTile } from "@/components/ui/IconTile";

/* ─── Capability cards — real expertise merged with skill domains ── */
const CAPABILITY_CARDS = [
  {
    title: "Machine Learning Engineering",
    description:
      "End-to-end ML pipelines — from data preprocessing to model deployment at scale.",
    tags: ["Python", "TensorFlow", "FastAPI", "scikit-learn"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Computer Vision",
    description:
      "Perception systems that see, detect, and understand the visual world.",
    tags: ["OpenCV", "EasyOCR", "Object Detection", "Image Processing", "OCR"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Deep Learning",
    description:
      "LSTM, CNN, and transformer architectures for sequence and visual tasks.",
    tags: ["LSTM", "CNNs", "PyTorch", "Keras", "TensorFlow"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="6" y="18" width="12" height="4" rx="1" />
        <path d="M8 7v3m8-3v3M10 15v3m4-3v3" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Applications",
    description:
      "Full-stack AI apps integrating LLMs, APIs, and conversational interfaces.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "WebGL",
      "Framer Motion",
      "FastAPI",
      "Claude API",
      "LLMs",
      "NLP",
      "Intent Classification",
      "PostgreSQL",
      "Docker",
      "Git",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function ExpertiseSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative section-gap">
      <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
        <SectionHeader
          eyebrow="Expertise"
          title="What I Build"
          statement="Machine learning, perception, language, and production systems — engineered to ship."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          {CAPABILITY_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 28 }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 1, y: 0 }
              }
              viewport={{ once: false, margin: "-15%" }}
              transition={{
                duration: 0.7,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card hairline group flex flex-col gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(199,211,234,0.18),inset_0_24px_48px_rgba(186,215,247,0.06),0_28px_40px_rgba(6,6,14,0.8)] md:p-7"
            >
              <div className="flex items-center gap-4">
                <IconTile size={48}>{card.icon}</IconTile>
                <h3 className="font-heading text-lg font-medium leading-tight text-ice-highlight">
                  {card.title}
                </h3>
              </div>

              <p className="font-sans text-sm leading-relaxed text-moon-mist">
                {card.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}