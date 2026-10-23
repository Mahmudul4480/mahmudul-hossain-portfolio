import Image from "next/image";
import Link from "next/link";
import { sectionImages } from "@/data/section-images";
import { siteConfig } from "@/data/site";
import ContactForm from "@/components/home/ContactForm";

export default function HomeContact() {
  const year = new Date().getFullYear();

  return (
    <footer className="h-contact" id="contact" data-tone="dark">
      <Image
        src={sectionImages.contact}
        alt="Mahmudul Hossain ready to discuss your next project"
        width={1200}
        height={800}
        className="h-contact-photo"
        sizes="(max-width: 800px) 100vw, 520px"
      />
      <p className="h-eyebrow h-eyebrow-light">Let&apos;s talk</p>
      <h2 className="h-display h-display-center">
        Need a technical <span className="h-script">owner</span>, not a subcontractor?
      </h2>
      <p className="h-center-copy h-on-dark">
        I&apos;d be glad to hop on a quick 10-minute call to discuss your current project
        architecture and timeline. Or send a quote request below.
      </p>
      <ContactForm />
      <div className="h-contact-ctas">
        <a
          className="btn btn-primary"
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp me
        </a>
        <a className="btn h-btn-ghost" href={`mailto:${siteConfig.email}`}>
          Email me
        </a>
        <a
          className="btn h-btn-ghost"
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          View GitHub
        </a>
      </div>
      <ul className="h-contact-meta">
        <li>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp · {siteConfig.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </li>
        <li>
          <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </li>
        <li>
          <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </li>
      </ul>
      <div className="h-contact-bar">
        <p>
          © {year} {siteConfig.name}. Built and deployed solo.
        </p>
        <div>
          {siteConfig.footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
