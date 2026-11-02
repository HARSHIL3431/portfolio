"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TERMINAL_LINES = [
  { text: "> ESTABLISHING_SECURE_CONNECTION...", color: "rgba(157,167,186,0.7)" },
  { text: "> HANDSHAKE_COMPLETE", color: "rgba(216,236,248,0.7)" },
  { text: "> READY", color: "rgba(102,58,243,0.9)" },
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
        <div className="mt-0.5 flex items-center gap-1.5">
          <span style={{ color: "rgba(216,236,248,0.6)" }}>&gt; _</span>
          <span
            className="inline-block h-3.5 w-1.5"
            style={{
              background: "rgba(216,236,248,0.4)",
              animation: "blink 1s steps(2,start) infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function ContactTerminal() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion() ?? false;

  /* ── Form logic preserved verbatim (validation → mailto) ── */
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

  const inputErrorStyle = {
    borderColor: "rgba(255,100,100,0.4)",
    background: "rgba(255,100,100,0.03)",
  };

  return (
    <section id="contact" className="relative section-gap">
      <Container className="max-w-7xl px-6 md:px-12 xl:px-24">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s Build{" "}
              <span style={{ opacity: 0.6 }}>Something</span> Together
            </>
          }
          statement="Interested in AI, machine learning, or building intelligent software? Drop me a message and I'll get back to you."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* ─── Left: info ─── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 lg:col-span-5"
          >
            {/* Direct email */}
            <div className="flex flex-col gap-2">
              <span className="eyebrow !text-[10px]">Email</span>
              <a
                href="mailto:harshilthakkar3435@gmail.com"
                className="font-mono text-sm tracking-wide text-frost-glow/75 transition-colors duration-300 hover:text-ice-highlight"
              >
                harshilthakkar3435@gmail.com
              </a>
            </div>

            {/* Socials */}
            <div
              className="flex flex-wrap gap-6 border-t pt-6"
              style={{ borderColor: "rgba(186,215,247,0.08)" }}
            >
              {[
                { label: "GitHub", href: "https://github.com/HARSHIL3431" },
                { label: "LinkedIn", href: "https://linkedin.com/in/harshilthakkar-dev" },
                { label: "Resume", href: "/resume.pdf" },
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
                  className="chip hover:!text-ice-highlight"
                >
                  {label} ↗
                </a>
              ))}
            </div>

            {/* Terminal accent */}
            <div className="glass-card hairline max-w-xs p-4">
              <TerminalOutput lines={TERMINAL_LINES} revealed={TERMINAL_LINES.length} />
            </div>
          </motion.div>

          {/* ─── Right: form ─── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {formSubmitted ? (
              <div
                className="glass-card flex min-h-[360px] flex-col items-center justify-center gap-5 p-10 text-center"
                style={{ borderColor: "rgba(216,236,248,0.25)" }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    border: "1px solid rgba(216,236,248,0.3)",
                    background: "rgba(216,236,248,0.05)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8D6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-mono text-xs tracking-widest uppercase text-ice-soft">
                  Message Sent
                </p>
                <p className="max-w-sm font-sans text-sm text-moon-mist">
                  Your email client should have opened. If not, reach me directly at{" "}
                  <a
                    href="mailto:harshilthakkar3435@gmail.com"
                    className="text-ice-highlight hover:underline"
                  >
                    harshilthakkar3435@gmail.com
                  </a>
                </p>
              </div>
            ) : (
              <form
                className="glass-card hairline flex w-full flex-col gap-5 p-6 md:p-8"
                onSubmit={handleSubmit}
              >
                {/* Form heading */}
                <div
                  className="flex items-center justify-between border-b pb-4"
                  style={{ borderColor: "rgba(186,215,247,0.08)" }}
                >
                  <span className="eyebrow !text-[10px]">Send a Message</span>
                  <span className="font-mono text-[8px] tracking-widest uppercase text-fog-veil/60">
                    All Fields Required
                  </span>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[
                    { label: "Name", type: "text", id: "contact-name", placeholder: "Your name" },
                    { label: "Email", type: "email", id: "contact-email", placeholder: "you@example.com" },
                  ].map(({ label, type, id, placeholder }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label
                        htmlFor={id}
                        className="eyebrow !text-[9px]"
                      >
                        {label}
                        {formErrors[id] && (
                          <span className="ml-2 text-red-400/80">— required</span>
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
                        className="input-glass"
                        style={formErrors[id] ? inputErrorStyle : undefined}
                        onFocus={() =>
                          setFormErrors((prev) => ({ ...prev, [id]: false }))
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="eyebrow !text-[9px]"
                  >
                    Message
                    {formErrors["contact-message"] && (
                      <span className="ml-2 text-red-400/80">— required</span>
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
                    className="input-glass resize-none"
                    style={formErrors["contact-message"] ? inputErrorStyle : undefined}
                    onFocus={() =>
                      setFormErrors((prev) => ({ ...prev, "contact-message": false }))
                    }
                  />
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  className="btn btn-violet w-full !py-4"
                >
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-3 border-t py-6 md:flex-row md:mt-20"
          style={{ borderColor: "rgba(186,215,247,0.07)" }}
        >
          <span className="font-mono text-[9px] tracking-widest uppercase text-fog-veil/60">
            © {new Date().getFullYear()} Harshil Thakkar
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-fog-veil/60">
            Designed &amp; built with intention
          </span>
        </div>
      </Container>
    </section>
  );
}