#!/usr/bin/env node
/**
 * inject-head.mjs
 *
 * Replaces <head>...</head> in each HTML file using head.template.html + site-meta.json.
 *
 * Usage:
 *   npm run inject:head
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = resolve(__dirname, "..");
const templatePath = resolve(root, "head.template.html");
const metaPath = resolve(root, "site-meta.json");

const HEAD_RE = /<head\b[^>]*>[\s\S]*?<\/head>/i;

function render(template, vars) {
  return template
    .replaceAll("{{title}}", vars.title)
    .replaceAll("{{description}}", vars.description)
    .replaceAll("{{ogUrl}}", vars.ogUrl)
    .replaceAll("{{ogImage}}", vars.ogImage);
}

function ensureTrailingNewline(s) {
  return s.endsWith("\n") ? s : `${s}\n`;
}

function ogUrlFor(baseUrl, fileName, cleanUrls, stripIndex) {
  if (stripIndex && fileName.toLowerCase() === "index.html") return `${baseUrl}/`;

  if (!cleanUrls) return `${baseUrl}/${fileName}`;

  // about.html -> /about
  const noExt = fileName.replace(/\.html$/i, "");
  return `${baseUrl}/${noExt}`;
}

async function main() {
  const [templateRaw, metaRaw] = await Promise.all([
    readFile(templatePath, "utf8"),
    readFile(metaPath, "utf8"),
  ]);

  const meta = JSON.parse(metaRaw);
  const baseUrl = meta?.site?.baseUrl ?? "https://example.com";
  const ogImagePath = meta?.site?.ogImagePath ?? "/assets/previews/og-cover.png";
  const ogImage = `${baseUrl}${ogImagePath}`;

  const cleanUrls = Boolean(meta?.site?.cleanUrls);
  const stripIndex = meta?.site?.stripIndex !== false; // default true

  const pages = meta?.pages ?? {};
  const entries = Object.entries(pages);

  if (!entries.length) {
    console.error("No pages found in site-meta.json -> pages.");
    process.exit(1);
  }

  for (const [fileName, page] of entries) {
    const filePath = resolve(root, fileName);

    let html;
    try {
      html = await readFile(filePath, "utf8");
    } catch {
      console.warn(`[skip] Missing file: ${fileName}`);
      continue;
    }

    if (!HEAD_RE.test(html)) {
      console.warn(`[skip] No <head> block found in: ${fileName}`);
      continue;
    }

    const ogUrl = ogUrlFor(baseUrl, fileName, cleanUrls, stripIndex);

    const head = render(templateRaw, {
      title: page.title ?? "Renewt3ch",
      description: page.description ?? "",
      ogUrl,
      ogImage,
    });

    const out = html.replace(HEAD_RE, head);
    await writeFile(filePath, ensureTrailingNewline(out), "utf8");
    console.log(`[ok] ${fileName}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * =========================================================
 * FILE: scripts/inject-head.mjs (patch)
 * - Consistent canonical + og:url generation for Vercel
 * - Supports cleanUrls true/false from site-meta.json
 * =========================================================
 */

function toRoutePath(filename, cleanUrls) {
  if (filename === "index.html") return "/";
  if (!cleanUrls) return `/${filename}`;
  return `/${filename.replace(/\.html$/i, "")}`;
}

function joinUrl(baseUrl, path) {
  const b = String(baseUrl || "").replace(/\/+$/, "");
  const p = String(path || "").startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

// ...after you load site-meta.json into `meta` (or similar):
// const meta = JSON.parse(readFileSync("site-meta.json","utf8"));

const { site, pages } = meta;

// inside your per-file loop:
const cleanUrls = Boolean(site.cleanUrls);
const routePath = toRoutePath(filename, cleanUrls);

// Use this for <link rel="canonical"> and og:url
const canonicalUrl = joinUrl(site.baseUrl, routePath);

// Use this for og:image/twitter:image
const ogImageUrl = joinUrl(site.baseUrl, site.ogImagePath || "/assets/previews/og-cover.png");

// Then in your head template replacement variables:
// {{CANONICAL_URL}} -> canonicalUrl
// {{OG_URL}}        -> canonicalUrl
// {{OG_IMAGE}}      -> ogImageUrl
