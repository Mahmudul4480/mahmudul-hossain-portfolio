import type { BlogHeading } from "@/lib/blog-types";

interface BlogTableOfContentsProps {
  headings: BlogHeading[];
}

export default function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  if (headings.length < 3) return null;

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <p className="blog-toc-label">On this page</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "blog-toc-h3" : undefined}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
