"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function MinimalNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  // Narrow top progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80 && !scrolled) setScrolled(true);
    else if (latest <= 80 && scrolled) setScrolled(false);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(id, { duration: 2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Cinematic scroll progress bar — top of viewport */}
      <div className="fixed top-0 left-0 right-0 h-px z-[60] bg-white/[0.03]">
        <motion.div
          className="h-full origin-left"
          style={{
            width: progressWidth,
            background: "linear-gradient(to right, rgba(0,229,255,0.6), rgba(0,229,255,0.2))",
          }}
        />
      </div>

      {/* Nav bar */}
      <motion.nav
        initial={{ backgroundColor: "rgba(5, 5, 5, 0)", borderBottomColor: "rgba(255, 255, 255, 0)" }}
        animate={{
          backgroundColor: scrolled ? "rgba(5, 5, 5, 0.88)" : "rgba(5, 5, 5, 0)",
          borderBottomColor: scrolled ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 xl:px-24 py-5 ${
          scrolled ? "backdrop-blur-md border-b" : ""
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Identity mark */}
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(0,229,255,0.6)", boxShadow: "0 0 6px rgba(0,229,255,0.4)" }}
            />
            <span className="font-mono tracking-widest text-[11px] text-white/30">
              HARSHIL
            </span>
          </div>

          {/* Nav links */}
          <div className="flex gap-8 font-mono tracking-widest text-[10px] text-white/25">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                id={`nav-${label.toLowerCase()}`}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="relative transition-colors duration-300 hover:text-white group"
              >
                {label}
                {/* Underline reveal */}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-400"
                  style={{ background: "rgba(0,229,255,0.4)" }}
                />
              </a>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
