/* =========================================================
   FILE: scripts/fix-asset-paths.mjs
   Usage:
     node scripts/fix-asset-paths.mjs

   Why:
     Pages inside subfolders (e.g. brand-guide/brand-guide.html) will break
     relative asset URLs like "assets/..." on Vercel.

   What it does:
     Converts:
       src|href|poster="assets/..."   -> "/assets/..."
       src|href|poster='./assets/...' -> "/assets/..."
       src|href|poster="../assets/..."-> "/assets/..."
     across ALL .html files in the project.
   ========================================================= */

   import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
   import { extname, join } from "node:path";
   
   const ROOT = process.cwd();
   
   function walk(dir) {
     const entries = readdirSync(dir, { withFileTypes: true });
     const out = [];
     for (const e of entries) {
       const p = join(dir, e.name);
       if (e.isDirectory()) out.push(...walk(p));
       else out.push(p);
     }
     return out;
   }
   
   function fixHtml(filePath) {
     const before = readFileSync(filePath, "utf8");
     let after = before;
   
     // 1) src/href/poster="assets/..."
     after = after.replace(
       /(src|href|poster)=("|\')assets\//gi,
       (_m, attr, q) => `${attr}=${q}/assets/`
     );
   
     // 2) src/href/poster="./assets/..."
     after = after.replace(
       /(src|href|poster)=("|\')\.\/assets\//gi,
       (_m, attr, q) => `${attr}=${q}/assets/`
     );
   
     // 3) src/href/poster="../assets/..." (any depth)
     after = after.replace(
       /(src|href|poster)=("|\')(\.\.\/)+assets\//gi,
       (_m, attr, q) => `${attr}=${q}/assets/`
     );
   
     if (after !== before) {
       writeFileSync(filePath, after, "utf8");
       return true;
     }
     return false;
   }
   
   const htmlFiles = walk(ROOT).filter(
     (p) => extname(p).toLowerCase() === ".html"
   );
   
   let changed = 0;
   for (const f of htmlFiles) {
     // skip node_modules or .git if somehow present
     if (f.includes(`${join(ROOT, "node_modules")}`)) continue;
     if (f.includes(`${join(ROOT, ".git")}`)) continue;
     if (fixHtml(f)) changed++;
   }
   
   console.log(`[ok] updated ${changed} html file(s)`);