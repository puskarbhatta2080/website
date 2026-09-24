"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

const NEWS_IMAGES = [
  "/news/Reel Life Villain.webp",
  "/news/REEL-LIFE VILLAIN.webp",
  "/news/South Indian News.webp",
  "/news/Certificate of appreciation.webp",
  "/news/Puskar bhatta returns after 10 years with  12 Gau 2.webp",
  "/news/कोह्ल्वी युवा परिवार.webp",
  "/news/खतरनाक खलनायक.webp",
  "/news/खलनायक पुस्कर , CANADA मा सम्मानित.webp",
  "/news/ग्रोबरको बाटोमा (2).webp",
  "/news/ग्रोबरको बाटोमा.webp",
  "/news/पुस्कर भट्ट , खलनायक.webp",
  "/news/पुस्करलाइ सुटिंगमा भ्याई नभ्याई.webp",
  "/news/राजेन्द्र र पुस्कर सम्मानित.webp",
  "/news/सुदुरपस्चिमको सुन्दरतालाइ बिस्वभर चिनाउछु.webp",
  "/news/हुस्सुले सुटिंग रोकियो.webp",
];

const NEWS_ITEMS = [
  {
    date: "2025-03-15",
    title: "Puskar Bhatta Brings a New Villainous Edge to the Screen",
    category: "Press Release",
    description:
      "The actor’s latest role announcement has sparked fresh interest in his intense, layered performance style and on-screen presence.",
  },
  {
    date: "2025-02-28",
    title: "Puskar Bhatta Featured in National Film Coverage",
    category: "Media",
    description:
      "A prominent film feature spotlighted his craft, screen intensity, and continuing influence in Nepali and South Asian cinema.",
  },
  {
    date: "2025-01-12",
    title: "Festival Spotlight Highlights Puskar Bhatta’s Performance Work",
    category: "Festival",
    description:
      "Industry coverage praised his command of character, timing, and the emotional weight he brings to antagonist roles.",
  },
  {
    date: "2024-11-05",
    title: "Puskar Bhatta Receives Recognition for Cinematic Contribution",
    category: "Honour",
    description:
      "The recognition celebrated his contribution to performance-driven cinema and the memorable character work that defines his screen identity.",
  },
  {
    date: "2024-09-20",
    title: "Official Announcement: Puskar Bhatta Returns with a Major Screen Project",
    category: "Announcement",
    description:
      "The production update confirmed his return to another high-impact role, reigniting anticipation around his next cinematic chapter.",
  },
  {
    date: "2024-07-08",
    title: "Puskar Bhatta in Conversation on Craft and Character",
    category: "Interview",
    description:
      "The discussion focused on preparation, performance discipline, and the artistic process behind creating powerful antagonist roles.",
  },
  {
    date: "2024-05-14",
    title: "Puskar Bhatta Continues to Lead the Conversation Around Film Performance",
    category: "Industry",
    description:
      "Recent media and press coverage underscored his reputation for compelling screen presence and unforgettable character study.",
  },
];

function getImageForIndex(idx: number): string {
  return NEWS_IMAGES[idx % NEWS_IMAGES.length];
}

interface CardTilt {
  rx: number;
  ry: number;
  glowX: number;
  glowY: number;
}

export default function News() {
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [cardTilts, setCardTilts] = useState<Record<number, CardTilt>>({});

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

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-news-card]")
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

    const featuredNode = document.querySelector<HTMLElement>(
      "[data-news-featured]"
    );
    if (featuredNode) {
      io.observe(featuredNode);
    }

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // If the featured card is observed via intersection, we need a separate handler
    const featuredNode = document.querySelector<HTMLElement>(
      "[data-news-featured]"
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

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Featured item is the first news item
  const featured = NEWS_ITEMS[0];
  const gridItems = NEWS_ITEMS.slice(1, 7);

const NEWS_LIGHTBOX_ALT = [
    "Reel Life Villain",
    "REEL-LIFE VILLAIN",
    "South Indian News",
    "Certificate of appreciation",
    "Puskar bhatta returns after 10 years with 12 Gau 2",
    "कोह्ल्वी युवा परिवार",
    "खतरनाक खलनायक",
    "खलनायक पुस्कर , CANADA मा सम्मानित",
    "ग्रोबरको बाटोमा (2)",
    "ग्रोबरको बाटोमा",
    "पुस्कर भट्ट , खलनायक",
    "पुस्करलाइ सुटिंगमा भ्याई नभ्याई",
    "राजेन्द्र र पुस्कर सम्मानित",
    "सुदुरपस्चिमको सुन्दरतालाइ बिस्वभर चिनाउछु",
    "हुस्सुले सुटिंग रोकियो",
  ];

  // Lightbox state
  const newsLightboxImages: LightboxImage[] = NEWS_IMAGES.map((src, idx) => ({
    src,
    alt: NEWS_LIGHTBOX_ALT[idx] ?? `News image ${idx + 1}`,
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? newsLightboxImages.length - 1 : prev - 1
    );
  }, [newsLightboxImages.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === newsLightboxImages.length - 1 ? 0 : prev + 1
    );
  }, [newsLightboxImages.length]);

  return (
    <section id="news" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Global vignette for the section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_30%_0%,rgba(220,38,38,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_90%,rgba(220,38,38,0.07),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.55))]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              News & Updates
            </h3>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              Latest announcements, press coverage, and career milestones from
              the world of Puskar Bhatta.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery/news"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-4 py-2 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition"
            >
              View More →
            </Link>
            <div className="h-[2px] w-10 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.35)]" />
            <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/80">
              Official Updates
            </span>
          </div>
        </header>

        {/* Marquee headlines strip */}
        <div className="mt-10 relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.18)] bg-black/30 backdrop-blur-sm">
          <div className="absolute inset-0 [background:radial-gradient(600px_circle_at_20%_40%,rgba(220,38,38,0.18),transparent_55%),radial-gradient(600px_circle_at_80%_60%,rgba(220,38,38,0.10),transparent_60%)]" />
          <div className="relative px-5 py-4">
            <div className="flex gap-6 items-center">
              <span className="inline-flex items-center rounded-full border border-[rgba(220,38,38,0.25)] px-3 py-1 text-[11px] uppercase tracking-widest font-black text-[#d4d4d8] shadow-[0_0_30px_rgba(220,38,38,0.12)]">
                LATEST HEADLINES
              </span>
              <div className="min-w-0 flex-1">
                <div className="whitespace-nowrap text-[#dc2626] uppercase tracking-[0.22em] font-black text-[12px] animate-[marquee_18s_linear_infinite]">
                  PUSKAR BHATTA • PRESS • ANNOUNCEMENTS • FESTIVAL • COVERAGE • COLLABORATIONS • PUSKAR BHATTA • PRESS • ANNOUNCEMENTS • FESTIVAL • COVERAGE • COLLABORATIONS •
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FEATURED NEWS — Hero Card with Full-Bleed Image ===== */}
        <div
          data-news-featured
          onClick={() => openLightbox(0)}
          className={
            "mt-10 relative overflow-hidden rounded-[22px] border border-[rgba(220,38,38,0.20)] transition-all duration-700 group cursor-pointer " +
            (featuredVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5")
          }
        >
          <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
            {/* Background Image */}
            <Image
              src={getImageForIndex(0)}
              alt={featured.title}
              fill
              sizes="(max-width: 640px) 100vw, 1200px"
              className="object-cover object-center select-none animate-[kenburns_20s_ease-in-out_infinite]"
              priority
            />

            {/* Cinematic gradient shroud */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/20" />
            <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_20%_30%,rgba(220,38,38,0.25),transparent_55%)]" />
            <div className="absolute inset-0 [background:radial-gradient(800px_circle_at_80%_70%,rgba(220,38,38,0.12),transparent_55%)]" />

            {/* Scan line effect */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_4px)]"
            />

            {/* Featured content overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-6 sm:p-8 md:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm px-3 py-1 shadow-[0_0_30px_rgba(220,38,38,0.18)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626] shadow-[0_0_10px_rgba(220,38,38,0.65)] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.18em] font-black text-[#d4d4d8]">
                    Featured Story
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-black text-[#d4d4d8]/60">
                    — {formatDate(featured.date)}
                  </span>
                </div>

                <h4 className="mt-4 text-[26px] sm:text-[32px] md:text-[38px] leading-[1.05] font-black uppercase tracking-[0.06em] text-[#d4d4d8] max-w-3xl">
                  {featured.title}
                </h4>

                <p className="mt-3 text-[#d4d4d8]/80 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
                  {featured.description}
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <span className="inline-flex items-center rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 px-3 py-1 text-[11px] uppercase tracking-widest font-black text-[#d4d4d8] shadow-[0_0_20px_rgba(220,38,38,0.10)]">
                    {featured.category}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/50">
                    Read More →
                  </span>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 h-24 w-24 [background:radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)] blur-sm opacity-60" />
          </div>
        </div>

        {/* ===== NEWS GRID — Image-backed Cinematic Cards ===== */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridItems.map((item, idx) => {
            const isVis = !!visible[idx + 1];
            const imgSrc = getImageForIndex(idx + 1);
            return (
              <article
                key={item.title + item.date}
                ref={(el) => { cardRefs.current[idx + 1] = el; }}
                data-news-card
                data-index={idx + 1}
                onClick={() => openLightbox(idx + 1)}
                onMouseMove={(e) => handleCardMouse(idx + 1, e.clientX, e.clientY, true)}
                onMouseEnter={(e) => handleCardMouse(idx + 1, e.clientX, e.clientY, true)}
                onMouseLeave={() => handleCardMouse(idx + 1, 0, 0, false)}
                className={
                  "group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.16)] bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.08)] cursor-pointer " +
                  (isVis
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5")
                }
                style={{
                  perspective: "800px",
                  transform: cardTilts[idx + 1]
                    ? `rotateX(${cardTilts[idx + 1].rx}deg) rotateY(${cardTilts[idx + 1].ry}deg)`
                    : "rotateX(0deg) rotateY(0deg)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: isVis ? "600ms, 600ms" : "600ms, 600ms",
                  transitionTimingFunction: "ease, ease",
                  transitionDelay: `${(idx + 1) * 100}ms, ${(idx + 1) * 100}ms`,
                }}
              >
                {/* Cursor-follow spotlight glow */}
                {cardTilts[idx + 1] && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[-1px] z-10"
                    style={{
                      background: `radial-gradient(350px circle at ${cardTilts[idx + 1].glowX}% ${cardTilts[idx + 1].glowY}%, rgba(220,38,38,0.35), transparent 60%)`,
                    }}
                  />
                )}

                {/* Image layer */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-all duration-700 group-hover:scale-[1.08] grayscale group-hover:grayscale-0"
                  />

                  {/* Gradient shroud for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />

                  {/* Hover crimson glow */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_30%_20%,rgba(220,38,38,0.28),transparent_60%),radial-gradient(400px_circle_at_80%_80%,rgba(220,38,38,0.12),transparent_55%)]"
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm px-3 py-1 shadow-[0_0_20px_rgba(220,38,38,0.12)]">
                      <span className="text-[9px] uppercase tracking-[0.16em] font-black text-[#d4d4d8]">
                        {item.category}
                      </span>
                    </span>
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">
                      {formatDate(item.date)}
                    </p>
                    <h4 className="mt-1.5 text-[16px] leading-[1.15] uppercase tracking-[0.06em] font-black text-[#dc2626] transition-all duration-300 group-hover:text-[#d4d4d8]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[#d4d4d8]/70 text-[12px] leading-relaxed line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
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
          
        </div>
      </div>

      {/* Cinematic lightbox */}
      {lightboxOpen && (
        <CinematicLightbox
          images={newsLightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}

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

