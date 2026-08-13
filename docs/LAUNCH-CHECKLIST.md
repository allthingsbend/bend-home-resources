# Bend Home Resources — Launch Checklist

## 1. Domain / accounts

- [ ] Register or confirm control of `bendhomeresources.com`
- [ ] Create GitHub repo: `bend-home-resources`
- [ ] Upload the contents of this folder directly to the repo root
- [ ] Confirm default branch is `main`

## 2. Cloudflare Pages

- [ ] Create/import a Pages project from the GitHub repo
- [ ] Production branch: `main`
- [ ] Build command: `npm run build`
- [ ] Build output directory: `dist`
- [ ] Deploy and confirm the generated site loads
- [ ] Connect `bendhomeresources.com`
- [ ] If using `www`, redirect it to the preferred hostname
- [ ] Confirm HTTPS is active

## 3. Pre-indexing QA

- [ ] Homepage title/meta/canonical correct
- [ ] All six hubs load
- [ ] All supporting guides load
- [ ] No accidental noindex on production pages
- [ ] 404 page returns the expected not-found behavior
- [ ] `robots.txt` loads
- [ ] `sitemap-index.xml` loads after build
- [ ] Canonicals use `https://bendhomeresources.com`
- [ ] Old v1 test URLs redirect to new architecture
- [ ] Mobile header/menu works
- [ ] Breadcrumbs work
- [ ] Related-resource links work
- [ ] Official source links open correctly
- [ ] Default social image renders

## 4. Search / analytics

- [ ] Create GA4 property if desired
- [ ] Add `PUBLIC_GA_ID` in Cloudflare environment variables
- [ ] Add site to Google Search Console
- [ ] Add `PUBLIC_GSC_VERIFICATION` if using HTML-tag verification
- [ ] Submit sitemap in GSC
- [ ] Add Bing Webmaster Tools if desired
- [ ] Add `PUBLIC_BING_VERIFICATION` if using meta-tag verification

## 5. Content / trust

- [ ] Review About page
- [ ] Review Editorial Standards
- [ ] Review Disclaimer
- [ ] Review Privacy page before enabling analytics/forms/ads beyond the starter setup
- [ ] Spot-check Oregon/City/County source links
- [ ] Decide whether public author/byline information should be added later

## 6. First 30 days after launch

- [ ] Publish Priority 1 backlog pages steadily rather than all at once
- [ ] Add at least 3–5 more professional categories
- [ ] Add sewer-scope + homeowners-insurance buying guides
- [ ] Start collecting real local repair quote data privately
- [ ] Watch GSC indexing and query impressions
- [ ] Improve pages that begin earning impressions before creating duplicate variants
- [ ] Add original/local photography when available
