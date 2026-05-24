"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
// Try to import useLenis, fallback if not available
import { useLenis } from "lenis/react";

export default function MinimalNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80 && !scrolled) {
      setScrolled(true);
    } else if (latest <= 80 && scrolled) {
      setScrolled(false);
    }
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(id);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(5, 5, 5, 0)", borderBottomColor: "rgba(255, 255, 255, 0)" }}
      animate={{
        backgroundColor: scrolled ? "rgba(5, 5, 5, 0.85)" : "rgba(5, 5, 5, 0)",
        borderBottomColor: scrolled ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-[40] px-6 md:px-12 xl:px-24 py-4 ${
        scrolled ? "backdrop-blur-sm border-b" : ""
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-mono tracking-widest text-[11px] text-[#8A8A8A]">
          PRO DEVELOPER
        </div>
        <div className="flex gap-6 font-mono tracking-widest text-[10px] text-[#8A8A8A]">
          <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-white transition-colors">
            ABOUT
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="hover:text-white transition-colors">
            PROJECTS
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="hover:text-white transition-colors">
            CONTACT
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
