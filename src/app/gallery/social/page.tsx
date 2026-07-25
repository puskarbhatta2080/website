import type { Metadata } from "next";
import SocialGalleryClient from "./client";

export const metadata: Metadata = {
  title: "Social & Press Gallery — Puskar Bhatt",
  description: "Browse all social media posts, Facebook features, and online news coverage of Puskar Bhatt.",
};

export default function SocialGalleryPage() {
  return <SocialGalleryClient />;
}

