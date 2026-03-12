"use client";

import { REGIONS } from "@/lib/regions";
import type { Region } from "@/lib/regions";
import { LocationIcon, DateIcon } from "./icons";

const WEEKDAY = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
const MONTH = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

function formatDate(d: Date): string {
  return `${WEEKDAY[d.getDay()]} ${d.getDate()} ${MONTH[d.getMonth()]} ${d.getFullYear()}`;
}

interface LocationDateBarProps {
  region: Region;
  date: Date;
  onRegionChange: (region: Region) => void;
  onDateChange: (date: Date) => void;
}

export default function LocationDateBar({ region, date, onRegionChange }: LocationDateBarProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-6xl mx-auto px-4 -mt-1">
      <p className="flex items-center gap-2 text-base font-medium text-primary" aria-live="polite">
        <DateIcon className="w-5 h-5 shrink-0 text-secondary" />
        <span>{formatDate(date)}</span>
      </p>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 sm:px-4 sm:py-3 text-primary shadow-card text-sm font-medium w-full min-w-0 sm:min-w-[200px] sm:w-auto max-w-[280px] sm:max-w-none">
        <LocationIcon className="w-5 h-5 text-secondary shrink-0" />
        <select
          value={region.id}
          onChange={(e) => {
            const r = REGIONS.find((x) => x.id === e.target.value);
            if (r) onRegionChange(r);
          }}
          className="bg-transparent font-medium text-primary cursor-pointer border-0 p-0 focus:ring-0 focus:outline-none min-w-0 flex-1 text-center sm:text-left"
          aria-label="Kies provincie"
        >
          {REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
