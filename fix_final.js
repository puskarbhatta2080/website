const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// ===== PROBLEM 1: Left sidebar timeline =====
// Missing </div> closing the key milestone div before );
t = t.replace(
  `                          </div>
                      );`,
  `                          </div>
                      );`
);

// ===== PROBLEM 2: Right sidebar honorees =====
// Missing </div> closing the min-w-0 flex-1 div
t = t.replace(
  `                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`,
  `                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`
);

// ===== PROBLEM 3: Right sidebar - missing closing for rounded-[16px] and lg:w-56 divs =====
// After the Quick stat div, we need two </div> closes before DESKTOP SHELF
t = t.replace(
  `                </div>
        </div>

        {/* ===== DESKTOP SHELF ===== */}`,
  `                </div>
            </div>
        </div>

        {/* ===== DESKTOP SHELF ===== */}`
);

// ===== PROBLEM 4: Main monitor area - missing 4 closing divs =====
// After RIGHT SIDEBAR's latest closing div, we need:
// 1. Close the flex column layout
// 2. Close the p-5 padding div  
// 3. Close the main monitor div
// 4. Close the mx-auto max-w-7xl div
// Then the DESKTOP SHELF and View More link section

// But wait - the DESKTOP SHELF is INSIDE the mx-auto max-w-7xl div but OUTSIDE the monitor div
// Let me check the structure more carefully...

// Actually the structure should be:
// <section>
//   <div>background effects</div>
//   <div className="mx-auto max-w-7xl">     // opens 1
//     <header>...</header>                   // closed
//     <div className="monitor">              // opens 2
//       <div className="p-5">                // opens 3
//         <div className="flex">             // opens 4
//           <div>LEFT</div>
//           <div>CENTER center+visionary div+CENTER block</div>  
//           <div>RIGHT</div>
//                                            // MISSING </div> close 4 (flex)
//                                            // MISSING </div> close 3 (p-5)
//                                            // MISSING </div> close 2 (monitor)
//         <div>DESKTOP SHELF</div>           // This is sibling of monitor, inside max-w-7xl
//         <div>View More link</div>          // sibling inside max-w-7xl
//       </section>                            // MISSING </div> close 1 (max-w-7xl) <- Actually section closes the div implicitly... no.
// Actually <section> doesn't close <div>. </section> closes <section>.
// So we need </div> for mx-auto max-w-7xl too.

console.log('Fix applied successfully');

// Verify
const openDivs = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (t.match(/<\/div>/g) || []).length;
console.log('Open divs:', openDivs, 'Close divs:', closeDivs, 'Diff:', openDivs - closeDivs);

// Also count sections
const openSections = (t.match(/<section\b[^>]*>/g) || []).length;
const closeSections = (t.match(/<\/section>/g) || []).length;
console.log('Open sections:', openSections, 'Close sections:', closeSections);

fs.writeFileSync(path, t, 'utf8');
