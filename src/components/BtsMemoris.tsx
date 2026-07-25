"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useRef } from "react";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

interface CardTilt {
  rx: number;
  ry: number;
  glowX: number;
  glowY: number;
}

/**
 * BTS / MEMORIS (Backstage) section
 * - Aggressive cinematic layout
 * - Replaces placeholder media with images from /public if available.
 *
 * MEDIA INSTRUCTIONS:
 * - Add your real BTS photos into:
 *   - public/bts/
 *   - public/memoris/
 * - Update the src fields below to match your filenames.
 */
const BTS_FILES = [
  "1eb3c7ec-b5f7-48d5-abb6-6c122244f06e.jpg",
  "3fc2ad96-4ab6-41fd-994e-ac3ed1bebc50.jpg",
  "4a893cd6-11c0-4681-bf97-0e56032a38fc.jpg",
  "5a1ed671-4b52-42cb-8995-f17bb58a4c23.jpg",
  "8c6d0d32-1871-4da7-9186-f27627be6cf4.jpg",
  "9d8ba5e8-b19a-458d-bf7c-99e1018736c2.jpg",
  "23d6b1f7-446c-49a4-8035-209bf030d285.jpg",
  "43bb180b-1335-4753-89ee-38fa11871471.jpg",
  "53fb3a5a-8908-41d2-a754-60a00076bb38.jpg",
  "154e2cd6-ad68-4eb5-8c96-343d2c6b23eb.jpg",
  "391b465a-6f39-402f-a5ec-16cfa8c19bc5.jpg",
  "478cd438-93eb-4911-989c-9954a5943780.jpg",
  "484bd65c-32b1-45c5-8943-7c8f5af18f15.jpg",
  "910a13eb-9bbb-4d50-bbf0-c26d5895e0c6.jpg",
  "5958c07e-ffec-4815-abd5-58a2de2440b1.jpg",
  "8835e4d3-b129-4d70-acba-fd1962bca7fd.jpg",
  "9473dec5-9ffe-4c9c-bc34-3b329de37bb6.jpg",
  "522196b1-6abc-4966-8519-e214c7e1bcc1.jpg",
  "a5b5f20f-7bf2-47fe-805f-4c6c02e02608.jpg",
  "a8c3e3e8-9123-44ac-9b92-4b22aa580dc0.jpg",
  "ab388c23-0fbe-49c6-81ff-f20aed433480.jpg",
  "abe3f8a4-20f1-4b4d-ae25-228c55833380.jpg",
  "b0d452a8-d63e-4f0b-8cb6-ccbbeb321255.jpg",
  "ce379785-cd83-4f01-9bc1-21e1a2cd0ecf.jpg",
  "f91369a6-f6fe-41ec-bf4b-54fab4a413ed.jpg",
];

const BTS_ITEMS = [
  {
    title: "The Wardrobe Returns",
    subtitle: "Night rehearsal. Crimson intent.",
    src: `/BTS/${BTS_FILES[0]}`,
  },
  {
    title: "Mask Tests",
    subtitle: "Fear is engineered. Not acted.",
    src: `/BTS/${BTS_FILES[1]}`,
  },
  {
    title: "Light & Smoke",
    subtitle: "Atmosphere, then menace.",
    src: `/BTS/${BTS_FILES[2]}`,
  },
  {
    title: "Director's Cut",
    subtitle: "Precision in every pause.",
    src: `/BTS/${BTS_FILES[3]}`,
  },
];

const MEMORIS_ITEMS = [
  {
    title: "Memoris #01",
    subtitle: "A scar of cinema.",
    src: "/pimage/placeholder1.JPG",
  },
  {
    title: "Memoris #02",
    subtitle: "The vow before the scene.",
    src: "/pimage/placeholder2.JPG",
  },
  {
    title: "Memoris #03",
    subtitle: "A silence that speaks.",
    src: "/pimage/placeholder3.JPG",
  },
];

// All BTS images + MEMORIS for the lightbox
const ALL_BTS_LIGHTBOX: LightboxImage[] = [
  ...BTS_FILES.map((f, i) => ({
    src: `/BTS/${f}`,
    alt: `BTS still ${i + 1}`,
  })),
  ...MEMORIS_ITEMS.map((item) => ({ src: item.src, alt: item.title })),
];

export default function BtsMemoris() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
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

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? ALL_BTS_LIGHTBOX.length - 1 : prev - 1
    );
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === ALL_BTS_LIGHTBOX.length - 1 ? 0 : prev + 1
    );
  }, []);

  return (
    <section
      id="bts"
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Corner vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_50%_10%,rgba(220,38,38,0.10),transparent_55%),radial-gradient(900px_circle_at_0%_80%,rgba(220,38,38,0.08),transparent_60%),radial-gradient(900px_circle_at_100%_85%,rgba(220,38,38,0.07),transparent_62%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.65))]"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              BTS / MEMORIS
            </h3>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              Backstage fragments, rehearsals, and memory cuts—where the
              antagonist becomes a ritual.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery/bts"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-4 py-2 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition"
            >
              View More →
            </Link>
            <div className="h-[2px] w-10 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.35)]" />
            <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/80">
              Archive Mode
            </span>
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BTS */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BTS_ITEMS.map((item, idx) => (
                <article
                  key={item.title}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onClick={() => openLightbox(idx)}
                  onMouseMove={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
                  onMouseEnter={(e) => handleCardMouse(idx, e.clientX, e.clientY, true)}
                  onMouseLeave={() => handleCardMouse(idx, 0, 0, false)}
                  className="group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.16)] bg-black/15 cursor-pointer"
                  style={{
                    perspective: "800px",
                    transform: cardTilts[idx]
                      ? `rotateX(${cardTilts[idx].rx}deg) rotateY(${cardTilts[idx].ry}deg)`
                      : "rotateX(0deg) rotateY(0deg)",
                    transition: "transform 0.15s ease-out",
                  }}
                >
                  {/* Cursor-follow spotlight glow */}
                  {cardTilts[idx] && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[-1px] z-10"
                      style={{
                        background: `radial-gradient(350px circle at ${cardTilts[idx].glowX}% ${cardTilts[idx].glowY}%, rgba(220,38,38,0.35), transparent 60%)`,
                      }}
                    />
                  )}

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [background:radial-gradient(600px_circle_at_30%_0%,rgba(220,38,38,0.30),transparent_55%),linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.15))]" />

                  <div className="relative aspect-[4/3]">
                    {/* Replace with real BTS images when available in /public/bts */}
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover grayscale contrast-[1.1] transition duration-500 group-hover:grayscale-0"
                      priority={false}
                    />
                  </div>

                  <div className="relative p-5">
                    <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                      BTS Fragment
                    </p>
                    <h4 className="mt-1 text-[18px] uppercase tracking-[0.08em] font-black text-[#dc2626]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[#d4d4d8]/75 text-[13px] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-10 left-6 h-24 w-24 rounded-full bg-[#dc2626]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </article>
              ))}
            </div>
          </div>

          {/* MEMORIS */}
          <aside className="lg:col-span-1">
            <div className="rounded-[18px] border border-[rgba(220,38,38,0.18)] bg-black/15 overflow-hidden">
              <div className="p-6">
                <p className="text-[12px] uppercase tracking-[0.22em] font-black text-[#d4d4d8]/80">
                  MEMORIS CUTS
                </p>
                <h4 className="mt-3 text-[20px] uppercase tracking-[0.10em] font-black text-[#d4d4d8]">
                  Rehearsal Notes
                </h4>
                <p className="mt-3 text-[#d4d4d8]/70 text-[13px] leading-relaxed">
                  Short fragments from the making—typed like threats.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 px-6 pb-6">
                {MEMORIS_ITEMS.map((item, idx) => (
                  <div
                    key={item.title}
                    onClick={() => openLightbox(BTS_ITEMS.length + idx)}
                    className="relative overflow-hidden rounded-[14px] border border-[rgba(220,38,38,0.14)] bg-black/10 cursor-pointer"
                  >
                    <div className="relative h-28">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-[50%_30%] grayscale contrast-[1.2] [image-rendering:auto]"
                        priority={false}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[#d4d4d8]/70 text-[13px] leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 [background:linear-gradient(to_top,rgba(0,0,0,0.78),rgba(220,38,38,0.10))]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Cinematic lightbox */}
      {lightboxOpen && (
        <CinematicLightbox
          images={ALL_BTS_LIGHTBOX}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </section>
  );
}

