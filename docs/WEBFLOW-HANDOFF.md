<!-- FILE: docs/WEBFLOW-HANDOFF.md -->

# Webflow handoff (Optional)

This project is delivered as a static site. Webflow is optional and only needed if the buyer wants Webflow’s editor, CMS, or Webflow hosting/forms.

## When Webflow makes sense
- Buyer wants non-technical editing in Webflow Designer
- Buyer wants Webflow Forms + spam protection
- Buyer wants CMS Collections
- Buyer wants Webflow hosting/SSL managed inside Webflow

## When Webflow is not needed
- Buyer is happy with static hosting (Vercel/Netlify/Cloudflare)
- Buyer has basic dev support for HTML edits
- Buyer wants lowest ongoing cost

## Recommended Webflow build order
1) Build **Style Guide** page first (tokens/components)
2) Build global components:
   - Navbar
   - Footer
3) Build pages:
   - Home → About → Features → Pricing → Contact
4) Replace contact form with Webflow Form block
5) QA responsive + hover/focus styles

## Webflow components checklist
- [ ] Container utility
- [ ] Section spacing utility
- [ ] Grid utilities (2/3)
- [ ] Card system
- [ ] Button system (primary/alt/grad/ghost)
- [ ] Badge styles
- [ ] Typography styles (H1/H2/H3/body/muted)
- [ ] Logo showcase tiles
- [ ] Contact form styles + focus
- [ ] SEO per page + OG image uploaded
- [ ] 404 page (optional)

## Notes
- Webflow SEO is set per page in Webflow settings.
- If buyer uses Webflow hosting, domain DNS points to Webflow, not Vercel.