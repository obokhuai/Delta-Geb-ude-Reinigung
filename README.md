# Delta Gebäude Reinigung – Website

Next.js 15 (App Router) + TypeScript website for Delta Gebäude Reinigung, Essen.

- German (`/de`) and English (`/en`) pages, with translated Impressum and privacy pages
- Light / dark mode (follows the visitor's system setting, remembers their choice)
- Quote and contact forms with validation in the browser **and** on the server, a spam trap and rate limiting
- Form messages are sent by email (SMTP)
- SEO: page titles, descriptions, keywords, `hreflang`, canonical URLs, `sitemap.xml`, `robots.txt`, LocalBusiness structured data
- Fonts are bundled locally (no Google Fonts connection → simpler GDPR)

## 1. Run it on your computer

Requires **Node.js 18.18 or newer**.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # open http://localhost:3000
```

## 2. Edit company details

| What | File |
|---|---|
| Address, phone, email, owner, VAT ID, hours, hosting provider | `src/config/site.ts` |
| All German texts | `src/i18n/dictionaries/de.ts` |
| All English texts | `src/i18n/dictionaries/en.ts` |
| Colours and fonts | top of `src/app/globals.css` |
| Impressum / privacy wording | `src/components/LegalContent.tsx` |

Values written in `[square brackets]` are placeholders. They appear highlighted in yellow on the site until you replace them.
**The Impressum must be complete before the site goes live** (German law, § 5 DDG).

## 3. Make the forms deliver email

Set these environment variables (in `.env.local` locally, or in your hosting dashboard):

| Variable | Example |
|---|---|
| `SMTP_HOST` | `smtp.ionos.de` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` (use `true` for port 465) |
| `SMTP_USER` / `SMTP_PASS` | your mailbox login |
| `CONTACT_FROM` | `"Delta Website <website@your-domain.de>"` |
| `CONTACT_TO` | where messages should arrive (defaults to the company email) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.your-domain.de` |

Until `SMTP_HOST` is set, the forms still check what visitors type, then show the phone number and email address
with a button to copy their request – no request is silently lost.

## 4. Photos and the home page slideshow

The home page opens with a slideshow that changes every **5 seconds**. Each slide shows a photo and a message for one
service (general, office, hotel, house, glass), with a button that opens the quote form with that service already chosen.
Visitors can pause it, use the arrows or dots, or swipe on mobile. It also pauses on mouse hover, while a keyboard user is
inside it, and while the browser tab is hidden.

| What | File |
|---|---|
| Slide texts (DE / EN) | `hero.slides` in `src/i18n/dictionaries/de.ts` and `en.ts` |
| Slide photos, service photos, about photo | `src/config/images.ts` |
| Time per slide | `SLIDE_INTERVAL` in `src/components/HeroSlider.tsx` |

**About the current photos:** they are free stock photos from [Pexels](https://www.pexels.com/license/) (free for
commercial use). They show real cleaners at work, but **not the Delta team**. The footer says "Symbolfotos: Pexels" so
nobody is misled. Replacing them with photos of your own team is the best thing you can do for trust:

1. Put your photos in `public/images/`, e.g. `public/images/team.jpg` (landscape, at least 2000 px wide for the slideshow).
2. In `src/config/images.ts`, change `src` to `"/images/team.jpg"` and update the `alt` text.
3. When no Pexels photos are left, remove the `remotePatterns` block in `next.config.mjs` and the footer credit.

Get written consent from anyone who appears in your photos.

## 5. Deploy

The site needs a Node.js server for the form API.

- **Vercel** (easiest): import the project, add the environment variables, deploy.
- **Any Node host / VPS**: `npm run build` then `npm start` (port 3000, or set `PORT`).

After deploying, update the hosting provider in `src/config/site.ts` and the privacy policy.

## Project structure

```
src/
  app/
    [lang]/layout.tsx        page shell, metadata, structured data
    [lang]/page.tsx          home page (all sections)
    [lang]/[slug]/page.tsx   Impressum / Datenschutz (DE + EN slugs)
    api/contact/route.ts     form endpoint → email
    sitemap.ts, robots.ts
    globals.css              design tokens + styles
  components/                Header, Footer, sections, forms, icons, illustrations
  config/site.ts             company details
  i18n/                      languages and translations
  lib/validation.ts          shared form validation
  middleware.ts              redirects / to /de or /en
```
