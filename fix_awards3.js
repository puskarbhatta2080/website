const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// Check for missing closing tags around the right sidebar
// Search for patterns where JSX closing braces might be missing

// Find all lines with just closing bracket patterns
const lines = t.split('\n');
let depth = 0;
let lineNum = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const openD = (line.match(/<div/g) || []).length;
  const closeD = (line.match(/<\/div>/g) || []).length;
  const openSec = (line.match(/<section/g) || []).length;
  const closeSec = (line.match(/<\/section>/g) || []).length;
  const openReactFrag = (line.match(/<>/g) || []).length;
  const closeReactFrag = (line.match(/<\/>/g) || []).length;
  
  depth += openD + openSec + openReactFrag;
  depth -= closeD + closeSec + closeReactFrag;
  
  if (depth !== lineNum) {
    // just track
  }
  lineNum = depth;
  
  if (line.includes('Recent Honorees') || i > 340) {
    // Print from Recent Honorees onward to understand structure
  }
}

// Find the right sidebar area and verify its structure
const rightSidebarIdx = t.indexOf('Recent Honorees');
console.log('Right sidebar starts at char:', rightSidebarIdx);

// Get the section from "Recent Honorees" to the end of that div
const fromRight = t.slice(rightSidebarIdx - 50, rightSidebarIdx + 3000);
console.log('\n--- Right Sidebar area ---');
console.log(fromRight);
