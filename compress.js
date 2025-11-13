// compress.js
// Recursively compress images from src/assets -> src/assets/compressed
// Supports JPG, JPEG, PNG (via sharp) + SVG (via svgo)

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { optimize } from "svgo";

const SRC_DIR = path.join(process.cwd(), "src", "assets");
const OUT_DIR = path.join(process.cwd(), "src", "assets", "compressed");
const QUALITY = 70;

const rasterExt = new Set([".jpg", ".jpeg", ".png"]);
const vectorExt = new Set([".svg"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (rasterExt.has(ext) || vectorExt.has(ext)) files.push(full);
    }
  }
  return files;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function getOutPath(inputPath) {
  const rel = path.relative(SRC_DIR, inputPath);
  return path.join(OUT_DIR, rel);
}

async function processRaster(inputPath, outputPath, ext) {
  const image = sharp(inputPath).rotate();

  if (ext === ".png") {
    await image
      .png({
        quality: Math.min(100, Math.max(30, Math.round(QUALITY * 1.2))),
      })
      .toFile(outputPath);
  } else {
    await image.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(outputPath);
  }
}

async function processSVG(inputPath, outputPath) {
  const svgData = await fs.readFile(inputPath, "utf8");
  const optimized = optimize(svgData, {
    multipass: true,
    floatPrecision: 2,
    plugins: [
      "removeDimensions",
      "removeComments",
      "removeMetadata",
      "cleanupAttrs",
      "convertStyleToAttrs",
    ],
  });

  await fs.writeFile(outputPath, optimized.data);
}

async function processFile(inputPath) {
  const outPath = getOutPath(inputPath);
  const ext = path.extname(inputPath).toLowerCase();
  await ensureDir(path.dirname(outPath));

  if (rasterExt.has(ext)) {
    await processRaster(inputPath, outPath, ext);
  } else if (vectorExt.has(ext)) {
    await processSVG(inputPath, outPath);
  }

  const inStat = await fs.stat(inputPath);
  const outStat = await fs.stat(outPath);
  console.log(
    `${path.relative(process.cwd(), inputPath)} → ${path.relative(
      process.cwd(),
      outPath
    )} (${Math.round(inStat.size / 1024)}KB → ${Math.round(
      outStat.size / 1024
    )}KB)`
  );
}

async function main() {
  try {
    await fs.access(SRC_DIR);
  } catch {
    console.error(`❌ Source folder not found: ${SRC_DIR}`);
    process.exit(1);
  }

  console.log("🔍 Scanning for images...");
  const files = await walk(SRC_DIR);
  if (files.length === 0) {
    console.log("No images found in src/assets.");
    return;
  }

  console.log(`Found ${files.length} image(s). Starting compression...`);
  for (const f of files) {
    await processFile(f);
  }

  console.log(`✅ Done. Compressed images saved in: ${OUT_DIR}`);
}

main().cat;
