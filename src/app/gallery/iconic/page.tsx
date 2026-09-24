import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Iconic Stills",
  description:
    "Browse the iconic stills gallery of Puskar Bhatta — psychological villain portraits, projected frames, and cinematic character studies from Nepali cinema's most intense antagonist. High-resolution images capturing menace and power.",
  keywords: [
    "Puskar Bhatta stills",
    "Nepali villain portraits",
    "antagonist photos",
    "Nepali cinema gallery",
    "Puskar Bhatta images",
    "villain character stills",
    "Nepali actor photos",
    "cinematic portraits",
  ],
  openGraph: {
    title: "Puskar Bhatta — Iconic Stills Gallery",
    description:
      "Psychological villain portraits and projected frames from Nepali cinema's most intense antagonist.",
  },
  alternates: {
    canonical: "/gallery/iconic",
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
