const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let t = fs.readFileSync(path, 'utf8');

const target = `<span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
              </Link>`;

const replacement = `<span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
              </Link>`;

if (t.includes(target)) {
  t = t.replace(target, replacement);
  fs.writeFileSync(path, t, 'utf8');
  console.log('✅ Fixed successfully');
} else {
  console.log('❌ Pattern not found');
  const idx = t.indexOf('<span className="relative">');
  if (idx >= 0) {
    console.log('Found at index:', idx);
    console.log('Context:', JSON.stringify(t.substring(idx, idx + 250)));
  }
}
