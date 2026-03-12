import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import { TIPS, getTipBySlug } from "@/lib/tips";
import { SITE_URL, SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return TIPS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip)
    return { title: "Tips — Hooikoortsvandaag.nl" };
  const url = `${SITE_URL}/tips/${slug}`;
  return {
    title: `${tip.title} — Tips hooikoorts | ${SITE_NAME}`,
    description: tip.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: tip.title,
      description: tip.metaDescription,
      url,
      siteName: SITE_NAME,
      locale: "nl_NL",
      type: "article",
      publishedTime: tip.publishedTime,
      modifiedTime: tip.modifiedTime ?? tip.publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: tip.title,
      description: tip.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

function BlogPostingJsonLd({
  tip,
  url,
}: { tip: NonNullable<ReturnType<typeof getTipBySlug>>; url: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: tip.title,
    description: tip.metaDescription,
    url,
    datePublished: tip.publishedTime,
    dateModified: tip.modifiedTime ?? tip.publishedTime,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({
  items,
}: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function TipPage({ params }: Props) {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip) notFound();

  const url = `${SITE_URL}/tips/${slug}`;
  const otherTips = TIPS.filter((t) => t.slug !== slug).slice(0, 2);

  return (
    <>
      <BlogPostingJsonLd tip={tip} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Tips & advies", url: `${SITE_URL}/tips` },
          { name: tip.title, url },
        ]}
      />
      <div className="min-h-screen flex flex-col bg-page">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-secondary">
              <li>
                <Link href="/" className="hover:text-primary underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/tips" className="hover:text-primary underline">
                  Tips & advies
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-primary font-medium" aria-current="page">
                {tip.title}
              </li>
            </ol>
          </nav>

          <article className="mb-12">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-primary md:text-4xl leading-tight mb-3">
                {tip.title}
              </h1>
              <p className="text-lg text-secondary mb-4">{tip.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                <time dateTime={tip.publishedTime}>
                  Gepubliceerd:{" "}
                  {new Date(tip.publishedTime).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                {tip.modifiedTime && tip.modifiedTime !== tip.publishedTime && (
                  <time dateTime={tip.modifiedTime}>
                    Bijgewerkt:{" "}
                    {new Date(tip.modifiedTime).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
                <span>{tip.readingMinutes} min leestijd</span>
              </div>
            </header>

            <div>
              {tip.sections.map((section, i) => (
                <section key={i} className="mb-8">
                  <h2 className="text-xl font-semibold text-primary mb-3">
                    {section.heading}
                  </h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-primary leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          {otherTips.length > 0 && (
            <aside className="border-t border-border pt-8" aria-label="Gerelateerde tips">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Lees ook
              </h2>
              <ul className="space-y-3">
                {otherTips.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tips/${t.slug}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <p className="mt-10">
            <Link href="/tips" className="text-secondary hover:text-primary underline">
              ← Alle tips & advies
            </Link>
            {" · "}
            <Link href="/" className="text-secondary hover:text-primary underline">
              Naar pollenverwachting
            </Link>
          </p>
        </main>
      </div>
    </>
  );
}
