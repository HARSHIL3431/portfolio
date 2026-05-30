"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  viewportMargin?: string;
}

export function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
  viewportMargin = "-10%",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const distance = shouldReduceMotion ? 10 : 30;
  const directions: Record<string, { x: number; y: number }> = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialFilter = direction === "none" || shouldReduceMotion ? "none" : "blur(6px)";
  const finalFilter = direction === "none" || shouldReduceMotion ? "none" : "blur(0px)";
  const duration = shouldReduceMotion ? 0.6 : 1.2;

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
        filter: initialFilter,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: finalFilter,
      }}
      viewport={{ once: false, margin: "-15%" as any }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
