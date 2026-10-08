export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  source?: "mdx" | "cms";
  id?: string;
  published?: boolean;
}

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  readingTimeMinutes: number;
}

export const POSTS_PER_PAGE = 9;
