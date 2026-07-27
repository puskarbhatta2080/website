"use client";

import React, { useMemo, useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export type CreativeImage = { src: string; alt: string };

type CreativeImageDisplayProps = {
  images: CreativeImage[];
  label?: string;
};

const BTS_FILES = [
  "1eb3c7ec-b5f7-48d5-abb6-6c122244f06e.webp",
  "3fc2ad96-4ab6-41fd-994e-ac3ed1bebc50.webp",
  "4a893cd6-11c0-4681-bf97-0e56032a38fc.webp",
  "5a1ed671-4b52-42cb-8995-f17bb58a4c23.webp",
  "8c6d0d32-1871-4da7-9186-f27627be6cf4.webp",
  "9d8ba5e8-b19a-458d-bf7c-99e1018736c2.webp",
  "23d6b1f7-446c-49a4-8035-209bf030d285.webp",
  "43bb180b-1335-4753-89ee-38fa11871471.webp",
  "53fb3a5a-8908-41d2-a754-60a00076bb38.webp",
  "154e2cd6-ad68-4eb5-8c96-343d2c6b23eb.webp",
];

const DEFAULT_BTS_IMAGES: CreativeImage[] = BTS_FILES.map((f, i) => ({
  src: `/BTS/${f}`,
  alt: `BTS Fragment ${i + 1}`,
}));

export default function CreativeImageDisplay({
  images = DEFAULT_BTS_IMAGES,
  label,
}: CreativeImageDisplayProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images[activeIdx] ?? images[0];
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const targetTilt = useRef({ rx: 0, ry: 0 });
  const rafRef = useRef<number>(0);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const heroOverlayId = useMemo(() => "hero-grad-static", []);

  // --- 3D Tilt ---
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    targetTilt.current = { rx: -dy * 6, ry: dx * 6 };
  }, []);

  const animateTilt = useCallback(() => {
    setTilt((prev) => ({
      rx: prev.rx + (targetTilt.current.rx - prev.rx) * 0.08,
      ry: prev.ry + (targetTilt.current.ry - prev.ry) * 0.08,
    }));
    rafRef.current = requestAnimationFrame(animateTilt);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animateTilt);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animateTilt]);

  // --- Auto-advance every 5s ---
  useEffect(() => {
    autoAdvanceRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(autoAdvanceRef.current);
  }, [images.length]);

  const goTo = useCallback(
    (idx: number) => {
      setActiveIdx(idx);
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % images.length);
      }, 5000);
    },
    [images.length]
  );

  // --- Drag-to-scroll thumbnails ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!thumbContainerRef.current) return;
    setIsDragging(true);
    dragStart.current = { x: e.pageX - thumbContainerRef.current.offsetLeft, scrollLeft: thumbContainerRef.current.scrollLeft };
  }, []);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleMouseMoveThumb = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !thumbContainerRef.current) return;
      e.preventDefault();
      const x = e.pageX - thumbContainerRef.current.offsetLeft;
      const walk = (x - dragStart.current.x) * 1.5;
      thumbContainerRef.current.scrollLeft = dragStart.current.scrollLeft - walk;
    },
    [isDragging]
  );

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
            <div className="absolute inset-0 [background:radial-gradient(1200px_circle_at_50%_10%,rgba(220,38,38,0.18),transparent_55%),radial-gradient(900px_circle_at_20%_70%,rgba(220,38,38,0.12),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.95))]" />
            <div className="absolute inset-0 opacity-25 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />
          </div>

          {/* Hero frame with 3D tilt */}
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-4 sm:p-6">
            <div className="lg:col-span-4">
              <div
                ref={frameRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { targetTilt.current = { rx: 0, ry: 0 }; }}
                className="relative aspect-[16/9] rounded-[22px] overflow-hidden border border-white/10 bg-black cursor-pointer"
                style={{
                  perspective: "1000px",
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                {/* Gradient overlay for cinematic readability */}
                <div
                  id={heroOverlayId}
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.75) 100%), radial-gradient(800px circle at 15% 50%, rgba(220,38,38,0.26), transparent 55%), radial-gradient(600px circle at 70% 30%, rgba(220,38,38,0.20), transparent 58%)",
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

                {/* Animated scan-line overlay */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 0%, rgba(220,38,38,0.20) 35%, transparent 70%)",
                    mixBlendMode: "screen",
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
                    onClick={() => goTo((activeIdx + 1) % images.length)}
                    className="rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 px-5 py-2 text-[12px] uppercase tracking-[0.18em] font-black text-[#d4d4d8] shadow-[0_0_34px_rgba(220,38,38,0.18)] hover:bg-black/45 transition-colors"
                  >
                    Next Frame →
                  </button>
                </div>
              </div>
            </div>

            {/* Strip thumbnails — draggable horizontally */}
            <div className="lg:col-span-1">
              <div
                ref={thumbContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMoveThumb}
                className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto cursor-grab active:cursor-grabbing scrollbar-thin pb-2 lg:pb-0"
                style={{ scrollbarWidth: "thin" }}
              >
                {images.map((img, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={img.src + idx}
                      type="button"
                      onClick={() => goTo(idx)}
                      className={
                        "group relative flex-shrink-0 overflow-hidden rounded-[16px] border transition-all " +
                        (isActive
                          ? "border-[rgba(220,38,38,0.40)] shadow-[0_0_44px_rgba(220,38,38,0.25)]"
                          : "border-white/10 hover:border-white/20")
                      }
                      aria-pressed={isActive}
                      aria-label={`Select image ${idx + 1}`}
                    >
                      <div className="relative h-[86px] w-[120px] lg:w-auto">
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
                            "radial-gradient(70px circle at 20% 20%, rgba(220,38,38,0.32), transparent 60%), linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%)",
                        }}
                      />

                      <div
                        className={
                          "absolute left-3 top-3 h-2 w-2 rounded-full " +
                          (isActive ? "bg-[#dc2626]" : "bg-[rgba(220,38,38,0.5)]")
                        }
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-[12px] leading-relaxed text-[#d4d4d8]/70">
                Drag to scroll · Auto-advances every 5s.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

