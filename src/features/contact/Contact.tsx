"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { identity } from "@/content/identity";
import { entrance } from "@/systems/motion/presets";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const year = new Date().getFullYear();

  return (
    <motion.section
      ref={ref}
      id="contact"
      aria-label="Contact"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        paddingTop: "8rem",
        paddingBottom: "6rem",
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Hairline divider */}
      <motion.div
        variants={entrance(0)}
        style={{
          height: 1,
          background: "rgba(255,255,255,0.06)",
          marginBottom: "5rem",
        }}
      />


      {/* Email — large, magnetic, arrow reveal */}
      <motion.div variants={entrance(0.12)}>
        <EmailLink email={identity.email} />
      </motion.div>

      {/* Social links */}
      <motion.div
        variants={entrance(0.18)}
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "3rem",
        }}
      >
        <SocialLink href={identity.github} label="GitHub" />
        <SocialLink href={identity.linkedin} label="LinkedIn" />
      </motion.div>

      {/* Footer */}
      <motion.div
        variants={entrance(0.24)}
        style={{
          marginTop: "8rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#2e2e36",
          }}
        >
          © {year} {identity.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#2e2e36",
          }}
        >
          Portfolio
        </span>
      </motion.div>
    </motion.section>
  );
}

function EmailLink({ email }: { email: string }) {
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#c8b89a";
    if (arrowRef.current) {
      arrowRef.current.style.opacity = "1";
      arrowRef.current.style.transform = "translateX(6px)";
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#e8e6e1";
    if (arrowRef.current) {
      arrowRef.current.style.opacity = "0";
      arrowRef.current.style.transform = "translateX(-4px)";
    }
  };

  return (
    <a
      href={`mailto:${email}`}
      data-magnetic
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(1.4rem, 4vw, 2.75rem)",
        fontWeight: 300,
        color: "#e8e6e1",
        textDecoration: "none",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        transition: "color 0.3s",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {email}
      <span
        ref={arrowRef}
        aria-hidden="true"
        style={{
          opacity: 0,
          transform: "translateX(-4px)",
          transition: "opacity 0.25s, transform 0.3s",
          fontSize: "0.6em",
          color: "#c8b89a",
        }}
      >
        →
      </span>
    </a>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#4a4a52",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "#e8e6e1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "#4a4a52";
      }}
    >
      {label}
    </a>
  );
}
