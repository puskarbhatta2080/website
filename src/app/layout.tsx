import type { Metadata, Viewport } from "next";
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

const personSummary =
  "Puskar Bhatta is a prominent Nepali actor known for intense antagonist roles, sharp dialogue delivery, and raw action sequences. With an extensive filmography spanning over 80 Nepali feature films and regional productions including Bhojpuri cinema, he continues to contribute to the legacy of the Nepali film industry from Canada and Nepal.";

export const metadata: Metadata = {
  metadataBase: new URL("https://puskarbhatt.com"),
  title: {
    default: "Puskar Bhatta | Nepali Actor, Villain and Filmography",
    template: "%s — Puskar Bhatta",
  },
  description: personSummary,
  keywords: [
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
    "Puskar Bhatta filmography",
    "casting Nepal",
    "Nepali Gulshan Grover",
    "Nepali film industry",
    "Bhojpuri cinema",
    "Nepali action film",
    "Nepali drama actor",
  ],
  authors: [{ name: "Puskar Bhatta", url: "https://puskarbhatt.com" }],
  creator: "Puskar Bhatta",

  publisher: "Puskar Bhatta",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "Puskar Bhatta — Nepali Cinema's Ultimate Antagonist",
    description: personSummary,
    url: "https://puskarbhatt.com",
    siteName: "Puskar Bhatta — Ultimate Antagonist",
    locale: "en_US",
    type: "website",
    countryName: "Nepal",
    images: [
      {
        url: "/pimage/iconic2.webp",
        width: 1200,
        height: 630,
        alt: "Puskar Bhatta — Nepali Cinema Iconic Villain Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puskar Bhatta — Nepali Cinema's Ultimate Antagonist",
    description: personSummary,
    images: ["/pimage/iconic2.webp"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07080b",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Puskar Bhatta",
  alternateName: "Puskar Bhatta",
  description:
    "Puskar Bhatta is a prominent Nepali actor known for intense antagonist roles, sharp dialogue delivery, and raw action sequences. With an extensive filmography spanning over 80 Nepali feature films and dozens of regional hit productions including Bhojpuri blockbusters, his commanding performances continue to captivate audiences and shape high-intensity conflict on screen. Though he now resides in Canada, he frequently returns to Nepal to carry forward his legendary mark as an antagonist and contribute to the growth and legacy of the Nepali film industry.",
  disambiguatingDescription:
    "Nepali actor Puskar Bhatta is recognized for antagonist and villain roles in Nepali and Bhojpuri cinema.",
  url: "https://puskarbhatt.com",
  image: "https://puskarbhatt.com/pimage/biography.webp",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://puskarbhatt.com",
  },
  jobTitle: "Actor",
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
    "https://wa.me/15195218816",
    "https://www.youtube.com/@puskarbhatt",
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

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
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
