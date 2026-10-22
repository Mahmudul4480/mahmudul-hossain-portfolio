import Image from "next/image";
import { sectionImages } from "@/data/section-images";
import { siteConfig } from "@/data/site";

const extraSkills = [
  "Express",
  "NestJS",
  "REST",
  "GraphQL",
  "MongoDB",
  "Stripe",
  "Mollie",
  "Twilio",
  "Resend",
  "OpenAI",
  "Claude",
  "shadcn/ui",
  "Framer Motion",
  "PWA",
];

const capabilities = [
  {
    title: "High-performance frontend",
    description:
      "React, Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui and Framer Motion — pixel-perfect from Figma.",
  },
  {
    title: "Robust backend & APIs",
    description:
      "Node.js, Express, NestJS, and REST / GraphQL API design built for scale and clean boundaries.",
  },
  {
    title: "Database & security hardening",
    description:
      "PostgreSQL, Supabase with Edge Functions, MongoDB, and strict RLS policies for full multi-tenant isolation.",
  },
  {
    title: "Advanced integrations",
    description:
      "Stripe / Mollie subscriptions & webhooks, Twilio / Resend messaging, and OpenAI / Claude RAG pipelines.",
  },
  {
    title: "Mobile & web hybrid",
    description:
      "Cross-platform, installable Progressive Web Apps built straight from a single Next.js codebase.",
  },
  {
    title: "AI-native velocity",
    description:
      "Cursor IDE and Claude Code accelerate scaffolding and boilerplate — freeing time for business logic and edge cases.",
  },
];

function rowsOf<T>(items: T[], count: number) {
  const rows: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => rows[index % count].push(item));
  return rows;
}

export default function HomeSkills() {
  const skills = [...siteConfig.knowsAbout, ...extraSkills];
  const rows = rowsOf(skills, 4);

  return (
    <section className="h-skills" id="stack" data-tone="dark">
      <div className="h-split h-skills-top">
        <div className="h-sticky">
          <p className="h-eyebrow h-eyebrow-light">What I build with</p>
          <h2 className="h-display">Skills</h2>
          <p className="h-sticky-copy h-on-dark">
            Five areas I own end to end on every engagement — no handoffs, no subcontracting.
          </p>
          <Image
            src={sectionImages.capabilities}
            alt="Mahmudul Hossain reviewing technical capabilities on a dashboard"
            width={720}
            height={540}
            className="h-side-photo"
            sizes="(max-width: 900px) 100vw, 360px"
          />
        </div>
        <div>
          <p className="h-marquee-label">Tools & expertise</p>
          <div className="h-marquee" aria-hidden="true">
            {rows.map((row, index) => (
              <div key={index} className={`h-marquee-row${index % 2 ? " is-rev" : ""}`}>
                <div className="h-marquee-track">
                  {[...row, ...row].map((skill, skillIndex) => (
                    <span key={`${skill}-${skillIndex}`}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ul className="sr-only">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-cap-grid">
        {capabilities.map((cap) => (
          <article key={cap.title} className="h-cap">
            <h3>{cap.title}</h3>
            <p>{cap.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
