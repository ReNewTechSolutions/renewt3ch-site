/* =========================================================
   FILE: scripts/generate-seo.mjs
   renewt3ch · SEO pack (deploy-anywhere)
   - Generates sitemap.xml + robots.txt at project root
   Usage:
     node scripts/generate-seo.mjs
   ========================================================= */
   import { readFileSync, writeFileSync, existsSync } from "node:fs";
   import { join } from "node:path";
   
   const ROOT = process.cwd();
   const META_PATH = join(ROOT, "site-meta.json");
   const SITEMAP_PATH = join(ROOT, "sitemap.xml");
   const ROBOTS_PATH = join(ROOT, "robots.txt");
   
   function stripTrailingSlash(u) {
     return String(u || "").replace(/\/+$/, "");
   }
   
   function escapeXml(s) {
     return String(s || "")
       .replaceAll("&", "&amp;")
       .replaceAll("<", "&lt;")
       .replaceAll(">", "&gt;")
       .replaceAll('"', "&quot;")
       .replaceAll("'", "&apos;");
   }
   
   function main() {
     if (!existsSync(META_PATH)) {
       console.error(`[err] site-meta.json not found. Run customize first.`);
       process.exit(1);
     }
   
     const meta = JSON.parse(readFileSync(META_PATH, "utf8"));
     const baseUrl = stripTrailingSlash(meta.baseUrl);
   
     if (!baseUrl.startsWith("http")) {
       console.error(`[err] site-meta.json baseUrl is missing/invalid. Set "baseUrl": "https://example.com"`);
       process.exit(1);
     }
   
     const pages = Array.isArray(meta.pages) ? meta.pages : [];
     const urls = pages
       .map((p) => (p && p.path ? String(p.path) : null))
       .filter(Boolean)
       .map((p) => (p.startsWith("/") ? p : `/${p}`));
   
     if (!urls.includes("/")) urls.unshift("/");
   
     const now = new Date().toISOString();
   
     const sitemap =
   `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${urls.map((p) => {
     const loc = `${baseUrl}${p}`;
     return `  <url>
       <loc>${escapeXml(loc)}</loc>
       <lastmod>${escapeXml(now)}</lastmod>
     </url>`;
   }).join("\n")}
   </urlset>
   `;
   
     const robots =
   `User-agent: *
   Allow: /
   
   Sitemap: ${baseUrl}/sitemap.xml
   `;
   
     writeFileSync(SITEMAP_PATH, sitemap);
     writeFileSync(ROBOTS_PATH, robots);
   
     console.log(`[ok] wrote ${SITEMAP_PATH}`);
     console.log(`[ok] wrote ${ROBOTS_PATH}`);
   }
   
   main();