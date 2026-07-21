import Hero from "@/components/Hero";
import Filmography from "@/components/Filmography";
import Quotes from "@/components/Quotes";
import Awards from "@/components/Awards";
import News from "@/components/News";
import AboutContact from "@/components/AboutContact";
import BtsMemoris from "@/components/BtsMemoris";
import CreativeImageDisplay from "@/components/CreativeImageDisplay";



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

        {/* Cinematic film-spindle block */}
        <div id="spindle" className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          {/*
            Pass an array of images to rotating film reel.
            and keep alt/label meaningful for accessibility.
          */}
          <CreativeImageDisplay
            images={[
              { src: "/iconic1.jpg", alt: "Fragment 1" },
              { src: "/iconic2.JPG", alt: "Fragment 2" },
              { src: "/iconic3.jpg", alt: "Fragment 3" },
              { src: "/iconic4.jpg", alt: "Fragment 4" },
              { src: "/iconic5.jpg", alt: "Fragment 5" },
            ]}
            label="PROJECTOR REEL // PSYCHOLOGICAL VILLAIN"
          />
        </div>


        <Filmography />
        <Quotes />
        <Awards />
        <News />
        <BtsMemoris />
        <AboutContact />


        {/* bottom spacing */}
        <div className="h-24" />
      </main>
    </div>
  );
}
