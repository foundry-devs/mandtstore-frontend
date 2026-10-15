import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: "/assets/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: `${siteConfig.tagline} Discover the M&T boutique storefront.`,
    type: "website",
    url: "/",
    images: [
      {
        url: "/assets/hero.webp",
        width: 1536,
        height: 1024,
        alt: "M&T illustrative boutique campaign",
      },
    ],
  },
};
export const viewport: Viewport = { themeColor: siteConfig.themeColor };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
