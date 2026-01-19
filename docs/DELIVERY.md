<!-- FILE: docs/DELIVERY.md -->

# Delivery 

## Buyer receives
1) **Delivery ZIP** (name: `renewt3ch-delivery.zip`)
2) **Documentation folder** (`docs/`) included inside the ZIP
3) Optional: hosting assistance and/or domain transfer coordination

## Delivery ZIP contents
Must include:
- All HTML pages (root)
- `assets/` (css/js/fonts/logos/favicons/previews)
- `brand-guide/` (if included)
- `docs/` (this folder)
- `scripts/` + `package.json`
- `site-meta.json`, `head.template.html`

## Hosting handoff (Vercel)
Preferred approach:
- Buyer redeploys from the repo using `docs/QUICKSTART.md`

Alternate approach:
- Transfer Vercel project ownership to buyer

## Domain handoff (IONOS)
Follow:
- `docs/DOMAIN-HANDOFF_IONOS.md`

## Suggested delivery message
- “Here is the delivery zip and the docs entry point: `docs/README.md`.”
- “Deploy steps: `docs/QUICKSTART.md`”
- “Domain transfer steps: `docs/DOMAIN-HANDOFF_IONOS.md`”
- “DNS notes: `docs/IONOS-DNS-RECORDS.md`”

## Buyer verification checklist
- Site deployed at buyer URL
- DNS points correctly
- SSL active
- OG previews render (share preview shows OG cover)