import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";
import { formatBlogDate, getTagSlug } from "@/lib/blog-utils";

export type BlogPostSummary = Omit<BlogPost, "content">;

interface BlogPostCardProps {
  post: BlogPostSummary;
  priority?: boolean;
}

export default function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  return (
    <article className="blog-card blog-card-with-cover">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="blog-card-cover-link" tabIndex={-1}>
          <Image
            src={post.coverImage}
            alt=""
            width={640}
            height={360}
            className="blog-card-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
            priority={priority}
          />
        </Link>
      )}
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-date">{formatBlogDate(post.publishedAt)}</span>
          <span className="blog-read">{post.readingTimeMinutes} min read</span>
        </div>
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="blog-tags">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${getTagSlug(tag)}`} className="blog-tag-link">
              {tag}
            </Link>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`} className="blog-card-link">
          Read article
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
