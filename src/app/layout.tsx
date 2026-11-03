import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";
import { ScrollProvider } from "@/providers/ScrollProvider";
import { DustParticles } from "@/components/atmospheric/DustParticles";
import { BackgroundAtmosphere } from "@/components/atmospheric/BackgroundAtmosphere";
import { CinematicCursor } from "@/components/interaction/CinematicCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harshilthakkar.dev"),
  title: {
    template: "%s | Harshil Thakkar",
    default: "Harshil Thakkar — AI/ML Engineer",
  },
  description:
    "AI & Machine Learning Engineer building intelligent systems through machine learning, computer vision, and AI-powered applications.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Harshil Thakkar — AI/ML Engineer",
    description:
      "AI & Machine Learning Engineer building intelligent systems through machine learning, computer vision, and AI-powered applications.",
    type: "website",
    siteName: "Harshil Thakkar",
    url: "https://harshilthakkar.dev/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshil Thakkar — AI/ML Engineer",
    description:
      "AI & Machine Learning Engineer building intelligent systems through machine learning, computer vision, and AI-powered applications.",
  },
};

export const viewport = {
  themeColor: "#05060f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harshil Thakkar",
              url: "https://harshilthakkar.dev/",
              jobTitle: "AI/ML Engineer",
              description:
                "AI & Machine Learning Engineer building intelligent systems through machine learning, computer vision, and AI-powered applications.",
              alumniOf: "CHARUSAT",
              knowsAbout: [
                "Machine Learning",
                "Computer Vision",
                "Deep Learning",
                "Artificial Intelligence",
              ],
              sameAs: [
                "https://github.com/HARSHIL3431",
                "https://linkedin.com/in/harshilthakkar-dev",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased selection:bg-[rgba(186,215,247,0.16)] bg-midnight-canvas text-frost-glow relative overflow-x-hidden min-h-screen cursor-none">
        <noscript>
          <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Harshil Thakkar — AI/ML Engineer</h1>
            <p>
              Please enable JavaScript to view the full portfolio. You can reach
              me at{" "}
              <a href="mailto:harshilthakkar3435@gmail.com">
                harshilthakkar3435@gmail.com
              </a>
            </p>
          </div>
        </noscript>
        {/* Atmospheric depth layers (back to front) */}
        <BackgroundAtmosphere />
        <DustParticles />

        {/* Cursor layer */}
        <CinematicCursor />

        {/* Content */}
        <LenisProvider>
          <ScrollProvider>{children}</ScrollProvider>
        </LenisProvider>
      </body>
    </html>
  );
}