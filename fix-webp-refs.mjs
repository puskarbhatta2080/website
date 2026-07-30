/**
 * Fix all remaining non-WebP image references in the codebase.
 * Run: node fix-webp-refs.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "src");

// 1. Fix gallery/filmography/page.tsx — change all .jpg to .webp
const filmographyPath = join(SRC, "app", "gallery", "filmography", "page.tsx");
let filmography = readFileSync(filmographyPath, "utf-8");
let count = 0;
filmography = filmography.replace(/\.jpg"/g, () => {
  count++;
  return '.webp"';
});
if (count > 0) {
  writeFileSync(filmographyPath, filmography, "utf-8");
  console.log(`✅ gallery/filmography/page.tsx: ${count} .jpg → .webp references updated`);
} else {
  console.log(`✅ gallery/filmography/page.tsx: no .jpg references found (already updated)`);
}

// 2. Fix Filmography.tsx — remove isJpg logic, use .webp for all
const filmographyCompPath = join(SRC, "components", "Filmography.tsx");
let filmComp = readFileSync(filmographyCompPath, "utf-8");

// Remove the isJpg variable and related logic
const oldIsJpgBlock = `  const isJpg =
    name === "१२ गाउँ 2 (12 Gaun) - 2026 AD" ||
    name === "आफ्नो मान्छे आफ्नै हुन्छ 2010 AD" ||
    name === "कहाँ छौ कहाँ (Kaha Chhau Kaha) - 2010 AD" ||
    name === "जाबंज जिगरवाले(jabaaz jigarwale) 2015" ||
    name === "तुलसी (Tulsi) - 2018 AD" ||
    name === "दुर्गा(Durga) 2014" ||
    name === "फर्ज (Farz) - 2012 AD" ||
    name === "फैसला (Faisala) - 2011 AD" ||
    name === "बिरताको चिनो (Birata Ko Chino) - 2011 AD" ||
    name === "माया दिउँ झैं भयो (Maya Dium Jhai Bhayo) - 2011 AD" ||
    name === "राम जाने (Ram Jane) - 2006 AD";
  const ext = isJpg ? ".jpg" : ".webp";`;

const newIsJpgBlock = `  const ext = ".webp";`;

if (filmComp.includes(oldIsJpgBlock)) {
  filmComp = filmComp.replace(oldIsJpgBlock, newIsJpgBlock);
  writeFileSync(filmographyCompPath, filmComp, "utf-8");
  console.log("✅ Filmography.tsx: removed isJpg logic, using .webp for all");
} else {
  console.log("✅ Filmography.tsx: isJpg logic already removed");
}

// 3. Fix SocialMediaFeed.tsx — change .png to .webp
const socialFeedPath = join(SRC, "components", "SocialMediaFeed.tsx");
let socialFeed = readFileSync(socialFeedPath, "utf-8");
let pngCount = 0;
socialFeed = socialFeed.replace(/\.png/g, () => {
  pngCount++;
  return ".webp";
});
if (pngCount > 0) {
  writeFileSync(socialFeedPath, socialFeed, "utf-8");
  console.log(`✅ SocialMediaFeed.tsx: ${pngCount} .png → .webp references updated`);
} else {
  console.log(`✅ SocialMediaFeed.tsx: no .png references found`);
}

// 4. Fix gallery/social/client.tsx — change .png to .webp
const socialClientPath = join(SRC, "app", "gallery", "social", "client.tsx");
let socialClient = readFileSync(socialClientPath, "utf-8");
let clientPngCount = 0;
socialClient = socialClient.replace(/\.png/g, () => {
  clientPngCount++;
  return ".webp";
});
if (clientPngCount > 0) {
  writeFileSync(socialClientPath, socialClient, "utf-8");
  console.log(`✅ gallery/social/client.tsx: ${clientPngCount} .png → .webp references updated`);
} else {
  console.log(`✅ gallery/social/client.tsx: no .png references found`);
}

console.log("\n🎉 All WebP reference updates complete!");
