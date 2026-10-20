export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const localeNames: Record<Locale, string> = { de: "Deutsch", en: "English" };

/** Localised URL slugs for the legal pages */
export const legalSlugs = {
  imprint: { de: "impressum", en: "legal-notice" },
  privacy: { de: "datenschutz", en: "privacy-policy" }
} as const;

/** Localised URL slugs for the content pages (one page per header entry) */
export const pageSlugs = {
  about: { de: "ueber-uns", en: "about-us" },
  services: { de: "leistungen", en: "services" },
  why: { de: "warum-wir", en: "why-us" },
  quote: { de: "angebot", en: "quote" },
  contact: { de: "kontakt", en: "contact" }
} as const;

export type PageId = keyof typeof pageSlugs;
export const PAGE_IDS = Object.keys(pageSlugs) as PageId[];

/** Full path of a content page, e.g. /de/leistungen */
export const pagePath = (locale: Locale, id: PageId) => `/${locale}/${pageSlugs[id][locale]}`;

/** Full path of a legal page, e.g. /de/impressum */
export const legalPath = (locale: Locale, kind: keyof typeof legalSlugs) =>
  `/${locale}/${legalSlugs[kind][locale]}`;

/** Maps any known slug (content or legal) to the same page in another language. */
export function translateSlug(slug: string, target: Locale): string | undefined {
  const all: ReadonlyArray<Record<Locale, string>> = [
    ...Object.values(legalSlugs),
    ...Object.values(pageSlugs)
  ];
  for (const slugs of all) {
    if (Object.values(slugs).includes(slug)) return slugs[target];
  }
  return undefined;
}
