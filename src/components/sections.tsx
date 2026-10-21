import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { PAGE_IDS, pagePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import de from "@/i18n/dictionaries/de";
import { isPlaceholder, mapsUrl, site } from "@/config/site";
import { aboutImage, heroImages, serviceImages } from "@/config/images";
import { SERVICE_IDS, type ServiceId } from "@/lib/validation";
import HeroSlider from "./HeroSlider";
import {
  BucketMopIcon,
  CheckIcon,
  ClipboardCheckIcon,
  ClockIcon,
  ExternalIcon,
  FaxIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SearchIcon,
  ThumbIcon,
  VacuumIcon,
  WhatsAppIcon,
  type IconProps
} from "./icons";
import ServiceCta from "./ServiceCta";
import QuoteForm from "./QuoteForm";
import ContactForm from "./ContactForm";
import CopyButton from "./CopyButton";

type SectionProps = {
  locale: Locale;
  dict: Dictionary;
  /** Show the section's own heading (h2). Off when the section is used on its own page. */
  head?: boolean;
  /** Id of the section heading, used for aria-labelledby. */
  titleId?: string;
};

const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export function Hero({ locale, dict }: SectionProps) {
  const { order, services } = dict;
  return (
    <>
      <HeroSlider locale={locale} hero={dict.hero} contactLabel={dict.cta.contact} images={heroImages} />

      {/* Quick facts strip under the slideshow */}
      <div className="facts-strip">
        <dl className="wrap facts-grid">
          <div className="fact fact-wide">
            <dt>{order.services}</dt>
            <dd className="chips">
              {SERVICE_IDS.map((id) => (
                <span className="chip" key={id}>
                  {services.items[id].short}
                </span>
              ))}
            </dd>
          </div>
          <div className="fact">
            <dt>{order.area}</dt>
            <dd>{order.areaValue}</dd>
          </div>
          <div className="fact">
            <dt>{order.for}</dt>
            <dd>{order.forValue}</dd>
          </div>
          <div className="fact">
            <dt>{order.offer}</dt>
            <dd>{order.offerValue}</dd>
          </div>
        </dl>
      </div>
    </>
  );
}

export function About({ locale, dict, head = true, titleId = "about-title" }: SectionProps) {
  const { about } = dict;
  const values = [
    { key: "professionalism", Icon: ClipboardCheckIcon },
    { key: "reliability", Icon: ClockIcon },
    { key: "detail", Icon: SearchIcon },
    { key: "satisfaction", Icon: ThumbIcon }
  ] as const;
  return (
    <section className="band band-alt" id="about" aria-labelledby={head ? titleId : undefined}>
      <div className="wrap about-grid">
        <div className="sec-head flush reveal">
          {head && (
            <>
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 id={titleId}>{about.title}</h2>
            </>
          )}
          <div className="about-text">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="about-side reveal">
          <div className="about-photo">
            <Image src={aboutImage.src} alt={aboutImage.alt[locale]} fill sizes="(max-width: 860px) 100vw, 560px" quality={70} />
          </div>
          <div className="values">
            {values.map(({ key, Icon }) => (
              <div className="value" key={key}>
                <Icon size={26} />
                <h3>{about.values[key].title}</h3>
                <p>{about.values[key].text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services({ locale, dict, head = true, titleId = "services-title" }: SectionProps) {
  const { services } = dict;
  return (
    <section className="band" id="services" aria-labelledby={head ? titleId : undefined}>
      <div className="wrap">
        {head && (
          <div className="sec-head reveal">
            <span className="eyebrow">{services.eyebrow}</span>
            <h2 id={titleId}>{services.title}</h2>
            <p className="lead">{services.lead}</p>
          </div>
        )}
        <div className="services">
          {SERVICE_IDS.map((id) => {
            const s = services.items[id];
            const img = serviceImages[id];
            const Icon = serviceIcons[id];
            return (
              <article className="svc reveal" key={id}>
                <div className="svc-art">
                  {img ? (
                    <Image
                      src={img.src}
                      alt={img.alt[locale]}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 400px"
                      quality={70}
                    />
                  ) : (
                    Icon && <Icon size={64} />
                  )}
                </div>
                <div className="svc-body">
                  {/* German service name is always shown – it is what customers in Essen search for */}
                  <span className="svc-de" lang="de">
                    {germanServiceName[id]}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ServiceCta service={id} label={dict.cta.request} locale={locale} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Services without a photo get the icon from the DELTA flyer. */
const serviceIcons: Partial<Record<ServiceId, (p: IconProps) => ReactElement>> = {
  maintenance: BucketMopIcon,
  deep: VacuumIcon
};

const germanServiceName: Record<(typeof SERVICE_IDS)[number], string> = {
  hotel: de.services.items.hotel.title,
  house: de.services.items.house.title,
  office: de.services.items.office.title,
  glass: de.services.items.glass.title,
  maintenance: de.services.items.maintenance.title,
  deep: de.services.items.deep.title,
  general: de.services.items.general.title
};

export function WhyUs({ dict, head = true, titleId = "why-title" }: SectionProps) {
  const { why } = dict;
  return (
    <section className="band why" id="why" aria-labelledby={head ? titleId : undefined}>
      <div className="wrap">
        {head && (
          <div className="sec-head reveal">
            <span className="eyebrow">{why.eyebrow}</span>
            <h2 id={titleId}>{why.title}</h2>
            <p className="lead">{why.lead}</p>
          </div>
        )}
        <div className="why-grid">
          {why.items.map((item) => (
            <div className="why-item reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <h3 className="steps-title reveal">{why.stepsTitle}</h3>
        <ol className="steps">
          {why.steps.map((step) => (
            <li className="reveal" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Quote({ locale, dict, head = true, titleId = "quote-title" }: SectionProps) {
  const { quote } = dict;
  return (
    <section className="band" id="quote" aria-labelledby={head ? titleId : undefined}>
      <div className="wrap form-grid">
        <div className="quote-aside reveal">
          {head && (
            <div className="sec-head flush">
              <span className="eyebrow">{quote.eyebrow}</span>
              <h2 id={titleId}>{quote.title}</h2>
              <p className="lead">{quote.lead}</p>
            </div>
          )}
          <ul className="check-list">
            {quote.bullets.map((b) => (
              <li key={b}>
                <CheckIcon size={20} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <QuoteForm locale={locale} form={dict.form} services={dict.services.items} copy={dict.copy} />
      </div>
    </section>
  );
}

export function Contact({ locale, dict, head = true, titleId = "contact-title" }: SectionProps) {
  const { contact, copy } = dict;
  const hours = site.hours[locale];
  const copyProps = { label: copy.label, doneLabel: copy.done, failedLabel: copy.failed };
  return (
    <section className="band band-alt" id="contact" aria-labelledby={head ? titleId : undefined}>
      <div className="wrap form-grid">
        <div className="reveal">
          {head && (
            <div className="sec-head" style={{ marginBottom: 16 }}>
              <span className="eyebrow">{contact.eyebrow}</span>
              <h2 id={titleId}>{contact.title}</h2>
              <p className="lead">{contact.lead}</p>
            </div>
          )}
          <address className="contact-list" style={{ fontStyle: "normal" }}>
            <div className="contact-item">
              <span className="ico"><PhoneIcon size={22} /></span>
              <div>
                <div className="k">{contact.phone}</div>
                <div className="v"><a href={site.phone.href}>{site.phone.display}</a></div>
              </div>
              <CopyButton text={site.phone.display} {...copyProps} />
            </div>
            <div className="contact-item">
              <span className="ico ico-whatsapp"><WhatsAppIcon size={22} /></span>
              <div>
                <div className="k">{contact.whatsapp}</div>
                <div className="v">
                  <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
                    {site.whatsapp.display}
                  </a>
                </div>
              </div>
              <CopyButton text={site.whatsapp.display} {...copyProps} />
            </div>
            <div className="contact-item">
              <span className="ico"><FaxIcon size={22} /></span>
              <div>
                <div className="k">{contact.fax}</div>
                <div className="v">{site.fax.display}</div>
              </div>
              <CopyButton text={site.fax.display} {...copyProps} />
            </div>
            <div className="contact-item">
              <span className="ico"><MailIcon size={22} /></span>
              <div>
                <div className="k">{contact.email}</div>
                <div className="v"><a href={`mailto:${site.email}`}>{site.email}</a></div>
              </div>
              <CopyButton text={site.email} {...copyProps} />
            </div>
            <div className="contact-item">
              <span className="ico"><PinIcon size={22} /></span>
              <div>
                <div className="k">{contact.address}</div>
                <div className="v">{fullAddress}</div>
                <a className="map-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  {contact.map} <ExternalIcon size={15} />
                </a>
              </div>
              <CopyButton text={fullAddress} {...copyProps} />
            </div>
          </address>
          <div className="hours">
            <strong>{contact.hours}</strong>
            <br />
            <span className={isPlaceholder(hours) ? "placeholder" : undefined}>{hours}</span>
          </div>
        </div>
        <ContactForm locale={locale} title={contact.formTitle} form={dict.form} copy={dict.copy} />
      </div>
    </section>
  );
}

export function Ceo({ locale, dict }: SectionProps) {
  const { ceo } = dict;
  const name = site.ceo.name;
  return (
    <section className="band ceo" id="ceo" aria-labelledby="ceo-title">
      <div className="wrap ceo-grid">
        <figure className="ceo-photo reveal">
          <Image src={site.ceo.photo} alt={ceo.photoAlt} fill sizes="(max-width: 860px) 80vw, 420px" quality={80} />
        </figure>
        <div className="ceo-copy reveal">
          <span className="eyebrow">{ceo.eyebrow}</span>
          <h2 id="ceo-title">{ceo.title}</h2>
          <blockquote className="ceo-quote" lang={locale}>
            <p>{locale === "de" ? `„${ceo.quote}“` : `“${ceo.quote}”`}</p>
          </blockquote>
          <div className="ceo-sign">
            <strong className={isPlaceholder(name) ? "placeholder" : undefined}>{name}</strong>
            <span>{ceo.role}</span>
          </div>
          <p className="ceo-text">{ceo.text}</p>
          <div className="ceo-actions">
            <a className="btn btn-primary" href={site.phone.href}>
              <PhoneIcon size={18} />
              {ceo.call}: {site.phone.display}
            </a>
            <a className="btn btn-ghost" href={`mailto:${site.email}`}>
              <MailIcon size={18} />
              {ceo.write}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Standalone pages
   --------------------------------------------------------------------------- */

/** Heading of a content page (h1) – the sections below it render without their own head. */
export function PageHead({
  eyebrow,
  title,
  lead,
  titleId = "page-title"
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  titleId?: string;
}) {
  return (
    <header className="page-head">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1 id={titleId}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  );
}

/** Home page teaser that points to the "about us" page. */
export function HomeIntro({ locale, dict }: SectionProps) {
  const { about, home, nav } = dict;
  return (
    <section className="band" aria-labelledby="intro-title">
      <div className="wrap intro-grid">
        <div className="sec-head flush reveal">
          <span className="eyebrow">{home.introEyebrow}</span>
          <h2 id="intro-title">{about.title}</h2>
        </div>
        <div className="intro-text reveal">
          <p>{about.paragraphs[0]}</p>
          <Link className="btn btn-ghost" href={pagePath(locale, "about")}>
            {nav.about}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Home page overview: one card per content page. */
export function PageIndex({ locale, dict }: SectionProps) {
  const { home, nav, pages } = dict;
  return (
    <section className="band band-alt" aria-labelledby="index-title">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{home.indexEyebrow}</span>
          <h2 id="index-title">{home.indexTitle}</h2>
          <p className="lead">{home.indexLead}</p>
        </div>
        <div className="page-cards">
          {PAGE_IDS.map((id) => (
            <Link key={id} className="page-card reveal" href={pagePath(locale, id)}>
              <h3>{nav[id]}</h3>
              <p>{pages[id].description}</p>
              <span className="page-card-go">{home.more} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action on the home page. */
export function HomeCta({ locale, dict }: SectionProps) {
  const { home, cta } = dict;
  return (
    <section className="band home-cta">
      <div className="wrap">
        <h2>{home.ctaTitle}</h2>
        <p>{home.ctaText}</p>
        <Link className="btn btn-primary" href={pagePath(locale, "quote")}>
          {cta.quote}
        </Link>
      </div>
    </section>
  );
}
