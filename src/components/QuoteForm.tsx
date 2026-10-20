"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { FREQUENCIES, PROPERTY_TYPES, SERVICE_IDS, type FormPayload } from "@/lib/validation";
import { useInquiryForm } from "@/lib/use-inquiry-form";
import { site } from "@/config/site";
import { Consent, ErrorText, Honeypot, Required } from "./FormBits";
import FormStatus from "./FormStatus";

interface Props {
  locale: Locale;
  form: Dictionary["form"];
  services: Dictionary["services"]["items"];
  copy: Dictionary["copy"];
}

/** Property type that matches a chosen service, used when a service card's button is clicked */
const PROPERTY_FOR_SERVICE: Partial<Record<string, string>> = { hotel: "hotel", office: "office", house: "house" };

/**
 * Pre-selects the service from the URL (?service=hotel) – e.g. when a visitor
 * follows "Angebot für Hotelreinigung" from the services page.
 * The URL is read directly because a statically generated page has no search
 * params in the router state on the first render.
 */
function ServiceFromUrl({ apply }: { apply: (id: string) => void }) {
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("service");
    if (id) apply(id);
  }, [apply]);
  return null;
}

export default function QuoteForm({ locale, form, services, copy }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const subject = `${form.subjects.quote} – ${site.name}`;

  const applyService = useCallback((id: string) => {
    const el = formRef.current;
    if (!el) return;
    const select = el.elements.namedItem("service") as HTMLSelectElement | null;
    if (select) select.value = id;
    const prop = PROPERTY_FOR_SERVICE[id];
    if (prop) {
      const radio = el.querySelector<HTMLInputElement>(`input[name="property"][value="${prop}"]`);
      if (radio) radio.checked = true;
    }
  }, []);

  const summarize = useCallback(
    (p: FormPayload) => {
      const lines = [subject, "", `${form.name}: ${p.name}`];
      if (p.company) lines.push(`${form.company}: ${p.company}`);
      lines.push(`${form.email}: ${p.email}`);
      if (p.phone) lines.push(`${form.phone}: ${p.phone}`);
      if (p.service) lines.push(`${form.service}: ${services[p.service as keyof typeof services]?.title ?? p.service}`);
      if (p.frequency) lines.push(`${form.frequency}: ${form.frequencies[p.frequency as keyof typeof form.frequencies] ?? p.frequency}`);
      if (p.property) lines.push(`${form.property}: ${form.properties[p.property as keyof typeof form.properties] ?? p.property}`);
      if (p.size) lines.push(`${form.size}: ${p.size}`);
      if (p.location) lines.push(`${form.location}: ${p.location}`);
      if (p.message) lines.push("", `${form.message}:`, p.message);
      return lines.join("\n");
    },
    [form, services, subject]
  );

  const { errors, status, onSubmit, revalidate } = useInquiryForm("quote", locale, summarize);

  const inv = (k: Parameters<typeof errors.has>[0]) => errors.has(k);
  const describe = (k: Parameters<typeof errors.has>[0], id: string) => (inv(k) ? `${id}-err` : undefined);

  return (
    <form ref={formRef} className="form-card reveal" noValidate onSubmit={onSubmit} onInput={revalidate} onChange={revalidate}>
      <Honeypot id="q-website" />
      <ServiceFromUrl apply={applyService} />
      <div className="fields">
        <div className="field">
          <label htmlFor="q-name">{form.name}<Required /></label>
          <input id="q-name" name="name" autoComplete="name" required data-field="name" aria-invalid={inv("name")} aria-describedby={describe("name", "q-name")} />
          <ErrorText id="q-name-err" show={inv("name")}>{form.errors.name}</ErrorText>
        </div>
        <div className="field">
          <label htmlFor="q-company">{form.company}</label>
          <input id="q-company" name="company" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="q-email">{form.email}<Required /></label>
          <input id="q-email" name="email" type="email" autoComplete="email" required data-field="email" aria-invalid={inv("email")} aria-describedby={describe("email", "q-email")} />
          <ErrorText id="q-email-err" show={inv("email")}>{form.errors.email}</ErrorText>
        </div>
        <div className="field">
          <label htmlFor="q-phone">{form.phone}</label>
          <input id="q-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" data-field="phone" aria-invalid={inv("phone")} aria-describedby={describe("phone", "q-phone")} />
          <ErrorText id="q-phone-err" show={inv("phone")}>{form.errors.phone}</ErrorText>
        </div>
        <div className="field">
          <label htmlFor="q-service">{form.service}<Required /></label>
          <select id="q-service" name="service" required defaultValue="" data-field="service" aria-invalid={inv("service")} aria-describedby={describe("service", "q-service")}>
            <option value="">{form.choose}</option>
            {SERVICE_IDS.map((id) => (
              <option key={id} value={id}>{services[id].title}</option>
            ))}
          </select>
          <ErrorText id="q-service-err" show={inv("service")}>{form.errors.service}</ErrorText>
        </div>
        <div className="field">
          <label htmlFor="q-frequency">{form.frequency}</label>
          <select id="q-frequency" name="frequency" defaultValue="once">
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>{form.frequencies[f]}</option>
            ))}
          </select>
        </div>
        <fieldset className="field full" aria-describedby={describe("property", "q-property")}>
          <legend>{form.property}<Required /></legend>
          <div className="radios">
            {PROPERTY_TYPES.map((p, i) => (
              <label key={p} htmlFor={`q-prop-${p}`}>
                <input type="radio" id={`q-prop-${p}`} name="property" value={p} data-field={i === 0 ? "property" : undefined} />
                <span>{form.properties[p]}</span>
              </label>
            ))}
          </div>
          <ErrorText id="q-property-err" show={inv("property")}>{form.errors.property}</ErrorText>
        </fieldset>
        <div className="field">
          <label htmlFor="q-size">{form.size}</label>
          <input id="q-size" name="size" type="number" min={1} max={100000} inputMode="numeric" />
        </div>
        <div className="field">
          <label htmlFor="q-location">{form.location}</label>
          <input id="q-location" name="location" autoComplete="postal-code" placeholder="45131 Essen" />
        </div>
        <div className="field full">
          <label htmlFor="q-message">{form.message}</label>
          <textarea id="q-message" name="message" placeholder={form.messagePlaceholder} maxLength={5000} />
        </div>
      </div>

      <Consent id="q-consent" locale={locale} form={form} invalid={inv("consent")} />

      <div className="form-foot">
        <small>{form.required}</small>
        <button className="btn btn-primary" type="submit" disabled={status.type === "sending"}>
          {status.type === "sending" ? form.sending : form.sendQuote}
        </button>
      </div>
      <FormStatus status={status} subject={subject} form={form} copy={copy} />
    </form>
  );
}
