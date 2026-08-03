import { siteConfig } from "@/data/site";
import TechChips from "./TechChips";
import Reveal from "./Reveal";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{siteConfig.tagline}</p>
          <h1>
            I build secure, multi-tenant SaaS platforms — and I write{" "}
            <span className="hl">every</span> line myself.
          </h1>
          <p className="lede">
            Independent engineer specializing in Next.js, React and Node.js, with a focus on secure
            database architecture — Supabase, PostgreSQL and Firebase. I take 100% technical
            ownership: pixel-perfect frontends from Figma, robust backends underneath.
          </p>
          <div className="hero-ctas">
            <Link href="#contact" className="btn btn-primary">
              Book a 10-min call
            </Link>
            <Link href="#work" className="btn btn-ghost">
              See shipped projects
            </Link>
          </div>
          <div className="avail">
            <span className="dot" aria-hidden="true" />
            Currently taking on new projects
          </div>
        </div>

        <Reveal className="hero-visual">
          <div className="hero-visual-wrap">
            <div className="hero-glow" aria-hidden="true" />
            <TechChips />
            <Image
              className="hero-portrait"
              src="/assets/hero-portrait.jpg"
              alt="Mahmudul Hossain, full-stack engineer and SaaS architect"
              width={420}
              height={525}
              priority
              sizes="(max-width: 960px) 320px, 420px"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
