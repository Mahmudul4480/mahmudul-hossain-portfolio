import { siteConfig } from "@/data/site";
import Reveal from "./Reveal";

interface ServiceContactCTAProps {
  headline?: string;
  description?: string;
}

export default function ServiceContactCTA({
  headline = "Ready to get started?",
  description = "Book a quick call or send an email — I'll reply with a clear scope, timeline, and quote.",
}: ServiceContactCTAProps) {
  return (
    <section className="section service-cta">
      <div className="wrap">
        <Reveal className="contact-panel">
          <p className="eyebrow eyebrow-center">Let&apos;s talk</p>
          <h2>{headline}</h2>
          <p>{description}</p>
          <div className="contact-ctas">
            <a
              className="btn btn-primary"
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp me
            </a>
            <a className="btn btn-ghost" href={`mailto:${siteConfig.email}`}>
              Email me
            </a>
            <a className="btn btn-ghost" href="/#contact">
              View contact options
            </a>
          </div>
          <div className="contact-meta">
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp · {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
