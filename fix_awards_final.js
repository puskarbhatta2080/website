const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// The issue is in the "Recent Honorees" sidebar section.
// The <div>s are not properly closed.
// Let's first fix the obvious missing closing tags by the `})` pattern

// Fix 1: After `{award.project}` there should be a `</div>` for the inner `flex items-center gap-2 mt-0.5` div
// The structure of each honor item is:
// <div key=...>        // 1
//   <div h-8 w-8 />    // 2 (self-closing)
//   <div min-w-0>      // 3
//     <p>...</p>       // 
//     <div flex>       // 4
//       <span>...</span>
//       <span>•</span>
//       <span>...</span>
//     </div>           // missing 1 - close div 4
//   </div>              // missing 2 - close div 3
//   <span>→</span>
// </div>                // missing 3 - close div 1

// Let's find and fix the specific pattern
const target = `                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>`;

const replacement = `                            </span>
                            </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>
                    ))}`;

console.log('Before fix - target found:', t.includes(target));

// Check for the exact issue in the timeline section (left sidebar)
// The milestone section has `});` which is JavaScript, not JSX closing
// We need: `</div>);` instead of `});`
const timelineIssue = t.indexOf('                    })\n                  </div>\n              </div>\n\n              {/* ===== CENTER');
console.log('Timeline issue at index:', timelineIssue);

if (timelineIssue > -1) {
  t = t.slice(0, timelineIssue) + `                    })}
                  </div>

              {/* ===== CENTER` + t.slice(t.indexOf('{/* ===== CENTER'));
  
  // Fix the specific pattern - each milestone item should close properly
}

// Actually let me take a different approach. Let me fix the known issues precisely.

// Fix: after the flex items div in the milestone timeline, add the missing </div>
t = t.replace(
  `                            </p>
                          </div>
                      );
                    })}
                  </div>

              {/* ===== CENTER: Honors Reel (Infinite Carousel) ===== */}`,
  `                            </p>
                          </div>
                      );
                    })}
                  </div>

              {/* ===== CENTER: Honors Reel (Infinite Carousel) ===== */}`
);

// Fix: in the right sidebar honors list items, add missing </div> tags
t = t.replace(
  `<span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>
                    ))}`,
  `<span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>
                    ))}`
);
// That wouldn't change anything. Let me find the exact issue.

const lines = t.split('\n');
// Print lines 290-350 to see the exact structure problem area (after Recent Honorees)
const recentIdx = t.indexOf('Recent Honorees');
const preLines = t.slice(0, recentIdx).split('\n').length;
console.log('Recent Honorees starts at line:', preLines);
for (let i = preLines; i < Math.min(preLines + 60, lines.length); i++) {
  console.log(`${i+1}: ${lines[i].replace(/\t/g, '  ')}`);
}
