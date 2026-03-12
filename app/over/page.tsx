import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import { Glow } from "../components/ui/glow";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Over ons | ${SITE_NAME}`,
  description:
    "Over Hooikoortsvandaag.nl: betrouwbare pollenverwachting vandaag per provincie en per uur. Voor iedereen die wil weten: zijn er pollen vandaag?",
  alternates: { canonical: `${SITE_URL}/over` },
  openGraph: {
    title: `Over ons | ${SITE_NAME}`,
    description:
      "Betrouwbare pollenverwachting vandaag per provincie en per uur. Voor iedereen die wil weten: zijn er pollen vandaag?",
    url: `${SITE_URL}/over`,
    siteName: SITE_NAME,
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Over ons | ${SITE_NAME}`,
    description:
      "Betrouwbare pollenverwachting vandaag per provincie en per uur.",
  },
  robots: { index: true, follow: true },
};

export default function OverPage() {
  return (
    <div className="flex flex-col bg-page overflow-x-hidden min-h-screen">
      <div className="relative min-h-screen flex flex-col">
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden min-h-full"
          aria-hidden
        >
          <Glow variant="center" className="animate-glow-in h-full min-h-full w-full" />
        </div>
        <Header />
        <main className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 md:py-16 flex-1 min-w-0">
          <header className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary md:text-4xl tracking-tight mb-4">
              Over ons
            </h1>
            <p className="text-lg text-secondary">
              Over Hooikoortsvandaag.nl en onze pollenverwachting.
            </p>
          </header>

          <div className="space-y-6 text-secondary leading-relaxed">
            <p>
              <strong className="text-primary">Hooikoortsvandaag.nl</strong> is
              er voor iedereen die wil weten hoe groot de kans op
              hooikoortsklachten vandaag is. We bieden een duidelijke
              pollenverwachting per provincie en per uur, zodat je je dag kunt
              plannen en weet wanneer je beter binnen kunt blijven of je
              medicatie kunt nemen.
            </p>
            <p>
              Op de homepage zie je in één oogopslag of de pollenbelasting
              vandaag laag, matig of hoog is in jouw regio. Daarnaast vind je in
              onze <Link href="/blog" className="text-highlight hover:underline">blog</Link> artikelen over pollen vandaag, de hooikoorts radar en
              pollenmeting, en in <Link href="/tips" className="text-highlight hover:underline">tips & advies</Link> praktische tips om klachten te
              verminderen.
            </p>
            <p>
              De verwachting is gebaseerd op weer- en luchtkwaliteitsdata. We
              streven ernaar de informatie actueel en begrijpelijk te houden.
              Heb je een vraag of opmerking? Neem gerust contact met ons op via
              de gegevens op deze site.
            </p>
          </div>

          <p className="mt-12 text-center">
            <Link
              href="/"
              className="text-sm text-secondary hover:text-primary underline"
            >
              ← Terug naar pollenverwachting
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
