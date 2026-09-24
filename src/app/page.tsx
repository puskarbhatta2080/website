import Hero from "@/components/Hero";
import FilmStrip from "@/components/FilmStrip";
import Filmography from "@/components/Filmography";
import Awards from "@/components/Awards";
import News from "@/components/News";
import AboutContact from "@/components/AboutContact";
import BtsMemoris from "@/components/BtsMemoris";
import CreativeImageDisplay from "@/components/CreativeImageDisplay";
import SocialMediaFeed from "@/components/SocialMediaFeed";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[100svh] bg-[#0a0a0a] text-[#d4d4d8] relative overflow-x-hidden">
      {/* Enhanced global cinematic banner strip with gradient */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[40] h-[72px] sm:h-[86px] opacity-60">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(220,38,38,0.2)] via-[rgba(34,211,238,0.1)] to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(1500px_circle_at_50%_0%,rgba(220,38,38,0.2),transparent_65%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_circle_at_30%_10%,rgba(34,211,238,0.1),transparent_60%)]" />
      </div>

      {/* Animated background gradient elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-[400px] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[rgba(220,38,38,0.08)] to-transparent blur-3xl opacity-40 animate-float" style={{ animation: "float 20s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 -right-[400px] w-[800px] h-[800px] rounded-full bg-gradient-to-l from-[rgba(34,211,238,0.06)] to-transparent blur-3xl opacity-30 animate-float" style={{ animation: "float 25s ease-in-out infinite 2s" }} />
      </div>

      <main className="relative z-10">
        <Hero />

        {/* 35mm Evidence Reel — Film Strip */}
        <FilmStrip />

        {/* Cinematic film-spindle block with enhanced styling */}
        <div id="spindle" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="text-center text-[28px] sm:text-[40px] font-black uppercase tracking-[0.08em] mb-4 text-white">
              Iconic Moments
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[#dc2626] to-[#22d3ee]" />
          </div>

          <CreativeImageDisplay
            images={[
              { src: "/iconic1.webp", alt: "Puskar Bhatta Nepali actor villain portrait" },
              { src: "/iconic2.webp", alt: "Puskar Bhatta antagonist character still from Nepali cinema" },
              { src: "/iconic3.webp", alt: "Puskar Bhatta villain character still from Nepali cinema" },
              { src: "/iconic4.webp", alt: "Puskar Bhatta dramatic antagonist portrait" },
              { src: "/iconic5.webp", alt: "Puskar Bhatta cinematic villain still" },
            ]}
            label="PROJECTOR REEL // PSYCHOLOGICAL VILLAIN"
          />

          {/* Enhanced View More button */}
          <div className="mt-12 text-center">
            <Link
              href="/gallery/iconic"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(220,38,38,0.35)] px-8 py-4 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-gradient-to-r from-black/20 to-black/10 hover:from-black/40 hover:to-black/20 hover:border-[rgba(220,38,38,0.55)] shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:shadow-[0_0_45px_rgba(220,38,38,0.3)] transition-all duration-300 group"
            >
              View All Iconic Stills
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

        {/* Main Sections */}
        <Filmography />
        <BtsMemoris />
        <Awards />
        <News />
        <SocialMediaFeed />
        <AboutContact />

        {/* Enhanced bottom spacing with gradient */}
        <div className="relative h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </main>
    </div>
  );
}
