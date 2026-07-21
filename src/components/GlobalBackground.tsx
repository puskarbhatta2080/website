"use client";

import { useMemo } from "react";

/**
 * Persistent cinematic background layers:
 * - Grain via CSS gradients (no external assets)
 * - Vignette overlay
 * - Subtle animated smoke using repeating conic/linear gradients
 */
export default function GlobalBackground() {
  // Generate a deterministic set of "smoke blobs" offsets.
  const blobs = useMemo(() => {
    const arr: Array<{ x: number; y: number; s: number; o: number; d: number }> = [];
    for (let i = 0; i < 10; i++) {
      const x = (i * 73) % 100;
      const y = (i * 41) % 100;
      const s = 0.8 + ((i * 13) % 40) / 100;
      const o = 0.16 + ((i * 7) % 20) / 100;
      const d = 8 + ((i * 11) % 12);
      arr.push({ x, y, s, o, d });
    }
    return arr;
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base deep void */}
      <div className="absolute inset-0 bg-[#07080b]" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 [background:radial-gradient(1200px_circle_at_50%_30%,rgba(34,211,238,0.08),transparent_55%),radial-gradient(900px_circle_at_10%_80%,rgba(6,182,212,0.06),transparent_60%),radial-gradient(900px_circle_at_90%_85%,rgba(34,211,238,0.05),transparent_62%),radial-gradient(800px_circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.85))]" />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 5px)",
          backgroundSize: "4px 4px",
          filter: "contrast(120%)",
        }}
      />

      {/* Smoke blobs */}
      <div className="absolute inset-0 opacity-90">
        {blobs.map((b, idx) => (
          <div
            key={idx}
            className="absolute rounded-full blur-3xl"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${260 * b.s}px`,
              height: `${260 * b.s}px`,
              background:
                "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.12), rgba(34,211,238,0) 60%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06), rgba(0,0,0,0) 65%)",
              opacity: b.o,
              animation: `smokeDrift_${idx} ${b.d}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Smoke keyframes injected once */}
      <style jsx>{`
        ${blobs
          .map((b, idx) => {
            const x2 = (b.x + 12 + idx * 3) % 100;
            const y2 = (b.y + 10 + idx * 5) % 100;
            return `@keyframes smokeDrift_${idx}{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(${(x2 - b.x) * 3}px, ${(y2 - b.y) * 2.5}px,0) scale(1.08)}}`;
          })
          .join("\n")}
      `}</style>

      {/* Subtle scanline */}
      <div className="absolute inset-0 opacity-[0.08] [background:linear-gradient(to_bottom,rgba(255,255,255,0.15),rgba(255,255,255,0)_50%,rgba(0,0,0,0))] [background-size:100%_3px]" />
    </div>
  );
}

