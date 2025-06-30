import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADEYSEY MEDIA - Where Creators Drive Growth",
  description: "Performance-driven influencer marketing agency connecting tech and eCommerce brands with vetted micro-influencers for high-converting UGC campaigns.",
  keywords: "influencer marketing, UGC campaigns, micro-influencers, brand partnerships, creator network, performance marketing",
  authors: [{ name: "ADEYSEY MEDIA" }],
  creator: "ADEYSEY MEDIA",
  publisher: "ADEYSEY MEDIA",
  openGraph: {
    title: "ADEYSEY MEDIA - Where Creators Drive Growth",
    description: "Performance-driven influencer marketing agency connecting tech and eCommerce brands with vetted micro-influencers for high-converting UGC campaigns.",
    url: "https://adeyseymedia.com",
    siteName: "ADEYSEY MEDIA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADEYSEY MEDIA - Where Creators Drive Growth",
    description: "Performance-driven influencer marketing agency connecting tech and eCommerce brands with vetted micro-influencers for high-converting UGC campaigns.",
    creator: "@adeyseymedia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><circle cx='24' cy='24' r='24' fill='%2310B981'/><path d='M24 8L32 32H28L26 26H22L20 32H16L24 8Z' fill='white'/><path d='M22.5 22H25.5L24 18L22.5 22Z' fill='%230F172A'/></svg>" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><circle cx='24' cy='24' r='24' fill='%2310B981'/><path d='M24 8L32 32H28L26 26H22L20 32H16L24 8Z' fill='white'/><path d='M22.5 22H25.5L24 18L22.5 22Z' fill='%230F172A'/></svg>" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
