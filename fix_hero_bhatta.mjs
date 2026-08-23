
import fs from "fs";

const filePath = "src/components/Hero.tsx";
let c = fs.readFileSync(filePath, "utf8");

// Fix 1: Change BHATT to BHATTA with solid red background badge
// Find the BHATT span block
const oldBhatt = c.match(
  /<span\s+className="relative block text-\[42px\] xs:text-\[50px\] sm:text-\[80px\] md:text-\[100px\] font-black uppercase leading-\[0\.9\] mt-\[-2px\]"[\s\S]*?BHATT[\s\S]*?<\/span>/
);

if (oldBhatt) {
  console.log("✓ Found BHATT block - replacing with BHATTA solid badge");
  const newBlock = `<span className="relative inline-block mt-4 mb-2">
              <span className="inline-block px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#ef4444] shadow-[0_0_50px_rgba(220,38,38,0.50),0_0_100px_rgba(220,38,38,0.25)]">
                <motion.span
                  className="inline-block text-[42px] xs:text-[50px] sm:text-[80px] md:text-[100px] font-black uppercase leading-[0.9] text-white"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.15)",
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  BHATTA
                </motion.span>
              </span>`;
  c = c.replace(oldBhatt[0], newBlock);
} else {
  console.log("✗ Could not find BHATT block - may already be updated");
}

// Fix 2: Fix domain mismatch in robots.ts
// sitemap references puskarbhatt.com but layout says puskarbhatta.com.np

// Fix 3: Add SEO improvements to layout.tsx
// Add missing sameAs URLs, fix canonical URL

fs.writeFileSync(filePath, c, "utf8");
console.log("✓ Hero.tsx updated successfully");
