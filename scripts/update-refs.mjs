import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const files = [
  'src/components/Awards.tsx',
  'src/app/gallery/awards/page.tsx',
];

let totalChanges = 0;

for (const rel of files) {
  const fp = join(root, rel);
  let content = readFileSync(fp, 'utf8');
  const before = content;
  content = content.replace(/\.jpg/g, '.webp');
  content = content.replace(/\.JPG/g, '.webp');
  if (content !== before) {
    writeFileSync(fp, content, 'utf8');
    const changes = (before.match(/\.(jpg|JPG)/g) || []).length;
    totalChanges += changes;
    console.log(`Updated ${rel}: ${changes} references changed`);
  } else {
    console.log(`No changes in ${rel}`);
  }
}

console.log(`\nDone. Total references updated: ${totalChanges}`);
