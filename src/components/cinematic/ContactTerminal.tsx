"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/motion/FadeIn";

const TERMINAL_LINES = [
  { delay: 0.2, text: "> ESTABLISHING_SECURE_CONNECTION...", color: "text-[#8A8A8A]" },
  { delay: 0.6, text: "> HANDSHAKE_COMPLETE", color: "text-[#00E5FF]/80" },
  { delay: 1.0, text: "> AWAITING_INPUT", color: "text-[#8A8A8A]" },
  { delay: 1.4, text: "", color: "" },
  { delay: 1.6, text: "> CONTACT.PROTOCOL / v2.4.1", color: "text-[#00E5FF]/60" },
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
      <span className={`ml-1 ${done ? "opacity-0" : "animate-pulse"}`}>|</span>
    </p>
  );
}

export default function ContactTerminal() {
  const [isVisible, setIsVisible] = useState(true); // For simplicity, trigger on mount or use InView

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col justify-center bg-transparent z-10 py-32" style={{
      background: 'linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.97) 2%, rgba(5,5,5,0.99) 10%, rgba(5,5,5,1) 100%)'
    }}>
      <Container className="max-w-4xl px-6 md:px-12 xl:px-24">
        <div className="flex flex-col gap-16 md:gap-24 w-full">
          <FadeIn>
            <div className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
              /// 06 / ESTABLISH CONNECTION
            </div>
          </FadeIn>

          <div className="flex flex-col gap-12">
            <FadeIn delay={0.1} viewportMargin="0px">
              <h2 className="font-heading text-6xl md:text-7xl leading-none text-[#F5F5F5]">
                Let's Build Something
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} viewportMargin="0px">
              <div className="border border-white/5 p-6 font-mono text-xs space-y-2 bg-[#050505]/40 backdrop-blur-sm max-w-xl">
                {TERMINAL_LINES.map((line, index) => (
                  <TerminalLine key={index} line={line} show={isVisible} />
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[#00E5FF]/60">&gt; _</span>
                  <span className="w-2 h-4 bg-[#00E5FF]/40 animate-pulse" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} viewportMargin="0px">
              <form className="flex flex-col gap-8 w-full mt-8">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                    NAME
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-base text-[#F5F5F5] outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                    SIGNAL ADDRESS / EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-base text-[#F5F5F5] outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                    TRANSMISSION / MESSAGE
                  </label>
                  <textarea
                    rows={1}
                    className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-base text-[#F5F5F5] outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-6 mt-8 border border-[#00E5FF]/30 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:border-[#00E5FF]/60"
                  style={{
                    boxShadow: "0 0 0 rgba(0,229,255,0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 rgba(0,229,255,0)";
                  }}
                >
                  INITIATE_COMMUNICATION →
                </button>
              </form>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} viewportMargin="0px">
            <div className="flex flex-wrap gap-8 pt-16 mt-8 border-t border-white/5">
              {["GITHUB", "LINKEDIN", "TWITTER", "RESEARCH"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-mono text-[10px] tracking-widest text-[#8A8A8A] hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}