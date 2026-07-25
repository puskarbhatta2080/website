import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Film Strip Gallery — Puskar Bhatt",
  description: "35mm evidence reel frames from Puskar Bhatt's behind-the-scenes archive.",
};

const FRAMES: LightboxImage[] = [
  { id: 1, src: "/BTS/1eb3c7ec-b5f7-48d5-abb6-6c122244f06e.jpg", alt: "The Wardrobe Returns" },
  { id: 2, src: "/BTS/3fc2ad96-4ab6-41fd-994e-ac3ed1bebc50.jpg", alt: "Mask Tests" },
  { id: 3, src: "/BTS/4a893cd6-11c0-4681-bf97-0e56032a38fc.jpg", alt: "Light & Smoke" },
  { id: 4, src: "/BTS/5a1ed671-4b52-42cb-8995-f17bb58a4c23.jpg", alt: "Director's Cut" },
  { id: 5, src: "/BTS/8c6d0d32-1871-4da7-9186-f27627be6cf4.jpg", alt: "On Set" },
  { id: 6, src: "/pimage/iconic2.jpg", alt: "Iconic Still" },
  { id: 7, src: "/BTS/9d8ba5e8-b19a-458d-bf7c-99e1018736c2.jpg", alt: "Rehearsal" },
  { id: 8, src: "/BTS/23d6b1f7-446c-49a4-8035-209bf030d285.jpg", alt: "Character Prep" },
].map(({ src, alt }) => ({ src, alt }));

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

