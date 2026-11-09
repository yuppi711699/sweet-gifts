import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const dmSans = localFont({
  src: "./fonts/dm-sans.woff2",
  variable: "--font-dm-sans",
  weight: "400 700",
  display: "swap",
});
const dmSerif = localFont({
  src: [
    { path: "./fonts/dm-serif-display.woff2", weight: "400", style: "normal" },
    {
      path: "./fonts/dm-serif-display-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});
const configuredUrl =
  siteConfig.siteUrl ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(configuredUrl),
  title: `${siteConfig.name} — Little Gifts. Big Smiles.`,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "corporate candy gifts",
    "bulk candy gift cups",
    "custom event gifts",
    "corporate gifting Canada",
  ],
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Little Gifts. Big Smiles.`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/collection.png",
        width: 1122,
        height: 1402,
        alt: "A collection of red candy gift cups with shiny red ribbons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Little Gifts. Big Smiles.`,
    description: siteConfig.description,
    images: ["/images/collection.png"],
  },
};

export const viewport: Viewport = { themeColor: "#bd3339" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
