import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminPost, getAllAdminPosts } from "@/lib/cms/admin-posts.server";
import { generateSlugFromTitle } from "@/lib/cms/posts.server";
import type { CmsBlogPostInput } from "@/lib/cms/types";

function revalidateBlog() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
}

export async function GET() {
  const posts = getAllAdminPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CmsBlogPostInput;

    const input: CmsBlogPostInput = {
      title: body.title?.trim(),
      slug: body.slug?.trim() || generateSlugFromTitle(body.title),
      excerpt: body.excerpt?.trim(),
      coverImage: body.coverImage?.trim() || undefined,
      content: body.content ?? "",
      tags: Array.isArray(body.tags) ? body.tags : [],
      publishedAt: body.publishedAt || new Date().toISOString(),
      metaTitle: body.metaTitle?.trim() || body.title?.trim(),
      metaDescription: body.metaDescription?.trim() || body.excerpt?.trim(),
      published: Boolean(body.published),
    };

    if (!input.title || !input.excerpt) {
      return NextResponse.json({ error: "Title and excerpt are required." }, { status: 400 });
    }

    const post = createAdminPost(input);
    revalidateBlog();
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create post." },
      { status: 400 },
    );
  }
}
