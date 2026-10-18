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
