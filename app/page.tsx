"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LocationDateBar from "./components/LocationDateBar";
import DayAlertCard from "./components/DayAlertCard";
import PollenGauges from "./components/PollenGauges";
import ActivePollenList from "./components/ActivePollenList";
import HourlyTimeline from "./components/HourlyTimeline";
import { Glow } from "./components/ui/glow";
import { REGIONS } from "@/lib/regions";
import type { Region } from "@/lib/regions";
import type { ForecastResponse } from "@/types/api";

export default function Home() {
  const [region, setRegion] = useState<Region>(REGIONS[0]);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const dateStr = date.toISOString().slice(0, 10);
    fetch(`/api/forecast?regionId=${region.id}&date=${dateStr}`)
      .then((res) => {
        if (!res.ok) throw new Error("Data kon niet worden opgehaald");
        return res.json();
      })
      .then((json) => {
        if (json.error) throw new Error(json.message);
        setData(json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [region.id, date.toISOString().slice(0, 10)]);

  return (
    <div className="min-h-screen flex flex-col bg-page overflow-x-hidden">
      <div className="relative flex-1">
        <Header />
        <main className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 pb-8 space-y-5 sm:space-y-6">
        <Hero />
        <LocationDateBar
          region={region}
          date={date}
          onRegionChange={setRegion}
          onDateChange={setDate}
        />

        {loading && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-secondary">
            Data laden…
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-high font-medium">Data tijdelijk niet beschikbaar</p>
            <p className="mt-2 text-sm text-secondary">{error}</p>
            <p className="mt-2 text-sm text-secondary">Probeer het later opnieuw.</p>
          </div>
        )}

        {data && !loading && (
          <>
            <div className="relative min-h-[120px]">
              <div className="absolute inset-0 z-[-1] overflow-visible">
                <Glow variant="center" className="animate-glow-in h-full min-h-[120px] w-full" />
              </div>
              <div className="relative z-10">
                <DayAlertCard daySummary={data.daySummary} />
              </div>
            </div>
            <HourlyTimeline hourly={data.hourly} />
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md md:p-8 flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1 min-w-0">
                <PollenGauges categories={data.categories} />
              </div>
              <div className="md:w-72 shrink-0">
                <ActivePollenList items={data.activePollen} />
              </div>
            </div>
          </>
        )}

        <section className="pt-8 max-w-2xl mx-auto text-sm text-secondary md:text-base text-center" aria-label="Over de pollenverwachting">
          <p>
            Op Hooikoortsvandaag.nl zie je de <strong className="text-primary">pollenverwachting vandaag</strong> voor heel Nederland.
            Zijn er pollen vandaag? De actuele <strong className="text-primary">hooikoorts radar</strong> en pollenmeting tonen per regio en per uur hoe hoog de pollenbelasting is,
            zodat je je dag kunt plannen en klachten kunt beperken.
          </p>
        </section>
        <footer className="pt-8 pb-4 text-center text-sm text-secondary">
          Weer- en luchtkwaliteitsdata door{" "}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            Open-Meteo.com
          </a>
        </footer>
      </main>
      </div>
    </div>
  );
}
