"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

type FilmItem = { src: string; alt: string };

type FilmReelFrameProps = {
  item: FilmItem;
  idx: number;
  itemsLength: number;
  progress: MotionValue<number>;

  skewX: MotionValue<number>;
  frameZ: number;
  sprocketH: string;
  sprocketV: string;
  onSelect: () => void;
};

function normalizeDegrees(deg: number) {
  return ((deg % 360) + 360) % 360;
}

export default function FilmReelFrame({
  item,
  idx,
  itemsLength,
  progress,
  skewX,
  frameZ,
  sprocketH,
  sprocketV,
  onSelect,
}: FilmReelFrameProps) {
  // Base angular offset per frame
  const offset = (idx * 360) / itemsLength;

  // Continuous wrapped angle for stable visuals
  const itemRotateY = useTransform(progress, [0, 1], [offset, offset + 360]);

  // Smooth visibility based on angle (no hard popping)
  const opacity = useTransform(itemRotateY, (r) => {
    const a = normalizeDegrees(r);
    // Hide mostly in the "back half" range with a smooth transition.
    // Back half is roughly 90..270 degrees.
    const fadeOut = Math.max(
      0,
      Math.min(1, (a - 72) / (96 - 72))
    );

    // Use two smooth bands: front keep + back fade.
    const front = a < 78 || a > 282 ? 1 : 0;

    // Smooth front edges
    if (front === 1) {
      return 1;
    }

    // Smoothly fade in/out when near boundaries
    if (a >= 78 && a <= 96) {
      const t = (a - 78) / (96 - 78);
      return t * t * (3 - 2 * t);
    }

    if (a >= 264 && a <= 282) {
      const t = (a - 264) / (282 - 264);
      return (1 - (t * t * (3 - 2 * t)));
    }

    return fadeOut > 0 ? 0.0001 : 0;
  });

  // Mechanical vibration (reduced amplitude)
  const jitter = useTransform(progress, (v) => Math.sin(v * 120) * 0.7);
  const frameY = useTransform(jitter, (j) => j);

  const tapScale = useTransform(progress, (v) => 1 + Math.sin(v * Math.PI * 2 + idx) * 0.003);

  return (
    <motion.div
      className="absolute inset-0"
      role="button"
      tabIndex={0}
      aria-label={`Film frame ${idx + 1}`}
      style={{
        rotateY: itemRotateY,
        opacity,
        y: frameY,
        skewX,
        transformOrigin: "50% 50%",
        translateZ: frameZ,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
    >
      <div
        className="relative h-full w-full rounded-[4px] bg-black border-[14px] border-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-white/10"
      >
        <div className="absolute inset-0 border border-red-600/10 pointer-events-none z-10" />

        {/* Top/bottom sprocket holes */}
        <div className="absolute top-[-13px] left-0 right-0 h-[10px]" style={{ backgroundImage: sprocketH }} />
        <div className="absolute bottom-[-13px] left-0 right-0 h-[10px]" style={{ backgroundImage: sprocketH }} />

        {/* Side sprocket holes */}
        <div className="absolute left-[-13px] top-0 bottom-0 w-[10px]" style={{ backgroundImage: sprocketV }} />
        <div className="absolute right-[-13px] top-0 bottom-0 w-[10px]" style={{ backgroundImage: sprocketV }} />

        {/* Image sheet */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="520px"
            className="object-contain grayscale transition-all duration-500 will-change-transform group-hover:grayscale-0 group-hover:scale-[1.03]"
          />

          {/* Local grain (CSS only) */}
          <div className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_4px)]" />
          <div className="absolute inset-0 pointer-events-none [background:linear-gradient(110deg,rgba(220,38,38,0.16)_0%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
        </div>

        {/* Premium hover UI */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ scale: tapScale }}
            className="translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            <span className="text-[10px] font-black tracking-widest text-white uppercase bg-black/55 border border-red-600/30 px-3 py-1 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.25)]">
              VIEW FRAME
            </span>
          </motion.div>
        </div>
      </div>

      {/* Needed for :group-hover */}
      <div className="hidden group" />
    </motion.div>
  );
}

