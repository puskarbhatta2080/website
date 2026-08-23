/**
 * Convert all JPG/JPEG/PNG images in the public/ directory to WebP format.
 * Keeps original files — only creates .webp copies alongside.
 * Run: node scripts/convert-to-webp.mjs
 */

import { readdirSync, statSync, existsSync } from "fs";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

// File extensions to convert
const EXTENSIONS = new Set([".jpg", ".jpeg", ".JPG", ".JPEG", ".png", ".PNG"]);

// Directories to skip
const SKIP_DIRS = new Set(["node_modules", ".git"]);

async function convertFile(filePath) {
  const ext = extname(filePath);
  if (!EXTENSIONS.has(ext)) return;

  const webpPath = filePath.replace(ext, ".webp");

  // Skip if .webp already exists and is newer
  if (existsSync(webpPath)) {
    const srcTime = statSync(filePath).mtimeMs;
    const webpTime = statSync(webpPath).mtimeMs;
    if (webpTime > srcTime) {
      console.log("  \u23ED Skipping (already converted): " + basename(filePath));
      return;
    }
  }

  try {
    const img = sharp(filePath);
    // Quality settings
    const quality = 82;

    await img.webp({ quality, effort: 4 }).toFile(webpPath);

    const srcSize = statSync(filePath).size;
    const webpSize = statSync(webpPath).size;
    const saved = ((1 - webpSize / srcSize) * 100).toFixed(1);

    console.log("  \u2705 " + basename(filePath) + " \u2192 " + basename(webpPath) + " (" + saved + "% smaller)");
  } catch (err) {
    console.error("  \u274C Error converting " + basename(filePath) + ": " + err.message);
  }
}

async function walkDir(dirPath) {
  let entries;
  try {
    entries = readdirSync(dirPath, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        await walkDir(fullPath);
      }
    } else if (entry.isFile()) {
      await convertFile(fullPath);
    }
  }
}

console.log("Converting images to WebP format...");
console.log("Source: " + PUBLIC_DIR);
console.log("");

const start = Date.now();

walkDir(PUBLIC_DIR)
  .then(() => {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log("");
    console.log("Done! Completed in " + elapsed + "s");
  })
  .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
