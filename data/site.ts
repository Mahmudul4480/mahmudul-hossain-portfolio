export const siteConfig = {
  name: "Mahmudul Hossain",
  title: "Full-Stack Engineer & SaaS Architect",
  tagline: "Full-stack engineer · SaaS architect · Solo, no agency",
  description:
    "Independent full-stack engineer and SaaS architect specializing in Next.js, React, Node.js and secure multi-tenant database architecture. Solo developer. 100% technical ownership.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahmudulhossain.com",
  email: "hello@mahmudulhossain.com",
  phone: "01761870650",
  whatsapp: "https://wa.me/8801761870650",
  socials: {
    github: "https://github.com/Mahmudul4480",
    linkedin: "https://www.linkedin.com/in/mahmudul-hossain/",
  },
  navLinks: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Capabilities", href: "/#stack" },
    { label: "Workflow", href: "/#workflow" },
    { label: "About", href: "/#about" },
  ],
  footerLinks: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Capabilities", href: "/#stack" },
    { label: "Contact", href: "/#contact" },
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "Firebase",
    "Multi-tenant SaaS",
    "Row Level Security",
    "Tailwind CSS",
    "Vercel",
    "Cloudflare",
  ],
  tickerItems: [
    "bariwala-pro · property SaaS",
    "tidewayshipping.com · maritime logistics",
    "proactivesecuritybd.com · corporate platform",
    "school ERP · 4-portal PWA",
  ],
  loomEmbedUrl: "https://www.loom.com/embed/84ee269a2d754fe7bd3e92df005bf4ef",
} as const;

export type SiteConfig = typeof siteConfig;
