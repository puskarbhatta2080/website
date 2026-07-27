const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let t = fs.readFileSync(path, 'utf8');

// The first button lost its span content. Restore it.
const brokenBtn = `              <Link
                href="#filmography"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-4 sm:py-3 text-[13px] uppercase tracking-widest font-black text-black shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_44px_rgba(220,38,38,0.55)] transition-all duration-300 min-h-[48px]"
              >

              </Link>`;

const fixedBtn = `              <Link
                href="#filmography"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-4 sm:py-3 text-[13px] uppercase tracking-widest font-black text-black shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_44px_rgba(220,38,38,0.55)] transition-all duration-300 min-h-[48px]"
              >
                <span>
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
              </Link>`;

if (t.includes(brokenBtn)) {
  t = t.replace(brokenBtn, fixedBtn);
  fs.writeFileSync(path, t, 'utf8');
  console.log('✅ Hero.tsx restored successfully');
} else {
  console.log('❌ Pattern not found. Checking file content...');
  // Show lines around the first Link
  const lines = t.split('\n');
  for (let i = 70; i < 80 && i < lines.length; i++) {
    console.log(`L${i+1}: ${JSON.stringify(lines[i])}`);
  }
}
