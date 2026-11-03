export interface ExperienceEntry {
  type: "work" | "education";
  role: string;
  org: string;
  period: string;
  /** Optional employment type + work mode line (shown when provided). */
  meta?: string;
  description: string;
  challenge?: string;
  approach?: string;
  impact?: string;
}

export const experience: ExperienceEntry[] = [
  {
    type: "work" as const,
    role: "Team Manager",
    org: "DEZAI Technologies",
    period: "SEP 2026 — PRESENT",
    meta: "Internship · Remote",
    description:
      "Supporting team coordination, task management, and project execution at DEZAI Technologies. Working with team members to maintain clear communication, organize responsibilities, and support effective delivery.",
  },
  {
    type: "work" as const,
    role: "Operations Manager",
    org: "E-Cell, CHARUSAT",
    period: "AUG 2026 — PRESENT",
    meta: "Full-time · On-site",
    description:
      "Contributing to the operational planning and coordination of E-Cell activities at CHARUSAT. Supporting organizational workflows, team collaboration, and the execution of entrepreneurship-related initiatives.",
  },
  {
    type: "work" as const,
    role: "Campus Ambassador",
    org: "E-Cell, IIT Bombay",
    period: "JUN 2026 — PRESENT",
    meta: "Part-time · Remote",
    description:
      "Selected as a Campus Ambassador for E-Cell IIT Bombay to promote entrepreneurship, innovation, and startup opportunities within the student community. Supporting outreach and student engagement initiatives.",
  },
  {
    type: "work" as const,
    role: "Data Science & Machine Learning Intern",
    org: "Synent Technologies",
    period: "APR 2026 — MAY 2026",
    description: "Production ML workflows, AI integration pipelines, and model optimization for practical application environments.",
    challenge: "Bridging the gap between experimental ML models and production-ready systems that handle real-world data at scale.",
    approach: "Designed end-to-end ML pipelines with automated data preprocessing, model versioning, and performance monitoring for continuous improvement.",
    impact: "Delivered production-grade AI integrations that reduced manual processing time and improved prediction reliability across deployment environments.",
  },
  {
    type: "education" as const,
    role: "B.Tech — Artificial Intelligence & Machine Learning",
    org: "CHARUSAT",
    period: "2024 — 2028 (Expected)",
    description: "Specialization in intelligent systems, computer vision, and AI design.",
    challenge: "Building deep technical foundations across the full spectrum of AI — from mathematical theory to practical implementation.",
    approach: "Combining rigorous coursework in ML, deep learning, and computer vision with hands-on project work and research exploration.",
    impact: "Developing expertise in perception systems, language models, and real-time inference — the building blocks of production AI.",
  },
];
