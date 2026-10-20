import { site } from "@/config/site";
import { PhoneIcon } from "@/components/icons";

/** Floating direct-call (tel:) button, left of the WhatsApp button. */
export default function CallButton({ label }: { label: string }) {
  return (
    <a
      className="icon-btn call-btn"
      href={site.phone.href}
      aria-label={label}
    >
      <PhoneIcon />
    </a>
  );
}
