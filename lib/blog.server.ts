import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogHeading, BlogPost, BlogPostFrontmatter } from "@/lib/blog-types";
import { getTagSlug } from "@/lib/blog-utils";
import { cmsPostToBlogPost, extractHeadingsFromContent } from "@/lib/cms/adapter";
import { getAllCmsPosts, getCmsPostBySlug } from "@/lib/cms/posts.server";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function extractHeadings(content: string): BlogHeading[] {
  return extractHeadingsFromContent(content);
}

function parseMdxPost(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    content,
    readingTimeMinutes: Math.max(1, Math.ceil(stats.minutes)),
    source: "mdx",
    metaTitle: frontmatter.metaTitle ?? frontmatter.title,
    metaDescription: frontmatter.metaDescription ?? frontmatter.excerpt,
    published: frontmatter.published !== false,
  };
}

function getMdxPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseMdxPost);
}

function mergePosts(): BlogPost[] {
  const cmsPosts = getAllCmsPosts(false).map(cmsPostToBlogPost);
  const cmsSlugs = new Set(cmsPosts.map((p) => p.slug));
  const mdxPosts = getMdxPosts().filter((p) => p.published !== false && !cmsSlugs.has(p.slug));

  return [...cmsPosts, ...mdxPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getAllPosts(): BlogPost[] {
  return mergePosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const cmsPost = getCmsPostBySlug(slug, false);
  if (cmsPost) return cmsPostToBlogPost(cmsPost);

  return getMdxPosts().find((post) => post.slug === slug);
}

export function getPostHeadings(slug: string): BlogHeading[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return extractHeadings(post.content);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tag: string): BlogPost[] {
  const normalized = tag.toLowerCase();
  return getAllPosts().filter((post) =>
    post.tags.some((t) => getTagSlug(t) === normalized || t.toLowerCase() === normalized),
  );
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const scored = getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => current.tags.includes(tag)).length;
      return { post, sharedTags };
    })
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
    });

  if (scored.length >= count) {
    return scored.slice(0, count).map(({ post }) => post);
  }

  const fallback = getAllPosts()
    .filter((post) => post.slug !== currentSlug && !scored.some((s) => s.post.slug === post.slug))
    .slice(0, count - scored.length);

  return [...scored.map(({ post }) => post), ...fallback];
}

export function getLatestPosts(count = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}
