"use client";

/**
 * BackgroundAtmosphere — full-bleed midnight atmosphere.
 *
 * Replaces the visual weight once supplied by the photo hero:
 * blueprint grid + conic spotlight + restrained ambient glow.
 * Pure CSS — no canvas, no image pipeline, no continuous loops.
 */
export function BackgroundAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid" />

      {/* Conic spotlight halo — anchors the top of the page */}
      <div className="absolute inset-x-0 top-0 h-[70vh] spotlight" />

      {/* Ambient glow — cool blue breath */}
      <div
        className="absolute animate-breathe"
        style={{
          inset: "-10%",
          background:
            "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(186,215,247,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Vignette — deepens the canvas edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 20%, transparent 40%, rgba(3,4,10,0.8) 100%)",
        }}
      />
    </div>
  );
}