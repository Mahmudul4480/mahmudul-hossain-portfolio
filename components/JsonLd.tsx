import { siteConfig } from "@/data/site";
import { jsonLd } from "@/lib/seo";

function telephone() {
  const digits = siteConfig.phone.replace(/\D/g, "");
  return digits.startsWith("880") ? `+${digits}` : `+880${digits.replace(/^0/, "")}`;
}

export default function JsonLd() {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: telephone(),
        image: `${siteConfig.url}/opengraph-image`,
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
        knowsAbout: siteConfig.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: `${siteConfig.name} — ${siteConfig.title}`,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        email: siteConfig.email,
        telephone: telephone(),
        description: siteConfig.description,
        founder: { "@id": personId },
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
        areaServed: "Worldwide",
        serviceType: [
          "Full-Stack Development",
          "SaaS Architecture",
          "Multi-tenant Database Design",
          "SEO",
          "Digital Marketing",
        ],
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
  );
}
