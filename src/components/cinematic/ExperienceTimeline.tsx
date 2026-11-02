"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";

export default function ExperienceTimeline() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative section-gap">
      <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
        <SectionHeader
          eyebrow="Experience"
          title="Career & Education"
          statement="From research foundations to production systems — how I build, learn, and ship."
        />

        {/* Timeline */}
        <div className="relative mt-14 flex flex-col gap-10 md:mt-20 md:gap-12">
          {/* Vertical rail */}
          <div
            className="absolute left-1.5 top-0 bottom-0 w-px md:left-[10rem]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(186,215,247,0.16), rgba(102,58,243,0.35), rgba(186,215,247,0.16))",
            }}
            aria-hidden="true"
          />

          {experience.map((item, index) => {
            const isWork = item.type === "work";

            return (
              <motion.div
                key={item.org + item.role}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative grid grid-cols-1 gap-7 md:grid-cols-12 md:gap-10"
              >
                {/* Node dot */}
                <span
                  className="absolute left-1.5 top-2 h-[3px] w-[3px] -translate-x-1/2 rounded-full md:left-[10rem]"
                  style={{
                    background: isWork ? "rgba(102,58,243,0.9)" : "rgba(186,215,247,0.5)",
                    boxShadow: isWork
                      ? "0 0 10px rgba(102,58,243,0.6)"
                      : "none",
                  }}
                  aria-hidden="true"
                />

                {/* Identity */}
                <div className="flex flex-col gap-2 pl-8 md:col-span-4 md:pl-0 md:pr-10 md:text-right">
                  <span className="eyebrow !text-[10px]">
                    {isWork ? "WORK" : "EDUCATION"} · {index + 1}
                  </span>
                  <h3 className="font-heading text-xl font-medium leading-tight text-ice-highlight md:text-2xl">
                    {item.role}
                  </h3>
                  <p className="font-mono text-[11px] tracking-widest uppercase text-moon-mist">
                    {item.org}
                  </p>
                  <p
                    className="font-mono text-[10px] tracking-widest uppercase"
                    style={{
                      color: isWork ? "rgba(216,236,248,0.7)" : "rgba(157,167,186,0.7)",
                    }}
                  >
                    {item.period}
                  </p>
                </div>

                {/* Narrative */}
                <div className="md:col-span-8">
                  <div className="glass-card hairline flex flex-col gap-5 p-6 md:p-7">
                    <p className="font-sans text-sm leading-relaxed text-frost-glow/80">
                      {item.description}
                    </p>
                    {[
                      { label: "Challenge", value: item.challenge },
                      { label: "Approach", value: item.approach },
                      { label: "Impact", value: item.impact, highlight: true },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className="flex flex-col gap-1">
                        <span
                          className="font-mono text-[9px] tracking-widest uppercase"
                          style={{
                            color: highlight
                              ? isWork
                                ? "rgba(102,58,243,0.9)"
                                : "rgba(216,236,248,0.8)"
                              : "rgba(157,167,186,0.8)",
                          }}
                        >
                          {label}
                        </span>
                        <p className="font-sans text-sm leading-relaxed text-moon-mist">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Credentials */}
        <div className="mt-16 md:mt-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="eyebrow whitespace-nowrap">Credentials</span>
              <span
                className="h-px flex-1"
                style={{ background: "rgba(186,215,247,0.08)" }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <div
                  key={cert.credentialId}
                  className="glass-card hairline flex flex-col gap-2 p-5"
                >
                  <span className="eyebrow !text-[9px]">{cert.issuer}</span>
                  <h4 className="font-heading text-base font-medium leading-snug text-ice-highlight">
                    {cert.name}
                  </h4>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-fog-veil/70">
                    {`${cert.date} // ${cert.credentialId}`}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}