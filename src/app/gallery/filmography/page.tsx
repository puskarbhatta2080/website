import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Filmography | Puskar Bhatta",
  description:
    "Explore the complete filmography of Puskar Bhatta, featuring iconic Nepali and Bhojpuri performances in antagonist roles across major films such as Gangajal, Himmatwali, Jaljalaa, Ma Birsu Kasari, and 12 Gaun 2.",
  keywords: [
    "Puskar Bhatta filmography",
    "Puskar Bhatta movies",
    "Nepali actor filmography",
    "Nepali villain movies",
    "Gangajal film",
    "Himmatwali film",
    "Jaljalaa movie",
    "Ma Birsu Kasari",
    "Salam Cha Mayalai",
    "Bhojpuri films Puskar Bhatta",
    "12 Gaun 2",
    "Nepali action films",
    "Nepali cinema complete list",
  ],
  openGraph: {
    title: "Puskar Bhatta — Complete Filmography Gallery",
    description:
      "Browse the full body of work by Puskar Bhatta, including major Nepali and Bhojpuri films and legendary antagonist performances.",
    url: "https://puskarbhatt.com/gallery/filmography",
  },
  alternates: {
    canonical: "https://puskarbhatt.com/gallery/filmography",
  },
};

const MOVIES: LightboxImage[] = [
  { src: "/filmography/१२ गाउँ 2 (12 Gaun) - 2026 AD.webp", alt: "१२ गाउँ 2 (12 Gaun) - 2026 AD" },
  { src: "/filmography/अग्नि ज्वाला (Agni Jwala) - 2003 AD.webp", alt: "अग्नि ज्वाला (Agni Jwala) - 2003 AD" },
  { src: "/filmography/आफ्नो मान्छे आफ्नै हुन्छ 2010 AD.webp", alt: "आफ्नो मान्छे आफ्नै हुन्छ 2010 AD" },
  { src: "/filmography/कहाँ छौ कहाँ (Kaha Chhau Kaha) - 2010 AD.webp", alt: "कहाँ छौ कहाँ (Kaha Chhau Kaha) - 2010 AD" },
  { src: "/filmography/गंगाजल (Gangajal) - 2010 AD.webp", alt: "गंगाजल (Gangajal) - 2010 AD" },
  { src: "/filmography/जलजला (Jaljala) - 2012 AD.webp", alt: "जलजला (Jaljala) - 2012 AD" },
  { src: "/filmography/जाबंज जिगरवाले(jabaaz jigarwale) 2015.webp", alt: "जाबंज जिगरवाले(jabaaz jigarwale) 2015" },
  { src: "/filmography/तुलसी (Tulsi) - 2018 AD.webp", alt: "तुलसी (Tulsi) - 2018 AD" },
  { src: "/filmography/दुर्गा(Durga) 2014.webp", alt: "दुर्गा(Durga) 2014" },
  { src: "/filmography/प्रहार (Prahaar) 2011 AD.webp", alt: "प्रहार (Prahaar) 2011 AD" },
  { src: "/filmography/फर्ज (Farz) - 2012 AD.webp", alt: "फर्ज (Farz) - 2012 AD" },
  { src: "/filmography/फैसला (Faisala) - 2011 AD.webp", alt: "फैसला (Faisala) - 2011 AD" },
  { src: "/filmography/बिरताको चिनो (Birata Ko Chino) - 2011 AD.webp", alt: "बिरताको चिनो (Birata Ko Chino) - 2011 AD" },
  { src: "/filmography/बिरासत (Birasat) - 2008 AD.webp", alt: "बिरासत (Birasat) - 2008 AD" },
  { src: "/filmography/ब्रेक फेल (Break Fail) - 2012 AD.webp", alt: "ब्रेक फेल (Break Fail) - 2012 AD" },
  { src: "/filmography/भागी भागी नजाऊ (Bhagi Bhagi Najau) - 2012 AD.webp", alt: "भागी भागी नजाऊ (Bhagi Bhagi Najau) - 2012 AD" },
  { src: "/filmography/म बिर्सु कसरि (Ma Birsu Kasari) 2011.webp", alt: "म बिर्सु कसरि (Ma Birsu Kasari) 2011" },
  { src: "/filmography/माया दिउँ झैं भयो (Maya Dium Jhai Bhayo) - 2011 AD.webp", alt: "माया दिउँ झैं भयो (Maya Dium Jhai Bhayo) - 2011 AD" },
  { src: "/filmography/राम जाने (Ram Jane) - 2006 AD.webp", alt: "राम जाने (Ram Jane) - 2006 AD" },
  { src: "/filmography/सलाम  छ  मायालाई (Salam Cha Mayalaai)2009.webp", alt: "सलाम  छ  मायालाई (Salam Cha Mayalaai)2009" },
  { src: "/filmography/हिम्मतवाली (Himmatwali) - 2014 AD.webp", alt: "हिम्मतवाली (Himmatwali) - 2014 AD" },
];

export default function FilmographyGalleryPage() {
  return (
    <GalleryPage
      title="Filmography"
      subtitle="Complete collection of Puskar Bhatta's antagonist roles — each performance sharpened into cinematic presence."
      images={MOVIES}
      backHref="/#filmography"
    />
  );
}
