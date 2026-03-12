/**
 * Provincies en representatieve steden (grootste stad per provincie).
 * Coördinaten voor Open-Meteo API-calls; timezone Europe/Amsterdam voor heel NL.
 */

export interface Region {
  id: string;
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export const REGIONS: Region[] = [
  { id: "noord-holland", name: "Noord-Holland", city: "Amsterdam", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam" },
  { id: "zuid-holland", name: "Zuid-Holland", city: "Rotterdam", latitude: 51.9225, longitude: 4.4792, timezone: "Europe/Amsterdam" },
  { id: "utrecht", name: "Utrecht", city: "Utrecht", latitude: 52.0907, longitude: 5.1214, timezone: "Europe/Amsterdam" },
  { id: "noord-brabant", name: "Noord-Brabant", city: "Eindhoven", latitude: 51.4416, longitude: 5.4697, timezone: "Europe/Amsterdam" },
  { id: "gelderland", name: "Gelderland", city: "Nijmegen", latitude: 51.8425, longitude: 5.8532, timezone: "Europe/Amsterdam" },
  { id: "overijssel", name: "Overijssel", city: "Enschede", latitude: 52.2215, longitude: 6.8937, timezone: "Europe/Amsterdam" },
  { id: "groningen", name: "Groningen", city: "Groningen", latitude: 53.2194, longitude: 6.5665, timezone: "Europe/Amsterdam" },
  { id: "friesland", name: "Friesland", city: "Leeuwarden", latitude: 53.2012, longitude: 5.7999, timezone: "Europe/Amsterdam" },
  { id: "drenthe", name: "Drenthe", city: "Emmen", latitude: 52.7792, longitude: 6.8958, timezone: "Europe/Amsterdam" },
  { id: "flevoland", name: "Flevoland", city: "Almere", latitude: 52.3508, longitude: 5.2647, timezone: "Europe/Amsterdam" },
  { id: "limburg", name: "Limburg", city: "Maastricht", latitude: 50.8514, longitude: 5.6910, timezone: "Europe/Amsterdam" },
  { id: "zeeland", name: "Zeeland", city: "Middelburg", latitude: 51.4988, longitude: 3.6110, timezone: "Europe/Amsterdam" },
];

export function getRegionById(id: string): Region | undefined {
  return REGIONS.find((r) => r.id === id);
}

export function getRegionLabel(region: Region): string {
  return `${region.name} - ${region.city}`;
}
