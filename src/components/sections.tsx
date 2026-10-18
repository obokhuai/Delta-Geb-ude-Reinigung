import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import de from "@/i18n/dictionaries/de";
import { isPlaceholder, mapsUrl, site } from "@/config/site";
import { aboutImage, heroImages, serviceImages } from "@/config/images";
import { SERVICE_IDS } from "@/lib/validation";
import HeroSlider from "./HeroSlider";
import {
  CheckIcon,
  ClipboardCheckIcon,
  ClockIcon,
  ExternalIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SearchIcon,
  ThumbIcon
} from "./icons";
import ServiceCta from "./ServiceCta";
import QuoteForm from "./QuoteForm";
import ContactForm from "./ContactForm";
import CopyButton from "./CopyButton";

type SectionProps = { locale: Locale; dict: Dictionary };

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

export function About({ locale, dict }: SectionProps) {
  const { about } = dict;
  const values = [
    { key: "professionalism", Icon: ClipboardCheckIcon },
    { key: "reliability", Icon: ClockIcon },
    { key: "detail", Icon: SearchIcon },
    { key: "satisfaction", Icon: ThumbIcon }
  ] as const;
  return (
    <section className="band band-alt" id="about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div className="sec-head flush reveal">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 id="about-title">{about.title}</h2>
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

export function Services({ locale, dict }: SectionProps) {
  const { services } = dict;
  return (
    <section className="band" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{services.eyebrow}</span>
          <h2 id="services-title">{services.title}</h2>
          <p className="lead">{services.lead}</p>
        </div>
        <div className="services">
          {SERVICE_IDS.map((id) => {
            const s = services.items[id];
            return (
              <article className="svc reveal" key={id}>
                <div className="svc-art">
                  <Image
                    src={serviceImages[id].src}
                    alt={serviceImages[id].alt[locale]}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 400px"
                    quality={70}
                  />
                </div>
                <div className="svc-body">
                  {/* German service name is always shown – it is what customers in Essen search for */}
                  <span className="svc-de" lang="de">
                    {germanServiceName[id]}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ServiceCta service={id} label={dict.cta.request} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const germanServiceName: Record<(typeof SERVICE_IDS)[number], string> = {
  hotel: de.services.items.hotel.title,
  house: de.services.items.house.title,
  office: de.services.items.office.title,
  glass: "Glasreinigung",
  general: "Allgemeine Reinigungsdienstleistungen"
};

export function WhyUs({ dict }: SectionProps) {
  const { why } = dict;
  return (
    <section className="band why" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{why.eyebrow}</span>
          <h2 id="why-title">{why.title}</h2>
          <p className="lead">{why.lead}</p>
        </div>
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

export function Quote({ locale, dict }: SectionProps) {
  const { quote } = dict;
  return (
    <section className="band" id="quote" aria-labelledby="quote-title">
      <div className="wrap form-grid">
        <div className="quote-aside reveal">
          <div className="sec-head flush">
            <span className="eyebrow">{quote.eyebrow}</span>
            <h2 id="quote-title">{quote.title}</h2>
            <p className="lead">{quote.lead}</p>
          </div>
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

export function Contact({ locale, dict }: SectionProps) {
  const { contact, copy } = dict;
  const hours = site.hours[locale];
  const copyProps = { label: copy.label, doneLabel: copy.done, failedLabel: copy.failed };
  return (
    <section className="band band-alt" id="contact" aria-labelledby="contact-title">
      <div className="wrap form-grid">
        <div className="reveal">
          <div className="sec-head" style={{ marginBottom: 16 }}>
            <span className="eyebrow">{contact.eyebrow}</span>
            <h2 id="contact-title">{contact.title}</h2>
            <p className="lead">{contact.lead}</p>
          </div>
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
