<!-- FILE: docs/CHECKLIST.md -->

# Checklist

## Pre-listing (public demo safe)
- [ ] Demo site has **no ZIP download links** exposed publicly
- [ ] No private credentials or keys in repo
- [ ] All pages load:
  - [ ] Home
  - [ ] About
  - [ ] Features
  - [ ] Pricing
  - [ ] Contact
  - [ ] Style Guide
  - [ ] Brand Guide (if included)
- [ ] OG image exists: `/assets/previews/og-cover.png`
- [ ] `site-meta.json` `site.baseUrl` matches demo URL
- [ ] Ran `npm run inject:head` after setting baseUrl

Quick check for ZIP links:
```bash
grep -R --line-number -i "\.zip" *.html