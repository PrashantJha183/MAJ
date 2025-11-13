// scripts/compressPublic.js
// Compress all JPG, JPEG, PNG images in public/jewellery → public/jewellery/compressed

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(process.cwd(), "public", "jewellery");
const OUT_DIR = path.join(SRC_DIR, "compressed");
const QUALITY = 70;
const allowedExt = [".jpg", ".jpeg", ".png"];

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (allowedExt.includes(path.extname(e.name).toLowerCase()))
      files.push(full);
  }
  return files;
}

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function processFile(input) {
  const rel = path.relative(SRC_DIR, input);
  const output = path.join(OUT_DIR, rel);
  await ensureDir(path.dirname(output));

  const ext = path.extname(input).toLowerCase();
  const img = sharp(input).rotate(); // fix EXIF orientation

  if (ext === ".png") {
    await img
      .png({ quality: Math.min(100, Math.round(QUALITY * 1.2)) })
      .toFile(output);
  } else {
    await img.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(output);
  }

  const inStat = fs.statSync(input);
  const outStat = fs.statSync(output);
  console.log(
    `${rel} → ${Math.round(inStat.size / 1024)}KB → ${Math.round(
      outStat.size / 1024
    )}KB`
  );
}

(async () => {
  try {
    await fsp.access(SRC_DIR);
  } catch {
    console.error("❌ Folder not found:", SRC_DIR);
    process.exit(1);
  }

  console.log("🔍 Scanning for images...");
  const files = await walk(SRC_DIR);
  if (!files.length) {
    console.log("No images found in public/jewellery");
    return;
  }
  console.log(`Found ${files.length} images. Compressing...`);

  for (const file of files) {
    await processFile(file);
  }

  console.log(`✅ Done! Output in ${OUT_DIR}`);
})();
