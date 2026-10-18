import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/config/site";
import de from "@/i18n/dictionaries/de";
import { validatePayload, type FormPayload } from "@/lib/validation";

export const runtime = "nodejs";

/* Simple in-memory rate limit: 5 requests per IP per 10 minutes.
   For multi-instance hosting, replace with a shared store (e.g. Redis/Upstash). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function clean(v: unknown, max = 500) {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function buildText(p: FormPayload) {
  const f = de.form;
  const s = de.services.items;
  const lines: string[] = [
    `${p.kind === "quote" ? f.subjects.quote : f.subjects.contact} über die Website`,
    "",
    `${f.name}: ${p.name}`
  ];
  if (p.company) lines.push(`Firma: ${p.company}`);
  lines.push(`${f.email}: ${p.email}`);
  if (p.phone) lines.push(`${f.phone}: ${p.phone}`);
  if (p.kind === "quote") {
    if (p.service) lines.push(`${f.service}: ${s[p.service as keyof typeof s]?.title ?? p.service}`);
    if (p.frequency) lines.push(`${f.frequency}: ${f.frequencies[p.frequency as keyof typeof f.frequencies] ?? p.frequency}`);
    if (p.property) lines.push(`${f.property}: ${f.properties[p.property as keyof typeof f.properties] ?? p.property}`);
    if (p.size) lines.push(`${f.size}: ${p.size}`);
    if (p.location) lines.push(`${f.location}: ${p.location}`);
  }
  lines.push(`Sprache der Website: ${p.locale === "en" ? "Englisch" : "Deutsch"}`);
  if (p.message) lines.push("", `${f.message}:`, p.message);
  lines.push("", "Einwilligung zur Datenverarbeitung: erteilt", `Gesendet: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`);
  return lines.join("\n");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const payload: FormPayload = {
    kind: body.kind === "quote" ? "quote" : "contact",
    locale: clean(body.locale, 5),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    company: clean(body.company, 120),
    service: clean(body.service, 20),
    frequency: clean(body.frequency, 20),
    property: clean(body.property, 20),
    size: clean(body.size, 10),
    location: clean(body.location, 120),
    message: typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "",
    consent: body.consent === true
  };

  const errors = validatePayload(payload);
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!SMTP_HOST) {
    console.warn("[contact] SMTP_HOST is not set – form submission not delivered.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === "true",
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
    });

    const subjectBase = payload.kind === "quote" ? de.form.subjects.quote : de.form.subjects.contact;
    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER || site.email,
      to: CONTACT_TO || site.email,
      replyTo: { name: payload.name, address: payload.email },
      subject: `${subjectBase}: ${payload.name}`,
      text: buildText(payload)
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
