import type { Metadata } from "next";
import SocialGalleryClient from "./client";

export const metadata: Metadata = {
  title: "Social Media & Press Coverage | Puskar Bhatta",
  description:
    "Follow Puskar Bhatta across social media, Facebook reels, YouTube features, and online press coverage from Nepal and Canada’s Nepali cinema community.",
  keywords: [
    "Puskar Bhatta social media",
    "Puskar Bhatta Facebook",
    "Puskar Bhatta YouTube",
    "Puskar Bhatta press coverage",
    "Puskar Bhatta interviews",
    "Makalu Khabar Puskar Bhatta",
    "MeroFilm Puskar Bhatta",
    "Nepali actor social media",
    "Nepali cinema news online",
    "Puskar Bhatta Canada interview",
    "Nepali film reel coverage",
  ],
  openGraph: {
    title: "Puskar Bhatta — Social Media & Press Coverage",
    description:
      "Browse social media posts, Facebook reels, YouTube features, and news coverage about Puskar Bhatta.",
    url: "https://puskarbhatt.com/gallery/social",
  },
  alternates: {
    canonical: "https://puskarbhatt.com/gallery/social",
  },
};

export default function SocialGalleryPage() {
  return <SocialGalleryClient />;
}
