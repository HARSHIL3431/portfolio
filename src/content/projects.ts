export interface Project {
  id: string;
  number: string;
  title: string;
  metric: string;
  description: string;
  tags: readonly string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "neural-canvas",
    number: "01",
    title: "Neural Canvas",
    metric: "3× faster inference via custom WebGL shader pipeline",
    description:
      "A real-time generative paint system mapping high-dimensional latent space vectors to fluid visual interfaces. Built with custom WebGL shader interpolation and dynamic diffusion control.",
    tags: ["React", "PyTorch", "WebGL"],
    liveUrl: "https://demo.neural-canvas.ai",
    githubUrl: "https://github.com/harshil3431/neural-canvas",
    image: "/images/neural_canvas.png",
  },
  {
    id: "vision-forge",
    number: "02",
    title: "VisionForge AI",
    metric: "30fps real-time inference on edge hardware",
    description:
      "High-performance perception engine compiling specialized vision models to WebAssembly for sub-millisecond edge deployment. Real-time frame classification without server dependency.",
    tags: ["Rust", "WebAssembly", "ONNX"],
    liveUrl: "https://demo.visionforge.ai",
    githubUrl: "https://github.com/harshil3431/vision-forge",
    image: "/images/vision_forge.png",
  },
  {
    id: "echomind",
    number: "03",
    title: "EchoMind",
    metric: "Zero-server private inference for 10K+ users",
    description:
      "An autonomous AI companion running quantized language models entirely in the browser sandbox. Uses P2P weight aggregation over WebRTC — no telemetry, no servers.",
    tags: ["Next.js", "Rust", "WebRTC"],
    liveUrl: "https://demo.echomind.ai",
    githubUrl: "https://github.com/harshil3431/echomind-assistant",
    image: "/images/echomind_assistant.png",
  },
] as const;
