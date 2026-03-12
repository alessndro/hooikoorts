/**
 * Contract voor onze eigen forecast-API (backend → frontend).
 */

export type Level = "laag" | "matig" | "hoog" | "zeer hoog" | "niet_actief";

export interface DaySummary {
  level: Level;
  label: string;
  description: string;
  loadPercentage: number;
}

export interface Categories {
  trees: "laag" | "matig" | "hoog" | "zeer hoog";
  grasses: "laag" | "matig" | "hoog" | "zeer hoog";
  weeds: "laag" | "matig" | "hoog" | "zeer hoog";
}

export interface ActivePollenItem {
  id: string;
  name: string;
  level: Level;
}

export interface HourlyItem {
  time: string;
  level: Level;
}

export interface ForecastResponse {
  daySummary: DaySummary;
  categories: Categories;
  activePollen: ActivePollenItem[];
  hourly: HourlyItem[];
  regionId: string;
  date: string;
}

export interface ForecastError {
  error: true;
  message: string;
}
