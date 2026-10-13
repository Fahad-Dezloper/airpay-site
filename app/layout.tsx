import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// The app's three faces: Inter for words, Geist for figures, Bricolage for the wordmark.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
});

const title = "AirPay: pay bills, recharge and shop with crypto";
const description =
  "Recharge your phone, pay bills, buy gift cards and pay people with USDC or SOL, straight from the Solana wallets you already have. Built for Solana Seeker.";

// The icons and the link-preview picture are the brand kit's own files, copied into /public.
// `title.template` names every other page "<Page> · AirPay"; a page sets only its own word.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  title: { default: title, template: "%s · AirPay" },
  description,
  applicationName: "AirPay",
  category: "finance",
  keywords: [
    "AirPay",
    "pay bills with crypto",
    "spend crypto",
    "crypto bill payment",
    "mobile recharge with crypto",
    "gift cards with USDC",
    "Solana payments app",
    "Solana Seeker app",
    "USDC payments",
    "tap to pay crypto",
    "SKR rewards",
    "non-custodial payments",
  ],
  authors: [{ name: "AirPay", url: site.url }],
  creator: "AirPay",
  publisher: "AirPay",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AirPay",
    locale: "en_US",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AirPay: crypto you can actually spend" }],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    creator: site.twitter,
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport = { themeColor: "#008FFF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
