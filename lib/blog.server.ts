import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogHeading, BlogPost, BlogPostFrontmatter } from "@/lib/blog-types";
import { getTagSlug } from "@/lib/blog-utils";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function extractHeadings(content: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    headings.push({ id: getTagSlug(text), text, level });
  }

  return headings;
}

function parsePost(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    content,
    readingTimeMinutes: Math.max(1, Math.ceil(stats.minutes)),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parsePost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
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
