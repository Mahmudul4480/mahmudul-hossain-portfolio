import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function HomeHero() {
  return (
    <section className="h-hero" id="home" data-tone="dark">
      <p className="h-kicker">{siteConfig.tagline}</p>
      <h1>
        <span className="h-line">Secure SaaS,</span>
        <span className="h-line">built so the</span>
        <span className="h-line">right clients</span>
        <span className="h-line">
          say <em className="h-script">yes</em>
        </span>
      </h1>
      <Image
        className="h-hero-photo"
        data-parallax="true"
        src="/assets/mahmudul-hero.png"
        alt="Mahmudul Hossain, full-stack engineer and SaaS architect"
        width={963}
        height={995}
        priority
        sizes="(max-width: 760px) 88vw, 640px"
      />
      <div className="h-hero-foot">
        <p className="h-lede">
          For founders in Europe, the United States, and Canada who want one engineer on the
          product. I build secure, multi-tenant SaaS with Next.js, React, and Node.js — Supabase,
          PostgreSQL, and Firebase — and I write every line myself. Pixel-perfect frontends from
          Figma. The backend underneath. No agency, no outsourcing.
        </p>
        <div className="h-hero-actions">
          <div className="h-hero-ctas">
            <Link href="#contact" className="btn btn-primary">
              Book a 10-min call
            </Link>
            <Link href="#work" className="btn h-btn-ghost">
              See shipped projects
            </Link>
          </div>
          <p className="h-avail">
            <span className="h-avail-dot" aria-hidden="true" />
            Currently taking on new projects
          </p>
          <p className="h-scrollcue">(Scroll to see the work)</p>
        </div>
      </div>
    </section>
  );
}
