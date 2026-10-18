import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "../globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { themeInitScript } from "@/components/ThemeToggle";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1619" }
  ]
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { de: "/de", en: "/en", "x-default": "/de" }
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: dict.meta.ogLocale,
      url: `/${lang}`
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true, email: true, address: true }
  };
}

function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "HousekeepingService",
    name: site.name,
    url: `${site.url}/${locale}`,
    telephone: site.phone.international,
    email: site.email,
    description: dict.meta.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode
    },
    areaServed: { "@type": "City", name: "Essen" },
    makesOffer: Object.values(dict.services.items).map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title }
    }))
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <LocalBusinessJsonLd locale={lang} />
      </head>
      <body>
        <a className="skip" href="#main">
          {dict.a11y.skip}
        </a>
        <Header
          locale={lang}
          dict={{ nav: dict.nav, a11y: dict.a11y, cta: dict.cta, tagline: dict.tagline }}
        />
        <main id="main">{children}</main>
        <Footer locale={lang} dict={dict} />
        <WhatsAppButton label={dict.a11y.whatsapp} />
        <BackToTop label={dict.a11y.toTop} />
        <Reveal />
      </body>
    </html>
  );
}
