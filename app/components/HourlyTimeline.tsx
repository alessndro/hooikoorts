"use client";

import { useMemo } from "react";
import type { HourlyItem } from "@/types/api";

const LEVEL_TEXT: Record<string, string> = {
  laag: "Laag",
  matig: "Matig",
  hoog: "Hoog",
  "zeer hoog": "Zeer hoog",
};

const LEVEL_DOT: Record<string, string> = {
  laag: "bg-low",
  matig: "bg-moderate",
  hoog: "bg-high",
  "zeer hoog": "bg-veryHigh",
};

const LEVEL_LABEL_COLOR: Record<string, string> = {
  laag: "text-low",
  matig: "text-moderate",
  hoog: "text-high",
  "zeer hoog": "text-veryHigh",
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

/** Huidige tijd in Europe/Amsterdam als YYYY-MM-DDTHH:00 (volgend uur voor aankomende verwachting) */
function getNowSlotInAmsterdam(): string {
  const now = new Date();
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const hourParts = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const y = dateParts.find((p) => p.type === "year")?.value ?? "";
  const m = dateParts.find((p) => p.type === "month")?.value ?? "";
  const d = dateParts.find((p) => p.type === "day")?.value ?? "";
  const h = hourParts.find((p) => p.type === "hour")?.value ?? "00";
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T${h.padStart(2, "0")}:00`;
}

export default function HourlyTimeline({ hourly }: { hourly: HourlyItem[] }) {
  const display = useMemo(() => {
    if (hourly.length === 0) return [];
    const nowSlot = getNowSlotInAmsterdam();
    let startIndex = hourly.findIndex((h) => h.time >= nowSlot);
    if (startIndex < 0) startIndex = 0;
    return hourly.slice(startIndex, startIndex + 12);
  }, [hourly]);

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-card overflow-x-auto">
      <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Pollenverwachting per uur</h3>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 min-w-0">
        {display.map((h) => (
          <div key={h.time} className="flex flex-col items-center shrink-0 min-w-[3.5rem] sm:min-w-[4rem]">
            <span className="text-sm text-secondary">{formatTime(h.time)}</span>
            <span className={`mt-1 h-2 w-2 rounded-full ${LEVEL_DOT[h.level] ?? "bg-inactive"}`} />
            <span className={`mt-0.5 text-xs font-medium ${LEVEL_LABEL_COLOR[h.level] ?? "text-inactive"}`}>
              {LEVEL_TEXT[h.level] ?? h.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
