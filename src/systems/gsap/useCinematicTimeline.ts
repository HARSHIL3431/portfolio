"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export interface CinematicTimelineOptions {
  scrub?: number | boolean;
  start?: string;
  end?: string;
}

export function useCinematicTimeline(
  triggerRef: RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline) => void,
  options: CinematicTimelineOptions = {}
) {
  const { scrub = 1.4, start = "top top", end } = options;
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const trigger = triggerRef.current;
      if (!trigger) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start,
            end: end ?? `+=${trigger.offsetHeight - window.innerHeight}`,
            scrub,
            invalidateOnRefresh: true,
          },
        });

        build(tl);
        tlRef.current = tl;
      });
    };

    init();

    return () => {
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tlRef;
}
