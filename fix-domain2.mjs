import fs from "fs";

// Fix sitemap.ts
let sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");
sitemap = sitemap.replace("puskarbhatta.com", "puskarbhatt.com");
fs.writeFileSync("src/app/sitemap.ts", sitemap);
console.log("✓ sitemap.ts fixed");

// Fix robots.ts
let robots = fs.readFileSync("src/app/robots.ts", "utf8");
robots = robots.replace("puskarbhatta.com", "puskarbhatt.com");
fs.writeFileSync("src/app/robots.ts", robots);
console.log("✓ robots.ts fixed");

// Fix layout.tsx - add back authors field
let layout = fs.readFileSync("src/app/layout.tsx", "utf8");
if (!layout.includes("authors:")) {
  layout = layout.replace(
    '"Nepali drama actor",\n  ],\n\n  creator:',
    '"Nepali drama actor",\n  ],\n  authors: [{ name: "Puskar Bhatt", url: "https://puskarbhatt.com" }],\n  creator:'
  );
  fs.writeFileSync("src/app/layout.tsx", layout);
  console.log("✓ authors restored in layout.tsx");
} else {
  console.log("✓ authors already present in layout.tsx");
}
