"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // 3D Motion Values for Card Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const updateTiltFromPoint = (clientX: number, clientY: number, rect: DOMRect) => {
    const width = rect.width;
    const height = rect.height;

    const pointerX = clientX - rect.left;
    const pointerY = clientY - rect.top;

    const xPct = pointerX / width - 0.5;
    const yPct = pointerY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateTiltFromPoint(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    updateTiltFromPoint(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-[72px] sm:pt-[86px]"
    >
      {/* Full-bleed banner background */}
      <div className="absolute inset-0 z-0">
        <Image
src="/banner/banner.webp"
          alt="Puskar Bhatta — Cinematic Villain"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
          style={{ transform: "translateZ(0)" }}
        />
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/75 to-black/85" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_circle_at_50%_30%,rgba(220,38,38,0.30),transparent_55%)]" />
        <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_80%_70%,rgba(220,38,38,0.20),transparent_60%)]" />

        {/* Scan line overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_4px)]"
        />
      </div>

      {/* Ambient bottom glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-[radial-gradient(closest-side,rgba(220,38,38,0.20),transparent_65%)] opacity-80 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pb-12 sm:pb-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Narrative Column */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(220,38,38,0.35)] bg-black/60 backdrop-blur-md px-4 py-2 shadow-[0_0_24px_rgba(220,38,38,0.18)]">
            <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_16px_rgba(220,38,38,0.8)]" />
            <p className="text-[11px] uppercase tracking-[0.26em] font-extrabold text-[#f4f4f5]">
              Cinematic Villain Portfolio
            </p>
          </div>

          <p className="mt-5 text-[11px] sm:text-[12px] uppercase tracking-[0.38em] font-bold text-[#fca5a5]/90">
            Nepali cinema&apos;s ultimate antagonist
          </p>

          <h1 className="mt-4 leading-[0.82] relative">
            <motion.div
              aria-hidden="true"
              className="absolute -left-3 top-0 w-1.5 h-0 rounded-full bg-gradient-to-b from-[#dc2626] to-transparent"
              animate={{ height: ["0%", "100%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <span
              className="relative block text-[34px] xs:text-[42px] sm:text-[62px] md:text-[80px] lg:text-[94px] font-black uppercase tracking-[0.08em] text-white"
              style={{
                textShadow:
                  "0 4px 12px rgba(0,0,0,0.95), 0 0 30px rgba(220,38,38,0.38)",
              }}
            >
              PUSKAR
            </span>

            <div className="relative inline-block mt-1">
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-gradient-to-r from-[#dc2626]/30 via-[#ff4d4d]/15 to-transparent blur-2xl rounded-2xl -z-10"
              />

              <span
                className="relative block text-[38px] xs:text-[46px] sm:text-[68px] md:text-[86px] lg:text-[104px] font-black uppercase leading-[0.9] tracking-[0.08em] bg-gradient-to-r from-[#ff6b6b] via-[#ff4545] to-[#fca5a5] bg-clip-text text-transparent"
                style={{
                  textShadow:
                    "0 4px 10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(220, 38, 38, 0.38)",
                }}
              >
                BHATT
              </span>
            </div>
          </h1>

          <div className="mt-6 max-w-xl text-[#d4d4d8]/95 text-[15px] sm:text-[16px] leading-relaxed space-y-4">
            <p className="[text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
              <strong className="text-white">Puskar Bhatta</strong> is a celebrated Nepali cinema actor known for intense antagonist performances, razor-sharp dialogue, and commanding screen presence in landmark Nepali and Bhojpuri films.
            </p>
            <p className="[text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
              With a legacy spanning <strong className="text-[#ff4d4d] font-bold">80+ films</strong> and an unmistakable villain aura, he continues to define the emotional intensity and cinematic fear that audiences remember long after the credits roll.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
            <Link
              href="#filmography"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ef4444] via-[#dc2626] to-[#b91c1c] px-6 py-4 sm:py-3 text-[12px] uppercase tracking-[0.24em] font-black text-black shadow-[0_0_30px_rgba(220,38,38,0.45)] hover:shadow-[0_0_48px_rgba(220,38,38,0.72)] transition-all duration-300 min-h-[48px] hover:-translate-y-0.5"
            >
              <span className="relative inline-flex items-center gap-2">
                <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                <span className="relative whitespace-nowrap">Enter the Dark Side</span>
                <span className="relative text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>

            <Link
              href="/gallery/iconic"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.4)] bg-black/55 px-6 py-4 sm:py-3 text-[12px] uppercase tracking-[0.22em] font-black text-[#f4f4f5] backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.12)] hover:bg-black/70 transition-all duration-300 min-h-[48px] hover:-translate-y-0.5"
            >
              View More
            </Link>
          </div>
        </div>

        {/* 3D Interactive Profile Frame */}
        <div className="relative flex-shrink-0 w-72 h-80 sm:w-80 sm:h-96 lg:w-[360px] lg:h-[440px] [perspective:1000px]">
          {/* External Dynamic Backlight Glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#dc2626]/40 via-red-900/20 to-transparent blur-2xl opacity-70 animate-pulse pointer-events-none" />

          <motion.div
            onPointerMove={prefersReducedMotion ? undefined : handlePointerMove}
            onPointerLeave={prefersReducedMotion ? undefined : handlePointerLeave}
            onPointerCancel={prefersReducedMotion ? undefined : handlePointerLeave}
            onTouchStart={prefersReducedMotion ? undefined : (e) => {
              if (e.touches.length > 0) {
                const touch = e.touches[0];
                updateTiltFromPoint(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect());
              }
            }}
            onTouchMove={prefersReducedMotion ? undefined : handleTouchMove}
            onTouchEnd={prefersReducedMotion ? undefined : handlePointerLeave}
            onTouchCancel={prefersReducedMotion ? undefined : handlePointerLeave}
            animate={
              !prefersReducedMotion
                ? { rotateX: [0, 2.5, -2, 0], rotateY: [0, -2, 2.5, 0] }
                : undefined
            }
            transition={
              !prefersReducedMotion
                ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
              touchAction: "none",
              willChange: "transform",
              WebkitTapHighlightColor: "transparent",
              perspective: "1000px",
            }}
            className="hero-tilt-card relative w-full h-full rounded-2xl border border-[rgba(220,38,38,0.4)] bg-black/60 backdrop-blur-md p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(220,38,38,0.25)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(220,38,38,0.45)]"
          >
            {/* Inner Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10">
              
              {/* Skeleton Placeholder while image is loading or missing */}
              {(!imgLoaded || imgError) && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 via-black to-[#110505] p-6 text-center animate-pulse">
                  <div className="w-16 h-16 rounded-full border-2 border-[#dc2626]/50 bg-[#dc2626]/10 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    <span className="text-[#dc2626] font-black text-xl">PB</span>
                  </div>
                  <span className="text-[12px] uppercase tracking-widest font-bold text-neutral-400">
                    {imgError ? "Image Unavailable" : "Loading Portrait..."}
                  </span>
                </div>
              )}

              {/* Profile Image */}
              <Image
                src="/pimage/biography.webp"
                alt="Puskar Bhatta biography portrait"
                fill
                priority
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 360px"
                className={`object-cover object-top transition-all duration-700 ease-out hover:scale-105 ${
                  imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />

              {/* Cinematic Vignette Overlay inside 3D Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />

              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/2 w-1/2 pointer-events-none bg-gradient-to-r from-transparent via-red-400/10 to-transparent skew-x-[-18deg]"
                  animate={{ x: ["0%", "360%"] }}
                  transition={{ duration: 6, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                />
              )}

              {/* Corner Frame Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#dc2626]/70 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#dc2626]/70 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#dc2626]/70 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#dc2626]/70 pointer-events-none" />

              {/* Bottom Card Caption Badge */}
              <div className="absolute bottom-3 inset-x-3 text-center py-2 px-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 pointer-events-none shadow-lg">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#e2e8f0]">
                  Puskar Bhatta
                </p>
                <p className="text-[9px] uppercase tracking-wider text-[#ff4d4d] font-bold">
                  Iconic Antagonist
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}