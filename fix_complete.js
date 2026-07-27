const fs = require('fs');

// ===== FIX HERO.TSX =====
const heroPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');

// Fix missing </span> closing the outer span for PUSKAR/BHATT
const heroFix = '<span className="block text-[#dc2626] drop-shadow-[0_0_40px_rgba(220,38,38,0.40)]">BHATT</span>\n            </h2>';
const heroFixReplace = '<span className="block text-[#dc2626] drop-shadow-[0_0_40px_rgba(220,38,38,0.40)]">BHATT</span>\n              </span>\n            </h2>';

if (hero.includes(heroFix)) {
  hero = hero.replace(heroFix, heroFixReplace);
  fs.writeFileSync(heroPath, hero, 'utf8');
  console.log('✅ Hero.tsx fixed');
} else {
  console.log('❌ Hero.tsx pattern not found');
  // Try reading raw file to find exact bytes
  const heroRaw = fs.readFileSync(heroPath, 'utf8');
  const heroLines = heroRaw.split(/\r?\n/);
  console.log('Hero lines 60-66:');
  for (let i = 59; i < 67 && i < heroLines.length; i++) {
    console.log(`${i+1}: ${JSON.stringify(heroLines[i])}`);
  }
}

// ===== FIX AWARDS.TSX =====
const awardsPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(awardsPath, 'utf8');

// The problem: Line 347-348 has `);` then `})}` 
// `);` = return; (closes JSX expression AND statement)
// `})}` = } closes arrow body, ) closes map, } closes outer JSX
// But there's an extra `)` in the `);` which is wrong.
// The correct sequence should be:
// </div>  ← closes content div
//   );    ← ERROR: this should just be `)` to close the map
// })}    ← ERROR: this `}` closes arrow body, `)` has no matching `(`
// 
// ACTUAL FIX NEEDED: 
// Line 347 should NOT have `);` — it should just end the JSX without `;`
// Actually the real issue is the map doesn't have proper return structure

// Let me rewrite the problematic section properly.
// The map callback for milestones should be:
// {[...AWARDS].sort(...).map((award, idx, arr) => {
//   const isLast = idx === arr.length - 1;
//   return (
//     <div key={`milestone-${idx}`} className="relative pl-5 pb-4">
//       ...
//       <div className="group cursor-pointer" ...>
//         ...
//       </div>
//     </div>
//   );
// })}

// Current broken code at lines 332-350:
// {[...AWARDS].sort(...).map((award, idx, arr) => {    ← row start
//   const isLast = ...;
//   return (                                            ← return
//     <div key=...>                                      ← milestone div
//       ...inner elements...
//       <div className="group cursor-pointer"...>        ← content div
//         ...
//       </div>                                            ← closes content div (line 346)
//       );                                                ← closes return,; is extra (line 347)
//     })}                                                 ← },),} but missing </div> for milestone div (line 348)
//   </div>                                                ← closes space-y-0 (line 349)
// </div>                                                  ← closes rounded-[16px]? (line 350)

// So the fix: Insert missing </div> between line 346 and 347
// and fix line 347 from `);` to just `)` (no semicolon)

const fixTarget = `                          </div>
                      );
                    })}`;

const fixReplace = `                          </div>
                      );
                    )}`;

if (t.includes(fixTarget)) {
  t = t.replace(fixTarget, fixReplace);
  console.log('✅ Awards timeline fix applied');
} else {
  console.log('❌ Awards timeline pattern not found');
  // Try with exact match including CRLF
  const tNormalized = t.replace(/\r\n/g, '\n');
  if (tNormalized.includes(fixTarget.replace(/\n/g, '\n'))) {
    console.log('Pattern exists with LF but file has CRLF');
  }
}

// Fix honoree section
const honoreeTarget = `                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

const honoreeReplace = `                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

// Normalize line endings for matching
let tNorm = t.replace(/\r\n/g, '\n');
const honoreeNorm = honoreeTarget.replace(/\r\n/g, '\n');
const honoreeReplaceNorm = honoreeReplace.replace(/\r\n/g, '\n');

const idx2 = tNorm.indexOf(honoreeNorm);
if (idx2 > -1) {
  tNorm = tNorm.slice(0, idx2) + honoreeReplaceNorm + tNorm.slice(idx2 + honoreeNorm.length);
  console.log('✅ Awards honoree fix applied at index', idx2);
} else {
  console.log('❌ Awards honoree pattern not found');
}

// Write back with original line endings
tNorm = tNorm.replace(/\n/g, '\r\n');
fs.writeFileSync(awardsPath, tNorm, 'utf8');

// Verify
const v = fs.readFileSync(awardsPath, 'utf8');
const openDivs = (v.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (v.match(/<\/div>/g) || []).length;
console.log('Final div count - Open:', openDivs, 'Close:', closeDivs, 'Diff:', openDivs - closeDivs);
