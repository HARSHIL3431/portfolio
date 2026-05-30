"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";

const TERMINAL_LINES = [
  { text: "> ESTABLISHING_SECURE_CONNECTION...", color: "rgba(138,138,138,0.7)" },
  { text: "> HANDSHAKE_COMPLETE", color: "rgba(0,212,240,0.6)" },
  { text: "> AWAITING_INPUT", color: "rgba(138,138,138,0.5)" },
  { text: "", color: "" },
  { text: "> CONTACT.PROTOCOL / v2.4.1", color: "rgba(0,212,240,0.4)" },
];

function TerminalOutput({
  lines,
  revealed,
}: {
  lines: typeof TERMINAL_LINES;
  revealed: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-mono text-xs tracking-wider transition-opacity duration-300"
          style={{ opacity: i < revealed ? 1 : 0, color: line.color }}
        >
          {line.text || "\u00A0"}
        </p>
      ))}
      {revealed >= lines.length && (
        <div className="flex items-center gap-2 mt-1">
          <span style={{ color: "rgba(0,212,240,0.4)" }}>&gt; _</span>
          <span
            className="w-2 h-4 inline-block"
            style={{
              background: "rgba(0,212,240,0.3)",
              animation: "blink 1s steps(2,start) infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function ContactTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [terminalLines, setTerminalLines] = useState(0);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldReduceMotion) {
      setTerminalLines(TERMINAL_LINES.length);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const trigger = sectionRef.current;
      if (!trigger) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: `+=${trigger.offsetHeight - window.innerHeight}`,
            scrub: SCRUB.contact,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const lineCount = Math.floor(
                self.progress * TERMINAL_LINES.length * 1.8
              );
              setTerminalLines(
                Math.min(lineCount, TERMINAL_LINES.length + 1)
              );
            },
          },
        });

        // Fade in scene
        tl.fromTo(
          stickyRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0
        );

        // Ambient glow
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.4 },
          0.05
        );

        // Headline — depth-shift
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.3,
            ease: GSAP_EASE.card,
          },
          0.1
        );

        // Terminal block
        tl.fromTo(
          terminalRef.current,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.25 },
          0.3
        );

        // Form
        tl.fromTo(
          formRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.28, ease: GSAP_EASE.card },
          0.45
        );

        // Footer links
        tl.fromTo(
          linksRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0.65
        );
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  const baseStyle = shouldReduceMotion ? {} : { opacity: 0 };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative"
      style={{
        height: "260vh",
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.97) 2%, rgba(5,5,5,0.97) 100%)',
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center"
        style={baseStyle}
      >
        {/* Atmospheric glow — intimate, darker mood */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 50% 55%, rgba(0,212,240,0.035) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }}
        />

        <Container className="max-w-4xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col gap-10 w-full">
            <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
              /// ESTABLISH CONNECTION
            </div>

            <h2
              ref={headlineRef}
              className="font-heading leading-[0.95] text-white"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                ...(shouldReduceMotion ? {} : { opacity: 0 }),
              }}
            >
              Let&apos;s Build
              <br />
              <span className="italic" style={{ opacity: 0.6 }}>
                Something
              </span>
            </h2>

            <div className="flex flex-col gap-9">
              {/* Terminal block */}
              <div
                ref={terminalRef}
                className="border border-white/5 p-5 max-w-lg"
                style={{
                  background: "rgba(5,5,5,0.5)",
                  backdropFilter: "blur(8px)",
                  opacity: shouldReduceMotion ? 1 : 0,
                }}
              >
                <TerminalOutput
                  lines={TERMINAL_LINES}
                  revealed={terminalLines}
                />
              </div>

              {/* Contact form */}
              <form
                ref={formRef}
                className="flex flex-col gap-6 w-full max-w-xl"
                style={{ opacity: shouldReduceMotion ? 1 : 0 }}
                onSubmit={(e) => e.preventDefault()}
              >
                {[
                  { label: "NAME", type: "text", id: "contact-name" },
                  {
                    label: "SIGNAL ADDRESS / EMAIL",
                    type: "email",
                    id: "contact-email",
                  },
                ].map(({ label, type, id }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label
                      htmlFor={id}
                      className="font-mono text-[9px] tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      className="w-full bg-transparent border-b py-3 font-sans text-sm text-white outline-none transition-colors duration-250"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(0,212,240,0.25)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.06)")
                      }
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[9px] tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    TRANSMISSION / MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    className="w-full bg-transparent border-b py-3 font-sans text-sm text-white outline-none transition-colors duration-250 resize-none"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(0,212,240,0.25)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.06)")
                    }
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  className="w-full py-4 mt-3 font-mono text-xs tracking-widest uppercase relative overflow-hidden group hover-lift"
                  style={{
                    border: "1px solid rgba(0,212,240,0.15)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,212,240,0.4)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(0,212,240,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,212,240,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="relative z-10">
                    INITIATE_COMMUNICATION →
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,212,240,0.025), transparent)",
                    }}
                  />
                </button>
              </form>

              {/* Social links — real URLs */}
              <div
                ref={linksRef}
                className="flex flex-wrap gap-8 pt-7 border-t border-white/5"
                style={{ opacity: shouldReduceMotion ? 1 : 0 }}
              >
                {[
                  {
                    label: "GITHUB",
                    href: "https://github.com/harshil3431",
                  },
                  {
                    label: "LINKEDIN",
                    href: "https://linkedin.com/in/harshil-patel",
                  },
                  {
                    label: "EMAIL",
                    href: "mailto:harshil3431@gmail.com",
                  },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-mono text-[9px] tracking-widest text-white/20 transition-colors duration-250 hover:text-cyan-glow focus-visible:text-cyan-glow"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}