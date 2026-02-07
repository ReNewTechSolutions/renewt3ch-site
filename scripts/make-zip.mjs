#!/usr/bin/env node
/**
 * FILE: scripts/make-zip.mjs
 *
 * Usage:
 *   npm run zip
 *   npm run zip:pure
 *   node scripts/make-zip.mjs --mode delivery --manifest
 *   node scripts/make-zip.mjs --mode demo
 *
 * Notes:
 * - Uses system `zip` (macOS/Linux). On Windows: use WSL or install zip.
 * - Produces:
 *    dist/renewt3ch-site.zip  (delivery)
 *    dist/renewt3ch-demo.zip  (demo-safe)
 * - Optional:
 *    dist/manifest.json       (sha256 list)
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  existsSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { join, relative } from "node:path";

function parseArgs(argv) {
  const args = new Set(argv);
  const get = (name, fallback) => {
    const i = argv.indexOf(name);
    if (i === -1) return fallback;
    return argv[i + 1] ?? fallback;
  };
  const mode = get("--mode", "delivery"); // delivery | demo

  if (!["delivery", "demo"].includes(mode)) {
    console.error(`[err] invalid --mode "${mode}" (use "delivery" or "demo")`);
    process.exit(1);
  }

  return {
    mode,
    manifest: args.has("--manifest"),
  };
}

function ensureZipAvailable() {
  const r = spawnSync("zip", ["-v"], { stdio: "ignore" });
  if (r.error || r.status !== 0) {
    console.error(
      "zip command not found.\n" +
        "macOS: usually included.\n" +
        "Homebrew: brew install zip\n" +
        "Windows: use WSL or install zip."
    );
    process.exit(1);
  }
}

function walkFiles(rootDir) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (st.isFile()) out.push(p);
    }
  };
  walk(rootDir);
  return out;
}

function shouldExclude(relPath, mode) {
  const p = relPath.replaceAll("\\", "/");

  // Always exclude (both modes)
  const alwaysDirs = [".git/", "node_modules/", "dist/", ".vercel/", ".netlify/"];
  for (const d of alwaysDirs) if (p.startsWith(d)) return true;

  const alwaysFiles = [".DS_Store", "Thumbs.db"];
  for (const f of alwaysFiles) if (p.endsWith(f)) return true;

  // Never ship zips inside zips
  if (p.endsWith(".zip")) return true;

  // Optional: exclude source maps if you ever generate them
  // if (p.endsWith(".map")) return true;

  // Demo-safe mode: exclude buyer-only docs/tooling
  if (mode === "demo") {
    if (p.startsWith("docs/")) return true;
    if (p.startsWith("scripts/")) return true;

    // project/meta files that make cloning/replicating easier
    if (p === "package.json") return true;
    if (p === "package-lock.json") return true;
    if (p === "site-meta.json") return true;
    if (p === "head.template.html") return true;

    // If you want brand guide buyer-only, uncomment:
    // if (p.startsWith("brand-guide/")) return true;
  }

  return false;
}

function sha256File(filePath) {
  const buf = readFileSync(filePath);
  return createHash("sha256").update(buf).digest("hex");
}

function runZip(zipPath, files, cwd) {
  // zip wants file paths relative to cwd
  const args = ["-r", "-q", zipPath, ...files];
  const r = spawnSync("zip", args, { cwd, stdio: "inherit" });
  if (r.error || r.status !== 0) {
    console.error("[err] zip failed");
    process.exit(r.status || 1);
  }
}

function main() {
  const { mode, manifest } = parseArgs(process.argv.slice(2));
  ensureZipAvailable();

  const root = process.cwd();
  const distDir = join(root, "dist");
  mkdirSync(distDir, { recursive: true });

  const zipName = mode === "demo" ? "renewt3ch-demo.zip" : "renewt3ch-site.zip";
  const zipPath = join(distDir, zipName);

  // Important: delete old zip so removed files don't linger
  if (existsSync(zipPath)) rmSync(zipPath);

  const all = walkFiles(root);
  const included = [];

  for (const abs of all) {
    const rel = relative(root, abs);
    if (!rel || rel.startsWith("..")) continue;
    if (shouldExclude(rel, mode)) continue;
    included.push(rel.replaceAll("\\", "/"));
  }

  runZip(zipPath, included, root);

  console.log(`[ok] ${zipName}`);
  console.log(`[ok] files: ${included.length}`);

  if (manifest) {
    const manifestPath = join(distDir, "manifest.json");
    const list = included.map((p) => ({
      path: p,
      sha256: sha256File(join(root, p)),
    }));

    const payload = {
      name: zipName,
      mode,
      generatedAt: new Date().toISOString(),
      fileCount: list.length,
      files: list,
    };

    writeFileSync(manifestPath, JSON.stringify(payload, null, 2) + "\n");
    console.log("[ok] dist/manifest.json");
  }

  console.log("\nNext:");
  console.log("  ls -la dist");
}

main();