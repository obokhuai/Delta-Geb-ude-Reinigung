import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, legalSlugs, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ImprintContent, PrivacyContent } from "@/components/LegalContent";

type Kind = keyof typeof legalSlugs;
type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    (Object.keys(legalSlugs) as Kind[]).map((kind) => ({ lang, slug: legalSlugs[kind][lang] }))
  );
}

function resolve(lang: string, slug: string): { locale: Locale; kind: Kind } | null {
  if (!isLocale(lang)) return null;
  const kind = (Object.keys(legalSlugs) as Kind[]).find((k) => legalSlugs[k][lang] === slug);
  return kind ? { locale: lang, kind } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const r = resolve(lang, slug);
  if (!r) return {};
  const dict = getDictionary(r.locale);
  return {
    title: r.kind === "imprint" ? dict.legal.imprint : dict.legal.privacy,
    alternates: {
      canonical: `/${r.locale}/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${legalSlugs[r.kind][l]}`]))
    },
    robots: { index: true, follow: true }
  };
}

export default async function LegalPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const r = resolve(lang, slug);
  if (!r) notFound();
  const dict = getDictionary(r.locale);

  return (
    <article className="legal-page">
      <div className="wrap">
        <Link className="back-link" href={`/${r.locale}`}>
          ← {dict.legal.back}
        </Link>
        <h1>{r.kind === "imprint" ? dict.legal.imprint : dict.legal.privacy}</h1>
        <p className="legal-note">{r.kind === "imprint" ? dict.legal.templateNoteImprint : dict.legal.templateNotePrivacy}</p>
        {r.kind === "imprint" ? <ImprintContent locale={r.locale} /> : <PrivacyContent locale={r.locale} />}
      </div>
    </article>
  );
}
