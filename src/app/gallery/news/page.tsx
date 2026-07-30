import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "News & Press Coverage",
  description:
    "Browse all press coverage, news articles, and media features about Puskar Bhatt — Nepali cinema's ultimate antagonist. Includes South Indian news, Canadian coverage, and regional press from Nepal's film industry.",
  keywords: [
    "Puskar Bhatt news",
    "Nepali film news",
    "Puskar Bhatta updates",
    "Nepali cinema press",
    "Puskar Bhatt media coverage",
    "Nepali actor news 2025",
    "12 Gaun 2 news",
    "Nepali film industry news",
    "South Indian news Nepal",
    "Nepali actor Canada news",
    "Puskar Bhatt return to films",
    "Nepali cinema latest news",
  ],
  openGraph: {
    title: "Puskar Bhatt — News & Press Coverage Gallery",
    description:
      "Latest press coverage, news articles, and media features from Puskar Bhatt's career in Nepali cinema.",
  },
};

const NEWS_IMAGES: LightboxImage[] = [
  { src: "/news/Reel Life Villain.webp", alt: "Reel Life Villain" },
  { src: "/news/REEL-LIFE VILLAIN.webp", alt: "REEL-LIFE VILLAIN" },
  { src: "/news/South Indian News.webp", alt: "South Indian News" },
  { src: "/news/Certificate of appreciation.webp", alt: "Certificate of appreciation" },
  { src: "/news/Puskar bhatta returns after 10 years with  12 Gau 2.webp", alt: "Puskar bhatta returns after 10 years with 12 Gau 2" },
  { src: "/news/कोह्ल्वी युवा परिवार.webp", alt: "कोह्ल्वी युवा परिवार" },
  { src: "/news/खतरनाक खलनायक.webp", alt: "खतरनाक खलनायक" },
  { src: "/news/खलनायक पुस्कर , CANADA मा सम्मानित.webp", alt: "खलनायक पुस्कर , CANADA मा सम्मानित" },
  { src: "/news/ग्रोबरको बाटोमा (2).webp", alt: "ग्रोबरको बाटोमा (2)" },
  { src: "/news/ग्रोबरको बाटोमा.webp", alt: "ग्रोबरको बाटोमा" },
  { src: "/news/पुस्कर भट्ट , खलनायक.webp", alt: "पुस्कर भट्ट , खलनायक" },
  { src: "/news/पुस्करलाइ सुटिंगमा भ्याई नभ्याई.webp", alt: "पुस्करलाइ सुटिंगमा भ्याई नभ्याई" },
  { src: "/news/राजेन्द्र र पुस्कर सम्मानित.webp", alt: "राजेन्द्र र पुस्कर सम्मानित" },
  { src: "/news/सुदुरपस्चिमको सुन्दरतालाइ बिस्वभर चिनाउछु.webp", alt: "सुदुरपस्चिमको सुन्दरतालाइ बिस्वभर चिनाउछु" },
  { src: "/news/हुस्सुले सुटिंग रोकियो.webp", alt: "हुस्सुले सुटिंग रोकियो" },
];

export default function NewsGalleryPage() {
  return (
    <GalleryPage
      title="News & Updates"
      subtitle="Latest announcements, press coverage, and career milestones from the world of Puskar Bhatt."
      images={NEWS_IMAGES}
      backHref="/#news"
    />
  );
}
