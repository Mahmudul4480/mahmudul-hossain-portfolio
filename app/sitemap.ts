import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { getAllPosts, getAllTags } from "@/lib/blog.server";
import { getTagSlug } from "@/lib/blog-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentUpdated = new Date(siteConfig.contentUpdated);
  const posts = getAllPosts();
  const newestPost = posts.reduce<Date | null>((latest, post) => {
    const stamp = new Date(post.updatedAt ?? post.publishedAt);
    if (!latest || stamp > latest) return stamp;
    return latest;
  }, null);

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: contentUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagRoutes = getAllTags().map((tag) => {
    const tagged = posts.filter((post) =>
      post.tags.some((item) => getTagSlug(item) === getTagSlug(tag)),
    );
    const lastModified = tagged.reduce<Date>((latest, post) => {
      const stamp = new Date(post.updatedAt ?? post.publishedAt);
      return stamp > latest ? stamp : latest;
    }, contentUpdated);

    return {
      url: `${siteConfig.url}/blog/tag/${getTagSlug(tag)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    };
  });

  return [
    {
      url: siteConfig.url,
      lastModified: contentUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: contentUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: newestPost ?? contentUpdated,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...serviceRoutes,
    ...blogRoutes,
    ...tagRoutes,
  ];
}
