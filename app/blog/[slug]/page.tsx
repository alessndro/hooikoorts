import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import { Glow } from "../../components/ui/glow";
import { BLOGS, getBlogBySlug } from "@/lib/blogs";
import { SITE_URL, SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog — Hooikoortsvandaag.nl" };
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: `${post.title} | Blog | ${SITE_NAME}`,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: SITE_NAME,
      locale: "nl_NL",
      type: "article",
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime ?? post.publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

function BlogPostingJsonLd({
  post,
  url,
}: { post: NonNullable<ReturnType<typeof getBlogBySlug>>; url: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url,
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime ?? post.publishedTime,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const otherPosts = BLOGS.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <>
      <BlogPostingJsonLd post={post} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url },
        ]}
      />
      <div className="flex flex-col bg-page overflow-x-hidden">
        <div className="relative">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
            <Glow variant="center" className="animate-glow-in h-full w-full" />
          </div>
          <Header />
          <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-10">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-secondary">
                <li>
                  <Link href="/" className="hover:text-primary underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-primary underline">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-primary font-medium" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            <article className="mb-12">
              <header className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary md:text-4xl leading-tight mb-3">
                  {post.title}
                </h1>
                <p className="text-lg text-secondary mb-4">{post.shortDescription}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                  <time dateTime={post.publishedTime}>
                    Gepubliceerd:{" "}
                    {new Date(post.publishedTime).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  {post.modifiedTime && post.modifiedTime !== post.publishedTime && (
                    <time dateTime={post.modifiedTime}>
                      Bijgewerkt:{" "}
                      {new Date(post.modifiedTime).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  )}
                  <span>{post.readingMinutes} min leestijd</span>
                </div>
              </header>

              <div>
                {post.sections.map((section, i) => (
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

            {otherPosts.length > 0 && (
              <aside className="border-t border-border pt-8" aria-label="Gerelateerde artikelen">
                <h2 className="text-lg font-semibold text-primary mb-4">
                  Lees ook
                </h2>
                <ul className="space-y-3">
                  {otherPosts.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/blog/${b.slug}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {b.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <p className="mt-10">
              <Link href="/blog" className="text-secondary hover:text-primary underline">
                ← Alle blogartikelen
              </Link>
              {" · "}
              <Link href="/" className="text-secondary hover:text-primary underline">
                Naar pollenverwachting
              </Link>
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
