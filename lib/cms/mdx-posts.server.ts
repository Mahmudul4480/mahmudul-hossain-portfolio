import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { CmsBlogPost, CmsBlogPostInput } from "@/lib/cms/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
export const MDX_ID_PREFIX = "mdx__";

export function isMdxPostId(id: string): boolean {
  return id.startsWith(MDX_ID_PREFIX);
}

export function mdxPostId(slug: string): string {
  return `${MDX_ID_PREFIX}${slug}`;
}

export function slugFromMdxPostId(id: string): string {
  return id.slice(MDX_ID_PREFIX.length);
}

function calcReadingTime(content: string) {
  return Math.max(1, Math.ceil(readingTime(content).minutes));
}

function findMdxFileBySlug(slug: string): string | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    if (data.slug === slug) return file;
  }

  return null;
}

function parseMdxFile(filename: string): CmsBlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    id: mdxPostId(data.slug as string),
    slug: data.slug as string,
    title: data.title as string,
    excerpt: data.excerpt as string,
    coverImage: data.coverImage as string | undefined,
    content,
    tags: (data.tags as string[]) ?? [],
    publishedAt: data.publishedAt as string,
    updatedAt: data.updatedAt as string | undefined,
    metaTitle: (data.metaTitle as string | undefined) ?? (data.title as string),
    metaDescription: (data.metaDescription as string | undefined) ?? (data.excerpt as string),
    published: data.published !== false,
    readingTimeMinutes: calcReadingTime(content),
  };
}

export function getAllMdxPostsForAdmin(): CmsBlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseMdxFile)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getMdxPostById(id: string): CmsBlogPost | null {
  if (!isMdxPostId(id)) return null;
  const slug = slugFromMdxPostId(id);
  const file = findMdxFileBySlug(slug);
  if (!file) return null;
  return parseMdxFile(file);
}

export function mdxSlugExists(slug: string, excludeId?: string): boolean {
  const excludeSlug = excludeId && isMdxPostId(excludeId) ? slugFromMdxPostId(excludeId) : null;
  return getAllMdxPostsForAdmin().some((p) => p.slug === slug && p.slug !== excludeSlug);
}

export function updateMdxPost(id: string, input: Partial<CmsBlogPostInput>): CmsBlogPost {
  if (!isMdxPostId(id)) throw new Error("Not an MDX post.");

  const currentSlug = slugFromMdxPostId(id);
  const file = findMdxFileBySlug(currentSlug);
  if (!file) throw new Error("MDX post not found.");

  const existing = parseMdxFile(file);
  const newSlug = input.slug ?? existing.slug;

  if (mdxSlugExists(newSlug, id) && newSlug !== currentSlug) {
    throw new Error("A post with this slug already exists.");
  }

  const updated: CmsBlogPost = {
    ...existing,
    title: input.title ?? existing.title,
    slug: newSlug,
    excerpt: input.excerpt ?? existing.excerpt,
    coverImage: input.coverImage ?? existing.coverImage,
    content: input.content ?? existing.content,
    tags: input.tags ?? existing.tags,
    publishedAt: input.publishedAt ?? existing.publishedAt,
    metaTitle: input.metaTitle ?? input.title ?? existing.metaTitle,
    metaDescription: input.metaDescription ?? input.excerpt ?? existing.metaDescription,
    published: input.published ?? existing.published,
    updatedAt: new Date().toISOString(),
    readingTimeMinutes: calcReadingTime(input.content ?? existing.content),
    id: mdxPostId(newSlug),
  };

  const frontmatter = {
    title: updated.title,
    slug: updated.slug,
    excerpt: updated.excerpt,
    coverImage: updated.coverImage,
    publishedAt: updated.publishedAt,
    updatedAt: updated.updatedAt,
    tags: updated.tags,
    metaTitle: updated.metaTitle,
    metaDescription: updated.metaDescription,
  };

  const mdxContent = matter.stringify(updated.content, frontmatter);
  const newFilename = `${newSlug}.mdx`;
  const newFilePath = path.join(BLOG_DIR, newFilename);

  fs.writeFileSync(newFilePath, mdxContent, "utf8");

  if (file !== newFilename) {
    fs.unlinkSync(path.join(BLOG_DIR, file));
  }

  return updated;
}

export function deleteMdxPost(id: string): boolean {
  if (!isMdxPostId(id)) return false;

  const slug = slugFromMdxPostId(id);
  const file = findMdxFileBySlug(slug);
  if (!file) return false;

  fs.unlinkSync(path.join(BLOG_DIR, file));
  return true;
}
