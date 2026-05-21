"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverGlow({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();

  // Calculate position relative to container
  const rect = containerRef.current?.getBoundingClientRect();
  const localX = rect ? x - rect.left : 0;
  const localY = rect ? y - rect.top : 0;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden group", className)}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${localX}px ${localY}px, var(--color-surface-border), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
