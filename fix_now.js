const fs = require('fs');

// ===== FIX HERO.TSX =====
const heroPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');

// Fix: Missing </span> closing for the span that wraps BHATT + the outer span for PUSKAR BHATT
// Current broken code:
//   <span className="block text-[#d4d4d8] ...">
//     PUSKAR
//     <span className="block text-[#dc2626] ...">BHATT</span>
//   </h2>
// Should be:
//   <span className="block text-[#d4d4d8] ...">
//     PUSKAR
//     <span className="block text-[#dc2626] ...">BHATT</span>
//   </span>
//   </h2>

hero = hero.replace(
  '              <span className="block text-[#dc2626] drop-shadow-[0_0_40px_rgba(220,38,38,0.40)]">BHATT</span>\n            </h2>',
  '              <span className="block text-[#dc2626] drop-shadow-[0_0_40px_rgba(220,38,38,0.40)]">BHATT</span>\n              </span>\n            </h2>'
);

fs.writeFileSync(heroPath, hero, 'utf8');
console.log('✅ Hero.tsx fixed');

// ===== FIX AWARDS.TSX =====
const awardsPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(awardsPath, 'utf8');

// The Awards error is at the timeline section. The issue is `})}` which is an extra `}`
// The pattern should be `)` (close map) then `}` (close JSX expression)
// But currently it's `)}` then `})`
// The real issue is the timeline milestone's <div> content div isn't properly contained

// Let me check what's around line 348
const lines = t.split('\n');
console.log('\nLines 340-355:');
for (let i = 339; i < 355 && i < lines.length; i++) {
  console.log(`${i+1}: ${JSON.stringify(lines[i])}`);
}

// The problem is that after the `</div>` (closing the content group), we have `);` 
// which closes the map callback. But then we have `})}` which is the JSX expression 
// closing `}` followed by `)` and another `}` that shouldn't be there.

// The structure around line 344-350 is:
// 344: {award.project}
// 345: </p>
// 346: </div>  ← closes the group cursor-pointer div
// 347:       );  ← closes the return, map callback
// 348:     })}   ← WOULD close JSX expression + map call
// 349:   </div>  ← closes space-y-0 div
// 350:   </div>  ← closes .. ?
// 351: 
// 352: ...CENTER...

// Wait - the error says line 348 has `})}` - that means there are 3 closing tokens.
// Let me check if `)}` at 347 and `})}` at 348 already includes a fix attempt
