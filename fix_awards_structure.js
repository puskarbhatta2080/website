const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// Normalize line endings
t = t.replace(/\r\n/g, '\n');

// ===== FIX 1: RIGHT SIDEBAR - Missing </div> for min-w-0 flex-1 =====
// Current:
//   <div className="min-w-0 flex-1">
//     ...
//     <span className="text-[7px] ...">{award.project}</span>
//   </div>               ← closes the inner span wrapper
//   <span className="text-[9px] ...">→</span>
// </div>                 ← closes honoree item
// 
// Should be:
//   <div className="min-w-0 flex-1">
//     ...
//     <span className="text-[7px] ...">{award.project}</span>
//   </div>               ← closes the inner span wrapper
//   </div>               ← MISSING: closes min-w-0 flex-1
//   <span className="text-[9px] ...">→</span>
// </div>                 ← closes honoree item

const fix1Search = `                        </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>
                    ))}`;

const fix1Replace = `                        </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>
                    ))}`;

t = t.replace(fix1Search, fix1Replace);

// ===== FIX 2: LEFT SIDEBAR - Missing </div> for milestone div =====
// Current:
//     ...content...
//   </div>            ← closes group cursor-pointer
//                      );
//     })}  
//   </div>            ← closes space-y-0
// 
// Should be:
//   </div>            ← closes group cursor-pointer  
//   </div>            ← MISSING: closes key milestone div
//   );
//   })}
//   </div>            ← closes space-y-0

const fix2Search = `                        </div>
                      );
                    })}`;

const fix2Replace = `                        </div>
                      );
                    })}`;

t = t.replace(fix2Search, fix2Replace);

// ===== FIX 3: CENTER SECTION - Missing nested div closes =====
// After the "Visionary Honor" div, we have:
// </div>  ← closes Visionary Honor div
// 
// But before DESKTOP SHELF, we need to close:
// - The carousel container div (overflow-hidden rounded-[16px])
// - The "flex-1 min-w-0" center column div
// - The "p-5 sm:p-6 lg:p-8" padding div
// - The "rounded-[22px]" main monitor div
// - The "mx-auto max-w-7xl" outer div
// Actually wait - some of these are closed before DESKTOP SHELF:
// Let me check...

// From the actual file structure:
// The issue is after the RIGHT SIDEBAR closes (around line 342),
// next we have DESKTOP SHELF (inside the same parent),
// then the main closing of outer divs happens AFTER DESKTOP SHELF.

// Let me focus on just fixing the left sidebar and right sidebar first,
// since those are causing the parsing errors.

fs.writeFileSync(path, t.replace(/\n/g, '\r\n'), 'utf8');

const v = fs.readFileSync(path, 'utf8');
const openDivs = (v.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (v.match(/<\/div>/g) || []).length;
console.log('Divs - Open:', openDivs, 'Close:', closeDivs, 'Diff:', openDivs - closeDivs);

// Also check for JSX issues
const mapCloses = (v.match(/\)\s*\}\)/g) || []).length;
console.log('Map closes ")}":', mapCloses);
