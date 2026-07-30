import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import type { LightboxImage } from "@/components/CinematicLightbox";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description:
    "Browse all awards and recognition highlights from Puskar Bhatt's cinematic career. View certificates of appreciation, felicitation ceremonies, chief guest honors, and industry accolades from Nepali cinema and international events in Canada.",
  keywords: [
    "Puskar Bhatt awards",
    "Nepali film awards",
    "Nepali actor recognition",
    "Puskar Bhatt honors",
    "Global Nepali Film Award",
    "NFAA certificate",
    "Nepali cinema awards",
    "chief guest honor Nepal",
    "Nepali actor Canada award",
    "dance academy award",
    "brand ambassador Nepal",
    "Nepali film industry honors",
  ],
  openGraph: {
    title: "Puskar Bhatt — Awards & Recognition Gallery",
    description:
      "View the complete awards collection — certificates, felicitations, and honors from Nepali cinema and international events.",
  },
};

const AWARD_IMAGES: LightboxImage[] = [
  { src: "/award/Dance Academy.webp", alt: "Dance Academy" },
  { src: "/award/कोल्हवी परिवार बारा जिल्ला सम्मान..webp", alt: "कोल्हवी परिवार बारा जिल्ला सम्मान" },
  { src: "/award/Brand ambassador of खजाना गुट्खा.webp", alt: "Brand ambassador of खजाना गुट्खा" },
  { src: "/award/Global Nepali Film Award.webp", alt: "Global Nepali Film Award" },
  { src: "/award/School Function Chief Guest honor.webp", alt: "School Function Chief Guest honor" },
  { src: "/award/कदर पत्र NFAA.webp", alt: "कदर पत्र NFAA" },
  { src: "/award/कोल्हवी परिवार बारा जिल्ला सम्मान.webp", alt: "कोल्हवी परिवार बारा जिल्ला सम्मान" },
  { src: "/award/गुरुङ समाज द्वारा Canada मा सम्मानित.webp", alt: "गुरुङ समाज द्वारा Canada मा सम्मानित" },
  { src: "/award/चलचित्र बिकाश बोर्डको सहकार्यमा अध्ध्यक्ष्य  कप.webp", alt: "चलचित्र बिकाश बोर्डको सहकार्यमा अध्ध्यक्ष्य  कप" },
  { src: "/award/ताम्र पत्र सम्मान कार्यक्रम महेन्द्रनगर.webp", alt: "ताम्र पत्र सम्मान कार्यक्रम महेन्द्रनगर" },
  { src: "/award/ल्होसार पर्व  Function Chief Guest.webp", alt: "ल्होसार पर्व  Function Chief Guest" },
  { src: "/award/ल्होसार पर्व Canada.webp", alt: "ल्होसार पर्व Canada" },
  { src: "/award/सम्मान कार्यक्रम जमुना बिध्ध्यालय.webp", alt: "सम्मान कार्यक्रम जमुना बिध्ध्यालय" },
  { src: "/award/सम्मान कार्यक्रम प्रमुख अथिति दोधारा चादनी.webp", alt: "सम्मान कार्यक्रम प्रमुख अथिति दोधारा चादनी" },
  { src: "/award/सम्मान कार्यक्रम.webp", alt: "सम्मान कार्यक्रम" },
];

export default function AwardsGalleryPage() {
  return (
    <GalleryPage
      title="Awards & Recognition"
      subtitle="The trophy cabinet — each award reflecting the relentless pursuit of menace, mastery, and presence."
      images={AWARD_IMAGES}
      backHref="/#awards"
    />
  );
}