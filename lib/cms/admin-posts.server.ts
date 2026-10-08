import "server-only";

import type { AdminBlogPost, AdminPostSource, CmsBlogPost, CmsBlogPostInput, CmsBlogPostUpdate } from "@/lib/cms/types";
import {
  deleteMdxPost,
  getAllMdxPostsForAdmin,
  getMdxPostById,
  mdxSlugExists,
  updateMdxPost,
  isMdxPostId,
} from "@/lib/cms/mdx-posts.server";
import {
  createCmsPost,
  deleteCmsPost,
  getAllCmsPosts,
  getCmsPostById,
  slugExists,
  updateCmsPost,
} from "@/lib/cms/posts.server";

export type { AdminBlogPost, AdminPostSource } from "@/lib/cms/types";

function withSource(post: CmsBlogPost, source: AdminPostSource): AdminBlogPost {
  return { ...post, source };
}

export function getAllAdminPosts(): AdminBlogPost[] {
  const cmsPosts = getAllCmsPosts(true).map((p) => withSource(p, "cms"));
  const cmsSlugs = new Set(cmsPosts.map((p) => p.slug));
  const mdxPosts = getAllMdxPostsForAdmin()
    .filter((p) => !cmsSlugs.has(p.slug))
    .map((p) => withSource(p, "mdx"));

  return [...cmsPosts, ...mdxPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getAdminPostById(id: string): AdminBlogPost | null {
  if (isMdxPostId(id)) {
    const post = getMdxPostById(id);
    return post ? withSource(post, "mdx") : null;
  }

  const post = getCmsPostById(id);
  return post ? withSource(post, "cms") : null;
}

export function adminSlugExists(slug: string, excludeId?: string): boolean {
  return slugExists(slug, excludeId) || mdxSlugExists(slug, excludeId);
}

export function updateAdminPost(id: string, input: Partial<CmsBlogPostUpdate>) {
  if (isMdxPostId(id)) {
    return withSource(updateMdxPost(id, input), "mdx");
  }

  const existing = getCmsPostById(id);
  if (!existing) throw new Error("Post not found.");

  return withSource(
    updateCmsPost({
      id,
      ...input,
      tags: Array.isArray(input.tags) ? input.tags : existing.tags,
    }),
    "cms",
  );
}

export function deleteAdminPost(id: string): boolean {
  if (isMdxPostId(id)) return deleteMdxPost(id);
  return deleteCmsPost(id);
}

export function createAdminPost(input: CmsBlogPostInput): AdminBlogPost {
  if (adminSlugExists(input.slug)) {
    throw new Error("A post with this slug already exists.");
  }
  return withSource(createCmsPost(input), "cms");
}
