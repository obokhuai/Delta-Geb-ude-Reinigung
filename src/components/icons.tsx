import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></Icon>
);
export const MailIcon = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>
);
export const PinIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></Icon>
);
export const ArrowIcon = (p: IconProps) => <Icon strokeWidth={2.2} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
export const CheckIcon = (p: IconProps) => <Icon strokeWidth={2.4} {...p}><path d="m5 12 5 5L20 7" /></Icon>;
export const MoonIcon = (p: IconProps) => <Icon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Icon>;
export const SunIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
);
export const MenuIcon = (p: IconProps) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>;
export const CloseIcon = (p: IconProps) => <Icon strokeWidth={2.4} {...p}><path d="M6 6l12 12M18 6 6 18" /></Icon>;
export const ExternalIcon = (p: IconProps) => <Icon {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Icon>;
/** WhatsApp glyph – filled, unlike the other line icons. */
export const WhatsAppIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M12.04 2c-5.46 0-9.9 4.45-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.83 9.83 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.17 8.17 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.06 0 1.22.89 2.39 1.01 2.56.12.16 1.74 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
  </svg>
);

/* Value icons (About section) */export const ClipboardCheckIcon = (p: IconProps) => (
  <Icon {...p}><path d="M20 7H4M16 3v4M8 3v4" /><rect x="3" y="5" width="18" height="16" rx="2" /><path d="m9 14 2 2 4-4" /></Icon>
);
export const ClockIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
export const SearchIcon = (p: IconProps) => <Icon {...p}><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></Icon>;
export const ThumbIcon = (p: IconProps) => (
  <Icon {...p}><path d="M7 11v9H4v-9zM7 11l4-8a2 2 0 0 1 3 2l-1 5h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7" /></Icon>
);

/* Service icons (from the DELTA flyer) */
export const BucketMopIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 12h8l-1 8H4z" />
    <path d="M2 9.5h10" />
    <path d="M16 3.5 10.5 9" />
    <path d="M8.5 11h4.5l-1.2 4H9.7z" />
  </Icon>
);
export const VacuumIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 15.5A5.5 5.5 0 0 1 9 10h1.5a5.5 5.5 0 0 1 5.5 5.5V20h-13z" />
    <path d="M16 14.5 20 10" />
    <path d="m18.5 7.5 4 4" />
    <circle cx="7" cy="17" r="1.6" />
  </Icon>
);
export const FaxIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 9V3h10v6" />
    <path d="M6.5 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.5" />
    <rect x="7" y="14" width="10" height="7" rx="1" />
    <path d="M17.5 11.5h.01" />
  </Icon>
);
