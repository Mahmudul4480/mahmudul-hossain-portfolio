import { siteConfig } from "@/data/site";

export function personId() {
  return `${siteConfig.url}/#person`;
}

function websiteId() {
  return `${siteConfig.url}/#website`;
}

function telephone() {
  const digits = siteConfig.phone.replace(/\D/g, "");
  return digits.startsWith("880") ? `+${digits}` : `+880${digits.replace(/^0/, "")}`;
}

export function personReference() {
  return {
    "@type": "Person" as const,
    "@id": personId(),
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress" as const,
    addressLocality: siteConfig.location.locality,
    addressCountry: siteConfig.location.countryCode,
  };
}

function portraitUrl() {
  return `${siteConfig.url}${siteConfig.portrait}`;
}

/** Profile URLs already declared in site config. Do not add profiles that are not listed there. */
function profileUrls() {
  return Object.values(siteConfig.socials);
}

export function siteJsonLd() {
  const person = personId();
  const website = websiteId();
  const sameAs = profileUrls();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: siteConfig.name,
        alternateName: [...siteConfig.alternateNames],
        jobTitle: "Full-Stack Web & App Developer",
        description: siteConfig.description,
        disambiguatingDescription: `${siteConfig.name} is an independent full-stack web and app developer based in ${siteConfig.location.locality}, ${siteConfig.location.country}.`,
        url: siteConfig.url,
        image: portraitUrl(),
        email: siteConfig.email,
        telephone: telephone(),
        address: postalAddress(),
        sameAs,
        knowsAbout: [...siteConfig.knowsAbout],
      },
      {
        "@type": "WebSite",
        "@id": website,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: [siteConfig.seoTitle, siteConfig.nameBn],
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": person },
        about: { "@id": person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile`,
        url: siteConfig.url,
        name: siteConfig.seoTitle,
        description: siteConfig.description,
        inLanguage: "en",
        isPartOf: { "@id": website },
        mainEntity: { "@id": person },
        about: { "@id": person },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: `${siteConfig.name} — ${siteConfig.title}`,
        url: siteConfig.url,
        image: portraitUrl(),
        email: siteConfig.email,
        telephone: telephone(),
        description: siteConfig.description,
        address: postalAddress(),
        founder: { "@id": person },
        sameAs,
        areaServed: "Worldwide",
      },
    ],
  };
}
