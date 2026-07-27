"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

const IMG: LightboxImage[] = [
  { src: "/award/2f175c12-7da3-4e5e-82b7-96bc7152bd20.jpg", alt: "Award 1" },
  { src: "/award/3de07ccb-8243-4ad5-aa98-456deb4423b0.jpg", alt: "Award 2" },
  { src: "/award/4d162db9-1609-4f6e-9746-351b2088c4b7.jpg", alt: "Award 3" },
  { src: "/award/5ee33416-c4cb-4b30-baa5-c9255912f25f.jpg", alt: "Award 4" },
  { src: "/award/6b22a6ae-8bbc-42d8-8622-f595264fded7.jpg", alt: "Award 5" },
  { src: "/award/8ac7e3ba-e22f-45a1-8924-1c5ee73aae62.jpg", alt: "Award 6" },
  { src: "/award/8baac643-4914-4fcc-8861-2d59361d3281.jpg", alt: "Award 7" },
  { src: "/award/075d73cf-84fe-49ed-9ea4-2b24226a1de0.jpg", alt: "Award 8" },
  { src: "/award/84e2214c-e020-4fb3-b164-0bf4147010a5.jpg", alt: "Award 9" },
  { src: "/award/88e9d7d2-22d6-4680-abbd-765e5ba4e160.jpg", alt: "Award 10" },
  { src: "/award/93b3de55-a394-40bf-b8c6-d5c4fe151bd1.jpg", alt: "Award 11" },
  { src: "/award/430ded95-5d14-4e47-ae03-e9b034b47652.jpg", alt: "Award 12" },
  { src: "/award/1499a539-27d8-4200-9dc6-a6737526e90a.jpg", alt: "Award 13" },
  { src: "/award/b3ce9787-77bf-4b27-a3ae-c6df4d688da4.jpg", alt: "Award 14" },
  { src: "/award/bedcd64e-a90f-4454-9d15-b373987bcb53.jpg", alt: "Award 15" },
  { src: "/award/c06d64e2-e7bc-4d2e-8d31-9ff0ba8331a5.jpg", alt: "Award 16" },
  { src: "/award/e23d4c4e-489c-4eb7-a8f8-1bf4e7ed19f9.jpg", alt: "Award 17" },
];

const DATA = [
  { t: "Best Villain Performance", y: "2024", p: "Gangajal", d: "Critically acclaimed for a blood-soaked portrayal that redefined menace in Nepali cinema." },
  { t: "Outstanding Negative Role", y: "2023", p: "Himmatwali", d: "Recognized for a predatory, silk-clad performance that dominated every frame." },
  { t: "Screen Presence Award", y: "2023", p: "Jaljalaa", d: "Awarded for commanding the screen with burning intensity and strategic restraint." },
  { t: "Viewer's Choice Antagonist", y: "2022", p: "Ma Birsu Kasari", d: "Audience-voted award for a cold-hearted conjurer role that left a lasting impact." },
  { t: "Critics' Honor", y: "2022", p: "Salam Cha Mayalai", d: "Praised for a nightmare-inducing negotiation scene that became the film's defining moment." },
  { t: "Lifetime Menace Achievement", y: "2024", p: "Overall Career", d: "Celebrating a body of work that has consistently raised the bar for antagonist craft." },
];

const FRAMES = IMG.map((img, i) => ({ ...img, a: DATA[i % DATA.length] }));

export default function Awards() {
  const [vis, setVis] = useState(false);
  const sr = useRef<HTMLElement>(null);
  const [ci, setCi] = useState(0);
  const [lo, setLo] = useState(false);
  const [li, setLi] = useState(0);

  const ol = useCallback((idx: number) => { setLi(idx); setLo(true); }, []);
  const cl = useCallback(() => setLo(false), []);
  const pl = useCallback(() => setLi((p) => (p === 0 ? IMG.length - 1 : p - 1)), []);
  const nl = useCallback(() => setLi((p) => (p + 1) % IMG.length), []);

  const gp = useCallback(() => setCi((p) => (p === 0 ? FRAMES.length - 1 : p - 1)), []);
  const gn = useCallback(() => setCi((p) => (p + 1) % FRAMES.length), []);

  useEffect(() => {
    const el = sr.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;
    const t = setInterval(gn, 2800);
    return () => clearInterval(t);
  }, [vis, gn]);

  const cards = FRAMES.map((item, idx) => {
    const offset = idx - ci;
    const absOffset = Math.abs(offset);
    const dir = offset > 0 ? 1 : -1;
    const isCenter = offset === 0;

    const xSpread = offset === 0 ? 0 : dir * (170 + (absOffset - 1) * 140); 
    const scale = isCenter ? 1 : Math.max(0.88 - absOffset * 0.08, 0.65);
    const rotateY = isCenter ? 0 : dir * Math.min(absOffset * 14, 38); 
    const zOffset = -absOffset * 80;
    const opacity = absOffset > 4 ? 0 : Math.max(1 - absOffset * 0.12, 0.45); 
    const yOffset = isCenter ? -8 : absOffset * 6;
    const zIndex = 50 - absOffset;

    return (
      <motion.button
        key={idx}
        onClick={() => { setCi(idx); ol(idx); }}
        className="absolute flex-shrink-0 rounded-[18px] overflow-hidden cursor-pointer focus:outline-none"
        initial={false}
        animate={{
          scale,
          rotateY,
          x: xSpread,
          z: zOffset,
          opacity,
          y: yOffset,
          zIndex,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
        style={{
          width: isCenter ? 320 : 250,
          aspectRatio: "3/4",
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        <div
          className="relative w-full h-full rounded-[18px] overflow-hidden transition-all duration-300 flex flex-col justify-between"
          style={{
            background: isCenter ? "rgba(15,23,42,0.75)" : "rgba(15,23,42,0.55)",
            backdropFilter: isCenter ? "blur(24px)" : "blur(10px)",
            WebkitBackdropFilter: isCenter ? "blur(24px)" : "blur(10px)",
            border: isCenter ? "1.5px solid rgba(6,182,212,0.4)" : "1px solid rgba(148,163,184,0.18)",
            boxShadow: isCenter
              ? "0 0 50px rgba(6,182,212,0.18), 0 0 90px rgba(6,182,212,0.08)"
              : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          {/* Image Container with full visibility framing */}
          <div className="relative w-full h-full flex items-center justify-center p-3">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="340px"
              className="object-contain p-2 transition-all duration-500"
              style={{
                filter: isCenter ? "none" : "brightness(0.85)",
              }}
            />
            {/* Subtle Gradient Overlay at the bottom for readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 50%, rgba(7, 8, 11, 0.9) 100%)",
              }}
            />
          </div>

          {/* Details Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left z-10">
            <span
              className="inline-block text-[9px] uppercase tracking-[0.22em] font-black px-2 py-1 rounded mb-2"
              style={{
                color: isCenter ? "rgba(6,182,212,0.95)" : "rgba(226,232,240,0.7)",
                background: isCenter ? "rgba(6,182,212,0.15)" : "rgba(15,23,42,0.75)",
                border: isCenter ? "1px solid rgba(6,182,212,0.3)" : "1px solid rgba(148,163,184,0.2)",
                backdropFilter: "blur(4px)",
              }}
            >
              {item.a.y}
            </span>
            <h4
              className="text-[13px] sm:text-[15px] font-black uppercase tracking-[0.06em] leading-tight"
              style={{ color: isCenter ? "#f1f5f9" : "#cbd5e1" }}
            >
              {item.a.t}
            </h4>
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mt-1"
              style={{ color: isCenter ? "rgba(6,182,212,0.8)" : "rgba(148,163,184,0.6)" }}
            >
              {item.a.p}
            </p>
          </div>
        </div>
      </motion.button>
    );
  });

  return (
    <section id="awards" ref={sr} className="relative py-24 sm:py-28 px-4 sm:px-6 overflow-hidden" style={{ background: "#07080b" }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(1200px circle at 50% -10%, rgba(6,182,212,0.08), transparent 55%)" }} />
      
      <div className="relative mx-auto max-w-7xl">
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500/40" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-cyan-400/60">Awards &amp; Recognition</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500/40" />
          </div>
          <h2 className="text-[38px] sm:text-[56px] font-black uppercase tracking-[0.04em] leading-[0.9]" style={{ color: "#e2e8f0" }}>Awards &amp; Honors</h2>
          <p className="mt-4 text-[14px] max-w-xl mx-auto leading-relaxed text-slate-400/80">Honoring cinematic achievements and industry recognition.</p>
        </header>

        <div className="relative" style={{ perspective: "1600px" }}>
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-30" style={{ background: "radial-gradient(500px circle at 50% 50%, rgba(6,182,212,0.14), transparent 65%)", filter: "blur(50px)" }} />
          
          <div className="flex items-center justify-center overflow-visible py-12 sm:py-16 min-h-[460px]" style={{ transformStyle: "preserve-3d" }}>
            {cards}
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={gp} className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full transition-all duration-300 hover:scale-105" style={{ border: "1px solid rgba(6,182,212,0.3)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", color: "#06b6d4" }} aria-label="Previous award">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {FRAMES.map((_, idx) => (
                <button key={idx} onClick={() => setCi(idx)} className="rounded-full transition-all duration-500" style={{
                  width: idx === ci ? "28px" : Math.abs(idx - ci) === 1 ? "6px" : "4px",
                  height: "6px",
                  background: idx === ci ? "#06b6d4" : Math.abs(idx - ci) === 1 ? "rgba(6,182,212,0.4)" : "rgba(148,163,184,0.2)",
                  boxShadow: idx === ci ? "0 0 16px rgba(6,182,212,0.6)" : "none",
                  borderRadius: idx === ci ? "3px" : "50%",
                }} />
              ))}
            </div>
            <button onClick={gn} className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full transition-all duration-300 hover:scale-105" style={{ border: "1px solid rgba(6,182,212,0.3)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", color: "#06b6d4" }} aria-label="Next award">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          <div className="mt-10 text-center">
            <Link href="/gallery/awards" className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-bold group" style={{ color: "rgba(6,182,212,0.7)" }}>
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-cyan-500/30 group-hover:w-10 transition-all duration-300" />
              <span className="group-hover:tracking-[0.3em] transition-all duration-300">All Awards &amp; Honors</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform duration-300"><polyline points="9 18 15 12 9 6" /></svg>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-cyan-500/30 group-hover:w-10 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lo && <CinematicLightbox images={IMG} currentIndex={li} onClose={cl} onPrev={pl} onNext={nl} />}
      </AnimatePresence>
    </section>
  );
}