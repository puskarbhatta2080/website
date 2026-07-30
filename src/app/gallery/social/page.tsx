import type { Metadata } from "next";
import SocialGalleryClient from "./client";

export const metadata: Metadata = {
  title: "Social & Press Coverage",
  description:
    "Browse all social media posts, Facebook Reels, YouTube videos, and online news coverage of Puskar Bhatt — Nepali cinema's ultimate antagonist. Includes Makalu Khabar articles and MeroFilm features.",
  keywords: [
    "Puskar Bhatt social media",
    "Nepali actor Facebook",
    "Puskar Bhatt Makalu Khabar",
    "MeroFilm Puskar Bhatt",
    "Puskar Bhatt YouTube",
    "Nepali film reel",
    "Puskar Bhatt Facebook",
    "Puskar Bhatt interviews",
    "Nepali cinema social media",
    "Puskar Bhatt press coverage",
    "Nepali actor news online",
    "Puskar Bhatt Canada interview",
  ],
  openGraph: {
    title: "Puskar Bhatt — Social & Press Coverage Gallery",
    description:
      "Browse social media posts, Facebook Reels, YouTube videos, and news articles about Puskar Bhatt.",
  },
};

export default function SocialGalleryPage() {
  return <SocialGalleryClient />;
}
