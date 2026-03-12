import type { Categories } from "@/types/api";

const CATEGORY_CONFIG = [
  { key: "trees" as const, label: "Bomen", icon: "🌳" },
  { key: "grasses" as const, label: "Grassen", icon: "🌾" },
  { key: "weeds" as const, label: "Onkruiden", icon: "🌿" },
];

const LEVEL_LABEL: Record<string, string> = {
  laag: "Laag",
  matig: "Matig",
  hoog: "Veel",
  "zeer hoog": "Zeer veel",
};

/** Cirkel gevuld: laag 1/3, matig 2/3, hoog/zeer hoog 3/3 */
const LEVEL_FILL_DEG: Record<string, number> = {
  laag: 120,   // 1/3
  matig: 240,  // 2/3
  hoog: 360,
  "zeer hoog": 360,
};

const LEVEL_COLOR_VAR: Record<string, string> = {
  laag: "var(--low)",
  matig: "var(--moderate)",
  hoog: "var(--high)",
  "zeer hoog": "var(--veryHigh)",
};

const LEVEL_TEXT: Record<string, string> = {
  laag: "text-low",
  matig: "text-moderate",
  hoog: "text-high",
  "zeer hoog": "text-veryHigh",
};

const BG_GRAY = "#e5e5e5";

export default function PollenGauges({ categories }: { categories: Categories }) {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-primary mb-1">Bomen, grassen en onkruiden</h3>
      <p className="text-sm text-secondary mb-4 sm:mb-6">De pollenbelasting per categorie vandaag.</p>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
      {CATEGORY_CONFIG.map(({ key, label, icon }) => {
        const level = categories[key];
        const deg = LEVEL_FILL_DEG[level] ?? 240;
        const color = LEVEL_COLOR_VAR[level] ?? "var(--moderate)";
        const textClass = LEVEL_TEXT[level] ?? "text-moderate";
        const conicGradient = `conic-gradient(from 0deg, ${color} 0deg, ${color} ${deg}deg, ${BG_GRAY} ${deg}deg, ${BG_GRAY} 360deg)`;
        return (
          <div key={key} className="flex flex-col items-center">
            <div
              className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full"
              style={{ background: conicGradient }}
            >
              <span className="absolute inset-[8px] sm:inset-[10px] flex items-center justify-center rounded-full bg-card text-xl sm:text-2xl">
                {icon}
              </span>
            </div>
            <p className="mt-2 font-semibold text-primary">{label}</p>
            <p className={`text-sm font-medium ${textClass}`}>{LEVEL_LABEL[level] ?? level}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
}
