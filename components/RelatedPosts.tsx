import type { BlogPostSummary } from "@/components/BlogPostCard";
import BlogPostCard from "@/components/BlogPostCard";

interface RelatedPostsProps {
  posts: BlogPostSummary[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="related-block">
      <h2>Related posts</h2>
      <div className="blog-grid related-blog-grid">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
