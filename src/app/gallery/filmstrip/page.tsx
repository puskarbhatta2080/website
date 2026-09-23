import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "35mm Evidence Reel",
  description:
    "Browse the 35mm evidence reel — vintage film strip frames from Puskar Bhatt's behind-the-scenes archive. Grayscale evidence from the villain's workshop with infinite scroll effect.",
  keywords: [
    "Puskar Bhatt film strip",
    "Nepali cinema BTS",
    "35mm evidence reel",
    "Puskar Bhatt behind the scenes",
    "vintage film frames Nepal",
    "Nepali film evidence reel",
    "villain workshop Nepal",
    "Puskar Bhatt grayscale",
  ],
  openGraph: {
    title: "Puskar Bhatt — 35mm Evidence Reel Gallery",
    description:
      "Vintage film strip frames and behind-the-scenes evidence from the villain's cinematic workshop.",
  },
  alternates: {
    canonical: "/gallery/filmstrip",
  },
};

const FRAMES: LightboxImage[] = [
  { src: "/BTS/1eb3c7ec-b5f7-48d5-abb6-6c122244f06e.webp", alt: "The Wardrobe Returns" },
  { src: "/BTS/3fc2ad96-4ab6-41fd-994e-ac3ed1bebc50.webp", alt: "Mask Tests" },
  { src: "/BTS/4a893cd6-11c0-4681-bf97-0e56032a38fc.webp", alt: "Light & Smoke" },
  { src: "/BTS/5a1ed671-4b52-42cb-8995-f17bb58a4c23.webp", alt: "Director's Cut" },
  { src: "/BTS/8c6d0d32-1871-4da7-9186-f27627be6cf4.webp", alt: "On Set" },
  { src: "/pimage/iconic2.webp", alt: "Iconic Still" },
  { src: "/BTS/9d8ba5e8-b19a-458d-bf7c-99e1018736c2.webp", alt: "Rehearsal" },
  { src: "/BTS/23d6b1f7-446c-49a4-8035-209bf030d285.webp", alt: "Character Prep" },
];

export default function FilmstripGalleryPage() {
  return (
    <GalleryPage
      title="35mm Evidence Reel"
      subtitle="Infinite scroll of vintage film frames — grayscale evidence from the villain's workshop."
      images={FRAMES}
      backHref="/#filmstrip"
    />
  );
}
