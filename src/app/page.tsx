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
    <div className="min-h-[100svh] bg-[#0a0a0a] text-[#d4d4d8] relative">
      {/* Global cinematic banner strip */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[40] h-[72px] sm:h-[86px] opacity-70">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(220,38,38,0.18),transparent_55%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_circle_at_50%_0%,rgba(220,38,38,0.15),transparent_60%)]" />
      </div>

      <main>
        <Hero />

        {/* 35mm Evidence Reel — Film Strip */}
        <FilmStrip />

        {/* Cinematic film-spindle block */}
        <div id="spindle" className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          {/*
            Pass an array of images to rotating film reel.
            and keep alt/label meaningful for accessibility.
          */}
          <CreativeImageDisplay
            images={[
              { src: "/iconic1.webp", alt: "Fragment 1" },
              { src: "/iconic2.webp", alt: "Fragment 2" },
              { src: "/iconic3.webp", alt: "Fragment 3" },
              { src: "/iconic4.webp", alt: "Fragment 4" },
              { src: "/iconic5.webp", alt: "Fragment 5" },
            ]}
            label="PROJECTOR REEL // PSYCHOLOGICAL VILLAIN"
          />

          {/* View More for CreativeImageDisplay */}
          <div className="mt-8 text-center">
            <Link
              href="/gallery/iconic"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-6 py-3 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition-all duration-300"
            >
              View More — All Iconic Stills →
            </Link>
          </div>
        </div>


        <Filmography />
        <BtsMemoris />
        <Awards />
        <News />
        <SocialMediaFeed />
        <AboutContact />


        {/* bottom spacing */}
        <div className="h-24" />
      </main>
    </div>
  );
}
