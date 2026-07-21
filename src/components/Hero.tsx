import Image from "next/image";
import Link from "next/link";

/**
 * Hero Section
 *
 * - Aggressive overlapping headlines on the left
 * - Masked portrait placeholder on the right with Ken Burns style zoom
 * - Crimson pulsing CTA
 *
 * MEDIA INSTRUCTIONS:
 * - Replace the placeholder <div> with a real portrait asset.
 *   Option A: Put an image in /public and use next/image.
 *     Example: src="/puskar-portrait.jpg"
 *   Option B: Use an <Image /> with an imported static asset.
 */
export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100svh] flex items-end pt-[72px] sm:pt-[86px]"
    >
      {/* subtle theatrical floor glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-[radial-gradient(closest-side,rgba(220,38,38,0.20),transparent_65%)] opacity-80" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: typography */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 px-4 py-2 shadow-[0_0_28px_rgba(220,38,38,0.15)]">
              <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_14px_rgba(220,38,38,0.65)]" />
              <p className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]">
                Cinematic Villain Portfolio
              </p>
            </div>

            <h2 className="mt-6 leading-[0.9]">
              <span className="block text-[#d4d4d8] text-[42px] sm:text-[56px] md:text-[64px] font-black uppercase tracking-[0.18em]">
                THE ULTIMATE
                <span className="block text-[#dc2626]">ANTAGONIST</span>
              </span>

              <span className="block mt-2 text-black/0 text-[44px] sm:text-[64px] md:text-[78px] font-black uppercase tracking-[0.10em] [-webkit-text-stroke:1px_rgba(220,38,38,0.35)] text-transparent opacity-80">
                PUSKAR BHATT
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-[#d4d4d8]/80 text-[15px] sm:text-[16px] leading-relaxed">
              A premium, theatrical archive of menace—engineered for high-impact
              presence. Hover the grid. Feel the glow.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <Link
                href="#filmography"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-[13px] uppercase tracking-widest font-black text-black shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_44px_rgba(220,38,38,0.55)] transition-all duration-300"
              >
                <span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative">Enter the Dark Side</span>
                </span>
              </Link>

              <Link
                href="#quotes"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-6 py-3 text-[13px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition-all duration-300"
              >
                Watch Showreel
              </Link>
            </div>

            {/* Aggressive corner highlight */}
            <div className="pointer-events-none absolute -top-6 -left-6 h-28 w-28 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)] opacity-60 blur-[2px]" />
          </div>

          {/* Right: portrait mask */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)] blur-2xl opacity-70" />

            <div className="relative mx-auto w-full max-w-[420px] aspect-[4/5] rounded-[22px] overflow-hidden border border-[rgba(220,38,38,0.18)] bg-black/20 shadow-[0_0_60px_rgba(220,38,38,0.18)]">
              {/* Masked image placeholder */}
              <div className="absolute inset-0">
                <Image
                  src="/pimage/placeholder1.JPG"
                  alt="Puskar Bhatt portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                  className="animate-[kenburns_18s_ease-in-out_infinite]"
                />

                {/* Localized readability gradient ONLY on the far-left side of the image */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.35)_28%,rgba(0,0,0,0.0)_52%)]" />
              </div>

              {/* Theatrical mask / vignette */}
              <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_50%_20%,black_0%,black_55%,transparent_78%)] bg-black/10" />
              <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_60%,transparent_35%,rgba(0,0,0,0.88)_80%)]" />

              {/* Crimson edge accents */}
              <div className="absolute inset-0 pointer-events-none [background:linear-gradient(90deg,rgba(220,38,38,0.0),rgba(220,38,38,0.25),rgba(220,38,38,0.0))] opacity-[0.35]" />

              {/* Full-width cinematic landing banner (covers left→right, sits above filmography) */}
              <div
                className="absolute top-[-100px] left-0 right-0 z-[2] h-[84px] sm:h-[96px]"
                role="presentation"
              >
                {/* Banner background */}
                <div className="absolute inset-0">
                  <Image
                    src="/iconic4.jpg"
                    alt="Cinematic banner"
                    fill
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    className="object-cover object-center"
                    draggable={false}
                    priority
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.55)_20%,rgba(220,38,38,0.22)_55%,rgba(0,0,0,0.82)_100%)]" />
                <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_40%,rgba(220,38,38,0.55),transparent_55%)] opacity-60" />
                <div className="absolute inset-0 opacity-80 [background:linear-gradient(115deg,transparent_0%,rgba(220,38,38,0.30)_35%,transparent_70%)] animate-[scan_sweep_3.6s_ease-in-out_infinite]" />

                {/* Content */}
                <div className="relative h-full mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/80">
                      Special Broadcast
                    </p>
                    <p className="text-[14px] uppercase tracking-[0.10em] font-black text-[#dc2626]">
                      Tonight: Antagonist Mode
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-3">
                    <div className="h-[2px] w-16 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.55)]" />
                    <div className="h-[8px] w-[8px] rounded-full bg-[#dc2626] shadow-[0_0_18px_rgba(220,38,38,0.65)] animate-pulse" />
                    <div className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                      FEAR • CINEMA • POWER
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                    On-screen Persona
                  </p>
                  <p className="text-[16px] uppercase tracking-[0.12em] font-black text-[#dc2626]">
                    Fear Made Cinematic
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.25)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ken Burns keyframes (Server Component-safe):
          Avoid styled-jsx. Animation is handled via Tailwind arbitrary animation.
          If you need to tweak timing, adjust the class: animate-[kenburns_18s_ease-in-out_infinite]
          and ensure keyframes are defined globally in src/app/globals.css.
      */}
    </section>
  );
}

