<!-- FILE: docs/DELIVERY.md -->

# Delivery

This doc outlines what the buyer receives, what’s inside the ZIP, and the recommended handoff flow for hosting + domain.

## What the buyer receives

1) **Delivery ZIP** (example: `renewt3ch-site.zip`)
2) **Documentation** inside the ZIP (`/docs`)
3) Optional: **deployment support** (Vercel) and/or **domain transfer + DNS coordination**

> Tip: Keep the public-facing deliverable as “ZIP Only,” with support offered separately if you choose.

## What’s inside the Delivery ZIP

Required:

- **HTML pages** (root)
  - `index.html`, `about.html`, `features.html`, `pricing.html`, `contact.html`, `style-guide.html`, etc.
- **Clean URL folders (recommended for compatibility)**
  - `about/index.html`, `features/index.html`, `pricing/index.html`, `contact/index.html`, `style-guide/index.html`
- **assets/**
  - `assets/css/` (main styles)
  - `assets/js/` (navigation/menu script)
  - `assets/fonts/` (Inter / Poppins / Space Grotesk + OFL files)
  - `assets/logos/` (SVG logo set)
  - `assets/favicon/` (svg/ico/png + manifest)
  - `assets/previews/` (OG image, previews)
- **brand-guide/** (if included)
  - `brand-guide.html` + any supporting assets
- **docs/** (this folder)
- **scripts/** + `package.json`
  - build helpers (head injection, zip generation, etc.)
- **Head/meta sources**
  - `site-meta.json`
  - `head.template.html`

## Hosting handoff (Vercel)

Preferred:

- Buyer deploys from the ZIP contents (or their own repo import) using:
  - `docs/QUICKSTART.md`

Alternate:

- Transfer the existing Vercel project to the buyer (only if agreed).

## Domain handoff (IONOS)

If the buyer is taking over the domain and DNS:

- Follow: `docs/DOMAIN-HANDOFF_IONOS.md`
- DNS reference: `docs/IONOS-DNS-RECORDS.md`

## Suggested delivery message (copy/paste)

- “Here’s the delivery ZIP. Start here: `docs/README.md`.”
- “Deploy steps: `docs/QUICKSTART.md`.”
- “Domain transfer steps (if needed): `docs/DOMAIN-HANDOFF_IONOS.md`.”
- “DNS reference: `docs/IONOS-DNS-RECORDS.md`.”

## Buyer verification checklist

- Site loads on the buyer’s URL (home + internal pages)
- Navigation works (desktop + mobile)
- HTTPS/SSL is active
- Favicons show in the browser tab
- OG preview renders correctly (Facebook/Twitter/Slack share card shows the OG cover)
- No broken asset links (CSS/JS/fonts/logos load)