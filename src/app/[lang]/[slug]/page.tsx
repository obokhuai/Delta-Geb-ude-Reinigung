import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  isLocale,
  legalSlugs,
  locales,
  pageSlugs,
  PAGE_IDS,
  type Locale,
  type PageId
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/config/site";
import { ImprintContent, PrivacyContent } from "@/components/LegalContent";
import { aboutPage, contactPage, quotePage, servicesPage, whyPage, type ContentPageProps } from "@/components/pages";

type LegalKind = keyof typeof legalSlugs;
type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

const PAGE_COMPONENTS: Record<PageId, (p: ContentPageProps) => ReactNode> = {
  about: aboutPage,
  services: servicesPage,
  why: whyPage,
  quote: quotePage,
  contact: contactPage
};

export function generateStaticParams() {
  return locales.flatMap((lang) => [
    ...(Object.keys(legalSlugs) as LegalKind[]).map((kind) => ({ lang, slug: legalSlugs[kind][lang] })),
    ...PAGE_IDS.map((id) => ({ lang, slug: pageSlugs[id][lang] }))
  ]);
}

function resolve(
  lang: string,
  slug: string
): { locale: Locale; legal?: LegalKind; page?: PageId } | null {
  if (!isLocale(lang)) return null;
  const legal = (Object.keys(legalSlugs) as LegalKind[]).find((k) => legalSlugs[k][lang] === slug);
  if (legal) return { locale: lang, legal };
  const page = PAGE_IDS.find((id) => pageSlugs[id][lang] === slug);
  if (page) return { locale: lang, page };
  return null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const r = resolve(lang, slug);
  if (!r) return {};
  const dict = getDictionary(r.locale);

  if (r.legal) {
    const kind = r.legal;
    return {
      title: kind === "imprint" ? dict.legal.imprint : dict.legal.privacy,
      alternates: {
        canonical: `/${r.locale}/${slug}`,
        languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${legalSlugs[kind][l]}`]))
      },
      robots: { index: true, follow: true }
    };
  }

  const id = r.page as PageId;
  return {
    title: dict.nav[id],
    description: dict.pages[id].description,
    alternates: {
      canonical: `/${r.locale}/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${pageSlugs[id][l]}`]))
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.nav[id],
      description: dict.pages[id].description,
      locale: dict.meta.ogLocale,
      url: `/${r.locale}/${slug}`
    },
    robots: { index: true, follow: true }
  };
}

export default async function SlugPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const r = resolve(lang, slug);
  if (!r) notFound();
  const dict = getDictionary(r.locale);

  if (r.legal) {
    return (
      <article className="legal-page">
        <div className="wrap">
          <Link className="back-link" href={`/${r.locale}`}>
            ← {dict.legal.back}
          </Link>
          <h1>{r.legal === "imprint" ? dict.legal.imprint : dict.legal.privacy}</h1>
          <p className="legal-note">
            {r.legal === "imprint" ? dict.legal.templateNoteImprint : dict.legal.templateNotePrivacy}
          </p>
          {r.legal === "imprint" ? <ImprintContent locale={r.locale} /> : <PrivacyContent locale={r.locale} />}
        </div>
      </article>
    );
  }

  const id = r.page as PageId;
  const Page = PAGE_COMPONENTS[id];
  return <Page locale={r.locale} dict={dict} />;
}
