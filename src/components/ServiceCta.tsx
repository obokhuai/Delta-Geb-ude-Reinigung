import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pagePath } from "@/i18n/config";

/**
 * Link to the quote page. The service is carried in the URL (?service=…) so the
 * form can pre-select it – that also works when the link is opened in a new tab.
 */
export default function ServiceCta({ service, label, locale }: { service: string; label: string; locale: Locale }) {
  return (
    <Link className="btn btn-ghost btn-small" href={`${pagePath(locale, "quote")}?service=${encodeURIComponent(service)}`}>
      {label}
    </Link>
  );
}
