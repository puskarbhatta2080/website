import Image from "next/image";
import Link from "next/link";

/**
 * Banner
 *
 * Production-ready cinematic hero/banner strip.
 * - Uses Next.js <Image /> with priority + fill
 * - Layered gradient shroud for readability
 * - Mobile-first responsive height (cinema-ish ratio)
 *
 * Media instructions:
 * - Default banner asset is `/public/iconic4.webp`.
 * - To swap images, either pass `imageSrc`/`imageAlt` props or replace the default.
 */
export type BannerProps = {
  /** Banner background image */
  imageSrc?: string;
  /** Banner image alt text (for accessibility) */
  imageAlt?: string;
  /** Category badge text */
  badge?: string;
  /** Main headline */
  heading?: string;
  /** Optional subheading */
  subheading?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA href (anchor or route) */
  ctaHref?: string;
};

export default function Banner({
  imageSrc = "/iconic4.webp",
  imageAlt = "Puskar Bhatt cinematic banner",
  badge = "FEATURED RELEASE",
  heading = "PUSKAR BHATT",
  subheading = "A premium, theatrical archive of menace.",
  ctaLabel = "Enter the Dark Side",
  ctaHref = "#filmography",
}: BannerProps) {
  return (
    <section aria-label="Featured banner" className="relative w-full">
      {/*
        Relative container is critical for correct <Image fill /> behavior.
        Mobile-first heights:
          - h-[42vh] creates a cinematic feel without causing huge layout jumps
          - Desktop increases to h-[60vh]
      */}
      <div className="relative h-[42vh] sm:h-[60vh] overflow-hidden">
        {/* Image layer */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={true}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          className="object-cover object-center select-none"
          style={{ transform: "translateZ(0)" }}
        />

        {/* Dark moody gradient shroud for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-black/50" />
        <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_20%_30%,rgba(220,38,38,0.28),transparent_55%)]" />
        <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_80%_70%,rgba(220,38,38,0.14),transparent_55%)]" />

        {/* Subtle border/glow to anchor the banner */}
        <div className="absolute inset-0 pointer-events-none border border-[rgba(220,38,38,0.18)] shadow-[0_0_45px_rgba(220,38,38,0.10)]" />

        {/* Content overlay */}
        <div className="relative z-10 h-full">
          <div className="mx-auto h-full max-w-6xl px-4 sm:px-6">
            <div className="flex h-full flex-col justify-end pb-10 sm:pb-14">
              <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 px-4 py-2 shadow-[0_0_28px_rgba(220,38,38,0.12)]">
                <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_14px_rgba(220,38,38,0.65)]" />
                <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]">
                  {badge}
                </span>
              </div>

              <h1 className="mt-6 text-[40px] leading-[0.95] sm:text-[56px] md:text-[64px] font-black uppercase tracking-[0.12em]">
                <span className="block text-[#d4d4d8]">{heading}</span>
              </h1>

              {subheading ? (
                <p className="mt-4 max-w-xl text-[#d4d4d8]/80 text-[15px] sm:text-[16px] leading-relaxed">
                  {subheading}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-[#dc2626] px-6 py-3 text-[13px] uppercase tracking-widest font-black text-black shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_44px_rgba(220,38,38,0.55)] transition-all duration-300"
                >
                  <span className="relative">
                    <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                    <span className="relative">{ctaLabel}</span>
                  </span>
                </Link>

                <div className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                  FEAR • CINEMA • POWER
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

