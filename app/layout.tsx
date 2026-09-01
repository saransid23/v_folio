import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AppLayout from "./AppLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://madebysaran.vercel.app/"),
  title: "Saran Siddarth — Filmmaker & Visual Storyteller",
  description:
    "World-class cinematic portfolio of Saran Siddarth — filmmaker, cinematographer, and visual storyteller creating luxury brand films, documentaries, and short films.",
  keywords: [
    "Filmmaker",
    "Cinematographer",
    "Video Editor",
    "Color Grading",
    "Premier Pro",
    "Documentary",
    "Short Film",
    "Commercial",
    "Visual Storyteller",
    "Saran Siddarth",
  ],
  openGraph: {
    title: "Saran Siddarth — Filmmaker & Visual Storyteller",
    description: "Cinematic portfolio — creating experiences, not just videos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <body className="antialiased min-h-full flex flex-col">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
