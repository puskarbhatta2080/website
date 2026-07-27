const fs = require('fs');

// ===== FIX HERO.TSX =====
const heroPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');

// Fix: Close <span className="relative"> before </Link>
hero = hero.replace(
  `<span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
              </Link>`,
  `<span className="relative">
                  <span className="absolute -inset-3 rounded-full animate-pulse [animation-duration:2.2s] bg-[rgba(220,38,38,0.25)]" />
                  <span className="relative whitespace-nowrap">Enter the Dark Side</span>
              </Link>`
);

fs.writeFileSync(heroPath, hero, 'utf8');
console.log('✅ Hero.tsx fixed');
