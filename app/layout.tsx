import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#232d53",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Willkommen am JFAZ Marburg | Onboarding-Portal der HKJF",
  description:
    "Dein interaktiver Begleiter für den Aufenthalt an der Bildungsstätte der Hessischen Kinder- und Jugendfeuerwehr (JFAZ) in Marburg. Anreise, Check-in, Zimmer, Cappel-Guide, Packliste und FAQ.",
  keywords: [
    "JFAZ Marburg",
    "Hessische Jugendfeuerwehr",
    "HKJF",
    "Landesfeuerwehrschule Marburg",
    "Feuerwehr Onboarding",
    "Cappel",
  ],
  authors: [{ name: "Hessische Jugendfeuerwehr im LFV Hessen e.V." }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-screen flex flex-col bg-hkjf-cream text-hkjf-text antialiased selection:bg-hkjf-red selection:text-white">
        <div className="print:hidden">
          <Navbar />
        </div>
        <main className="flex-grow">{children}</main>
        <div className="print:hidden">
          <Footer />
        </div>
      </body>
    </html>
  );
}
