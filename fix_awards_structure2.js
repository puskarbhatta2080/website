const fs = require('fs');
const path = 'e:/Puskar Bhatt web/puskar-villain-portfolio/src/components/Awards.tsx';
let t = fs.readFileSync(path, 'utf8');

const problems = [
  // Fix 1: RIGHT SIDEBAR section - missing </div> before closing )}
  // The "min-w-0 flex-1" div and other divs aren't closed
  {
    search: `                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] uppercase tracking-wider font-black truncate" style={{ color: COLORS.cream }}>
                            {award.title.length > 20 ? award.title.slice(0, 18) + "…" : award.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[7px] uppercase tracking-widest font-extrabold" style={{ color: COLORS.goldDim }}>
                              {award.year}
                            </span>
                            <span className="text-[6px]" style={{ color: COLORS.goldDim }}>•</span>
                            <span className="text-[7px] uppercase tracking-widest font-extrabold truncate" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>
                    ))}`,
    replace: `                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] uppercase tracking-wider font-black truncate" style={{ color: COLORS.cream }}>
                            {award.title.length > 20 ? award.title.slice(0, 18) + "…" : award.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[7px] uppercase tracking-widest font-extrabold" style={{ color: COLORS.goldDim }}>
                              {award.year}
                            </span>
                            <span className="text-[6px]" style={{ color: COLORS.goldDim }}>•</span>
                            <span className="text-[7px] uppercase tracking-widest font-extrabold truncate" style={{ color: COLORS.goldDim }}>
                              {award.project}
                            </span>
                          </div>
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.gold }}>→</span>
                      </div>
                    ))}`
  },

  // Fix 2: MILESTONE section - missing </div>
  {
    search: `                      </div>
              </div>`,
    replace: `                      </div>
                      </div>`
  },

  // Fix 3: Reel carousel - missing slide div closure
  {
    search: `                            />
                        </div>
                      );
                    })}`,
    replace: `                            />
                        </div>
                      );
                    })}`
  },
  
  // Fix 4: Add missing </div> in right sidebar after honorees
  {
    search: `                        </div>
                  </div>`,
    replace: `                        </div>
                    </div>`
  }
];

let madeChanges = false;
for (const { search, replace } of problems) {
  const count = (t.match(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (count > 0) {
    t = t.replace(search, replace);
    console.log(`✅ Fixed ${count} occurrence(s) of pattern`);
    madeChanges = true;
  }
}

if (!madeChanges) {
  console.log('⚠️ No patterns matched! Let me show you the file structure around the errors...');
  // Look for suspicious patterns
  const lines = t.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(')}') && !line.includes('})}')) {
      // Check if the last div before this wasn't closed
      let openDiv = 0, closeDiv = 0;
      for (let j = Math.max(0, i - 5); j <= i; j++) {
        openDiv += (lines[j].match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
        closeDiv += (lines[j].match(/<\/div>/g) || []).length;
      }
      if (openDiv > closeDiv) {
        console.log(`Line ${i+1}: ${JSON.stringify(line)} [unclosed divs: ${openDiv - closeDiv}]`);
      }
    }
  }
}

fs.writeFileSync(path, t, 'utf8');

// Verify
const afterOpen = (t.match(/<div\b(?![^>]*\/>)[^>]*>/g) || []).length;
const afterClose = (t.match(/<\/div>/g) || []).length;
console.log('Final divs - Open:', afterOpen, 'Close:', afterClose, 'Diff:', afterOpen - afterClose);
