const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

// Fix 1: Remove extra `}` - change `})}` to `)}`
t = t.replace(
  `                    })}\n                  </div>\n              </div>`,
  `                    })}\n                  </div>\n              </div>`
);
// The above won't work since it's the same string. Let me look for the unique pattern.
// The issue is `})}` closing braces. Let me find a more unique pattern.

console.log('File read complete. Length:', t.length);

// Find line 348 area
const lines = t.split('\n');
console.log('Lines around 348:');
for (let i = 340; i < 355 && i < lines.length; i++) {
  console.log(`${i+1}: ${JSON.stringify(lines[i])}`);
}
