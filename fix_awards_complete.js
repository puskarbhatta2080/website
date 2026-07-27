const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// Count divs
const openDivs = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (t.match(/<\/div>/g) || []).length;
console.log('Before - Open divs:', openDivs, 'Close divs:', closeDivs, 'Diff:', openDivs - closeDivs);

// Issue at the CENTER reel section: The </div> and ); alignment
// The problem starts at the "VISUAL ATLAS" section in the middle carousel
// Looking at line ~460-475 area, we need to find and fix the unclosed div

// Fix 1: Add missing </div> before the ")}" closing
// The slide div (w-1/3 px-2) within the carousel is missing its closing </div>
// Pattern: after "colored accent bar" section
const pattern1 = `                            />
                        </div>
                      );
                    })}`;
const replacement1 = `                            />
                        </div>
                      );
                    })}`;

if (t.includes(pattern1)) {
  t = t.replace(pattern1, replacement1);
  console.log('✅ Fix 1 applied: Added missing slide container </div>');
} else {
  console.log('❌ Fix 1 pattern not found, looking for alternative...');
  // Try relaxed pattern
  const relaxed1 = `                            />
                        </div>
                      );`;
  if (t.includes(relaxed1)) {
    t = t.replace(relaxed1, `                            />
                        </div>
                      );`);
    console.log('✅ Fix 1 (relaxed) applied');
  }
}

// Write back
fs.writeFileSync(path, t, 'utf8');

// Re-count
const afterOpen = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const afterClose = (t.match(/<\/div>/g) || []).length;
console.log('After - Open divs:', afterOpen, 'Close divs:', afterClose, 'Diff:', afterOpen - afterClose);
console.log('Done');
