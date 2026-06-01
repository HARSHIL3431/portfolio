"use client";

import { useEffect, useRef } from "react";

/**
 * Fallback hook to prevent black-screen stuck states.
 *
 * If GSAP hasn't changed opacity from 0 within `delayMs`,
 * this hook forces the element to opacity: 1.
 *
 * This is a safety net — under normal scroll conditions GSAP
 * fires its ScrollTrigger well within the timeout window.
 */
export function useOpacityFallback(
  ref: React.RefObject<HTMLElement | null>,
  delayMs = 800,
  disabled = false
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const el = ref.current;

    timerRef.current = setTimeout(() => {
      const computed = window.getComputedStyle(el);
      if (parseFloat(computed.opacity) < 0.05) {
        el.style.opacity = "1";
      }
    }, delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ref, delayMs, disabled]);
}
