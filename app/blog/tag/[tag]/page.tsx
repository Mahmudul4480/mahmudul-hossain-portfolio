import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogIndexClient from "@/components/BlogIndexClient";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/blog.server";
import { getTagSlug, toPostSummary } from "@/lib/blog-utils";
import { siteConfig } from "@/data/site";

interface TagPageProps {
  params: { tag: string };
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: getTagSlug(tag) }));
}

export function generateMetadata({ params }: TagPageProps): Metadata {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) return {};

  const label =
    posts[0]?.tags.find((t) => getTagSlug(t) === params.tag) ?? params.tag.replace(/-/g, " ");
  const title = `${label} — Blog`;
  const url = `${siteConfig.url}/blog/tag/${params.tag}`;

  const description = `Articles tagged "${label}" — engineering notes from ${siteConfig.name}.`;

  return {
    title,
    description,
    keywords: [label, "blog", siteConfig.name],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BlogTagPage({ params }: TagPageProps) {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) notFound();

  const label =
    posts[0].tags.find((t) => getTagSlug(t) === params.tag) ?? params.tag.replace(/-/g, " ");
  const summaries = getAllPosts().map(toPostSummary);
  const tags = getAllTags();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: label },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems, siteConfig.url)),
        }}
      />
      <Link href="#main" className="skip-link">
        Skip to content
      </Link>
      <Nav />
      <main id="main">
        <section className="section blog-index-hero">
          <div className="wrap">
            <Breadcrumb items={breadcrumbItems} />
            <Reveal>
              <p className="eyebrow">Tag</p>
              <h1>{label}</h1>
              <p className="services-hero-lede">
                {posts.length} {posts.length === 1 ? "article" : "articles"} on {label}.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal>
              <BlogIndexClient posts={summaries} tags={tags} activeTag={params.tag} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
