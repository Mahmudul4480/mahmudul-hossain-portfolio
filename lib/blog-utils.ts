import type { BlogPostFrontmatter } from "./blog-types";

export type { BlogPostFrontmatter, BlogHeading, BlogPost } from "./blog-types";
export { POSTS_PER_PAGE } from "./blog-types";

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function getTagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPostOgImage(
  post: Pick<BlogPostFrontmatter, "slug" | "coverImage">,
  siteUrl: string,
): string {
  if (post.coverImage) {
    return post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`;
  }
  return `${siteUrl}/opengraph-image`;
}

export function toPostSummary<T extends { content: string }>(post: T): Omit<T, "content"> {
  const { content: _content, ...summary } = post;
  return summary;
}
