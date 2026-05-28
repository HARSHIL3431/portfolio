"use client";

import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "./ParallaxLayer";
import { FadeIn } from "@/motion/FadeIn";
import { skills } from "@/content/skills";

export default function TechStack() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent z-10" style={{
      background: 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.94) 6%, rgba(5,5,5,0.94) 94%, rgba(5,5,5,0) 100%)'
    }}>
      <ParallaxLayer speed={0.94}>
        <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
          <div className="flex flex-col gap-16 md:gap-24">
            <FadeIn>
              <div className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                /// 02 / CAPABILITIES
              </div>
            </FadeIn>

            <div className="flex flex-col">
              {skills.map((skillGroup, index) => (
                <FadeIn key={skillGroup.category} delay={index * 0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline py-6 border-t border-white/5">
                    <div className="md:col-span-4">
                      <h3 className="font-heading text-xl text-[#F5F5F5]">
                        {skillGroup.category}
                      </h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="font-mono text-sm text-[#8A8A8A] leading-relaxed">
                        {skillGroup.items.join("   ")}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </ParallaxLayer>
    </section>
  );
}
