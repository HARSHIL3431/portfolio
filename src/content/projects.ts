export type ProjectCategory =
  | "ai-ml"
  | "cybersecurity"
  | "research"
  | "full-stack"
  | "computer-vision";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "ai-ml": "AI / ML",
  cybersecurity: "Cybersecurity",
  research: "Research",
  "full-stack": "Full Stack",
  "computer-vision": "Computer Vision",
};

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  /** Short one/two-line description shown on the card. */
  philosophy: string;
  category: ProjectCategory;
  /** Strongest projects — surfaced first with a subtle accent treatment. */
  featured?: boolean;
  /** Entry has placeholder content pending owner confirmation. */
  needsReview?: boolean;
  tags: string[];
  status: "ACTIVE" | "ARCHIVED";
  metric?: { value: string; label: string };
  accentColor: { primary: string; line: string; text: string };
  /** Engineering rationale — only where the source material states it. */
  rationale?: { challenge: string; approach: string; impact: string };
  /** Architecture / pipeline summary — condensed from project docs. */
  architecture?: string;
  github: string | null;
  demo: string | null;
  thumbnail: string | null;
  screenshots: string[];
  metrics: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: "01",
    title: "ThreatWeave",
    subtitle: "Security Anomaly Detection & Incident Intelligence",
    philosophy:
      "Network-flow anomaly detection with a frozen Isolation Forest pipeline, MITRE ATT&CK-grounded RAG, and LLM-generated incident explanations — ending in server-side PDF incident reports.",
    category: "cybersecurity",
    featured: true,
    tags: ["Python", "FastAPI", "Isolation Forest", "MITRE ATT&CK", "RAG", "Next.js"],
    status: "ACTIVE",
    metric: { value: "132", label: "Backend Tests" },
    accentColor: { primary: "rgba(255,110,110,0.08)", line: "rgba(255,110,110,0.35)", text: "#FF6E6E" },
    architecture:
      "Network flows → frozen Isolation Forest (E2 with_port) → severity bands → MITRE ATT&CK RAG → grounded LLM explanation → dashboard → server-side PDF incident report.",
    github: "https://github.com/HARSHIL3431/threatweave",
    demo: null,
    thumbnail: "/images/projects/threatweave.png",
    screenshots: [],
    metrics: [
      { value: "132", label: "Tests (87 unit + 45 integration)" },
      { value: "8", label: "Contract-Locked Routes" },
      { value: "PDF", label: "Incident Reports" },
    ],
  },
  {
    id: "02",
    title: "NOMOS",
    subtitle: "Agent Permission Governor",
    philosophy:
      "AI security infrastructure where agents never execute actions directly — server-side resource labels, request-hash-bound approvals, hard-deny rules, and hash-chained audit logging.",
    category: "cybersecurity",
    featured: true,
    tags: ["TypeScript", "AI Security", "LLM Agents", "Audit Logging", "Docker"],
    status: "ACTIVE",
    metric: { value: "200", label: "Held-out Benchmark Cases" },
    accentColor: { primary: "rgba(143,208,255,0.08)", line: "rgba(143,208,255,0.30)", text: "#8FD0FF" },
    architecture:
      "Server-side resource labels → session-bound taint → canonicalization → policy evaluation (hard-deny separate from risk scoring) → request-hash-bound approvals → isolated executor behind a Docker socket proxy → hash-chained audit log.",
    github: "https://github.com/HARSHIL3431/NOMOS",
    demo: null,
    thumbnail: "/images/projects/nomos.png",
    screenshots: [],
    metrics: [
      { value: "200", label: "Held-out Benchmark Cases" },
      { value: "Hard-Deny", label: "Policy Layer" },
    ],
  },
  {
    id: "03",
    title: "SignalTrace",
    subtitle: "AI-Assisted Pharmacovigilance Workspace",
    philosophy:
      "Decision-support workspace for investigating potential drug safety signals from official FDA FAERS reports — statistical detection, evidence exploration, and grounded AI explanations, always with qualified human review in the loop.",
    category: "ai-ml",
    featured: true,
    tags: ["Python", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "pandas", "Groq", "Gemini"],
    status: "ACTIVE",
    accentColor: { primary: "rgba(157,167,186,0.08)", line: "rgba(157,167,186,0.30)", text: "#9DA7BA" },
    architecture:
      "FDA FAERS drug-event reports → statistical signal detection (PRR, ROR, chi-square, report counts, reporting trends) → evidence exploration and supporting report inspection → case-quality assessment and duplicate triage → grounded AI evidence explanations (Groq) → deterministic regulatory review rules → document intelligence (Gemini) → human review and assessment workflow.",
    github: "https://github.com/HARSHIL3431/bob-ai-hackathon-visionx",
    demo: "https://signaltrace-five.vercel.app/",
    thumbnail: "/images/projects/signaltrace.png",
    screenshots: [],
    metrics: [],
  },
  {
    id: "04",
    title: "Navjeevan AI",
    subtitle: "Agricultural Intelligence Platform",
    philosophy:
      "Conversational AI that bridges the information gap for rural farmers — delivering localized, actionable agricultural guidance through natural language.",
    category: "ai-ml",
    featured: true,
    tags: ["LLMs", "NLP", "FastAPI", "Intent Classification"],
    status: "ACTIVE",
    metric: { value: "10K+", label: "Farmers Reached" },
    accentColor: { primary: "rgba(232,168,124,0.08)", line: "rgba(232,168,124,0.35)", text: "#E8A87C" },
    rationale: {
      challenge:
        "Farmers in rural regions lack easy access to contextual agricultural guidance, government scheme information, and timely crop advisories.",
      approach:
        "LLM-powered intent classification pipeline with structured retrieval, contextual response generation, and multi-lingual support for regional accessibility.",
      impact:
        "AI farming assistant delivering localized, actionable agricultural guidance through conversational interaction — democratizing expert knowledge.",
    },
    github: "https://github.com/HARSHIL3431/navjeevan-ai",
    demo: null,
    thumbnail: "/images/navjeevan-ai/thumbnail.png",
    screenshots: [
      "/images/navjeevan-ai/dashboard-1.png",
      "/images/navjeevan-ai/dashboard-2.png",
    ],
    metrics: [
      { value: "6", label: "Farmer Services" },
      { value: "5", label: "Structured Datasets" },
      { value: "2-Step", label: "AI Pipeline" },
    ],
  },
  {
    id: "05",
    title: "Digital Expiry Tracker",
    subtitle: "Intelligent Inventory Management",
    philosophy:
      "Computer vision and OCR pipelines that automate expiry monitoring — replacing error-prone manual processes with intelligent, real-time label recognition.",
    category: "computer-vision",
    tags: ["Computer Vision", "OCR", "Python", "FastAPI"],
    status: "ACTIVE",
    metric: { value: "95%", label: "Detection Accuracy" },
    accentColor: { primary: "rgba(0,212,240,0.10)", line: "rgba(0,212,240,0.45)", text: "#00D4F0" },
    rationale: {
      challenge:
        "Manual expiry monitoring in retail and household environments is error-prone, time-consuming, and scales poorly across thousands of SKUs.",
      approach:
        "Dual OCR pipeline with adaptive image preprocessing, intelligent date extraction, and contextual label parsing for real-world label recognition across varied packaging formats.",
      impact:
        "Automated expiry tracking system with smart reminders, real-time inventory monitoring, and AI-assisted scanning — reducing human error by orders of magnitude.",
    },
    github: "https://github.com/HARSHIL3431/digital-expiry-tracker",
    demo: "https://digital-expiry-tracker-api.onrender.com/",
    thumbnail: "/images/digital-expiry-tracker/thumbnail.png",
    screenshots: [
      "/images/digital-expiry-tracker/dashboard-1.png",
      "/images/digital-expiry-tracker/dashboard-2.png",
    ],
    metrics: [
      { value: "95%", label: "OCR Success" },
      { value: "3+", label: "Formats" },
      { value: "Dual", label: "OCR Pipeline" },
    ],
  },
  {
    id: "06",
    title: "Rakshak AI",
    subtitle: "AI Farm Protection System — TETRA036",
    philosophy:
      "AI-powered farm decision support that detects wildlife intrusion, assesses threat level, and recommends the safest non-lethal response — every recommendation comes with a human-readable explanation.",
    category: "computer-vision",
    tags: ["Python", "OpenCV", "YOLO", "Explainable AI", "PyTorch"],
    status: "ACTIVE",
    accentColor: { primary: "rgba(127,216,166,0.08)", line: "rgba(127,216,166,0.30)", text: "#7FD8A6" },
    rationale: {
      challenge:
        "Every year, thousands of farmers lose significant portions of their harvest to unexpected wildlife intrusion — CCTV, motion alarms, and animal detection still leave the farmer asking \"What should I do now?\".",
      approach:
        "A human-like reasoning pipeline — observation, context understanding, situation assessment, decision support, incident timeline — combining AI vision with contextual and spatial reasoning.",
      impact:
        "Transparent, explainable, non-lethal recommendations that keep the farmer in control — detection tells farmers what happened, Rakshak AI helps them decide what to do next.",
    },
    architecture:
      "Camera feed → AI vision module (detection, tracking, position) → field context (crop region, distance, time of day) → explainable decision engine → smart response engine → farmer recommendation → incident timeline log.",
    github: "https://github.com/HARSHIL3431/TETRA036",
    demo: null,
    thumbnail: "/images/projects/rakshak-ai.png",
    screenshots: [],
    metrics: [
      { value: "5-Stage", label: "Reasoning Pipeline" },
      { value: "Non-Lethal", label: "Response Policy" },
    ],
  },
  {
    id: "07",
    title: "CodeOracle",
    subtitle: "Legacy Codebase Explainer & Modernizer — Vision-X",
    philosophy:
      "Upload a legacy repo as a ZIP — deterministic AST parsing builds the code intelligence, then LLMs explain modules, generate tests with a coverage feedback loop, and score refactor risk.",
    category: "ai-ml",
    tags: ["Python", "FastAPI", "AST", "LLMs", "tree-sitter"],
    status: "ACTIVE",
    accentColor: { primary: "rgba(232,200,124,0.08)", line: "rgba(232,200,124,0.30)", text: "#E8C87C" },
    architecture:
      "ZIP ingestion (path-traversal safe) → language detection → AST parsing (Python ast + JavaScript tree-sitter) → repository analysis → AI explainer, test generator with coverage loop, and refactoring risk scorer → contract-locked job results.",
    github: "https://github.com/HARSHIL3431/hackorbit_CodeOracle_Vision-X",
    demo: "https://hackorbit-code-oracle-vision-x.vercel.app/",
    thumbnail: "/images/projects/codeoracle.png",
    screenshots: [],
    metrics: [
      { value: "3-Stage", label: "AI Pipeline" },
      { value: "Coverage", label: "Feedback Test Loop" },
    ],
  },
  {
    id: "08",
    title: "Rental Management ERP",
    subtitle: "Odoo-Style Equipment Rental — hackathon-odoo",
    philosophy:
      "High-performance equipment-rental ERP modeled on Odoo — role-based portals, atomic checkout transactions, and an overlap-based availability engine instead of static stock counters.",
    category: "full-stack",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    status: "ACTIVE",
    accentColor: { primary: "rgba(111,224,200,0.08)", line: "rgba(111,224,200,0.30)", text: "#6FE0C8" },
    architecture:
      "Next.js App Router + Prisma + PostgreSQL (Neon) — RBAC portals (customer / vendor / admin), atomic transactional checkout with idempotency checks, dynamic overlap availability engine, hourly/daily billing with configurable late-fee rules.",
    github: "https://github.com/HARSHIL3431/hackathon-odoo",
    demo: "https://hackathon-odoo-virid.vercel.app/",
    thumbnail: "/images/projects/rental-erp.png",
    screenshots: [],
    metrics: [
      { value: "3", label: "Role-Based Portals" },
      { value: "Atomic", label: "Checkout Engine" },
    ],
  },
  {
    id: "09",
    title: "AI Stock Analysis Dashboard",
    subtitle: "Explainable Financial Intelligence",
    philosophy:
      "Interpretable AI-assisted forecasting that doesn't just predict — it explains why. Making machine intelligence transparent for financial decision-making.",
    category: "ai-ml",
    tags: ["LSTM", "TensorFlow", "Time-Series", "Explainable AI"],
    status: "ARCHIVED",
    metric: { value: "3×", label: "Faster Analysis" },
    accentColor: { primary: "rgba(180,100,255,0.08)", line: "rgba(180,100,255,0.30)", text: "#B464FF" },
    rationale: {
      challenge:
        "Most stock prediction systems operate as black boxes — lacking interpretability and meaningful decision support for human analysts.",
      approach:
        "Combined LSTM forecasting with technical indicator analysis and explainable signal reasoning, surfacing the 'why' behind every prediction.",
      impact:
        "Interactive financial intelligence dashboard with AI-assisted trend analysis, contextual recommendations, and transparent decision rationale.",
    },
    github: "https://github.com/HARSHIL3431/stock-price-prediction-lstm",
    demo: null,
    thumbnail: "/images/stock-analysis/thumbnail.png",
    screenshots: [
      "/images/stock-analysis/dashboard-1.png",
      "/images/stock-analysis/dashboard-2.png",
    ],
    metrics: [
      { value: "10Y", label: "Historical Data" },
      { value: "60-Day", label: "Window" },
      { value: "2-Layer", label: "LSTM" },
    ],
  },
];
