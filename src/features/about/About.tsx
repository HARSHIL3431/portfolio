"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { about } from "@/content/about";
import { entrance } from "@/systems/motion/presets";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.section
      ref={ref}
      id="about"
      aria-label="About"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        paddingTop: "8rem",
        paddingBottom: "8rem",
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Hairline + label */}
      <motion.div variants={entrance(0)}>
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            marginBottom: "3rem",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4a4a52",
            marginBottom: "4rem",
          }}
        >
          About
        </p>
      </motion.div>

      {/* Two-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "start",
        }}
      >
        {/* Left: paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <motion.p
            variants={entrance(0.06)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.35vw, 1.1rem)",
              lineHeight: 1.8,
              color: "rgba(232, 230, 225, 0.6)",
              fontWeight: 300,
              maxWidth: "50ch",
            }}
          >
            {about.para1}
          </motion.p>

          <motion.p
            variants={entrance(0.12)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.35vw, 1.1rem)",
              lineHeight: 1.8,
              color: "rgba(232, 230, 225, 0.38)",
              fontWeight: 300,
              maxWidth: "50ch",
            }}
          >
            {about.para2}
          </motion.p>
        </div>

        {/* Right: meta */}
        <motion.div
          variants={entrance(0.18)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <MetaField label="Location" value={about.location} />
          <MetaField label="Status" value={about.availability} accent />
        </motion.div>
      </div>
    </motion.section>
  );
}

function MetaField({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#2e2e36",
          marginBottom: "0.4rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.04em",
          color: accent ? "#c8b89a" : "#4a4a52",
        }}
      >
        {value}
      </p>
    </div>
  );
}
