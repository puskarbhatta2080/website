const fs = require('fs');
const content = `"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

const AWARD_IMAGES: LightboxImage[] = [
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

const AWARDS_DATA = [
  { title: "Best Villain Performance", year: "2024", project: "Gangajal", description: "Critically acclaimed for a blood-soaked portrayal that redefined menace in Nepali cinema." },
  { title: "Outstanding Negative Role", year: "2023", project: "Himmatwali", description: "Recognized for a predatory, silk-clad performance that dominated every frame." },
  { title: "Screen Presence Award", year: "2023", project: "Jaljalaa", description: "Awarded for commanding the screen with burning intensity and strategic restraint." },
  { title: "Viewer's Choice Antagonist", year: "2022", project: "Ma Birsu Kasari", description: "Audience-voted award for a cold-hearted conjurer role that left a lasting impact." },
  { title: "Critics' Honor", year: "2022", project: "Salam Cha Mayalai", description: "Praised for a nightmare-inducing negotiation scene that became the film's defining moment." },
  { title: "Lifetime Menace Achievement", year: "2024", project: "Overall Career", description: "Celebrating a body of work that has consistently raised the bar for antagonist craft." },
];

const FILM_FRAMES = AWARD_IMAGES.map((img, i) => ({
  ...img,
  award: AWARDS_DATA[i % AWARDS_DATA.length],
}));

export default function Awards() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevLightbox = useCallback(() => setLightboxIndex((p) => (p === 0 ? AWARD_IMAGES.length - 1 : p - 1)), []);
  const nextLightbox = useCallback(() => setLightboxIndex((p) => (p === AWARD_IMAGES.length - 1 ? 0 : p + 1)), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    autoplayRef.current = setInterval(() => {
      setCurrentIdx((p) => (p + 1) % FILM_FRAMES.length);
    }, 3500);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [visible]);

  return (
    <section id="awards" ref={sectionRef} className="relative py-20 px-4 sm:px-6 overflow-hidden" style={{ background: "#0b0e14" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(1200px circle at 50% 0%, rgba(6,182,212,0.06), transparent 60%), radial-gradient(900px circle at 80% 60%, rgba(245,158,11,0.04), transparent 50%), radial-gradient(800px circle at 20% 80%, rgba(6,182,212,0.03), transparent 50%), linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))"
      }} />
      <div className="relative mx-auto max-w-7xl">
        <header className="text-center mb-12">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-black mb-3" style={{ color: "rgba(6,182,212,0.7)" }}>
            AWARDS &amp; RECOGNITION
          </span>
          <h2 className="text-[36px] sm:text-[52px] font-black uppercase tracking-[0.08em]" style={{ color: "#e2e8f0" }}>
            Trophy Cabinet
          </h2>
          <p className="mt-3 text-[14px] max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            Cinematic craft earns its marks. Each award reflects the relentless pursuit of menace, mastery, and presence.
          </p>
        </header>
        <div className="relative" style={{ perspective: "1200px" }}>
          <div className="flex items-center justify-center gap-4 sm:gap-6 overflow-x-auto py-8 px-2" style={{ transformStyle: "preserve-3d" }}>
            {FILM_FRAMES.map((item, idx) => {
              const offset = idx - currentIdx;
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              const scale = 1 - absOffset * 0.08;
              const rotateY = offset * 18;
              const opacity = absOffset > 3 ? 0 : 1 - absOffset * 0.25;
              return (
                <motion.button key={idx} onClick={() => { setCurrentIdx(idx); openLightbox(idx); }} className="relative flex-shrink-0 rounded-[16px] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  animate={{ scale: Math.max(scale, 0.6), x: offset * 30, rotateY, opacity: Math.max(opacity, 0) }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  style={{ width: isCenter ? "280px" : "220px", aspectRatio: "3/4", background: "rgba(15,23,42,0.6)", backdropFilter: "blur(12px)", border: isCenter ? "1.5px solid rgba(6,182,212,0.4)" : "1px solid rgba(148,163,184,0.1)", boxShadow: isCenter ? "0 0 50px rgba(6,182,212,0.15), 0 0 100px rgba(6,182,212,0.05), inset 0 0 30px rgba(6,182,212,0.03)" : "0 0 20px rgba(0,0,0,0.3)" }}>
                  <div className="absolute inset-0">
                    <Image src={item.src} alt={item.alt} fill sizes="280px" className="object-cover transition-all duration-700" style={{ filter: isCenter ? "none" : "grayscale(0.6) brightness(0.6)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />
                  </div>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)", backdropFilter: "blur(2px)" }} />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left z-10">
                    <span className="inline-block text-[9px] uppercase tracking-[0.22em] font-black px-2 py-1 rounded mb-2" style={{ color: "rgba(6,182,212,0.9)", background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.2)", backdropFilter: "blur(4px)" }}>
                      {item.award.year}
                    </span>
                    <h4 className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.06em] leading-tight" style={{ color: isCenter ? "#f1f5f9" : "#94a3b8" }}>
                      {item.award.title}
                    </h4>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: isCenter ? "rgba(245,158,11,0.8)" : "rgba(148,163,184,0.5)" }}>
                      {item.award.project}
                    </p>
                    <p className="text-[9px] leading-relaxed mt-1.5 line-clamp-2 transition-all duration-300" style={{ color: isCenter ? "rgba(148,163,184,0.8)" : "transparent" }}>
                      {item.award.description}
                    </p>
                  </div>
                  {isCenter && (
                    <div className="absolute inset-0 pointer-events-none rounded-[16px]" style={{ boxShadow: "inset 0 0 40px rgba(6,182,212,0.06)" }} />
                  )}
                </motion.button>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            {FILM_FRAMES.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIdx(idx)} className="rounded-full transition-all duration-300"
                style={{ width: idx === currentIdx ? "24px" : "8px", height: "8px", background: idx === currentIdx ? "#06b6d4" : "rgba(148,163,184,0.2)", boxShadow: idx === currentIdx ? "0 0 12px rgba(6,182,212,0.4)" : "none" }}
                aria-label={"Go to slide " + (idx + 1)}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/gallery/awards" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] uppercase tracking-widest font-black transition-all duration-300"
              style={{ color: "#e2e8f0", border: "1px solid rgba(6,182,212,0.25)", background: "rgba(0,0,0,0.3)", boxShadow: "0 0 30px rgba(6,182,212,0.04)" }}
            >
              View More &mdash;
              <span style={{ color: "#06b6d4" }}>All Awards &amp; Honors</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        {lightboxOpen && (
          <CinematicLightbox images={AWARD_IMAGES} currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
        )}
      </div>
    </section>
  );
}`;

fs.writeFileSync('e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx', content, 'utf8');
console.log('Written successfully');
</｜｜DSML｜｜parameter>
</create_file>
