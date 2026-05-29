import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";
import { ScrollProvider } from "@/providers/ScrollProvider";
import { FilmGrain } from "@/components/atmospheric/FilmGrain";
import { AtmosphericFog } from "@/components/atmospheric/AtmosphericFog";
import { DustParticles } from "@/components/atmospheric/DustParticles";
import { CinematicCursor } from "@/components/interaction/CinematicCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
  title: {
    template: "%s | Harshil Thakkar",
    default: "Harshil Thakkar — AI/ML Engineer",
  },
  description:
    "AI/ML Engineer building machine learning systems that ship to production — from perception engines to generative AI interfaces.",
  openGraph: {
    title: "Harshil Thakkar — AI/ML Engineer",
    description:
      "Building machine learning systems at the intersection of research and production engineering.",
    type: "website",
    siteName: "Harshil Thakkar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshil Thakkar — AI/ML Engineer",
    description:
      "Building machine learning systems at the intersection of research and production engineering.",
  },
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="antialiased selection:bg-cyan-glow/20 selection:text-cyan-glow bg-void text-text-primary relative overflow-x-hidden min-h-screen cursor-none">
        {/* Atmospheric depth layers (back to front) */}
        <AtmosphericFog />
        <DustParticles />
        <FilmGrain />

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
