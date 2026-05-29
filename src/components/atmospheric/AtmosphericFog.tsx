"use client";

/**
 * AtmosphericFog — subtle CSS-only fog layer.
 *
 * Sits between background and content, creating depth.
 * Uses radial-gradient layers with very slow drift animation.
 * Opacity is intentionally very low (0.03–0.06) — felt more than seen.
 */
export function AtmosphericFog() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary fog — cool blue, slow drift */}
      <div
        className="absolute animate-drift"
        style={{
          inset: "-10%",
          background:
            "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,212,240,0.035) 0%, transparent 70%)",
        }}
      />
      {/* Secondary fog — warm amber, opposite drift */}
      <div
        className="absolute animate-drift"
        style={{
          inset: "-10%",
          background:
            "radial-gradient(ellipse 50% 60% at 70% 60%, rgba(232,168,124,0.025) 0%, transparent 70%)",
          animationDirection: "reverse",
          animationDuration: "40s",
        }}
      />
      {/* Deep center void — prevents fog from washing out the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(5,5,5,0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
