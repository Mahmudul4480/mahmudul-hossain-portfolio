import "server-only";

import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import { randomUUID } from "crypto";
import type { CmsBlogPost, CmsBlogPostInput, CmsBlogPostUpdate } from "@/lib/cms/types";
import { getTagSlug } from "@/lib/blog-utils";

const CMS_DIR = path.join(process.cwd(), "data", "cms", "posts");

function ensureDir() {
  if (!fs.existsSync(CMS_DIR)) {
    fs.mkdirSync(CMS_DIR, { recursive: true });
  }
}

function postPath(id: string) {
  return path.join(CMS_DIR, `${id}.json`);
}

function calcReadingTime(content: string) {
  return Math.max(1, Math.ceil(readingTime(content).minutes));
}

function readPostFile(id: string): CmsBlogPost | null {
  ensureDir();
  const file = postPath(id);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as CmsBlogPost;
}

function writePostFile(post: CmsBlogPost) {
  ensureDir();
  fs.writeFileSync(postPath(post.id), JSON.stringify(post, null, 2), "utf8");
}

export function getAllCmsPosts(includeDrafts = false): CmsBlogPost[] {
  ensureDir();
  const files = fs.readdirSync(CMS_DIR).filter((f) => f.endsWith(".json"));

  return files
    .map((file) => JSON.parse(fs.readFileSync(path.join(CMS_DIR, file), "utf8")) as CmsBlogPost)
    .filter((post) => includeDrafts || post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getCmsPostById(id: string): CmsBlogPost | null {
  return readPostFile(id);
}

export function getCmsPostBySlug(slug: string, includeDrafts = false): CmsBlogPost | null {
  const posts = getAllCmsPosts(includeDrafts);
  return posts.find((p) => p.slug === slug) ?? null;
}

export function slugExists(slug: string, excludeId?: string): boolean {
  return getAllCmsPosts(true).some((p) => p.slug === slug && p.id !== excludeId);
}

export function createCmsPost(input: CmsBlogPostInput): CmsBlogPost {
  if (slugExists(input.slug)) {
    throw new Error("A post with this slug already exists.");
  }

  const now = new Date().toISOString();
  const post: CmsBlogPost = {
    id: randomUUID(),
    ...input,
    metaTitle: input.metaTitle || input.title,
    metaDescription: input.metaDescription || input.excerpt,
    updatedAt: now,
    readingTimeMinutes: calcReadingTime(input.content),
  };

  writePostFile(post);
  return post;
}

export function updateCmsPost(update: CmsBlogPostUpdate): CmsBlogPost {
  const existing = readPostFile(update.id);
  if (!existing) throw new Error("Post not found.");

  const slug = update.slug ?? existing.slug;
  if (slugExists(slug, update.id)) {
    throw new Error("A post with this slug already exists.");
  }

  const content = update.content ?? existing.content;
  const post: CmsBlogPost = {
    ...existing,
    ...update,
    slug,
    content,
    updatedAt: new Date().toISOString(),
    readingTimeMinutes: calcReadingTime(content),
    metaTitle: update.metaTitle ?? update.title ?? existing.metaTitle ?? existing.title,
    metaDescription:
      update.metaDescription ?? update.excerpt ?? existing.metaDescription ?? existing.excerpt,
  };

  writePostFile(post);
  return post;
}

export function deleteCmsPost(id: string): boolean {
  ensureDir();
  const file = postPath(id);
  if (!fs.existsSync(file)) return false;
  fs.unlinkSync(file);
  return true;
}

export function generateSlugFromTitle(title: string): string {
  return getTagSlug(title);
}
