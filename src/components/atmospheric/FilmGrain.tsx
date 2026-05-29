"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Film grain overlay — optimized.
 * Uses requestAnimationFrame for living-noise feel.
 * Reduced alpha for a subtler, more premium effect.
 * Respects reduced-motion preferences.
 */
export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      // Use a smaller canvas for performance, stretched via CSS
      canvas.width = Math.ceil(window.innerWidth / 2);
      canvas.height = Math.ceil(window.innerHeight / 2);
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    const draw = () => {
      frame += 1;
      // Only update every 3 frames for performance
      if (frame % 3 === 0) {
        const w = canvas.width;
        const h = canvas.height;
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const grain = Math.random() * 255;
          data[i] = grain;
          data[i + 1] = grain;
          data[i + 2] = grain;
          data[i + 3] = Math.random() * 12; // reduced alpha
        }

        ctx.putImageData(imageData, 0, 0);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[20] h-full w-full mix-blend-screen"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
}
