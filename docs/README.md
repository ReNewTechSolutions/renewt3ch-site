<!-- FILE: docs/README.md -->

# Renewt3ch — Docs (Start Here)

These docs cover previewing, deploying (Vercel recommended), customizing, and handing off the **Renewt3ch** domain + website bundle.

## What the buyer receives
- Fully built static website (HTML + CSS + JS)
  - Home, About, Features, Pricing, Contact, Style Guide
  - Brand Guide (HTML) if included (`brand-guide/`)
- `assets/` folder with:
  - CSS + JS
  - Logos, fonts, previews (OG image), favicons
- Lightweight, mobile responsive, SEO-friendly basics
- No backend required; deploy anywhere
- “Upload & Go” documentation (this folder)

## Quick start
1) Preview locally: `QUICKSTART.md`  
2) Customize: `CUSTOMIZE.md`  
3) Delivery/handoff: `DELIVERY.md` + `POST-SALE-CHECKLIST.md`

## Docs index
- `QUICKSTART.md` — preview + deploy (Vercel)
- `CUSTOMIZE.md` — edit copy, colors, logos, OG meta
- `CHECKLIST.md` — pre-listing + pre-delivery checks
- `DELIVERY.md` — what to deliver + how
- `POST-SALE-CHECKLIST.md` — post-sale handoff steps
- `WEBFLOW-HANDOFF.md` — optional Webflow mapping/rebuild
- `IONOS-DNS-RECORDS.md` — DNS record guidance
- `DOMAIN-HANDOFF_IONOS.md` — IONOS domain transfer/push
- `SCREENSHOTS.md` — screenshot checklist + filenames
- `SUPPORT-SCOPE.md` — optional support scope
- `MAINTENANCE-PRICING.md` — add-ons menu/pricing
- `FLIPPA-LISTING.md` — copy/paste listing draft

## Deploy options (quick table)
| Platform | Best for | How | Notes |
|---|---|---|---|
| Vercel | best demo + fastest Git deploy | import repo | Recommended |
| Netlify | simple static hosting | drag/drop or Git | Great alternative |
| Cloudflare Pages | global edge hosting | import repo | Strong performance |
| GitHub Pages | free basic hosting | gh-pages | Static-only, limited |

## Key rule for assets (prevents broken images)
Use **root-relative** asset paths everywhere:
- ✅ `/assets/css/main.css`
- ✅ `/assets/logos/...`
This matters for subfolder pages like `/brand-guide/brand-guide.html`.

If anything looks broken after deploy:
- run the fixer: `node scripts/fix-asset-paths.mjs`
- then re-run: `npm run inject:head`