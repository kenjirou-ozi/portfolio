import type { Metadata } from "next";
import { Orbitron, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KENJIROU — AI × Design × Innovation",
  description: "AIで映像の常識を変える。次世代クリエイティブスタジオ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${orbitron.variable} ${ibmPlexSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
