import Image from "next/image";
import Link from "next/link";

/**
 * Filmography Grid
 * - Uses poster images from /public/filmography
 * - Hover: scale + lift + crimson glow + reveal title in blood red
 *
 * MEDIA:
 * Place posters inside: public/filmography/
 * Example filenames (existing in your folder):
 *  - filmography/gangajal.jpg
 *  - filmography/Himmatwali.jpg
 *  - filmography/Jaljalaa.jpg
 *  - filmography/Ma Birsu Kasari.jpg
 *  - filmography/Salam Cha Mayalai.jpg
 */
const MOVIES = [
  {
    title: "Gangajal",
    role: "Blood-Soaked Judge",
    src: "/filmography/gangajal.jpg",
  },
  {
    title: "Himmatwali",
    role: "Predator in Silk",
    src: "/filmography/Himmatwali.jpg",
  },
  {
    title: "Jaljalaa",
    role: "The Burning Strategist",
    src: "/filmography/Jaljalaa.jpg",
  },
  {
    title: "Ma Birsu Kasari",
    role: "Cold-Hearted Conjurer",
    src: "/filmography/Ma Birsu Kasari.jpg",
  },
  {
    title: "Salam Cha Mayalai",
    role: "Nightmare Negotiator",
    src: "/filmography/Salam Cha Mayalai.jpg",
  },
];

export default function Filmography() {
  return (
    <section id="filmography" className="py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-end justify-between gap-6">
          <div>
            <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              Filmography
            </h3>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              Antagonist roles, sharpened into cinematic presence. Hover a card—
              the crimson glow wakes up.
            </p>
          </div>
          <Link
            href="#quotes"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-4 py-2 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition"
          >
            Next: Quotes
          </Link>
        </header>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOVIES.map((m, idx) => (
            <article
              key={m.title}
              className="group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.18)] bg-black/20 shadow-[0_0_0_rgba(220,38,38,0.0)] transition-all duration-300"
              style={{
                // subtle stagger glow intensity
                boxShadow:
                  idx % 2 === 0
                    ? "0 0 0 rgba(220,38,38,0.0)"
                    : "0 0 0 rgba(220,38,38,0.0)",
              }}
            >
              {/* Crimson back-glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(450px circle at 30% 15%, rgba(220,38,38,0.35), transparent 60%), radial-gradient(450px circle at 80% 70%, rgba(220,38,38,0.16), transparent 62%)",
                }}
              />

              <div className="relative">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={m.src}
                    alt={m.title}
                    width={800}
                    height={1000}
                    priority={idx < 2}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>

                {/* Dark overlay lifts */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 opacity-90 transition-opacity duration-300 group-hover:opacity-70"
                />

                {/* Hover lift + glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-[6px]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_0%,rgba(220,38,38,0.30),transparent_55%)] opacity-0 group-hover:opacity-100" />
                </div>

                {/* Reveal content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                        Antagonist Role
                      </p>
                      <h4 className="mt-1 text-[18px] uppercase tracking-[0.08em] font-black text-[#dc2626] transition-opacity duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        {m.role}
                      </h4>
                      <p className="mt-2 text-[#d4d4d8]/75 text-[13px] leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {m.title}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.18)] transition-all duration-300 group-hover:shadow-[0_0_46px_rgba(220,38,38,0.35)] group-hover:rotate-6">
                        <span className="text-[12px] font-black text-[#dc2626]">{m.title.slice(0, 1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA (subtle) */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.22)] bg-black/20 px-3 py-1 text-[11px] uppercase tracking-widest font-black text-[#d4d4d8] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    View
                    <span aria-hidden="true" className="text-[#dc2626]">↗</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Small note */}
        <div className="mt-10 text-center text-[#d4d4d8]/60 text-[13px]">
          Tip: Replace the placeholder roles/titles with your final character names.
        </div>
      </div>
    </section>
  );
}

