export type ServiceIconName =
  "Megaphone" | "Target" | "Search" | "Palette" | "Layout" | "Monitor" | "Globe";

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  icon: ServiceIconName;
  heroHeadline: string;
  metaTitle: string;
  metaDescription: string;
  whatIsIncluded: string[];
  process: ServiceProcessStep[];
  idealFor: string[];
  startingPrice: string;
  faqs: ServiceFaq[];
  relatedProjectSlugs: string[];
  featured?: boolean;
}

export const services: Service[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortDescription:
      "Strategy-first growth plans that connect your product, audience, and channels.",
    icon: "Megaphone",
    heroHeadline: "A clear growth plan — not a scattershot posting schedule.",
    metaTitle: "Digital Marketing Strategy Services",
    metaDescription:
      "Independent digital marketing strategy for SaaS and service businesses — channel planning, messaging, funnels, and measurable growth without agency overhead.",
    whatIsIncluded: [
      "Audit of your current website, social presence, and conversion paths",
      "Audience and competitor research with a plain-language positioning brief",
      "Channel strategy across organic, paid, email, and referral touchpoints",
      "90-day execution roadmap with priorities, KPIs, and owner assignments",
      "Monthly review cadence with recommendations you can act on immediately",
    ],
    process: [
      {
        step: "01",
        title: "Discovery & audit",
        description:
          "I review your site, analytics, and existing campaigns to find what's working and what's leaking leads.",
      },
      {
        step: "02",
        title: "Strategy document",
        description:
          "You get a focused plan: who to reach, what to say, where to show up, and how to measure it.",
      },
      {
        step: "03",
        title: "Launch priorities",
        description:
          "We pick the highest-impact moves first — no bloated slide decks, just a sequenced action list.",
      },
      {
        step: "04",
        title: "Iterate on data",
        description:
          "Monthly check-ins to refine messaging, channels, and spend based on real results.",
      },
    ],
    idealFor: [
      "Founders who need a marketing owner, not a rotating cast of freelancers",
      "SaaS products preparing for launch or repositioning",
      "Local and B2B brands ready to invest in consistent lead flow",
    ],
    startingPrice: "Custom quote",
    faqs: [
      {
        question: "Do you run campaigns yourself or only advise?",
        answer:
          "Both. I write the strategy and can execute key channels — paid ads, landing pages, email flows — myself. You work with one person end to end.",
      },
      {
        question: "How long before I see results?",
        answer:
          "Quick wins often show within 4–6 weeks on paid channels. Organic and SEO compounding takes longer; I'll set honest timelines upfront.",
      },
      {
        question: "Is this tied to a long-term contract?",
        answer:
          "No. Engagements start with a defined scope or 90-day sprint. Continue month-to-month only if the numbers justify it.",
      },
    ],
    relatedProjectSlugs: ["tideway-shipping", "proactive-security-bd"],
    featured: true,
  },
  {
    slug: "facebook-ads-management",
    name: "Facebook Ads Management",
    shortDescription:
      "Meta campaigns built for leads and sales — structured, tracked, and optimized.",
    icon: "Target",
    heroHeadline: "Facebook and Instagram ads that feed your pipeline — not just your reach.",
    metaTitle: "Facebook Ads Management Services",
    metaDescription:
      "Facebook and Instagram ads management with proper tracking, creative testing, and lead-focused optimization for Bangladesh and international markets.",
    whatIsIncluded: [
      "Account structure, pixel/CAPI setup, and conversion event configuration",
      "Audience research: cold, warm, retargeting, and lookalike segments",
      "Ad copy and creative direction aligned with your offer and landing page",
      "Weekly optimization: budget shifts, creative refreshes, and audience pruning",
      "Transparent reporting — cost per lead, ROAS, and next-step recommendations",
    ],
    process: [
      {
        step: "01",
        title: "Tracking foundation",
        description:
          "Pixel, events, and UTM discipline so every click is attributable before spend scales.",
      },
      {
        step: "02",
        title: "Campaign architecture",
        description:
          "Prospecting, retargeting, and testing campaigns structured for clean learning.",
      },
      {
        step: "03",
        title: "Launch & learn",
        description: "Small-budget tests on copy and creative, then scale what converts.",
      },
      {
        step: "04",
        title: "Scale or cut",
        description:
          "Double down on winners, kill underperformers, and refresh creative before fatigue hits.",
      },
    ],
    idealFor: [
      "Businesses generating leads or sales through Meta platforms",
      "Brands stuck with rising CPMs and flat conversion rates",
      "Teams that need hands-on management without a full agency retainer",
    ],
    startingPrice: "From $400/mo + ad spend",
    faqs: [
      {
        question: "Do you design the ad creatives?",
        answer:
          "I provide creative direction and can deliver social post designs and simple video briefs. For high-volume creative production, we scope that separately.",
      },
      {
        question: "What's the minimum ad budget?",
        answer:
          "I recommend at least $300–500/month in ad spend to gather meaningful data. Management fee is separate and quoted based on account complexity.",
      },
      {
        question: "Can you work with my existing Business Manager?",
        answer:
          "Yes. I'll audit the current setup, fix tracking gaps, and restructure campaigns without resetting your historical learning unnecessarily.",
      },
    ],
    relatedProjectSlugs: ["proactive-security-bd", "bariwala-pro"],
    featured: true,
  },
  {
    slug: "seo",
    name: "SEO (Search Engine Optimization)",
    shortDescription: "Technical and content SEO that helps the right people find you on Google.",
    icon: "Search",
    heroHeadline: "Rank for searches that actually bring clients — not vanity keywords.",
    metaTitle: "SEO Services — Search Engine Optimization",
    metaDescription:
      "Technical SEO, on-page optimization, and content strategy for SaaS and business websites. Built by a developer who ships fast, indexable sites.",
    whatIsIncluded: [
      "Technical SEO audit: crawlability, Core Web Vitals, schema, and index coverage",
      "Keyword research mapped to service pages and blog opportunities",
      "On-page optimization: titles, meta descriptions, headings, and internal links",
      "Structured data implementation (JSON-LD) where it adds clear value",
      "Monthly ranking and traffic report with prioritized fix list",
    ],
    process: [
      {
        step: "01",
        title: "Technical baseline",
        description:
          "Fix what's blocking Google — speed, mobile, broken links, duplicate content, missing schema.",
      },
      {
        step: "02",
        title: "Keyword map",
        description:
          "Align each important page with a search intent and a realistic ranking target.",
      },
      {
        step: "03",
        title: "On-page execution",
        description:
          "Update copy, metadata, and internal linking so pages earn their place in the index.",
      },
      {
        step: "04",
        title: "Monitor & expand",
        description: "Track movement, publish supporting content, and adjust as competitors shift.",
      },
    ],
    idealFor: [
      "Business websites that should generate inbound leads but don't rank",
      "SaaS products launching in competitive categories",
      "Companies migrating to Next.js who want SEO baked in from day one",
    ],
    startingPrice: "From $350/mo",
    faqs: [
      {
        question: "How is your SEO different from typical agencies?",
        answer:
          "I'm a developer first. Technical SEO isn't a ticket to another team — I fix site architecture, performance, and schema in the same codebase I ship.",
      },
      {
        question: "Do you guarantee page-one rankings?",
        answer:
          "No one ethical can. I guarantee a clear audit, honest keyword targets, and execution on factors within our control.",
      },
      {
        question: "Do you write blog content too?",
        answer:
          "I can outline and optimize content, and write technical or product-focused posts. Volume content production is scoped separately.",
      },
    ],
    relatedProjectSlugs: ["tideway-shipping", "proactive-security-bd"],
    featured: true,
  },
  {
    slug: "social-media-post-design",
    name: "Social Media Post Design",
    shortDescription: "On-brand posts and carousels that look sharp and stop the scroll.",
    icon: "Palette",
    heroHeadline:
      "Social creative that matches your brand — consistent, fast, and ready to publish.",
    metaTitle: "Social Media Post Design Services",
    metaDescription:
      "Professional social media post and carousel design for Facebook, Instagram, and LinkedIn — on-brand templates delivered ready to publish.",
    whatIsIncluded: [
      "Brand-aligned template system for feed posts, stories, and carousels",
      "Custom designs for campaigns, launches, offers, and announcements",
      "Correct export sizes for Facebook, Instagram, LinkedIn, and WhatsApp status",
      "Editable source files (Figma) so your team can reuse the system",
      "Turnaround batches — weekly or campaign-based delivery",
    ],
    process: [
      {
        step: "01",
        title: "Brand intake",
        description: "Logo, colors, tone, and examples of what you like (and what to avoid).",
      },
      {
        step: "02",
        title: "Template build",
        description: "Core layouts for your most common post types — promo, testimonial, tip, CTA.",
      },
      {
        step: "03",
        title: "Batch production",
        description: "Weekly or campaign sets delivered export-ready with copy placement in mind.",
      },
      {
        step: "04",
        title: "Refine the system",
        description:
          "Adjust templates based on engagement and keep creative fresh without starting over.",
      },
    ],
    idealFor: [
      "Brands posting regularly but lacking a cohesive visual identity",
      "Businesses running paid social who need matching organic creative",
      "Teams without an in-house designer who still want professional output",
    ],
    startingPrice: "From $25/post · packages available",
    faqs: [
      {
        question: "Do you write the caption copy too?",
        answer:
          "Design is the focus, but I can draft short captions or CTAs. Full copywriting packages are available as an add-on.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Two revision rounds per batch are standard. Additional rounds are billed fairly if scope expands.",
      },
      {
        question: "Can you match an existing brand guide?",
        answer:
          "Yes. Send your brand book or website and I'll align typography, color, and layout to what you already use.",
      },
    ],
    relatedProjectSlugs: ["proactive-security-bd", "school-management-erp"],
  },
  {
    slug: "cover-photo-banner-design",
    name: "Cover Photo / Banner Design",
    shortDescription: "Facebook covers, LinkedIn banners, YouTube art, and web hero graphics.",
    icon: "Layout",
    heroHeadline: "First impressions are pixel-deep — covers and banners that look intentional.",
    metaTitle: "Cover Photo & Banner Design Services",
    metaDescription:
      "Custom Facebook cover photos, LinkedIn banners, YouTube channel art, and website hero graphics — sized correctly and aligned with your brand.",
    whatIsIncluded: [
      "Facebook page cover, LinkedIn banner, and YouTube channel art (standard sizes)",
      "Website hero or landing page header graphics where needed",
      "Mobile-safe cropping checks so key text isn't clipped on phones",
      "Source files and PNG/WebP exports optimized for fast loading",
      "One round of revisions to nail layout and messaging hierarchy",
    ],
    process: [
      {
        step: "01",
        title: "Brief & references",
        description:
          "What you sell, who it's for, and any visual references or photos to incorporate.",
      },
      {
        step: "02",
        title: "Concept draft",
        description:
          "One strong direction first — clean layout, readable headline, on-brand colors.",
      },
      {
        step: "03",
        title: "Platform exports",
        description: "Every required size delivered with safe zones marked for profile overlays.",
      },
      {
        step: "04",
        title: "Handoff",
        description:
          "Final files plus a short guide on where each asset goes if you're updating profiles yourself.",
      },
    ],
    idealFor: [
      "New businesses launching social profiles that need to look established",
      "Rebrands updating covers across Facebook, LinkedIn, and YouTube",
      "Campaigns needing seasonal or promotional banner swaps",
    ],
    startingPrice: "From $75/cover set",
    faqs: [
      {
        question: "Do you provide the stock photos?",
        answer:
          "I can use your photos, licensed stock, or AI-assisted backgrounds where appropriate — disclosed and cleared for commercial use.",
      },
      {
        question: "Will my logo and tagline be readable on mobile?",
        answer:
          "Yes. I design with mobile crop zones in mind, especially for Facebook where profile photos overlap the cover.",
      },
      {
        question: "Can you update covers for a rebrand later?",
        answer:
          "Absolutely. If I built your original brand assets, updates are faster and cheaper because the system already exists.",
      },
    ],
    relatedProjectSlugs: ["proactive-security-bd", "tideway-shipping"],
  },
  {
    slug: "landing-page-development",
    name: "Landing Page Development",
    shortDescription: "Fast, conversion-focused pages — coded, deployed, and ready for ads.",
    icon: "Monitor",
    heroHeadline: "Landing pages that load fast, read clear, and convert — built by one engineer.",
    metaTitle: "Landing Page Development Services",
    metaDescription:
      "High-converting landing page development with Next.js — fast load times, mobile-first design, analytics, and ad-ready deployment on Vercel or Cloudflare.",
    whatIsIncluded: [
      "Single-page or multi-section layout from your brief or Figma file",
      "Mobile-first responsive build with Core Web Vitals in mind",
      "Contact form, Calendly embed, or lead-capture integration",
      "Analytics hooks (GA4, Meta Pixel, or Plausible) configured correctly",
      "Deployment to Vercel or Cloudflare with SSL and custom domain support",
    ],
    process: [
      {
        step: "01",
        title: "Scope & wireframe",
        description:
          "Define the offer, CTA, proof elements, and form fields before a single line of code.",
      },
      {
        step: "02",
        title: "Design & build",
        description: "Pixel-accurate implementation in Next.js — no bloated page builders.",
      },
      {
        step: "03",
        title: "Integrate & test",
        description: "Forms, pixels, and email notifications tested on real devices.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Deploy, connect your domain, and hand over a page you can send ad traffic to same-day.",
      },
    ],
    idealFor: [
      "Ad campaigns that need a dedicated page instead of sending traffic to the homepage",
      "Product launches, webinars, and limited-time offers",
      "B2B services collecting qualified leads through a focused message",
    ],
    startingPrice: "From $600/page",
    faqs: [
      {
        question: "Page builders vs. custom code — why Next.js?",
        answer:
          "Custom code loads faster, scales cleaner, and doesn't lock you into monthly builder fees. You own the repo.",
      },
      {
        question: "Can you A/B test headlines or layouts?",
        answer:
          "Yes. We can set up simple split tests or iterate versions as your ad data comes in.",
      },
      {
        question: "Do you include copywriting?",
        answer:
          "I write clear, direct copy in your brand voice as part of the build. Long-form sales pages may need extra scope.",
      },
    ],
    relatedProjectSlugs: ["tideway-shipping", "proactive-security-bd", "b2b-lead-portal"],
    featured: true,
  },
  {
    slug: "domain-hosting-business-email",
    name: "Domain, Hosting & Business Email Setup",
    shortDescription:
      "Domain registration, reliable hosting, SSL, and professional email — done right.",
    icon: "Globe",
    heroHeadline: "Your domain, hosting, and hello@ email — configured once, maintained properly.",
    metaTitle: "Domain, Hosting & Business Email Setup",
    metaDescription:
      "Domain registration, web hosting, SSL, DNS, and business email setup on Hostinger, Cloudflare, or Google Workspace — configured correctly the first time.",
    whatIsIncluded: [
      "Domain search, registration, and DNS configuration (A, CNAME, MX, TXT)",
      "Hosting setup on Hostinger, Cloudflare, or Vercel aligned with your stack",
      "Free SSL certificate and HTTPS redirect enforced site-wide",
      "Business email on Google Workspace or Hostinger Mail (hello@yourdomain.com)",
      "SPF, DKIM, and DMARC records so your emails land in inboxes, not spam",
    ],
    process: [
      {
        step: "01",
        title: "Requirements check",
        description: "What you're hosting, expected traffic, and how many mailboxes you need.",
      },
      {
        step: "02",
        title: "Register & point DNS",
        description: "Domain purchased, nameservers set, and records mapped to your host.",
      },
      {
        step: "03",
        title: "Email & SSL",
        description: "Mailboxes created, client apps configured, and SSL verified end-to-end.",
      },
      {
        step: "04",
        title: "Documentation handoff",
        description:
          "Login details, renewal dates, and a one-page guide so you're never locked out.",
      },
    ],
    idealFor: [
      "New businesses setting up their first professional web presence",
      "Teams migrating off free Gmail to a proper domain email",
      "Founders who want DNS and hosting handled by someone technical",
    ],
    startingPrice: "From $150 setup + provider costs",
    faqs: [
      {
        question: "Do you resell hosting or bill pass-through?",
        answer:
          "You pay the provider directly (Hostinger, Google, etc.). I charge for setup, configuration, and ongoing support if needed.",
      },
      {
        question: "Can you migrate an existing site to a new host?",
        answer:
          "Yes — including zero-downtime DNS cutover when possible and full backup before we switch.",
      },
      {
        question: "What if I already own the domain?",
        answer:
          "No problem. I work with your registrar, update DNS, and connect hosting and email without forcing a transfer.",
      },
    ],
    relatedProjectSlugs: ["bariwala-pro", "school-management-erp"],
  },
];

export const featuredServiceSlugs = [
  "digital-marketing",
  "seo",
  "landing-page-development",
  "facebook-ads-management",
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(currentSlug: string, count = 3): Service[] {
  const index = services.findIndex((s) => s.slug === currentSlug);
  const others = services.filter((s) => s.slug !== currentSlug);
  const start = index >= 0 ? index % others.length : 0;
  return [...others.slice(start), ...others.slice(0, start)].slice(0, count);
}

export function getFeaturedServices(): Service[] {
  return featuredServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}
