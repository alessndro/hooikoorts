import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import { Glow } from "../components/ui/glow";
import { BLOGS } from "@/lib/blogs";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog: pollenverwachting, hooikoorts radar en pollen vandaag | ${SITE_NAME}`,
  description:
    "Artikelen over pollen vandaag, pollenverwachting Nederland, hooikoorts radar en pollenmeting. Hoe erg is hooikoorts vandaag?",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `Blog pollen & hooikoorts | ${SITE_NAME}`,
    description:
      "Artikelen over pollenverwachting vandaag, hooikoorts radar en hoe erg hooikoorts vandaag is in Nederland.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog pollen & hooikoorts | ${SITE_NAME}`,
    description:
      "Artikelen over pollenverwachting vandaag, hooikoorts radar en pollenmeting.",
  },
  robots: { index: true, follow: true },
};

function ItemListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog pollenverwachting en hooikoorts",
    description:
      "Artikelen over pollen vandaag, pollenverwachting Nederland, hooikoorts radar en pollenmeting.",
    numberOfItems: BLOGS.length,
    itemListElement: BLOGS.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
      description: post.metaDescription,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function BlogPage() {
  return (
    <>
      <ItemListJsonLd />
      <div className="flex flex-col bg-page overflow-x-hidden">
        <div className="relative">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
            <Glow variant="center" className="animate-glow-in h-full w-full" />
          </div>
          <Header />
          <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
            <header className="text-center mb-10 sm:mb-14 md:mb-16">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight mb-4">
                Blog
              </h1>
              <p className="text-lg text-secondary max-w-xl mx-auto">
                Artikelen over pollen vandaag, pollenverwachting, hooikoorts radar
                en pollenmeting in Nederland.
              </p>
            </header>

            <section
              aria-label="Overzicht van blogartikelen"
              className="grid gap-6 sm:gap-8 md:gap-10"
            >
              {BLOGS.map((post, index) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:border-secondary/30"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-36 shrink-0 flex items-center justify-center sm:border-r border-border bg-page/50 p-4 sm:p-6">
                        <span
                          className="text-4xl sm:text-5xl font-bold text-secondary/40 group-hover:text-highlight/60 transition-colors"
                          aria-hidden
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex-1 p-4 sm:p-6 md:p-8 min-w-0">
                        <h2 className="text-xl font-semibold text-primary group-hover:text-highlight transition-colors md:text-2xl">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-secondary leading-relaxed">
                          {post.shortDescription}
                        </p>
                        <footer className="mt-4 flex flex-wrap items-center gap-3 text-sm text-tertiary">
                          <time dateTime={post.publishedTime}>
                            {new Date(post.publishedTime).toLocaleDateString(
                              "nl-NL",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </time>
                          <span aria-hidden>·</span>
                          <span>{post.readingMinutes} min leestijd</span>
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
      </div>
    </>
  );
}
