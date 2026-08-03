import { siteConfig } from "@/data/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        url: siteConfig.url,
        email: siteConfig.email,
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
        knowsAbout: siteConfig.knowsAbout,
      },
      {
        "@type": "ProfessionalService",
        name: `${siteConfig.name} — ${siteConfig.title}`,
        url: siteConfig.url,
        email: siteConfig.email,
        description: siteConfig.description,
        founder: {
          "@type": "Person",
          name: siteConfig.name,
        },
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
        areaServed: "Worldwide",
        serviceType: [
          "Full-Stack Development",
          "SaaS Architecture",
          "Multi-tenant Database Design",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
