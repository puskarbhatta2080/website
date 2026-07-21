"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type CreativeImage = { src: string; alt: string };

type CreativeImageDisplayProps = {
  images: CreativeImage[];
  label?: string;
};

export default function CreativeImageDisplay({
  images,
  label,
}: CreativeImageDisplayProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images[activeIdx] ?? images[0];

  const heroOverlayId = useMemo(() => "hero-grad-static", []);

  return (
    <section aria-label={label ?? "Image display"} className="relative">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {label ? (
          <div className="mb-4 text-center">
            <p className="text-[12px] uppercase tracking-[0.22em] font-black text-[#d4d4d8]/80">
              {label}
            </p>
          </div>
        ) : null}

        {/* Main creative display */}
        <div className="relative rounded-[28px] border border-white/10 bg-black/20 overflow-hidden">
          {/* Filmic backplate */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-90"
          >
            <div
              className="absolute inset-0 [background:radial-gradient(1200px_circle_at_50%_10%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(900px_circle_at_20%_70%,rgba(220,38,38,0.12),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.95))]"
            />
            <div className="absolute inset-0 opacity-25 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />
            <div
              className="absolute inset-x-0 top-0 h-[54px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[54px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))",
              }}
            />
          </div>

          {/* Hero frame */}
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-4 sm:p-6">
            <div className="lg:col-span-4">
              <div className="relative aspect-[16/9] rounded-[22px] overflow-hidden border border-white/10 bg-black">
                {/* Gradient overlay for cinematic readability */}
                <div
                  id={heroOverlayId}
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.75) 100%), radial-gradient(800px circle at 15% 50%, rgba(34,211,238,0.26), transparent 55%), radial-gradient(600px circle at 70% 30%, rgba(220,38,38,0.20), transparent 58%)",
                  }}
                />

                <Image
                  src={active?.src}
                  alt={active?.alt ?? "Active image"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover select-none"
                  priority={true}
                  loading="eager"
                />

                {/* Interactive tilt hint */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 0%, rgba(34,211,238,0.20) 35%, transparent 70%)",
                    mixBlendMode: "screen",
                    filter: "blur(0px)",
                  }}
                />

                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.20em] font-black text-[#d4d4d8]/80">
                      Projected Frame
                    </p>
                    <p className="mt-1 text-[16px] uppercase tracking-[0.12em] font-black text-[#dc2626] truncate">
                      {active?.alt ?? ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveIdx((i) => (i + 1) % images.length)}
                    className="rounded-full border border-[rgba(34,211,238,0.25)] bg-black/30 px-5 py-2 text-[12px] uppercase tracking-[0.18em] font-black text-[#d4d4d8] shadow-[0_0_34px_rgba(34,211,238,0.18)] hover:bg-black/45 transition-colors"
                  >
                    Next Frame →
                  </button>
                </div>
              </div>
            </div>

            {/* Strip thumbnails */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-3">
                {images.map((img, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={img.src + idx}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={
                        "group relative overflow-hidden rounded-[16px] border transition-all " +
                        (isActive
                          ? "border-[rgba(34,211,238,0.40)] shadow-[0_0_44px_rgba(34,211,238,0.25)]"
                          : "border-white/10 hover:border-white/20")
                      }
                      aria-pressed={isActive}
                      aria-label={`Select image ${idx + 1}`}
                    >
                      <div className="relative h-[86px]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="120px"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-[1.06]"
                          loading="lazy"
                        />
                      </div>
                      {/* Active glow */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background:
                            "radial-gradient(70px circle at 20% 20%, rgba(34,211,238,0.32), transparent 60%), linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%)",
                        }}
                      />

                      <div
                        className={
                          "absolute left-3 top-3 h-2 w-2 rounded-full " +
                          (isActive ? "bg-[rgba(34,211,238,1)]" : "bg-[rgba(220,38,38,0.5)]")
                        }
                      />
                    </button>
                  );
                })}
              </div>

              {/* Optional hint */}
              <p className="mt-4 text-[12px] leading-relaxed text-[#d4d4d8]/70">
                Click frames to change the projected portrait.
              </p>
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {/* Reuse the same overlay style; open on active image via a quick state in future */}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

