/** Brand mark: a delta (Δ) with a small sparkle */
export function Logo({ size = 40, sparkle = true }: { size?: number; sparkle?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="11" fill="var(--petrol)" />
      <path d="M20 9 L31 30 H9 Z" fill="none" stroke="var(--brass)" strokeWidth="3.2" strokeLinejoin="round" />
      {sparkle && (
        <path d="M28.5 7.5 l1.1 2.4 2.4 1.1 -2.4 1.1 -1.1 2.4 -1.1-2.4 -2.4-1.1 2.4-1.1z" fill="var(--petrol-ink)" />
      )}
    </svg>
  );
}
