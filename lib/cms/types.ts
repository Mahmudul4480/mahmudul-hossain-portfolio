export interface CmsBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  content: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  readingTimeMinutes: number;
}

export interface CmsBlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  content: string;
  tags: string[];
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
}

export interface CmsBlogPostUpdate extends Partial<CmsBlogPostInput> {
  id: string;
}

export type AdminPostSource = "cms" | "mdx";

export interface AdminBlogPost extends CmsBlogPost {
  source: AdminPostSource;
}
