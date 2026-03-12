import type { ActivePollenItem } from "@/types/api";

const LEVEL_TEXT: Record<string, string> = {
  laag: "Laag",
  matig: "Matig",
  hoog: "Hoog",
  "zeer hoog": "Zeer hoog",
  niet_actief: "Niet actief",
};

const LEVEL_DOT: Record<string, string> = {
  laag: "bg-low",
  matig: "bg-moderate",
  hoog: "bg-high",
  "zeer hoog": "bg-veryHigh",
  niet_actief: "bg-inactive",
};

const LEVEL_LABEL_COLOR: Record<string, string> = {
  laag: "text-low",
  matig: "text-moderate",
  hoog: "text-high",
  "zeer hoog": "text-veryHigh",
  niet_actief: "text-inactive",
};

export default function ActivePollenList({ items }: { items: ActivePollenItem[] }) {
  return (
    <div className="pt-6 md:pt-0 md:pl-8 md:border-l border-border">
      <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Actieve pollen vandaag</h3>
      <ul className="space-y-2 sm:space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-2 min-h-[44px] sm:min-h-0">
            <span className={`h-2 w-2 rounded-full shrink-0 ${LEVEL_DOT[item.level] ?? "bg-inactive"}`} />
            <span className="text-primary flex-1">{item.name}</span>
            <span className={`text-sm font-medium ${LEVEL_LABEL_COLOR[item.level] ?? "text-inactive"}`}>
              {LEVEL_TEXT[item.level] ?? item.level}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
