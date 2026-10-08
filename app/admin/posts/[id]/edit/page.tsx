import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import PostEditor from "@/components/admin/PostEditor";
import { getAdminPostById } from "@/lib/cms/admin-posts.server";

export const metadata: Metadata = {
  title: "Edit Post",
  robots: { index: false, follow: false },
};

interface EditPostPageProps {
  params: { id: string };
}

export default function AdminEditPostPage({ params }: EditPostPageProps) {
  const post = getAdminPostById(params.id);
  if (!post) notFound();

  return (
    <AdminShell title={post.source === "mdx" ? "Edit MDX post" : "Edit post"}>
      <PostEditor post={post} />
    </AdminShell>
  );
}
