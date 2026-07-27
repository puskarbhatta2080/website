const fs = require('fs');

const awardsPath = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
// Read as raw bytes to see exact content
const t = fs.readFileSync(awardsPath, 'utf8');

// The exact text in the file (CRLF line endings)
// Line 346: `                          </div>`
// Line 347: `                      );`
// Line 348: `                    })}`
// Need to insert `</div>` between 346 and 347

// Use the exact string from the file
const searchStr = '                          </div>\r\n                      );\r\n                    })}';
const replaceStr = '                          </div>\r\n                        </div>\r\n                      );\r\n                    })}';

if (t.includes(searchStr)) {
  const result = t.replace(searchStr, replaceStr);
  fs.writeFileSync(awardsPath, result, 'utf8');
  
  const openDivs = (result.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
  const closeDivs = (result.match(/<\/div>/g) || []).length;
  console.log('✅ Timeline fix applied. Divs - Open:', openDivs, 'Close:', closeDivs, 'Diff:', openDivs - closeDivs);
} else {
  console.log('❌ Timeline fix: exact pattern not found');
  console.log('Checking with normalized line endings...');
  const norm = t.replace(/\r\n/g, '\n');
  const searchNorm = '                          </div>\n                      );\n                    })}';
  if (norm.includes(searchNorm)) {
    console.log('Pattern found with LF but file has CRLF');
  } else {
    console.log('Pattern not found even with LF');
  }
}
