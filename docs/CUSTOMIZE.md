<!-- FILE: docs/CUSTOMIZE.md -->

# Customize

## 1) Edit page content
Edit the HTML files directly:
- `index.html`
- `about.html`
- `features.html`
- `pricing.html`
- `contact.html`
- `style-guide.html`
- `selling.html` (if included)
- `brand-guide/brand-guide.html` (if included)

## 2) Customize design tokens
Edit:
- `/assets/css/main.css`

Look for `:root { ... }` and adjust:
- `--accent`, `--accent-2`
- background gradient/glow tokens
- typography scale tokens

## 3) Swap logos
Logos live in:
- `/assets/logos/`

Best practice: keep filenames the same so you don’t need to edit HTML.

## 4) Replace the OG image
Replace:
- `/assets/previews/og-cover.png`

Keep the same filename so OG tags keep working.

## 5) Update titles/descriptions/OG tags
Edit:
- `site-meta.json`

Then run:
```bash
npm run inject:head