# JJ Cleaning Services - Website

A complete rebuild of [jjcleaningservices.uk](https://www.jjcleaningservices.uk/) as a fast, dependency-free static site. All 30 pages, all content, pricing, reviews, FAQs and accreditations carried over from the original site, with a new design, animations and microinteractions.

## Viewing the site

Just open `index.html` in any browser. No server or install needed.

For the nicest local experience (clean URLs), you can run:

```
npx serve .
```

## Editing content

All text content (prices, services, reviews, FAQs, contact details, locations, coupons) lives in **`src/data.js`**. Page structure and templates live in **`src/build.js`**.

After editing either file, regenerate the HTML pages with:

```
node src/build.js
```

This rewrites all 30 `.html` files in the project root. Don't edit the `.html` files directly; they're generated.

## Project layout

```
index.html + 29 other pages   generated pages (open these)
assets/css/main.css           design system (colours, layout, animations)
assets/js/main.js             interactions (nav, sliders, counters, forms)
assets/img/                   photos, logos and accreditation badges
assets/icons/                 Tabler + Simple Icons SVGs inlined at build time
assets/fonts/                 self-hosted Outfit font
src/data.js                   ALL site content (edit this)
src/build.js                  templates + static site generator
```

## Notes

- Forms have no backend: submitting opens the visitor's email app with a prefilled message to the right JJ inbox (`data-mailto` attribute on each form). When hosting properly, you can swap this for a form service (Formspree, Netlify Forms, etc.) by giving the forms an `action`.
- Legal/policy links in the footer point to the live originals on jjcleaningservices.uk.
- All animations respect the visitor's `prefers-reduced-motion` setting.
- To deploy, upload everything except `src/` (and optionally `README.md`) to any static host (Netlify, Vercel, GitHub Pages, cPanel...).
