"use client";

import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "./ParallaxLayer";
import { FadeIn } from "@/motion/FadeIn";
import { certifications } from "@/content/certifications";

export default function CertificationsGrid() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent z-10" style={{
      background: 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.94) 6%, rgba(5,5,5,0.94) 94%, rgba(5,5,5,0) 100%)'
    }}>
      <ParallaxLayer speed={0.95}>
        <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
          <div className="flex flex-col gap-16 md:gap-24">
            <FadeIn>
              <div className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                /// 05 / CREDENTIALS
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {certifications.map((cert, index) => {
                const isFirst = index === 0;

                return (
                  <FadeIn
                    key={index}
                    delay={index * 0.12}
                    className={isFirst ? "md:col-span-2" : "col-span-1"}
                  >
                    <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                      <div className="font-mono text-[10px] tracking-widest text-[#00E5FF] uppercase">
                        {cert.issuer}
                      </div>
                      <h3 className="font-heading text-lg text-[#F5F5F5]">{cert.name}</h3>
                      <div className="font-mono text-[10px] text-[#8A8A8A] uppercase">
                        {cert.date} // {cert.credentialId}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </Container>
      </ParallaxLayer>
    </section>
  );
}
