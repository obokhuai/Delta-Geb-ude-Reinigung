/**
 * Brand mark – the DELTA mark from the flyer, drawn in the site's palette:
 * petrol teal for the house and the skyline, brass for the window and the
 * sparkles, a teal gradient for the swoosh. The colours come from CSS
 * variables so the mark stays legible in the light and the dark theme.
 */
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 86) / 120}
      viewBox="0 0 120 86"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="delta-swoosh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--logo-sky)" />
          <stop offset="1" stopColor="var(--logo-navy)" />
        </linearGradient>
      </defs>

      {/* Skyline behind the house */}
      <path d="M50 18 63 4v52l-13-12z" fill="var(--logo-blue)" />
      <path d="M67 30 78 19v37l-11-9z" fill="var(--logo-navy)" opacity="0.9" />
      <path d="M82 38 91 29v27l-9-7z" fill="var(--logo-navy)" opacity="0.75" />
      <path d="M95 44 103 37v19l-8-6z" fill="var(--logo-navy)" opacity="0.6" />

      {/* Swoosh */}
      <path d="M0 78C40 62 82 54 120 64v-6C82 48 40 56 0 72z" fill="url(#delta-swoosh)" />

      {/* House */}
      <path d="M0 62 42 8l42 54H72L42 28 12 62z" fill="var(--logo-navy)" />
      <g fill="var(--logo-blue)">
        <rect x="36" y="36" width="5.4" height="5.4" rx="1" />
        <rect x="43.6" y="36" width="5.4" height="5.4" rx="1" />
        <rect x="36" y="43.6" width="5.4" height="5.4" rx="1" />
        <rect x="43.6" y="43.6" width="5.4" height="5.4" rx="1" />
      </g>

      {/* Sparkles */}
      <path d="M96 4l1.8 4.9 4.9 1.8-4.9 1.8L96 17.4l-1.8-4.9-4.9-1.8 4.9-1.8z" fill="var(--logo-blue)" />
      <path d="M108 21l1.1 3 3 1.1-3 1.1-1.1 3-1.1-3-3-1.1 3-1.1z" fill="var(--logo-blue)" />
    </svg>
  );
}
