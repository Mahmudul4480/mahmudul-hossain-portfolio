import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import ServiceIcon from "@/components/ServiceIcon";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceFaqList from "@/components/ServiceFaqList";
import RelatedProjects from "@/components/RelatedProjects";
import RelatedServices from "@/components/RelatedServices";
import ServiceContactCTA from "@/components/ServiceContactCTA";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { getProjectBySlug } from "@/data/projects";
import { getRelatedServices, getServiceBySlug, services, type Service } from "@/data/services";
import { siteConfig } from "@/data/site";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const title = `${service.metaTitle} | Mahmudul Hossain`;
  const url = `${siteConfig.url}/services/${service.slug}`;

  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: service.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.metaDescription,
    },
  };
}

function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    offers: {
      "@type": "Offer",
      price: service.startingPrice,
      priceCurrency: "USD",
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const relatedProjects = service.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p));
  const relatedServices = getRelatedServices(service.slug, 3);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems, siteConfig.url)),
        }}
      />
      <Link href="#main" className="skip-link">
        Skip to content
      </Link>
      <Nav />
      <main id="main">
        <section className="section service-detail-hero">
          <div className="wrap">
            <Breadcrumb items={breadcrumbItems} />
            <Reveal className="service-detail-hero-grid">
              <div>
                <p className="eyebrow">{service.name}</p>
                <h1>{service.heroHeadline}</h1>
                <p className="services-hero-lede">{service.shortDescription}</p>
                <div className="service-price-tag">
                  <span className="mono">Starting at</span>
                  <strong>{service.startingPrice}</strong>
                </div>
                <div className="hero-ctas">
                  <a className="btn btn-primary" href={`mailto:${siteConfig.email}`}>
                    Get a quote
                  </a>
                  <Link href="/services" className="btn btn-ghost">
                    All services
                  </Link>
                </div>
              </div>
              <div className="service-hero-icon-panel" aria-hidden="true">
                <ServiceIcon name={service.icon} className="service-hero-icon" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap service-detail-grid">
            <Reveal>
              <h2>What&apos;s included</h2>
              <ul className="service-checklist">
                {service.whatIsIncluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="service-subhead">Ideal for</h2>
              <ul className="service-ideal-list">
                {service.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2>How I work</h2>
              <ServiceProcess steps={service.process} />
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal>
              <RelatedProjects projects={relatedProjects} />
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal>
              <h2>Frequently asked questions</h2>
              <ServiceFaqList faqs={service.faqs} />
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal>
              <RelatedServices services={relatedServices} />
            </Reveal>
          </div>
        </section>

        <ServiceContactCTA
          headline={`Let's talk about ${service.name.toLowerCase()}`}
          description={`Tell me where you are today and where you want to be. I'll reply with an honest scope and quote for ${service.name.toLowerCase()}.`}
        />
      </main>
      <Footer />
    </>
  );
}
