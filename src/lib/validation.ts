/** Shared validation used by the browser forms and the API route. */

export const SERVICE_IDS = ["hotel", "house", "office", "glass", "general"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const PROPERTY_TYPES = ["apartment", "house", "office", "hotel", "commercial"] as const;
export const FREQUENCIES = ["once", "weekly", "biweekly", "monthly", "unsure"] as const;

export type FormKind = "quote" | "contact";
export type ErrorCode = "name" | "email" | "phone" | "service" | "property" | "message" | "consent";

export interface FormPayload {
  kind: FormKind;
  locale?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  frequency?: string;
  property?: string;
  size?: string;
  location?: string;
  message?: string;
  consent?: boolean;
  /** Honeypot – must stay empty */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d][\d\s()+\-/]{5,}$/;

export function validatePayload(p: FormPayload): ErrorCode[] {
  const errors: ErrorCode[] = [];
  if (!p.name || p.name.trim().length < 2 || p.name.length > 120) errors.push("name");
  if (!p.email || !EMAIL_RE.test(p.email.trim()) || p.email.length > 200) errors.push("email");
  if (p.phone && p.phone.trim() && !PHONE_RE.test(p.phone.trim())) errors.push("phone");

  if (p.kind === "quote") {
    if (!p.service || !(SERVICE_IDS as readonly string[]).includes(p.service)) errors.push("service");
    if (!p.property || !(PROPERTY_TYPES as readonly string[]).includes(p.property)) errors.push("property");
  } else if (!p.message || p.message.trim().length < 5) {
    errors.push("message");
  }
  if ((p.message?.length ?? 0) > 5000) errors.push("message");
  if (!p.consent) errors.push("consent");
  return errors;
}
