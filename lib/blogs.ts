/**
 * Blogartikelen — zelfde structuur als tips, SEO-gericht op zoektermen
 * zoals pollen vandaag, pollenverwachting, hooikoorts radar, pollen meting.
 */

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Korte titel voor navigatie-dropdown (optioneel). */
  navTitle?: string;
  shortDescription: string;
  metaDescription: string;
  publishedTime: string;
  modifiedTime?: string;
  readingMinutes: number;
  sections: BlogSection[];
}

export const BLOGS: BlogPost[] = [
  {
    slug: "pollen-vandaag-nederland",
    title: "Pollen vandaag in Nederland: actuele pollenverwachting",
    navTitle: "Pollen vandaag",
    shortDescription:
      "Bekijk de pollenverwachting vandaag per provincie. Zijn er pollen vandaag en hoe erg is de hooikoortsbelasting?",
    metaDescription:
      "Actuele pollenverwachting vandaag in Nederland. Zijn er pollen vandaag? Bekijk per provincie en per uur de kans op hooikoortsklachten.",
    publishedTime: "2025-02-01T09:00:00+01:00",
    modifiedTime: "2025-03-10T10:00:00+01:00",
    readingMinutes: 4,
    sections: [
      {
        heading: "Zijn er pollen vandaag?",
        paragraphs: [
          "Veel mensen zoeken op 'pollen vandaag' of 'zijn er pollen vandaag' om te weten of ze last kunnen krijgen van hooikoorts. De hoeveelheid pollen in de lucht verschilt per dag, per regio en zelfs per uur. Op Hooikoortsvandaag.nl zie je in één oogopslag of de kans op klachten vandaag laag, matig of hoog is voor jouw provincie.",
          "De pollenverwachting vandaag wordt bepaald door weersomstandigheden (temperatuur, neerslag, wind), het seizoen en welke bomen, grassen of onkruiden op dat moment bloeien. In het voorjaar zijn vooral els, hazelaar en berk actief; in de zomer grassen en later in het jaar bijvoet en ambrosia.",
        ],
      },
      {
        heading: "Pollenverwachting vandaag per provincie",
        paragraphs: [
          "Nederland kent grote regionale verschillen. Daarom tonen we op Hooikoortsvandaag.nl de pollenverwachting per provincie. Per provincie gebruiken we de grootste stad als meetpunt voor weer en luchtkwaliteit. Zo krijg je een betrouwbare inschatting of er vandaag veel of weinig pollen in jouw regio zijn.",
          "Je ziet niet alleen of de belasting vandaag laag of hoog is, maar ook de verwachting per uur voor de komende 12 uur. Handig om bijvoorbeeld een wandeling of sportmoment te plannen op een uur met lagere pollenbelasting.",
        ],
      },
      {
        heading: "Hoe lees je de pollenverwachting?",
        paragraphs: [
          "We drukken de kans op hooikoortsklachten uit in vier niveaus: laag, matig, hoog en zeer hoog. Die inschatting is gebaseerd op neerslag, luchtvochtigheid, wind en luchtkwaliteit (fijnstof). Bij 'laag' is de lucht relatief schoon en kun je gerust naar buiten; bij 'hoog' of 'zeer hoog' is het verstandig om medicatie op tijd te nemen en piekuren te vermijden.",
        ],
      },
    ],
  },
  {
    slug: "hooikoorts-radar-pollenradar-nederland",
    title: "Hooikoorts radar en pollenradar Nederland: hoe werkt het?",
    navTitle: "Hooikoorts radar & pollenradar",
    shortDescription:
      "Wat is een pollenradar of hooikoorts radar? Uitleg over pollenverwachtingen en waar je in Nederland de actuele pollen kunt volgen.",
    metaDescription:
      "Uitleg over de hooikoorts radar en pollenradar in Nederland. Waar vind je actuele pollenverwachtingen en hoe wordt de pollenmeting gedaan?",
    publishedTime: "2025-02-15T09:00:00+01:00",
    modifiedTime: "2025-03-10T10:00:00+01:00",
    readingMinutes: 5,
    sections: [
      {
        heading: "Wat is een pollenradar of hooikoorts radar?",
        paragraphs: [
          "Met 'pollenradar' of 'hooikoorts radar' bedoelen we een overzicht van de actuele of verwachte pollenconcentratie in Nederland. Net als een weerradar die neerslag toont, geeft een pollenradar inzicht in waar en wanneer er veel of weinig pollen in de lucht zijn. Zo kun je beter inschatten of je vandaag last van hooikoorts kunt krijgen.",
          "Er is geen officiële landelijke pollenradar met live metingen op elke plek. Wel zijn er websites en apps die een schatting geven op basis van weerdata, bloeikalenders en soms meetstations. Hooikoortsvandaag.nl combineert weer en luchtkwaliteit per provincie om een duidelijke verwachting te geven.",
        ],
      },
      {
        heading: "Pollenmeting en pollenverwachting",
        paragraphs: [
          "Een echte pollenmeting gebeurt met speciale vallen die pollen uit de lucht vangen en tellen. Die metingen zijn er op een beperkt aantal locaties. Voor een dagelijkse pollenverwachting voor heel Nederland wordt daarom vaak gebruikgemaakt van weermodellen: temperatuur, neerslag, wind en vochtigheid bepalen samen hoe gunstig het is voor pollenverspreiding.",
          "Op Hooikoortsvandaag.nl gebruiken we geen directe pollenmeting, maar wel actuele weers- en luchtkwaliteitsdata. Daaruit leiden we af of de omstandigheden vandaag en per uur gunstig of ongunstig zijn voor hooikoortsklachten. Zo krijg je een praktische 'radar' per provincie en per uur.",
        ],
      },
      {
        heading: "Waar vind je de pollenverwachting?",
        paragraphs: [
          "Naast Hooikoortsvandaag.nl zijn er in Nederland onder meer Pollennieuws.nl, Hooikoortsradar.nl, Buienradar en Weer.nl die pollenverwachtingen of een pollenradar aanbieden. Het is handig om één bron te kiezen die je vertrouwt en die aansluit bij wat jij wilt weten: alleen vandaag, of ook per uur of per regio.",
        ],
      },
    ],
  },
  {
    slug: "hooikoorts-meting-hoe-erg-vandaag",
    title: "Hooikoorts meting: hoe erg is hooikoorts vandaag?",
    navTitle: "Hooikoorts meting vandaag",
    shortDescription:
      "Hoe wordt de hooikoortsbelasting gemeten of geschat? En hoe weet je hoe erg de hooikoorts vandaag is in jouw regio?",
    metaDescription:
      "Hoe erg is hooikoorts vandaag? Uitleg over hooikoorts meting en hoe je de pollenbelasting vandaag per provincie kunt bekijken.",
    publishedTime: "2025-03-01T09:00:00+01:00",
    modifiedTime: "2025-03-10T10:00:00+01:00",
    readingMinutes: 4,
    sections: [
      {
        heading: "Hoe erg is hooikoorts vandaag?",
        paragraphs: [
          "De vraag 'hoe erg is hooikoorts vandaag' is voor veel mensen dagelijks relevant. De ernst hangt af van waar je bent, welk pollenseizoen actief is (bomen, grassen of onkruiden) en het weer. Op Hooikoortsvandaag.nl zie je per provincie of de kans op klachten vandaag laag, matig, hoog of zeer hoog is, en je kunt de verwachting per uur voor de komende 12 uur bekijken.",
          "We drukken dit uit als een duidelijke conclusie ('Vandaag is de kans op hooikoortsklachten matig') en met een korte toelichting. Daarnaast tonen we de verwachting voor bomen, grassen en onkruiden apart, zodat je weet welke pollenbronnen nu actief zijn.",
        ],
      },
      {
        heading: "Hoe wordt de hooikoortsbelasting geschat?",
        paragraphs: [
          "Een echte 'hooikoorts meting' in de zin van het tellen van pollenkorrels gebeurt op vaste meetlocaties met pollenvallen. Voor een landelijke verwachting wordt vaak een model gebruikt dat weer en seizoen combineert. Op onze site gebruiken we temperatuur, neerslag, luchtvochtigheid en luchtkwaliteit (fijnstof) om een score te berekenen: veel neerslag en hoge luchtvochtigheid zijn vaak gunstig, droog en zonnig weer kan de belasting verhogen.",
          "We geven geen exacte pollenconcentratie in getallen, maar wel een begrijpelijk niveau (laag tot zeer hoog) dat je helpt om je dag in te plannen en eventueel medicatie of voorzorgsmaatregelen te nemen.",
        ],
      },
      {
        heading: "Per provincie en per uur",
        paragraphs: [
          "Omdat het weer en de pollenbelasting per regio kunnen verschillen, tonen we de verwachting per provincie. Per provincie gebruiken we de grootste stad als referentiepunt. De 'meting' of schatting wordt elke keer bij het laden van de pagina ververst op basis van de actuele weers- en luchtkwaliteitsdata.",
        ],
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOGS.find((b) => b.slug === slug);
}

/** Eerste 3 blogs voor navigatie. */
export const BLOGS_NAV = BLOGS.slice(0, 3);
