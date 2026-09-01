"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GSAP_EASE, SCRUB } from "./cinematicMotion";
import { useOpacityFallback } from "@/hooks/useOpacityFallback";

const TERMINAL_LINES = [
  { text: "> ESTABLISHING_SECURE_CONNECTION...", color: "rgba(138,138,138,0.7)" },
  { text: "> HANDSHAKE_COMPLETE", color: "rgba(0,212,240,0.6)" },
  { text: "> READY", color: "rgba(0,212,240,0.4)" },
];

function TerminalOutput({
  lines,
  revealed,
}: {
  lines: typeof TERMINAL_LINES;
  revealed: number;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-mono text-[10px] tracking-wider transition-opacity duration-300"
          style={{ opacity: i < revealed ? 1 : 0, color: line.color }}
        >
          {line.text}
        </p>
      ))}
      {revealed >= lines.length && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span style={{ color: "rgba(0,212,240,0.4)" }}>&gt; _</span>
          <span
            className="w-1.5 h-3.5 inline-block"
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
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [terminalLines, setTerminalLines] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion() ?? false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("contact-name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("contact-email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("contact-message") as HTMLTextAreaElement)?.value.trim();

    const errors: Record<string, boolean> = {};
    if (!name) errors["contact-name"] = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors["contact-email"] = true;
    if (!message) errors["contact-message"] = true;

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
      window.open(`mailto:harshilthakkar3435@gmail.com?subject=${subject}&body=${body}`, "_self");
    }
  };

  useOpacityFallback(stickyRef, 800, shouldReduceMotion);

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
                self.progress * TERMINAL_LINES.length * 2.5
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

        // Left column
        tl.fromTo(
          leftRef.current,
          { opacity: 0, x: -20, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.3,
            ease: GSAP_EASE.card,
          },
          0.1
        );

        // Form
        tl.fromTo(
          formRef.current,
          { opacity: 0, y: 24, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.3,
            ease: GSAP_EASE.card,
          },
          0.25
        );
      });
    };

    init();
    return () => ctx?.revert();
  }, [shouldReduceMotion]);

  const baseStyle = shouldReduceMotion ? {} : { opacity: 0 };

  /* Shared input styles */
  const inputBaseClass =
    "w-full font-sans text-sm text-white outline-none transition-all duration-250 px-4 py-3";
  const inputBaseStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "2px",
  };
  const inputFocusStyle = {
    borderColor: "rgba(0,212,240,0.35)",
    background: "rgba(0,212,240,0.03)",
    boxShadow: "0 0 12px rgba(0,212,240,0.06)",
  };
  const inputBlurStyle = {
    borderColor: "rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    boxShadow: "none",
  };
  const inputErrorStyle = {
    borderColor: "rgba(255,100,100,0.35)",
    background: "rgba(255,100,100,0.03)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative"
      style={{
        height: "260vh",
        background:
          "linear-gradient(to bottom, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.97) 2%, rgba(5,5,5,0.97) 100%)",
      }}
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

        <Container className="max-w-7xl px-6 md:px-12 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ─── Left Column: Info ─── */}
            <div
              ref={leftRef}
              className="lg:col-span-5 flex flex-col gap-6"
              style={baseStyle}
            >
              <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
                /// GET IN TOUCH
              </div>

              <h2
                className="font-heading leading-[0.95] text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                Let&apos;s Build{" "}
                <span className="italic" style={{ opacity: 0.6 }}>
                  Something
                </span>
                <br />
                Together
              </h2>

              <p
                className="font-sans text-sm leading-relaxed max-w-md"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Interested in AI, machine learning, or building intelligent
                software? Drop me a message and I&apos;ll get back to you.
              </p>

              {/* Direct email */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
                  EMAIL
                </span>
                <a
                  href="mailto:harshilthakkar3435@gmail.com"
                  className="font-mono text-sm tracking-wide transition-colors duration-300 hover:text-cyan-glow"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  harshilthakkar3435@gmail.com
                </a>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-5 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {[
                  { label: "GITHUB", href: "https://github.com/HARSHIL3431" },
                  { label: "LINKEDIN", href: "https://linkedin.com/in/harshilthakkar-dev" },
                  { label: "RESUME", href: "/resume.pdf" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") || href.endsWith(".pdf")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    download={href.endsWith(".pdf") ? true : undefined}
                    className="font-mono text-[9px] tracking-widest text-white/35 transition-colors duration-250 hover:text-cyan-glow"
                  >
                    {label} ↗
                  </a>
                ))}
              </div>

              {/* Terminal accent — small decorative element */}
              <div
                className="border p-3 mt-2"
                style={{
                  borderColor: "rgba(255,255,255,0.05)",
                  background: "rgba(5,5,5,0.5)",
                  borderRadius: "2px",
                  maxWidth: "280px",
                }}
              >
                <TerminalOutput lines={TERMINAL_LINES} revealed={terminalLines} />
              </div>
            </div>

            {/* ─── Right Column: Contact Form ─── */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div
                  className="flex flex-col items-center justify-center gap-5 p-10 border"
                  style={{
                    borderColor: "rgba(0,212,240,0.15)",
                    background: "rgba(0,212,240,0.02)",
                    borderRadius: "4px",
                    minHeight: "360px",
                    opacity: shouldReduceMotion ? 1 : 0,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      border: "1px solid rgba(0,212,240,0.3)",
                      background: "rgba(0,212,240,0.06)",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00D4F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "#00D4F0" }}>
                    MESSAGE SENT
                  </p>
                  <p className="font-sans text-sm text-white/40 text-center max-w-sm">
                    Your email client should have opened. If not, reach me directly at{" "}
                    <a href="mailto:harshilthakkar3435@gmail.com" className="text-cyan-glow hover:underline">
                      harshilthakkar3435@gmail.com
                    </a>
                  </p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="flex flex-col gap-5 w-full border p-6 md:p-8"
                  style={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    borderColor: "rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "4px",
                    backdropFilter: "blur(8px)",
                  }}
                  onSubmit={handleSubmit}
                >
                  {/* Form heading */}
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.30)" }}>
                      SEND A MESSAGE
                    </span>
                    <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: "rgba(0,212,240,0.30)" }}>
                      ALL FIELDS REQUIRED
                    </span>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: "NAME", type: "text", id: "contact-name", placeholder: "Your name" },
                      { label: "EMAIL", type: "email", id: "contact-email", placeholder: "you@example.com" },
                    ].map(({ label, type, id, placeholder }) => (
                      <div key={id} className="flex flex-col gap-2">
                        <label
                          htmlFor={id}
                          className="font-mono text-[9px] tracking-widest uppercase"
                          style={{ color: "rgba(255,255,255,0.40)" }}
                        >
                          {label}
                          {formErrors[id] && (
                            <span className="ml-2" style={{ color: "rgba(255,100,100,0.8)" }}>— required</span>
                          )}
                        </label>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          required
                          defaultValue=""
                          placeholder={placeholder}
                          suppressHydrationWarning
                          className={inputBaseClass}
                          style={{
                            ...inputBaseStyle,
                            ...(formErrors[id] ? inputErrorStyle : {}),
                          }}
                          onFocus={(e) => {
                            Object.assign(e.currentTarget.style, inputFocusStyle);
                            setFormErrors((prev) => ({ ...prev, [id]: false }));
                          }}
                          onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurStyle)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Message textarea */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-message"
                      className="font-mono text-[9px] tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.40)" }}
                    >
                      MESSAGE
                      {formErrors["contact-message"] && (
                        <span className="ml-2" style={{ color: "rgba(255,100,100,0.8)" }}>— required</span>
                      )}
                    </label>
                    <textarea
                      id="contact-message"
                      name="contact-message"
                      rows={5}
                      required
                      defaultValue=""
                      placeholder="Tell me about your project or idea..."
                      suppressHydrationWarning
                      className={`${inputBaseClass} resize-none`}
                      style={{
                        ...inputBaseStyle,
                        ...(formErrors["contact-message"] ? inputErrorStyle : {}),
                      }}
                      onFocus={(e) => {
                        Object.assign(e.currentTarget.style, inputFocusStyle);
                        setFormErrors((prev) => ({ ...prev, "contact-message": false }));
                      }}
                      onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurStyle)}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    id="contact-submit"
                    type="submit"
                    className="w-full py-4 mt-1 font-mono text-xs tracking-widest uppercase relative overflow-hidden group hover-lift transition-all duration-300"
                    style={{
                      border: "1px solid rgba(0,212,240,0.25)",
                      background: "rgba(0,212,240,0.06)",
                      color: "#00D4F0",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,212,240,0.5)";
                      e.currentTarget.style.background = "rgba(0,212,240,0.10)";
                      e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,240,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,212,240,0.25)";
                      e.currentTarget.style.background = "rgba(0,212,240,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span className="relative z-10">
                      Send Message →
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0,212,240,0.04), transparent)",
                      }}
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>

        {/* Footer bar */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 md:px-12 xl:px-24 py-5 flex justify-between items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">
            © {new Date().getFullYear()} Harshil Thakkar
          </span>
          <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">
            Designed &amp; built with intention
          </span>
        </div>
      </div>
    </section>
  );
}