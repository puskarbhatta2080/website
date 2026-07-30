import type { MetadataRoute } from "next";

const BASE_URL = "https://puskarbhatt.com";

const galleryRoutes = [
  { path: "/gallery/iconic", priority: 0.9 },
  { path: "/gallery/filmography", priority: 0.9 },
  { path: "/gallery/bts", priority: 0.8 },
  { path: "/gallery/filmstrip", priority: 0.7 },
  { path: "/gallery/awards", priority: 0.8 },
  { path: "/gallery/news", priority: 0.7 },
  { path: "/gallery/social", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...galleryRoutes.map(({ path, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority,
    })),
  ];

  return routes;
}