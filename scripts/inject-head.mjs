#!/usr/bin/env node
/**
 * scripts/inject-head.mjs
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

function ensureTrailingNewline(s) {
  return s.endsWith("\n") ? s : `${s}\n`;
}

function joinUrl(baseUrl, path) {
  const b = String(baseUrl || "").replace(/\/+$/, "");
  const p = String(path || "").startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function routePathFor(fileName, cleanUrls, stripIndex) {
  const lower = String(fileName || "").toLowerCase();
  if (stripIndex && lower === "index.html") return "/";
  if (!cleanUrls) return `/${fileName}`;
  return `/${fileName.replace(/\.html$/i, "")}`;
}

function render(template, vars) {
  // Replace placeholders used in head.template.html
  return template
    .replaceAll("{{title}}", vars.title)
    .replaceAll("{{description}}", vars.description)
    .replaceAll("{{ogUrl}}", vars.ogUrl)
    .replaceAll("{{ogImage}}", vars.ogImage)
    .replaceAll("{{canonicalUrl}}", vars.canonicalUrl);
}

async function main() {
  const [templateRaw, metaRaw] = await Promise.all([
    readFile(templatePath, "utf8"),
    readFile(metaPath, "utf8"),
  ]);

  const meta = JSON.parse(metaRaw);

  const baseUrl =
    meta?.site?.baseUrl ??
    meta?.site?.url ??
    "https://example.com";

  const ogImagePath =
    meta?.site?.ogImagePath ?? "/assets/previews/og-cover.png";

  const cleanUrls = Boolean(meta?.site?.cleanUrls);
  const stripIndex = meta?.site?.stripIndex !== false; // default true

  const pages = meta?.pages ?? {};
  const entries = Object.entries(pages);

  if (!entries.length) {
    console.error("No pages found in site-meta.json -> pages.");
    process.exit(1);
  }

  const ogImage = joinUrl(baseUrl, ogImagePath);

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

    const routePath = routePathFor(fileName, cleanUrls, stripIndex);
    const canonicalUrl = joinUrl(baseUrl, routePath);

    const head = render(templateRaw, {
      title: page.title ?? meta?.site?.name ?? "Renewt3ch",
      description: page.description ?? "",
      ogUrl: canonicalUrl,
      canonicalUrl,
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