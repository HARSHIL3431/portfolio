"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const TERMINAL_LINES = [
  { text: "> ESTABLISHING_SECURE_CONNECTION...", color: "rgba(138,138,138,0.8)" },
  { text: "> HANDSHAKE_COMPLETE", color: "rgba(0,229,255,0.7)" },
  { text: "> AWAITING_INPUT", color: "rgba(138,138,138,0.6)" },
  { text: "", color: "" },
  { text: "> CONTACT.PROTOCOL / v2.4.1", color: "rgba(0,229,255,0.5)" },
];

function TerminalOutput({ lines, revealed }: { lines: typeof TERMINAL_LINES; revealed: number }) {
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
          <span style={{ color: "rgba(0,229,255,0.5)" }}>&gt; _</span>
          <span className="w-2 h-4 inline-block" style={{ background: "rgba(0,229,255,0.35)", animation: "blink 1s steps(2,start) infinite" }} />
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
            scrub: 1.4,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Reveal terminal lines progressively
              const lineCount = Math.floor(self.progress * TERMINAL_LINES.length * 1.8);
              setTerminalLines(Math.min(lineCount, TERMINAL_LINES.length + 1));
            },
          },
        });

        // Fade in scene
        tl.fromTo(stickyRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);

        // Ambient glow
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4 },
          0.05
        );

        // Headline sweeps in
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
          0.1
        );

        // Terminal block
        tl.fromTo(
          terminalRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.25 },
          0.3
        );

        // Form
        tl.fromTo(
          formRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 },
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
      style={{ height: "260vh" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden w-full flex flex-col justify-center"
        style={baseStyle}
      >
        {/* Atmospheric glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 70% at 50% 60%, rgba(0,229,255,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }}
        />

        <Container className="max-w-4xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="flex flex-col gap-12 w-full">
            <div className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
              /// 06 / ESTABLISH CONNECTION
            </div>

            <h2
              ref={headlineRef}
              className="font-heading text-6xl md:text-7xl leading-none text-white"
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            >
              Let&apos;s Build<br />
              <span className="italic opacity-70">Something</span>
            </h2>

            <div className="flex flex-col gap-10">
              {/* Terminal block */}
              <div
                ref={terminalRef}
                className="border border-white/5 p-5 max-w-lg"
                style={{
                  background: "rgba(5,5,5,0.6)",
                  backdropFilter: "blur(8px)",
                  opacity: shouldReduceMotion ? 1 : 0,
                }}
              >
                <TerminalOutput lines={TERMINAL_LINES} revealed={terminalLines} />
              </div>

              {/* Contact form */}
              <form
                ref={formRef}
                className="flex flex-col gap-7 w-full max-w-xl"
                style={{ opacity: shouldReduceMotion ? 1 : 0 }}
                onSubmit={(e) => e.preventDefault()}
              >
                {[
                  { label: "NAME", type: "text", id: "contact-name" },
                  { label: "SIGNAL ADDRESS / EMAIL", type: "email", id: "contact-email" },
                ].map(({ label, type, id }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label
                      htmlFor={id}
                      className="font-mono text-[10px] tracking-widest text-white/30 uppercase"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      className="w-full bg-transparent border-b py-3 font-sans text-base text-white outline-none transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10px] tracking-widest text-white/30 uppercase"
                  >
                    TRANSMISSION / MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    className="w-full bg-transparent border-b py-3 font-sans text-base text-white outline-none transition-colors resize-none"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  className="w-full py-5 mt-4 font-mono text-xs tracking-widest uppercase relative overflow-hidden group"
                  style={{ border: "1px solid rgba(0,229,255,0.2)", color: "#fff" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 24px rgba(0,229,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="relative z-10">INITIATE_COMMUNICATION →</span>
                  {/* Scan line hover effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to right, rgba(0,229,255,0.03), transparent)" }}
                  />
                </button>
              </form>

              {/* Social links */}
              <div
                ref={linksRef}
                className="flex flex-wrap gap-8 pt-8 border-t border-white/5"
                style={{ opacity: shouldReduceMotion ? 1 : 0 }}
              >
                {[
                  { label: "GITHUB", href: "#" },
                  { label: "LINKEDIN", href: "#" },
                  { label: "TWITTER", href: "#" },
                  { label: "RESEARCH", href: "#" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="font-mono text-[10px] tracking-widest text-white/25 transition-colors duration-300 hover:text-cyan-glow"
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