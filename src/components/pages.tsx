import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { About, Contact, PageHead, Quote, Services, WhyUs } from "./sections";

export interface ContentPageProps {
  locale: Locale;
  dict: Dictionary;
}

/** Each page repeats the id of its section so the layout can map it to a route. */
export const aboutPage = (p: ContentPageProps) => (
  <>
    <PageHead eyebrow={p.dict.about.eyebrow} title={p.dict.about.title} />
    <About locale={p.locale} dict={p.dict} head={false} />
  </>
);

export const servicesPage = (p: ContentPageProps) => (
  <>
    <PageHead eyebrow={p.dict.services.eyebrow} title={p.dict.services.title} lead={p.dict.services.lead} />
    <Services locale={p.locale} dict={p.dict} head={false} />
  </>
);

export const whyPage = (p: ContentPageProps) => (
  <>
    <PageHead eyebrow={p.dict.why.eyebrow} title={p.dict.why.title} lead={p.dict.why.lead} />
    <WhyUs locale={p.locale} dict={p.dict} head={false} />
  </>
);

export const quotePage = (p: ContentPageProps) => (
  <>
    <PageHead eyebrow={p.dict.quote.eyebrow} title={p.dict.quote.title} lead={p.dict.quote.lead} />
    <Quote locale={p.locale} dict={p.dict} head={false} />
  </>
);

export const contactPage = (p: ContentPageProps) => (
  <>
    <PageHead eyebrow={p.dict.contact.eyebrow} title={p.dict.contact.title} lead={p.dict.contact.lead} />
    <Contact locale={p.locale} dict={p.dict} head={false} />
  </>
);
