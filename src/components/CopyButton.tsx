"use client";

import { useState } from "react";

interface Props {
  text: string;
  label: string;
  doneLabel: string;
  failedLabel: string;
  className?: string;
}

export default function CopyButton({ text, label, doneLabel, failedLabel, className = "copy-btn" }: Props) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {state === "done" ? `✓ ${doneLabel}` : state === "failed" ? failedLabel : label}
    </button>
  );
}
