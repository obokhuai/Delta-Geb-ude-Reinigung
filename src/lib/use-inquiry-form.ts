"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { validatePayload, type ErrorCode, type FormKind, type FormPayload } from "./validation";

export type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "invalid" }
  | { type: "success"; name: string }
  | { type: "manual"; name: string; summary: string };

function readForm(form: HTMLFormElement, kind: FormKind, locale: string): FormPayload {
  const fd = new FormData(form);
  const get = (k: string) => (fd.get(k) as string | null)?.toString() ?? "";
  return {
    kind,
    locale,
    name: get("name").trim(),
    email: get("email").trim(),
    phone: get("phone").trim(),
    company: get("company").trim(),
    service: get("service"),
    frequency: get("frequency"),
    property: get("property"),
    size: get("size"),
    location: get("location").trim(),
    message: get("message").trim(),
    consent: fd.get("consent") === "on",
    website: get("website")
  };
}

/**
 * Validation, submission and fallback handling for the quote and contact forms.
 * `summarize` turns the payload into readable text for the copy / email fallback.
 */
export function useInquiryForm(kind: FormKind, locale: string, summarize: (p: FormPayload) => string) {
  const [errors, setErrors] = useState<Set<ErrorCode>>(new Set());
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const tried = useRef(false);

  const revalidate = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (!tried.current) return;
      setErrors(new Set(validatePayload(readForm(e.currentTarget, kind, locale))));
    },
    [kind, locale]
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      tried.current = true;
      const payload = readForm(form, kind, locale);
      const errs = validatePayload(payload);
      setErrors(new Set(errs));

      if (errs.length) {
        setStatus({ type: "invalid" });
        const first = form.querySelector<HTMLElement>(`[data-field="${errs[0]}"]`);
        first?.focus();
        return;
      }

      const firstName = payload.name.split(/\s+/)[0];
      setStatus({ type: "sending" });
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setStatus({ type: "success", name: firstName });
          form.reset();
          tried.current = false;
          return;
        }
        if (res.status === 422) {
          const data = (await res.json().catch(() => ({}))) as { errors?: ErrorCode[] };
          setErrors(new Set(data.errors ?? []));
          setStatus({ type: "invalid" });
          return;
        }
        // Email not configured, rate limited or server error: offer the direct route.
        setStatus({ type: "manual", name: firstName, summary: summarize(payload) });
      } catch {
        setStatus({ type: "manual", name: firstName, summary: summarize(payload) });
      }
    },
    [kind, locale, summarize]
  );

  return { errors, status, onSubmit, revalidate };
}
