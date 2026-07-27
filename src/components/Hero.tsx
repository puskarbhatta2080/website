"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useEffect, useState } from "react";

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);
  const targetTilt = useRef({ rx: 0, ry: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    targetTilt.current = { rx: -dy * 14, ry: dx * 14 };
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const animateTilt = useCallback(() => {
    setTilt((prev) => ({
      rx: prev.rx + (targetTilt.current.rx - prev.rx) * 0.08,
      ry: prev.ry + (targetTilt.current.ry - prev.ry) * 0.08,
      s: 1 + Math.abs(targetTilt.current.rx + targetTilt.current.ry) * 0.0002,
    }));
    rafRef.current = requestAnimationFrame(animateTilt);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animateTilt);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animateTilt]);

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100svh] flex items-end pt-[72px] sm:pt-[86px]"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-[radial-gradient(closest-side,rgba(220,38,38,0.20),transparent_65%)] opacity-80" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 px-4 py-2 shadow-[0_0_28px_rgba(220,38,38,0.15)]">
              <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_14px_rgba(220,38,38,0.65)]" />
              <p className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]">
                Cinematic Villain Portfolio
              </p>
            </div>

            <h2 className="mt-6 leading-[0.85]">
              <span className="block text-[#d4d4d8] text-[36px] xs:text-[42px] sm:text-[68px] md:text-[84px] font-black uppercase tracking-[0.06em] drop-shadow-[0_0_30px_rgba(220,38,38,0.25)]">
                PUSKAR
              </span>
              <span className="block text-[#dc2626] drop-shadow-[0_0_40px_rgba(220,38,38,0.40)]">BHATT</span>
            </h2>

            <p className="mt-5 max-w-xl text-[#d4d4d8]/80 text-[15px] sm:text-[16px] leading-relaxed">
              A premium, theatrical archive of menace&mdash;engineered for high-impact
              presence. Hover the grid. Feel the glow.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
              <Link
                href="#filmography"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-4 sm:py-3 text-[13px] uppercase tracking-widest font-black text-black shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_44px_rgba(220,38,38,0.55)] transition-all duration-300 min-h-[48px]"
              >
                <span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
                </span>
              </Link>

              <Link
                href="/gallery/iconic"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-6 py-4 sm:py-3 text-[13px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition-all duration-300 min-h-[48px]"
              >
                View More →
              </Link>

              <Link
                href="#quotes"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-6 py-4 sm:py-3 text-[13px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition-all duration-300 min-h-[48px]"
              >
                Watch Showreel
              </Link>
            </div>

            <div className="pointer-events-none absolute -top-6 -left-6 h-28 w-28 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)] opacity-60 blur-[2px]" />
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)] blur-2xl opacity-70" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(220,38,38,0.20),transparent_60%)] blur-2xl opacity-50" />

            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                targetTilt.current = { rx: 0, ry: 0 };
              }}
              className="relative mx-auto w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[360px] md:max-w-[420px] aspect-[3/4] rounded-[18px] overflow-hidden bg-black/30"
              style={{
                perspective: "1000px",
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`,
                boxShadow: isHovered
                  ? `0 0 80px rgba(220,38,38,0.30), ${tilt.ry * 0.5}px ${-tilt.rx * 0.5}px 100px rgba(220,38,38,0.15)`
                  : "0 0 60px rgba(220,38,38,0.18)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                border: "1px solid rgba(220,38,38,0.25)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 z-20 h-[14px] pointer-events-none" aria-hidden="true">
                <div className="w-full h-full flex items-center justify-around px-2"
                  style={{
                    background: "repeating-conic-gradient(rgba(220,38,38,0.35) 0% 25%, transparent 0% 50%) 0 0 / 16px 14px",
                    opacity: 0.7,
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 h-[14px] pointer-events-none" aria-hidden="true">
                <div className="w-full h-full flex items-center justify-around px-2"
                  style={{
                    background: "repeating-conic-gradient(rgba(220,38,38,0.35) 0% 25%, transparent 0% 50%) 0 0 / 16px 14px",
                    opacity: 0.7,
                  }}
                />
              </div>

              <div className="absolute inset-0">
                <Image
                  src="/pimage/biography.webp"
                  alt="Puskar Bhatt portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 360px, 420px"
                  style={{ objectFit: "cover", objectPosition: "50% 20%" }}
                  className="animate-[kenburns_22s_ease-in-out_infinite]"
                />
                <div className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(550px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(220,38,38,0.30), transparent 50%)`,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,rgba(0,0,0,0.75)_85%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.40)_0%,transparent_25%,transparent_75%,rgba(0,0,0,0.40)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(220,38,38,0.12)_0%,transparent_30%)]" />
              </div>

              <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]" aria-hidden="true"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "256px 256px",
                }}
              />

              <div className="absolute inset-0 z-10 pointer-events-none rounded-[18px] animate-pulse [animation-duration:4s]"
                style={{
                  boxShadow: "inset 0 0 30px rgba(220,38,38,0.15), inset 0 0 60px rgba(220,38,38,0.05)",
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 z-20 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 z-15 h-6 w-6 border-l-[2px] border-t-[2px] border-[rgba(220,38,38,0.35)] rounded-tl-[6px] pointer-events-none" aria-hidden="true" />
              <div className="absolute top-3 right-3 z-15 h-6 w-6 border-r-[2px] border-t-[2px] border-[rgba(220,38,38,0.35)] rounded-tr-[6px] pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-3 left-3 z-15 h-6 w-6 border-l-[2px] border-b-[2px] border-[rgba(220,38,38,0.35)] rounded-bl-[6px] pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-3 right-3 z-15 h-6 w-6 border-r-[2px] border-b-[2px] border-[rgba(220,38,38,0.35)] rounded-br-[6px] pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
