# Delta Gebäude Reinigung – Website

Next.js 15 (App Router) + TypeScript website for Delta Gebäude Reinigung, Essen.

- German (`/de`) and English (`/en`) pages, with translated Impressum and privacy pages
- Every entry in the header has its own page (about, services, why us, quote, contact)
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
| Address, phone, **WhatsApp number**, e-mail, owner, VAT ID, hours, hosting provider | `src/config/site.ts` |
| All German texts | `src/i18n/dictionaries/de.ts` |
| All English texts | `src/i18n/dictionaries/en.ts` |
| Colours and fonts | top of `src/app/globals.css` || Logo (DELTA mark) | `src/components/illustrations.tsx` |
| Impressum / privacy wording | `src/components/LegalContent.tsx` |

The WhatsApp number is used in three places: the floating WhatsApp button, the contact page and the footer.
It is stored once in `site.whatsapp` – change it there and it updates everywhere.

The logo is the DELTA mark from the flyer, drawn in the site's own palette: petrol teal for the house and the
skyline, brass for the window and the sparkles, a teal gradient for the swoosh (`--logo-navy`, `--logo-blue`,
`--logo-sky` – a lighter variant in the dark theme).
The browser tab icon (`src/app/icon.svg`) is a simplified version of the same mark, drawn for small sizes.

### The colours

The site uses the **original palette: petrol teal and brass on white**. Every colour is a CSS variable at the top of
`src/app/globals.css`; there are no ad-hoc colours anywhere else, so a change there changes the entire website.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--petrol` | `#0f4652` | `#0b3a44` | Dark bands ("Warum wir", CTA), dark buttons |
| `--brass` | `#e9b23c` | `#f0c25e` | Primary button, hero underline, dots, step numbers, icons |
| `--link` | `#0d6273` | `#7fd0da` | Links, eyebrows, focus ring |
| `--bg` / `--surface` / `--surface-2` | `#f6f8f8` / `#ffffff` / `#e9f0f1` | `#0c1619` / `#122126` / `#17292f` | Backgrounds |
| `--fg` / `--muted` / `--line` | `#12262b` / `#4c6268` / `#d3dfe1` | `#e4eeef` / `#9db3b8` / `#26393f` | Text and borders |

The logo uses the same palette: petrol teal for the house and skyline, brass for the window and sparkles,
a teal gradient for the swoosh. Two colours stay outside the palette on purpose: WhatsApp green (`#25d366`)
for the WhatsApp button and the green/red of the form notices – they belong to WhatsApp and to the meaning of
the message, not to the brand.

Values written in `[square brackets]` are placeholders. They appear highlighted in yellow on the site until you replace them.
**The Impressum must be complete before the site goes live** (German law, § 5 DDG).

## 3. The pages

The header has five entries, each one leads to its own page:

| Header entry | German URL | English URL |
|---|---|---|
| Über uns | `/de/ueber-uns` | `/en/about-us` |
| Leistungen | `/de/leistungen` | `/en/services` |
| Warum wir | `/de/warum-wir` | `/en/why-us` |
| Angebot | `/de/angebot` | `/en/quote` |
| Kontakt | `/de/kontakt` | `/en/contact` |

The home page keeps the photo slideshow, the company introduction, the managing director and an
overview card for every page. The content itself lives on the pages listed above – that way no text
is duplicated across two URLs.

| What | File |
|---|---|
| URL slugs (per language) | `pageSlugs` in `src/i18n/config.ts` |
| Which page shows which section | `src/components/pages.tsx` |
| The sections themselves | `src/components/sections.tsx` |
| Intro text of a page (SEO description) | `pages` in `src/i18n/dictionaries/de.ts` / `en.ts` |

Renaming a slug is a one-line change in `pageSlugs`; the header, footer, language switcher,
`sitemap.xml` and all links follow automatically.

## 4. Make the forms deliver email

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

## 5. Photos and the home page slideshow

The site offers seven services: Hotel-, Haus-, Büro-, Glas- und allgemeine Reinigung sowie **Unterhaltsreinigung**
and **Grundreinigung**. The first five have a photo, the two new ones use an icon from the flyer
(`serviceImages` in `src/config/images.ts`, `serviceIcons` in `src/components/sections.tsx`).
To add a photo for a service later, put it in `public/images/` and add it to `serviceImages`.

The home page opens with a slideshow that changes every **5 seconds**. Each slide shows a photo and a message for one
service (general, office, hotel, house, glass), with a button that leads to the quote page with that service already
chosen (the service travels in the URL, e.g. `/de/angebot?service=hotel`).
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

## 6. Deploy

The site needs a Node.js server for the form API.

- **Vercel** (easiest): import the project, add the environment variables, deploy.
- **Any Node host / VPS**: `npm run build` then `npm start` (port 3000, or set `PORT`).

After deploying, update the hosting provider in `src/config/site.ts` and the privacy policy.

## Project structure

```
src/
  app/
    [lang]/layout.tsx        page shell, metadata, structured data
    [lang]/page.tsx          home page (slideshow, intro, CEO, page overview)
    [lang]/[slug]/page.tsx   content pages + Impressum / Datenschutz (DE + EN slugs)
    api/contact/route.ts     form endpoint → email
    sitemap.ts, robots.ts
    globals.css              design tokens + styles
  components/
    Header.tsx, Footer.tsx    navigation (one page per entry)
    sections.tsx             the content blocks (headline optional)
    pages.tsx                which block belongs to which page
    QuoteForm.tsx            … plus the other forms, icons, illustrations
  config/site.ts             company details
  config/images.ts           photos
  i18n/                      languages, URL slugs and translations
  lib/validation.ts          shared form validation
  middleware.ts              redirects / to /de or /en
```
