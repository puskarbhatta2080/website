import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Awards Gallery — Puskar Bhatt",
  description: "Browse all award images and recognition highlights from Puskar Bhatt's cinematic career.",
};

const AWARD_IMAGES: LightboxImage[] = [
  "/award/2f175c12-7da3-4e5e-82b7-96bc7152bd20.webp",
  "/award/3de07ccb-8243-4ad5-aa98-456deb4423b0.webp",
  "/award/4d162db9-1609-4f6e-9746-351b2088c4b7.webp",
  "/award/5ee33416-c4cb-4b30-baa5-c9255912f25f.webp",
  "/award/6b22a6ae-8bbc-42d8-8622-f595264fded7.webp",
  "/award/8ac7e3ba-e22f-45a1-8924-1c5ee73aae62.webp",
  "/award/8baac643-4914-4fcc-8861-2d59361d3281.webp",
  "/award/075d73cf-84fe-49ed-9ea4-2b24226a1de0.webp",
  "/award/84e2214c-e020-4fb3-b164-0bf4147010a5.webp",
  "/award/88e9d7d2-22d6-4680-abbd-765e5ba4e160.webp",
  "/award/93b3de55-a394-40bf-b8c6-d5c4fe151bd1.webp",
  "/award/430ded95-5d14-4e47-ae03-e9b034b47652.webp",
  "/award/1499a539-27d8-4200-9dc6-a6737526e90a.webp",
  "/award/b3ce9787-77bf-4b27-a3ae-c6df4d688da4.webp",
  "/award/bedcd64e-a90f-4454-9d15-b373987bcb53.webp",
  "/award/c06d64e2-e7bc-4d2e-8d31-9ff0ba8331a5.webp",
  "/award/e23d4c4e-489c-4eb7-a8f8-1bf4e7ed19f9.webp",
].map((src, i) => ({
  src,
  alt: `Award image ${i + 1}`,
}));

export default function AwardsGalleryPage() {
  return (
    <GalleryPage
      title="Awards & Recognition"
      subtitle="The trophy cabinet — each award reflecting the relentless pursuit of menace, mastery, and presence."
      images={AWARD_IMAGES}
      backHref="/#awards"
    />
  );
}

