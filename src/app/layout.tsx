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
  title: "Puskar Bhatt — Nepali Cinema's Ultimate Antagonist | Villain Portfolio",
  description:
    "Premium cinematic portfolio of Puskar Bhatt, Nepal's most intense on-screen antagonist. Explore filmography, awards, BTS memoris, and casting inquiries for Gangajal, Himmatwali, Jaljalaa, Ma Birsu Kasari & Salam Cha Mayalai.",
  keywords: [
    "Puskar Bhatt", "Nepali actor", "Nepali villain", "antagonist Nepal",
    "Gangajal villain", "Himmatwali", "Jaljalaa", "Ma Birsu Kasari",
    "Salam Cha Mayalai", "Nepali cinema", "Nepali film actor",
    "negative role Nepal", "actor portfolio", "cinematic portfolio",
    "film villain Nepal", "Puskar Bhatt filmography", "casting Nepal"
  ],
  authors: [{ name: "Puskar Bhatt" }],
  creator: "Puskar Bhatt",
  publisher: "Puskar Bhatt",
  openGraph: {
    title: "Puskar Bhatt — Nepali Cinema's Ultimate Antagonist",
    description:
      "Premium cinematic portfolio showcasing Puskar Bhatt's antagonist roles across Nepali cinema. Filmography, awards, BTS, and casting.",
    url: "https://puskarbhatta.com.np",
    siteName: "Puskar Bhatt — Ultimate Antagonist",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/iconic2.JPG",
        width: 1200,
        height: 630,
        alt: "Puskar Bhatt — Cinematic Villain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puskar Bhatt — Nepali Cinema's Ultimate Antagonist",
    description:
      "Premium cinematic portfolio showcasing Puskar Bhatt's antagonist roles across Nepali cinema.",
    images: ["/iconic2.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: "https://puskarbhatta.com.np",
  },
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
      <head>
        {/* Schema.org structured data for Person/actor */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Puskar Bhatt",
              description:
                "Nepali cinema antagonist known for iconic villain roles in Gangajal, Himmatwali, Jaljalaa, Ma Birsu Kasari, and Salam Cha Mayalai.",
              url: "https://puskarbhatta.com.np",
              image: "/iconic2.JPG",
              sameAs: [],
              knowsAbout: "Acting, Nepali Cinema, Villain Performance",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Persistent background + interactive cursor + floating nav */}
        <GlobalBackground />
        <CrimsonCursor />
        <FloatingNav />

{/* Offset for fixed nav height */}
        <div className="pt-[64px] sm:pt-[72px]">{children}</div>
      </body>
    </html>
  );
}

