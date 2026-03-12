/**
 * Shared SVG icons voor logo, conclusie, locatie en datum.
 */

const iconClass = "shrink-0";

const LOGO_COLORS = {
  green: "#16a34a",   /* low */
  orange: "#f97316",  /* moderate */
  red: "#ef4444",     /* high */
  amber: "#ea580c",   /* highlight muted */
  darkRed: "#b91c1c", /* veryHigh */
};

export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={`${iconClass} ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Leuk pollen-logo met kleuren: bloem met gekleurde blaadjes + gele kern */}
      <defs>
        <linearGradient id="hooikoortsvandaag-logo-kern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* 6 blaadjes in groen, oranje, rood */}
      <ellipse cx="20" cy="8" rx="6" ry="8" fill={LOGO_COLORS.green} />
      <ellipse cx="20" cy="32" rx="6" ry="8" fill={LOGO_COLORS.green} />
      <ellipse cx="8" cy="20" rx="8" ry="6" fill={LOGO_COLORS.orange} />
      <ellipse cx="32" cy="20" rx="8" ry="6" fill={LOGO_COLORS.orange} />
      <ellipse cx="11" cy="11" rx="8" ry="6" fill={LOGO_COLORS.red} transform="rotate(-45 11 11)" />
      <ellipse cx="29" cy="29" rx="8" ry="6" fill={LOGO_COLORS.red} transform="rotate(-45 29 29)" />
      {/* Gele kern */}
      <circle cx="20" cy="20" r="6" fill="url(#hooikoortsvandaag-logo-kern)" />
      <circle cx="20" cy="20" r="3" fill="#fef3c7" />
    </svg>
  );
}

const LEVEL_COLORS: Record<string, string> = {
  laag: "#16a34a",
  matig: "#f97316",
  hoog: "#ef4444",
  "zeer hoog": "#b91c1c",
};

export function ConclusionIcon({
  level = "matig",
  className = "w-10 h-10 md:w-12 md:h-12",
}: {
  level?: "laag" | "matig" | "hoog" | "zeer hoog";
  className?: string;
}) {
  const color = LEVEL_COLORS[level] ?? LEVEL_COLORS.matig;
  return (
    <svg
      className={`${iconClass} ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Conclusie: vinkje in kleur van niveau (groen/oranje/rood/zwaar rood) */}
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="3" fill="none" />
      <path
        d="M14 24l7 7 13-14"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`${iconClass} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function DateIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`${iconClass} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function MoonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`${iconClass} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function SunIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`${iconClass} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
