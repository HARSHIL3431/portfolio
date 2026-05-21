"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCinematicScroll } from "@/providers/ScrollProvider";

type ParallaxLayerProps = {
  speed: number;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function ParallaxLayer({ speed, children, className, style }: ParallaxLayerProps) {
  const { scrollYProgress } = useCinematicScroll();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const travel = shouldReduceMotion ? 0 : (1 - speed) * 12;
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `-${travel}%`]);

  return (
    <motion.div
      className={cn("parallax-layer relative z-10", className)}
      style={{ y, willChange: "transform", ...style }}
    >
      {children}
    </motion.div>
  );
}