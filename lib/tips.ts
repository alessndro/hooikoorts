/**
 * Tips voor hooikoortspatiënten — blogpost-structuur voor SEO.
 */

export interface TipSection {
  heading: string;
  paragraphs: string[];
}

export interface Tip {
  slug: string;
  title: string;
  shortDescription: string;
  /** Meta description (max ~155 tekens voor SEO). */
  metaDescription: string;
  /** Publicatiedatum (ISO). */
  publishedTime: string;
  /** Laatst gewijzigd (ISO). */
  modifiedTime?: string;
  /** Geschatte leestijd in minuten. */
  readingMinutes: number;
  /** Secties met H2 en paragrafen. */
  sections: TipSection[];
}

export const TIPS: Tip[] = [
  {
    slug: "medicijnen",
    title: "Medicijnen op tijd nemen",
    shortDescription: "Wanneer en hoe je medicatie het beste kunt gebruiken.",
    metaDescription:
      "Praktische tips voor het innemen van hooikoortsmedicatie: timing, dosering en wat te doen bij hoge pollenverwachting.",
    publishedTime: "2025-01-15T09:00:00+01:00",
    modifiedTime: "2025-03-01T10:00:00+01:00",
    readingMinutes: 3,
    sections: [
      {
        heading: "Neem medicatie vóór je naar buiten gaat",
        paragraphs: [
          "Neem je hooikoortsmedicatie bij het opstaan, vóór je naar buiten gaat. Antihistaminica werken het beste als ze al in je systeem zitten voordat je pollen tegenkomt. Zo verminder je de kans op een heftige reactie zodra je de deur uitstapt.",
        ],
      },
      {
        heading: "Vaste momenten voor tabletten en sprays",
        paragraphs: [
          "Bij tabletten: liefst op hetzelfde tijdstip elke dag. Bij neusspray of oogdruppels: volg de bijsluiter, vaak 1–2 keer per dag. Een vaste routine zorgt ervoor dat je geen dosis overslaat en dat de werking gelijkmatig is.",
        ],
      },
      {
        heading: "Bij hoge pollenverwachting",
        paragraphs: [
          "Bij een dag met hoge pollenverwachting kun je in overleg met je arts een extra dosis overwegen. Overschrijd nooit de aanbevolen dosering. Check altijd de verwachting voor jouw provincie zodat je op tijd kunt anticiperen.",
        ],
      },
    ],
  },
  {
    slug: "binnen-blijven",
    title: "Binnen blijven bij pieken",
    shortDescription: "Wanneer het slim is om binnen te blijven en hoe je binnenshuis de pollen beperkt.",
    metaDescription:
      "Wanneer binnen blijven bij hooikoorts zin heeft, hoe je ventileert op het juiste moment en hoe je pollen in huis beperkt.",
    publishedTime: "2025-01-20T09:00:00+01:00",
    modifiedTime: "2025-03-01T10:00:00+01:00",
    readingMinutes: 4,
    sections: [
      {
        heading: "Ramen en deuren dicht tijdens pieken",
        paragraphs: [
          "Houd ramen en deuren dicht op momenten dat de pollenconcentratie hoog is — vaak vroeg in de ochtend en in de vroege avond. Gebruik de pollenverwachting per uur op Hooikoortsvandaag.nl om pieken te vermijden en te bepalen wanneer je beter even binnen blijft.",
        ],
      },
      {
        heading: "Ventileren op het juiste moment",
        paragraphs: [
          "Ventileer bij voorkeur na een regenbui of wanneer de verwachting laag is. Een pollenhor voor het raam helpt om binnenlucht schoner te houden en vermindert de hoeveelheid pollen die naar binnen waait.",
        ],
      },
      {
        heading: "Pollen buiten de slaapkamer houden",
        paragraphs: [
          "Kleren die je buiten hebt gedragen kunnen pollen meenemen. Trek ze niet in de slaapkamer uit en was regelmatig. Douchen voor het slapen kan klachten 's nachts verminderen doordat je pollen van je huid en haar verwijdert.",
        ],
      },
    ],
  },
  {
    slug: "weer-checken",
    title: "Weer en pollen checken",
    shortDescription: "Hoe je onze site het beste gebruikt om je dag in te plannen.",
    metaDescription:
      "Hoe je de pollenverwachting per provincie en per uur gebruikt om activiteiten te plannen en hooikoortsklachten te beperken.",
    publishedTime: "2025-01-25T09:00:00+01:00",
    modifiedTime: "2025-03-01T10:00:00+01:00",
    readingMinutes: 3,
    sections: [
      {
        heading: "Check elke ochtend de verwachting",
        paragraphs: [
          "Bekijk elke ochtend de verwachting voor jouw provincie. Zo weet je of je extra voorzorgsmaatregelen moet nemen of juist gerust een wandeling of fietstocht kunt plannen. De conclusie op de homepage geeft in één oogopslag of de kans op klachten laag, matig of hoog is.",
        ],
      },
      {
        heading: "Plan buitenactiviteiten op rustige uren",
        paragraphs: [
          "Let op het tijdstip: de pollenverwachting per uur laat zien wanneer de belasting het hoogst is. Plan activiteiten buiten het liefst op uren met lagere verwachting. Zo geniet je van de buitenlucht met minder klachten.",
        ],
      },
      {
        heading: "Combineer pollenverwachting met het weer",
        paragraphs: [
          "Op zonnige, winderige dagen zijn pollen vaak meer in de lucht. Na regen is de lucht tijdelijk schoner. Gebruik onze conclusie en uurverwachting samen voor de beste planning van je dag.",
        ],
      },
    ],
  },
];

export function getTipBySlug(slug: string): Tip | undefined {
  return TIPS.find((t) => t.slug === slug);
}

/** Eerste 3 tips voor in de navigatie. */
export const TIPS_NAV = TIPS.slice(0, 3);
