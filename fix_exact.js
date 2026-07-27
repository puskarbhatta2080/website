const fs = require('fs');

// ===== FIX HERO.TSX =====
const heroPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');

// Fix: Missing </span> before </h2>
// The span wrapping PUSKAR+<span>BHATT</span> needs its own </span>
hero = hero.replace(
  '<span className="block text-[#dc2626] drop-shadow-[0_0_40px_rgba(220,38,38,0.40)]">BHATT</span>\n            </h2>',
  '<span className="block text-[#dc2626] drop-shadow-[0_0_40px_rgba(220,38,38,0.40)]">BHATT</span>\n              </span>\n            </h2>'
);
fs.writeFileSync(heroPath, hero, 'utf8');
console.log('Hero.tsx done');

// ===== FIX AWARDS.TSX =====
const awardsPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(awardsPath, 'utf8');
const lines = t.split('\n');

// Fix the timeline section (lines 346-350)
// Current:
// 346: </div>           ← closes content div
// 347:       );          ← closes return, arrow function body, map call, JSX expr... wait
// 348:     })}           ← extra closing braces
// 349:   </div>          ← closes space-y-0
// 350: </div>            ← ??? 

// Looking at the original code, the issue is that `);` at 347 closes return, 
// but NOT the arrow body } or the map ) or JSX expression }
// Then `})}` at 348 is ambiguous: 
// First `}` closes arrow body 
// `)` closes map call
// Final `}` closes JSX expression
// But parser gets confused. Let me fix by restructuring:

// The correct structure should be:
// 346: </div>            ← closes content div
// 347: </div>            ← closes key milestone div  
// 348:                   );
// 349:                   )}
// 350:                 </div>    ← closes space-y-0
// 351:               </div>      ← closes rounded-[16px] p-5 h-full div

// Fix: Insert missing </div> before );
const oldTimelineEnd = `                            </p>
                          </div>
                      );
                    })}`;

const newTimelineEnd = `                            </p>
                          </div>
                      );
                    )}`;

if (t.includes(oldTimelineEnd)) {
  t = t.replace(oldTimelineEnd, newTimelineEnd);
  console.log('Timeline fix: APPLIED');
} else {
  console.log('Timeline fix: pattern not found');
}

// Fix right sidebar: missing </div> closing min-w-0 flex-1  
const oldHonoree = `<span className="text-[7px] uppercase tracking-widest font-extrabold truncate" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

const newHonoree = `<span className="text-[7px] uppercase tracking-widest font-extrabold truncate" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

if (t.includes(oldHonoree)) {
  t = t.replace(oldHonoree, newHonoree);
  console.log('Honoree fix: APPLIED');
} else {
  console.log('Honoree fix: pattern not found');
}

const openDivs = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (t.match(/<\/div>/g) || []).length;
console.log('Divs - Open:', openDivs, 'Close:', closeDivs, 'Diff:', openDivs - closeDivs);

fs.writeFileSync(awardsPath, t, 'utf8');
