import { ImageResponse } from "next/og";

export const alt = "Harshil Thakkar — AI/ML Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060f",
          color: "#d8ecf8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Blueprint grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(186,215,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(186,215,247,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Spotlight halo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "45%",
            background:
              "radial-gradient(ellipse 40% 100% at 50% 0%, rgba(124,145,182,0.28) 0%, rgba(124,145,182,0.16) 45%, transparent 85%)",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 22px",
              borderRadius: 999,
              background: "rgba(186,214,247,0.08)",
              boxShadow: "inset 0 0 0 1px rgba(186,215,247,0.2)",
              color: "#c7d3ea",
              fontSize: 22,
              letterSpacing: "0.35em",
            }}
          >
            AI / ML ENGINEER
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#d8ecf8",
            }}
          >
            Harshil Thakkar
          </div>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 4,
              borderRadius: 999,
              background: "#663af3",
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: "#9da7ba",
              maxWidth: 720,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Machine learning · Computer vision · AI-powered applications
          </div>
        </div>
      </div>
    ),
    size
  );
}