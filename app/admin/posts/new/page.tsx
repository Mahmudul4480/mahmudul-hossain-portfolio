import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false, follow: false },
};

export default function AdminNewPostPage() {
  return (
    <AdminShell title="New post">
      <PostEditor />
    </AdminShell>
  );
}
