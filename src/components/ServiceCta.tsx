"use client";

export const SERVICE_EVENT = "delta:select-service";

/** Link to the quote form that pre-selects the given service. */
export default function ServiceCta({ service, label }: { service: string; label: string }) {
  return (
    <a
      className="btn btn-ghost btn-small"
      href="#quote"
      onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: service }))}
    >
      {label}
    </a>
  );
}
