# Renewt3ch — Flippa Selling Kit (SELLING.md)

Use this file to list, demo, and hand off the Renewt3ch brand + site.

- Product: **Futuristic brand kit + 5-page static site**
- Tech: HTML / CSS / JS (no backend)
- Fonts: Poppins, Inter, Space Grotesk (SIL OFL 1.1)
- Live demo (optional): deploy instructions below
- Brand guide: `brand-guide/brand-guide.html`

---

## 1) Pre-Listing Checklist

**Code & Assets**
- [ ] All pages load: `index.html`, `about.html`, `features.html`, `pricing.html`, `contact.html`
- [ ] CSS/JS paths correct: `assets/css/main.css`, `assets/js/main.js`
- [ ] Fonts present: `assets/fonts/{inter,poppins,space-grotesk}/*.woff2`
- [ ] Logos present: `assets/logos/*.svg`
- [ ] Favicons present: `assets/favicons/*` and `<head>` tags in each page
- [ ] Brand guide opens: `brand-guide/brand-guide.html`
- [ ] Preview HTMLs open: `assets/previews/preview-*.html`
- [ ] Contact form is clearly **static** (no backend) and copy mentions this

**Polish**
- [ ] Page titles + meta descriptions are set
- [ ] Buttons + hover states feel snappy
- [ ] Mobile nav opens/closes (hamburger)
- [ ] No console errors in DevTools
- [ ] Lighthouse run ≥ 90 Performance / Best Practices (nice-to-have)

**Handoff**
- [ ] `README_SITE.md` (quick start) present at project root
- [ ] This `SELLING.md` complete
- [ ] `LICENSES` folder includes OFL text for fonts (or link in README)
- [ ] Zip created: `renewt3ch-site-v1.0.zip` (structure below)

---

## 2) What’s Included (copy/paste for listing)

- **Brand kit**: logo suite (gradient + mono), wordmarks, R³ icon  
- **Color system**: tokens + palette PNG  
- **Typography**: Poppins / Inter / Space Grotesk (OFL)  
- **Favicons**: SVG/PNG + manifest  
- **5-page website**: Home, About, Features, Pricing, Contact  
- **Glass & neon UI**: responsive, grid/flex, hamburger nav  
- **HTML brand guide** that prints to PDF  
- **Source files**: clean, commented static code, easy to edit  
- **Delivery**: a single zip, ready to upload to any static host

---

## 3) Recommended Screenshot Set

Create a tidy, consistent set at **1600×900** (desktop) and **390×844** (mobile).  
Name them with numbers to control order.

**Desktop (1600×900)**
1. `01-home-hero-desktop.png` — Hero with gradient R³ + headline + CTAs  
2. `02-home-features-desktop.png` — Feature cards (glass)  
3. `03-home-logos-desktop.png` — Logo showcase band  
4. `04-pricing-desktop.png` — Three pricing cards (mark “Most Popular”)  
5. `05-about-desktop.png` — Mission + image / timeline  
6. `06-features-desktop.png` — Feature grid details  
7. `07-contact-desktop.png` — Form with glow inputs  
8. `08-brand-guide-desktop.png` — `brand-guide.html` top section  
9. `09-color-palette-desktop.png` — `assets/colors/palette.png` inside guide  
10. `10-code-tokens-desktop.png` — Snip of `assets/css/main.css` tokens  
11. `11-lighthouse-desktop.png` — Lighthouse summary (optional)  
12. `12-assets-tree-desktop.png` — Folder tree in VS Code (optional)

**Mobile (390×844)**
13. `m01-home-hero.png`  
14. `m02-nav-open.png` (hamburger)  
15. `m03-pricing.png`

> Tip: In Chrome, open DevTools → “Toggle device toolbar” → select **iPhone 12/13** → set zoom 100% → capture.

---

## 4) 60–90s Walkthrough Video Script (Loom)

**00–05s** — Title card: “Renewt3ch — Futuristic Brand + 5-page website”  
**05–25s** — Home hero: explain the positioning + neon/glass design  
**25–40s** — Feature cards + logo band  
**40–55s** — Pricing page (tiers + CTAs)  
**55–70s** — Brand guide (logos, palette, type) and previews  
**70–85s** — File structure, how to customize tokens (main.css)  
**85–90s** — Deploy in 1 minute (Netlify/Vercel), support note, thanks

---

## 5) Demo Hosting (optional but recommended)

**Netlify (drag & drop)**
1. Zip the site folder contents (see structure below).  
2. Netlify → “Add new site” → “Deploy manually” → drag the zip or folder.  
3. Set **Publish directory** to project root (it’s all static).  
4. Test pages + nav. Share the `.netlify.app` URL in the listing.

**Vercel (CLI or dashboard)**
1. Import project → Framework = “Other” (Static).  
2. Build command: none; Output: `/` (root).  
3. Deploy. Share preview URL.

---

## 6) Zip to Deliver (structure)

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
│  │  ├─ wordmark-{pure-white,black}.svg
│  │  └─ README.md
│  ├─ favicons/
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
├─ README_SITE.md
└─ SELLING.md  ← this file
```
---

## Optional Hosting & Setup (Webflow Add-Ons)

Want it hosted for you? Choose one of these add-ons:

### 1) Webflow Lite Hosting — Monthly
I host the project in my Webflow account and connect your domain.
- **Includes:** DNS guidance, SSL, CDN, Webflow Editor access, basic updates (text/images) in the first week
- **You provide:** Domain registrar login or DNS records
- **Cancel anytime:** You can transfer the project to your own Webflow account later

### 2) Webflow Transfer Setup — One-Time
I stage the site, connect your domain, and transfer the project to **your** Webflow account.
- **Includes:** One domain setup, DNS guidance, Editor enablement, final QA
- **Deliverable:** Project in your Webflow workspace with billing owned by you

> **Support is email-only** (timezone-friendly). I respond within one business day.  
> Ultimate Package buyers get priority inbox for launch week.

#### What I Need From You
- Your **brand name** (if changing), domain registrar, and preferred domain (e.g., `yourbrand.com`)
- DNS access (or the ability to add A/CNAME records)
- A contact email to set as default on the site