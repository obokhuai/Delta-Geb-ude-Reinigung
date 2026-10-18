import type { Locale } from "@/i18n/config";
import { isPlaceholder, site } from "@/config/site";

/** Renders a config value, highlighting it if it is still a [placeholder]. */
function V({ children }: { children: string }) {
  return isPlaceholder(children) ? <span className="placeholder">{children}</span> : <>{children}</>;
}

const addressBlock = (
  <>
    {site.address.street}
    <br />
    {site.address.postalCode} {site.address.city}
  </>
);

export function ImprintContent({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return (
      <>
        <h2>Information pursuant to § 5 DDG</h2>
        <p>
          {site.name}
          <br />
          <V>{site.legalForm}</V>
          <br />
          <V>{site.owner}</V>
          <br />
          {addressBlock}
          <br />
          Germany
        </p>
        <h2>Contact</h2>
        <p>
          Phone: <a href={site.phone.href}>{site.phone.display}</a>
          <br />
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <h2>VAT ID</h2>
        <p><V>{site.vatId}</V></p>
        <h2>Register entry</h2>
        <p><V>{site.register}</V></p>
        <h2>Supervisory authority / chamber</h2>
        <p><V>{site.chamber}</V></p>
        <h2>Responsible for content (§ 18 (2) MStV)</h2>
        <p><V>{site.owner}</V>, {site.address.street}, {site.address.postalCode} {site.address.city}</p>
        <h2>Consumer dispute resolution</h2>
        <p>We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>
      </>
    );
  }
  return (
    <>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {site.name}
        <br />
        <V>{site.legalForm}</V>
        <br />
        <V>{site.owner}</V>
        <br />
        {addressBlock}
        <br />
        {site.address.country}
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.phone.href}>{site.phone.display}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Umsatzsteuer-ID</h2>
      <p><V>{site.vatId}</V></p>
      <h2>Registereintrag</h2>
      <p><V>{site.register}</V></p>
      <h2>Aufsichtsbehörde / Kammer</h2>
      <p><V>{site.chamber}</V></p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p><V>{site.owner}</V>, {site.address.street}, {site.address.postalCode} {site.address.city}</p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </>
  );
}

export function PrivacyContent({ locale }: { locale: Locale }) {
  const controller = (
    <p>
      {site.name}, <V>{site.owner}</V>
      <br />
      {addressBlock}
      <br />
      {locale === "en" ? "Phone" : "Telefon"}: {site.phone.display} · {locale === "en" ? "Email" : "E-Mail"}: {site.email}
    </p>
  );

  if (locale === "en") {
    return (
      <>
        <h2>1. Controller</h2>
        {controller}
        <h2>2. Contact and quote requests</h2>
        <p>
          When you contact us by form, email or phone, we process your details (e.g. name, email, phone, property details,
          message) to handle your request. The legal basis is Art. 6(1)(b) GDPR (pre-contractual steps) or Art. 6(1)(a) GDPR
          (consent). Form messages are delivered to us by email. Data is deleted once it is no longer needed and no statutory
          retention obligations apply.
        </p>
        <h2>3. Hosting and server log files</h2>
        <p>
          This website is hosted by: <V>{site.hosting}</V>. When you visit, technically necessary data (e.g. IP address, date
          and time, page visited, browser) is processed to provide the website securely (Art. 6(1)(f) GDPR).
        </p>
        <h2>4. Fonts and images</h2>
        <p>Fonts are hosted on our own server. Photos are loaded and optimised by our own server, so your browser does not connect to external image or font providers.</p>
        <h2>5. Local storage and cookies</h2>
        <p>
          Your colour-mode choice is stored only in your browser (localStorage), and your language choice in a technically
          necessary cookie. No tracking or marketing cookies are used.
        </p>
        <h2>6. Your rights</h2>
        <p>
          You have the right to access, rectification, erasure, restriction of processing, data portability and objection, and
          may withdraw consent at any time. You may also lodge a complaint with a data protection authority, e.g. the North
          Rhine-Westphalia commissioner (LDI NRW).
        </p>
      </>
    );
  }
  return (
    <>
      <h2>1. Verantwortlicher</h2>
      {controller}
      <h2>2. Kontakt- und Angebotsanfragen</h2>
      <p>
        Wenn Sie uns über ein Formular, per E-Mail oder telefonisch kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name,
        E-Mail, Telefon, Angaben zur Immobilie, Nachricht) zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
        DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Formularnachrichten werden uns per E-Mail
        zugestellt. Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen
        Aufbewahrungspflichten bestehen.
      </p>
      <h2>3. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird gehostet bei: <V>{site.hosting}</V>. Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse,
        Datum und Uhrzeit, aufgerufene Seite, Browser) verarbeitet, um die Website sicher bereitzustellen (Art. 6 Abs. 1 lit. f
        DSGVO).
      </p>
      <h2>4. Schriftarten und Bilder</h2>
      <p>Schriftarten werden von unserem eigenen Server geladen. Fotos werden über unseren eigenen Server geladen und optimiert. Ihr Browser stellt dabei keine Verbindung zu externen Bild- oder Schriftanbietern her.</p>
      <h2>5. Lokale Speicherung und Cookies</h2>
      <p>
        Ihre Auswahl des Farbmodus wird nur in Ihrem Browser (localStorage) gespeichert, Ihre Sprachauswahl in einem technisch
        notwendigen Cookie. Es werden keine Tracking- oder Marketing-Cookies eingesetzt.
      </p>
      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
        Widerspruch sowie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Sie können sich außerdem bei einer
        Datenschutz-Aufsichtsbehörde beschweren, z. B. bei der Landesbeauftragten für Datenschutz und Informationsfreiheit
        Nordrhein-Westfalen (LDI NRW).
      </p>
    </>
  );
}
