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
  title: {
    default:
      "Puskar Bhatt — Nepali Cinema's Ultimate Antagonist | Villain Portfolio",
    template: "%s — Puskar Bhatt",
  },
  description:
    "Premium cinematic portfolio of Puskar Bhatt, Nepal's most intense on-screen antagonist. Explore 80+ Nepali films, awards, BTS memoris, and casting inquiries for Gangajal, Himmatwali, Jaljalaa, Ma Birsu Kasari & Salam Cha Mayalai.",
  keywords: [
    "Puskar Bhatt",
    "Puskar Bhatta",
    "Nepali actor",
    "Nepali villain",
    "antagonist Nepal",
    "Gangajal villain",
    "Himmatwali",
    "Jaljalaa",
    "Ma Birsu Kasari",
    "Salam Cha Mayalai",
    "Nepali cinema",
    "Nepali film actor",
    "negative role Nepal",
    "actor portfolio",
    "cinematic portfolio",
    "film villain Nepal",
    "Puskar Bhatt filmography",
    "casting Nepal",
    "Nepali Gulshan Grover",
    "Nepali film industry",
    "Bhojpuri cinema",
    "Nepali action film",
       "Nepali drama actor",
  ],
  authors: [{ name: "Puskar Bhatt", url: "https://puskarbhatt.com" }],
  creator: "Puskar Bhatt",

  publisher: "Puskar Bhatt",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "Puskar Bhatt — Nepali Cinema's Ultimate Antagonist",
    description:
      "Premium cinematic portfolio showcasing Puskar Bhatt's antagonist roles across 80+ Nepali films and Bhojpuri cinema. Filmography, awards, BTS, and casting.",
    url: "https://puskarbhatt.com",
    siteName: "Puskar Bhatt — Ultimate Antagonist",
    locale: "en_US",
    type: "website",
    countryName: "Nepal",
    images: [
      {
        url: "/iconic2.webp",
        width: 1200,
        height: 630,
        alt: "Puskar Bhatt — Nepali Cinema Iconic Villain Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puskar Bhatt — Nepali Cinema's Ultimate Antagonist",
    description:
      "Premium cinematic portfolio showcasing Puskar Bhatt's antagonist roles across 80+ Nepali films.",
    images: ["/iconic2.webp"],
    creator: "@puskarbhatt",
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
    canonical: "https://puskarbhatt.com",
    languages: {
      "en-US": "https://puskarbhatt.com",
      ne: "https://puskarbhatt.com",
    },
  },
  category: "cinema",
  classification: "Actor Portfolio",
  other: {
    "geo.region": "NP",
    "geo.placename": "Nepal",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Puskar Bhatt",
  alternateName: "Puskar Bhatta",
  description:
    "Nepali cinema antagonist known for iconic villain roles in 80+ Nepali feature films and Bhojpuri movies. Known as the 'Nepali Gulshan Grover' for commanding screen presence and intense dialogue delivery.",
  url: "https://puskarbhatt.com",
  image: "/iconic2.webp",
  nationality: {
    "@type": "Country",
    name: "Nepal",
  },
  birthPlace: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
    },
  },
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA",
    },
  },
  knowsAbout: [
    "Acting",
    "Nepali Cinema",
    "Villain Performance",
    "Film Industry",
    "Character Acting",
  ],
  sameAs: [
    "https://www.facebook.com/puskar.bhatta.148469",
    "https://wa.me/16477602298",
    "https://www.youtube.com/@puskarbhatt",
  ],
  award: [
    "Best Villain Performance",
    "Outstanding Negative Role",
    "Screen Presence Award",
    "Viewer's Choice Antagonist",
    "Lifetime Menace Achievement",
  ],
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
        {/* Schema.org Person structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* BreadcrumbList structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://puskarbhatt.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Filmography",
                  item: "https://puskarbhatt.com/gallery/filmography",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Awards",
                  item: "https://puskarbhatt.com/gallery/awards",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Contact",
                  item: "https://puskarbhatt.com/#contact",
                },
              ],
            }),
          }}
        />

        <meta name="theme-color" content="#07080b" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <link rel="alternate" hrefLang="en-us" href="https://puskarbhatt.com" />
        <link rel="alternate" hrefLang="ne" href="https://puskarbhatt.com" />
        <link rel="alternate" hrefLang="x-default" href="https://puskarbhatt.com" />
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
