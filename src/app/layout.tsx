import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mt-india-sri-lanka.ppathukorala.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "M&T — From India, with love.", template: "%s | M&T" },
  description:
    "Meet M&T — lovely finds sourced in India for everyday life in Sri Lanka. Explore our sample collection of clothing, accessories, jewellery and home goods.",
  icons: { icon: "/assets/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "M&T — From India, with love.",
    description:
      "Little finds. Lovely living. Discover the M&T boutique storefront.",
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
export const viewport: Viewport = { themeColor: "#612936" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;450;500;550;600;650;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
