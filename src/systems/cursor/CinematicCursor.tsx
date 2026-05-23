"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lerp cursor: 10px dot (instant) + 32px ring (lerp 0.12)
 * Magnetic hover: 8–12px element pull on data-magnetic elements
 */
export function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rx = -100, ry = -100;
    let mx = -100, my = -100;
    let raf = 0;
    let magnetEl: HTMLElement | null = null;
    let isPressed = false;

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      let tx = rx - 16;
      let ty = ry - 16;

      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Pull ring toward element center, max 10px
        const pull = Math.min(10, dist * 0.22);
        const angle = Math.atan2(dy, dx);
        tx += Math.cos(angle) * pull * -0.5;
        ty += Math.sin(angle) * pull * -0.5;
      }

      const scale = isPressed ? "scale(0.85)" : "scale(1)";
      ring.style.transform = `translate(${tx}px, ${ty}px) ${scale}`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const mag = target.closest<HTMLElement>("[data-magnetic]");
      if (mag) {
        magnetEl = mag;
        ring.style.borderColor = "rgba(200, 184, 154, 0.6)";
        ring.style.transform = ring.style.transform; // force repaint
        return;
      }
      const interactive = target.closest("a, button, [role='button']");
      if (interactive) {
        ring.style.borderColor = "rgba(232, 230, 225, 0.4)";
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      // Only reset if leaving interactive zone entirely
      const leavingMag = target.closest<HTMLElement>("[data-magnetic]");
      const enteringMag = related?.closest<HTMLElement>("[data-magnetic]");
      if (leavingMag && !enteringMag) {
        magnetEl = null;
        ring.style.borderColor = "rgba(232, 230, 225, 0.18)";
        return;
      }
      const leavingInteractive = target.closest("a, button, [role='button']");
      const enteringInteractive = related?.closest("a, button, [role='button']");
      if (leavingInteractive && !enteringInteractive && !magnetEl) {
        ring.style.borderColor = "rgba(232, 230, 225, 0.18)";
      }
    };

    const onDown = () => {
      isPressed = true;
      dot.style.opacity = "0.6";
    };

    const onUp = () => {
      isPressed = false;
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* 32px ring — lerp 0.12 */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(232, 230, 225, 0.18)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "border-color 0.25s",
        }}
      />
      {/* 10px dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#e8e6e1",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "opacity 0.15s",
        }}
      />
    </>
  );
}
