"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

/**
 * Filmography Grid
 * - Uses poster images from /public/filmography
 * - Hover: scale + lift + crimson glow + reveal title in blood red
 * - Click: opens cinematic lightbox with next/prev navigation
 *
 * MEDIA:
 * Place posters inside: public/filmography/
 * Example filenames (existing in your folder):
 *  - filmography/gangajal.webp
 *  - filmography/Himmatwali.webp
 *  - filmography/Jaljalaa.webp
 *  - filmography/Ma Birsu Kasari.webp
 *  - filmography/Salam Cha Mayalai.webp
 */
const MOVIES = [
  {
    title: "Gangajal",
    role: "Blood-Soaked Judge",
    src: "/filmography/gangajal.webp",
  },
  {
    title: "Himmatwali",
    role: "Predator in Silk",
    src: "/filmography/Himmatwali.webp",
  },
  {
    title: "Jaljalaa",
    role: "The Burning Strategist",
    src: "/filmography/Jaljalaa.webp",
  },
  {
    title: "Ma Birsu Kasari",
    role: "Cold-Hearted Conjurer",
    src: "/filmography/Ma Birsu Kasari.webp",
  },
  {
    title: "Salam Cha Mayalai",
    role: "Nightmare Negotiator",
    src: "/filmography/Salam Cha Mayalai.webp",
  },
];

const filmImages: LightboxImage[] = MOVIES.map((m) => ({
  src: m.src,
  alt: `${m.title} — ${m.role}`,
}));

/** Per-card 3D tilt state map */
interface CardTilt {
  rx: number;
  ry: number;
  glowX: number;
  glowY: number;
}

export default function Filmography() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [cardTilts, setCardTilts] = useState<Record<number, CardTilt>>({});
  const rafRef = useRef<number>(0);

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
            rx: -dy * 8,
            ry: dx * 8,
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
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? filmImages.length - 1 : prev - 1
    );
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === filmImages.length - 1 ? 0 : prev + 1
    );
  }, []);
  return (
    <section id="filmography" className="py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-end justify-between gap-6">
          <div>
            <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              Filmography
            </h3>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              Antagonist roles, sharpened into cinematic presence. Hover a card—
              the crimson glow wakes up.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/gallery/filmography"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-4 py-2 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition"
            >
              View More →
            </Link>
            <Link
              href="#quotes"
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-4 py-2 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition"
            >
              Next: Quotes
            </Link>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOVIES.map((m, idx) => {
            const tilt = cardTilts[idx];
            return (
              <article
                key={m.title}
                ref={(el) => { cardRefs.current[idx] = el; }}
                onClick={() => openLightbox(idx)}
                onMouseMove={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
                onMouseEnter={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
                onMouseLeave={() => handleCardMouse(idx, 0, 0, false)}
                className="group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.18)] bg-black/20 transition-all duration-300 cursor-pointer"
                style={{
                  perspective: "800px",
                  transform: tilt
                    ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                    : "rotateX(0deg) rotateY(0deg)",
                  transition: "transform 0.15s ease-out",
                  boxShadow: tilt
                    ? `0 ${tilt.ry * 0.3}px ${Math.abs(tilt.ry) * 2 + 20}px rgba(220,38,38,0.25)`
                    : "0 0 0 rgba(220,38,38,0.0)",
                }}
              >
                {/* Cursor-follow spotlight glow */}
                {tilt && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[-1px]"
                    style={{
                      background: `radial-gradient(400px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(220,38,38,0.40), transparent 60%)`,
                    }}
                  />
                )}

                <div className="relative">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={m.src}
                      alt={m.title}
                      width={800}
                      height={1000}
                      priority={idx < 2}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Dark overlay lifts */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 opacity-90 transition-opacity duration-300 group-hover:opacity-70"
                  />

                  {/* Hover lift + glow */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-[6px]"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle_at_55%_0%,rgba(220,38,38,0.30),transparent_55%)`,
                      }}
                    />
                  </div>

                  {/* Reveal content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                          Antagonist Role
                        </p>
                        <h4 className="mt-1 text-[18px] uppercase tracking-[0.08em] font-black text-[#dc2626] transition-opacity duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                          {m.role}
                        </h4>
                        <p className="mt-2 text-[#d4d4d8]/75 text-[13px] leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          {m.title}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <div
                          className="h-10 w-10 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.18)] transition-all duration-300 group-hover:shadow-[0_0_46px_rgba(220,38,38,0.35)] group-hover:rotate-6"
                        >
                          <span className="text-[12px] font-black text-[#dc2626]">{m.title.slice(0, 1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA (subtle) */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 px-3 py-1 text-[11px] uppercase tracking-widest font-black text-[#d4d4d8] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      View
                      <span aria-hidden="true" className="text-[#dc2626]">↗</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Small note */}
        <div className="mt-10 text-center text-[#d4d4d8]/60 text-[13px]">
          Tip: Replace the placeholder roles/titles with your final character names.
        </div>
      </div>

      {/* Cinematic lightbox */}
      {lightboxOpen && (
        <CinematicLightbox
          images={filmImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </section>
  );
}

