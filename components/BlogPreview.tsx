import Link from "next/link";
import { getLatestPosts } from "@/lib/blog.server";
import { toPostSummary } from "@/lib/blog-utils";
import BlogPostCard from "./BlogPostCard";
import Reveal from "./Reveal";

export default function BlogPreview() {
  const posts = getLatestPosts(3).map(toPostSummary);

  return (
    <section className="section" id="blog-preview">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">From the build log</p>
            <h2>Notes on shipping SaaS</h2>
          </div>
          <p>
            Practical writing on engineering, growth, and the stack I use to ship client work — no
            fluff, no content-mill filler.
          </p>
        </Reveal>

        <Reveal className="blog-grid">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </Reveal>

        <Reveal className="services-preview-foot">
          <Link href="/blog" className="btn btn-ghost">
            View all articles
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
