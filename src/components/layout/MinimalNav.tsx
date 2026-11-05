"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function MinimalNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 24 && !scrolled) setScrolled(true);
    else if (latest <= 24 && scrolled) setScrolled(false);
  });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(id, {
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-6 md:px-12 xl:px-24 py-4 ${
        scrolled
          ? "bg-midnight-canvas/80 backdrop-blur-md shadow-[0_1px_0_rgba(186,215,247,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Identity mark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center gap-3 group cursor-target"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-void-violet shadow-[0_0_8px_rgba(102,58,243,0.5)] transition-transform duration-300 group-hover:scale-125" />
          <span className="font-mono tracking-widest text-[10px] text-frost-glow/60 group-hover:text-frost-glow transition-colors duration-300">
            HARSHIL
          </span>
        </a>

        {/* Nav links */}
        <div className="flex gap-8 font-mono tracking-widest text-[10px]">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              id={`nav-${label.toLowerCase()}`}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="cursor-target relative text-moon-mist/70 transition-colors duration-250 hover:text-ice-highlight focus-visible:text-ice-highlight group"
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "rgba(186,215,247,0.4)" }}
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}