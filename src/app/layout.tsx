import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalBackground from "@/components/GlobalBackground";
import FloatingNav from "@/components/FloatingNav";
import CrimsonCursor from "@/components/CrimsonCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puskar Bhatt — Ultimate Antagonist",
  description:
    "Premium cinematic villain portfolio — aggressive, immersive, theatrical design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Persistent background + interactive cursor + floating nav */}
        <GlobalBackground />
        <CrimsonCursor />
        <FloatingNav />

        {/* Offset for fixed nav height */}
        <div className="pt-[72px] sm:pt-[86px]">{children}</div>
      </body>
    </html>
  );
}

