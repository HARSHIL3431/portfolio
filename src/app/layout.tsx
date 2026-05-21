import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";
import { ScrollProvider } from "@/providers/ScrollProvider";
import { FilmGrain } from "@/components/atmospheric/FilmGrain";
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
    template: "%s | Architecting Intelligence",
    default: "AI Research Interface | Cinematic Portfolio",
  },
  description:
    "A cinematic interactive AI research interface and portfolio exploring machine intelligence.",
  openGraph: {
    title: "AI Research Interface",
    description: "Architecting Intelligence through cinematic UI design and deep learning concepts.",
    type: "website",
    siteName: "AI Research Interface",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research Interface",
    description: "Architecting Intelligence through cinematic UI design.",
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
        <FilmGrain />
        <CinematicCursor />
        <LenisProvider>
          <ScrollProvider>{children}</ScrollProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
