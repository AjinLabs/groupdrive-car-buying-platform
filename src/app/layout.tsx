import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1220"
};

export const metadata: Metadata = {
  title: "GROUPDRIVE — India's Group Car Buying Platform | Kerala Pilot",
  description: "Buy Together. Negotiate Smarter. Connect with local verified car buyers across Kerala to invite competitive, transparent on-road quotations from authorized dealerships.",
  keywords: [
    "group car buying India",
    "Kerala car price calculator",
    "Kerala road tax MVD slabs",
    "Hyundai Creta Kerala on-road",
    "Tata Nexon EV price Kerala",
    "Toyota Innova Hycross group deal",
    "car quotation comparison",
    "automotive group negotiation"
  ],
  authors: [{ name: "GROUPDRIVE Platform Team" }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
