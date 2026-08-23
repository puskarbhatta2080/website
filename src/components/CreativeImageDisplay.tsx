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

  useEffect(() => {
    const animate = () => {
      setTilt((prev) => ({
        rx: prev.rx + (targetTilt.current.rx - prev.rx) * 0.08,
        ry: prev.ry + (targetTilt.current.ry - prev.ry) * 0.08,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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
        {/* Enhanced label with projector reel styling */}
        {label ? (
          <div className="mb-6 text-center relative">
            {/* Sprocket hole decoration */}
            <div className="flex justify-center gap-2 mb-3" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-3 rounded-sm opacity-40"
                  style={{
                    background: "rgba(220,38,38,0.3)",
                    border: "1px solid rgba(220,38,38,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Animated label */}
            <motion.div
              className="inline-flex items-center gap-3 relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Left decorative line */}
              <motion.div
                className="h-[1px] w-8 sm:w-12"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.4))",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Label text with flicker animation */}
              <motion.span
                className="text-[14px] sm:text-[16px] font-black tracking-[0.28em] uppercase relative"
                style={{ color: "#d4d4d8" }}
                animate={{
                  textShadow: [
                    "0 0 4px rgba(220,38,38,0.3)",
                    "0 0 8px rgba(220,38,38,0.5)",
                    "0 0 4px rgba(220,38,38,0.3)",
                    "0 0 2px rgba(220,38,38,0.2)",
                    "0 0 6px rgba(220,38,38,0.4)",
                    "0 0 4px rgba(220,38,38,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {label}
              </motion.span>

              {/* Right decorative line */}
              <motion.div
                className="h-[1px] w-8 sm:w-12"
                style={{
                  background: "linear-gradient(270deg, transparent, rgba(220,38,38,0.4))",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Red accent underline */}
            <motion.div
              className="mx-auto mt-2 h-[2px] rounded-full"
              style={{
                width: "60%",
                maxWidth: "300px",
                background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)",
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* Frame counter */}
            <motion.p
              className="mt-3 text-[11px] uppercase tracking-[0.3em] font-black"
              style={{ color: "rgba(220,38,38,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-[rgba(220,38,38,0.7)]">{String(activeIdx + 1).padStart(2, "0")}</span>
              <span className="mx-1.5">/</span>
              <span>{String(images.length).padStart(2, "0")}</span>
              <span className="ml-2 text-[9px] tracking-[0.15em]" style={{ color: "rgba(148,163,184,0.4)" }}>
                FRAMES
              </span>
            </motion.p>
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
            {/* Film grain overlay */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px",
              }}
            />
            {/* Horizontal scan lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
              }}
            />
          </div>

          {/* Projector beam animation */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-[1]"
            animate={{
              background: [
                "linear-gradient(115deg, transparent 0%, rgba(220,38,38,0.08) 20%, transparent 40%)",
                "linear-gradient(115deg, transparent 15%, rgba(220,38,38,0.05) 35%, transparent 55%)",
                "linear-gradient(115deg, transparent 30%, rgba(220,38,38,0.08) 50%, transparent 70%)",
                "linear-gradient(115deg, transparent 10%, rgba(220,38,38,0.06) 30%, transparent 50%)",
                "linear-gradient(115deg, transparent 0%, rgba(220,38,38,0.08) 20%, transparent 40%)",
              ],
              opacity: [0.6, 0.4, 0.5, 0.3, 0.6],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ mixBlendMode: "screen" }}
          />

          {/* Sprocket holes - left side */}
          <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around z-[2] pointer-events-none" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-3.5 rounded-sm opacity-30"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(220,38,38,0.15)",
                }}
              />
            ))}
          </div>

          {/* Sprocket holes - right side */}
          <div className="absolute right-3 top-0 bottom-0 flex flex-col justify-around z-[2] pointer-events-none" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-3.5 rounded-sm opacity-30"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(220,38,38,0.15)",
                }}
              />
            ))}
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

                {/* Film flicker overlay */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: [0, 0.03, 0, 0.02, 0.01, 0, 0.04, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: "rgba(220,38,38,0.5)", mixBlendMode: "overlay" }}
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

                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4 z-10">
                  <div className="min-w-0">
                    <motion.p
                      className="text-[11px] uppercase tracking-[0.20em] font-black"
                      style={{ color: "rgba(220,38,38,0.7)" }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      PROJECTED FRAME
                    </motion.p>
                    <motion.p
                      className="mt-1 text-[16px] uppercase tracking-[0.12em] font-black truncate"
                      style={{ color: "#dc2626" }}
                      key={activeIdx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {active?.alt ?? ""}
                    </motion.p>
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo((activeIdx + 1) % images.length)}
                    className="rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 backdrop-blur-sm px-5 py-2 text-[12px] uppercase tracking-[0.18em] font-black text-[#d4d4d8] shadow-[0_0_34px_rgba(220,38,38,0.18)] hover:bg-black/45 transition-all duration-300 hover:scale-105 active:scale-95"
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
                      aria-label={`Select frame ${idx + 1}`}
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
                          (isActive ? "bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.6)]" : "bg-[rgba(220,38,38,0.5)]")
                        }
                      />

                      {/* Frame number on thumbnail */}
                      <div
                        className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest"
                        style={{
                          background: "rgba(0,0,0,0.6)",
                          color: isActive ? "rgba(220,38,38,0.8)" : "rgba(148,163,184,0.5)",
                        }}
                      >
                        #{String(idx + 1).padStart(2, "0")}
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.p
                className="mt-4 text-[12px] leading-relaxed"
                style={{ color: "rgba(148,163,184,0.5)" }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-[rgba(220,38,38,0.4)]">⟳</span> Drag to scroll · Auto-advances every 5s
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

