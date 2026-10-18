"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/de";
import type { Status } from "@/lib/use-inquiry-form";
import { site } from "@/config/site";
import CopyButton from "./CopyButton";

interface Props {
  status: Status;
  subject: string;
  form: Dictionary["form"];
  copy: Dictionary["copy"];
}

export default function FormStatus({ status, subject, form, copy }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status.type === "success" || status.type === "manual") {
      ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [status]);

  let content: React.ReactNode = null;
  if (status.type === "invalid") {
    content = (
      <div className="notice bad">
        <strong>{form.errors.summary}</strong>
      </div>
    );
  } else if (status.type === "success") {
    content = (
      <div className="notice ok">
        <strong>{form.success.title.replace("{name}", status.name)}</strong>
        <span>{form.success.text}</span>
      </div>
    );
  } else if (status.type === "manual") {
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(status.summary)}`;
    content = (
      <div className="notice warn">
        <strong>{form.manual.title.replace("{name}", status.name)}</strong>
        <span>{form.manual.text}</span>
        <span>
          <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={site.phone.href}>{site.phone.display}</a>
        </span>
        <div className="row">
          <CopyButton
            text={status.summary}
            label={form.manual.copy}
            doneLabel={copy.done}
            failedLabel={copy.failed}
            className="btn btn-primary btn-small"
          />
          <a className="btn btn-ghost btn-small" href={mailto}>
            {form.manual.mail}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} aria-live="polite">
      {content}
    </div>
  );
}
