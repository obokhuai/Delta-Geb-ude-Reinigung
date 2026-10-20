import Link from "next/link";
import { legalPath, pagePath, PAGE_IDS, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { site } from "@/config/site";
import { Logo } from "./illustrations";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;
  const { nav, footer, legal } = dict;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" href={home}>
              <Logo size={36} sparkle={false} />
              <span className="brand-name">{site.name}</span>
            </Link>
            <p>{footer.about}</p>
          </div>
          <div>
            <h2>{footer.nav}</h2>
            <ul>
              <li><Link href={home}>{nav.home}</Link></li>
              {PAGE_IDS.map((id) => (
                <li key={id}><Link href={pagePath(locale, id)}>{nav[id]}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{footer.contact}</h2>
            <ul>
              <li>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </li>
              <li><a href={site.phone.href}>{site.phone.display}</a></li>
              <li>
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
          <div>
            <h2>{footer.legal}</h2>
            <ul>
              <li><Link href={legalPath(locale, "imprint")}>{legal.imprint}</Link></li>
              <li><Link href={legalPath(locale, "privacy")}>{legal.privacy}</Link></li>
              <li style={{ marginTop: 8 }}>
                <LanguageSwitcher locale={locale} label={dict.a11y.language} long />
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{footer.area}</span>
          <span>{footer.photos}</span>
        </div>
      </div>
    </footer>
  );
}
