"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CinematicCursor() {
  const { x, y } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-4 w-4 rounded-full border-[0.25px] border-white/20 bg-white/5 mix-blend-screen backdrop-blur-sm"
      animate={{
        x: x - 8,
        y: y - 8,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 0.8,
      }}
    />
  );
}
