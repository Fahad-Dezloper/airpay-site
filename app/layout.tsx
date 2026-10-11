import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Inter } from "next/font/google";
import "./globals.css";

// The app's three faces: Inter for words, Geist for figures, Bricolage for the wordmark.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
});

const description =
  "Pay your bills, recharge your phone, buy gift cards, earn rewards and pay people, from the wallets you already have. AirPay adds no fee. Built for the Solana Seeker.";

// The icons and the link-preview picture are the brand kit's own files, copied into /public.
// Set NEXT_PUBLIC_SITE_URL to the site's address once it has one, so the preview picture's link
// is absolute; until then it is resolved against wherever the page is served from.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://airpayy.com"),
  title: "AirPay: spend your crypto on everyday life",
  description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "AirPay: spend your crypto on everyday life",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AirPay" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport = { themeColor: "#008FFF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
