const fs = require('fs');

const awardsPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(awardsPath, 'utf8');

// Check the exact bytes around timeline end
const idx = t.indexOf('});\n                  </div>\n              </div>');
console.log('Index of first pattern:', idx);

// Show exact content at timeline connection area (around 346-352)
const lines = t.split(/\r?\n/);
for (let i = 344; i < 353; i++) {
  const line = lines[i] || '';
  console.log(`${i+1}: length=${line.length} chars: ${JSON.stringify(line)}`);
}

// Check if the issue is actually a different section causing the error
// The build error says line 348 has "})}" - but reading shows just "})"
// Let me check what's happening at the end of file
for (let i = lines.length - 5; i < lines.length; i++) {
  console.log(`END ${i+1}: ${JSON.stringify(lines[i])}`);
}
