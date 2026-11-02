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

  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return true;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  // Show/hide cursor when mouse enters/leaves the browser window
  useEffect(() => {
    if (shouldReduceMotion || isTouchDevice) return;

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, [shouldReduceMotion, isTouchDevice]);

  if (!isVisible || shouldReduceMotion || isTouchDevice) return null;

  return (
    <>
      {/* Inner dot — follows closely */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 7,
          height: 7,
          background: "rgba(216, 236, 248, 0.9)",
          boxShadow: "0 0 6px rgba(216, 236, 248, 0.35)",
        }}
        animate={{ x: x - 3, y: y - 3 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Outer ring — trails behind with softer physics */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(199, 211, 234, 0.25)",
          background: "transparent",
        }}
        animate={{ x: x - 14, y: y - 14 }}
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