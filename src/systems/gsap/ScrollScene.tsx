"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ScrollSceneContextValue {
  progress: number;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const ScrollSceneContext = createContext<ScrollSceneContextValue>({
  progress: 0,
  triggerRef: { current: null },
});

export function useScrollScene() {
  return useContext(ScrollSceneContext);
}

interface ScrollSceneProps {
  id?: string;
  height: string; // e.g. "300vh"
  children: ReactNode;
  className?: string;
  /** Scrub factor — higher = more lag/cinematic smoothness */
  scrub?: number;
}

/**
 * Core cinematic scene wrapper.
 * Creates a tall scroll container (height) that pins a fullscreen sticky inner div.
 * Children receive scroll progress (0–1) via useScrollScene().
 */
export function ScrollScene({
  id,
  height,
  children,
  className = "",
  scrub = 1.2,
}: ScrollSceneProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

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
        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: `+=${trigger.offsetHeight - window.innerHeight}`,
          scrub,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        });
      });
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [scrub]);

  return (
    <ScrollSceneContext.Provider value={{ progress, triggerRef }}>
      <section
        id={id}
        ref={triggerRef as React.RefObject<HTMLElement>}
        className={`relative ${className}`}
        style={{ height }}
      >
        <div className="sticky top-0 h-screen overflow-hidden w-full">
          {children}
        </div>
      </section>
    </ScrollSceneContext.Provider>
  );
}
