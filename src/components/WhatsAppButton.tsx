import { site } from "@/config/site";
import { PhoneIcon } from "@/components/icons";

/** Floating WhatsApp chat link, stacked above the back-to-top button. */
export default function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      className="icon-btn wa-btn"
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <PhoneIcon />
    </a>
  );
}
