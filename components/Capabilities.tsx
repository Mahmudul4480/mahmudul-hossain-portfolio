import Reveal from "./Reveal";

const capabilities = [
  {
    title: "High-performance frontend",
    description:
      "React, Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui and Framer Motion — pixel-perfect from Figma.",
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 4 3 12l5 8M16 4l5 8-5 8" />
      </svg>
    ),
  },
  {
    title: "Robust backend & APIs",
    description:
      "Node.js, Express, NestJS, and REST / GraphQL API design built for scale and clean boundaries.",
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <circle cx="7" cy="7" r=".6" fill="currentColor" />
        <circle cx="7" cy="17" r=".6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Database & security hardening",
    description:
      "PostgreSQL, Supabase with Edge Functions, MongoDB, and strict RLS policies for full multi-tenant isolation.",
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3 4 6v6c0 5 3.6 7.8 8 9 4.4-1.2 8-4 8-9V6l-8-3Z" />
        <path d="M9.5 12.5 11 14l3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Advanced integrations",
    description:
      "Stripe / Mollie subscriptions & webhooks, Twilio / Resend messaging, and OpenAI / Claude RAG pipelines.",
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 3v4M15 3v4M4 8h16M6 8v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
        <path d="M9 13h2M9 16h6" />
      </svg>
    ),
  },
  {
    title: "Mobile & web hybrid",
    description:
      "Cross-platform, installable Progressive Web Apps built straight from a single Next.js codebase.",
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
  {
    title: "AI-native velocity",
    description:
      "Cursor IDE and Claude Code accelerate scaffolding and boilerplate — freeing time for business logic and edge cases.",
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 12h4l2-7 4 14 2-7h4" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section className="section" id="stack">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">What I build with</p>
            <h2>Core technical capabilities</h2>
          </div>
          <p>Five areas I own end to end on every engagement — no handoffs, no subcontracting.</p>
        </Reveal>

        <Reveal className="cap-grid">
          {capabilities.map((cap) => (
            <div key={cap.title} className="cap-card">
              {cap.icon}
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
