import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Filmography Gallery — Puskar Bhatt",
  description: "Explore the complete filmography of Puskar Bhatt — all movie posters and antagonist roles.",
};

const MOVIES: LightboxImage[] = [
  { src: "/filmography/gangajal.jpg", alt: "Gangajal — Blood-Soaked Judge" },
  { src: "/filmography/Himmatwali.jpg", alt: "Himmatwali — Predator in Silk" },
  { src: "/filmography/Jaljalaa.jpg", alt: "Jaljalaa — The Burning Strategist" },
  { src: "/filmography/Ma Birsu Kasari.jpg", alt: "Ma Birsu Kasari — Cold-Hearted Conjurer" },
  { src: "/filmography/Salam Cha Mayalai.jpg", alt: "Salam Cha Mayalai — Nightmare Negotiator" },
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

