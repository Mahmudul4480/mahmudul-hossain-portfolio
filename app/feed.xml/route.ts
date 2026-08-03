import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog.server";
import { siteConfig } from "@/data/site";

export async function GET() {
  const feed = new Feed({
    title: `${siteConfig.name} — Blog`,
    description: "Engineering notes on SaaS, Next.js, PostgreSQL, and solo full-stack delivery.",
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    favicon: `${siteConfig.url}/icon.svg`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    feedLinks: {
      rss2: `${siteConfig.url}/feed.xml`,
    },
    author: {
      name: siteConfig.name,
      email: siteConfig.email,
      link: siteConfig.url,
    },
  });

  getAllPosts().forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.publishedAt),
      author: [{ name: siteConfig.name, email: siteConfig.email, link: siteConfig.url }],
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
