"use client";

import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "./ParallaxLayer";
import { FadeIn } from "@/motion/FadeIn";

export default function NarrativeIntro() {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-center bg-transparent py-32 z-10">
      <ParallaxLayer speed={0.7}>
        <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
          <div className="flex flex-col gap-16 md:gap-24">
            <FadeIn>
              <div className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                /// 01 / IDENTITY
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              <div className="lg:col-span-7">
                <FadeIn delay={0.1}>
                  <h2 className="font-heading text-6xl md:text-8xl leading-none tracking-tighter text-[#F5F5F5] max-w-2xl">
                    The Mind <span className="italic opacity-80">Behind</span> the Machine
                  </h2>
                </FadeIn>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-8 md:gap-12 mt-4 lg:mt-0">
                <FadeIn delay={0.2}>
                  <p className="text-[#8A8A8A] font-sans text-base leading-relaxed max-w-2xl">
                    I engineer AI-driven systems that transform complex real-world workflows into intelligent, interactive experiences. Building these interfaces matters because true innovation requires bridging the gap between raw machine logic and intuitive human creativity.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p className="text-[#E8D5B0] font-sans text-base leading-relaxed italic max-w-2xl">
                    "There is a beautiful vulnerability in watching a system try to understand a world it has never touched."
                  </p>
                </FadeIn>

                <div className="flex flex-wrap gap-8 pt-8 mt-4 border-t border-white/5">
                  <FadeIn delay={0.4}>
                    <div className="border-l border-[#00E5FF]/40 pl-3 font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                      [03 PROJECTS]
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.5}>
                    <div className="border-l border-[#00E5FF]/40 pl-3 font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                      [AI SYSTEMS]
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.6}>
                    <div className="border-l border-[#00E5FF]/40 pl-3 font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                      [REMOTE]
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </ParallaxLayer>
    </section>
  );
}