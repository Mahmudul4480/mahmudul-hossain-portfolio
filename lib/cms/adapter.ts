import type { BlogHeading, BlogPost } from "@/lib/blog-types";
import type { CmsBlogPost } from "@/lib/cms/types";

export function cmsPostToBlogPost(post: CmsBlogPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags,
    content: post.content,
    readingTimeMinutes: post.readingTimeMinutes,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    source: "cms",
    id: post.id,
    published: post.published,
  };
}

export function extractHeadingsFromContent(content: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/^\d+\.\s*/, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    headings.push({
      id: text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      text,
      level,
    });
  }

  return headings;
}
