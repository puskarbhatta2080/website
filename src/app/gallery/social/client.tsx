"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const THUMBNAIL_FILES = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];

function getThumbnail(idx: number): string {
  return `/thumbnail/${THUMBNAIL_FILES[idx % THUMBNAIL_FILES.length]}`;
}

const SOCIAL_POSTS = [
  {
    src: getThumbnail(0),
    title: "Pushkar Bhatt Returns to Films After 10 Years with '12 Gaun 2'",
    source: "Makalu Khabar",
    url: "https://english.makalukhabar.com/pushkar-bhatt-returns-to-films-after-10-years-with-12-gaun-2/",
    date: "2025-03-20",
  },
  {
    src: getThumbnail(1),
    title: "Pushkar Bhatt — Exclusive Feature on MeroFilm",
    source: "MeroFilm",
    url: "https://www.merofilm.com/news/detail/79612/",
    date: "2025-03-18",
  },
  {
    src: getThumbnail(2),
    title: "Pushkar Bhatt — YouTube Feature Video",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=PoyCfFHqAUo&t=39s",
    date: "2025-03-15",
  },
  {
    src: getThumbnail(3),
    title: "Behind the Scenes — Exclusive Reel",
    source: "Facebook Reel",
    url: "https://www.facebook.com/reel/1967180443886860/",
    date: "2025-03-12",
  },
  {
    src: getThumbnail(4),
    title: "Villain on Set — Cinematic Moments",
    source: "Facebook Reel",
    url: "https://www.facebook.com/reel/928089563259962/",
    date: "2025-03-10",
  },
  {
    src: getThumbnail(5),
    title: "Character Tease — Coming Soon",
    source: "Facebook Reel",
    url: "https://www.facebook.com/reel/2120457958768983",
    date: "2025-03-08",
  },
  {
    src: getThumbnail(0),
    title: "Rehearsal Room — Intensity Unleashed",
    source: "Facebook Reel",
    url: "https://www.facebook.com/reel/1443780367341737",
    date: "2025-03-05",
  },
  {
    src: getThumbnail(1),
    title: "Film Shoot — Raw & Unfiltered",
    source: "Facebook Reel",
    url: "https://www.facebook.com/reel/903977175696997",
    date: "2025-03-02",
  },
];

const SOURCE_ICONS: Record<string, string> = {
  Facebook: "📘",
  "Facebook Reel": "📘",
  Instagram: "📸",
  YouTube: "▶️",
  "Online Khabar": "📰",
  "Makalu Khabar": "📰",
  MeroFilm: "🎬",
};

interface CardTilt {
  rx: number;
  ry: number;
  glowX: number;
  glowY: number;
}

export default function SocialGalleryClient() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [cardTilts, setCardTilts] = useState<Record<number, CardTilt>>({});
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleCardMouse = useCallback(
    (idx: number, clientX: number, clientY: number, entering: boolean) => {
      const el = cardRefs.current[idx];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (entering) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (clientX - cx) / (rect.width / 2);
        const dy = (clientY - cy) / (rect.height / 2);
        setCardTilts((prev) => ({
          ...prev,
          [idx]: {
            rx: -dy * 6,
            ry: dx * 6,
            glowX: ((clientX - rect.left) / rect.width) * 100,
            glowY: ((clientY - rect.top) / rect.height) * 100,
          },
        }));
      } else {
        setCardTilts((prev) => {
          const next = { ...prev };
          delete next[idx];
          return next;
        });
      }
    },
    []
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const fallbackSrc = "/news/Reel Life Villain.webp";

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_50%_0%,rgba(220,38,38,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_85%,rgba(220,38,38,0.07),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.55))]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Back to Home */}
        <Link
          href="/#social"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/30 backdrop-blur-sm px-4 py-2 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] hover:bg-black/50 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.10)] mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h1 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[28px] sm:text-[34px]">
              Social & Press
            </h1>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              All social media posts, Facebook Reels, YouTube videos, and online news coverage.
              Click any card to open the original article in a new tab.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-10 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.35)]" />
            <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/80">
              {SOCIAL_POSTS.length} Posts
            </span>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SOCIAL_POSTS.map((post, idx) => (
            <a
              key={post.url + idx}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { cardRefs.current[idx] = el; }}
              onMouseMove={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
              onMouseEnter={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
              onMouseLeave={() => handleCardMouse(idx, 0, 0, false)}
              className="group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.16)] bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.08)] cursor-pointer block"
              style={{
                perspective: "800px",
                transform: cardTilts[idx]
                  ? `rotateX(${cardTilts[idx].rx}deg) rotateY(${cardTilts[idx].ry}deg)`
                  : "rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.15s ease-out",
              }}
            >
              {cardTilts[idx] && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[-1px] z-10"
                  style={{
                    background: `radial-gradient(350px circle at ${cardTilts[idx].glowX}% ${cardTilts[idx].glowY}%, rgba(220,38,38,0.35), transparent 60%)`,
                  }}
                />
              )}

              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <Image
                  src={imgErrors[idx] ? fallbackSrc : post.src}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
className="object-cover object-center transition-all duration-500 group-hover:scale-[1.06]"
onError={() => setImgErrors((prev) => ({ ...prev, [idx]: true }))}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-transparent" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_30%_20%,rgba(220,38,38,0.28),transparent_60%),radial-gradient(400px_circle_at_80%_80%,rgba(220,38,38,0.12),transparent_55%)]"
                />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/40 backdrop-blur-sm px-3 py-1 shadow-[0_0_20px_rgba(220,38,38,0.12)]">
                    <span className="text-[11px]">{SOURCE_ICONS[post.source] ?? "🌐"}</span>
                    <span className="text-[9px] uppercase tracking-[0.16em] font-black text-[#d4d4d8]">
                      {post.source}
                    </span>
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="h-8 w-8 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.15)] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-[11px] font-black text-[#dc2626]">↗</span>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  {post.date && (
                    <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">
                      {formatDate(post.date)}
                    </p>
                  )}
                  <h4 className="mt-1.5 text-[14px] leading-[1.15] uppercase tracking-[0.06em] font-black text-[#dc2626] transition-all duration-300 group-hover:text-[#d4d4d8] line-clamp-2">
                    {post.title}
                  </h4>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <Link
            href="/#social"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/30 backdrop-blur-sm px-6 py-3 text-[13px] uppercase tracking-widest font-black text-[#d4d4d8] hover:bg-black/50 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.10)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
