import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Iconic Stills Gallery — Puskar Bhatt",
  description: "Iconic portrait stills and projected frames from Puskar Bhatt's cinematic portfolio.",
};

const ICONIC_IMAGES: LightboxImage[] = [
  { src: "/iconic1.webp", alt: "Fragment 1" },
  { src: "/iconic2.webp", alt: "Fragment 2" },
  { src: "/iconic3.webp", alt: "Fragment 3" },
  { src: "/iconic4.webp", alt: "Fragment 4" },
  { src: "/iconic5.webp", alt: "Fragment 5" },
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

