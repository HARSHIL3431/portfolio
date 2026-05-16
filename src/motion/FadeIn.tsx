"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: { y: shouldReduceMotion ? 10 : 30, x: 0 },
    down: { y: shouldReduceMotion ? -10 : -30, x: 0 },
    left: { x: shouldReduceMotion ? 10 : 30, y: 0 },
    right: { x: shouldReduceMotion ? -10 : -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction], 
        filter: shouldReduceMotion ? "none" : "blur(4px)" 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        filter: shouldReduceMotion ? "none" : "blur(0px)" 
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: shouldReduceMotion ? 0.6 : 1.2, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1], 
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
