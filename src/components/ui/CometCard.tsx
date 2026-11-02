"use client";

import { useCallback, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * CometCard — localized frosted-glass tilt card.
 * Pointer-driven 3D tilt + directional luminous glare, spring-smoothed.
 * Respects reduced motion and touch input.
 */
export function CometCard({
  children,
  className,
  tilt = 7,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [tilt, -tilt]),
    { stiffness: 160, damping: 22, mass: 0.4 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-tilt, tilt]),
    { stiffness: 160, damping: 22, mass: 0.4 }
  );
  const glareX = useTransform(mouseX, [0, 1], [8, 92]);
  const glareY = useTransform(mouseY, [0, 1], [8, 92]);
  const glare = useMotionTemplate`radial-gradient(340px circle at ${glareX}% ${glareY}%, rgba(199,211,234,0.10), rgba(186,215,247,0.04) 40%, transparent 65%)`;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || e.pointerType !== "mouse") return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY, shouldReduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    if (shouldReduceMotion) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: shouldReduceMotion ? "none" : glare,
          opacity: shouldReduceMotion ? 0 : 1,
          transform: "translateZ(1px)",
        }}
      />
    </motion.div>
  );
}