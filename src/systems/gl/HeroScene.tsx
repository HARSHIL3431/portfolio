"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DisplacementSphere } from "./DisplacementSphere";

import { MotionValue } from "framer-motion";

interface HeroSceneProps {
  scrollYProgress: MotionValue<number>;
}

function isGLCapable(): boolean {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < 640) return false;
  if (navigator.hardwareConcurrency < 4) return false;
  return true;
}

export function HeroScene({ scrollYProgress }: HeroSceneProps) {
  const [enabled, setEnabled] = useState(false);
  // Use refs for mouse — avoids 60fps React re-renders on mousemove
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(isGLCapable());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="gl-canvas absolute inset-0 pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <DisplacementSphere
          scrollYProgress={scrollYProgress}
          mouseRef={mouseRef}
        />
      </Canvas>
    </div>
  );
}
