# Design system — Hooikoortsvandaag.nl

Moderne, minimalistische stijl in de lijn van Apple: veel witruimte, zachte schaduwen, ronde hoeken, rustig kleurpalet met duidelijke accenten voor data. **Eén bron voor alle styling:** `design-tokens.json`.

---

## 1. Bron: design tokens

Alle waarden (kleur, typografie, spacing, schaduw, radius) staan in **`design-tokens.json`**. Gebruik deze tokens overal (Tailwind-config, CSS-variabelen of componenten) zodat de hele site er hetzelfde uitziet.

- **Kleuren:** `color.background`, `color.surface`, `color.text`, `color.level`, `color.accent`, `color.gradient.loadBar`
- **Typografie:** `typography.scale`, `typography.weight`, `typography.lineHeight`, `typography.fontFamily`
- **Spacing:** `spacing` (4px-grid)
- **Radius:** `radius` (sm/md/lg/xl/2xl)
- **Schaduw:** `shadow` (sm / DEFAULT / md / lg)
- **Hiërarchie:** `hierarchy.primary` t/m `hierarchy.quaternary` (zie hieronder)

---

## 2. Theorie: waarom deze keuzes

### 2.1 Typografie — modular scale

We gebruiken een **modulaire schaal** (ratio 1,25 — “Major Third”) vanaf 16px. Dat geeft:

- **Harmonie:** Verhoudingen kloppen onderling (niet willekeurige pixelgroottes).
- **Hiërarchie:** Elke stap voelt duidelijk sterker of zwakker (ideaal voor headline → body → caption).
- **Consistentie:** Elke tekstgrootte komt uit dezelfde schaal.

Bron: o.a. [Building a Type Scale for Design Systems](https://fontfyi.com/blog/building-type-scale-design-system/), [Modular Scale](https://www.modularscale.com/). Voor UI worden ratio’s rond 1,2–1,333 aanbevolen; 1,25 is een veilige, duidelijke keuze.

### 2.2 Apple-achtige principes

- **Minder is meer:** Geen overbodige elementen, geen drukke banners of pop-ups. Alleen wat nodig is om “hoe erg is hooikoorts vandaag?” te beantwoorden.
- **Witruimte:** Veel ruimte tussen blokken (macro) en binnen teksten (micro). Dat vermindert cognitieve belasting en laat de interface “ademen”.
- **Clarity & deference:** De content (de verwachting) staat centraal; de UI ondersteunt, concurreert niet.
- **Zachte schaduwen en ronde hoeken:** Diepte en vriendelijkheid zonder zware “3D”-effecten.

Bron: o.a. [4 Website UX Design Takeaways from Apple](https://marketing.sfgate.com/blog/4-website-ux-design-takeaways-we-can-all-learn-from-apple), [Whitespace](https://thoughtbot.com/blog/whitespace), Apple Human Interface Guidelines (clarity, deference, depth).

### 2.3 Visuele hiërarchie — F- en Z-patroon

- **F-patroon:** Bij veel tekst scannen gebruikers eerst horizontaal bovenaan, dan een tweede regel, dan verticaal links. Belangrijkste boodschap dus **boven en links**.
- **Z-patroon:** Bij meer visuele/landing-achtige pagina’s: van linksboven naar rechtsboven, diagonaal omlaag, dan linksonder naar rechtsonder. Ideaal voor één duidelijke hoofdvraag + antwoord + CTA.

Onze homepage is een mix: één hoofdvraag (“Hoe erg is hooikoorts vandaag?”) en één hoofdboodschap (de kaart “kans is groot” + belasting). Die horen **primair** te zijn (groot, vet, eventueel accentkleur). Daarna volgen controles (locatie, datum) en samenvatting (gauges), dan detail (actieve pollen, per uur).

Bron: [F-Shaped Pattern (NN/g)](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/), [Z-Pattern](https://medium.com/@gsanjeekumar/how-users-actually-see-your-design-understanding-the-z-pattern-and-f-pattern-871e229b8fae).

---

## 3. Gewicht van elementen (hoe zwaar iets weegt)

In `design-tokens.json` staat onder **`hierarchy`** welke rol elk niveau heeft en welke typografie daarbij hoort. Op de eerste pagina gelden onderstaande toewijzingen.

| Niveau        | Gewicht  | Elementen op de homepage | Typo (uit tokens) | Gebruik |
|---------------|----------|---------------------------|--------------------|--------|
| **Primary**   | Zwaarst  | Hero-titel “Hoe erg is hooikoorts **vandaag**?”; kaarttekst “kans op hooikoortsklachten **groot**”; severity-label “Hoog” + belastingsbalk | 3xl, bold, tight; accentkleur voor “vandaag” en “groot” | Eerste wat iemand ziet; antwoord op de hoofdvraag. |
| **Secondary** | Zwaar    | Locatie- en datumkiezer; de drie gauges (Bomen/Grassen/Onkruiden); kop “Belasting vandaag” | lg, semibold, snug | Actie (waar/wanneer) en snelle samenvatting (drie categorieën + belasting). |
| **Tertiary**  | Medium   | Lijst “Actieve pollen vandaag”; blok “Pollenverwachting per uur”; korte uitleg (“Vooral boompollen…”) | base, medium, normal | Detail voor wie meer wil weten. |
| **Quaternary**| Licht    | Nav (Uitleg, Provincies, Blog, Over); ondertitel onder hero; “Bekijk alle uren →”; footer/attributie | sm, normal; text.secondary | Aanwezig maar niet concurrerend met de hoofdboodschap. |

**Regel:** Niets op de pagina mag visueel zwaarder zijn dan de **primary**-elementen (behalve bewust één CTA zoals “Tips & advies”). Knoppen en links kunnen opvallend zijn door contrast (bijv. achtergrondkleur), maar typografisch blijven ze onder de hero en de main alert.

---

## 4. Toepassing in de praktijk

### 4.1 Kleuren

- **Achtergrond pagina:** `color.background.page` → off-white.
- **Kaarten/inputs:** `color.surface.card` / `color.surface.input` → wit.
- **Tekst:** `text.primary` voor headlines en belangrijke copy, `text.secondary` voor body, `text.tertiary` voor captions.
- **Severiteit:** Altijd `color.level.low` (laag), `moderate`, `high`, `veryHigh`, `inactive` (niet actief). Geen andere kleuren voor deze betekenissen.
- **Accent (alleen voor nadruk, niet voor niveau):** `color.accent.highlight` voor “vandaag” en “groot” in de hero/alert.

### 4.2 Typografie

- Gebruik de **scale** (xs t/m 4xl) en **weight** (normal/medium/semibold/bold) uit de tokens. Geen ad-hoc font-sizes.
- **Primary:** groot (3xl), bold, regelafstand tight.
- **Secondary:** lg, semibold.
- **Tertiary:** base, medium.
- **Quaternary:** sm, normal, kleur secondary.

### 4.3 Spacing en layout

- **Secties:** Ruime verticale spacing (bijv. spacing 12–16) tussen hero, filters, kaart, gauges, lijst, uurverwachting.
- **Binnen kaarten:** Voldoende padding (bijv. spacing 6–8) zodat het niet krap voelt.
- **Max-width:** Content gecentreerd; breedte volgens `layout.maxWidth` / `contentMaxWidth` (bijv. 72rem / 64rem).

### 4.4 Schaduw en radius

- **Kaarten:** `shadow.DEFAULT` of `shadow.md`, radius `radius.lg` of `radius.xl`.
- **Knoppen/inputs:** `radius.md`, eventueel `shadow.sm`.
- Geen zware schaduwen; alles blijft zacht (Apple-achtig).

---

## 5. Tailwind: tokens gebruiken

In je **Tailwind-config** gebruik je **`tailwind.theme.extend.js`**: in `tailwind.config.js` o.a. `theme: { extend: require('./tailwind.theme.extend.js') }`. Daarmee krijg je onderstaande classes.

**Kleuren (achtergrond):** `bg-page`, `bg-pageAlt`, `bg-card`, `bg-ctaBg`  
**Kleuren (tekst):** `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`, `text-highlight`, `text-low`, `text-moderate`, `text-high`, `text-veryHigh`, `text-inactive`  
**Hiërarchie typo:**  
- Primary: `text-3xl font-bold leading-tight` (+ `text-highlight` voor “vandaag” / “groot”)  
- Secondary: `text-lg font-semibold`  
- Tertiary: `text-base font-medium`  
- Quaternary: `text-sm` + `text-secondary`  

**UI:** `rounded-lg`, `rounded-xl`, `shadow-card`, `shadow-md`, `max-w-page`, `max-w-content`  

**Belastingbalk gradient:** Gebruik de tokens `color.gradient.loadBar` (bijv. in een style of als CSS variabelen); in Tailwind kun je bv. `bg-gradient-to-r from-[#fed7aa] via-[#fb923c] to-[#b91c1c]` gebruiken.

---

## 6. Korte do’s en don’ts

**Do:**

- Eén duidelijke hoofdvraag en één duidelijke hoofdboodschap (primary).
- Witruimte tussen blokken; niet alles tegen elkaar.
- Alleen de level-kleuren (groen/oranje/rood/donkerrood/grijs) voor pollen/severity.
- Modulaire type scale en spacing; geen losse pixelwaarden.
- Attributie Open-Meteo (quaternary, bv. in footer).

**Don’t:**

- Geen tweede element dat visueel zwaarder is dan de hero + main alert.
- Geen drukke achtergronden of felle kleuren buiten de level-accenten.
- Geen zware schaduwen of fel gekleurde borders.
- Geen willekeurige font-sizes; altijd uit de scale.

Als je deze regels en de tokens consequent toepast, ziet de eerste pagina er uit als de screenshot: modern, simplistisch, Apple-achtig, met logische hiërarchie.
