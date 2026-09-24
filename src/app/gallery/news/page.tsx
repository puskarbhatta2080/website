import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "News & Press Coverage | Puskar Bhatta",
  description:
    "Follow the latest news, press features, interviews, and media updates about Puskar Bhatta — the Nepali cinema icon known for powerful antagonist roles and standout screen presence.",
  keywords: [
    "Puskar Bhatta news",
    "Puskar Bhatta press coverage",
    "Nepali film news",
    "Puskar Bhatta updates",
    "Nepali cinema press",
    "Puskar Bhatta media coverage",
    "12 Gaun 2 news",
    "Nepali film industry news",
    "Puskar Bhatta return to films",
    "Nepali actor Canada news",
    "Puskar Bhatta interviews",
    "Nepali cinema latest news",
  ],
  openGraph: {
    title: "Puskar Bhatta — News & Press Coverage Gallery",
    description:
      "Latest press coverage, articles, and media features about Puskar Bhatta's Nepali cinema career.",
    url: "https://puskarbhatt.com/gallery/news",
  },
  alternates: {
    canonical: "https://puskarbhatt.com/gallery/news",
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
      subtitle="Latest announcements, press coverage, and career milestones from the world of Puskar Bhatta."
      images={NEWS_IMAGES}
      backHref="/#news"
    />
  );
}
