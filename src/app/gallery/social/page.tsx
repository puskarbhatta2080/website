import type { Metadata } from "next";
import SocialGalleryClient from "./client";

export const metadata: Metadata = {
  title: "Social & Press Coverage",
  description:
    "Browse all social media posts, Facebook Reels, YouTube videos, and online news coverage of Puskar Bhatta — Nepali cinema's ultimate antagonist. Includes Makalu Khabar articles and MeroFilm features.",
  keywords: [
    "Puskar Bhatta social media",
    "Nepali actor Facebook",
    "Puskar Bhatta Makalu Khabar",
    "MeroFilm Puskar Bhatta",
    "Puskar Bhatta YouTube",
    "Nepali film reel",
    "Puskar Bhatta Facebook",
    "Puskar Bhatta interviews",
    "Nepali cinema social media",
    "Puskar Bhatta press coverage",
    "Nepali actor news online",
    "Puskar Bhatta Canada interview",
  ],
  openGraph: {
    title: "Puskar Bhatta — Social & Press Coverage Gallery",
    description:
      "Browse social media posts, Facebook Reels, YouTube videos, and news articles about Puskar Bhatta.",
  },
};

export default function SocialGalleryPage() {
  return <SocialGalleryClient />;
}
