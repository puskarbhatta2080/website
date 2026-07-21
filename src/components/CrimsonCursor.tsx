"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive crimson reticle cursor.
 * - Hidden on touch devices (pointer coarse)
 * - Uses requestAnimationFrame for smoothness
 */
export default function CrimsonCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Current + target positions (classic lerp smoothing)
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    // Enlarge reticle when hovering links/buttons.
    const focusables = Array.from(
      document.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, select, [role='button']"
      )
    );

    const onEnter = () => {
      ring.dataset.state = "active";
    };
    const onLeave = () => {
      ring.dataset.state = "idle";
    };

    focusables.forEach((el) => {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      focusables.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-[rgba(220,38,38,0.95)] shadow-[0_0_18px_rgba(220,38,38,0.55)]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        data-state="idle"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(220,38,38,0.6)] shadow-[0_0_30px_rgba(220,38,38,0.35)] transition-[transform,opacity] duration-300"
        style={{ opacity: 0.95 }}
      />

      {/* Reticle style tweaks via attribute (kept in Tailwind-only form) */}
      <style jsx>{`
        [data-state='active'] {
          transform: translate3d(var(--x, 0px), var(--y, 0px), 0) scale(1.35);
        }
      `}</style>
    </>
  );
}

