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

export const metadata: Metadata = {
  title: "Blog — Notes on Engineering & Growth",
  description:
    "Articles on multi-tenant SaaS, PostgreSQL RLS, Next.js architecture, and hiring technical freelancers — from Mahmudul Hossain, solo full-stack engineer.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Blog | Mahmudul Hossain",
    description:
      "Practical notes on shipping SaaS — engineering, architecture, and the stack behind production client work.",
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts().map(toPostSummary);
  const tags = getAllTags();

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Blog" }];

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
