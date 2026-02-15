import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kamunity — Free digital tools your community actually owns",
  description:
    "Stop renting from big tech. Kamunity gives your community its own space, custom tools, and real data control — with no coding, no contracts, and no catch.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
