"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * 35mm Film Strip — Infinite Horizontal Scroll
 *
 * A vintage film reel component that scrolls infinitely.
 * Sprocket holes top/bottom, grayscale images with hover-to-color,
 * frame numbers, pause-on-hover behavior.
 *
 * MEDIA: Uses images from /BTS/ and /pimage/ folders.
 */
const frames = [
  { id: 1, src: "/BTS/1eb3c7ec-b5f7-48d5-abb6-6c122244f06e.webp", alt: "The Wardrobe Returns" },
  { id: 2, src: "/BTS/3fc2ad96-4ab6-41fd-994e-ac3ed1bebc50.webp", alt: "Mask Tests" },
  { id: 3, src: "/BTS/4a893cd6-11c0-4681-bf97-0e56032a38fc.webp", alt: "Light & Smoke" },
  { id: 4, src: "/BTS/5a1ed671-4b52-42cb-8995-f17bb58a4c23.webp", alt: "Director's Cut" },
  { id: 5, src: "/BTS/8c6d0d32-1871-4da7-9186-f27627be6cf4.webp", alt: "On Set" },
  { id: 6, src: "/pimage/iconic2.webp", alt: "Iconic Still" },
  { id: 7, src: "/BTS/9d8ba5e8-b19a-458d-bf7c-99e1018736c2.webp", alt: "Rehearsal" },
  { id: 8, src: "/BTS/23d6b1f7-446c-49a4-8035-209bf030d285.webp", alt: "Character Prep" },
];

export default function FilmStrip() {
  return (
    <section className="w-full overflow-hidden bg-[#07080b] py-10 shadow-2xl border-y border-[rgba(220,38,38,0.12)]">
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-[#dc2626] shadow-[0_0_20px_rgba(220,38,38,0.40)]" />
          <span className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-[#d4d4d8]/60">
            EVIDENCE REEL // 35MM
          </span>
          <div className="h-[2px] flex-1 bg-[rgba(220,38,38,0.15)]" />
          <Link
            href="/gallery/filmstrip"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-3 py-1 text-[10px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_20px_rgba(220,38,38,0.10)] transition flex-shrink-0"
          >
            View More →
          </Link>
        </div>
      </div>

      {/* Outer wrapper for the scrolling track */}
      <div className="group w-full overflow-hidden">
        <div
          aria-label="Puskar Bhatt film strip reel"
          className="film-strip-track flex w-max animate-[filmScroll_50s_linear_infinite] hover:[animation-play-state:paused] motion-safe:animate-[filmScroll_42s_linear_infinite] will-change-transform"
          style={{ animationPlayState: "running", animationDuration: "42s" }}
        >
          {/* Render twice for seamless infinite loop */}
          {[...frames, ...frames].map((frame, index) => (
            <div
              key={`${frame.id}-${index}`}
              className="relative flex flex-col items-center bg-black px-[10px] py-5 border-y-[3px] border-[rgba(220,38,38,0.15)] shadow-inner mx-[1px]"
            >
              {/* Top sprocket holes */}
              <div className="flex w-full justify-between px-2 pb-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[10px] w-[8px] rounded-[2px] bg-[#1a1a1a] border border-[rgba(220,38,38,0.20)]"
                  />
                ))}
              </div>

{/* 35mm Frame (1.5:1 aspect ratio) — responsive sizing */}
              <div className="relative h-[120px] sm:h-[160px] w-[180px] sm:w-[240px] overflow-hidden rounded-[3px] border border-[rgba(220,38,38,0.12)] bg-[#0a0a0a]">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 640px) 180px, 240px"
                  className="object-cover brightness-[0.9] transition-all duration-500 group-hover:brightness-100"
                />
                {/* Vintage vignette overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.60)_85%)]" />
                {/* Scan line overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-10 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_3px)]"
                />
              </div>

              {/* Bottom sprocket holes */}
              <div className="flex w-full items-center justify-between px-2 pt-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[10px] w-[8px] rounded-[2px] bg-[#1a1a1a] border border-[rgba(220,38,38,0.20)]"
                  />
                ))}
              </div>

              {/* Frame number label */}
              <span className="absolute bottom-[6px] right-3 text-[8px] font-mono tracking-wider text-[#dc2626]/50 select-none">
                EVIDENCE #{String(index + 1).padStart(2, "0")}
              </span>

              {/* Vintage film edge burn */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-4 pointer-events-none bg-gradient-to-r from-[rgba(220,38,38,0.04)] to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 w-4 pointer-events-none bg-gradient-to-l from-[rgba(220,38,38,0.04)] to-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono tracking-wider text-[rgba(220,38,38,0.35)]">
            KODAK 5022 • 35MM EVIDENCE REEL
          </span>
          <span className="text-[9px] font-mono tracking-wider text-[rgba(220,38,38,0.35)]">
            HOVER TO INSPECT FRAMES
          </span>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes filmScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

