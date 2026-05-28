"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function LenisTicker() {
  const lenis = useLenis();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!lenis) return;

    let gsapModule: typeof import("gsap") | null = null;
    let stModule: typeof import("gsap/ScrollTrigger") | null = null;

    const setup = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsapModule = { gsap } as unknown as typeof import("gsap");
      stModule = { ScrollTrigger } as unknown as typeof import("gsap/ScrollTrigger");

      // Sync Lenis scroll events to ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Replace GSAP ticker with Lenis RAF loop
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Prevent GSAP from adding lag smoothing that breaks Lenis
      gsap.ticker.lagSmoothing(0);
    };

    setup();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Cleanup will happen via lenis destroy
    };
  }, [lenis]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <LenisTicker />
      {children}
    </ReactLenis>
  );
}
