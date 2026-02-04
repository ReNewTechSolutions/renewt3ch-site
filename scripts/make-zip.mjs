/* =========================================================
   FILE: scripts/make-zip.mjs
   Usage:
     npm run zip
     npm run zip:pure
     node scripts/make-zip.mjs --mode delivery --manifest
     node scripts/make-zip.mjs --mode demo

   Notes:
   - Uses system `zip` (macOS/Linux). On Windows, use WSL or install zip.
   ========================================================= */
   import { spawnSync } from "node:child_process";
   import { createHash } from "node:crypto";
   import { mkdirSync, readdirSync, readFileSync, statSync, existsSync, writeFileSync } from "node:fs";
   import { join, relative } from "node:path";
   
   function parseArgs(argv) {
     const args = new Set(argv);
     const get = (name, fallback) => {
       const i = argv.indexOf(name);
       if (i === -1) return fallback;
       return argv[i + 1] ?? fallback;
     };
     return {
       mode: get("--mode", "delivery"), // delivery | demo
       manifest: args.has("--manifest"),
     };
   }
   
   function ensureZipAvailable() {
     const r = spawnSync("zip", ["-v"], { stdio: "ignore" });
     if (r.error || r.status !== 0) {
       console.error(
         "zip command not found. On macOS it should exist.\n" +
           "If not, install it (brew): brew install zip"
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
   
     const always = [
       ".git/",
       "node_modules/",
       "dist/",
       ".vercel/",
       ".netlify/",
       "flippa-assets/",
       ".DS_Store",
       "Thumbs.db",
     ];
   
     for (const x of always) {
       if (x.endsWith("/") ? p.startsWith(x) : p.endsWith(x)) return true;
     }
   
     // never ship zips inside zips
     if (p.endsWith(".zip")) return true;
   
     // demo-safe mode: exclude buyer-only tooling/docs if you want
     if (mode === "demo") {
       if (p.startsWith("docs/")) return true;
       if (p.startsWith("scripts/")) return true;
       if (p === "package.json") return true;
       if (p === "site-meta.json") return true;
       if (p === "head.template.html") return true;
     }
   
     return false;
   }
   
   function sha256File(filePath) {
     const buf = readFileSync(filePath);
     return createHash("sha256").update(buf).digest("hex");
   }
   
   function runZip(zipPath, files, cwd) {
     // zip wants paths relative to cwd
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
   
     const zipName =
       mode === "demo" ? "renewt3ch-demo.zip" : "renewt3ch-site.zip";
     const zipPath = join(distDir, zipName);
   
     const all = walkFiles(root);
     const included = [];
   
     for (const abs of all) {
       const rel = relative(root, abs);
       if (!rel || rel.startsWith("..")) continue;
       if (shouldExclude(rel, mode)) continue;
       included.push(rel.replaceAll("\\", "/"));
     }
   
     // Build the zip
     if (existsSync(zipPath)) {
       // remove old zip by overwriting via zip itself (zip updates in place; easiest is delete)
       // but to avoid fs.unlink for permissions, write a fresh name if needed
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