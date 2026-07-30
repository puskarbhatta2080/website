"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

/**
 * Filmography — Interactive Slate & Glassmorphism Deck
 * - Shows max 8 cards on homepage, rest via "View More" → /gallery/filmography
 * - Glassmorphism: blurred backdrop, frosty borders, subtle crimson glows
 * - 3D tilt on hover
 * - Click: expands into frosted detail panel + lightbox
 */

const FILENAMES = [
  "१२ गाउँ 2 (12 Gaun) - 2026 AD",
  "अग्नि ज्वाला (Agni Jwala) - 2003 AD",
  "आफ्नो मान्छे आफ्नै हुन्छ 2010 AD",
  "कहाँ छौ कहाँ (Kaha Chhau Kaha) - 2010 AD",
  "गंगाजल (Gangajal) - 2010 AD",
  "जलजला (Jaljala) - 2012 AD",
  "जाबंज जिगरवाले(jabaaz jigarwale) 2015",
  "तुलसी (Tulsi) - 2018 AD",
  "दुर्गा(Durga) 2014",
  "प्रहार (Prahaar) 2011 AD",
  "फर्ज (Farz) - 2012 AD",
  "फैसला (Faisala) - 2011 AD",
  "बिरताको चिनो (Birata Ko Chino) - 2011 AD",
  "बिरासत (Birasat) - 2008 AD",
  "ब्रेक फेल (Break Fail) - 2012 AD",
  "भागी भागी नजाऊ (Bhagi Bhagi Najau) - 2012 AD",
  "म बिर्सु कसरि (Ma Birsu Kasari) 2011",
  "माया दिउँ झैं भयो (Maya Dium Jhai Bhayo) - 2011 AD",
  "राम जाने (Ram Jane) - 2006 AD",
  "सलाम  छ  मायालाई (Salam Cha Mayalaai)2009",
  "हिम्मतवाली (Himmatwali) - 2014 AD",
];

const MAX_VISIBLE = 8;

const MOVIES = FILENAMES.map((name) => {
  const isJpg =
    name === "१२ गाउँ 2 (12 Gaun) - 2026 AD" ||
    name === "आफ्नो मान्छे आफ्नै हुन्छ 2010 AD" ||
    name === "कहाँ छौ कहाँ (Kaha Chhau Kaha) - 2010 AD" ||
    name === "जाबंज जिगरवाले(jabaaz jigarwale) 2015" ||
    name === "तुलसी (Tulsi) - 2018 AD" ||
    name === "दुर्गा(Durga) 2014" ||
    name === "फर्ज (Farz) - 2012 AD" ||
    name === "फैसला (Faisala) - 2011 AD" ||
    name === "बिरताको चिनो (Birata Ko Chino) - 2011 AD" ||
    name === "माया दिउँ झैं भयो (Maya Dium Jhai Bhayo) - 2011 AD" ||
    name === "राम जाने (Ram Jane) - 2006 AD";
  const ext = isJpg ? ".jpg" : ".webp";

  // Extract year from filename
  const yearMatch = name.match(/(\d{4})\s*(AD)?/);
  const year = yearMatch ? yearMatch[1] : "";

  // Cleaner display name: extract Nepali + English parts
  const displayName = name.replace(/\s*-\s*\d{4}\s*AD\s*$/, "").replace(/\s*\d{4}\s*$/, "");

  return {
    title: name,
    displayName: displayName || name,
    year,
    src: `/filmography/${name}${ext}`,
  };
});

const visibleMovies = MOVIES.slice(0, MAX_VISIBLE);
const filmImages: LightboxImage[] = MOVIES.map((m) => ({
  src: m.src,
  alt: m.title,
}));

interface CardTilt {
  rx: number;
  ry: number;
  glowX: number;
  glowY: number;
}

// Helper to parse year and movie name from filename
function parseMovieInfo(filename: string) {
  const yearMatch = filename.match(/(\d{4})\s*(AD)?/);
  const year = yearMatch ? yearMatch[1] : "";
  const nameClean = filename.replace(/\s*[-–]\s*\d{4}\s*AD\s*$/, "").replace(/\s*\d{4}\s*$/, "").trim();
  return { name: nameClean, year };
}

export default function Filmography() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [cardTilts, setCardTilts] = useState<Record<number, CardTilt>>({});
  const [vis, setVis] = useState(false);
  const sr = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sr.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
            rx: -dy * 10,
            ry: dx * 10,
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

  const openLightbox = useCallback((idx: number) => {
    setSelectedMovie(null);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? filmImages.length - 1 : prev - 1));
  }, []);
  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev === filmImages.length - 1 ? 0 : prev + 1));
  }, []);

  const openDetail = useCallback((idx: number) => {
    setSelectedMovie(selectedMovie === idx ? null : idx);
  }, [selectedMovie]);

  return (
    <section
      id="filmography"
      ref={sr}
      className="relative py-24 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: "#07080b" }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(1200px circle at 20% 0%, rgba(220,38,38,0.06), transparent 55%),
            radial-gradient(800px circle at 80% 100%, rgba(220,38,38,0.04), transparent 50%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-red-400/60">
                Filmography
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent via-red-500/40 to-transparent" />
            </div>
            <h2
              className="text-[38px] sm:text-[56px] font-black uppercase tracking-[0.04em] leading-[0.9]"
              style={{ color: "#e2e8f0" }}
            >
              The Reel Legacy
            </h2>
            <p className="mt-4 text-[14px] max-w-xl leading-relaxed text-slate-400/80">
              A curated deck of antagonist performances — each entry a study in controlled menace.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/gallery/filmography"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-bold"
              style={{ color: "rgba(220,38,38,0.7)" }}
            >
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-red-500/30 group-hover:w-10 transition-all duration-300" />
              <span className="group-hover:tracking-[0.3em] transition-all duration-300">
                View All {MOVIES.length} Films
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-red-500/30 group-hover:w-10 transition-all duration-300" />
            </Link>
          </div>
        </header>

        {/* Glassmorphism Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {visibleMovies.map((m, idx) => {
            const tilt = cardTilts[idx];
            const info = parseMovieInfo(m.title);
            const isSelected = selectedMovie === idx;

            return (
              <motion.div
                key={m.title}
                layout
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={vis ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
              >
                {/* Glassmorphism Card */}
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (window.innerWidth >= 640) {
                      openDetail(idx);
                    } else {
                      openLightbox(idx);
                    }
                  }}
                  onMouseMove={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
                  onMouseEnter={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
                  onMouseLeave={() => handleCardMouse(idx, 0, 0, false)}
                  className="relative overflow-hidden rounded-[20px] cursor-pointer select-none transition-all duration-300"
                  style={{
                    perspective: "1000px",
                    transform: tilt
                      ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                      : "rotateX(0deg) rotateY(0deg)",
                    transition: "transform 0.12s ease-out",
                    background: isSelected
                      ? "rgba(15,23,42,0.85)"
                      : "rgba(15,23,42,0.4)",
                    backdropFilter: isSelected ? "blur(32px)" : "blur(20px)",
                    WebkitBackdropFilter: isSelected ? "blur(32px)" : "blur(20px)",
                    border: isSelected
                      ? "1.5px solid rgba(220,38,38,0.4)"
                      : "1px solid rgba(220,38,38,0.12)",
                    boxShadow: isSelected
                      ? "0 0 60px rgba(220,38,38,0.15), 0 0 120px rgba(220,38,38,0.06)"
                      : tilt
                      ? `0 ${tilt.ry * 0.3}px ${Math.abs(tilt.ry) * 2 + 20}px rgba(220,38,38,0.18)`
                      : "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Cursor-follow glow */}
                  {tilt && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[-1px] rounded-[20px]"
                      style={{
                        background: `radial-gradient(500px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(220,38,38,0.35), transparent 60%)`,
                      }}
                    />
                  )}

                  {/* Frosted border shine */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[-1px] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(220,38,38,0.15) 0%, transparent 40%, transparent 60%, rgba(220,38,38,0.08) 100%)",
                    }}
                  />

                  {/* Poster Image */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]">
                    <Image
                      src={m.src}
                      alt={m.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-all duration-500 group-hover:scale-[1.05]"
                      style={{
                        filter: isSelected ? "brightness(0.6)" : "brightness(0.85)",
                      }}
                    />

                    {/* Dark gradient overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(7,8,11,0.85) 100%)",
                      }}
                    />

                    {/* Selected state overlay */}
                    {isSelected && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(220,38,38,0.08) 0%, transparent 50%, rgba(7,8,11,0.6) 100%)",
                        }}
                      />
                    )}

                    {/* Film entry number (production slate style) */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-[10px] font-black tracking-widest"
                        style={{
                          background: "rgba(0,0,0,0.6)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(220,38,38,0.2)",
                          color: "rgba(220,38,38,0.7)",
                        }}
                      >
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Card info overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <span
                            className="inline-block text-[9px] uppercase tracking-[0.22em] font-black px-2 py-0.5 rounded mb-2"
                            style={{
                              color: info.year
                                ? "rgba(220,38,38,0.85)"
                                : "rgba(148,163,184,0.5)",
                              background: info.year
                                ? "rgba(220,38,38,0.12)"
                                : "rgba(15,23,42,0.5)",
                              border: info.year
                                ? "1px solid rgba(220,38,38,0.2)"
                                : "1px solid rgba(148,163,184,0.1)",
                            }}
                          >
                            {info.year || "Film"}
                          </span>
                          <h4
                            className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.06em] leading-tight truncate"
                            style={{ color: "#f1f5f9" }}
                          >
                            {info.name}
                          </h4>
                        </div>
                        <motion.div
                          animate={{ rotate: isSelected ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <div
                            className="h-9 w-9 rounded-full flex items-center justify-center"
                            style={{
                              background: "rgba(220,38,38,0.12)",
                              border: "1px solid rgba(220,38,38,0.2)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="rgba(220,38,38,0.7)"
                              strokeWidth="2.5"
                            >
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Glass Detail Panel */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden rounded-b-[20px] -mt-1"
                      style={{
                        background: "rgba(15,23,42,0.75)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(220,38,38,0.15)",
                        borderTop: "none",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div className="p-5 space-y-4">
                        {/* Movie title */}
                        <div>
                          <p
                            className="text-[10px] uppercase tracking-[0.2em] font-black mb-1.5"
                            style={{ color: "rgba(220,38,38,0.6)" }}
                          >
                            Film Entry
                          </p>
                          <h5
                            className="text-[15px] font-black uppercase tracking-[0.04em] leading-tight"
                            style={{ color: "#e2e8f0" }}
                          >
                            {info.name}
                          </h5>
                        </div>

                        {/* Divider */}
                        <div
                          className="h-[1px] w-full"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(220,38,38,0.3), transparent)",
                          }}
                        />

                        {/* Key details */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p
                              className="text-[9px] uppercase tracking-[0.15em] font-black mb-1"
                              style={{ color: "rgba(148,163,184,0.5)" }}
                            >
                              Release Year
                            </p>
                            <p
                              className="text-[13px] font-bold"
                              style={{ color: "#cbd5e1" }}
                            >
                              {info.year || "TBA"}
                            </p>
                          </div>
                          <div>
                            <p
                              className="text-[9px] uppercase tracking-[0.15em] font-black mb-1"
                              style={{ color: "rgba(148,163,184,0.5)" }}
                            >
                              Role
                            </p>
                            <p
                              className="text-[13px] font-bold"
                              style={{ color: "#cbd5e1" }}
                            >
                              Antagonist
                            </p>
                          </div>
                        </div>

                        {/* View full image CTA */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMovie(null);
                            setTimeout(() => openLightbox(idx), 200);
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-[11px] uppercase tracking-widest font-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            background: "rgba(220,38,38,0.1)",
                            border: "1px solid rgba(220,38,38,0.2)",
                            color: "rgba(220,38,38,0.8)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          View Poster
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer with view all */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={vis ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/gallery/filmography"
            className="group inline-flex items-center gap-4 rounded-full px-8 py-4 text-[12px] uppercase tracking-[0.28em] font-black transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.15)",
              color: "rgba(220,38,38,0.7)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 40px rgba(220,38,38,0.06)",
            }}
          >
            <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-red-500/30 group-hover:w-12 transition-all duration-300" />
            <span className="group-hover:tracking-[0.35em] transition-all duration-300">
              Complete Filmography — {MOVIES.length} Films
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-red-500/30 group-hover:w-12 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Cinematic lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <CinematicLightbox
            images={filmImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

