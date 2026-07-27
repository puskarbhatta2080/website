import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Filmography Gallery — Puskar Bhatt",
  description: "Explore the complete filmography of Puskar Bhatt — all movie posters and antagonist roles.",
};

const MOVIES: LightboxImage[] = [
  { src: "/filmography/gangajal.webp", alt: "Gangajal — Blood-Soaked Judge" },
  { src: "/filmography/Himmatwali.webp", alt: "Himmatwali — Predator in Silk" },
  { src: "/filmography/Jaljalaa.webp", alt: "Jaljalaa — The Burning Strategist" },
  { src: "/filmography/Ma Birsu Kasari.webp", alt: "Ma Birsu Kasari — Cold-Hearted Conjurer" },
  { src: "/filmography/Salam Cha Mayalai.webp", alt: "Salam Cha Mayalai — Nightmare Negotiator" },
];

export default function FilmographyGalleryPage() {
  return (
    <GalleryPage
      title="Filmography"
      subtitle="Complete collection of Puskar Bhatt's antagonist roles — each performance sharpened into cinematic presence."
      images={MOVIES}
      backHref="/#filmography"
    />
  );
}

