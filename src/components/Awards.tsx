"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Awards & Recognition Section — Cinematic Image Edition
 * - Featured hero award card with full-bleed image + Ken Burns zoom
 * - Grid of award cards, each with cinematic image background
 * - Scroll-reveal, hover overlays, category badges, trophy accents
 *
 * MEDIA: Images from /public/award/ folder.
 * Replace the placeholder data with Puskar Bhatt's real awards.
 */

const AWARD_IMAGES = [
  "/award/2f175c12-7da3-4e5e-82b7-96bc7152bd20.jpg",
  "/award/3de07ccb-8243-4ad5-aa98-456deb4423b0.jpg",
  "/award/4d162db9-1609-4f6e-9746-351b2088c4b7.jpg",
  "/award/5ee33416-c4cb-4b30-baa5-c9255912f25f.jpg",
  "/award/6b22a6ae-8bbc-42d8-8622-f595264fded7.jpg",
  "/award/8ac7e3ba-e22f-45a1-8924-1c5ee73aae62.jpg",
  "/award/8baac643-4914-4fcc-8861-2d59361d3281.jpg",
  "/award/075d73cf-84fe-49ed-9ea4-2b24226a1de0.jpg",
  "/award/84e2214c-e020-4fb3-b164-0bf4147010a5.jpg",
  "/award/88e9d7d2-22d6-4680-abbd-765e5ba4e160.jpg",
  "/award/93b3de55-a394-40bf-b8c6-d5c4fe151bd1.jpg",
  "/award/430ded95-5d14-4e47-ae03-e9b034b47652.jpg",
  "/award/1499a539-27d8-4200-9dc6-a6737526e90a.jpg",
  "/award/b3ce9787-77bf-4b27-a3ae-c6df4d688da4.jpg",
  "/award/bedcd64e-a90f-4454-9d15-b373987bcb53.jpg",
  "/award/c06d64e2-e7bc-4d2e-8d31-9ff0ba8331a5.jpg",
  "/award/e23d4c4e-489c-4eb7-a8f8-1bf4e7ed19f9.jpg",
];

const AWARDS = [
  {
    title: "Best Villain Performance",
    year: "2024",
    project: "Gangajal",
    description:
      "Critically acclaimed for a blood-soaked portrayal that redefined menace in Nepali cinema.",
  },
  {
    title: "Outstanding Negative Role",
    year: "2023",
    project: "Himmatwali",
    description:
      "Recognized for a predatory, silk-clad performance that dominated every frame.",
  },
  {
    title: "Screen Presence Award",
    year: "2023",
    project: "Jaljalaa",
    description:
      "Awarded for commanding the screen with burning intensity and strategic restraint.",
  },
  {
    title: "Viewer's Choice Antagonist",
    year: "2022",
    project: "Ma Birsu Kasari",
    description:
      "Audience-voted award for a cold-hearted conjurer role that left a lasting impact.",
  },
  {
    title: "Critics' Honor — Villain of the Year",
    year: "2022",
    project: "Salam Cha Mayalai",
    description:
      "Praised for a nightmare-inducing negotiation scene that became the film's defining moment.",
  },
  {
    title: "Lifetime Menace Achievement",
    year: "2024",
    project: "Overall Career",
    description:
      "Celebrating a body of work that has consistently raised the bar for antagonist craft.",
  },
];

function getImageForIndex(idx: number): string {
  return AWARD_IMAGES[idx % AWARD_IMAGES.length];
}

export default function Awards() {
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [featuredVisible, setFeaturedVisible] = useState(false);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-award-card]")
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.index || "-1");
          if (idx >= 0 && e.isIntersecting) {
            setVisible((prev) =>
              prev[idx] ? prev : { ...prev, [idx]: true }
            );
          }
        }
      },
      { threshold: 0.15 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const featuredNode = document.querySelector<HTMLElement>(
      "[data-award-featured]"
    );
    if (!featuredNode) return;
    const ioFeatured = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturedVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    ioFeatured.observe(featuredNode);
    return () => ioFeatured.disconnect();
  }, []);

  // Featured award — first item with extra cinematic treatment
  const featured = AWARDS[0];
  const gridItems = AWARDS.slice(1);

  return (
    <section id="awards" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_50%_0%,rgba(220,38,38,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_85%,rgba(220,38,38,0.07),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.55))]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              Awards & Recognition
            </h3>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              Cinematic craft earns its marks. Each award reflects the relentless
              pursuit of menace, mastery, and presence.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-10 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.35)]" />
            <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/80">
              Trophy Cabinet
            </span>
          </div>
        </header>

        {/* Marquee honor strip */}
        <div className="mt-10 relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.18)] bg-black/30 backdrop-blur-sm">
          <div className="absolute inset-0 [background:radial-gradient(600px_circle_at_30%_20%,rgba(220,38,38,0.18),transparent_55%),radial-gradient(600px_circle_at_70%_80%,rgba(220,38,38,0.10),transparent_60%)]" />
          <div className="relative px-5 py-4">
            <div className="flex gap-6 items-center">
              <span className="inline-flex items-center rounded-full border border-[rgba(220,38,38,0.25)] px-3 py-1 text-[11px] uppercase tracking-widest font-black text-[#d4d4d8] shadow-[0_0_30px_rgba(220,38,38,0.12)]">
                HONOR ROLL
              </span>
              <div className="min-w-0 flex-1">
                <div className="whitespace-nowrap text-[#dc2626] uppercase tracking-[0.22em] font-black text-[12px] animate-[marquee_18s_linear_infinite]">
                  CRITICS • AUDIENCE • CINEMA • MASTERY • CRITICS • AUDIENCE • CINEMA • MASTERY •
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FEATURED AWARD — Hero Card with Full-Bleed Image ===== */}
        <div
          data-award-featured
          className={
            "mt-10 relative overflow-hidden rounded-[22px] border border-[rgba(220,38,38,0.20)] transition-all duration-700 group " +
            (featuredVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5")
          }
        >
          <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
            {/* Hero Background Image */}
            <Image
              src={getImageForIndex(0)}
              alt={featured.title}
              fill
              sizes="(max-width: 640px) 100vw, 1200px"
              className="object-cover object-center select-none animate-[kenburns_20s_ease-in-out_infinite] transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Cinematic gradient shroud layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/45 to-black/25" />
            <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_20%_30%,rgba(220,38,38,0.28),transparent_55%)]" />
            <div className="absolute inset-0 [background:radial-gradient(800px_circle_at_80%_70%,rgba(220,38,38,0.12),transparent_55%)]" />

            {/* Scan lines */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-15 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_4px)]"
            />

            {/* Featured content overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-6 sm:p-8 md:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm px-3 py-1 shadow-[0_0_30px_rgba(220,38,38,0.18)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626] shadow-[0_0_10px_rgba(220,38,38,0.65)] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.18em] font-black text-[#d4d4d8]">
                    Award of the Year
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-black text-[#d4d4d8]/60">
                    — {featured.year}
                  </span>
                </div>

                <h4 className="mt-4 text-[26px] sm:text-[32px] md:text-[38px] leading-[1.05] font-black uppercase tracking-[0.06em] text-[#d4d4d8] max-w-3xl">
                  {featured.title}
                </h4>

                <p className="mt-2 text-[15px] sm:text-[16px] uppercase tracking-[0.12em] font-black text-[#dc2626]">
                  {featured.project}
                </p>

                <p className="mt-3 text-[#d4d4d8]/80 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
                  {featured.description}
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 px-4 py-1.5 text-[11px] uppercase tracking-widest font-black text-[#d4d4d8] shadow-[0_0_20px_rgba(220,38,38,0.10)]">
                    <span className="text-[14px]">🏆</span>
                    Featured Honor
                  </span>
                </div>
              </div>
            </div>

            {/* Corner accent glow */}
            <div className="absolute top-0 right-0 h-24 w-24 [background:radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)] blur-sm opacity-60" />
          </div>
        </div>

        {/* ===== AWARDS GRID — Image-backed Cinematic Cards ===== */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridItems.map((award, idx) => {
            const isVis = !!visible[idx + 1];
            const imgSrc = getImageForIndex(idx + 1);
            return (
              <article
                key={award.title + award.year}
                data-award-card
                data-index={idx + 1}
                className={
                  "group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.16)] bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.08)] " +
                  (isVis
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5")
                }
                style={{
                  transition: "opacity 600ms ease, transform 600ms ease",
                  transitionDelay: `${(idx + 1) * 100}ms`,
                }}
              >
                {/* Image layer */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={award.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-all duration-700 group-hover:scale-[1.08] grayscale group-hover:grayscale-0"
                  />

                  {/* Gradient shroud */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/55 to-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20" />

                  {/* Crimson hover glow */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_30%_20%,rgba(220,38,38,0.28),transparent_60%),radial-gradient(400px_circle_at_80%_80%,rgba(220,38,38,0.12),transparent_55%)]"
                  />

                  {/* Year badge top-left */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm px-3 py-1 shadow-[0_0_20px_rgba(220,38,38,0.12)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.65)]" />
                      <span className="text-[10px] uppercase tracking-[0.16em] font-black text-[#d4d4d8]">
                        {award.year}
                      </span>
                    </span>
                  </div>

                  {/* Trophy icon top-right */}
                  <div className="absolute top-4 right-4">
                    <div className="h-8 w-8 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.15)] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-[13px]">🏆</span>
                    </div>
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">
                      {award.project}
                    </p>
                    <h4 className="mt-1.5 text-[16px] leading-[1.15] uppercase tracking-[0.06em] font-black text-[#dc2626] transition-all duration-300 group-hover:text-[#d4d4d8]">
                      {award.title}
                    </h4>
                    <p className="mt-2 text-[#d4d4d8]/70 text-[12px] leading-relaxed line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {award.description}
                    </p>
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="absolute bottom-5 right-5 h-8 w-8 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.18)]">
                    <span className="text-[11px] font-black text-[#dc2626]">→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-[#d4d4d8]/60 text-[13px]">
          Replace with Puskar Bhatt&apos;s actual awards, years, and project names.
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

