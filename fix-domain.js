const fs = require("fs");

// 1. Fix layout.tsx - replace domain and restore authors line
let layout = fs.readFileSync("puskar-villain-portfolio/src/app/layout.tsx", "utf8");

// Replace domain
layout = layout.replace(/puskarbhatta\.com\.np/g, "puskarbhatt.com");

// Restore authors line that was accidentally removed
layout = layout.replace(
  `"Nepali drama actor",\n  ],\n\n  creator:`,
  `"Nepali drama actor",\n  ],\n  authors: [{ name: "Puskar Bhatt", url: "https://puskarbhatt.com" }],\n  creator:`
);

fs.writeFileSync("puskar-villain-portfolio/src/app/layout.tsx", layout, "utf8");
console.log("✓ Fixed layout.tsx");

// 2. Fix sitemap.ts
let sitemap = fs.readFileSync("puskar-villain-portfolio/src/app/sitemap.ts", "utf8");
sitemap = sitemap.replace(/puskarbhatta\.com\.np/g, "puskarbhatt.com");
fs.writeFileSync("puskar-villain-portfolio/src/app/sitemap.ts", sitemap, "utf8");
console.log("✓ Fixed sitemap.ts");

// 3. Fix robots.ts
let robots = fs.readFileSync("puskar-villain-portfolio/src/app/robots.ts", "utf8");
robots = robots.replace(/puskarbhatta\.com\.np/g, "puskarbhatt.com");
fs.writeFileSync("puskar-villain-portfolio/src/app/robots.ts", robots, "utf8");
console.log("✓ Fixed robots.ts");

console.log("\n✅ All domain references updated from puskarbhatta.com.np → puskarbhatt.com");
</｜｜DSML｜｜parameter>
</create_file>
