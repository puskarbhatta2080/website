const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let t = fs.readFileSync(path, 'utf8');

// Find the exact problematic section
const target = '                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>\n              </Link>';

// Check if it exists (meaning still broken)
if (t.includes(target)) {
  // The fix: close the outer <span> before </Link>
  const replacement = '                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>\n                </span>\n              </Link>';
  t = t.replace(target, replacement);
  fs.writeFileSync(path, t, 'utf8');
  console.log('✅ Hero.tsx span closing tag fixed');
} else {
  console.log('⚠️ Pattern not found, checking state...');
  const idx = t.indexOf('<span className="relative whitespace-nowrap">');
  if (idx >= 0) {
    console.log('Context:', JSON.stringify(t.substring(idx, idx + 120)));
  } else {
    console.log('Could not find the pattern at all');
  }
}

// Verify no </Link> is immediately preceded by a <span> without closing
const openSpans = (t.match(/<span\b[^>]*>/g) || []).length;
const closeSpans = (t.match(/<\/span>/g) || []).length;
console.log('Spans - Open:', openSpans, 'Close:', closeSpans, 'Diff:', openSpans - closeSpans);
