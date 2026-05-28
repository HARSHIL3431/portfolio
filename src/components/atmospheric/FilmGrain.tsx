"use client";

import { useEffect, useRef } from "react";

/**
 * Animated film grain overlay drawn on a canvas.
 * Uses requestAnimationFrame for living-noise feel.
 * Opacity is very low to stay atmospheric without distraction.
 */
export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
          data[i + 3] = Math.random() * 18; // very low alpha
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full mix-blend-screen"
      aria-hidden="true"
    />
  );
}
