import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  deleteAdminPost,
  getAdminPostById,
  updateAdminPost,
} from "@/lib/cms/admin-posts.server";
import type { CmsBlogPostUpdate } from "@/lib/cms/types";

function revalidateBlog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const post = getAdminPostById(params.id);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = (await request.json()) as Partial<CmsBlogPostUpdate>;
    const existing = getAdminPostById(params.id);
    if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const post = updateAdminPost(params.id, {
      ...body,
      tags: Array.isArray(body.tags) ? body.tags : existing.tags,
    });

    revalidateBlog(existing.slug);
    if (post.slug !== existing.slug) revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update post." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const existing = getAdminPostById(params.id);
  if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  deleteAdminPost(params.id);
  revalidateBlog(existing.slug);

  return NextResponse.json({ success: true });
}
