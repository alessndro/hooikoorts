import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import { TIPS } from "@/lib/tips";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tips & advies bij hooikoorts | ${SITE_NAME}`,
  description:
    "Praktische tips om hooikoortsklachten te verminderen: medicatie, binnen blijven bij pieken en de pollenverwachting gebruiken.",
  alternates: { canonical: `${SITE_URL}/tips` },
  openGraph: {
    title: `Tips & advies bij hooikoorts | ${SITE_NAME}`,
    description:
      "Praktische tips om hooikoortsklachten te verminderen en je dag beter in te plannen.",
    url: `${SITE_URL}/tips`,
    siteName: SITE_NAME,
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Tips & advies bij hooikoorts | ${SITE_NAME}`,
    description:
      "Praktische tips om hooikoortsklachten te verminderen en je dag beter in te plannen.",
  },
  robots: { index: true, follow: true },
};

function ItemListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tips & advies bij hooikoorts",
    description:
      "Praktische tips om hooikoortsklachten te verminderen en je dag beter in te plannen.",
    numberOfItems: TIPS.length,
    itemListElement: TIPS.map((tip, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/tips/${tip.slug}`,
      name: tip.title,
      description: tip.metaDescription,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function TipsPage() {
  return (
    <>
      <ItemListJsonLd />
      <div className="min-h-screen flex flex-col bg-page">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-16">
          <header className="text-center mb-14 md:mb-16">
            <h1 className="text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight mb-4">
              Tips & advies
            </h1>
            <p className="text-lg text-secondary max-w-xl mx-auto">
              Praktische artikelen om hooikoortsklachten te verminderen en je dag
              beter in te plannen.
            </p>
          </header>

          <section
            aria-label="Overzicht van tips"
            className="grid gap-8 md:gap-10"
          >
            {TIPS.map((tip, index) => (
              <article
                key={tip.slug}
                className="group rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:border-secondary/30"
              >
                <Link href={`/tips/${tip.slug}`} className="block">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-36 shrink-0 flex items-center justify-center sm:border-r border-border bg-page/50 p-6">
                      <span
                        className="text-4xl sm:text-5xl font-bold text-secondary/40 group-hover:text-highlight/60 transition-colors"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1 p-6 sm:p-8">
                      <h2 className="text-xl font-semibold text-primary group-hover:text-highlight transition-colors md:text-2xl">
                        {tip.title}
                      </h2>
                      <p className="mt-2 text-secondary leading-relaxed">
                        {tip.shortDescription}
                      </p>
                      <footer className="mt-4 flex flex-wrap items-center gap-3 text-sm text-tertiary">
                        <time dateTime={tip.publishedTime}>
                          {new Date(tip.publishedTime).toLocaleDateString(
                            "nl-NL",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </time>
                        <span aria-hidden>·</span>
                        <span>{tip.readingMinutes} min leestijd</span>
                      </footer>
                      <p className="mt-4 text-sm font-medium text-highlight group-hover:underline">
                        Lees artikel →
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </section>

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
    </>
  );
}
