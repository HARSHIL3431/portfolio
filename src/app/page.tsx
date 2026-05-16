import { CinematicSection } from "@/components/layout/CinematicSection";
import { NarrativeSection } from "@/components/layout/NarrativeSection";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/motion/FadeIn";
import { MetadataBlock } from "@/components/core/MetadataBlock";
import { ProjectCaseFile } from "@/components/layout/ProjectCaseFile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <CinematicSection className="min-h-screen items-start justify-center">
        <Container className="max-w-6xl relative z-10 flex flex-col justify-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center">
            
            <div className="md:col-span-12 lg:col-span-10 flex flex-col">
              <FadeIn delay={0.6} direction="up">
                <MetadataBlock className="mb-16 opacity-40">
                  SYSTEM_INITIALIZED_ // {new Date().getFullYear()}
                  <br />
                  ARCHIVE_STATUS: ACTIVE
                </MetadataBlock>
              </FadeIn>

              <FadeIn delay={1.0} direction="up">
                <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-[0.85] mb-16 text-white mix-blend-difference">
                  Architecting
                  <br />
                  <span className="italic opacity-80 pl-0 md:pl-24">Intelligence</span>
                </h1>
              </FadeIn>

              <FadeIn delay={1.4} direction="up">
                <div className="max-w-2xl pl-0 md:pl-24">
                  <p className="text-text-secondary font-sans text-lg md:text-xl leading-relaxed">
                    I explore the fragile boundaries between machine logic and human intuition. 
                    This archive documents my experiments in building systems that don't just compute, 
                    but comprehend.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </CinematicSection>

      <NarrativeSection>
        <Container className="max-w-6xl">
          <FadeIn direction="up">
            <div className="w-full flex justify-end">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary italic opacity-70 max-w-3xl text-right leading-tight">
                "True intelligence emerges when the system learns to interpret ambiguity, not just data."
              </h2>
            </div>
          </FadeIn>
        </Container>
      </NarrativeSection>

      <CinematicSection className="min-h-screen pt-32 pb-48 bg-obsidian">
        <Container className="max-w-6xl">
          <FadeIn direction="up">
            <MetadataBlock className="mb-32 text-cyan-glow">
              /// THE RESEARCH ARCHIVES
            </MetadataBlock>
          </FadeIn>

          <div className="flex flex-col">
            <ProjectCaseFile
              index={1}
              id="NEURAL_SYNTHESIS"
              title="Predictive Cognitive Models"
              fascination="I became fascinated by how the model interpreted ambiguity under failure conditions. When deprived of perfect data, what biases did it invent?"
              architecture="Transformer-based architecture utilizing dynamic latent space interpolation. Trained on 40TB of decentralized unstructured linguistic data to map emotional resonance."
              technicalDepth="The core engineering challenge was stabilizing the latent space during high-variance hallucination events. I implemented a custom KL-divergence penalty that clamped extreme gradient spikes without destroying the model's creative output."
              reflection="We spent months trying to teach the machine strict logic, only to realize its most profound outputs occurred when it attempted to hallucinate poetry."
            />

            <ProjectCaseFile
              index={2}
              id="VOID_PROTOCOL"
              title="Autonomous Edge Decisioning"
              fascination="What happens to an intelligent system when it is cut off from the central hive? I wanted to explore the boundaries of isolated machine survival."
              architecture="Quantized 7B parameter LLMs running entirely on low-power edge nodes. Utilizing a bespoke P2P protocol via WebRTC for asynchronous weight updates without central orchestration."
              technicalDepth="Achieving sub-100ms inference on consumer hardware required aggressive layer pruning and INT4 quantization. The network architecture uses a gossip protocol to share localized learnings, treating the swarm as a decentralized nervous system."
              reflection="Isolation breeds efficiency. The system didn't degrade; it adapted, forming a hauntingly minimal language to communicate with its peers."
            />
          </div>

          <div className="mt-48 w-full flex justify-center">
            <p style={{ color: "#E8D5B0" }} className="font-heading italic text-xl md:text-2xl max-w-2xl text-center opacity-80 leading-relaxed">
              There is a beautiful vulnerability in watching a system try to understand a world it has never touched.
            </p>
          </div>
        </Container>
      </CinematicSection>

      <NarrativeSection className="min-h-[50vh] justify-end pb-12 border-t-0">
        <Container className="max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <FadeIn direction="up" delay={0.2}>
              <h2 className="font-heading text-6xl md:text-8xl text-white mb-8">
                Establish <span className="italic opacity-60">Connection</span>
              </h2>
              <MetadataBlock className="opacity-50">
                AWAITING_INPUT_
              </MetadataBlock>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.4}>
              <a href="#" className="font-mono text-sm tracking-widest uppercase text-cyan-glow hover:opacity-70 transition-opacity">
                INITIATE_COMMUNICATION
              </a>
            </FadeIn>
          </div>
        </Container>
      </NarrativeSection>
    </main>
  );
}
