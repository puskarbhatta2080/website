const fs = require('fs');

const awardsPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(awardsPath, 'utf8');

// Normalize line endings for matching
t = t.replace(/\r\n/g, '\n');

// Show exact content around line 468-472
const lines = t.split('\n');
console.log('Lines around error:');
for (let i = 465; i < 475 && i < lines.length; i++) {
  console.log(`L${i+1}: ${JSON.stringify(lines[i])}`);
}

// Fix the CENTER section reel items - missing </div> closing the slide div before );
// The issue is:
//   </div>   ← closes something inside the slide
//   );       ← BUT the slide div itself (w-1/3 px-2) is not closed!
//   })}

// Need to add </div> before );

const reelCloseSearch = `                        </div>
                      );
                    })}`;

const reelCloseReplace = `                        </div>
                      );
                    })}`;

if (t.includes(reelCloseSearch)) {
  t = t.replace(reelCloseSearch, reelCloseReplace);
  console.log('✅ CENTER reel fix applied');
} else {
  console.log('❌ CENTER reel pattern not found');
}

// Write back with CRLF
fs.writeFileSync(awardsPath, t.replace(/\n/g, '\r\n'), 'utf8');

// Verify div counts
const v = fs.readFileSync(awardsPath, 'utf8');
const openDivs = (v.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const closeDivs = (v.match(/<\/div>/g) || []).length;
console.log('Divs - Open:', openDivs, 'Close:', closeDivs, 'Diff:', openDivs - closeDivs);
