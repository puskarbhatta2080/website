/**
 * Verify all image references in source files use .webp
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const files = [
  "src/components/Hero.tsx",
  "src/app/gallery/filmography/page.tsx",
  "src/components/Filmography.tsx",
  "src/components/SocialMediaFeed.tsx",
  "src/app/gallery/social/client.tsx",
  "src/components/Banner.tsx",
  "src/components/GalleryPage.tsx",
  "src/app/page.tsx",
  "src/components/Awards.tsx",
  "src/components/News.tsx",
  "src/components/BtsMemoris.tsx",
  "src/components/CreativeImageDisplay.tsx",
  "src/components/FilmStrip.tsx",
  "src/app/gallery/iconic/page.tsx",
  "src/app/gallery/bts/page.tsx",
  "src/app/gallery/news/page.tsx",
  "src/app/gallery/filmstrip/page.tsx",
  "src/app/gallery/social/page.tsx",
  "src/app/gallery/awards/page.tsx",
];

let allClean = true;

console.log("=== Image Reference Audit ===\n");

for (const file of files) {
  const content = readFileSync(join(__dirname, file), "utf-8");
  
  // Find all image src references with quotes
  const srcRefs = content.match(/src=["'`][^"'`]+\.(jpg|jpeg|png|JPG|JPEG|PNG)["'`]/g);
  // Also check for href with image extensions
  const imgTags = content.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)/g);
  
  if (srcRefs && srcRefs.length > 0) {
    console.log(`❌ ${file} — ${srcRefs.length} non-WebP reference(s):`);
    srcRefs.forEach(r => console.log(`    ${r.trim()}`));
    allClean = false;
  } else if (imgTags && imgTags.length > 0) {
    // Check if they're in strings/paths (not just extensions)
    const nonWebpExts = content.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)/g);
    if (nonWebpExts) {
      console.log(`❌ ${file} — found ${nonWebpExts.length} non-WebP extension(s) in code`);
      allClean = false;
    }
  } else {
    console.log(`✅ ${file} — All .webp`);
  }
}

console.log("\n=== Public Directory WebP Availability ===");
const { readdirSync } = await import("fs");
const publicDir = join(__dirname, "public");

function checkDir(dirPath, label) {
  const items = readdirSync(dirPath, { withFileTypes: true });
  const nonWebp = items.filter(i => i.isFile() && /\.(jpg|jpeg|png)$/i.test(i.name));
  const webp = items.filter(i => i.isFile() && /\.webp$/i.test(i.name));
  
  if (nonWebp.length > 0) {
    console.log(`⚠️  ${label}: ${nonWebp.length} non-WebP files exist (${nonWebp.map(f => f.name).join(", ")})`);
    allClean = false;
  } else {
    console.log(`✅ ${label}: All ${webp.length} images are .webp`);
  }
}

checkDir(publicDir, "public/");
checkDir(join(publicDir, "banner"), "public/banner/");
checkDir(join(publicDir, "filmography"), "public/filmography/");
checkDir(join(publicDir, "thumbnail"), "public/thumbnail/");
checkDir(join(publicDir, "BTS"), "public/BTS/");
checkDir(join(publicDir, "news"), "public/news/");
checkDir(join(publicDir, "award"), "public/award/");
checkDir(join(publicDir, "pimage"), "public/pimage/");

if (allClean) {
  console.log("\n🎉 COMPLETE: All images are .webp and all references are correct!");
} else {
  console.log("\n⚠️  Some issues found above.");
}
