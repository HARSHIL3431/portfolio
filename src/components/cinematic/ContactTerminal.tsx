"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { MetadataBlock } from "@/components/core/MetadataBlock";
import { ParallaxLayer } from "./ParallaxLayer";
import { useCinematicScroll } from "@/providers/ScrollProvider";
import { cinematicEase } from "./cinematicMotion";

const TERMINAL_LINES = [
  { delay: 0.2, text: "> ESTABLISHING_SECURE_CONNECTION...", color: "text-white/20" },
  { delay: 0.6, text: "> HANDSHAKE_COMPLETE", color: "text-green-400/60" },
  { delay: 1.0, text: "> AWAITING_INPUT", color: "text-white/30" },
  { delay: 1.4, text: "", color: "" },
  { delay: 1.6, text: "> CONTACT.PROTOCOL / v2.4.1", color: "text-cyan-glow/50" },
];

function useTypewriter(text: string, speed = 30, start = false) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) {
      setDisplayed("");
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      setDisplayed((current) => current + text.charAt(index));
      index += 1;
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed, start]);

  return displayed;
}

function TerminalLine({ line, show }: { line: (typeof TERMINAL_LINES)[0]; show: boolean }) {
  const [visible, setVisible] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      setStartTyping(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisible(true);
      setStartTyping(true);
    }, line.delay * 1000);

    return () => window.clearTimeout(timeout);
  }, [show, line.delay]);

  if (!line.text) return <div className="h-4" />;

  const typed = useTypewriter(line.text, 24, startTyping);
  const done = typed.length >= line.text.length;

  return (
    <p className={`font-mono text-xs tracking-wider ${line.color} ${visible ? "opacity-100" : "opacity-0"}`}>
      {typed}
      <span className={`ml-1 ${done ? "opacity-0" : "animate-blink"}`}>|</span>
    </p>
  );
}

export function ContactTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useCinematicScroll();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sectionOpacity = useTransform(scrollYProgress, [0.78, 0.88, 1], [0, 1, 1]);
  const sectionLift = useTransform(scrollYProgress, [0.78, 0.88, 1], [40, 0, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0.76, 0.9, 1], [0, 0.75, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = progress >= 0.84;
    setIsVisible((current) => (current === next ? current : next));
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsTyping(true);
    window.setTimeout(() => {
      setSubmitted(true);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <ParallaxLayer speed={1} className="-mt-[8vh]">
      <motion.section
        ref={sectionRef}
        className="relative w-full min-h-screen flex flex-col justify-center py-32 bg-void"
        style={{
          opacity: shouldReduceMotion ? 1 : sectionOpacity,
          y: shouldReduceMotion ? 0 : sectionLift,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,229,255,0.1), transparent)" }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: shouldReduceMotion ? 0.35 : glowOpacity,
            background:
              "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 72%)",
          }}
        />

        <Container className="max-w-6xl relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
            style={{ opacity: shouldReduceMotion ? 1 : contentOpacity }}
          >
            <div className="lg:col-span-5">
              <motion.div
                initial={false}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: shouldReduceMotion ? 0.35 : 0.9, ease: cinematicEase }}
              >
                <MetadataBlock className="mb-8 opacity-30">/// CONTACT_TERMINAL</MetadataBlock>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-[0.9] tracking-tight mb-8">
                  Establish<br />
                  <span className="italic opacity-60">Connection</span>
                </h2>
                <p className="font-sans text-base text-white/30 leading-relaxed mb-12 max-w-sm">
                  Whether it&apos;s a research collaboration, a role that pushes boundaries, or an
                  experiment worth pursuing — I&apos;m listening.
                </p>

                <div
                  className="border border-white/[0.06] rounded-sm p-6 font-mono text-xs space-y-2"
                  style={{ background: "rgba(5,5,5,0.8)" }}
                >
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.04]">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="ml-2 text-white/15 text-[10px] tracking-wider">
                      SECURE_CHANNEL_01
                    </span>
                  </div>
                  {TERMINAL_LINES.map((line, index) => (
                    <TerminalLine key={index} line={line} show={isVisible} />
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-cyan-glow/50">&gt; _</span>
                    <span className="w-2 h-4 bg-cyan-glow/30 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={false}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
                transition={{ duration: shouldReduceMotion ? 0.35 : 0.9, delay: 0.12, ease: cinematicEase }}
                className="border border-white/[0.06] rounded-sm p-8 md:p-12"
                style={{ background: "rgba(10,10,12,0.9)", backdropFilter: "blur(20px)" }}
              >
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <MetadataBlock className="opacity-20">INPUT_FIELDS</MetadataBlock>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase block">
                        Designation / Name
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                        className="w-full bg-transparent border-b border-white/[0.08] text-white/60 font-sans text-base py-3 outline-none focus:border-white/20 placeholder:text-white/10 transition-colors duration-300"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase block">
                        Signal Address / Email
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                        className="w-full bg-transparent border-b border-white/[0.08] text-white/60 font-sans text-base py-3 outline-none focus:border-white/20 placeholder:text-white/10 transition-colors duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase block">
                        Transmission / Message
                      </label>
                      <textarea
                        value={formState.message}
                        onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                        rows={4}
                        className="w-full bg-transparent border-b border-white/[0.08] text-white/60 font-sans text-base py-3 outline-none focus:border-white/20 placeholder:text-white/10 resize-none transition-colors duration-300"
                        placeholder="Describe your experiment..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isTyping}
                      className="group w-full flex items-center justify-between px-8 py-4 border border-white/[0.08] text-white/30 hover:text-white/60 hover:border-white/20 transition-all duration-500 font-mono text-xs tracking-[0.4em] uppercase"
                    >
                      <span>{isTyping ? "TRANSMITTING..." : "INITIATE_COMMUNICATION"}</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.0, ease: cinematicEase }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-6"
                  >
                    <div className="w-12 h-12 rounded-full border border-green-400/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    </div>
                    <MetadataBlock className="text-green-400/60">TRANSMISSION_RECEIVED</MetadataBlock>
                    <p className="font-heading text-2xl text-white/60 italic">
                      &ldquo;Signal acquired. I&apos;ll be in touch.&rdquo;
                    </p>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={false}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.35 : 0.9, delay: 0.35, ease: cinematicEase }}
                className="flex gap-8 mt-8"
              >
                {[
                  { label: "GITHUB", href: "#" },
                  { label: "LINKEDIN", href: "#" },
                  { label: "TWITTER", href: "#" },
                  { label: "RESEARCH", href: "#" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-mono text-[9px] tracking-[0.4em] text-white/15 hover:text-white/40 uppercase transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.35 : 0.9, delay: 0.5, ease: cinematicEase }}
            className="mt-32 pt-8 border-t border-white/[0.04] flex items-center justify-between"
          >
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/10 uppercase">
              AI_RESEARCH_INTERFACE // {new Date().getFullYear()}
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/10 uppercase">
              ARCHIVE_STATUS: ACTIVE
            </span>
          </motion.div>
        </Container>
      </motion.section>
    </ParallaxLayer>
  );
}