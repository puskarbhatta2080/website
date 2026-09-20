import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Keep /api/ disallowed, remove /_next/
    },
    sitemap: [
      "https://puskarbhatt.com/sitemap.xml",
      "https://puskarbhatt.com/image-sitemap.xml",
    ],
  };
}