import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'src');

let totalChanges = 0;

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      let content = readFileSync(full, 'utf8');
      const before = content;
      // Replace .jpg and .JPG with .webp in image paths
      content = content.replace(/\.jpg/g, '.webp');
      content = content.replace(/\.JPG/g, '.webp');
      if (content !== before) {
        writeFileSync(full, content, 'utf8');
        const changes = (before.match(/\.(jpg|JPG)/g) || []).length;
        totalChanges += changes;
        console.log(`  ${full.replace(srcDir, 'src')}: ${changes} refs`);
      }
    }
  }
}

console.log('Scanning src/ for .jpg/.JPG references...\n');
walk(srcDir);
console.log(`\nDone. Total: ${totalChanges} references updated across all files.`);
