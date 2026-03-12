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

export default function LocationDateBar({ region, date, onRegionChange, onDateChange }: LocationDateBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-primary shadow-card text-sm font-medium min-w-[200px]">
        <LocationIcon className="w-5 h-5 text-secondary" />
        <select
          value={region.id}
          onChange={(e) => {
            const r = REGIONS.find((x) => x.id === e.target.value);
            if (r) onRegionChange(r);
          }}
          className="bg-transparent font-medium text-primary cursor-pointer border-0 p-0 focus:ring-0 focus:outline-none min-w-0 flex-1"
          aria-label="Kies provincie"
        >
          {REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-secondary text-sm shadow-card">
        <DateIcon className="w-5 h-5 text-secondary shrink-0" />
        <span>{formatDate(date)}</span>
      </div>
    </div>
  );
}
