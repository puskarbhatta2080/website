"use client";

import { useEffect, useState } from "react";


/**
 * Quotes Section
 * - Marquee-like cinematic grid of dialogues
 * - Scroll reveal using IntersectionObserver (no framer-motion dependency)
 *
 * MEDIA: none required.
 */
const QUOTES = [
  {
    quote: "मलाई देखेपछि डराउँछन् सबै…",
    meta: "— Iconic Villain Line",
  },
  {
    quote: "न्याय होइन… डर मेरो भाषा हो।",
    meta: "— On-screen Persona",
  },
  {
    quote: "तपाईं हार्न तयार हुनुहोस्। म त जित्न जन्मिएको हुँ।",
    meta: "— Villainous Promise",
  },
  {
    quote: "सबै कुरा कागजमै हुन्छ… तर डर मनभित्र।",
    meta: "— The Contract",
  },
  {
    quote: "चुप लागेर बसेको रात… म फेरि बोल्छु।",
    meta: "— Midnight Threat",
  },
];

export default function Quotes() {
  const [visible, setVisible] = useState<Record<number, boolean>>({});



  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-quote-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.index || "-1");
          if (idx >= 0 && e.isIntersecting) {
            setVisible((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
          }
        }
      },
      { threshold: 0.18 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section id="quotes" className="py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header>
          <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
            Quotes
          </h3>
          <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
            Replace these with Puskar Bhatt’s real iconic dialogues. Each block
            enters like a cinematic whisper becoming a threat.
          </p>
        </header>

        {/* Marquee strip */}
        <div className="mt-10 relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.18)] bg-black/15">
          <div className="absolute inset-0 [background:radial-gradient(600px_circle_at_20%_30%,rgba(220,38,38,0.18),transparent_55%),radial-gradient(600px_circle_at_80%_70%,rgba(220,38,38,0.10),transparent_60%)]" />
          <div className="relative px-5 py-4">
            <div className="flex gap-6 items-center">
              <span className="inline-flex items-center rounded-full border border-[rgba(220,38,38,0.25)] px-3 py-1 text-[11px] uppercase tracking-widest font-black text-[#d4d4d8] shadow-[0_0_30px_rgba(220,38,38,0.12)]">
                THE VILLAIN SPEAKS
              </span>
              <div className="min-w-0 flex-1">
                <div className="whitespace-nowrap text-[#dc2626] uppercase tracking-[0.22em] font-black text-[12px] animate-[marquee_18s_linear_infinite]">
                  NEPALI CINEMA • MENACE • POWER • FEAR • NEPALI CINEMA • MENACE • POWER • FEAR •
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUOTES.map((q, idx) => {
            const isVis = !!visible[idx];
            return (
              <figure
                key={idx}
                data-quote-card
                data-index={idx}
                className={
                  "relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.16)] bg-black/15 p-6 shadow-[0_0_30px_rgba(220,38,38,0.08)] " +
                  (isVis
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3")
                }
                style={{
                  transition: "opacity 520ms ease, transform 520ms ease",
                  transitionDelay: `${idx * 90}ms`,
                }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 [background:radial-gradient(450px_circle_at_20%_10%,rgba(220,38,38,0.22),transparent_55%)]" />
                <blockquote className="relative">
                  <p className="text-[18px] leading-[1.35] font-black text-[#d4d4d8] tracking-[0.02em]">
                    “{q.quote}”
                  </p>
                  <figcaption className="mt-4 text-[#d4d4d8]/70 uppercase tracking-[0.14em] text-[12px] font-extrabold">
                    {q.meta}
                  </figcaption>
                </blockquote>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Local keyframes (Tailwind-only requirement honored; uses styled-jsx) */}
      <style jsx>{`
        @keyframes marquee_18s_linear_infinite {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

