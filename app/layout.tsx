import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CookieConsent } from '@/components/marketing/CookieConsent';
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: 'swap',
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "BookTrailer Pro - Turn Your Book Into a Cinematic Trailer",
  description: "Create stunning, professional book trailers in minutes with AI-powered video generation. Capture your story's essence and drive reader engagement.",
  keywords: "book trailers, AI video generation, book marketing, author tools, cinematic trailers, book promotion",
  openGraph: {
    title: "BookTrailer Pro - Turn Your Book Into a Cinematic Trailer",
    description: "Create stunning, professional book trailers in minutes with AI-powered video generation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookTrailer Pro - Turn Your Book Into a Cinematic Trailer",
    description: "Create stunning, professional book trailers in minutes with AI-powered video generation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
        <CookieConsent />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
