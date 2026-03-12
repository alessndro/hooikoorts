# Plan: Hooikoortsvandaag.nl

## 1. Doel & scope

**Doel:** Een platform dat per provincie en per uur voorspelt hoe groot de kans op hooikoortsklachten is, op basis van drie externe datapunten. De grootste stad per provincie fungeert als representatief datapunt.

**Kernfunctionaliteit (MVP):**
- Duidelijke **dagindicatie** (bijv. “Vandaag is de kans op hooikoortsklachten groot”).
- **Uurindicatie** (pollenverwachting per uur, bijv. 08:00–22:00).
- **Provincie-selectie** (dropdown: provincie + grootste stad, bijv. “Noord-Holland – Amsterdam”).
- Weergave zoals in de screenshot: hoofdboodschap, belastingsbalk, drie pollen-categorieën (Bomen, Grassen, Onkruiden), actieve pollen-lijst, tijdlijn per uur.

**Later (niet in MVP):** Uitleg-pagina’s, provincie-pagina’s, blog, SEO-uitbreiding, monetization.

---

## 2. De “drie externe datapunten” + gekozen gratis APIs

De voorspelling is gebaseerd op **drie externe datapunten**. We zetten alle drie vanaf het begin in met de beste **gratis** APIs.

### 2a. De drie datapunten

| # | Datapunt               | Doel |
|---|------------------------|------|
| 1 | **Pollenconcentratie** | Welke pollen, hoeveel – basis voor klachtenverwachting |
| 2 | **Weer**               | Verspreiding/afbraak: wind, regen, temperatuur, vochtigheid |
| 3 | **Luchtkwaliteit**     | Fijnstof (PM10, PM2.5) versterkt luchtwegklachten |

### 2b. Gekozen gratis APIs

**Eén aanbieder voor alles: Open-Meteo** (geen API-key, gratis voor niet-commercieel gebruik, goede limits).

| Datapunt               | API | Endpoint | Wat we ophalen |
|------------------------|-----|----------|----------------|
| **1. Pollen**          | **Open-Meteo Air Quality** | `air-quality.api.open-meteo.com/v1/air-quality` | CAMS pollen-forecast per uur. Variabelen controleren in [documentatie](https://open-meteo.com/en/docs/air-quality-api) (CAMS levert o.a. tree/grass/weed pollen). Resolutie 11 km, Europa gedekt, incl. Nederland. |
| **2. Weer**            | **Open-Meteo Weather**     | `api.open-meteo.com/v1/forecast` | Per uur: temperatuur, wind (10 m), neerslag, vochtigheid, bewolking. Voor NL o.a. HARMONIE (KNMI) 2 km. |
| **3. Luchtkwaliteit**  | **Open-Meteo Air Quality** | Zelfde als pollen | Per uur: `pm10`, `pm2_5`, `european_aqi`. Zelfde request als pollen (één call voor pollen + luchtkwaliteit). |

**Pollen in de praktijk:** De Air Quality API gebruikt CAMS-data waarin pollen zit. Bij implementatie de exacte hourly-variabelen in de docs controleren (bijv. `grass_pollen`, `tree_pollen`, `weed_pollen` of fijnmaziger). Als Open-Meteo geen pollen-variabelen per type aanbiedt in de gratis API: **fallback** = [Google Pollen API](https://developers.google.com/maps/documentation/pollen) (gratis tier $200/maand, Nederland gedekt, tot 5 dagen, per uur mogelijk).

**Technisch:** Backend haalt per representatieve stad (coördinaten) **twee** requests op: (1) Weather forecast, (2) Air Quality (+ pollen). Response cachen per locatie/uur (bijv. 1 uur TTL) i.v.m. rate limits (10.000/dag gratis).

### 2c. Alternatief: als je wél ads of affiliate wilt (commercieel gebruik)

De gratis Open-Meteo API mag niet bij advertenties of affiliate. Onderstaande opties **mogen wél** commercieel gebruikt worden.

| Datapunt | Optie | Commercieel? | Opmerking |
|----------|--------|--------------|-----------|
| **Weer** | **KNMI Open Data API** | ✅ Ja (CC BY 4.0) | [KNMI Data Platform](https://developer.dataplatform.knmi.nl/open-data-api): gratis, alleen Nederland. Data is file-based (datasets/forecasts), geen simpele “uur-verwachting” REST – meer integratiewerk. |
| **Weer** | **Open-Meteo betaald** | ✅ Ja | [Standard/Professional](https://open-meteo.com/en/pricing): zelfde API als nu, maar met abonnement mag je commercieel gebruiken (ads, affiliate). Prijs op aanvraag / via Stripe. |
| **Luchtkwaliteit** | **Copernicus CAMS** | ✅ Ja | EU open data; commercieel gebruik toegestaan. Toegang vaak via CDS/ECMWF (minder kant-en-klaar dan een REST-API). |
| **Luchtkwaliteit** | **Open-Meteo betaald** | ✅ Ja | Zelfde als weer; in het betaalde plan. |
| **Pollen** | **Google Pollen API** | ✅ Ja (billing aan) | [Google Maps Platform](https://developers.google.com/maps/documentation/pollen): $200/maand gratis credit; daarboven pay-per-use. Commercieel gebruik expliciet toegestaan zodra billing is ingeschakeld. Nederland gedekt. |

**Praktische keuzes:**

- **Minste gedoe, alles commercieel:** **Open-Meteo betaald** (weer + luchtkwaliteit + evt. pollen als beschikbaar) + **Google Pollen API** (binnen $200 credit of iets erboven). Eén keer opzetten, daarna stabiel.
- **Geen abonnement voor weer/AQ:** **KNMI** (weer, NL) + **Copernicus CAMS** (luchtkwaliteit) + **Google Pollen**. Meer bouwwerk, maar de *data*-licenties staan commercieel gebruik toe; toegang is gratis (met attributie waar gevraagd).

**Let op:** WeatherAPI.com en vergelijkbare “free tier” weer-APIs staan op de gratis laag meestal **geen** commercieel gebruik toe; bij commercieel gebruik is doorgaans een betaald plan nodig.

---

## 3. Geografisch model: provincie → grootste stad

Per provincie één representatieve stad (grootste stad) gebruiken voor alle data.

| Provincie     | Grootste stad (representatief datapunt) |
|---------------|----------------------------------------|
| Noord-Holland | Amsterdam                               |
| Zuid-Holland  | Rotterdam                               |
| Utrecht       | Utrecht                                 |
| Noord-Brabant | Eindhoven                               |
| Gelderland    | Nijmegen                                |
| Overijssel    | Enschede                                |
| Groningen     | Groningen                               |
| Friesland     | Leeuwarden                              |
| Drenthe       | Emmen                                   |
| Flevoland     | Almere                                  |
| Limburg       | Maastricht                              |
| Zeeland       | Middelburg                              |

Deze mapping komt in config/constants; alle API-calls gebruiken de coördinaten van deze steden.

---

## 4. Dataflow & voorspellingslogica

1. **Input:** provincie (of stad) + datum + optie “vandaag” vs “per uur”.
2. **Backend:**  
   - Bepaal representatieve stad (bijv. Amsterdam voor Noord-Holland).  
   - Haal voor die locatie op:  
     - **Pollen + luchtkwaliteit:** 1× Open-Meteo Air Quality (pollen + pm10, pm2_5, european_aqi per uur).  
     - **Weer:** 1× Open-Meteo Weather (temperatuur, wind, neerslag, vochtigheid per uur).
3. **Aggregatie:**  
   - Combineer **pollen + weer + luchtkwaliteit** tot één score per uur (bijv. 0–100 → laag/matig/hoog/zeer hoog).  
   - Bepaal welke pollen-types “actief” zijn en welk niveau (laag/matig/hoog) uit de pollen-response.  
   - Bepaal dagniveau: bijv. maximum of gemiddelde van de uur-scores van die dag.
4. **Output naar frontend:**  
   - Dagtekst (bijv. “groot”), korte uitleg, belastingsbalk.  
   - Niveaus per categorie: Bomen, Grassen, Onkruiden.  
   - Lijst “Actieve pollen vandaag” met per type niveau of “niet actief”.  
   - Per uur: niveau (Laag/Matig/Hoog/Zeer hoog) voor de tijdlijn.

**Normen (voorbeeld, later finetunen):**  
- Laag / Matig / Hoog / Zeer hoog op basis van drempels op de gecombineerde score (en eventueel per pollen-type).

---

## 5. Frontend (homepage zoals screenshot)

- **Header:** Logo, nav (Uitleg, Provincies, Blog, Over), donkere-modus toggle, CTA “Tips & advies”.
- **Hero:** Titel “Hoe erg is hooikoorts vandaag?”, ondertitel over provincie en per uur.
- **Filters:**  
  - Locatie: dropdown “Provincie – Grootste stad” (bijv. Noord-Holland – Amsterdam).  
  - Toggle: “Vandaag” | “Per uur”.  
  - Datum: “Woensdag 11 maart 2026” (datepicker).
- **Kaart “vandaag”:**  
  - Icoon + tekst “Vandaag is de kans op hooikoortsklachten **groot**” + korte uitleg (bijv. boompollen, meer in de middag).  
  - Rechterkant: “Belasting vandaag” met gradientbalk (licht oranje → donkerrood) en label “Hoog”.
- **Kaart pollen-overzicht:**  
  - Drie cirkel-gauges: **Bomen** (bijv. Veel, rood), **Grassen** (Matig, oranje), **Onkruiden** (Laag, groen).  
  - Lijst “Actieve pollen vandaag”: per type (Berk, Els, Hazelaar, Eik, Grassen, Bijvoet, Klein glaskruid, Ambrosia) met kleur + niveau of “Niet actief”.
- **Pollenverwachting per uur:**  
  - Horizontale tijdlijn (bijv. 08:00–17:00), per uur een stip + label (Laag/Matig/Hoog/Zeer hoog).  
  - Link “Bekijk alle uren →”.
- **Kleuren:** Groen (laag), oranje (matig), rood (hoog), donkerrood (zeer hoog); grijs voor “niet actief”.

Technisch: componenten per blok, hergebruik van kleuren en typografie; responsive (mobile eerst). **Design system:** Zie **`design-tokens.json`** en **`DESIGN-SYSTEM.md`** voor één consistente stijl (Apple-achtig, modern, minimalistisch); **`tailwind.theme.extend.js`** sluit hierop aan voor Tailwind.

---

## 6. Tech stack (voorstel)

| Laag        | Keuze              | Motief |
|------------|--------------------|--------|
| Frontend   | **Next.js** (React) | SSR/SSG voor SEO later, API routes mogelijk, één codebase. |
| Styling    | **Tailwind CSS**   | Snel de kaarten, gradient en kleuren uit de screenshot nabouwen. |
| State      | React state + URL (provincie, datum, toggle) | Deelbare links, terug-knop werkt. |
| Backend    | **Next.js API routes** of aparte **Node-service** | Ophalen pollen + weer (+ derde bron), cachen per stad/uur. |
| Data/cache | **In-memory of Redis** (later) | Rate limits API’s respecteren; cache per locatie/uur (bijv. 1 uur TTL). |
| Hosting    | **Vercel** (Next.js) of **Node op VPS** | Eenvoudig deploy; env voor API-keys. |

Alternatief: alleen frontend (Next.js) met serverless functies die externen aanroepen; geen aparte database in MVP.

---

## 7. Fasering

### Fase 1 – Basis (MVP)
1. **Project setup:** Next.js, Tailwind, basislayout (header, footer), routing.
2. **Data (alle drie de datapunten):**  
   - Provincie → stad mapping + coördinaten.  
   - Open-Meteo Weather API: weer per uur voor representatieve stad.  
   - Open-Meteo Air Quality API: pollen + pm10, pm2_5, european_aqi per uur.  
   - Combinatie-logica (pollen + weer + luchtkwaliteit) → dag- en uur-niveau (laag/matig/hoog/zeer hoog).
3. **UI homepage:**  
   - Locatiedropdown, datum, toggle “Vandaag”/“Per uur”.  
   - Kaart dagindicatie + belastingsbalk.  
   - Drie gauges (Bomen/Grassen/Onkruiden) + actieve pollen-lijst.  
   - Tijdlijn per uur + “Bekijk alle uren”.
4. **Connectie:** Frontend leest van eigen API; API haalt beide Open-Meteo-endpoints op en cached waar nodig.

### Fase 2 – Uitbreiden & verfijnen
- Alle 12 provincies/steden ondersteunen.  
- Combinatie-algoritme verfijnen (drempels, gewichten pollen/weer/AQI).  
- Indien nodig: fallback Google Pollen API als Open-Meteo geen pollen-variabelen blijkt te hebben.

### Fase 3 – Content & SEO
- Pagina’s Uitleg, Provincies, Blog, Over.  
- SEO: meta, structured data (bijv. voor “pollen forecast” per regio).  
- “Tips & advies” invullen (content of link naar aparte pagina).

### Fase 4 – Monetization (later)
- Advertenties, samenwerkingen, of premium (bijv. notificaties, uitgebreide data) – buiten scope van dit plan.

---

## 8. Risico’s & afhankelijkheden

- **Pollen in Open-Meteo:** De Air Quality API vermeldt pollen; exacte hourly-variabelen (tree/grass/weed of per soort) bij implementatie in de docs controleren. Zo niet beschikbaar: **Google Pollen API** als gratis fallback ($200/maand credits).
- **Rate limits:** Open-Meteo gratis: 10.000 calls/dag. Caching per locatie/uur (bijv. 1 uur TTL) is noodzakelijk; met 12 steden en 2 calls per request blijft het binnen limits.
- **Commercieel gebruik:** De **gratis** Open-Meteo API is alleen voor **niet-commercieel** gebruik. Volgens de [Terms of Use](https://open-meteo.com/en/terms) geldt o.a. als **commercieel**: “Operating websites or apps that have **subscriptions or display advertisements**”. Dus: zodra je ads (of abonnementen) op de site hebt, mag je de gratis API niet meer gebruiken – dan is een **betaald API-abonnement** (Standard/Professional/Enterprise) nodig. Voor prototype en launch zonder ads is de free tier prima; bij monetization later overstappen op een [betaald plan](https://open-meteo.com/en/pricing).

---

## 9. Volgende stap

- **APIs:** Vastgelegd: Open-Meteo Weather + Open-Meteo Air Quality (pollen + luchtkwaliteit); bij gebrek aan pollen-variabelen → Google Pollen API (gratis tier).
- **Start bouw:** Fase 1.1 (project setup) + 1.2 (provincie/stad-config + integratie van beide Open-Meteo-APIs + combinatielogica) en daarna de UI volgens screenshot.

---

## 10. Afronding plan vóór de bouw (checklist)

Dit moet nog vaststaan of klaar zijn voordat de eerste code geschreven wordt.

### 10.1 Coördinaten provincies/steden

De API’s hebben **lat/lon** nodig. De 12 steden moeten als configuratiedata vastliggen.

- **Actie:** Eén bestand of object (bijv. `lib/regions.ts` of `data/provinces.json`) met per provincie: `id`, `name`, `city`, `latitude`, `longitude`, `timezone` (bijv. `Europe/Amsterdam`).
- Coördinaten zijn eenvoudig op te zoeken (bijv. [GeoNames](https://www.geonames.org/) of vast in het bestand zetten).

### 10.2 Combinatie-algoritme (eerste versie)

Hoe we van ruwe data naar **Laag / Matig / Hoog / Zeer hoog** gaan.

- **Input:** Per uur: pollen (indien beschikbaar), weer (neerslag, wind, temp, vochtigheid), luchtkwaliteit (pm10, pm2_5 of european_aqi).
- **Eerste aanpak (vastleggen):**  
  - Pollen domineert: hoge pollen → hogere score; geen pollen in API → tijdelijk alleen weer + AQI gebruiken (of mock “matig” voor pollen).  
  - Weer dempt: neerslag en hoge luchtvochtigheid verlagen de score.  
  - AQI versterkt: hoge PM2.5/PM10 verhoogt de score licht.  
- **Output:** Per uur een niveau (1–4 of laag/matig/hoog/zeer hoog); dagniveau = maximum van die dag (of 90e percentiel).  
- **Actie:** Drempelwaarden in code als constanten (later finetunen); geen ML in MVP.

### 10.3 Pollen in Open-Meteo Air Quality API

- **Actie (dag 1):** Eén testrequest naar de Air Quality API met `latitude`, `longitude`, `hourly=pm10,pm2_5,european_aqi` + in de docs kijken welke **pollen**-variabelen bestaan (bijv. `grass_pollen`, `tree_pollen`, `weed_pollen`).  
- **Als er wél pollen in zit:** die meenemen in combinatielogica en mapping naar Bomen/Grassen/Onkruiden.  
- **Als er géén pollen in zit:** beslissing: (A) alleen weer + AQI voor “belasting” gebruiken en pollen-gauges/lijst met mock/placeholder, of (B) direct Google Pollen API (gratis tier) toevoegen voor echte pollen.

### 10.4 Contract eigen API (backend → frontend)

Vastleggen wat onze **eigen** API (Next.js API route) teruggeeft, zodat frontend en backend hetzelfde verwachten.

- **Voorstel response (JSON):**
  - `daySummary`: `{ level: "hoog", label: "groot", description: "Vooral boompollen...", loadPercentage: 75 }`
  - `categories`: `{ trees: "veel", grasses: "matig", weeds: "laag" }`
  - `activePollen`: `[{ id: "berk", name: "Berk", level: "hoog" }, ...]`
  - `hourly`: `[{ time: "2026-03-11T13:00", level: "zeer hoog" }, ...]`
- **Actie:** Dit als TypeScript-types of OpenAPI-achtige beschrijving in de repo (bijv. `types/api.ts`).

### 10.5 Caching (MVP)

- **Keuze:** In-memory cache in de Next.js API-route (of een simpele `Map` met TTL), key = `lat,lon,date` (of provincie-id + datum). TTL = 1 uur.  
- Geen Redis of database in MVP.  
- **Actie:** Bij eerste API-route direct cache toevoegen zodat we onder 10.000 calls/dag blijven.

### 10.6 Foutafhandeling

- **Als Open-Meteo timeout of 5xx:** Niet crashen; backend retourneert 503 of een veld `error: "Data tijdelijk niet beschikbaar"`; frontend toont vriendelijke melding en evt. “Probeer het later opnieuw”.  
- **Actie:** In API-route try/catch + duidelijke foutresponse; frontend één “error state” component.

### 10.7 Design tokens (voor screenshot-look)

- **Kleuren:** Laag = groen (bijv. `#22c55e`), Matig = oranje (`#f97316`), Hoog = rood (`#ef4444`), Zeer hoog = donkerrood (`#b91c1c`), Niet actief = grijs (`#6b7280`). Gradient belastingsbalk: licht oranje → donkerrood.  
- **Actie:** Deze in Tailwind-config of CSS-variabelen (bijv. `--level-low`, `--level-moderate`, etc.) zodat alle componenten hetzelfde palet gebruiken.

### 10.8 Routes en placeholders

- **MVP:** Alleen homepage (`/`) met volledige functionaliteit.  
- **Nav-links:** Uitleg, Provincies, Blog, Over → in MVP linken naar `#` of een placeholderpagina (“Binnenkort”) zodat de nav al klopt.  
- **“Tips & advies”:** Link naar `#` of `/tips` met placeholdertekst.  
- **Actie:** Geen 404 voor deze links; simpele placeholder-pagina’s of ankers.

### 10.9 Attributie Open-Meteo

- [Licence](https://open-meteo.com/en/licence) vereist: link + credit bij getoonde data.  
- **Actie:** In footer of onder de kaart een regel: “Weer- en luchtkwaliteitsdata door [Open-Meteo.com](https://open-meteo.com/)” (of zoals in hun voorbeeld).

### 10.10 Environment / config

- Geen API-keys nodig voor gratis Open-Meteo.  
- **Actie:** Wel een `.env.example` met evt. `NEXT_PUBLIC_APP_URL=` voor later; bij overstap naar betaald Open-Meteo: `OPENMETEO_API_KEY=` toevoegen.

---

**Samenvatting:** Na invullen van 10.1 (coördinaten), 10.2 (algoritme-schets), 10.3 (pollen-check), 10.4 (API-contract) en 10.7 (design tokens) kan de bouw starten. 10.5–10.6 en 10.8–10.10 kunnen parallel in de eerste sprints meegenomen worden.
