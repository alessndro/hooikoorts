import { NextRequest } from "next/server";
import { getRegionById } from "@/lib/regions";
import {
  computeHourlyScore,
  dayLevelFromHourlyScores,
  dayLoadPercentage,
  dayDescription,
  dayLevelToKansLabel,
} from "@/lib/forecast";
import type { ForecastResponse, ActivePollenItem, HourlyItem } from "@/types/api";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL = "https://air-quality.api.open-meteo.com/v1/air-quality";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 uur
const cache = new Map<string, { data: ForecastResponse; ts: number }>();

function cacheKey(regionId: string, date: string): string {
  return `${regionId}:${date}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get("regionId") ?? "noord-holland";
  const dateParam = searchParams.get("date");
  const region = getRegionById(regionId);
  if (!region) {
    return Response.json({ error: true, message: "Regio niet gevonden" }, { status: 400 });
  }

  const date = dateParam ? new Date(dateParam) : new Date();
  const dateStr = date.toISOString().slice(0, 10);

  const key = cacheKey(regionId, dateStr);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return Response.json(cached.data);
  }

  try {
    // Gebruik forecast_days (Air Quality API ondersteunt geen start_date/end_date)
    const weatherRes = await fetch(
      `${WEATHER_URL}?latitude=${region.latitude}&longitude=${region.longitude}&forecast_days=3&hourly=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m&timezone=${region.timezone}`
    );

    if (!weatherRes.ok) {
      return Response.json(
        { error: true, message: "Kon weersdata niet ophalen" },
        { status: 502 }
      );
    }

    const weather = await weatherRes.json();
    if (weather.error) {
      return Response.json(
        { error: true, message: weather.reason ?? "Weer-API fout" },
        { status: 502 }
      );
    }

    let allAqi: (number | null)[] = [];
    const aqRes = await fetch(
      `${AIR_QUALITY_URL}?latitude=${region.latitude}&longitude=${region.longitude}&forecast_days=3&hourly=pm10,pm2_5,european_aqi&timezone=${region.timezone}`
    ).catch(() => null);

    if (aqRes?.ok) {
      const aq = await aqRes.json();
      if (!aq.error) allAqi = aq.hourly?.european_aqi ?? [];
    }
    // Als luchtkwaliteit faalt: doorgaan met alleen weer (AQI blijft leeg, score dan meer op neerslag/vocht)

    const allTimes = weather.hourly?.time ?? [];
    const allPrecipitation = weather.hourly?.precipitation ?? [];
    const allHumidity = weather.hourly?.relative_humidity_2m ?? [];
    if (allAqi.length === 0 && allTimes.length > 0) {
      allAqi = Array(allTimes.length).fill(null);
    }

    // Gevraagde dag + volgende dag, zodat "aankomende 12 uur" ook over middernacht kan (bijv. 21:00 → 21,22,23,00,01,…,08)
    const nextDate = new Date(date.getTime());
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateStr = nextDate.toISOString().slice(0, 10);

    let indices: number[] = [];
    for (let i = 0; i < allTimes.length; i++) {
      const t = String(allTimes[i]);
      if (t.startsWith(dateStr) || t.startsWith(nextDateStr)) indices.push(i);
    }
    if (indices.length === 0) {
      indices = Array.from({ length: Math.min(48, allTimes.length) }, (_, i) => i);
    }

    const times = indices.map((i) => allTimes[i]);
    const precipitation = indices.map((i) => allPrecipitation[i] ?? 0);
    const humidity = indices.map((i) => allHumidity[i] ?? 70);
    const aqi = indices.map((i) => allAqi[i] ?? null);

    const scores: number[] = [];
    let maxScore = 0;
    let maxHourIndex: number | null = null;
    let hasPrecipitation = false;

    for (let i = 0; i < times.length; i++) {
      const p = precipitation[i] ?? 0;
      if (p > 0) hasPrecipitation = true;
      const score = computeHourlyScore(
        aqi[i] ?? null,
        p,
        humidity[i] ?? 70
      );
      scores.push(score);
      if (score > maxScore) {
        maxScore = score;
        maxHourIndex = i;
      }
    }

    // Dagconclusie alleen op basis van de gevraagde dag (eerste 24 uur)
    const dayScores = scores.slice(0, 24);
    const dayLevel = dayLevelFromHourlyScores(dayScores);
    const loadPct = dayLoadPercentage(dayScores);
    const description = dayDescription(dayLevel, hasPrecipitation, maxHourIndex !== null && maxHourIndex < 24 ? maxHourIndex : null);

    const hourly: HourlyItem[] = times.map((t: string, i: number) => ({
      time: t,
      level:
        scores[i] <= 25 ? "laag" : scores[i] <= 50 ? "matig" : scores[i] <= 75 ? "hoog" : "zeer hoog",
    }));

    const activePollen: ActivePollenItem[] = [
      { id: "berk", name: "Berk", level: dayLevel === "hoog" || dayLevel === "zeer hoog" ? "hoog" : dayLevel === "matig" ? "matig" : "laag" },
      { id: "els", name: "Els", level: dayLevel === "hoog" || dayLevel === "zeer hoog" ? "hoog" : dayLevel === "matig" ? "matig" : "laag" },
      { id: "hazelaar", name: "Hazelaar", level: dayLevel === "matig" || dayLevel === "hoog" ? "matig" : "laag" },
      { id: "eik", name: "Eik", level: "laag" },
      { id: "grassen", name: "Grassen", level: dayLevel === "matig" ? "matig" : "laag" },
      { id: "bijvoet", name: "Bijvoet", level: "laag" },
      { id: "klein-glaskruid", name: "Klein Glaskruid", level: "laag" },
      { id: "ambrosia", name: "Ambrosia", level: "niet_actief" },
    ];

    const categories = {
      trees: (dayLevel === "zeer hoog" || dayLevel === "hoog" ? "hoog" : dayLevel === "matig" ? "matig" : "laag") as "laag" | "matig" | "hoog" | "zeer hoog",
      grasses: (dayLevel === "matig" || dayLevel === "hoog" ? "matig" : "laag") as "laag" | "matig" | "hoog" | "zeer hoog",
      weeds: "laag" as const,
    };

    const data: ForecastResponse = {
      daySummary: {
        level: dayLevel,
        label: dayLevelToKansLabel(dayLevel),
        description,
        loadPercentage: loadPct,
      },
      categories,
      activePollen,
      hourly,
      regionId,
      date: dateStr,
    };

    cache.set(key, { data, ts: Date.now() });
    return Response.json(data);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: true, message: "Data tijdelijk niet beschikbaar" },
      { status: 503 }
    );
  }
}
