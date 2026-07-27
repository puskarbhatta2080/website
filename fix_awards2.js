const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// Check for unclosed divs
const openDivs = (t.match(/<div/g) || []).length;
const closeDivs = (t.match(/<\/div>/g) || []).length;
console.log('Open <div> tags:', openDivs);
console.log('Close </div> tags:', closeDivs);
console.log('Difference:', openDivs - closeDivs);

// Check sections
console.log('\n--- Looking for structure issues ---');

// Find the right sidebar section - it might be missing its closing </div>
const rightSidebarMatch = t.match(/Recent Honorees/);
if (rightSidebarMatch) {
  console.log('Recent Honorees found at index:', rightSidebarMatch.index);
}

// Check for the end of the file
const endSection = t.slice(-800);
console.log('\n--- Last 800 chars ---');
console.log(endSection);
