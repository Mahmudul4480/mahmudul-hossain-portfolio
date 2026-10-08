import { siteConfig } from "@/data/site";
import { sectionImages } from "@/data/section-images";
import SectionVisual from "./SectionVisual";

export default function ContactCTA() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <SectionVisual
          imageSrc={sectionImages.contact}
          imageAlt="Mahmudul Hossain ready to discuss your next project"
          imagePosition="left"
          className="contact-visual"
        >
          <div className="contact-split-panel">
            <p className="eyebrow">Let&apos;s talk</p>
            <h2>Have a project that needs a technical owner, not a subcontractor?</h2>
            <p>
              I&apos;d be glad to hop on a quick 10-minute call to discuss your current project
              architecture and timeline.
            </p>
            <div className="contact-ctas contact-ctas-left">
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
              <a
                className="btn btn-ghost"
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub
              </a>
            </div>
            <div className="contact-meta contact-meta-left">
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
          </div>
        </SectionVisual>
      </div>
    </section>
  );
}
