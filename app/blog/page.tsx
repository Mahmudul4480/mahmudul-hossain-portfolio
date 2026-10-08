import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogIndexClient from "@/components/BlogIndexClient";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { getAllPosts, getAllTags } from "@/lib/blog.server";
import { toPostSummary } from "@/lib/blog-utils";
import { siteConfig } from "@/data/site";
import { buildPageMetadata, jsonLd } from "@/lib/seo";

const blogDescription =
  "Articles on multi-tenant SaaS, PostgreSQL RLS, Next.js architecture, and hiring technical freelancers — from Mahmudul Hossain, solo full-stack engineer.";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog — Notes on Engineering & Growth",
  description: blogDescription,
  path: "/blog",
  keywords: ["engineering blog", "SaaS architecture", "Next.js", "PostgreSQL", siteConfig.name],
});

export const revalidate = 60;

export default function BlogIndexPage() {
  const posts = getAllPosts().map(toPostSummary);
  const tags = getAllTags();

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Blog" }];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `${siteConfig.name} — Blog`,
    description: blogDescription,
    url: `${siteConfig.url}/blog`,
    inLanguage: "en",
    author: { "@id": `${siteConfig.url}/#person` },
    blogPost: posts.slice(0, 12).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.publishedAt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbJsonLd(breadcrumbItems, siteConfig.url)),
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
              <p className="eyebrow">Blog</p>
              <h1>Notes on shipping SaaS</h1>
              <p className="services-hero-lede">
                Engineering decisions, architecture trade-offs, and lessons from production builds —
                written the same way I talk to clients: direct, technical, no agency filler.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal>
              <BlogIndexClient posts={posts} tags={tags} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
