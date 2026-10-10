/** Brand mark: a pen nib drawing a red correction tick on a navy notebook with a yellow spine. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden className="logo-mark">
      <clipPath id="dn-tile">
        <rect x="1" y="1" width="46" height="46" rx="13" />
      </clipPath>
      <g clipPath="url(#dn-tile)">
        <rect x="1" y="1" width="46" height="46" fill="#16213E" />
        <rect x="39" y="1" width="8" height="46" fill="#FFD84D" />
        <rect x="37.5" y="1" width="1.5" height="46" fill="#0E1730" />
      </g>
      <path d="M9.5 30.5 L15 36 L19.5 31" fill="none" stroke="#E0412F" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="rotate(40 24 21)">
        <path d="M24 4 L32 18 C32.6 19.1 32.6 20.3 32 21.4 L24 36 L16 21.4 C15.4 20.3 15.4 19.1 16 18 Z" fill="#FBF8F2" />
        <path d="M24 22.5 L24 36" stroke="#16213E" strokeWidth="1.9" strokeLinecap="round" />
        <circle cx="24" cy="20.5" r="2.8" fill="#16213E" />
      </g>
    </svg>
  );
}
