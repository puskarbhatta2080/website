import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Iconic Stills | Puskar Bhatta",
  description:
    "Discover the iconic stills of Puskar Bhatta — cinematic villain portraits, dramatic character frames, and memorable moments from Nepali cinema’s most unforgettable antagonist.",
  keywords: [
    "Puskar Bhatta stills",
    "Puskar Bhatta iconic images",
    "Nepali villain portraits",
    "antagonist photos",
    "Nepali cinema gallery",
    "Puskar Bhatta images",
    "villain character stills",
    "Nepali actor photos",
    "cinematic portraits",
    "Puskar Bhatta dramatic portrait",
  ],
  openGraph: {
    title: "Puskar Bhatta — Iconic Stills Gallery",
    description:
      "Psychological villain portraits and cinematic stills from Puskar Bhatta's most unforgettable character moments.",
    url: "https://puskarbhatt.com/gallery/iconic",
  },
  alternates: {
    canonical: "https://puskarbhatt.com/gallery/iconic",
  },
};

const ICONIC_IMAGES: LightboxImage[] = [
  { src: "/iconic1.webp", alt: "Puskar Bhatta Nepali actor villain portrait" },
  { src: "/iconic2.webp", alt: "Puskar Bhatta antagonist character still from Nepali cinema" },
  { src: "/iconic3.webp", alt: "Puskar Bhatta villain character still from Nepali cinema" },
  { src: "/iconic4.webp", alt: "Puskar Bhatta dramatic antagonist portrait" },
  { src: "/iconic5.webp", alt: "Puskar Bhatta cinematic villain still" },
];

export default function IconicGalleryPage() {
  return (
    <GalleryPage
      title="Iconic Stills"
      subtitle="Projected frames from the psychological villain archive — each image a fragment of menace."
      images={ICONIC_IMAGES}
      backHref="/#spindle"
    />
  );
}
