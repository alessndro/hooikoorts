/**
 * Combinatielogica: weer + luchtkwaliteit → niveau per uur en per dag.
 * Open-Meteo levert geen pollen in de gratis API; we gebruiken AQI + weer als proxy.
 */

import type { Level } from "@/types/api";

const LEVEL_ORDER: Level[] = ["laag", "matig", "hoog", "zeer hoog"];

function scoreToLevel(score: number): Level {
  if (score <= 25) return "laag";
  if (score <= 50) return "matig";
  if (score <= 75) return "hoog";
  return "zeer hoog";
}

/**
 * Ruwe score 0–100 per uur: hogere AQI + droog weer = hogere score.
 * Neerslag en hoge luchtvochtigheid verlagen de score.
 */
export function computeHourlyScore(
  aqi: number | null,
  precipitation: number,
  relativeHumidity: number
): number {
  let score = 50;
  if (aqi != null) {
    const aqiNorm = Math.min(100, Math.max(0, aqi)) / 100;
    score += (aqiNorm - 0.5) * 40;
  }
  if (precipitation > 0) score -= Math.min(30, precipitation * 10);
  if (relativeHumidity > 80) score -= 15;
  else if (relativeHumidity > 60) score -= 5;
  return Math.max(0, Math.min(100, score));
}

/**
 * Aggregeer uur-scores voor vandaag → dagniveau (max van de dag).
 */
export function dayLevelFromHourlyScores(scores: number[]): Level {
  if (scores.length === 0) return "matig";
  const max = Math.max(...scores);
  return scoreToLevel(max);
}

/**
 * Percentage voor belastingsbalk (0–100).
 */
export function dayLoadPercentage(scores: number[]): number {
  if (scores.length === 0) return 50;
  return Math.round(Math.max(...scores));
}

/**
 * Korte beschrijving op basis van dagniveau en of er neerslag is.
 */
export function dayDescription(
  level: Level,
  hasPrecipitation: boolean,
  maxHourIndex: number | null
): string {
  if (hasPrecipitation)
    return "Neerslag kan de pollen tijdelijk verminderen. Na de regen kan de belasting weer oplopen.";
  if (level === "zeer hoog" || level === "hoog")
    return "Vooral boompollen kunnen vandaag klachten geven. In de middag neemt de belasting vaak toe.";
  if (level === "matig")
    return "Er is matige pollenactiviteit. Bij gevoeligheid kunnen lichte klachten optreden.";
  return "De pollenbelasting is laag. Gunstige dag om buiten te zijn bij hooikoorts.";
}

export function levelToLabel(level: Level): string {
  switch (level) {
    case "laag":
      return "Laag";
    case "matig":
      return "Matig";
    case "hoog":
      return "Hoog";
    case "zeer hoog":
      return "Zeer hoog";
    case "niet_actief":
      return "Niet actief";
    default:
      return level;
  }
}

export function dayLevelToKansLabel(level: Level): string {
  switch (level) {
    case "laag":
      return "klein";
    case "matig":
      return "matig";
    case "hoog":
      return "groot";
    case "zeer hoog":
      return "zeer groot";
    default:
      return "matig";
  }
}
