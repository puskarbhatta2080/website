const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let t = fs.readFileSync(path, 'utf8');

// Fix 1: Missing closing </span> for the BHATT span wrapper
t = t.replace(
  'BHATT</span>\n            </h2>',
  'BHATT</span>\n              </span>\n            </h2>'
);

// Fix 2: Missing closing </span> for the "Enter the Dark Side" span
t = t.replace(
  '<span className="relative whitespace-nowrap">Enter the Dark Side</span>\n              </Link>',
  '<span className="relative whitespace-nowrap">Enter the Dark Side</span>\n                </span>\n              </Link>'
);

fs.writeFileSync(path, t, 'utf8');
console.log('Hero.tsx fixed successfully');
