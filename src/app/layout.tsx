import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kamunity — Free digital tools your community actually owns",
  description:
    "Kamunity helps your community create your own spaces and custom tools, with real data control.",
  metadataBase: new URL("https://kamunity.org"),
  openGraph: {
    title: "Kamunity — Free digital tools your community actually owns",
    description:
      "Community-owned digital infrastructure. Free tools, real data control, no catch.",
    url: "https://kamunity.org",
    siteName: "Kamunity",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamunity — Free digital tools your community actually owns",
    description:
      "Community-owned digital infrastructure. Free tools, real data control, no catch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${fraunces.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  );
}
