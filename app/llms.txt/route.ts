import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { getAllPosts } from "@/lib/blog.server";

export function GET() {
  const serviceLines = services
    .map(
      (service) =>
        `- [${service.name}](${siteConfig.url}/services/${service.slug}): ${service.shortDescription}`,
    )
    .join("\n");

  const postLines = getAllPosts()
    .map((post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.excerpt}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is an independent full-stack engineer and SaaS architect. He works solo — no agency roster — and owns the technical delivery end to end.

## Contact

- Website: ${siteConfig.url}
- Email: ${siteConfig.email}
- WhatsApp: ${siteConfig.whatsapp}
- GitHub: ${siteConfig.socials.github}
- LinkedIn: ${siteConfig.socials.linkedin}

## Pages

- [Home](${siteConfig.url}): portfolio, capabilities, selected work, and contact
- [Services](${siteConfig.url}/services): marketing, ads, SEO, design, landing pages, and domain setup
- [Blog](${siteConfig.url}/blog): engineering notes on SaaS, Next.js, and PostgreSQL
- [RSS](${siteConfig.url}/feed.xml): blog feed

## Services

${serviceLines}

## Writing

${postLines}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
