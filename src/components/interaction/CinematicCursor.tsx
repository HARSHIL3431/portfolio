"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * CinematicCursor — dual-ring cursor with spring physics.
 *
 * Default: small dot (6px) + larger trailing ring (28px)
 * Uses transform only — no repaints.
 * Hidden on touch devices and for reduced-motion users.
 */
export function CinematicCursor() {
  const { x, y } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (!isTouchDevice && !shouldReduceMotion) {
      setIsVisible(true);
    }
  }, [shouldReduceMotion]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot — follows closely */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "rgba(255, 255, 255, 0.6)",
          mixBlendMode: "difference",
        }}
        animate={{
          x: x - 3,
          y: y - 3,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Outer ring — trails behind with softer physics */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "transparent",
          mixBlendMode: "difference",
        }}
        animate={{
          x: x - 14,
          y: y - 14,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 1,
        }}
      />
    </>
  );
}
