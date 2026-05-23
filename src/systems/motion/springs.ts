import type { Transition } from "framer-motion";

/**
 * Canonical spring presets — use these everywhere.
 * No duration-based easing. No uniform 300ms.
 */
export const springs = {
  /** Hero entrance — slow, confident. ~900ms effective duration */
  hero: {
    type: "spring",
    stiffness: 80,
    damping: 26,
    mass: 1,
  } satisfies Transition,

  /** Section reveals — balanced */
  section: {
    type: "spring",
    stiffness: 100,
    damping: 24,
    mass: 1,
  } satisfies Transition,

  /** Exit animations — sharp (slow in, fast out) */
  exit: {
    type: "spring",
    stiffness: 120,
    damping: 28,
    mass: 1,
  } satisfies Transition,

  /** Small UI elements — buttons, labels */
  ui: {
    type: "spring",
    stiffness: 110,
    damping: 22,
    mass: 1,
  } satisfies Transition,
} as const;

/** Stagger: 80ms between children */
export const stagger = {
  children: 0.08,
} as const;
