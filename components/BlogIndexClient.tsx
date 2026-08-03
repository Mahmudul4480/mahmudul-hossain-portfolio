"use client";

import { useMemo, useState } from "react";
import BlogPostCard, { type BlogPostSummary } from "@/components/BlogPostCard";
import { POSTS_PER_PAGE, getTagSlug } from "@/lib/blog-utils";

interface BlogIndexClientProps {
  posts: BlogPostSummary[];
  tags: string[];
  activeTag?: string;
}

export default function BlogIndexClient({ posts, tags, activeTag }: BlogIndexClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(activeTag ?? null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) =>
      post.tags.some((tag) => getTagSlug(tag) === selectedTag || tag === selectedTag),
    );
  }, [posts, selectedTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  function selectTag(tag: string | null) {
    setSelectedTag(tag);
    setPage(1);
  }

  return (
    <>
      <div className="blog-tag-filter">
        <button
          type="button"
          className={selectedTag === null ? "active" : undefined}
          onClick={() => selectTag(null)}
        >
          All
        </button>
        {tags.map((tag) => {
          const slug = getTagSlug(tag);
          return (
            <button
              key={tag}
              type="button"
              className={selectedTag === slug ? "active" : undefined}
              onClick={() => selectTag(slug)}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="blog-grid">
        {paginated.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} priority={index === 0 && currentPage === 1} />
        ))}
      </div>

      {filtered.length === 0 && <p className="blog-empty">No posts match this tag yet.</p>}

      {totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Blog pagination">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
}
