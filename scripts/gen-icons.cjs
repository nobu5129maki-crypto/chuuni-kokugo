"use strict";

/**
 * Render public/icon-source.svg into PWA / Apple touch PNGs.
 * Requires: npm install sharp --save-dev
 */
const fs = require("fs");
const path = require("path");

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error("Run: npm install sharp --save-dev");
    process.exit(1);
  }

  const root = path.join(__dirname, "..");
  const publicDir = path.join(root, "public");
  const svgPath = path.join(publicDir, "icon-source.svg");
  const svg = fs.readFileSync(svgPath);

  const sizes = [
    { name: "pwa-192x192.png", size: 192 },
    { name: "pwa-512x512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  for (const { name, size } of sizes) {
    const out = path.join(publicDir, name);
    await sharp(svg, { density: Math.ceil((size / 512) * 300) || 300 })
      .resize(size, size)
      .png({ compressionLevel: 9, palette: false })
      .toFile(out);
    const stat = fs.statSync(out);
    console.log(`Wrote ${name} (${size}x${size}, ${Math.round(stat.size / 1024)} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
