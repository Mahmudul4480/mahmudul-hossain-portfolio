export interface Project {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  browserUrl: string;
  image?: string;
  imageAlt?: string;
  monoTag?: string;
  isPrivate?: boolean;
  fullWidth?: boolean;
}

export const projects: Project[] = [
  {
    slug: "bariwala-pro",
    title: "Bariwala Pro",
    kicker: "Property Management SaaS",
    description:
      "Multi-tenant B2B workspace management with automated utility billing ledgers and role-based access, isolated with PostgreSQL RLS.",
    tags: ["Next.js", "PostgreSQL RLS", "Multi-tenant"],
    liveUrl: "https://www.socialmediacaring.com/bariowala",
    browserUrl: "socialmediacaring.com/bariowala",
    image: "/assets/project-bariwala.jpg",
    imageAlt: "Bariwala Pro property management dashboard shown on laptop and mobile",
  },
  {
    slug: "tideway-shipping",
    title: "Tide Way Shipping OPC",
    kicker: "Maritime Logistics Platform",
    description:
      "Interactive GIS mapping and vessel tracking on the Mapbox API, with a secure B2B quote ingestion pipeline and a responsive Tailwind UI.",
    tags: ["Mapbox GIS", "B2B Quotes", "Tailwind"],
    liveUrl: "https://www.tidewayshipping.com",
    browserUrl: "tidewayshipping.com",
    image: "/assets/project-tideway.jpg",
    imageAlt: "Tide Way Shipping maritime logistics dashboard on multiple screens",
  },
  {
    slug: "proactive-security-bd",
    title: "Proactive Security Services BD",
    kicker: "Brand Identity + Corporate Platform",
    description:
      "End-to-end digital branding and a responsive React / Node.js platform integrated with secure request-for-quote workflows.",
    tags: ["Brand identity", "React / Node.js", "RFQ workflow"],
    liveUrl: "https://www.proactivesecuritybd.com",
    browserUrl: "proactivesecuritybd.com",
    monoTag: "Proactive Security BD",
  },
  {
    slug: "school-management-erp",
    title: "School Management ERP",
    kicker: "4-Portal Installable PWA",
    description:
      "Four secure, isolated role-based portals — Admin, Teacher, Parent, Student — built on Firebase Custom Claims and Firestore Security Rules.",
    tags: ["Firebase", "Custom claims", "Installable PWA"],
    liveUrl: "https://www.socialmediacaring.com",
    browserUrl: "socialmediacaring.com",
    image: "/assets/project-school.jpg",
    imageAlt: "School Management ERP guardian dashboard with attendance and gradebook",
  },
  {
    slug: "b2b-lead-portal",
    title: "B2B Quote & Lead-Generation Portal",
    kicker: "Lead-Generation Portal",
    description:
      "An interactive, multi-step lead-capture wizard with dynamic question routing that validates client metrics and securely saves qualified leads.",
    tags: ["Multi-step wizard", "Dynamic routing", "Lead capture"],
    browserUrl: "private client build",
    monoTag: "B2B Quote & Lead-Gen Portal",
    isPrivate: true,
    fullWidth: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
