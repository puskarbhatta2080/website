const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// Issue 1: LEFT SIDEBAR - Timeline section at line ~348
// Missing </div> closing for the flexible div in each milestone
// Pattern: after {award.project}</p> there should be a </div> before </div> and );
const milestonePattern = `                            </p>
                          </div>
                      );
                    })}
                  </div>

              {/* ===== CENTER: Honors Reel (Infinite Carousel) ===== */}`;

const milestoneFixed = `                            </p>
                          </div>
                      );
                    })}
                  </div>

              {/* ===== CENTER: Honors Reel (Infinite Carousel) ===== */}`;

// Issue 2: RIGHT SIDEBAR - Each honoree item is missing two </div> tags
// The structure should be:
// <div key=...>              (line 573)
//   <div icon>               (line 578, closed at 586)
//   <div min-w-0>            (line 587)
//     <p>...</p>
//     <div flex>             (line 591, closed at 599)
//   </div>                   ← MISSING (closing min-w-0 div)
//   <span>→</span>
// </div>                     ← this closes the key div (exists at 601)

// Let's fix it
const honoreePattern = `                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

const honoreeFixed = `                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

let count1 = 0;
let count2 = 0;

// Fix issue 1
if (t.includes(milestonePattern)) {
  t = t.replace(milestonePattern, milestoneFixed);
  count1++;
}

// Fix issue 2
if (t.includes(honoreePattern)) {
  t = t.replace(honoreePattern, honoreeFixed);
  count2++;
}

fs.writeFileSync(path, t, 'utf8');
console.log('Fix 1 applied:', count1 > 0 ? 'YES' : 'NO (pattern not found)');
console.log('Fix 2 applied:', count2 > 0 ? 'YES' : 'NO (pattern not found)');

// Verify
const openDivs = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (t.match(/<\/div>/g) || []).length;
console.log('After fix - Open divs:', openDivs, 'Close divs:', closeDivs, 'Diff:', openDivs - closeDivs);
