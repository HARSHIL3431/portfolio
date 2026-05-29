"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * DustParticles — site-wide subtle floating dust.
 *
 * Hydration-safe via seeded PRNG.
 * Very slow float animation with varied speeds.
 * Respects reduced-motion preferences.
 */

function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function next(): number {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0x100000000;
  };
}

export function DustParticles({ count = 14 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const particles = useMemo(() => {
    const rand = createSeededRandom(31415926);
    return Array.from({ length: count }, (_, i) => ({
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 1.2 + 0.3,
      speed: rand() * 0.15 + 0.04,
      opacity: rand() * 0.10 + 0.02,
      delay: i * 0.6,
      hue: rand() > 0.7 ? "rgba(232,168,124,0.5)" : "rgba(0,212,240,0.4)",
    }));
  }, [count]);

  if (shouldReduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            background: p.hue,
            animation: `heroFloat ${14 / p.speed}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
