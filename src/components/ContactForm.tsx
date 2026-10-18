"use client";

import { useCallback } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import type { ErrorCode, FormPayload } from "@/lib/validation";
import { useInquiryForm } from "@/lib/use-inquiry-form";
import { site } from "@/config/site";
import { Consent, ErrorText, Honeypot, Required } from "./FormBits";
import FormStatus from "./FormStatus";

interface Props {
  locale: Locale;
  title: string;
  form: Dictionary["form"];
  copy: Dictionary["copy"];
}

export default function ContactForm({ locale, title, form, copy }: Props) {
  const subject = `${form.subjects.contact} – ${site.name}`;

  const summarize = useCallback(
    (p: FormPayload) => {
      const lines = [subject, "", `${form.name}: ${p.name}`, `${form.email}: ${p.email}`];
      if (p.phone) lines.push(`${form.phone}: ${p.phone}`);
      if (p.message) lines.push("", `${form.message}:`, p.message);
      return lines.join("\n");
    },
    [form, subject]
  );

  const { errors, status, onSubmit, revalidate } = useInquiryForm("contact", locale, summarize);
  const inv = (k: ErrorCode) => errors.has(k);
  const describe = (k: ErrorCode, id: string) => (inv(k) ? `${id}-err` : undefined);

  return (
    <form className="form-card reveal" noValidate onSubmit={onSubmit} onInput={revalidate} onChange={revalidate} aria-labelledby="contact-form-title">
      <h3 id="contact-form-title">{title}</h3>
      <Honeypot id="c-website" />
      <div className="fields">
        <div className="field">
          <label htmlFor="c-name">{form.name}<Required /></label>
          <input id="c-name" name="name" autoComplete="name" required data-field="name" aria-invalid={inv("name")} aria-describedby={describe("name", "c-name")} />
          <ErrorText id="c-name-err" show={inv("name")}>{form.errors.name}</ErrorText>
        </div>
        <div className="field">
          <label htmlFor="c-email">{form.email}<Required /></label>
          <input id="c-email" name="email" type="email" autoComplete="email" required data-field="email" aria-invalid={inv("email")} aria-describedby={describe("email", "c-email")} />
          <ErrorText id="c-email-err" show={inv("email")}>{form.errors.email}</ErrorText>
        </div>
        <div className="field full">
          <label htmlFor="c-phone">{form.phone}</label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" data-field="phone" aria-invalid={inv("phone")} aria-describedby={describe("phone", "c-phone")} />
          <ErrorText id="c-phone-err" show={inv("phone")}>{form.errors.phone}</ErrorText>
        </div>
        <div className="field full">
          <label htmlFor="c-message">{form.message}<Required /></label>
          <textarea id="c-message" name="message" required maxLength={5000} data-field="message" aria-invalid={inv("message")} aria-describedby={describe("message", "c-message")} />
          <ErrorText id="c-message-err" show={inv("message")}>{form.errors.message}</ErrorText>
        </div>
      </div>

      <Consent id="c-consent" locale={locale} form={form} invalid={inv("consent")} />

      <div className="form-foot">
        <small>{form.required}</small>
        <button className="btn btn-primary" type="submit" disabled={status.type === "sending"}>
          {status.type === "sending" ? form.sending : form.send}
        </button>
      </div>
      <FormStatus status={status} subject={subject} form={form} copy={copy} />
    </form>
  );
}
