import Image from "next/image";

/**
 * BTS / MEMORIS (Backstage) section
 * - Aggressive cinematic layout
 * - Replaces placeholder media with images from /public if available.
 *
 * MEDIA INSTRUCTIONS:
 * - Add your real BTS photos into:
 *   - public/bts/
 *   - public/memoris/
 * - Update the src fields below to match your filenames.
 */
const BTS_ITEMS = [
  {
    title: "The Wardrobe Returns",
    subtitle: "Night rehearsal. Crimson intent.",
    // public/iconic1.jpg
    src: "/iconic1.jpg",
  },
  {
    title: "Mask Tests",
    subtitle: "Fear is engineered. Not acted.",
    // public/iconic2.JPG
    src: "/iconic2.JPG",
  },
  {
    title: "Light & Smoke",
    subtitle: "Atmosphere, then menace.",
    // public/iconic3.jpg
    src: "/iconic3.jpg",
  },
  {
    title: "Director’s Cut",
    subtitle: "Precision in every pause.",
    // public/iconic4.jpg
    src: "/iconic4.jpg",
  },
];

const MEMORIS_ITEMS = [
  {
    title: "Memoris #01",
    subtitle: "A scar of cinema.",
    // public/pimage/placeholder1.JPG
    src: "/pimage/placeholder1.JPG",
  },
  {
    title: "Memoris #02",
    subtitle: "The vow before the scene.",
    // public/pimage/placeholder2.JPG
    src: "/pimage/placeholder2.JPG",
  },
  {
    title: "Memoris #03",
    subtitle: "A silence that speaks.",
    // public/pimage/placeholder3.JPG
    src: "/pimage/placeholder3.JPG",
  },
];

export default function BtsMemoris() {
  return (
    <section
      id="bts"
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Corner vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_50%_10%,rgba(220,38,38,0.10),transparent_55%),radial-gradient(900px_circle_at_0%_80%,rgba(220,38,38,0.08),transparent_60%),radial-gradient(900px_circle_at_100%_85%,rgba(220,38,38,0.07),transparent_62%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.65))]"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              BTS / MEMORIS
            </h3>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              Backstage fragments, rehearsals, and memory cuts—where the
              antagonist becomes a ritual.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[2px] w-10 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.35)]" />
            <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/80">
              Archive Mode
            </span>
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BTS */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BTS_ITEMS.map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[18px] border border-[rgba(220,38,38,0.16)] bg-black/15"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [background:radial-gradient(600px_circle_at_30%_0%,rgba(220,38,38,0.30),transparent_55%),linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.15))]" />

                  <div className="relative aspect-[4/3]">
                    {/* Replace with real BTS images when available in /public/bts */}
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover grayscale contrast-[1.1] transition duration-500 group-hover:grayscale-0"
                      priority={false}
                    />
                  </div>

                  <div className="relative p-5">
                    <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                      BTS Fragment
                    </p>
                    <h4 className="mt-1 text-[18px] uppercase tracking-[0.08em] font-black text-[#dc2626]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[#d4d4d8]/75 text-[13px] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-10 left-6 h-24 w-24 rounded-full bg-[#dc2626]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </article>
              ))}
            </div>
          </div>

          {/* MEMORIS */}
          <aside className="lg:col-span-1">
            <div className="rounded-[18px] border border-[rgba(220,38,38,0.18)] bg-black/15 overflow-hidden">
              <div className="p-6">
                <p className="text-[12px] uppercase tracking-[0.22em] font-black text-[#d4d4d8]/80">
                  MEMORIS CUTS
                </p>
                <h4 className="mt-3 text-[20px] uppercase tracking-[0.10em] font-black text-[#d4d4d8]">
                  Rehearsal Notes
                </h4>
                <p className="mt-3 text-[#d4d4d8]/70 text-[13px] leading-relaxed">
                  Short fragments from the making—typed like threats.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 px-6 pb-6">
                {MEMORIS_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="relative overflow-hidden rounded-[14px] border border-[rgba(220,38,38,0.14)] bg-black/10"
                  >
                    <div className="relative h-28">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-[50%_30%] grayscale contrast-[1.2] [image-rendering:auto]"
                        priority={false}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/70">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[#d4d4d8]/70 text-[13px] leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 [background:linear-gradient(to_top,rgba(0,0,0,0.78),rgba(220,38,38,0.10))]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

