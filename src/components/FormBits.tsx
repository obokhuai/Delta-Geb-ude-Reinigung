import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { legalSlugs } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Required() {
  return (
    <span className="req" aria-hidden="true">
      {" "}*
    </span>
  );
}

export function ErrorText({ id, show, children }: { id: string; show: boolean; children: ReactNode }) {
  return show ? (
    <span className="err-msg" id={id}>
      {children}
    </span>
  ) : null;
}

/** Hidden field that only bots fill in. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div className="hp" aria-hidden="true">
      <label htmlFor={id}>Website</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function Consent({
  id,
  locale,
  form,
  invalid
}: {
  id: string;
  locale: Locale;
  form: Dictionary["form"];
  invalid: boolean;
}) {
  return (
    <>
      <label className="consent" htmlFor={id}>
        <input
          id={id}
          name="consent"
          type="checkbox"
          data-field="consent"
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-err` : undefined}
        />
        <span>
          {form.consentStart}{" "}
          <Link href={`/${locale}/${legalSlugs.privacy[locale]}`} target="_blank">
            {form.consentLink}
          </Link>
          {form.consentEnd}
        </span>
      </label>
      <ErrorText id={`${id}-err`} show={invalid}>
        {form.errors.consent}
      </ErrorText>
    </>
  );
}
