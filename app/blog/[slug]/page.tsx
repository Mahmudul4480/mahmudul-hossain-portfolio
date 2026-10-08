import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import BlogTableOfContents from "@/components/BlogTableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import ServiceContactCTA from "@/components/ServiceContactCTA";
import Reveal from "@/components/Reveal";
import { formatBlogDate, getPostOgImage, getTagSlug, toPostSummary } from "@/lib/blog-utils";
import { getAllPosts, getPostBySlug, getPostHeadings, getRelatedPosts } from "@/lib/blog.server";
import type { BlogPost } from "@/lib/blog-types";
import { compileBlogMdx } from "@/lib/mdx";
import { siteConfig } from "@/data/site";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const ogImage = getPostOgImage(post, siteConfig.url);

  return {
    title,
    description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [siteConfig.name],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const revalidate = 60;

function articleJsonLd(post: BlogPost) {
  const image = getPostOgImage(post, siteConfig.url);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const headings = getPostHeadings(post.slug);
  const relatedPosts = getRelatedPosts(post.slug, 3).map(toPostSummary);
  const content = await compileBlogMdx(post.content);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
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
        <article className="section blog-post-hero">
          <div className="wrap blog-post-header">
            <Breadcrumb items={breadcrumbItems} />
            <Reveal>
              {post.coverImage && (
                <div className="blog-post-cover-wrap">
                  <Image
                    src={post.coverImage}
                    alt=""
                    width={1200}
                    height={630}
                    className="blog-post-cover"
                    priority
                    sizes="(max-width: 960px) 100vw, 960px"
                  />
                </div>
              )}
              <div className="blog-card-meta blog-post-meta">
                <span className="blog-date">{formatBlogDate(post.publishedAt)}</span>
                <span className="blog-read">{post.readingTimeMinutes} min read</span>
              </div>
              <h1>{post.title}</h1>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${getTagSlug(tag)}`} className="blog-tag-link">
                    {tag}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </article>

        <section className="section blog-post-body">
          <div className="wrap blog-post-layout">
            <Reveal className="blog-post-main">
              <div className="blog-prose blog-mdx">{content}</div>
            </Reveal>
            <BlogTableOfContents headings={headings} />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal>
              <RelatedPosts posts={relatedPosts} />
            </Reveal>
          </div>
        </section>

        <ServiceContactCTA
          headline="Building something similar?"
          description="If this article matches what you're trying to ship, let's talk scope — I take full technical ownership from schema to deploy."
        />
      </main>
      <Footer />
    </>
  );
}
