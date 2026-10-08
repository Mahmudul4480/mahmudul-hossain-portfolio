import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getAllAdminPosts } from "@/lib/cms/admin-posts.server";
import { formatBlogDate } from "@/lib/blog-utils";

export default function AdminDashboardPage() {
  const posts = getAllAdminPosts();

  return (
    <AdminShell title="Blog posts">
      <div className="admin-dashboard-head">
        <p className="admin-kicker">{posts.length} total posts</p>
        <Link href="/admin/posts/new" className="btn btn-primary">
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="admin-empty">
          <h2>No posts yet</h2>
          <p>Write your first blog post — title, cover image, SEO fields, and markdown content.</p>
          <Link href="/admin/posts/new" className="btn btn-primary">
            Create first post
          </Link>
        </div>
      ) : (
        <div className="admin-post-table-wrap">
          <table className="admin-post-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Tags</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                    <span className="admin-slug">/blog/{post.slug}</span>
                    {post.source === "mdx" && (
                      <span className="admin-source-badge">MDX file</span>
                    )}
                  </td>
                  <td>
                    <span className={`admin-status ${post.published ? "published" : "draft"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{formatBlogDate(post.publishedAt)}</td>
                  <td>{post.tags.slice(0, 3).join(", ")}</td>
                  <td className="admin-row-actions">
                    <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                    {post.published && (
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        View ↗
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
