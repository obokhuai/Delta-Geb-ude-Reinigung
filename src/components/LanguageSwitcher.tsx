"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { legalSlugs, locales, type Locale } from "@/i18n/config";

/** Maps the current path to the same page in another language (incl. translated legal slugs). */
export function translatePath(pathname: string, target: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1);
  if (rest[0]) {
    for (const slugs of Object.values(legalSlugs)) {
      if (Object.values(slugs).includes(rest[0] as never)) rest[0] = slugs[target];
    }
  }
  return "/" + [target, ...rest].join("/");
}

function remember(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher({
  locale,
  label,
  long = false
}: {
  locale: Locale;
  label: string;
  long?: boolean;
}) {
  const pathname = usePathname() || `/${locale}`;
  const names: Record<Locale, string> = long ? { de: "Deutsch", en: "English" } : { de: "DE", en: "EN" };

  return (
    <div className="seg" role="group" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={translatePath(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          onClick={() => remember(l)}
          scroll={false}
        >
          {names[l]}
        </Link>
      ))}
    </div>
  );
}
