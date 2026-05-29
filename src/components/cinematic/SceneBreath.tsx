"use client";

/**
 * SceneBreath — cinematic breathing spacer.
 *
 * Creates visual silence between major scenes.
 * Premium websites are comfortable with empty space.
 * This component renders an intentional gap with a subtle
 * atmospheric gradient that breathes slowly.
 */
export function SceneBreath({
  height = "8vh",
  glow = false,
  glowColor = "rgba(0, 212, 240, 0.03)",
}: {
  height?: string;
  glow?: boolean;
  glowColor?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height }}
      aria-hidden="true"
    >
      {glow && (
        <div
          className="absolute inset-0 animate-breathe"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 50%, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
