/* =========================================================
   FILE: scripts/patch-package.mjs
   Run once:
     node scripts/patch-package.mjs
   ========================================================= */
   import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
   import { join } from "node:path";
   
   const root = process.cwd();
   const pkgPath = join(root, "package.json");
   
   mkdirSync(join(root, "scripts"), { recursive: true });
   
   let pkg = {};
   if (existsSync(pkgPath)) {
     pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
   } else {
     pkg = { name: "renewt3ch-site", version: "1.0.0", private: true };
   }
   
   pkg.type = "module";
   pkg.scripts = pkg.scripts || {};
   
   // Keep existing scripts; add/overwrite only these:
   pkg.scripts["zip"] = "node scripts/make-zip.mjs --mode delivery --manifest";
   pkg.scripts["zip:pure"] = "node scripts/make-zip.mjs --mode demo";
   pkg.scripts["package"] = "npm run inject:head && npm run zip && npm run zip:pure";
   
   writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
   console.log("[ok] package.json updated with: zip, zip:pure, package");