import Link from "next/link";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import ChittagongLanding from "@/components/ctg/ChittagongLanding";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import RelatedServices from "@/components/RelatedServices";
import { chittagongFaqs, chittagongMeta } from "@/data/web-developer-chittagong";
import { getServiceBySlug, type Service } from "@/data/services";
import { siteConfig } from "@/data/site";
import { jsonLd } from "@/lib/seo";
import { personId, personSameAs, siteTelephone } from "@/lib/structured-data";

const pagePath = "/services/web-developer-chittagong";

const relatedServices = ["landing-page-development", "seo", "domain-hosting-business-email"]
  .map((slug) => getServiceBySlug(slug))
  .filter((service): service is Service => Boolean(service));

function localServiceJsonLd() {
  const url = `${siteConfig.url}${pagePath}`;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#service`,
    name: siteConfig.name,
    alternateName: siteConfig.nameBn,
    url,
    image: `${siteConfig.url}${siteConfig.portrait}`,
    email: siteConfig.email,
    telephone: siteTelephone(),
    description: chittagongMeta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chattogram",
      addressRegion: "Chittagong Division",
      addressCountry: "BD",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Chattogram",
        alternateName: "Chittagong",
      },
      {
        "@type": "Country",
        name: "Bangladesh",
      },
    ],
    provider: { "@id": personId() },
    founder: { "@id": personId() },
    sameAs: personSameAs(),
  };
}

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: chittagongFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export default function WebDeveloperChittagongPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Web Developer in Chittagong", href: pagePath },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbJsonLd(breadcrumbItems, siteConfig.url)),
        }}
      />
      <Link href="#main" className="skip-link">
        Skip to content
      </Link>
      <Nav />
      <main id="main">
        <div className="wrap" style={{ paddingTop: 24 }}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <ChittagongLanding />
        <section className="section">
          <div className="wrap">
            <RelatedServices services={relatedServices} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

