import { Noto_Sans_Bengali } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import RelatedServices from "@/components/RelatedServices";
import Reveal from "@/components/Reveal";
import ServiceContactCTA from "@/components/ServiceContactCTA";
import ServiceProcess from "@/components/ServiceProcess";
import {
  chittagongAreas,
  chittagongBangla,
  chittagongFaqs,
  chittagongMeta,
  chittagongOfferings,
  chittagongPrep,
  chittagongProcess,
  chittagongReasons,
  chittagongWork,
  webDeveloperChittagong,
} from "@/data/web-developer-chittagong";
import { getServiceBySlug, type Service, type ServiceFaq } from "@/data/services";
import { siteConfig } from "@/data/site";
import { jsonLd } from "@/lib/seo";
import { personId, personSameAs, siteTelephone } from "@/lib/structured-data";

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const pagePath = "/services/web-developer-chittagong";

const relatedServices = ["landing-page-development", "seo", "domain-hosting-business-email"]
  .map((slug) => getServiceBySlug(slug))
  .filter((service): service is Service => Boolean(service));

function FaqList({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <div className="faq-list local-faq">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="faq-item"
          lang={faq.lang === "bn" ? "bn" : undefined}
        >
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

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
  const englishFaqs = chittagongFaqs.filter((faq) => faq.lang !== "bn");
  const banglaFaqs = chittagongFaqs.filter((faq) => faq.lang === "bn");
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
        <section className="section service-detail-hero">
          <div className="wrap">
            <Breadcrumb items={breadcrumbItems} />
            <Reveal className="service-detail-hero-grid">
              <div className="local-hero-copy">
                <p className="eyebrow">{webDeveloperChittagong.eyebrow}</p>
                <h1 className="local-hero-title">{webDeveloperChittagong.heroHeadline}</h1>
                <p className="services-hero-lede">
                  I&apos;m {siteConfig.name} (
                  <span lang="bn" className={bengali.className}>
                    {siteConfig.nameBn}
                  </span>
                  ), a solo full-stack web and app developer based in Chattogram, Bangladesh. If you
                  want a web developer in Chittagong, you can hire an agency that sells the project
                  and passes it on. I don&apos;t. You talk to me, I build it, and I&apos;m still the
                  person you message after launch.
                </p>
                <p className="services-hero-lede">
                  A website developer in Chattogram should be able to sit with you. I do that from
                  here, and I also work remotely across Bangladesh and abroad. I build business
                  websites, landing pages, SaaS, ERP and school portals, rental management software,
                  and Android apps — with Next.js, React, Supabase, Firebase, and Flutter.
                </p>
                <div className="hero-ctas">
                  <a
                    className="btn btn-primary"
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp me
                  </a>
                  <Link
                    className="btn btn-ghost"
                    href={webDeveloperChittagong.ctaHref ?? "/#contact"}
                  >
                    {webDeveloperChittagong.ctaLabel}
                  </Link>
                </div>
              </div>
              <div className="local-hero-panel" aria-hidden="true">
                <p className="mono">Based in Chattogram</p>
                <p className="local-hero-line">
                  Web, software, and Android — one person, start to launch.
                </p>
                <ul className="local-chips">
                  {["Next.js", "React", "Supabase", "Firebase", "Flutter"].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="build">
          <div className="wrap local-section">
            <Reveal>
              <h2>What I build</h2>
              <p className="local-lede">
                A site, a landing page, or the software behind the counter. Where a service page
                already exists, it&apos;s linked.
              </p>
              <div className="cap-grid local-offer-grid">
                {chittagongOfferings.map((offer) => (
                  <article key={offer.title} className="cap-card">
                    <h3>{offer.title}</h3>
                    <p>{offer.body}</p>
                    {offer.links?.map((link) => (
                      <Link key={link.href} href={link.href} className="service-card-link">
                        {link.label}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </Link>
                    ))}
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="why-local">
          <div className="wrap local-section">
            <Reveal>
              <h2>Why hire a developer who is already in Chattogram</h2>
              <p className="local-lede">
                A remote developer can be the right hire. This is what changes when the person
                writing the code already lives in Chattogram.
              </p>
              <div className="local-why">
                {chittagongReasons.map((reason) => (
                  <article key={reason.title} className="cap-card">
                    <h3>{reason.title}</h3>
                    <p>{reason.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="work">
          <div className="wrap local-section">
            <Reveal>
              <h2>Work you can open</h2>
              <p className="local-lede">
                Already public on this site. I haven&apos;t added a client for this page — open the
                write-up or the live link.
              </p>
              <div className="local-work">
                {chittagongWork.map((project) => (
                  <article key={project.title} className="local-work-card">
                    <div className="local-work-shot">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, 360px"
                      />
                    </div>
                    <div className="local-work-body">
                      <p className="proj-kicker">{project.kicker}</p>
                      <h3>{project.title}</h3>
                      <p>{project.body}</p>
                      <div className="local-work-links">
                        {project.links.map((link) =>
                          link.external ? (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label} ↗
                            </a>
                          ) : (
                            <Link key={link.href} href={link.href}>
                              {link.label}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap service-detail-grid">
            <Reveal>
              <h2>How a project runs</h2>
              <p className="local-lede">
                Four steps. You don&apos;t need a specification — send the list below and I can say
                whether I&apos;m the right person, and what the job actually is.
              </p>
              <h3 className="service-subhead">What helps me quote</h3>
              <ul className="service-checklist">
                {chittagongPrep.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <ServiceProcess steps={chittagongProcess} />
            </Reveal>
          </div>
        </section>

        <section className="section" id="areas">
          <div className="wrap">
            <Reveal className="local-areas">
              <div>
                <h2>Areas I serve</h2>
                <p>
                  I can meet in these parts of Chattogram. The rest of the city is fine too — these
                  are simply places where sitting down for an hour is easy.
                </p>
                <ul className="local-chips">
                  {chittagongAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
                <p>
                  I also work remotely across Bangladesh, and with people in Europe, the United
                  States, and Canada who want one engineer rather than an agency. Where we meet
                  changes. Who writes the code does not.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="bangla" lang="bn">
          <div className={`wrap local-section local-bangla ${bengali.className}`}>
            <Reveal>
              <p className="eyebrow">বাংলায়</p>
              <h2>{chittagongBangla.heading}</h2>
              {chittagongBangla.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="local-lede">
                  {paragraph}
                </p>
              ))}
              <FaqList faqs={banglaFaqs} />
            </Reveal>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap local-section">
            <Reveal>
              <h2>Frequently asked questions</h2>
              <p className="local-lede">If your question isn&apos;t here, send it.</p>
              <FaqList faqs={englishFaqs} />
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
          headline="Need a web developer in Chittagong?"
          description="Tell me what you want built, whether we should meet in Chattogram, and when you need it. I'll reply with a scope and a quote — no package price until I understand the job."
        />
      </main>
      <Footer />
    </>
  );
}
