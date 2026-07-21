"use client";

import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import FilmReelFrame from "@/components/FilmReelFrame";

type FilmItem = {
  src: string;
  alt: string;
};

type FilmReelSpindleProps = {
  items: FilmItem[];
  label?: string;
};

/**
 * FilmReelSpindle
 *  - Swindle/mechanical loop effect removed.
 *  - Reel is static (no projector beam / spindle rotation loop).
 */
export default function FilmReelSpindle({ items, label }: FilmReelSpindleProps) {
  const [selectedImage, setSelectedImage] = useState<FilmItem | null>(null);
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  // Create real MotionValues so FilmReelFrame doesn't crash.
  const progress = useMotionValue(0);
  const skewX = useMotionValue(0);

  const motionReadyRef = useRef(false);
  motionReadyRef.current = true;

  // sprocket patterns (keep FilmReelFrame styling intact)
  const sprocketH =
    "linear-gradient(to right, transparent 4px, #000 4px, #000 10px, transparent 10px) 0 0 / 16px 100%, linear-gradient(to bottom, transparent 2px, #000 2px, #000 8px, transparent 8px) 0 0 / 100% 12px";
  const sprocketV =
    "linear-gradient(to bottom, transparent 4px, #000 4px, #000 10px, transparent 10px) 0 0 / 100% 16px, linear-gradient(to right, transparent 2px, #000 2px, #000 8px, transparent 8px) 0 0 / 12px 100%";

  return (
    <section className="relative w-full py-12">
      {/* Creative best-image display: centered rotating hero tile (no mechanical loop) */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="relative rounded-[22px] border border-white/10 bg-black/10 overflow-hidden">
          {/* Subtle, non-mechanical ambience */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none [background:radial-gradient(1000px_circle_at_50%_-10%,rgba(6,182,212,0.14),transparent_60%),radial-gradient(800px_circle_at_15%_80%,rgba(220,38,38,0.10),transparent_65%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]"
          />

          {/* Dust/grain (no animation) */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden opacity-20 mix-blend-screen">
            <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_4px)]" />
          </div>

          <div className="relative grid place-items-center py-10 sm:py-12">
            <div className="relative w-[min(360px,92vw)] sm:w-[420px] h-[480px] sm:h-[540px]">
              {/* Static film frames (FilmReelFrame still has its own slight vibration based on progress, but progress is fixed) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[360px] sm:w-[520px] aspect-video">
                  {items.map((item, idx) => (
                    <FilmReelFrame
                      key={item.src + idx}
                      item={item}
                      idx={idx}
                      itemsLength={items.length}
                      progress={progress}
                      skewX={skewX}
                      frameZ={0}
                      sprocketH={sprocketH}
                      sprocketV={sprocketV}
                      onSelect={() => setSelectedImage(item)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {label ? (
              <div className="mt-6 text-center">
                <p className="text-[12px] uppercase tracking-[0.22em] font-black text-[#d4d4d8]/80">
                  {label}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg aspect-video rounded-3xl border border-red-600/30 bg-zinc-950 overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.2)]"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  priority={false}
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {reducedMotion && null}
      </div>
    </section>
  );
}

