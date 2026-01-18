# README_SITE.md — Buyer Quick Start

A clean, static website + brand kit. No build steps, no backend. Just upload and go.

## What’s Inside

```text
renewt3ch-site/
├─ index.html
├─ about.html
├─ features.html
├─ pricing.html
├─ contact.html
├─ brand-guide/
│  └─ brand-guide.html
├─ assets/
│  ├─ css/
│  │  └─ main.css
│  ├─ js/
│  │  └─ main.js
│  ├─ logos/
│  │  ├─ Logo-Renewt3ch.svg
│  │  ├─ r3-icon-{gradient,white,black}.svg
│  │  └─ wordmark-{pure-white,black}.svg
│  ├─ favicon/                 # favicons live here (singular: favicon)
│  │  ├─ favicon.svg
│  │  ├─ favicon.ico
│  │  ├─ favicon-96x96.png
│  │  ├─ favicon-192x192.png
│  │  ├─ favicon-512x512.png
│  │  └─ site.webmanifest
│  ├─ fonts/
│  │  ├─ inter/Inter-Variable.woff2
│  │  ├─ poppins/Poppins-Variable.woff2
│  │  └─ space-grotesk/SpaceGrotesk-Variable.woff2
│  ├─ colors/
│  │  └─ palette.png
│  └─ previews/
│     ├─ preview-inter.html
│     ├─ preview-poppins.html
│     └─ preview-space-grotesk.html
└─ SELLING.md
```

---

### Section 3 — Quick start (local)

## 1) Quick Start (Local)

1. Open `index.html` in your browser (or use VS Code **Live Server**).
2. Edit copy in the page HTMLs.
3. Tweak styles in `assets/css/main.css`.
4. Minor interactions (menu etc.) in `assets/js/main.js`.


## 2) Customize Visuals

### Brand tokens (colors, type, buttons)
Open `assets/css/main.css` → **Tokens**:
- Backgrounds: `--color-bg`, `--color-bg-elevated`
- Text: `--color-fg`, `--color-fg-muted`
- Accents/CTAs: `--color-accent`, `--color-accent-2`
- Fonts: **Poppins** (display) and **Inter** (UI)

Buttons:
- Primary: `.btn`
- Secondary: `.btn--alt`
- Gradient CTA: `.btn--grad`

### Swap logos
Replace files in `assets/logos/` (keep filenames), or update `<img src>` paths where used (hero + logo band).

## 3) Favicons (add to each page `<head>`)

```html
<link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg">
<link rel="alternate icon" type="image/x-icon" href="/assets/favicon/favicon.ico">
<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/favicon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<meta name="theme-color" content="#0D0D0D">
```

---

### Section 6 — Deploy (Netlify / Vercel)

## 4) Deploy (No Build Required)

### Netlify (drag & drop)
1. Zip the site folder or drag the folder into Netlify → **Deploy manually**.  
2. Publish directory = project root.  
3. Test pages + nav → share the `*.netlify.app` URL.

### Vercel
1. Import → Framework: **Other (Static)**.  
2. Build command: _(none)_ · Output directory: `/`.  
3. Deploy → share preview URL.

## 5) Connect a Domain

1. Add your domain in Netlify or Vercel.  
2. Copy the **DNS records** they provide.  
3. Paste them at your registrar (DNS settings).  
4. Save. It typically resolves within minutes.

## 6) Forms (Static by default)

The Contact form is static. To receive emails, plug in a service:
- **Formspree**, **Basin**, **Getform**, or **Netlify Forms** (if hosting on Netlify)

**Example (Formspree):**
```html
<form action="https://formspree.io/f/your-id" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button class="btn">Send</button>
</form>
```
---

### Section 9 — Brand guide & previews

## 7) Brand Guide & Previews

- Brand guide: `brand-guide/brand-guide.html`  
- Color palette: `assets/colors/palette.png`  
- Live font previews: `assets/previews/preview-*.html`

> From inside `brand-guide/brand-guide.html`, assets are one level up: `../assets/...`

## 8) Accessibility & Performance

- Contrast meets WCAG AA defaults.  
- Static pages = fast.  
- Optional: run **Lighthouse** in Chrome DevTools (aim 90+).

## 9) Troubleshooting

**Images not showing?**  
- Check exact filenames + case sensitivity.  
- Verify relative paths from each HTML’s location (e.g., `/brand-guide/` needs `../assets/...`).

**Fonts not loading?**  
Ensure these files exist:
assets/fonts/inter/Inter-Variable.woff2
assets/fonts/poppins/Poppins-Variable.woff2
assets/fonts/space-grotesk/SpaceGrotesk-Variable.woff2

And `assets/css/main.css` points to them.

**Favicon missing?**  
- Confirm the head links point to `assets/favicon/`.

## 10) Editing Copy (Where)

- **Hero**: `index.html` → `<h1>`, `.lede`, CTA labels  
- **About**: `about.html` → mission/philosophy/timeline blocks  
- **Features**: `features.html` → card titles + descriptions  
- **Pricing**: `pricing.html` → tier names, prices, bullets  
- **Contact**: `contact.html` → form labels + footer/email

## 11) License

- Fonts: **SIL Open Font License 1.1 (OFL)**  
- Custom logos/graphics: licensed for your use as provided

## 12) Support (Email-Only Option)

Prefer email-only install? That’s supported.

**Send via email:**
- Your Netlify/Vercel account email (for collaborator invite)  
- Your domain + registrar (for DNS steps)  
- Preferred site URL (e.g., `www.yourdomain.com`)

**You’ll receive:**
- A preview URL and confirmation the site is live  
- DNS records to paste at your registrar  
- A short summary of what was changed

_No meetings required; all async via email._