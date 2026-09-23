import { readdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://puskarbhatt.com";
const IMAGE_DIRECTORIES = [
  { name: "award", page: "/gallery/awards" },
  { name: "banner", page: "/" },
  { name: "BTS", page: "/gallery/bts" },
  { name: "filmography", page: "/gallery/filmography" },
  { name: "news", page: "/gallery/news" },
  { name: "pimage", page: "/" },
  { name: "thumbnail", page: "/" },
];
const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const imageEntries: { pageUrl: string; imageUrl: string }[] = [];

  for (const directory of IMAGE_DIRECTORIES) {
    const directoryPath = path.join(process.cwd(), "public", directory.name);
    const files = await readdir(directoryPath, { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile() || !IMAGE_EXTENSIONS.has(path.extname(file.name).toLowerCase())) {
        continue;
      }

      imageEntries.push({
        pageUrl: `${BASE_URL}${directory.page}`,
        imageUrl: `${BASE_URL}/${directory.name}/${encodeURIComponent(file.name)}`,
      });
    }
  }

  const publicFiles = await readdir(path.join(process.cwd(), "public"), { withFileTypes: true });
  for (const file of publicFiles) {
    if (file.isFile() && IMAGE_EXTENSIONS.has(path.extname(file.name).toLowerCase())) {
      imageEntries.push({
        pageUrl: BASE_URL,
        imageUrl: `${BASE_URL}/${encodeURIComponent(file.name)}`,
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries
  .map(
    ({ pageUrl, imageUrl }) => `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:caption>Puskar Bhatt official portfolio image</image:caption>
    </image:image>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}