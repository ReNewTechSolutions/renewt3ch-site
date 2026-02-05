#!/usr/bin/env node
/**
 * scripts/make-og.mjs
 * Generates a premium OG image at assets/previews/og-cover-v2.png
 *
 * Uses:
 *  - assets/logos/Logo-Renewt3ch.svg (wordmark)
 *  - assets/logos/r3-icon-gradient.svg (optional small icon)
 *
 * Output:
 *  - assets/previews/og-cover-v2.png  (1200x630)
 *
 * Run:
 *   node scripts/make-og.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();

const OUT_PATH = path.join(ROOT, "assets", "previews", "og-cover-v2.png");
const PREV_DIR = path.dirname(OUT_PATH);

const LOGO_SVG = path.join(ROOT, "assets", "logos", "Logo-Renewt3ch.svg");
const ICON_SVG = path.join(ROOT, "assets", "logos", "r3-icon-gradient.svg"); // optional

const W = 1200;
const H = 630;

function svgBg() {
  // Deep navy base + subtle teal/blue glow + soft vignette + HUD lines.
  // Keep it readable: center area is slightly lifted.
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07101a"/>
      <stop offset="0.55" stop-color="#071a25"/>
      <stop offset="1" stop-color="#061015"/>
    </linearGradient>

    <radialGradient id="glowA" cx="78%" cy="44%" r="65%">
      <stop offset="0" stop-color="#2ff3e0" stop-opacity="0.22"/>
      <stop offset="0.45" stop-color="#2ff3e0" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#2ff3e0" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="glowB" cx="22%" cy="32%" r="70%">
      <stop offset="0" stop-color="#0c85ff" stop-opacity="0.20"/>
      <stop offset="0.45" stop-color="#0c85ff" stop-opacity="0.09"/>
      <stop offset="1" stop-color="#0c85ff" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="lift" cx="50%" cy="50%" r="60%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.07"/>
      <stop offset="0.45" stop-color="#ffffff" stop-opacity="0.035"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="hud" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2ff3e0" stop-opacity="0.65"/>
      <stop offset="0.5" stop-color="#7cf5c1" stop-opacity="0.70"/>
      <stop offset="1" stop-color="#0c85ff" stop-opacity="0.65"/>
    </linearGradient>

    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" />
    </filter>

    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.06 0"/>
    </filter>

    <linearGradient id="vign" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.35"/>
      <stop offset="0.35" stop-color="#000" stop-opacity="0.08"/>
      <stop offset="0.75" stop-color="#000" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.40"/>
    </linearGradient>
  </defs>

  <!-- base -->
  <rect width="${W}" height="${H}" fill="url(#base)"/>

  <!-- glows -->
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#lift)"/>

  <!-- subtle HUD frame -->
  <g opacity="0.75">
    <rect x="160" y="120" width="880" height="390" rx="28" fill="none" stroke="url(#hud)" stroke-width="2.2"/>
    <rect x="178" y="138" width="844" height="354" rx="24" fill="none" stroke="url(#hud)" stroke-width="1.2" opacity="0.55"/>
    <rect x="190" y="150" width="820" height="330" rx="22" fill="#0a1520" opacity="0.25"/>
  </g>

  <!-- side ticks -->
  <g stroke="url(#hud)" stroke-width="2" opacity="0.55">
    <line x1="110" y1="210" x2="110" y2="420"/>
    <line x1="1090" y1="195" x2="1090" y2="435"/>
  </g>

  <!-- grain + vignette -->
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.85"/>
  <rect width="${W}" height="${H}" fill="url(#vign)"/>
</svg>`);
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  await fs.mkdir(PREV_DIR, { recursive: true });

  if (!(await exists(LOGO_SVG))) {
    console.error(`[error] Missing logo SVG: ${LOGO_SVG}`);
    process.exit(1);
  }

  const bg = await sharp(svgBg()).png().toBuffer();

  // Render wordmark SVG crisp
  const logo = await sharp(LOGO_SVG, { density: 300 })
    .resize({ width: 860, withoutEnlargement: true })
    .png()
    .toBuffer();

  // Optional icon (top-left)
  let icon = null;
  if (await exists(ICON_SVG)) {
    icon = await sharp(ICON_SVG, { density: 300 })
      .resize({ width: 92 })
      .png()
      .toBuffer();
  }

  // Shadow behind logo for pop (still clean)
  const logoShadow = await sharp(logo)
    .blur(12)
    .modulate({ brightness: 0.55 })
    .tint({ r: 0, g: 0, b: 0 })
    .png()
    .toBuffer();

  const composites = [];

  // shadow (slight offset)
  composites.push({ input: logoShadow, left: Math.round((W - 860) / 2) + 10, top: 270 + 10, blend: "over" });

  // logo centered
  composites.push({ input: logo, left: Math.round((W - 860) / 2), top: 270, blend: "over" });

  // icon top-left inside frame
  if (icon) {
    composites.push({ input: icon, left: 185, top: 145, blend: "over" });
  }

  await sharp(bg)
    .composite(composites)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(OUT_PATH);

  console.log(`[ok] Wrote ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});