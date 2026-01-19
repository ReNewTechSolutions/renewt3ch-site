<!-- FILE: docs/IONOS-DNS-RECORDS.md -->

# IONOS DNS Records (Guide)

This is a quick reference for common DNS setups after purchase.

## Where to edit DNS
IONOS → Domains & SSL → (your domain) → DNS

## If hosting on Vercel (recommended)
Vercel will display the exact records to add for:
- root/apex domain (example.com)
- www subdomain (www.example.com)

Common patterns (verify inside Vercel):
- A record for apex
- CNAME for www

## If hosting on Netlify
Netlify provides:
- A records for apex
- CNAME for www

## If hosting on Cloudflare Pages
Cloudflare provides:
- CNAMEs (including apex via flattening)

## If hosting on GitHub Pages
GitHub Pages provides:
- A records (apex)
- CNAME (www)

## TTL (recommended for cutover)
- Set TTL to **300** during cutover
- After stable, increase if desired

## Cutover checklist
- [ ] Host is deployed and working
- [ ] Domain is added in host dashboard
- [ ] DNS records updated in IONOS
- [ ] SSL issued and active
- [ ] Both apex + www resolve correctly
- [ ] OG previews render at final URL