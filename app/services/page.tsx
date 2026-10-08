import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildPageMetadata, jsonLd } from "@/lib/seo";

const servicesDescription =
  "Digital marketing, Facebook ads, SEO, social design, landing pages, and domain setup — delivered by one technical owner, not an agency roster.";

export const metadata: Metadata = buildPageMetadata({
  title: "Services — Beyond Code, The Full Growth Stack",
  description: servicesDescription,
  path: "/services",
  keywords: ["digital marketing", "SEO services", "Facebook ads", "landing pages", siteConfig.name],
});

export default function ServicesIndexPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Services" }];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${siteConfig.url}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListJsonLd) }}
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
        <section className="section services-index-hero">
          <div className="wrap">
            <Breadcrumb items={breadcrumbItems} />
            <Reveal>
              <p className="eyebrow">Services</p>
              <h1>Beyond code — the full growth stack</h1>
              <p className="services-hero-lede">
                I&apos;m not just the engineer who builds your product. I can own the marketing,
                creative, and infrastructure around it too — same person, same standard, no
                handoffs.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="cap-grid">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
