/* =========================================================
   FILE: scripts/customize.mjs
   renewt3ch · Customizer (deploy-anywhere)
   - Updates site-meta.json (baseUrl, palette)
   - Patches CSS tokens in assets/css/main.css
   Usage:
     node scripts/customize.mjs --base https://www.renewt3ch.com
     node scripts/customize.mjs --base https://example.com --name "Example" --desc "..." \
       --blue #0C85FF --aqua #2FF3E0 --bg #111111 --bgElev #151515 --slate #222222 --fg #FFFFFF
   ========================================================= */
   import { readFileSync, writeFileSync, existsSync } from "node:fs";
   import { join } from "node:path";
   
   const ROOT = process.cwd();
   const META_PATH = join(ROOT, "site-meta.json");
   const CSS_PATH = join(ROOT, "assets/css/main.css");
   
   function parseArgs(argv) {
     const out = {};
     for (let i = 0; i < argv.length; i++) {
       const a = argv[i];
       if (!a.startsWith("--")) continue;
       const key = a.slice(2);
       const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
       out[key] = val;
     }
     return out;
   }
   
   function stripTrailingSlash(u) {
     return String(u || "").replace(/\/+$/, "");
   }
   
   function isHex(c) {
     return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(c || ""));
   }
   
   function loadMeta() {
     if (!existsSync(META_PATH)) {
       return {
         siteName: "Renewt3ch",
         baseUrl: "",
         description: "",
         ogImagePath: "/assets/previews/og-cover-v2.png",
         brand: {
           blue: "#0C85FF",
           aqua: "#2FF3E0",
           bg: "#111111",
           bgElev: "#151515",
           slate: "#222222",
           fg: "#FFFFFF"
         },
         pages: []
       };
     }
     return JSON.parse(readFileSync(META_PATH, "utf8"));
   }
   
   function saveMeta(meta) {
     writeFileSync(META_PATH, JSON.stringify(meta, null, 2) + "\n");
     console.log(`[ok] updated ${META_PATH}`);
   }
   
   function patchCssTokens(cssText, brand) {
     const replacements = [
       ["--blue", brand.blue],
       ["--aqua", brand.aqua],
       ["--black", brand.bg],      // if you use --black token
       ["--graphite", brand.bgElev], // if you use --graphite token
       ["--slate", brand.slate],
       ["--fg", brand.fg]
     ];
   
     let out = cssText;
   
     for (const [token, value] of replacements) {
       if (!value || !isHex(value)) continue;
   
       // Replace: --token: ...;
       const re = new RegExp(`(${token}\\s*:\\s*)([^;]+)(;)`, "g");
       out = out.replace(re, `$1${value}$3`);
     }
   
     return out;
   }
   
   function main() {
     const args = parseArgs(process.argv.slice(2));
     const meta = loadMeta();
   
     if (args.base) meta.baseUrl = stripTrailingSlash(args.base);
     if (args.name) meta.siteName = String(args.name);
     if (args.desc) meta.description = String(args.desc);
   
     meta.brand = meta.brand || {};
     const brandKeys = ["blue", "aqua", "bg", "bgElev", "slate", "fg"];
     for (const k of brandKeys) {
       if (args[k] && isHex(args[k])) meta.brand[k] = args[k];
     }
   
     saveMeta(meta);
   
     if (!existsSync(CSS_PATH)) {
       console.warn(`[warn] CSS not found at ${CSS_PATH} (skipping token patch)`);
       return;
     }
   
     const css = readFileSync(CSS_PATH, "utf8");
     const patched = patchCssTokens(css, meta.brand);
   
     if (patched !== css) {
       writeFileSync(CSS_PATH, patched);
       console.log(`[ok] patched tokens in ${CSS_PATH}`);
     } else {
       console.log(`[ok] no CSS token changes needed`);
     }
   
     console.log("\nNext recommended:");
     console.log("  node scripts/generate-seo.mjs");
     console.log("  node scripts/inject-head.mjs   (if you use head injection)");
   }
   
   main();