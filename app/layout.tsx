import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "ISO 14001:2026 Transition Training | Sustainable Futures Training",
  description:
    "Self-paced ISO 14001:2026 transition training for auditors. Learn clause-wise changes from ISO 14001:2015 to ISO 14001:2026 with comparison, infographics, audit checklist, and transition cheat sheet.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="selection:bg-burgundy selection:text-white antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
