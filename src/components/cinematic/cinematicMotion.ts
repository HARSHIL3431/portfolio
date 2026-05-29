/**
 * Unified Cinematic Motion Language
 *
 * Every animation in the portfolio obeys the same physics.
 * Motion should feel like camera movement, never UI movement.
 *
 * Tiers:
 *   micro      → hover states, focus, small interactions    (200–250ms)
 *   card       → card reveals, panel transitions            (500–700ms)
 *   scene      → section transitions, major reveals         (800–1200ms)
 *   parallax   → slow background movement                  (very slow)
 *   background → atmospheric drift, ambient motion          (extremely subtle)
 */

export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const MOTION = {
  micro: {
    duration: 0.22,
    ease: [0.25, 0.1, 0.25, 1] as const,
  },
  card: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  scene: {
    duration: 1.0,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  parallax: {
    duration: 2.0,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  background: {
    duration: 4.0,
    ease: "none" as const,
  },
} as const;

/**
 * Depth-shift presets for camera-like transitions.
 * Use for section enter/exit, project transitions, etc.
 */
export const DEPTH_SHIFT = {
  /** Element enters from behind — scale up, deblur, fade in */
  enterFromDepth: {
    initial: { opacity: 0, scale: 0.96, y: 30, filter: "blur(8px)" },
    animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: MOTION.scene.duration, ease: MOTION.scene.ease },
  },
  /** Element exits into depth — scale down, blur, fade out */
  exitToDepth: {
    animate: { opacity: 0, scale: 0.97, y: -20, filter: "blur(4px)" },
    transition: { duration: MOTION.card.duration, ease: MOTION.card.ease },
  },
  /** Subtle card-level depth shift */
  cardReveal: {
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: MOTION.card.duration, ease: MOTION.card.ease },
  },
} as const;

/**
 * Stagger configuration for cascading reveals.
 */
export const STAGGER = {
  fast: 0.06,
  normal: 0.1,
  slow: 0.18,
} as const;

/**
 * GSAP-compatible ease strings matching the motion tiers.
 */
export const GSAP_EASE = {
  micro: "power2.out",
  card: "power3.out",
  scene: "power3.inOut",
  parallax: "none",
} as const;

/**
 * GSAP scrub values per section type.
 */
export const SCRUB = {
  hero: 1.0,
  narrative: 1.6,
  project: 1.4,
  capability: 1.4,
  experience: 1.8,
  contact: 1.4,
} as const;