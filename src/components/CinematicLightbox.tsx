"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export type LightboxImage = {
  src: string;
  alt: string;
};

type CinematicLightboxProps = {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function CinematicLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: CinematicLightboxProps) {
  const active = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Backdrop with crimson cinematic glow */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_50%_30%,rgba(220,38,38,0.18),transparent_55%),radial-gradient(800px_circle_at_80%_70%,rgba(220,38,38,0.08),transparent_55%)]"
      />

      {/* Scan line overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_4px)]"
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[rgba(220,38,38,0.3)] bg-black/40 backdrop-blur-sm text-[#d4d4d8] hover:bg-black/60 hover:border-[rgba(220,38,38,0.5)] transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.15)]"
        aria-label="Close lightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/40 backdrop-blur-sm text-[#d4d4d8] hover:bg-black/60 hover:border-[rgba(220,38,38,0.45)] transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.12)]"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/40 backdrop-blur-sm text-[#d4d4d8] hover:bg-black/60 hover:border-[rgba(220,38,38,0.45)] transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.12)]"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div
        className="relative z-[5] w-full max-w-5xl mx-4 sm:mx-8 aspect-[16/10] md:aspect-[16/9]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full rounded-[18px] overflow-hidden border border-[rgba(220,38,38,0.2)] shadow-[0_0_60px_rgba(220,38,38,0.12)] animate-[lightboxIn_0.4s_ease-out]">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain animate-[lightboxKenBurns_12s_ease-in-out_infinite]"
            priority
            quality={95}
          />

          {/* Cinematic gradient shroud on edges */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.35) 100%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%)",
            }}
          />
        </div>

        {/* Bottom bar: counter + alt text */}
        <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.2)] bg-black/40 backdrop-blur-sm px-3 py-1.5 shadow-[0_0_20px_rgba(220,38,38,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.65)] animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest font-black text-[#d4d4d8]">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            {active.alt && (
              <span className="text-[13px] text-[#d4d4d8]/70 tracking-wide truncate max-w-[200px] sm:max-w-[400px]">
                {active.alt}
              </span>
            )}
          </div>

          <div className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/40 hidden sm:block">
            ← Arrow keys to navigate · Esc to close
          </div>
        </div>
      </div>

      {/* Corner accent glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-32 w-32 [background:radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)] blur-sm opacity-40 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-32 w-32 [background:radial-gradient(circle_at_70%_70%,rgba(220,38,38,0.25),transparent_60%)] blur-sm opacity-30 pointer-events-none"
      />

      {/* Lightbox keyframes */}
      <style jsx>{`
        @keyframes lightboxIn {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes lightboxKenBurns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>,
    document.body
  );
}

