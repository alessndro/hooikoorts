import type { DaySummary } from "@/types/api";
import { ConclusionIcon } from "./icons";

const LEVEL_COLOR: Record<string, string> = {
  laag: "text-low",
  matig: "text-moderate",
  hoog: "text-high",
  "zeer hoog": "text-veryHigh",
};

export default function DayAlertCard({ daySummary }: { daySummary: DaySummary }) {
  const colorClass = LEVEL_COLOR[daySummary.level] ?? "text-moderate";
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-conclusion md:p-8 flex flex-col md:flex-row md:items-center justify-center gap-6 text-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <ConclusionIcon level={daySummary.level as "laag" | "matig" | "hoog" | "zeer hoog"} className="w-10 h-10 md:w-12 md:h-12 shrink-0" />
          <div>
            <p className="text-xl font-bold leading-snug text-primary md:text-2xl">
              Vandaag is de kans op hooikoortsklachten{" "}
              <span className={colorClass}>{daySummary.label}</span>.
            </p>
            <p className="mt-3 text-sm text-secondary md:text-base">{daySummary.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
