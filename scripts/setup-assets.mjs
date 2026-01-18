/**
 * setup-assets.mjs
 * - Ensures assets/previews exists
 * - Copies og-cover.png into assets/previews/og-cover.png (if found)
 * - Validates favicon set required by head.template.html
 *
 * Usage:
 *   npm run setup:assets
 */
import { mkdir, access, copyFile } from "node:fs/promises";

const FAVICON_FILES = [
  "assets/favicon/favicon.svg",
  "assets/favicon/favicon.ico",
  "assets/favicon/favicon-96x96.png",
  "assets/favicon/favicon-192x192.png",
  "assets/favicon/favicon-512x512.png",
  "assets/favicon/apple-touch-icon.png",
  "assets/favicon/site.webmanifest",
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir("assets/previews", { recursive: true });

  // OG cover: copy if we can find it
  const destOg = "assets/previews/og-cover.png";
  const ogCandidates = [
    "og-cover.png",
    "../og-cover.png",
    "/Users/feliciagoad/Downloads/renewt3ch-site/og-cover.png",
  ];

  let ogCopied = false;
  for (const src of ogCandidates) {
    if (await exists(src)) {
      await copyFile(src, destOg);
      console.log(`[ok] OG cover copied: ${src} -> ${destOg}`);
      ogCopied = true;
      break;
    }
  }
  if (!ogCopied) {
    console.warn(`[warn] OG cover not found. Expected at: ${destOg}`);
  }

  // Favicons: validate
  const missing = [];
  for (const f of FAVICON_FILES) {
    if (!(await exists(f))) missing.push(f);
  }

  if (missing.length) {
    console.error("\n[error] Missing favicon files:");
    for (const f of missing) console.error(`  - ${f}`);
    console.error("\nFix: add these files under assets/favicon/ (per head.template.html).");
    process.exit(1);
  } else {
    console.log("[ok] Favicons present.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
