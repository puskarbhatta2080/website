import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "News & Updates Gallery — Puskar Bhatt",
  description: "Browse all press coverage and news images from Puskar Bhatt's career milestones.",
};

const NEWS_IMAGES: LightboxImage[] = [
  "/news/Reel Life Villain.jpg",
  "/news/1d88f800-dfa6-4021-9a0a-687454246e66.jpg",
  "/news/2e69b944-1c21-4a67-b16b-c149b924358a.jpg",
  "/news/3c2648cb-8809-46c7-a448-0641d2d84de4.jpg",
  "/news/3ea067cb-08eb-44bd-a741-4c059cfba5ca.jpg",
  "/news/7a2b9fdf-c54f-4acc-a7f9-c01d9c8baa65.jpg",
  "/news/8defdf50-3f18-472f-a8a1-d4cac190c08b.jpg",
  "/news/8f52ab90-d1ce-41ed-8371-29a62fb8514c.jpg",
  "/news/11c0b54f-2353-4e8e-adb6-6af41c74e8d2.jpg",
  "/news/21ec4c05-0435-4bff-b59c-6204b465e33b.jpg",
  "/news/41a377b4-df1c-4f7c-b59c-6c538e891b41.jpg",
  "/news/46cffa9e-ca41-47e1-9bec-d2b4e1f32528.jpg",
  "/news/64fa808f-def7-4c54-9791-bbe168dc88a0.jpg",
  "/news/1545b5ba-b2f1-4499-a666-752fc422bf14.jpg",
  "/news/9447923c-151f-476c-b4cd-8806284f29f6.jpg",
  "/news/47085716-5f0f-4710-b994-b2c5ef66ddbf.jpg",
].map((src, i) => ({
  src,
  alt: `News image ${i + 1}`,
}));

export default function NewsGalleryPage() {
  return (
    <GalleryPage
      title="News & Updates"
      subtitle="Latest announcements, press coverage, and career milestones from the world of Puskar Bhatt."
      images={NEWS_IMAGES}
      backHref="/#news"
    />
  );
}

