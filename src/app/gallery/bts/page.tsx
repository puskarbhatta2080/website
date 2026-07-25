import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "BTS & Memoris Gallery — Puskar Bhatt",
  description: "Behind-the-scenes fragments, rehearsals, and memory cuts from Puskar Bhatt's cinematic journey.",
};

const BTS_FILES = [
  "1eb3c7ec-b5f7-48d5-abb6-6c122244f06e.jpg",
  "3fc2ad96-4ab6-41fd-994e-ac3ed1bebc50.jpg",
  "4a893cd6-11c0-4681-bf97-0e56032a38fc.jpg",
  "5a1ed671-4b52-42cb-8995-f17bb58a4c23.jpg",
  "8c6d0d32-1871-4da7-9186-f27627be6cf4.jpg",
  "9d8ba5e8-b19a-458d-bf7c-99e1018736c2.jpg",
  "23d6b1f7-446c-49a4-8035-209bf030d285.jpg",
  "43bb180b-1335-4753-89ee-38fa11871471.jpg",
  "53fb3a5a-8908-41d2-a754-60a00076bb38.jpg",
  "154e2cd6-ad68-4eb5-8c96-343d2c6b23eb.jpg",
  "391b465a-6f39-402f-a5ec-16cfa8c19bc5.jpg",
  "478cd438-93eb-4911-989c-9954a5943780.jpg",
  "484bd65c-32b1-45c5-8943-7c8f5af18f15.jpg",
  "910a13eb-9bbb-4d50-bbf0-c26d5895e0c6.jpg",
  "5958c07e-ffec-4815-abd5-58a2de2440b1.jpg",
  "8835e4d3-b129-4d70-acba-fd1962bca7fd.jpg",
  "9473dec5-9ffe-4c9c-bc34-3b329de37bb6.jpg",
  "522196b1-6abc-4966-8519-e214c7e1bcc1.jpg",
  "a5b5f20f-7bf2-47fe-805f-4c6c02e02608.jpg",
  "a8c3e3e8-9123-44ac-9b92-4b22aa580dc0.jpg",
  "ab388c23-0fbe-49c6-81ff-f20aed433480.jpg",
  "abe3f8a4-20f1-4b4d-ae25-228c55833380.jpg",
  "b0d452a8-d63e-4f0b-8cb6-ccbbeb321255.jpg",
  "ce379785-cd83-4f01-9bc1-21e1a2cd0ecf.jpg",
  "f91369a6-f6fe-41ec-bf4b-54fab4a413ed.jpg",
];

const ALL_IMAGES: LightboxImage[] = [
  ...BTS_FILES.map((f, i) => ({
    src: `/BTS/${f}`,
    alt: `BTS Fragment ${i + 1}`,
  })),
  ...[
    { src: "/pimage/placeholder1.JPG", alt: "Memoris #01 — A scar of cinema." },
    { src: "/pimage/placeholder2.JPG", alt: "Memoris #02 — The vow before the scene." },
    { src: "/pimage/placeholder3.JPG", alt: "Memoris #03 — A silence that speaks." },
  ],
];

export default function BtsGalleryPage() {
  return (
    <GalleryPage
      title="BTS / MEMORIS"
      subtitle="Backstage fragments, rehearsals, and memory cuts — where the antagonist becomes a ritual."
      images={ALL_IMAGES}
      backHref="/#bts"
    />
  );
}

