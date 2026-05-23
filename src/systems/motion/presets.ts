import type { Variants } from "framer-motion";
import { springs, stagger } from "./springs";

/**
 * Standard section entrance — opacity + translateY only.
 * delay is the offset from when the parent stagger starts.
 */
export const entrance = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springs.section, delay },
  },
});

/**
 * Hero entrance child variant — used inside heroStaggerContainer.
 * The container handles the 0.9s delayChildren; children just add
 * their own relative offset (0, 0.08, 0.16 …).
 */
export const heroEntrance = (relativeDelay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springs.hero, delay: relativeDelay },
  },
});

/**
 * Stagger container — wraps children with 80ms stagger.
 * Starts immediately on mount.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.children,
      delayChildren: 0,
    },
  },
};

/**
 * Hero stagger container — 900ms initial delay, then staggers children.
 */
export const heroStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.children,
      delayChildren: 0.9,
    },
  },
};

/**
 * Exit — sharp, fast
 */
export const exitVariant: Variants = {
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12, transition: springs.exit },
};
