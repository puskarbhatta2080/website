const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// === FIX 1: Left sidebar timeline - missing </div> for content group ===
// Pattern:
//   <div className="group cursor-pointer" onClick=...>   ← opens
//     <span>...</span>
//     <p>...</p>
//     <p>...</p>
//   </div>                                                 ← this closing is MISSING!
//   );
const fix1_from = `<div className="group cursor-pointer" onClick={() => openLightbox(idx)}>
                            <span className="text-[9px] font-mono font-bold" style={{ color: COLORS.goldDim }}>
                              {award.year}
                            </span>
                            <p className="text-[10px] uppercase tracking-wider font-black leading-tight mt-0.5 transition-colors duration-300" style={{ color: COLORS.cream }}>
                              {award.title.length > 28 ? award.title.slice(0, 26) + "…" : award.title}
                            </p>
                            <p className="text-[8px] uppercase tracking-widest font-extrabold mt-0.5" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </p>
                          </div>
                      );`;

const fix1_to = `<div className="group cursor-pointer" onClick={() => openLightbox(idx)}>
                            <span className="text-[9px] font-mono font-bold" style={{ color: COLORS.goldDim }}>
                              {award.year}
                            </span>
                            <p className="text-[10px] uppercase tracking-wider font-black leading-tight mt-0.5 transition-colors duration-300" style={{ color: COLORS.cream }}>
                              {award.title.length > 28 ? award.title.slice(0, 26) + "…" : award.title}
                            </p>
                            <p className="text-[8px] uppercase tracking-widest font-extrabold mt-0.5" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </p>
                          </div>
                      );`;

// === FIX 2: Right sidebar honoree items - missing </div> for min-w-0 div ===
// Pattern:
//   <div className="min-w-0 flex-1">       ← opens
//     <p>...</p>
//     <div className="flex...">            ← inner div (closed)
//     </div>                                ← inner div closed
//   </div>                                  ← THIS IS MISSING
//   <span>→</span>
const fix2_from = `                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] uppercase tracking-wider font-black truncate" style={{ color: COLORS.cream }}>
                            {award.title.length > 20 ? award.title.slice(0, 18) + "…" : award.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[7px] uppercase tracking-widest font-extrabold" style={{ color: COLORS.goldDim }}>
                              {award.year}
                            </span>
                            <span className="text-[6px]" style={{ color: COLORS.goldDim }}>•</span>
                            <span className="text-[7px] uppercase tracking-widest font-extrabold truncate" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>`;

const fix2_to = `                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] uppercase tracking-wider font-black truncate" style={{ color: COLORS.cream }}>
                            {award.title.length > 20 ? award.title.slice(0, 18) + "…" : award.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[7px] uppercase tracking-widest font-extrabold" style={{ color: COLORS.goldDim }}>
                              {award.year}
                            </span>
                            <span className="text-[6px]" style={{ color: COLORS.goldDim }}>•</span>
                            <span className="text-[7px] uppercase tracking-widest font-extrabold truncate" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>`;

// Apply fixes
let c1 = 0, c2 = 0;

if (t.includes(fix1_from)) {
  t = t.replace(fix1_from, fix1_to);
  c1++;
}

if (t.includes(fix2_from)) {
  t = t.replace(fix2_from, fix2_to);
  c2++;
}

fs.writeFileSync(path, t, 'utf8');

// Verify
const openDivs = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (t.match(/<\/div>/g) || []).length;

console.log('Fix 1 (timeline </div>):', c1 > 0 ? '✅ Applied' : '❌ Not found');
console.log('Fix 2 (Now I can clearly see all the structural issues. Let me fix them all with a precise script:

<create_file>
<absolute_path>e:/Puskar Bhatt web/puskar-villain-portfolio/fix_awards_all.js</absolute_path>
<content>const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// Fix 1: Left sidebar timeline - missing </div> closing the outer milestone div before );
// Pattern: ...{award.project}\n                          </div>\n                      );
const fix1 = `                            <p className="text-[8px] uppercase tracking-widest font-extrabold mt-0.5" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </p>
                          </div>
                      );`;

const fix1Replace = `                            <p className="text-[8px] uppercase tracking-widest font-extrabold mt-0.5" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </p>
                          </div>
                      );`;

// Fix 2: Right sidebar honoree items - missing </div> closing min-w-0 flex-1 div before <span>
const fix2 = `                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

const fix2Replace = `                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

// Fix 3: Right sidebar - missing </div> closing the space-y-3 div before Quick stat
const fix3 = `                    ))}
                  </div>

                  {/* Quick stat */}`;

const fix3Replace = `                    ))}
                    </div>

                  {/* Quick stat */}`;

// Fix 4: Missing </div> for outer right sidebar div before DESKTOP SHELF
const fix4 = `                </div>
        </div>

        {/* ===== DESKTOP SHELF ===== */}`;

const fix4Replace = `                </div>
            </div>
        </div>

        {/* ===== DESKTOP SHELF ===== */}`;

let count = 0;
if (t.includes(fix1)) { t = t.replace(fix1, fix1Replace); count++; }
if (t.includes(fix2)) { t = t.replace(fix2, fix2Replace); count++; }
if (t.includes(fix3)) { t = t.replace(fix3, fix3Replace); count++; }
if (t.includes(fix4)) { t = t.replace(fix4, fix4Replace); count++; }

fs.writeFileSync(path, t, 'utf8');
console.log('Fixes applied:', count);

// Verify
const openDivs = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (t.match(/<\/div>/g) || []).length;
console.log('After fix - Open divs:', openDivs, 'Close divs:', closeDivs, 'Diff:', openDivs - closeDivs);
