export const projects = [
  {
    id: "01",
    title: "Digital Expiry Tracker",
    philosophy: "Intelligent inventory management through computer vision and OCR pipelines.",
    tags: ["Computer Vision", "OCR", "Python", "FastAPI"],
    status: "ACTIVE",
    rationale: {
      problem: "Manual expiry monitoring in retail and household environments is error-prone and inefficient.",
      approach: "Dual OCR pipeline with image preprocessing and intelligent date extraction for real-world label recognition.",
      result: "Automated expiry tracking system with smart reminders, inventory monitoring, and AI-assisted scanning."
    }
  },
  {
    id: "02",
    title: "Navjeevan AI",
    philosophy: "Conversational agricultural intelligence for rural decision-making.",
    tags: ["LLMs", "NLP", "FastAPI", "Intent Classification"],
    status: "ACTIVE",
    rationale: {
      problem: "Farmers lack easy access to contextual agricultural guidance and government scheme information.",
      approach: "LLM-powered intent classification pipeline with structured retrieval and contextual response generation.",
      result: "AI farming assistant delivering localized, actionable agricultural guidance through conversational interaction."
    }
  },
  {
    id: "03",
    title: "AI Stock Analysis Dashboard",
    philosophy: "Explainable AI-assisted financial forecasting with interpretable decision support.",
    tags: ["LSTM", "TensorFlow", "Time-Series", "Explainable AI"],
    status: "ARCHIVED",
    rationale: {
      problem: "Most stock prediction systems lack interpretability and meaningful decision support.",
      approach: "Combined LSTM forecasting with technical indicators and explainable signal reasoning.",
      result: "Interactive financial intelligence dashboard with AI-assisted trend analysis and contextual recommendations."
    }
  }
];
