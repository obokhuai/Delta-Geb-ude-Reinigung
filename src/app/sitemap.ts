import type { MetadataRoute } from "next";
import { legalSlugs, locales, pageSlugs, PAGE_IDS } from "@/i18n/config";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home = locales.map((l) => ({
    url: `${site.url}/${l}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: l === "de" ? 1 : 0.9,
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}`])) }
  }));
  const pages = locales.flatMap((l) =>
    PAGE_IDS.map((id) => ({
      url: `${site.url}/${l}/${pageSlugs[id][l]}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}/${pageSlugs[id][x]}`]))
      }
    }))
  );
  const legal = locales.flatMap((l) =>
    (Object.keys(legalSlugs) as (keyof typeof legalSlugs)[]).map((k) => ({
      url: `${site.url}/${l}/${legalSlugs[k][l]}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3
    }))
  );
  return [...home, ...pages, ...legal];
}
