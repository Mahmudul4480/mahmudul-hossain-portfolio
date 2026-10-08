"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { AdminBlogPost } from "@/lib/cms/types";

interface PostEditorProps {
  post?: AdminBlogPost;
}

function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ? post.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16),
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const tagList = useMemo(
    () =>
      tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tags],
  );

  function handleTitleChange(value: string) {
    setTitle(value);
    if (autoSlug) setSlug(slugifyTitle(value));
    if (!metaTitle || metaTitle === title) setMetaTitle(value);
  }

  function handleExcerptChange(value: string) {
    setExcerpt(value);
    if (!metaDescription || metaDescription === excerpt) setMetaDescription(value);
  }

  function insertMarkdown(before: string, after = "", placeholder = "") {
    const el = contentRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + selected + after + content.slice(end);
    setContent(next);

    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + before.length + selected.length;
      el.setSelectionRange(cursor, cursor);
    });
  }

  function insertNumberedSection() {
    const matches = content.match(/^## \d+\./gm);
    const nextNum = (matches?.length ?? 0) + 1;
    insertMarkdown(`\n\n## ${nextNum}. `, "\n", "Section title");
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Upload failed.");
      setUploading(false);
      return;
    }

    insertMarkdown(`\n![Image description](${data.url})\n`, "", "");
    setUploading(false);
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Upload failed.");
      setUploading(false);
      return;
    }

    setCoverImage(data.url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      coverImage: coverImage.trim() || undefined,
      content,
      tags: tagList,
      publishedAt: new Date(publishedAt).toISOString(),
      metaTitle: metaTitle.trim() || title.trim(),
      metaDescription: metaDescription.trim() || excerpt.trim(),
      published,
    };

    const url = isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Failed to save post.");
      setSaving(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function handleDelete() {
    if (!post || !confirm("Delete this post permanently?")) return;

    setSaving(true);
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete post.");
      setSaving(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="admin-editor" onSubmit={handleSubmit}>
      {post?.source === "mdx" && (
        <p className="admin-mdx-notice">
          Editing original MDX file in <code>content/blog/</code>. Changes save directly to that file.
        </p>
      )}
      <div className="admin-editor-grid">
        <div className="admin-editor-main">
          <section className="admin-panel">
            <h2>Post content</h2>

            <label className="admin-field">
              <span>Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Your blog post title"
                required
              />
            </label>

            <label className="admin-field">
              <span>URL slug</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setSlug(e.target.value);
                }}
                placeholder="my-blog-post-slug"
                required
              />
            </label>

            <label className="admin-field">
              <span>Excerpt</span>
              <textarea
                value={excerpt}
                onChange={(e) => handleExcerptChange(e.target.value)}
                placeholder="Short summary for cards and SEO (1–2 sentences)"
                rows={3}
                required
              />
            </label>

            <div className="admin-toolbar">
              <span className="admin-toolbar-label">Insert</span>
              <button type="button" onClick={() => insertMarkdown("**", "**", "bold text")}>
                Bold
              </button>
              <button type="button" onClick={() => insertMarkdown("*", "*", "italic text")}>
                Italic
              </button>
              <button type="button" onClick={() => insertMarkdown("\n## ", "\n", "Heading")}>
                H2
              </button>
              <button type="button" onClick={() => insertMarkdown("\n### ", "\n", "Subheading")}>
                H3
              </button>
              <button type="button" onClick={insertNumberedSection}>
                1. Section
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("[", "](https://example.com)", "link text")}
              >
                Link
              </button>
              <button type="button" onClick={() => insertMarkdown("\n- ", "\n", "list item")}>
                Bullet list
              </button>
              <button type="button" onClick={() => insertMarkdown("\n1. ", "\n", "list item")}>
                Numbered list
              </button>
              <button type="button" onClick={() => insertMarkdown("\n> ", "\n", "Quote")}>
                Quote
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("\n```\n", "\n```\n", "code")}
              >
                Code
              </button>
              <label className="admin-upload-btn">
                {uploading ? "Uploading…" : "Image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file);
                  }}
                />
              </label>
            </div>

            <label className="admin-field">
              <span>Body (Markdown)</span>
              <textarea
                ref={contentRef}
                className="admin-content-area"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post here. Use headings, links, images, and numbered sections for SEO-friendly structure."
                rows={22}
                required
              />
            </label>
          </section>
        </div>

        <aside className="admin-editor-side">
          <section className="admin-panel">
            <h2>Publish</h2>

            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <span>{published ? "Published" : "Draft"}</span>
            </label>

            <label className="admin-field">
              <span>Publish date</span>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </label>

            <label className="admin-field">
              <span>Tags (comma separated)</span>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Next.js, SaaS, PostgreSQL"
              />
            </label>

            {tagList.length > 0 && (
              <div className="blog-tags admin-tag-preview">
                {tagList.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </section>

          <section className="admin-panel">
            <h2>Cover image</h2>

            {coverImage && (
              <div className="admin-cover-preview">
                <Image src={coverImage} alt="" width={480} height={270} />
              </div>
            )}

            <label className="admin-field">
              <span>Image URL</span>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/assets/blog/your-cover.jpg"
              />
            </label>

            <label className="admin-upload-btn admin-upload-btn-block">
              {uploading ? "Uploading…" : "Upload cover image"}
              <input type="file" accept="image/*" hidden onChange={handleCoverUpload} />
            </label>
          </section>

          <section className="admin-panel">
            <h2>SEO</h2>

            <label className="admin-field">
              <span>Meta title</span>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO title (defaults to post title)"
              />
            </label>

            <label className="admin-field">
              <span>Meta description</span>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO description for Google and social previews"
                rows={4}
              />
            </label>
          </section>

          <div className="admin-editor-actions">
            <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
              {saving ? "Saving…" : published ? "Publish" : "Save draft"}
            </button>
            {isEdit && (
              <button type="button" className="btn btn-ghost admin-delete-btn" onClick={handleDelete}>
                Delete post
              </button>
            )}
          </div>

          {error && <p className="admin-error">{error}</p>}
        </aside>
      </div>
    </form>
  );
}
