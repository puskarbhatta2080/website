"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

type GalleryPageProps = {
  title: string;
  subtitle: string;
  images: LightboxImage[];
  backHref?: string;
};

export default function GalleryPage({
  title,
  subtitle,
  images,
  backHref = "/#gallery",
}: GalleryPageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  return (
    <>
      <section className="relative min-h-screen py-20 px-4 sm:px-6 overflow-hidden">
        {/* Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_50%_0%,rgba(220,38,38,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_85%,rgba(220,38,38,0.07),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.55))]"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Back navigation */}
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/30 backdrop-blur-sm px-4 py-2 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] hover:bg-black/50 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.10)] mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>

          {/* Header */}
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <h1 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[28px] sm:text-[34px]">
                {title}
              </h1>
              <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-10 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.35)]" />
              <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/80">
                {images.length} {images.length === 1 ? "Image" : "Images"}
              </span>
            </div>
          </header>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {images.map((img, idx) => (
              <button
                key={img.src + idx}
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.16)] bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.08)] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50"
                style={{
                  aspectRatio: "4/3",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-center transition-all duration-500 group-hover:scale-[1.06] grayscale group-hover:grayscale-0"
                />

                {/* Gradient shroud */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent opacity-60" />

                {/* Hover crimson glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_30%_20%,rgba(220,38,38,0.28),transparent_60%),radial-gradient(400px_circle_at_80%_80%,rgba(220,38,38,0.12),transparent_55%)]"
                />

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 h-9 w-9 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.18)]">
                  <span className="text-[11px] font-black text-[#dc2626]">+</span>
                </div>

                {/* Image number */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full border border-[rgba(220,38,38,0.25)] bg-black/40 backdrop-blur-sm px-3 py-1 shadow-[0_0_20px_rgba(220,38,38,0.12)]">
                    <span className="text-[9px] uppercase tracking-[0.16em] font-black text-[#d4d4d8]">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </span>
                </div>

                {/* Alt text at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[#d4d4d8]/80 truncate opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {img.alt}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/30 backdrop-blur-sm px-6 py-3 text-[13px] uppercase tracking-widest font-black text-[#d4d4d8] hover:bg-black/50 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.10)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Cinematic lightbox */}
      {lightboxOpen && (
        <CinematicLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </>
  );
}

