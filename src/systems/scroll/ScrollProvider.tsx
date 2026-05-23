"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";
import { useScroll } from "framer-motion";

type ScrollContextValue = {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll({ offset: ["start start", "end end"] });

  return (
    <ScrollContext.Provider value={{ scrollY, scrollYProgress }}>
      <div className="relative isolate min-h-screen">{children}</div>
    </ScrollContext.Provider>
  );
}

export function useCinematicScroll() {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error("useCinematicScroll must be used within ScrollProvider");
  }

  return context;
}