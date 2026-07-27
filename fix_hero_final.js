const fs = require('fs');

// Fix Hero.tsx
const heroPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');

// The issue: "Enter the Dark Side" button - missing </span> closing the outer span
const searchStr = `<span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
              </Link>`;

const replaceStr = `<span>
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
              </Link>`;

if (hero.includes(searchStr)) {
  hero = hero.replace(searchStr, replaceStr);
  fs.writeFileSync(heroPath, hero, 'utf8');
  console.log('✅ Hero.tsx fixed');
} else {
  console.log('❌ Hero.tsx: pattern not found');
  // Try without className
  const searchStr2 = `<span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />`;
  const lines = hero.split('\n');
  for (let i = 75; i < 85 && i < lines.length; i++) {
    console.log(`L${i+1}: ${JSON.stringify(lines[i])}`);
  }
}
